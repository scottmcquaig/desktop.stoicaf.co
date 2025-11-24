# Stoic.af Development Status - Claude Reference

**Last Updated**: 2025-11-24 (Sprint 9 Complete)
**Current Phase**: MVP Development - Sprint 8 Ready (Stripe Integration)
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
| `/explore` | Browse and select programs (Sprint 10 - planned) | Yes |
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

## Next To-Do's (Sprint 8: Stripe Integration)

### High Priority - Sprint 8 (CURRENT)

1. **Firebase Stripe Extension Setup**
   - [ ] Resolve GCP organization policy (allow allUsers for Cloud Functions)
   - [ ] Grant Storage Object Viewer permissions to compute service account
   - [ ] Install Firebase Stripe extension (`firestore-stripe-payments`)
   - [ ] Configure extension with Stripe API keys
   - [ ] Set up webhook endpoints
   - [ ] Test extension deployment

2. **Stripe Account Configuration**
   - [ ] Create Stripe account and get API keys
   - [ ] Create subscription products in Stripe dashboard:
     - Free tier (placeholder product)
     - Pro tier ($5/month)
   - [ ] Configure webhook secret
   - [ ] Set up customer portal settings

3. **Checkout & Subscription Flow**
   - [ ] Build checkout page/modal
   - [ ] Implement subscription management UI in settings
   - [ ] Handle subscription status updates from webhooks
   - [ ] Add upgrade prompts for free users
   - [ ] Test payment flow end-to-end

4. **Pro Features Gating**
   - [ ] Define free vs pro feature limits
   - [ ] Add usage tracking (entries per month, AI calls)
   - [ ] Show upgrade prompts when limits reached
   - [ ] Protect pro features behind subscription check

5. **Performance Optimization**
   - [ ] Implement React Query for data fetching
   - [ ] Optimize bundle size
   - [ ] Lazy load components
   - [ ] Image optimization

### Medium Priority - Sprint 10: Explore & Programs

