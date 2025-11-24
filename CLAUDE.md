# Stoic.af Development Status - Claude Reference

**Last Updated**: 2025-11-24 (Sprint 10 In Progress)
**Current Phase**: MVP Development - Sprint 10 (Mobile UX + Stripe Integration)
**Active Branch**: `main`

---

## Project Overview

**Stoic.af** is a desktop web journaling platform combining ancient Stoic philosophy with modern AI to build emotional resilience through guided journaling across four pillars: Money, Ego, Relationships, and Discipline.

**Tech Stack:**
- **Framework**: Next.js 15.3.3 (App Router, Turbopack)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.0 + shadcn/ui components (30+ components)
- **Backend**: Firebase (Auth, Firestore)
- **AI**: Genkit with Gemini 1.5 Flash
- **Drag & Drop**: @dnd-kit/core + @dnd-kit/sortable
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

### ✅ Sprint 5: AI Integration & Settings (COMPLETE)

**Completed**: 2025-11-22

**What Was Built:**

**AI Integration:**
- ✅ Complete Genkit AI flow structure (`src/ai/flows/`)
  - `generateDailyPrompt` - Generate daily journal prompts
  - `generateWeeklyReflection` - Weekly reflection summaries
  - `generateChadInsight` - Chad insights on entries
  - `generateJournalSuggestions` - Entry suggestions based on mood
- ✅ API routes for all AI features (`src/app/api/ai/`)
  - `/api/ai/daily-prompt` - Daily prompt generation
  - `/api/ai/weekly-reflection` - Weekly reflection
  - `/api/ai/chad-insight` - Chad insights

**Settings Page Enhancements:**
- ✅ Display name update with inline editing
- ✅ Profile photo upload with Firebase Storage
- ✅ Export data feature (downloads all data as JSON)
- ✅ Delete account with confirmation dialog (AlertDialog)
- ✅ Proper error handling and toast notifications

**Code Quality & DevOps:**
- ✅ Fixed all TypeScript `any` types
- ✅ ESLint configured with strict rules (`.eslintrc.json`)
- ✅ Prettier configured for code formatting (`.prettierrc`)
- ✅ Husky pre-commit hooks with lint-staged
- ✅ Jest testing framework configured
- ✅ Sample test suite created (`src/__tests__/`)

**Security Improvements:**
- ✅ Removed hardcoded Firebase credentials
- ✅ Environment variables properly configured
- ✅ Created `.env.local` template

### ✅ Sprint 6: Mobile & AI Activation (COMPLETE)

**Completed**: 2025-11-24

**What Was Built:**

**Mobile Responsiveness:**
- ✅ Fixed mobile bottom nav conflict with journal editor toolbar
- ✅ Global mobile nav hides on `/journal/new` and `/journal/[id]` pages
- ✅ All touch targets meet 44x44px accessibility standard
- ✅ Mobile toolbar shows block types, mood selector, and AI options

**AI Feature Activation:**
- ✅ Weekly reflection on dashboard with "Generate Reflection" button
- ✅ Chad's Insight button in journal editor toolbar
- ✅ "Save + AI" button to save and get insight in one action
- ✅ AI insight dialog with tone badge and action items
- ✅ Graceful degradation when API key not configured

**Notification Preferences (Settings):**
- ✅ Email reminders toggle
- ✅ Browser notifications toggle with permission request
- ✅ Reminder time picker (7 preset times)
- ✅ Reminder days selector (circular day buttons)
- ✅ Info box explaining requirements

### ✅ Sprint 7: Editor UX & Performance (COMPLETE)

**Completed**: 2025-11-24

**What Was Built:**

**Keyboard Shortcuts:**
- ✅ `Cmd/Ctrl + S` - Save entry
- ✅ `Cmd/Ctrl + Enter` - Save with AI insight
- ✅ `Escape` - Go back to journal list
- ✅ Keyboard hints in button tooltips

**Auto-Save Drafts:**
- ✅ Drafts auto-save to localStorage every 30 seconds
- ✅ Draft restored on page reload with toast notification
- ✅ Status indicator shows "• unsaved" or "• draft saved"
- ✅ Draft cleared on successful save
- ✅ Only applies to new entries (not editing existing)

