# Subscription System Testing Guide

**Test URL:** https://app.stoicaf.co
**Stripe Mode:** Test Mode (use test card numbers)

---

## Test Card Numbers

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 3220` | 3D Secure authentication required |
| `4000 0000 0000 9995` | Payment declined |

**For all test cards:**
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

---

## Test Scenarios

### 1. Free User Limits

#### 1.1 Journal Entry Limit (10/month)
1. Log in as a new/free user
2. Navigate to `/journal/new`
3. Create 10 journal entries (save each one)
4. On the 11th entry attempt, you should see:
   - **UpgradeBanner** showing "X entries remaining" (appears when < 3 remaining)
   - **UpgradePrompt modal** when limit is reached

**Expected:** After 10 entries, saving a new entry shows upgrade modal

#### 1.2 AI Insights Limit (3/month)
1. Log in as a free user
2. Navigate to `/journal/new`
3. Write some content in the journal
4. Click the sparkles button (or Save + AI) 3 times
5. On the 4th attempt, you should see:
   - **UpgradeBanner** showing "X AI insights remaining"
   - **UpgradePrompt modal** when limit is reached

**Expected:** After 3 AI insights, clicking sparkles shows upgrade modal

#### 1.3 Weekly Reflection (Pro Only)
1. Log in as a free user
2. Navigate to `/dashboard`
3. Click "Generate Reflection" button in Weekly Reflection card

**Expected:** UpgradePrompt modal appears for "weekly-reflection" feature

#### 1.4 Data Export (Pro Only)
1. Log in as a free user
2. Navigate to `/settings` > Profile tab
3. Click "Export My Data" button

**Expected:** UpgradePrompt modal appears for "export" feature

#### 1.5 Multiple Programs (Pro Only)
1. Log in as a free user who already has a pillar focus set
2. Navigate to `/explore`
3. Try to select a different program than your current one

**Expected:** UpgradePrompt modal appears for "programs" feature

---

### 2. Checkout Flow

#### 2.1 Monthly Subscription
1. Log in as a free user
2. Navigate to `/settings` > Subscription tab
3. Select "Monthly" plan ($4.99/mo)
4. Click "Upgrade to Pro"
5. Complete Stripe Checkout with test card `4242 4242 4242 4242`

**Expected:**
- Redirected to Stripe Checkout
- After payment, redirected back to `/settings`
- Toast: "Subscription activated! Welcome to Stoic AF Pro."
- Subscription tab shows "Stoic AF Pro" as current plan
- Status shows "Active"

#### 2.2 Annual Subscription
1. Same as above but select "Annual" plan ($49.99/yr)

**Expected:** Same flow, should show annual pricing

#### 2.3 Failed Payment
1. Start checkout flow
2. Use test card `4000 0000 0000 9995` (declined)

**Expected:** Payment fails, user stays on free plan

---

### 3. Pro User Features

After subscribing, verify all features are unlocked:

#### 3.1 Unlimited Entries
1. Create more than 10 entries in a month

**Expected:** No limit warnings or upgrade prompts

#### 3.2 Unlimited AI Insights
1. Use AI insights more than 3 times

**Expected:** No limit warnings or upgrade prompts

#### 3.3 Weekly Reflection
1. Go to Dashboard
2. Click "Generate Reflection"

**Expected:** AI generates weekly reflection (no upgrade prompt)

#### 3.4 Data Export
1. Go to Settings > Profile
2. Click "Export My Data"

**Expected:** JSON file downloads with all your data

#### 3.5 All Programs
1. Go to `/explore`
2. Select any program

**Expected:** Can switch programs freely (no upgrade prompt)

---

### 4. Subscription Management

#### 4.1 View Subscription Details
1. Log in as Pro user
2. Navigate to `/settings` > Subscription tab

**Expected:**
- Shows "Stoic AF Pro" as current plan
- Shows next billing date
- Shows "Active" status
- "Manage Subscription" button visible

#### 4.2 Manage via Stripe Portal
1. Click "Manage Subscription" button

**Expected:**
- Opens Stripe Customer Portal
- Can view invoices, update payment method, cancel subscription

#### 4.3 Cancel Subscription
1. In Stripe Portal, cancel subscription

**Expected:**
- Status changes to "Cancels at period end"
- User keeps Pro access until period ends
- After period ends, reverts to Free

---

### 5. Webhook Verification

These events should update user's Firestore profile automatically:

| Event | Expected Result |
|-------|-----------------|
| `checkout.session.completed` | User gets `subscriptionTier: 'pro'`, `subscriptionStatus: 'active'` |
| `customer.subscription.updated` | Updates subscription details |
| `customer.subscription.deleted` | Reverts to `subscriptionTier: 'free'`, `subscriptionStatus: 'canceled'` |
| `invoice.payment_failed` | Logged (could trigger email in future) |

**To verify webhooks:**
1. Check Stripe Dashboard > Developers > Webhooks
2. Look for successful webhook deliveries
3. Check Firestore user document for updated fields

---

### 6. Edge Cases

#### 6.1 Month Rollover
1. User has used 8/10 entries this month
2. New month begins

**Expected:** Usage resets to 0/10

#### 6.2 Subscription Expires
1. Pro user's subscription ends

**Expected:**
- `subscriptionStatus` changes to `'canceled'`
- User sees free tier limits again
- Upgrade prompts appear when hitting limits

#### 6.3 Re-subscribe
1. Canceled user subscribes again

**Expected:** Full Pro access restored immediately

---

## Firestore User Fields Reference

After subscription, check these fields in `users/{uid}`:

```javascript
{
  // Subscription fields
  stripeCustomerId: "cus_xxx",
  subscriptionTier: "pro",           // 'free' | 'pro' | 'workbook'
  subscriptionStatus: "active",      // 'active' | 'trialing' | 'past_due' | 'canceled' | 'none'
  subscriptionId: "sub_xxx",
  subscriptionPriceId: "price_xxx",
  subscriptionCurrentPeriodEnd: Timestamp,
  subscriptionCancelAtPeriodEnd: false,

  // Usage tracking
  usageMonth: "2025-11",             // Format: YYYY-MM
  entriesThisMonth: 5,
  aiInsightsThisMonth: 2,
}
```

---

## Quick Checklist

- [ ] Free user sees entry limit banner after 7+ entries
- [ ] Free user blocked after 10 entries (shows upgrade modal)
- [ ] Free user sees AI insight limit banner after 1+ uses
- [ ] Free user blocked after 3 AI insights (shows upgrade modal)
- [ ] Free user blocked from weekly reflection (shows upgrade modal)
- [ ] Free user blocked from data export (shows upgrade modal)
- [ ] Free user blocked from switching programs (shows upgrade modal)
- [ ] Checkout redirects to Stripe
- [ ] Successful payment redirects back with success toast
- [ ] Pro user has all features unlocked
- [ ] Manage Subscription opens Stripe Portal
- [ ] Cancellation updates status correctly
- [ ] Webhooks update Firestore correctly

---

## Troubleshooting

**Checkout not working:**
- Check browser console for errors
- Verify `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` are set in Coolify
- Verify price IDs match Stripe dashboard

**Webhooks not firing:**
- Check Stripe Dashboard > Webhooks for failures
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Check Coolify logs for webhook errors

**Usage not tracking:**
- Check Firestore for `usageMonth`, `entriesThisMonth`, `aiInsightsThisMonth` fields
- Verify user is logged in when creating entries

**Upgrade prompts not showing:**
- Check that `useSubscription` hook is imported correctly
- Verify `subscriptionTier` in Firestore (should be 'free' or undefined)
