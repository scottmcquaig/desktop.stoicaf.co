import Stripe from 'stripe';

// Lazy-initialized Stripe instance to avoid build-time errors
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2025-11-17.clover',
      typescript: true,
    });
  }
  return stripeInstance;
}

// Price IDs - update these with your actual Stripe price IDs
export const STRIPE_PRICES = {
  PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY || '',
  PRO_ANNUAL: process.env.STRIPE_PRICE_PRO_ANNUAL || '',
  WORKBOOK_MONTHLY: process.env.STRIPE_WORKBOOK_MONTHLY_PRICE_ID || '',
} as const;

// Subscription tiers
export type SubscriptionTier = 'free' | 'pro' | 'workbook';

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'none';
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
}
