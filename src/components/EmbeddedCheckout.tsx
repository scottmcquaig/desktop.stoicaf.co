'use client';

import { useCallback, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface EmbeddedCheckoutModalProps {
  userId: string;
  priceId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmbeddedCheckoutModal({
  userId,
  priceId,
  open,
  onOpenChange,
}: EmbeddedCheckoutModalProps) {
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          priceId,
          embedded: true,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        throw new Error(data.error);
      }

      return data.clientSecret;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load checkout';
      setError(message);
      throw err;
    }
  }, [userId, priceId]);

  const options = { fetchClientSecret };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Complete Your Subscription</DialogTitle>
        </DialogHeader>
        <div className="p-4 min-h-[400px]">
          {error ? (
            <div className="flex items-center justify-center h-[400px] text-center">
              <div>
                <p className="text-red-500 mb-2">{error}</p>
                <button
                  onClick={() => onOpenChange(false)}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
