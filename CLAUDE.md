# Stoic.af Development Status - Claude Reference

**Last Updated**: 2025-11-22
**Current Phase**: MVP Development
**Active Branch**: `claude/hit-i-01DrZwbz9ztxFjv35nDiFBD7`

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
- **Toasts**: Sonner (installed)
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

### ✅ Sprint 4: Insights & Polish (COMPLETE)

**Completed**: 2025-11-22

**What Was Built:**
- ✅ **Daily Quote System** (`src/lib/dailyQuote.ts`):
  - Deterministic daily quote based on day of year
  - Cycles through 120 quotes (4 pillars × 30 days)
  - Same quote for all users on the same day
  - Includes ChadGPT "bro translation"
- ✅ **Insights Page** (real Firestore data):
  - Stats cards: streak, total entries, avg mood, top pillar
  - 30-day mood heatmap with color coding
  - Pillar distribution donut chart
  - Weekly summary with personalized stats
  - Empty states when no data
- ✅ **Journal Filters**:
  - Mood filter dropdown (Good/Okay/Bad - matches 3 smiley system)
  - Pillar filter dropdown
  - Clear filters button
  - Shows filtered count
- ✅ **Toast Notifications**: Sonner installed and configured
- ✅ **Error Boundaries**: `src/components/ErrorBoundary.tsx`
- ✅ **UI Polish**:
  - Fixed mobile header icon sizing with hover states
  - Fixed mood trend chart empty state
  - Fixed calendar view double scrollbar
  - Fixed ChadGPT speech bubble rounded corners

**New Files:**
- `src/lib/dailyQuote.ts` - Daily quote utility
- `src/components/ErrorBoundary.tsx` - Error boundary component

**New Journal Service Functions:**
- `getEntriesForLastNDays()` - Get entries for insights
- `getPillarDistribution()` - Get pillar breakdown
- `getMoodDataForDays()` - Get mood data for heatmap

---

## Current App Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Component showcase (landing page placeholder) | No |
| `/auth/signin` | Login page | No |
| `/auth/signup` | Registration page | No |
| `/auth/reset-password` | Password reset | No |
| `/onboarding` | 4-step onboarding flow | Yes |
| `/dashboard` | Main dashboard with daily quote | Yes |
| `/journal` | Journal entries list/grid/calendar with filters | Yes |
| `/journal/new` | Block-based journal editor | Yes |
| `/journal/[id]` | View/edit single entry | Yes |
| `/insights` | Analytics & insights (real data) | Yes |
| `/settings` | User settings | Yes |

---

## Key Files Reference

### Authentication & User
- `src/contexts/AuthContext.tsx` - Auth provider with Firebase
- `src/lib/firebase/config.ts` - Firebase configuration
- `src/lib/firebase/auth.ts` - Firebase auth instance
- `src/lib/firebase/firestore.ts` - Firestore instance

### Journal System
- `src/lib/firebase/journal.ts` - Journal CRUD + insights queries
- `src/lib/firebase/pillarTracks.ts` - Pillar track service
- `src/lib/types.ts` - TypeScript types including block-based entry model

### Utilities
- `src/lib/dailyQuote.ts` - Daily quote system (deterministic by day of year)
- `src/components/ErrorBoundary.tsx` - Error boundary component

### Pages
- `src/app/(app)/layout.tsx` - Protected app layout with sidebar + error boundary
- `src/app/(app)/dashboard/page.tsx` - Dashboard with daily quote, mood trend, recent entries
- `src/app/(app)/journal/page.tsx` - Journal list/grid/calendar with mood & pillar filters
- `src/app/(app)/journal/new/page.tsx` - Block-based editor with sticky toolbar
- `src/app/(app)/journal/[id]/page.tsx` - View/edit single entry
- `src/app/(app)/insights/page.tsx` - Analytics with real Firestore data
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
  mood: MoodScore | null;    // 1-5 (displayed as 3 faces: bad=1-2, okay=3, good=4-5)
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

### Mood Display (3-tier system)
- **Good** (mood 4-5): Green smile icon
- **Okay** (mood 3): Amber meh icon
- **Bad** (mood 1-2): Red frown icon

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

## Next To-Do's (Sprint 5: AI & Settings)

### High Priority

1. **Settings Enhancements**
   - [ ] Update display name
   - [ ] Photo upload
   - [ ] Export data feature (JSON download)
   - [ ] Delete account with confirmation

2. **Mobile Responsiveness**
   - [ ] Test all views on mobile
   - [ ] Fix sticky toolbar on mobile
   - [ ] Ensure touch targets are adequate

3. **AI Integration**
   - [ ] Daily prompt generation via Cloud Functions
   - [ ] Weekly reflection summaries
   - [ ] Chad insights on entries

### Medium Priority

4. **Notifications**
   - [ ] Email reminders (Firebase Functions)
   - [ ] Browser push notifications

5. **Polish & UX**
   - [ ] Keyboard shortcuts in editor
   - [ ] Auto-focus on first empty block

### Future Sprints (Backlog)

6. **Payments (Sprint 6)**
   - [ ] Stripe integration
   - [ ] Pro subscription features

7. **Landing Page**
   - [ ] Marketing landing page at `/`
   - [ ] Feature highlights
   - [ ] Pricing section

---

## Known Issues

1. **Firestore Rules**: Need to deploy via `firebase deploy --only firestore:rules`
2. **AI Flows**: Genkit flows exist in `src/ai/flows/` but are not connected
3. **Track Data Not Seeded to Firestore**: Using local JSON fallback (works fine)

---

## Git Workflow

**Current Branch**: `claude/hit-i-01DrZwbz9ztxFjv35nDiFBD7`

**Recent Commits**:
- UI fixes and polish
- Sprint 4: Insights & Polish
- Implement block-based journal editor with pillar track integration

---

## Quick Start for New Context

```bash
# 1. Ensure on correct branch
git checkout claude/hit-i-01DrZwbz9ztxFjv35nDiFBD7

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

**Test Insights Flow**:
1. Create a few journal entries with different pillars/moods
2. Go to `/insights`
3. See mood heatmap, pillar distribution, and stats

---

## Resources

- **Firebase Console**: https://console.firebase.google.com
- **Coolify Dashboard**: (deployment platform)
- **shadcn/ui**: https://ui.shadcn.com/docs
- **Lucide Icons**: https://lucide.dev/icons

---

**Status**: Sprint 4 Complete - Ready for Sprint 5 (AI & Settings)
