# Stoic.af Development Status - Claude Reference

**Last Updated**: 2025-11-22
**Current Phase**: MVP Development
**Active Branch**: `claude/sprint-3-development-01BSUjSYkKtMur66G5oE5tq3`

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
- ✅ 4-step onboarding flow (`/onboarding`)
- ✅ Protected routes (redirects to signin if not authenticated)
- ✅ User profile creation in Firestore
- ✅ Docker deployment configuration

### ✅ Sprint 2.5: UI Migration & Polish (COMPLETE)

- ✅ Migrated prototype UI from previous repo
- ✅ Full app shell with sidebar navigation
- ✅ Dashboard with dynamic greeting, streak, mood chart
- ✅ QuickCapture modal (Cmd+K)
- ✅ Mobile bottom navigation
- ✅ Responsive sidebar (collapsible)

### ✅ Sprint 3: Journal Entry System (COMPLETE)

**Completed**: 2025-11-22

**What Was Built:**
- ✅ Full journal CRUD with Firestore
- ✅ Firestore security rules and indexes
- ✅ Dashboard connected to real data (streak, mood, entries)

### ✅ Sprint 3.5: Block-Based Journal Redesign (COMPLETE)

**Completed**: 2025-11-22

**Major Redesign - Block-Based Journal Editor:**
- ✅ **Block-based entry model** (like Notion):
  - Freeform text blocks
  - Morning Intent blocks (sun icon)
  - Evening Audit blocks (moon icon)
  - Dichotomy of Control blocks (columns icon)
- ✅ **Sticky toolbar** with:
  - Template icons (Sun/Moon/Columns) to add blocks
  - Pillar icons (Money/Ego/Relationships/Discipline) to select track
  - Mood selector (Frown/Meh/Smile)
  - Save, Delete, Save Layout buttons
- ✅ **Pillar Track System** (30-day journaling courses):
  - Money: "Your Wealth Isn't Your Worth"
  - Ego: "Let Results Talk"
  - Relationships: "Lead With Respect"
  - Discipline: "Small Reps, Big Gains"
- ✅ **Daily prompts** from pillar tracks with:
  - Stoic quote + author
  - Chad's "bro translation"
  - Today's challenge
  - Evening reflection prompts
- ✅ **One entry per day** logic - automatically loads/edits today's entry
- ✅ **Pillar progress tracking** - tracks which day (1-30) user is on
- ✅ **Save default layout** - users can save preferred block arrangement
- ✅ **Track data fallback** - loads from `/public/data/` JSON files

**New Files:**
- `src/lib/firebase/pillarTracks.ts` - Pillar track service with fallback
- `public/data/*.json` - 30-day track data for each pillar
- `scripts/seedPillarTracks.ts` - Seeding script for Firestore

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
| `/journal/new` | Block-based journal editor | Yes |
| `/journal/[id]` | View/edit single entry | Yes |
| `/insights` | Analytics & insights (placeholder) | Yes |
| `/settings` | User settings | Yes |

---

## Key Files Reference

### Authentication & User
- `src/contexts/AuthContext.tsx` - Auth provider with Firebase
- `src/lib/firebase/config.ts` - Firebase configuration
- `src/lib/firebase/auth.ts` - Firebase auth instance
- `src/lib/firebase/firestore.ts` - Firestore instance

### Journal System
- `src/lib/firebase/journal.ts` - Journal CRUD service
- `src/lib/firebase/pillarTracks.ts` - Pillar track service
- `src/lib/types.ts` - TypeScript types including block-based entry model

### Pages
- `src/app/(app)/layout.tsx` - Protected app layout with sidebar
- `src/app/(app)/dashboard/page.tsx` - Dashboard (real Firestore data)
- `src/app/(app)/journal/page.tsx` - Journal list/grid/calendar views
- `src/app/(app)/journal/new/page.tsx` - Block-based editor with sticky toolbar
- `src/app/(app)/journal/[id]/page.tsx` - View/edit single entry
- `src/app/(app)/settings/page.tsx` - Settings
- `src/app/onboarding/page.tsx` - 4-step onboarding

### Data Files
- `public/data/money-track.json` - 30 days of Money pillar prompts
- `public/data/ego-track.json` - 30 days of Ego pillar prompts
- `public/data/relationships-track.json` - 30 days of Relationships prompts
- `public/data/discipline-track.json` - 30 days of Discipline prompts

### Configuration
- `firestore.rules` - Firestore security rules
- `firestore.indexes.json` - Firestore composite indexes

---

## Data Models

### JournalEntry (Firestore: `entries/{id}`)
```typescript
interface JournalEntry {
  id: string;
  userId: string;
  date: string;              // YYYY-MM-DD format (one entry per day)
  pillar: Pillar;            // money | ego | relationships | discipline
  dayInTrack: number;        // which day (1-30) in the pillar track
  blocks: EntryBlock[];      // array of content blocks
  mood: MoodScore | null;    // 1-5
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface EntryBlock {
  id: string;
  type: BlockType;           // freeform | morning-intent | evening-audit | dichotomy
  content: string;
  inControl?: string;        // for dichotomy blocks
  notInControl?: string;     // for dichotomy blocks
}
```

