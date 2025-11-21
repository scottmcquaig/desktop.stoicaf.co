# Stoic.af Development Status - Claude Reference

**Last Updated**: 2025-11-21
**Current Phase**: MVP Development
**Active Branch**: `claude/nextjs-foundation-design-system-01BEGgkwtNVi6QSuaYNtfFyN`

---

## Project Overview

**Stoic.af** is a desktop web journaling platform combining ancient Stoic philosophy with modern AI to build emotional resilience through guided journaling across four pillars: Money, Ego, Relationships, and Discipline.

**Tech Stack:**
- **Framework**: Next.js 16.0.3 (App Router, Turbopack)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.0 + shadcn/ui components
- **Backend**: Firebase (Auth, Firestore, Functions, Storage)
- **State**: Zustand (installed, not yet configured)
- **Data Fetching**: React Query (installed, not yet configured)
- **Icons**: Lucide React

---

## Sprint Progress

### ✅ Sprint 1: Next.js Foundation & Design System (COMPLETE)

**Completed**: 2025-11-21
**Branch**: `claude/nextjs-foundation-design-system-01BEGgkwtNVi6QSuaYNtfFyN`
**Commit**: `bb35471`

**What Was Built:**
- ✅ Next.js 16.0.3 initialized with TypeScript and App Router
- ✅ Tailwind CSS configured with Stoic.af design tokens
- ✅ Complete design system:
  - Primary color: Stoic Blue (#4B90C8)
  - Four pillar colors: Money (green), Ego (purple), Relationships (pink), Discipline (amber)
  - Typography scale (Inter for UI, Playfair Display for quotes)
  - Spacing scale (4px to 48px)
  - Border radius tokens
- ✅ shadcn/ui components manually created:
  - Button (5 variants: default, secondary, outline, ghost, destructive)
  - Input, Textarea, Label
  - Card (with Header, Content, Description)
  - Switch
- ✅ Component showcase page at `/` (src/app/page.tsx)
- ✅ Light/dark theme toggle working
- ✅ Fully responsive design
- ✅ TypeScript compiles with zero errors
- ✅ Build succeeds (`npm run build` ✅)
- ✅ Dev server runs (`npm run dev` ✅)

**Key Files:**
- `src/app/layout.tsx` - Root layout with fonts
- `src/app/page.tsx` - Component showcase
- `src/app/globals.css` - Global styles + CSS variables
- `tailwind.config.ts` - Tailwind config with design tokens
- `src/lib/utils.ts` - cn() helper function
- `src/components/ui/*` - shadcn/ui components

**Quick Start:**
```bash
npm install
npm run dev  # Opens http://localhost:3000
```

---

### 🚧 Sprint 2: Firebase Integration & Authentication (NEXT)

**Status**: Not started
**Documentation**: `SPRINT-2-FIREBASE.md`

**Objectives:**
1. Set up Firebase project (Auth, Firestore, Storage)
2. Configure environment variables
3. Create authentication context and hooks
4. Build login page (email + Google)
5. Build signup page
6. Create 3-step onboarding flow
7. Implement user profile creation in Firestore
8. Add protected route middleware
9. Build dashboard placeholder
10. Deploy Firestore security rules

**Expected Deliverables:**
- Working authentication (signup → onboarding → dashboard)
- User profiles stored in Firestore
- Protected routes
- Login/logout functionality

---

### 📋 Sprint 3: Journal Entry System (PLANNED)

**Focus:**
- Daily journal entry creation
- Entry editor with rich text
- Prompt display system
- Entry save/update to Firestore
- Entry history view
- Date navigation

---

### 📋 Sprint 4: AI Integration (PLANNED)

**Focus:**
- Firebase Cloud Functions for AI
- Prompt selection engine
- AI-powered prompt remixing
- ChadGPT coach integration
- Response streaming

---

### 📋 Sprint 5: Insights & Analytics (PLANNED)

**Focus:**
- Weekly AI summaries
- Mood tracking visualization
- Streak counter
- Pillar progress tracking
- Charts and graphs

---

## Design System Quick Reference

### Colors

**Primary:**
- Stoic Blue: `#4B90C8` (use `text-stoic-blue`, `bg-stoic-blue`)

**Pillar Colors:**
- Money: `#10B981` (green) - `bg-money`
- Ego: `#8B5CF6` (purple) - `bg-ego`
- Relationships: `#EC4899` (pink) - `bg-relationships`
- Discipline: `#F59E0B` (amber) - `bg-discipline`

**Semantic:**
- Success: `#10B981` - `bg-success`
- Warning: `#F59E0B` - `bg-warning`
- Error: `#EF4444` - `bg-error`
- Info: `#3B82F6` - `bg-info`

### Typography

**Fonts:**
- UI: Inter (loaded via Google Fonts link tag)
- Quotes: Playfair Display (use `font-quote` class)

**Sizes:**
- `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`

**Quote Styling:**
```tsx
<blockquote className="quote">
  "The happiness of your life depends upon the quality of your thoughts."
</blockquote>
<p className="quote-author">— Marcus Aurelius</p>
```

### Spacing

- `space-1` = 4px
- `space-2` = 8px
- `space-3` = 12px
- `space-4` = 16px
- `space-6` = 24px
- `space-8` = 32px

### Components

**Button Variants:**
```tsx
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
```

**Button Sizes:**
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

**Card Usage:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

---

## Project Structure

```
desktop.stoicaf.co/
├── 00-AI-INSTRUCTIONS/      # AI agent guides and instructions
├── 01-PROJECT-OVERVIEW/     # Business context and PRD
├── 02-UI-UX-DESIGN/         # Design system, mockups, API contracts
│   ├── DESIGN-SYSTEM.md
│   ├── API-CONTRACTS.md
│   ├── COMPONENT-SPECS.md
│   ├── SCREEN-MOCKUPS.md
│   └── tokens-complete.json # Complete design tokens
├── 03-TECHNICAL-SPECS/      # Architecture documentation
├── 04-DATA-MODELS/          # Database schemas
├── 05-USER-FLOWS/           # User journey documentation
├── 07-CONTENT/              # Copy and prompts
├── src/                     # Next.js application
│   ├── app/                 # App router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Component showcase
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   └── lib/
│       └── utils.ts         # Utility functions
├── SPRINT-1-NEXTJS.md       # Sprint 1 original requirements
├── SPRINT-2-FIREBASE.md     # Sprint 2 requirements (Firebase & Auth)
├── CLAUDE.md                # This file - project status
└── README.md                # Project overview
```

---

## Important Files Reference

### Configuration Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS with design tokens
- `next.config.ts` - Next.js configuration
- `postcss.config.mjs` - PostCSS configuration
- `components.json` - shadcn/ui configuration
- `.gitignore` - Git ignore rules

### Key Application Files
- `src/app/layout.tsx` - Root layout with fonts and providers
- `src/app/page.tsx` - Current homepage (component showcase)
- `src/app/globals.css` - CSS variables and global styles
- `src/lib/utils.ts` - cn() utility for class merging

---

## Development Commands

```bash
# Install dependencies
npm install

# Development
npm run dev        # Start dev server (http://localhost:3000)

# Production
npm run build      # Build for production
npm start          # Run production build

# Code Quality
npm run lint       # Run ESLint (when configured)
```

---

## Git Workflow

**Current Branch**: `claude/nextjs-foundation-design-system-01BEGgkwtNVi6QSuaYNtfFyN`

**Branch Naming Convention**:
- Format: `claude/<feature-description>-<session-id>`
- Example: `claude/nextjs-foundation-design-system-01BEGgkwtNVi6QSuaYNtfFyN`

**Commit Message Format**:
```
<Type>: <Subject>

<Body with bullet points>
- Change 1
- Change 2

<Footer with context>
```

**Push to Remote**:
```bash
git push -u origin <branch-name>
```

---

## Dependencies Installed

### Core
- next@16.0.3
- react@19.2.0
- react-dom@19.2.0
- typescript@5.9.3

### Styling
- tailwindcss@3.4.0
- tailwindcss-animate@1.0.7
- autoprefixer@10.4.22
- postcss@8.5.6
- class-variance-authority@0.7.1
- clsx@2.1.1
- tailwind-merge@3.4.0

### UI Components
- lucide-react@0.554.0
- @radix-ui/react-slot@1.1.1
- @radix-ui/react-label@2.1.1
- @radix-ui/react-switch@1.1.2

### Backend (Ready for Sprint 2)
- firebase@12.6.0

### State & Data (Not yet configured)
- zustand@5.0.8
- @tanstack/react-query@5.90.10

---

## Known Issues / Notes

### Font Loading
- Using Google Fonts via `<link>` tag in layout.tsx
- Environment has network restrictions for next/font API
- Fonts load successfully in browser

### Build Configuration
- Turbopack enabled with system TLS certs
- `experimental.turbopackUseSystemTlsCerts: true` in next.config.ts

### Component Library
- shadcn/ui components manually created (CLI had network issues)
- All components are functional and follow shadcn/ui patterns
- Missing components can be added from https://ui.shadcn.com/docs/components

---

## Next Steps (Sprint 2)

1. **Create Firebase project** in console
2. **Enable Authentication** (Email/Password + Google provider)
3. **Create Firestore database** (start in test mode)
4. **Set up environment variables** (.env.local)
5. **Build authentication context** (AuthProvider)
6. **Create login/signup pages**
7. **Build onboarding flow** (3 steps)
8. **Implement user profile creation**
9. **Deploy security rules**
10. **Test end-to-end auth flow**

See `SPRINT-2-FIREBASE.md` for complete implementation guide.

---

## Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com/docs
- Firebase: https://firebase.google.com/docs
- Lucide Icons: https://lucide.dev/icons

### Design System
- Complete tokens: `02-UI-UX-DESIGN/tokens-complete.json`
- Design system guide: `02-UI-UX-DESIGN/DESIGN-SYSTEM.md`
- Component specs: `02-UI-UX-DESIGN/COMPONENT-SPECS.md`
- API contracts: `02-UI-UX-DESIGN/API-CONTRACTS.md`

---

## Contact

**Repository**: https://github.com/scottmcquaig/desktop.stoicaf.co
**Project Owner**: Scott McQuaig

---

**Status**: Ready for Sprint 2 - Firebase Integration & Authentication 🚀
