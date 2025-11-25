import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase/admin';
import Stripe from 'stripe';

// Disable body parsing, need raw body for webhook signature verification
export const runtime = 'nodejs';

async function updateUserSubscription(
  firebaseUID: string,
  subscription: Stripe.Subscription
) {
  const userRef = adminDb.collection('users').doc(firebaseUID);

  // Determine tier based on price ID
  const priceId = subscription.items.data[0]?.price.id;
  let tier: 'free' | 'pro' | 'workbook' = 'free';

  if (priceId === process.env.STRIPE_PRICE_PRO_MONTHLY ||
      priceId === process.env.STRIPE_PRICE_PRO_ANNUAL) {
    tier = 'pro';
  } else if (priceId === process.env.STRIPE_WORKBOOK_MONTHLY_PRICE_ID) {
    tier = 'workbook';
  }

  // Access subscription properties (handle API version differences)
  const subAny = subscription as unknown as Record<string, unknown>;
  const currentPeriodEnd = subAny.current_period_end as number | undefined;
  const cancelAtPeriodEnd = subAny.cancel_at_period_end as boolean | undefined;

  const subscriptionData = {
    subscriptionTier: tier,
    subscriptionStatus: subscription.status,
    subscriptionId: subscription.id,
    subscriptionPriceId: priceId,
    subscriptionCurrentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd * 1000) : null,
    subscriptionCancelAtPeriodEnd: cancelAtPeriodEnd ?? false,
    updatedAt: new Date(),
  };

  await userRef.update(subscriptionData);
  console.log(`Updated subscription for user ${firebaseUID}:`, subscriptionData);
}

async function handleSubscriptionDeleted(firebaseUID: string) {
  const userRef = adminDb.collection('users').doc(firebaseUID);

  await userRef.update({
    subscriptionTier: 'free',
    subscriptionStatus: 'canceled',
    subscriptionId: null,
    subscriptionPriceId: null,
    subscriptionCurrentPeriodEnd: null,
    subscriptionCancelAtPeriodEnd: null,
    updatedAt: new Date(),
  });

  console.log(`Subscription deleted for user ${firebaseUID}`);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const firebaseUID = session.metadata?.firebaseUID;

        if (firebaseUID && session.subscription) {
          const subscription = await getStripe().subscriptions.retrieve(
            session.subscription as string
          );
          await updateUserSubscription(firebaseUID, subscription);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const firebaseUID = subscription.metadata?.firebaseUID;

        if (firebaseUID) {
          await updateUserSubscription(firebaseUID, subscription);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const firebaseUID = subscription.metadata?.firebaseUID;

        if (firebaseUID) {
          await handleSubscriptionDeleted(firebaseUID);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Payment succeeded for invoice:', invoice.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Payment failed for invoice:', invoice.id);
        // Could send email notification here
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
