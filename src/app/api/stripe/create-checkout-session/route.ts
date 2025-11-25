import { NextRequest, NextResponse } from 'next/server';
import { getStripe, STRIPE_PRICES } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    const { userId, priceId, successUrl, cancelUrl } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Validate price ID
    const validPriceIds = Object.values(STRIPE_PRICES).filter(Boolean);
    if (priceId && !validPriceIds.includes(priceId)) {
      return NextResponse.json({ error: 'Invalid price ID' }, { status: 400 });
    }

    // Get or create Stripe customer
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();

    let customerId = userData?.stripeCustomerId;

    if (!customerId) {
      // Create new Stripe customer
      const customer = await getStripe().customers.create({
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

    // Create checkout session
    const session = await getStripe().checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId || STRIPE_PRICES.PRO_MONTHLY,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/settings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
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
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