### PillarTrack (Firestore: `pillarTracks/{pillar}` or `/public/data/`)
```typescript
interface PillarTrack {
  pillar: Pillar;
  theme: string;             // "Let Results Talk", etc.
  days: DayPrompt[];         // 30 days of prompts
}

interface DayPrompt {
  day: number;
  stoicQuote: string;
  quoteAuthor: string;
  broTranslation: string;    // Chad's interpretation
  todaysChallenge: string;
  challengeType: 'reflection' | 'action' | 'meditation';
  todaysIntention: string;
  eveningPrompts: string[];
}
```

### UserProfile (Firestore: `users/{uid}`)
```typescript
interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  pillarFocus?: Pillar;
  chadTone?: 'gentle' | 'reality-check' | 'drill-sergeant' | 'roast-me';
  currentStruggle?: string;
  defaultEntryLayout?: { blocks: Array<{ id: string; type: string }> };
  onboardingComplete?: boolean;
  createdAt?: Date;
}
```

---

## Design System

### Pillar Colors
- **Money**: emerald-500 (`#10B981`) - `bg-emerald-50`, `text-emerald-500`
- **Ego**: purple-500 (`#8B5CF6`) - `bg-purple-50`, `text-purple-500`
- **Relationships**: pink-500 (`#EC4899`) - `bg-pink-50`, `text-pink-500`
- **Discipline**: amber-500 (`#F59E0B`) - `bg-amber-50`, `text-amber-500`

### Block Type Colors
- **Morning Intent**: amber/sun - `bg-amber-50`, `text-amber-600`
- **Evening Audit**: indigo/moon - `bg-indigo-50`, `text-indigo-600`
- **Dichotomy**: purple/columns - `bg-purple-50`, `text-purple-600`
- **Freeform**: slate - `bg-white`, `text-slate-800`

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

```bash
# Local development
npm install
npm run dev

# Production build
npm run build
npm start

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

---

## Next To-Do's (Sprint 4: Insights & Polish)

### High Priority

1. **Insights Page Implementation**
   - [ ] Weekly summary view with charts
   - [ ] Monthly mood chart (line or bar)
   - [ ] Pillar distribution visualization
   - [ ] Entry count statistics
   - [ ] Streak history graph

2. **Daily Quote System**
   - [ ] Fetch random Stoic quote for dashboard
   - [ ] Rotate quotes daily (not per page load)
   - [ ] Consider using pillar track quotes

3. **Search & Filter Enhancements**
   - [ ] Filter by mood dropdown
   - [ ] Filter by pillar dropdown
   - [ ] Filter by date range picker

### Medium Priority

4. **Settings Enhancements**
   - [ ] Update display name
   - [ ] Photo upload
   - [ ] Export data feature (JSON download)
   - [ ] Delete account with confirmation

5. **Mobile Responsiveness**
   - [ ] Test all views on mobile
   - [ ] Fix sticky toolbar on mobile
   - [ ] Ensure touch targets are adequate

6. **Polish & UX**
   - [ ] Add error boundaries
   - [ ] Toast notifications (install sonner)
   - [ ] Keyboard shortcuts in editor
   - [ ] Auto-focus on first empty block

### Future Sprints (Backlog)

7. **AI Integration (Sprint 5)**
   - [ ] Daily prompt generation via Cloud Functions
   - [ ] Weekly reflection summaries
   - [ ] Chad insights on entries

8. **Notifications**
   - [ ] Email reminders (Firebase Functions)
   - [ ] Browser push notifications

9. **Payments (Sprint 6)**
   - [ ] Stripe integration
   - [ ] Pro subscription features

10. **Landing Page**
    - [ ] Marketing landing page at `/`
    - [ ] Feature highlights
    - [ ] Pricing section

---

## Known Issues

1. **Firestore Rules**: Need to deploy via `firebase deploy --only firestore:rules`
2. **AI Flows**: Genkit flows exist in `src/ai/flows/` but are not connected
3. **No Error Boundaries**: App crashes on errors - add error boundaries
4. **No Toast Library**: Using browser alerts - should add sonner
5. **Track Data Not Seeded to Firestore**: Using local JSON fallback (works fine)

---

## Git Workflow

**Current Branch**: `claude/sprint-3-development-01BSUjSYkKtMur66G5oE5tq3`

**Recent Commits**:
- Implement block-based journal editor with pillar track integration
- Connect dashboard to real Firestore data
- Fix onboarding completion navigation race condition

---

## Quick Start for New Context

```bash
# 1. Ensure on correct branch
git checkout claude/sprint-3-development-01BSUjSYkKtMur66G5oE5tq3

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. View app at http://localhost:3000
```

**Test Journal Flow**:
1. Go to `/journal/new`
2. Select a pillar (Money/Ego/Relationships/Discipline)
3. View daily prompt with Stoic quote
4. Add blocks using toolbar (Sun/Moon/Columns)
5. Write content, select mood
6. Save - redirects to `/journal`
7. Return to `/journal/new` same day - loads existing entry for editing

---

## Resources

- **Firebase Console**: https://console.firebase.google.com
- **Coolify Dashboard**: (deployment platform)
- **shadcn/ui**: https://ui.shadcn.com/docs
- **Lucide Icons**: https://lucide.dev/icons

---

**Status**: Sprint 3.5 Complete - Ready for Sprint 4 (Insights & Polish)
