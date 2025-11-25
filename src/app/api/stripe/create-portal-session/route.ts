import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { isAdminInitialized, getAdminDb, getAdminInitError } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    // Pre-flight configuration checks
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Portal session failed: STRIPE_SECRET_KEY not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured. Please contact support.' },
        { status: 503 }
      );
    }

    if (!isAdminInitialized()) {
      const initError = getAdminInitError();
      console.error('Firebase Admin not initialized:', initError?.message);
      console.error('Ensure FIREBASE_SERVICE_ACCOUNT_KEY environment variable is set with valid service account JSON');
      return NextResponse.json(
        {
          error: 'Payment system is being configured. Please try again later or contact support.',
          code: 'FIREBASE_ADMIN_NOT_INITIALIZED'
        },
        { status: 503 }
      );
    }

    const adminDb = getAdminDb();
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
    const requestOrigin = new URL(request.url).origin;
    const configuredBaseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '');
    const baseUrl = configuredBaseUrl || request.headers.get('origin') || requestOrigin || 'http://localhost:3000';
    const session = await getStripe().billingPortal.sessions.create({
      customer: userData.stripeCustomerId,
      return_url: returnUrl || `${baseUrl}/settings`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating portal session:', errorMessage, error);
    return NextResponse.json(
      { error: 'Failed to create portal session. Please try again.' },
      { status: 500 }
    );
  }
}