**Block Reordering:**
- ✅ Drag and drop to reorder blocks using @dnd-kit
- ✅ Drag handle (grip icon) on each block
- ✅ Visual feedback during drag (opacity change)
- ✅ Works with all block types

**Loading Skeletons:**
- ✅ Dashboard skeleton while data loads
- ✅ Reusable skeleton components in `src/components/skeletons/`

**New Files:**
- `src/components/skeletons/DashboardSkeleton.tsx` - Dashboard loading skeleton

### ✅ Sprint 9: Landing Page & Marketing (COMPLETE)

**Completed**: 2025-11-24

**What Was Built:**

**Marketing Landing Page:**
- ✅ **Hero Section**: Full-bleed gradient hero with Stoic AF branding, CTA buttons, phone mockup, ChadGPT badge
- ✅ **Why Stoic AF**: 4 feature cards highlighting key benefits
- ✅ **Four Pillars**: Showcase of Money, Ego, Relationships, Discipline tracks with icons
- ✅ **Daily Templates**: Visual display of Morning Intent, Dichotomy, Evening Balance, The Audit
- ✅ **AI/ChadGPT Section**: Sample insights with chat UI mockup showing AI coaching
- ✅ **Testimonials**: 3 testimonial cards with 5-star ratings
- ✅ **Pricing Section**: Free vs Pro tier comparison with clear CTAs
- ✅ **Footer**: Professional footer with links and branding

**Auth Modal System:**
- ✅ `AuthModal` component with popup functionality
- ✅ Google OAuth and email/password authentication
- ✅ Toggle between signin/signup modes
- ✅ Proper error handling with toast notifications
- ✅ Seamless integration with Firebase Auth

**Smart Routing:**
- ✅ Landing page shown to logged-out users at `/`
- ✅ Auto-redirect authenticated users to `/dashboard`
- ✅ Loading state with animated logo during auth check

**New Files:**
- `src/components/AuthModal.tsx` - Reusable auth modal component
- `src/app/page.tsx` - Complete marketing landing page (replaced component showcase)

**Design Highlights:**
- Stoic Blue gradient hero (#4B90C8)
- Clean section alternation (white/slate-50 backgrounds)
- Hover effects and transitions on cards
- Responsive grid layouts for all screen sizes
- Professional typography with bold headings
- Proper spacing and visual hierarchy

---

## Current App Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Marketing landing page (auto-redirects to `/dashboard` if logged in) | No |
| `/auth/signin` | Login page (legacy - replaced by AuthModal) | No |
| `/auth/signup` | Registration page (legacy - replaced by AuthModal) | No |
| `/auth/reset-password` | Password reset | No |
| `/onboarding` | 4-step onboarding flow | Yes |
| `/dashboard` | Main dashboard with daily quote | Yes |
| `/journal` | Journal entries list/grid/calendar with filters | Yes |
| `/journal/new` | Block-based journal editor | Yes |
| `/journal/[id]` | View/edit single entry | Yes |
| `/insights` | Analytics & insights (real data) | Yes |
| `/explore` | Browse and select programs | Yes |
| `/settings` | User settings | Yes |
| `/about` | About page | No |
| `/privacy` | Privacy Policy | No |
| `/terms` | Terms of Service | No |
| `/support` | Support & FAQ | No |
| `/docs` | Documentation (placeholder) | No |
| `/pro` | Pro features marketing page | No |

---

## Key Files Reference

### Authentication & User
- `src/contexts/AuthContext.tsx` - Auth provider with Firebase
- `src/components/AuthModal.tsx` - Reusable auth modal (signin/signup popup)
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
- `src/components/skeletons/DashboardSkeleton.tsx` - Loading skeletons

### Pages
- `src/app/page.tsx` - Marketing landing page with auth modal integration
- `src/app/(app)/layout.tsx` - Protected app layout with sidebar + error boundary
- `src/app/(app)/dashboard/page.tsx` - Dashboard with daily quote, mood trend, recent entries
- `src/app/(app)/journal/page.tsx` - Journal list/grid/calendar with mood & pillar filters
- `src/app/(app)/journal/new/page.tsx` - Block-based editor with sticky toolbar
- `src/app/(app)/journal/[id]/page.tsx` - View/edit single entry
- `src/app/(app)/insights/page.tsx` - Analytics with real Firestore data
- `src/app/(app)/settings/page.tsx` - Settings with notification preferences
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

  // Program tracking (Sprint 10)
  currentProgram?: ProgramType;  // 'money' | 'ego' | 'relationships' | 'discipline' | 'freestyle' | 'workbook' | null
  programStartDate?: Date;       // when current program started
  programDayIndex?: number;      // current day (0-29) in program
  completedPrograms?: ProgramType[]; // list of completed programs
  programHistory?: Array<{
    programType: ProgramType;
    startedAt: Date;
    completedAt?: Date;
    daysCompleted: number;
  }>;

  // Workbook access (Sprint 10)
  hasWorkbookAccess?: boolean;
  workbookRedemptionCode?: string;
  workbookSubscriptionActive?: boolean;

  // Notification preferences
  emailReminders?: boolean;
  browserNotifications?: boolean;
  reminderTime?: string;     // e.g., "18:00"
  reminderDays?: string[];   // e.g., ["mon", "tue", "wed", ...]
}

