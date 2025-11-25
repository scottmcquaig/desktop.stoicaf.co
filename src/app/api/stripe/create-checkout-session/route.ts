import { NextRequest, NextResponse } from 'next/server';
import { getStripe, STRIPE_PRICES } from '@/lib/stripe';
import { isAdminInitialized, getAdminDb, getAdminAuth, getAdminInitError } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    // Pre-flight configuration checks
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe checkout failed: STRIPE_SECRET_KEY not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured. Please contact support.' },
        { status: 503 }
      );
    }

    // Check Firebase Admin is initialized
    if (!isAdminInitialized()) {
      const initError = getAdminInitError();
      console.error('Firebase Admin not initialized:', initError?.message);
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 503 }
      );
    }

    const adminDb = getAdminDb();
    const adminAuth = getAdminAuth();

    const { userId, priceId, successUrl, cancelUrl } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Determine the price to use
    const effectivePriceId = priceId || STRIPE_PRICES.PRO_MONTHLY;

    if (!effectivePriceId) {
      console.error('Stripe checkout failed: No price ID configured');
      return NextResponse.json(
        { error: 'Pricing is not configured. Please contact support.' },
        { status: 503 }
      );
    }

    // Validate price ID if explicitly provided
    const validPriceIds = Object.values(STRIPE_PRICES).filter(Boolean);
    if (priceId && validPriceIds.length > 0 && !validPriceIds.includes(priceId)) {
      return NextResponse.json({ error: 'Invalid price ID' }, { status: 400 });
    }

    // Ensure user document exists to attach Stripe data
    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();
    let userData = userDoc.data();

    if (!userDoc.exists) {
      console.warn('Missing user document before checkout. Creating placeholder.', { userId });

      try {
        const authUser = await adminAuth.getUser(userId);
        await userRef.set(
          {
            email: authUser.email || null,
            displayName: authUser.displayName || null,
            createdAt: new Date(),
            subscriptionTier: 'free',
            subscriptionStatus: 'inactive',
            subscriptionId: null,
            subscriptionPriceId: null,
            subscriptionCurrentPeriodEnd: null,
            subscriptionCancelAtPeriodEnd: null,
            updatedAt: new Date(),
          },
          { merge: true }
        );
        userData = (await userRef.get()).data();
        console.info('Created user document placeholder for checkout', { userId });
      } catch (creationError) {
        console.error('Failed to create user document before checkout', { userId, error: creationError });
        return NextResponse.json(
          { error: 'Unable to prepare user profile for checkout. Please contact support.' },
          { status: 500 }
        );
      }
    }

    let customerId = userData?.stripeCustomerId;

    const stripe = getStripe();

    if (!customerId) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        metadata: {
          firebaseUID: userId,
        },
        email: userData?.email || undefined,
        name: userData?.displayName || undefined,
      });

      customerId = customer.id;

      // Save customer ID to user profile
      await adminDb.collection('users').doc(userId).update({
        stripeCustomerId: customerId,
      });
    }

    // Build URLs with fallbacks
    const requestOrigin = new URL(request.url).origin;
    const configuredBaseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '');
    const baseUrl = configuredBaseUrl || request.headers.get('origin') || requestOrigin || 'http://localhost:3000';

    const finalSuccessUrl = successUrl || `${baseUrl}/settings?session_id={CHECKOUT_SESSION_ID}`;
    const finalCancelUrl = cancelUrl || `${baseUrl}/settings`;

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: effectivePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      metadata: {
        firebaseUID: userId,
      },
      subscription_data: {
        metadata: {
          firebaseUID: userId,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating checkout session:', errorMessage, error);

    // Return more specific error messages for common issues
    if (errorMessage.includes('No such price')) {
      return NextResponse.json(
        { error: 'Invalid price configuration. Please contact support.' },
        { status: 503 }
      );
    }

    if (errorMessage.includes('Invalid API Key')) {
      return NextResponse.json(
        { error: 'Stripe authentication failed. Please contact support.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}
