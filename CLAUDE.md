# Stoic.af Development Status - Claude Reference

**Last Updated**: 2025-11-22
**Current Phase**: MVP Development
**Active Branch**: `claude/integrate-nextjs-ui-01LgHujJM9s2i7riTW3umVKA`

---

## Project Overview

**Stoic.af** is a desktop web journaling platform combining ancient Stoic philosophy with modern AI to build emotional resilience through guided journaling across four pillars: Money, Ego, Relationships, and Discipline.

**Tech Stack:**
- **Framework**: Next.js 15.3.3 (App Router, Turbopack)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.0 + shadcn/ui components (30+ components)
- **Backend**: Firebase (Auth, Firestore)
- **AI**: Genkit (installed, flows created but not active)
- **State**: Zustand (installed, not yet configured)
- **Data Fetching**: React Query (installed, not yet configured)
- **Icons**: Lucide React
- **Deployment**: Docker + Coolify

---

## Sprint Progress

### ✅ Sprint 1: Next.js Foundation & Design System (COMPLETE)

- Next.js with TypeScript and App Router
- Tailwind CSS with design tokens
- shadcn/ui component library (30+ components)
- Design system with pillar colors

### ✅ Sprint 2: Firebase Integration & Authentication (COMPLETE)

**Completed**: 2025-11-22

**What Was Built:**
- ✅ Firebase Auth (Email/Password + Google OAuth)
- ✅ AuthContext with full user management
- ✅ Login page (`/auth/signin`)
- ✅ Signup page (`/auth/signup`)
- ✅ Password reset page (`/auth/reset-password`)
- ✅ 4-step onboarding flow (`/onboarding`):
  - Welcome screen
  - Pillar focus selection (Money, Ego, Relationships, Discipline)
  - Chad tone selection (Gentle, Reality Check, Drill Sergeant, Roast Me)
  - Current struggle input
- ✅ Protected routes (redirects to signin if not authenticated)
- ✅ User profile creation in Firestore
- ✅ Docker deployment configuration
- ✅ Coolify deployment working

### ✅ Sprint 2.5: UI Migration & Polish (COMPLETE)

