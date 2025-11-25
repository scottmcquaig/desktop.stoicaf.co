import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    const { userId, returnUrl } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Get user's Stripe customer ID
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData?.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      );
    }

    // Create portal session
    const session = await getStripe().billingPortal.sessions.create({
      customer: userData.stripeCustomerId,
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
