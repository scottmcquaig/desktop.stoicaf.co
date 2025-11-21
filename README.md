# Stoic.af — Desktop Web Application

Build habits across **Money • Ego • Relationships • Discipline**

## 🎯 Project Status

**Current Phase**: ✅ Design Complete — Ready for Development
**Target Launch**: Q3 2025
**Platform**: Desktop Web (Next.js 14)

### Design Completion Summary
- ✅ 24 screen mockups (desktop & tablet layouts)
- ✅ Complete design tokens and component library
- ✅ API contracts and Firebase data models
- ✅ Technical dependencies formalized
- ✅ Accessibility documentation (WCAG AA compliant)
- ✅ Responsive layouts for all breakpoints

**Next Step**: Initialize Next.js project and begin component development

## 📁 Repository Structure

This repository is organized for optimal AI agent comprehension and efficient development workflow.

```
/00-AI-INSTRUCTIONS/    # 🤖 START HERE - Instructions for AI agents
  └── README.md         # AI agent quick start guide
  └── AI-AGENT-GUIDE.md # Comprehensive AI development guide

/01-PROJECT-OVERVIEW/   # 📋 Business context and vision
  └── PROJECT-BRIEF.md  # Executive summary and goals
  └── USER-PERSONAS.md  # Target audience profiles
  └── PRD.md           # Product requirements document

/02-UI-UX-DESIGN/      # 🎨 Design system and specifications
  └── DESIGN-SYSTEM.md # Colors, typography, components
  └── UI-UX-REQUIREMENTS.md # Detailed design requirements
  └── SCREEN-MOCKUPS.md # 24 complete screen specifications
  └── COMPONENT-SPECS.md # Complete component library specs
  └── API-CONTRACTS.md # Firebase data models and API shapes
  └── DEPENDENCIES.md  # Next.js packages and tech stack
  └── tokens.json      # Basic design tokens
  └── tokens-complete.json # Complete design tokens (production-ready)

/03-TECHNICAL-SPECS/   # ⚙️ Architecture and implementation
  └── developer-onboarding.md # Tech stack and setup
  └── PROMPT-SELECTION-ENGINE.md # Prompt selection logic

/04-DATA-MODELS/       # 🗄️ Database schemas and APIs
  └── PROMPT-MODELS.md # Prompt system data schemas

/05-USER-FLOWS/        # 🚶 User journeys and interactions
  └── CRITICAL-USER-FLOWS.md # Core application flows

/06-COMPONENTS/        # 🧩 Component specifications
  └── (To be created during development)

/07-CONTENT/           # ✍️ Copy, prompts, and messaging
  └── prompts/         # 3-tier prompt system (tracks, general, personalized)

/08-DEPLOYMENT/        # 🚀 Build and deployment guides
  └── (To be created)
```

## 🚀 Quick Start

### For AI Agents
1. Start with `/00-AI-INSTRUCTIONS/README.md`
2. Read the AI Agent Guide for context
3. Follow the directory structure sequentially

### For Developers
1. Review `/01-PROJECT-OVERVIEW/PROJECT-BRIEF.md`
2. Check `/03-TECHNICAL-SPECS/developer-onboarding.md`
3. Understand the design system in `/02-UI-UX-DESIGN/`

### For Designers
1. Start with `/01-PROJECT-OVERVIEW/USER-PERSONAS.md`
2. Review `/02-UI-UX-DESIGN/` completely
3. Study `/05-USER-FLOWS/CRITICAL-USER-FLOWS.md`

## 🎯 What is Stoic.af?

Stoic.af is a desktop web journaling platform that combines ancient Stoic philosophy with modern AI technology to help users build emotional resilience and self-mastery through:

- **Four Pillars System**: 30-day guided tracks for Money, Ego, Relationships, and Discipline
- **Living Notebook**: Single daily entry that evolves throughout the day
- **Adaptive Prompts**: AI-powered prompts that adapt to your patterns
- **ChadGPT Coach**: Personalized AI coaching with adjustable personality
- **Weekly Insights**: AI-generated summaries of your progress
- **Privacy First**: End-to-end encryption with offline-first design

## 💡 Key Features

### Free Tier
- Daily journaling with one entry
- Basic Stoic prompts (3 per day)
- 7-day entry history
- Mood tracking
- Streak counter

### Pro Tier ($5/month)
- Unlimited journal entries
- AI-powered prompt remixing
- Weekly AI summaries
- Full history with search
- Advanced insights and charts
- ChadGPT coaching sessions
- Export capabilities

## 🏗️ Technical Stack

### Desktop Web
- **Framework**: Next.js 14 App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand or React Context
- **Backend**: Firebase (Auth, Firestore, Functions)
- **AI**: Genkit + Gemini Flash
- **Payments**: Stripe
- **Database**: Firestore with offline sync
- **Hosting**: Vercel or Firebase App Hosting

## 🎨 Design Principles