**What Was Built:**
- ✅ Migrated prototype UI from `swgszn-app.studioaf.co-main`
- ✅ Full app shell with sidebar navigation
- ✅ Dashboard with:
  - Dynamic greeting (time-based + user's first name)
  - 15-day streak counter
  - 5-day mood trend line chart (SVG)
  - Daily Stoic quote with Chad speech bubble
  - Recent entries list
  - Pillar progress bars (Money, Ego, Relationships, Discipline)
  - Pro trial banner
- ✅ Journal page with functional views:
  - List view (full entry cards)
  - Grid view (3-column responsive)
  - Calendar view (month navigation, entry indicators)
- ✅ Journal entry editor (`/journal/new`)
- ✅ Insights page (placeholder)
- ✅ Settings page with:
  - Profile info display
  - Chad tone selector
  - Monthly pillar focus selector
  - Daily prompt toggle
  - Dark mode toggle
  - Sign out
- ✅ QuickCapture modal (Cmd+K)
- ✅ Mobile bottom navigation
- ✅ Responsive sidebar (collapsible)

**Removed:**
- ChadGPT chat page (cost concerns - AI features will be batch/scheduled only)
- ChadFloatingButton component

---

## Current App Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Component showcase (landing page placeholder) | No |
| `/auth/signin` | Login page | No |
| `/auth/signup` | Registration page | No |
| `/auth/reset-password` | Password reset | No |
| `/onboarding` | 4-step onboarding flow | Yes |
| `/dashboard` | Main dashboard | Yes |
| `/journal` | Journal entries list/grid/calendar | Yes |
| `/journal/new` | New journal entry editor | Yes |
| `/insights` | Analytics & insights | Yes |
| `/settings` | User settings | Yes |

---

## Key Files Reference

### Authentication
- `src/contexts/AuthContext.tsx` - Auth provider with Firebase
- `src/lib/firebase/config.ts` - Firebase configuration
- `src/lib/firebase/auth.ts` - Firebase auth instance
- `src/lib/firebase/firestore.ts` - Firestore instance

### Pages
- `src/app/(app)/layout.tsx` - Protected app layout with sidebar
- `src/app/(app)/dashboard/page.tsx` - Dashboard
- `src/app/(app)/journal/page.tsx` - Journal with list/grid/calendar views
- `src/app/(app)/journal/new/page.tsx` - Entry editor
- `src/app/(app)/settings/page.tsx` - Settings
- `src/app/onboarding/page.tsx` - 4-step onboarding

### Components
- `src/components/app-sidebar.tsx` - Main navigation sidebar
- `src/components/QuickCapture.tsx` - Cmd+K quick entry modal
- `src/components/ChadGPTSvg.tsx` - Chad mascot SVG
- `src/components/StoicLogo.tsx` - Logo component
- `src/components/ui/*` - 30+ shadcn/ui components

### Configuration
- `Dockerfile` - Docker build with Firebase env vars
- `next.config.ts` - Next.js config with `output: 'standalone'`
- `tailwind.config.ts` - Design tokens
- `.env.example` - Environment variable template

---

## Design System

### Colors

**Brand:**
- Stoic Dark (Navy): `#1E293B` - `bg-stoic-dark`
- Stoic Blue: `hsl(var(--primary))` - `bg-primary`

**Pillar Colors:**
- Money: emerald-500 (`#10B981`)
- Ego: purple-500 (`#8B5CF6`)
- Relationships: pink-500 (`#EC4899`)
- Discipline: amber-500 (`#F59E0B`)

### Key UI Patterns

**Sidebar Quick Entry Button:**
```tsx
className="bg-stoic-dark hover:bg-stoic-dark/90"
```

**Chad Speech Bubble:**
- Avatar with gradient background
- Speech bubble with triangle pointer
- Indigo accent color

---

## Data Models

### UserProfile (Firestore: `users/{uid}`)
```typescript
interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  pillarFocus?: 'money' | 'ego' | 'relationships' | 'discipline';
  chadTone?: 'gentle' | 'reality-check' | 'drill-sergeant' | 'roast-me';
  currentStruggle?: string;
  reminderTime?: string;
  reminderDays?: string[];
  emailReminders?: boolean;
  browserNotifications?: boolean;
  onboardingComplete?: boolean;
  createdAt?: Date;
}
```

---

## Environment Variables

Required in `.env.local` or Coolify:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
GOOGLE_GENAI_API_KEY=  # For future AI features
```

---

## Deployment

**Platform**: Coolify (Docker)
**Build**: `npm run build` produces standalone output
**Dockerfile**: Accepts Firebase env vars as build args

```bash
# Local development
npm install
npm run dev

# Production build
npm run build
npm start
```

---

## Next To-Do's (Sprint 3: Journal System)

### High Priority - Core Functionality

1. **Journal Entry CRUD**
   - [ ] Create Firestore collection `entries/{entryId}`
   - [ ] Save new entries to Firestore from editor
   - [ ] Load entries from Firestore in journal list
   - [ ] Edit existing entries
   - [ ] Delete entries with confirmation
   - [ ] Entry data model: `{ userId, title, content, mood, pillar, tags, template, createdAt, updatedAt }`

2. **Entry Editor Enhancements**
   - [ ] Auto-save draft to localStorage
   - [ ] Mood selector (1-5 scale with emoji icons)
   - [ ] Pillar tag selector
   - [ ] Custom tags input
   - [ ] Template selector (Morning Intent, Evening Audit, Free-form)
   - [ ] Rich text or markdown support

3. **Journal Views - Connect to Real Data**
   - [ ] List view loads from Firestore
   - [ ] Grid view loads from Firestore
   - [ ] Calendar view shows actual entry dates
   - [ ] Click entry to view/edit
   - [ ] Pagination for list view

4. **Firestore Security Rules**
   - [ ] Deploy rules to restrict user access to own data
   - [ ] Test rules with Firebase emulator

### Medium Priority - Dashboard & Insights

5. **Dashboard - Real Data**
   - [ ] Streak calculation from actual entries
   - [ ] Mood trend from last 5 entries
   - [ ] Recent entries from Firestore
   - [ ] Pillar progress calculation

6. **Daily Quote System**
   - [ ] Create quotes collection in Firestore
   - [ ] Fetch random quote for dashboard
   - [ ] Chad interpretation (static for now, AI later)

7. **Insights Page**
   - [ ] Weekly summary view
   - [ ] Monthly mood chart
   - [ ] Pillar distribution pie chart
   - [ ] Entry count statistics

### Lower Priority - Polish & UX

8. **Search & Filters**
   - [ ] Search entries by title/content
   - [ ] Filter by mood
   - [ ] Filter by pillar
   - [ ] Filter by date range
   - [ ] Filter by template type

9. **Settings Enhancements**
   - [ ] Update profile (display name, photo)
   - [ ] Notification preferences (UI ready, needs backend)
   - [ ] Export data feature
   - [ ] Delete account

10. **Mobile Responsiveness**
    - [ ] Test all views on mobile
    - [ ] Fix any layout issues
    - [ ] Ensure touch targets are adequate

### Future Sprints (Backlog)

11. **AI Integration (Sprint 4)**
    - [ ] Daily prompt generation (batch job)
    - [ ] Weekly reflection summaries
    - [ ] Chad insights on entries
    - [ ] Prompt remixing based on user context

12. **Notifications**
    - [ ] Email reminders (Firebase Functions)
    - [ ] Browser push notifications

13. **Payments (Sprint 5)**
    - [ ] Stripe integration
    - [ ] Pro subscription features
    - [ ] Trial management

14. **Landing Page**
    - [ ] Marketing landing page at `/`
    - [ ] Feature highlights
    - [ ] Pricing section
    - [ ] CTA to signup

---

## Known Issues

1. **Firestore Rules**: Currently using permissive test rules - need to deploy proper security rules before production
2. **Static Data**: Dashboard, journal entries, quotes are all mock data - need Firestore integration
3. **AI Flows**: Genkit flows exist in `src/ai/flows/` but are not connected to UI
4. **No Error Boundaries**: App crashes on errors - add error boundaries
5. **No Loading States**: Some pages need skeleton loaders

---

## Git Workflow

**Current Branch**: `claude/integrate-nextjs-ui-01LgHujJM9s2i7riTW3umVKA`

**Push Command**:
```bash
git push -u origin claude/<feature>-<session-id>
```

**Recent Commits**:
- Add functional list/grid/calendar views to journal page
- Update dashboard with dynamic greeting, line chart, and pillars
- Change Quick Entry button to stoic-dark navy
- Add speech bubble styling for Chad on dashboard
- Update pillars and remove ChadGPT chat feature

---

## Quick Start for New Context

```bash
# 1. Ensure on correct branch
git checkout claude/integrate-nextjs-ui-01LgHujJM9s2i7riTW3umVKA

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. View app at http://localhost:3000
```

**Test Auth Flow**:
1. Go to `/auth/signup`
2. Create account
3. Complete onboarding
4. Land on `/dashboard`

---

## Resources

- **Firebase Console**: https://console.firebase.google.com
- **Coolify Dashboard**: (deployment platform)
- **shadcn/ui**: https://ui.shadcn.com/docs
- **Lucide Icons**: https://lucide.dev/icons

---

**Status**: Ready for Sprint 3 - Journal Entry System