type ProgramType = 'money' | 'ego' | 'relationships' | 'discipline' | 'freestyle' | 'workbook';
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
GOOGLE_GENAI_API_KEY=  # Required for AI features
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

## Sprint 10: Mobile UX + Stripe Integration (CURRENT)

### Phase 1: Mobile Quick Wins ✅ COMPLETE

| Task | Status | Notes |
|------|--------|-------|
| Add user dropdown to mobile header | ✅ Done | Logout was missing on mobile |
| Include: name, email, streak, settings, logout | ✅ Done | Uses shadcn DropdownMenu |
| Add "Explore" to sidebar navigation | ✅ Done | Compass icon |
| Add "Explore" to mobile bottom nav | ✅ Done | Prep for Phase 2 |
| Create Explore page with program cards | ✅ Done | 4 pillars + Freestyle + Workbook (locked) |

### Phase 2: Stripe Setup via CLI (NEXT)

| Task | Status | Notes |
|------|--------|-------|
| Create Stripe account + get API keys | ⬜ Pending | Dashboard setup |
| Create products: Free tier, Pro ($5/mo) | ⬜ Pending | In Stripe dashboard |
| Install Firebase Stripe extension via CLI | ⬜ Pending | `firebase ext:install stripe/firestore-stripe-payments` |
| Configure extension with Stripe keys | ⬜ Pending | Extension config |
| Set up webhook endpoints | ⬜ Pending | `stripe listen --forward-to` |
| Test extension deployment | ⬜ Pending | End-to-end verification |

### Phase 3: Checkout Flow

| Task | Status | Notes |
|------|--------|-------|
| Build checkout page/modal | ⬜ Pending | Show Free vs Pro comparison |
| Implement `createCheckoutSession()` | ⬜ Pending | Uses Stripe extension |
| Add subscription status to UserProfile | ⬜ Pending | Track tier in Firestore |
| Build subscription management in Settings | ⬜ Pending | Cancel/upgrade options |
| Add upgrade prompts for free users | ⬜ Pending | When hitting limits |

### Phase 4: Pro Features Gating

| Task | Status | Notes |
|------|--------|-------|
| Define free vs pro feature limits | ⬜ Pending | e.g., 10 entries/mo free |
| Add usage tracking (entries, AI calls) | ⬜ Pending | Firestore counters |
| Show upgrade prompts at limits | ⬜ Pending | Modal/toast |
| Protect pro features behind sub check | ⬜ Pending | Server-side validation |

### Phase 5: Performance & Polish (If Time)

| Task | Status | Notes |
|------|--------|-------|
| Set up React Query provider | ⬜ Pending | Already installed |
| Create query hooks for entries/insights | ⬜ Pending | Replace direct Firestore |
| Bundle size analysis | ⬜ Pending | @next/bundle-analyzer |
| Dynamic imports for Recharts/Calendar | ⬜ Pending | Lazy loading |

---

## Sprint 11: Explore & Programs (NEXT)