8. **Explore Page & Navigation**
   - [ ] Add "Explore" to main navigation (sidebar + mobile bottom nav)
   - [ ] Create `/explore` page listing all available programs
   - [ ] Show user's current program at top (if selected)
   - [ ] Display 4 core pillar programs (Money, Ego, Relationships, Discipline)
   - [ ] Add program cards with:
     - Program icon/image
     - Title and theme
     - Description (30 days, what you'll learn)
     - "Select Program" or "Current Program" button
     - Progress indicator if started

9. **New Program Options**
   - [ ] **No Program (Free Flow)**:
     - Option for users who want to journal without structured guidance
     - AI suggests prompts based on previous entries and patterns
     - Or randomized daily prompts from all pillars
     - Label: "Freestyle" or "Self-Guided"
   - [ ] **Stoic AF Workbook Program**:
     - Mirrors the print workbook exercises
     - 30-day structured program with worksheets/exercises
     - Tied to book purchase or $2/month trial
     - Special badge/indicator for workbook users
     - Exclusive content tied to physical book

10. **Program Selection & Switching**
   - [ ] Allow users to switch programs from Explore page
   - [ ] Confirm dialog before switching (warn about progress)
   - [ ] Track program history in user profile
   - [ ] Show completion badges for finished programs
   - [ ] Option to restart a completed program

11. **Mobile Navigation Improvements**
   - [ ] Move user profile icon to mobile header (top right)
   - [ ] Create mobile header dropdown menu with:
     - Profile/Settings
     - Logout option
     - Quick stats (streak, etc.)
   - [ ] Fix missing logout option on mobile
   - [ ] Ensure mobile nav works on all app pages

12. **Workbook Integration & Monetization**
   - [ ] Create workbook program content (30 days of exercises)
   - [ ] Add purchase flow for workbook access:
     - Option 1: Book purchase code redemption
     - Option 2: $2/month "Workbook Edition" subscription
   - [ ] Add workbook-exclusive features:
     - PDF worksheet downloads
     - Print-friendly entry format
     - Progress tracker matching book chapters
   - [ ] Marketing copy for workbook on Explore page

### Medium Priority - Sprint 11

13. **Email Notification Backend**
   - [ ] Firebase Functions for scheduled emails
   - [ ] Daily reminder emails
   - [ ] Weekly summary emails

14. **SEO & Analytics**
   - [ ] Add meta tags to landing page
   - [ ] Set up Google Analytics
   - [ ] Add structured data for rich snippets
   - [ ] Create sitemap

### Future Sprints (Backlog)

6. **Rich Text Editing (Sprint 10)**
   - [ ] Bold, italic, lists in blocks
   - [ ] Markdown support
   - [ ] Block templates

7. **Community Features (Sprint 11)**
   - [ ] Public profiles
   - [ ] Share journal entries
   - [ ] Community challenges
   - [ ] Leaderboards

---

## Sprint 10 Implementation Plan: Explore & Programs

### Overview
Add program discovery and selection with two new program types (Freestyle and Workbook), plus mobile navigation improvements.

### Phase 1: Mobile Navigation Fix (Quick Win)
**Goal**: Add user menu to mobile header with logout option

**Changes Needed:**
1. **Mobile Header Component** (`src/components/MobileHeader.tsx` - new file)
   - Profile icon/avatar in top-right corner
   - Dropdown menu with:
     - User name and email
     - Settings link
     - Logout button
     - Optional: Current streak display
   - Show on all authenticated pages

2. **Update App Layout** (`src/app/(app)/layout.tsx`)
   - Import and render MobileHeader on mobile
   - Hide current mobile bottom nav user icon
   - Ensure works on all pages (dashboard, journal, insights, explore, settings)

**Files to Create:**
- `src/components/MobileHeader.tsx`

**Files to Update:**
- `src/app/(app)/layout.tsx`

### Phase 2: Explore Page Foundation
**Goal**: Create basic Explore page showing current 4 programs

**Changes Needed:**
1. **Create Explore Page** (`src/app/(app)/explore/page.tsx`)
   - Header: "Explore Programs"
   - Current program card at top (if user has one selected)
   - Grid of 4 program cards (Money, Ego, Relationships, Discipline)
   - Each card shows:
     - Pillar icon
     - Theme/title
     - 30-day duration
     - Brief description
     - "Select Program" button (or "Current" badge)
     - Progress bar if started

2. **Add to Navigation**
   - Sidebar: Add "Explore" link with Compass icon
   - Mobile bottom nav: Add "Explore" icon

**Files to Create:**
- `src/app/(app)/explore/page.tsx`

**Files to Update:**
- `src/components/app-sidebar.tsx`
- `src/components/MobileNav.tsx` (if exists) or bottom nav component
- `src/lib/types.ts` (add ProgramType type)

### Phase 3: Program Data & New Programs
**Goal**: Add Freestyle and Workbook programs with supporting data

**New Data Files:**
1. **Freestyle Program** (`public/data/freestyle-track.json`)
   - Mixed prompts from all pillars
   - Rotates through different themes daily
   - Less structured, more exploratory

2. **Workbook Program** (`public/data/workbook-track.json`)
   - Mirrors print workbook exercises
   - Structured worksheets/activities
   - Special formatting for print-friendly output

**Data Model Updates:**
1. Update `src/lib/types.ts`:
   - Add `ProgramType` type
   - Update `UserProfile` interface with program fields
   - Add `Program` interface for program metadata

2. Update `src/lib/firebase/journal.ts`:
   - Add `updateUserProgram()` function
   - Add `getProgramProgress()` function
   - Add `switchProgram()` function with confirmation

**Files to Create:**
- `public/data/freestyle-track.json`
- `public/data/workbook-track.json`

**Files to Update:**
- `src/lib/types.ts`
- `src/lib/firebase/journal.ts`

### Phase 4: Program Selection & Switching
**Goal**: Allow users to select and switch between programs

**Changes Needed:**
1. **Program Selection Modal** (`src/components/ProgramSelectionModal.tsx`)
   - Confirm before switching programs
   - Warn about losing progress
   - Show what they'll gain from new program

2. **Update Explore Page**
   - Wire up "Select Program" buttons
   - Handle program switching
   - Show completion badges for finished programs
   - Track program history

3. **Update Journal Editor** (`src/app/(app)/journal/new/page.tsx`)
   - Load prompts based on current program
   - Handle Freestyle program (random/AI prompts)
   - Handle Workbook program special formatting

**Files to Create:**
- `src/components/ProgramSelectionModal.tsx`

**Files to Update:**
- `src/app/(app)/explore/page.tsx`
- `src/app/(app)/journal/new/page.tsx`
- `src/lib/firebase/pillarTracks.ts`

### Phase 5: Workbook Monetization
**Goal**: Add purchase/subscription flow for Workbook program

**Changes Needed:**
1. **Workbook Access Check**
   - Create `src/lib/workbookAccess.ts` utility
   - Check for book redemption code OR active subscription
   - Gate Workbook program behind access check

2. **Purchase Flow**
   - Add "Unlock Workbook" modal/page
   - Option 1: Enter book redemption code
   - Option 2: Subscribe for $2/month
   - Integrate with Stripe (if Sprint 8 complete)

3. **Workbook Features**
   - PDF export for workbook entries
   - Print-friendly formatting
   - Chapter progress tracker
   - Special badges/indicators

**Files to Create:**
- `src/lib/workbookAccess.ts`
- `src/components/WorkbookUnlockModal.tsx`
- `src/app/(app)/workbook/page.tsx` (optional dedicated page)

**Files to Update:**
- `src/app/(app)/explore/page.tsx` (add workbook CTA)
- `src/app/(app)/settings/page.tsx` (workbook subscription management)

### Testing Checklist
- [ ] Mobile header shows on all auth pages
- [ ] Logout works from mobile header
- [ ] Explore page loads all 6 programs (4 pillars + Freestyle + Workbook)
- [ ] Can select and switch programs
- [ ] Program progress tracks correctly
- [ ] Freestyle program shows varied prompts
- [ ] Workbook program requires access
- [ ] Book redemption code works
- [ ] Program completion badges appear
- [ ] Navigation works on desktop and mobile

### Success Metrics
- Users can easily discover and switch programs
- Mobile navigation is clearer (logout accessible)
- Workbook program drives book sales or subscriptions
- Freestyle program attracts users who want flexibility

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

**Status**: Sprint 9 Complete - Ready for Sprint 8 (Stripe Integration)
