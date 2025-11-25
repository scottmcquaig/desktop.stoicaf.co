import { NextRequest, NextResponse } from 'next/server';
import { getStripe, STRIPE_PRICES } from '@/lib/stripe';
import { isAdminInitialized, getAdminDb, getAdminInitError } from '@/lib/firebase/admin';

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

    // Get or create Stripe customer
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();

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
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
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