### Explore Page & Navigation
- [x] Create `/explore` page listing all programs
- [x] Show user's current program at top (if selected)
- [x] Display 4 pillar programs + Freestyle + Workbook
- [ ] Wire up program selection to Firestore
- [ ] Program cards with progress indicators
- [ ] "Select Program" / "Current" badges functionality

### Program Selection & Switching
- [ ] Allow program switching from Explore
- [ ] Confirm dialog before switching
- [ ] Track program history in user profile
- [ ] Completion badges for finished programs

### New Program Options
- [ ] **Freestyle**: No structured prompts, AI-suggested or random
- [ ] **Workbook Program**: Mirrors print book, gated content

### Workbook Monetization
- [ ] Book redemption code flow
- [ ] $2/month workbook subscription option
- [ ] PDF export for workbook entries

---

## Sprint 12: Backend & Notifications (FUTURE)

### Email Notification Backend
- [ ] Firebase Functions for scheduled emails
- [ ] Daily reminder emails
- [ ] Weekly summary emails

### SEO & Analytics
- [ ] Meta tags on landing page
- [ ] Google Analytics setup
- [ ] Sitemap generation

---

## Backlog (Future Sprints)

### Rich Text Editing
- [ ] Bold, italic, lists in blocks
- [ ] Markdown support
- [ ] Block templates

### Community Features
- [ ] Public profiles
- [ ] Share journal entries
- [ ] Community challenges
- [ ] Leaderboards

---

## Known Issues

1. **Firebase Stripe Extension**: Blocked by GCP organization policy and storage permissions (see Sprint 8 tasks)
2. **Firestore Rules**: Need to deploy via `firebase deploy --only firestore:rules` (requires Firebase auth)
3. **Track Data Not Seeded to Firestore**: Using local JSON fallback (works fine)
4. **Email Notifications**: UI ready but backend not implemented yet
5. **Legacy Auth Pages**: `/auth/signin` and `/auth/signup` still exist but AuthModal is now preferred

---

## Git Workflow

**Main Branch**: `main`

**Recent Commits**:
- Sprint 9: Build landing page with hero, features, pricing, testimonials, and AuthModal
- Replace favicon with app logo (icon.svg, apple-icon.svg)
- Sprint 7: Editor UX and loading improvements (keyboard shortcuts, auto-save, drag-drop)
- Add notification preferences and fix touch targets
- Sprint 6: Mobile & AI activation

---

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack on port 3000
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # Check TypeScript types
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without fixing

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report

# AI Development
npm run genkit:dev       # Start Genkit development environment
npm run genkit:watch     # Start Genkit with file watching

# Git Hooks
npm run prepare          # Set up Husky (runs automatically after install)
```

## Quick Start for New Context

```bash
# 1. Clone and setup
git clone https://github.com/scottmcquaig/desktop.stoicaf.co.git
cd desktop.stoicaf.co

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your Firebase and Gemini API keys

# 4. Start dev server
npm run dev

# 5. View app at http://localhost:3000
```

**Test Journal Flow**:
1. Go to `/journal/new`
2. Select a pillar (Money/Ego/Relationships/Discipline)
3. View daily prompt with Stoic quote
4. Add blocks using toolbar (Sun/Moon/Columns)
5. Drag blocks to reorder using grip handle
6. Write content, select mood
7. Press `Cmd+S` to save or `Cmd+Enter` for save+AI
8. View Chad's insight in dialog
9. Return to `/journal/new` same day - loads existing entry for editing

**Test AI Features**:
1. Ensure `GOOGLE_GENAI_API_KEY` is set in `.env.local`
2. Write a journal entry and click "Save + AI" or the sparkles button
3. Go to Dashboard and click "Generate Reflection"
4. View AI-powered weekly insights

---

## Resources

- **Firebase Console**: https://console.firebase.google.com
- **Coolify Dashboard**: (deployment platform)
- **shadcn/ui**: https://ui.shadcn.com/docs
- **Lucide Icons**: https://lucide.dev/icons
- **dnd-kit**: https://dndkit.com/docs

---

**Status**: Sprint 10 In Progress - Mobile UX + Stripe Integration
