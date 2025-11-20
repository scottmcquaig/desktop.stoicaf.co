# Stoic.af – Product Requirements & Style Guide
*(Updated 2025)*

## 1. Introduction

### Purpose and Vision
Stoic.af is a hybrid journaling platform that blends Stoic philosophy with modern AI tools. Users write daily entries, receive adaptive prompts and weekly reflections, and gradually build emotional resilience.

The app must:
- Feel instantaneous
- Work offline via local cache
- Use cloud AI for summaries and analysis
- Sustain a friendly subscription model ($5/mo)
- Keep AI cost per user under $0.20/month using small, efficient models and deterministic fallbacks

### Scope
This document covers:
- The public journaling client
- A gated admin area
- Single Next.js 14+ application deployed to Firebase App Hosting
- Personas, features, tech stack, data model, functional requirements, and revised style guide

---

## 2. Target Audience & Personas

**Emily (32 – Busy professional)**  
Wants quick, guided reflection around work hours. Prefers deterministic prompts. Values privacy; willing to pay for insights.

**Jay (21 – Student/creative)**  
Journals for stress management and clarity. Cost-conscious; starts free, upgrades for AI summaries/mood charts.

**Sam (45 – Parent)**  
Wants patience and emotional resilience. Needs offline capability and clear reminders.

---

## 3. Unique Selling Points

### Adaptive Stoic Prompts
- Local engine selects prompts based on virtue focus, mood, tags, previous entries  
- Pro: Remix a prompt via AI  
- Offline fallback uses deterministic prompts

### Weekly AI Wisdom
- Weekly summary Cloud Function  
- Input capped to keep AI cost below $0.20/month  
- Includes themes + a recommended practice  
- Pro-only feature

### Local-First Privacy
- Firestore E2E encryption  
- Offline persistence  
- Names/dates can be scrubbed during export  
- Strict row-level security

### Motivational Dashboard
- Streaks
- Mood trend line
- Virtue progress radial gauge  
- Quick Capture (⌘+K)
- CHAD floating button for AI coaching

---

## 4. Platform & Technology

### 4.1 Core Stack
- **Framework**: Next.js 14+ App Router deployed via Firebase App Hosting  
- **Auth**: Firebase Auth (email, Google, Apple)  
- **Data**: Firestore with offline persistence, Stripe payments sync  
- **AI**: Genkit + Gemini 1.5 Flash; token buckets per user  
- **Admin**: `/admin` route with admin claim middleware

### 4.2 Additional Firebase Services
- **Stripe**: firestore-stripe-payments extension  
- **Crashlytics + Performance Monitoring**  
- **App Check + Firestore Rules**  
- **Secret Manager for API keys**

---

## 5. Data Model

| Collection        | Purpose / Key Fields |
|------------------|----------------------|
| **users**        | virtueFocus, tone, timezone, streak counters, subscription status, monthly token bucket |
| **entries**      | userId, encrypted text, createdAt, mood (1–5), tags, signals, wordCount, aiUsed |
| **weeklySummaries** | weekly AI summary in Markdown, suggestions, token usage |
| **prompts**      | Stoic prompt library with category/context/template/cooldown |
| **promptEvents** | promptId, remixed flag, token usage analytics |
| **payments**     | Stripe-synced plan & status |

---

## 6. Functional Requirements

### 6.1 Onboarding & Authentication
- Standard sign-in/up with Firebase Auth  
- Four-step onboarding:  
  1. Virtue focus  
  2. CHAD coaching tone  
  3. Current struggle  
  4. Reminder schedule  
- Pro features gated with paywall overlay + Stripe Checkout

### 6.2 Journaling Loop
- Local prompt selection  
- Editor built with Tiptap, autosave, offline cache  
- Mood slider, tags, optional attachments  
- Cloud Function extracts topics + sentiment  
- QuickCapture overlay (⌘+K)  
- CHAD AI coaching button

### 6.3 Dashboards & Insights
- Home dashboard with streaks, mood trend, virtue radial  
- Journal list with search  
- Insights page with heatmaps, virtue breakdown, summaries  
- Explore page (future, hidden behind “coming soon”)

### 6.4 Admin Dashboard
- Prompt CRUD  
- User lists (no journal text)  
- Token/cost charts  
- Feature flags  
- Moderation/flag review

---

## 7. Style Guide

### 7.1 Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|--------|
| Background | #F8FAFC | #1E293B | Main surfaces |
| Stoic Blue | #4B90C8 | #4B90C8 | Primary CTAs |
| Secondary | #E0F2FE | #0369A1 | Tags & chart fills |
| Accent / Emerald | #ECFDF5 / #047857 | #065F46 | Success states |
| Neutral Gray | #64748B | #94A3B8 | Body text |
| Card | #FFFFFF | #334155 | Cards & modals |
| Destructive | #EF4444 | #7F1D1D | Errors |

Contrast must meet WCAG 4.5:1.

### 7.2 Typography
- **Body**: Inter  
- **Headings**: Merriweather  
- **Sizes**:  
  - H1: 32px  
  - H2: 24px  
  - H3: 20px  
  - Body: 16px (1rem), line-height 1.5  

### 7.3 Layout & Components
- Max content width: **768px**  
- Rounded cards (`rounded-xl`, subtle border, `shadow-sm`)  
- Primary button: Stoic Blue  
- Inputs: rounded, neutral border, focus ring  
- Tags: sky-50 bg with blue text  
- Charts: primary + secondary colors  
- Subtle animations only (`transition-all duration-150`)

### 7.4 Accessibility
- Minimum contrast 4.5:1  
- Visible focus rings  
- Semantic HTML + aria-labels  
- Timezone aware (user’s locale)

---

## 8. AI & Model Strategy
- Genkit flows orchestrate AI  
- Primary model: Gemini 1.5 Flash (~$0.075/million tokens)  
- Weekly summary cost ~ $0.0012/user/month  
- Token bucket enforces limits  
- System prompt instructs concise Stoic tone  
- Genkit Monitoring for latency/tokens/errors

---

## 9. Development Roadmap

### Sprint 1 – Foundations
- Repo setup  
- Firebase config  
- Firestore rules  
- Onboarding flow  
- Skeleton layout + sidebar

### Sprint 2 – Core Journaling
- Editor, autosave  
- Mood slider, tags  
- Deterministic prompt engine  
- QuickCapture  
- Journal list  
- Offline persistence

### Sprint 3 – AI & Insights
- Prompt remix + weekly summaries  
- Signal extraction  
- Dashboard widgets  
- Insights page

### Sprint 4 – Payments & Admin
- Stripe extension  
- Subscription UI  
- Paywalls  
- Admin views  
- Token budget charts

### Sprint 5 – Testing & Launch
- Emulator Suite tests  
- Security audits  
- Load tests  
- Beta feedback  
- Launch prep

---

## 10. Security, Privacy & Compliance
- Row-level Firestore rules  
- Admin never sees journal text  
- App Check enabled  
- PII redacted before AI calls  
- Data encrypted at rest + transit  
- Export/delete user data  
- Secrets in Secret Manager

---

## 11. Monitoring & Testing
- Local Emulator Suite  
- Genkit local telemetry  
- Firebase Monitoring for latency/errors/tokens  
- Accessibility tests  
- Dark mode QA

---

## 12. Conclusion
Stoic.af combines offline-first journaling, adaptive Stoic coaching, cost-controlled AI, and a calm aesthetic aligned with the UI kit. The roadmap, design system, and data models support a small team shipping a polished, scalable product.

---