1. **Desktop-First**: Optimized for keyboard navigation and large screens
2. **Calm Technology**: Interface fades, content shines
3. **Instant Response**: Offline-first with optimistic updates
4. **Privacy Sacred**: Client-side encryption always
5. **Accessible**: WCAG 2.1 AA compliance minimum

## 📈 Project Phases

### Phase 1: Design ✅ COMPLETE
- [x] Complete UI/UX mockups (24 screens: desktop & tablet)
- [x] Define component library (12 core components with variants)
- [x] Create user flow diagrams (critical flows documented)
- [x] Establish design system (tokens, colors, typography, spacing)
- [x] Prepare developer handoff (API contracts, dependencies, specs)

### Phase 2: MVP Development (CURRENT)
- [ ] Next.js app core features
- [ ] Firebase backend setup
- [ ] Basic AI integration
- [ ] Offline functionality with service workers
- [ ] Beta testing

### Phase 3: Launch Preparation
- [ ] Payment integration
- [ ] Advanced AI features
- [ ] Performance optimization
- [ ] Security audit
- [ ] Production deployment

### Phase 4: Growth
- [ ] Progressive Web App (PWA) features
- [ ] Community features
- [ ] B2B offerings
- [ ] International expansion

---

## 🚀 Development-Ready Documentation

All design and specification work is complete. Developers can begin implementation immediately using these resources:

### Essential Documentation

| Document | Purpose | Location |
|----------|---------|----------|
| **Screen Mockups** | 24 complete screen specs (desktop/tablet) | [`02-UI-UX-DESIGN/SCREEN-MOCKUPS.md`](02-UI-UX-DESIGN/SCREEN-MOCKUPS.md) |
| **Component Library** | 12 core components with variants, states, and props | [`02-UI-UX-DESIGN/COMPONENT-SPECS.md`](02-UI-UX-DESIGN/COMPONENT-SPECS.md) |
| **Design Tokens** | Complete token system (colors, spacing, typography, shadows) | [`02-UI-UX-DESIGN/tokens-complete.json`](02-UI-UX-DESIGN/tokens-complete.json) |
| **API Contracts** | Firebase data models, Firestore collections, sync strategy | [`02-UI-UX-DESIGN/API-CONTRACTS.md`](02-UI-UX-DESIGN/API-CONTRACTS.md) |
| **Dependencies** | Next.js packages, rationale, installation instructions | [`02-UI-UX-DESIGN/DEPENDENCIES.md`](02-UI-UX-DESIGN/DEPENDENCIES.md) |

### Quick Start for Developers

```bash
# 1. Review the complete design system
cat 02-UI-UX-DESIGN/SCREEN-MOCKUPS.md
cat 02-UI-UX-DESIGN/COMPONENT-SPECS.md

# 2. Understand the data models
cat 02-UI-UX-DESIGN/API-CONTRACTS.md

# 3. Check dependencies and tech stack
cat 02-UI-UX-DESIGN/DEPENDENCIES.md

# 4. Initialize Next.js project
npx create-next-app@latest stoic-web --typescript --tailwind --app --src-dir --import-alias "@/*"
cd stoic-web

# 5. Install additional dependencies
npm install firebase @tanstack/react-query zustand lucide-react

# 6. Install shadcn/ui
npx shadcn-ui@latest init

# 7. Set up Firebase
# Add Firebase config to .env.local

# 8. Start building components!
npm run dev
```

### Development Approach

**Recommended:** Component-Driven Development
1. **Week 1-2**: Build design system foundation (tokens, theme, base components with shadcn/ui)
2. **Week 3-4**: Implement core components (Button, Input, Card, Modal)
3. **Week 5+**: Assemble features sprint-by-sprint using components

**Estimated Timeline:**
- Foundation: 2 weeks
- Component Library: 2 weeks
- Feature Development: 8-10 weeks (8 sprints)
- **Total to MVP**: ~13 weeks

---

## 🤝 Contributing

This project is currently in private development. For questions or contributions:

1. **Design Contributions**: Focus on desktop-first mockups
2. **Documentation**: Keep AI-agent friendly formatting
3. **Code**: Follow Next.js 14 best practices

## 📞 Contact

**Project Owner**: Scott McQuaig
**Repository**: [github.com/scottmcquaig/desktop.stoicaf.co](https://github.com/scottmcquaig/desktop.stoicaf.co)
**Design Philosophy**: Build with virtue, ship with clarity

## 📜 Core Philosophy

> "You have power over your mind — not outside events. Realize this, and you will find strength."
> — Marcus Aurelius

Stoic.af transforms daily stress into Stoic strength through guided journaling that adapts to your life.

## ⚖️ License

Proprietary — All rights reserved.
© 2025 SwgSzn LLC

---

**Note for AI Agents**: This repository is structured specifically for optimal AI comprehension. Always start with `/00-AI-INSTRUCTIONS/` for context and guidelines.
