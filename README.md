# Stoic.af — Mobile-First Stoic Journaling App

Build habits across **Money • Ego • Relationships • Discipline**

## 🎯 Project Status

**Current Phase**: UI/UX Design (Pre-Development)
**Target Launch**: Q2 2025
**Platforms**: iOS & Android (Flutter) → Web (Next.js)

## 📁 Repository Structure

This repository is organized for optimal AI agent comprehension and efficient development workflow.

```
/00-AI-INSTRUCTIONS/    # 🤖 START HERE - Instructions for AI agents
  └── README.md         # AI agent quick start guide
  └── AI-AGENT-GUIDE.md # Comprehensive AI development guide
  └── MCP-SERVERS-GUIDE.md # MCP setup for UI/UX tools

/01-PROJECT-OVERVIEW/   # 📋 Business context and vision
  └── PROJECT-BRIEF.md  # Executive summary and goals
  └── USER-PERSONAS.md  # Target audience profiles
  └── PRD.md           # Product requirements document

/02-UI-UX-DESIGN/      # 🎨 Design system and specifications
  └── DESIGN-SYSTEM.md # Colors, typography, components
  └── UI-UX-REQUIREMENTS.md # Detailed design requirements
  └── tokens.json      # Design tokens for development

/03-TECHNICAL-SPECS/   # ⚙️ Architecture and implementation
  └── developer-onboarding.md # Tech stack and setup

/04-DATA-MODELS/       # 🗄️ Database schemas and APIs
  └── (To be created)

/05-USER-FLOWS/        # 🚶 User journeys and interactions
  └── CRITICAL-USER-FLOWS.md # Core application flows

/06-COMPONENTS/        # 🧩 Component specifications
  └── (To be created during design phase)

/07-CONTENT/           # ✍️ Copy, prompts, and messaging
  └── (To be created)

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

Stoic.af is a mobile-first journaling platform that combines ancient Stoic philosophy with modern AI technology to help users build emotional resilience and self-mastery through:

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

### Mobile (Primary)
- **Framework**: Flutter 3.x
- **State**: Riverpod/Bloc
- **Backend**: Firebase (Auth, Firestore, Functions)
- **AI**: Genkit + Gemini Flash
- **Payments**: Stripe

### Web (Phase 2)
- **Framework**: Next.js 14 App Router
- **Database**: Firestore with offline sync
- **Hosting**: Firebase App Hosting

## 🎨 Design Principles

1. **Mobile-First**: Every interaction optimized for mobile
2. **Calm Technology**: Interface fades, content shines
3. **Instant Response**: Offline-first with optimistic updates
4. **Privacy Sacred**: Client-side encryption always
5. **Accessible**: WCAG 2.1 AA compliance minimum

## 📈 Project Phases

### Phase 1: Design (Current)
- [ ] Complete UI/UX mockups
- [ ] Define component library
- [ ] Create user flow diagrams
- [ ] Establish design system
- [ ] Prepare developer handoff

### Phase 2: MVP Development
- [ ] Flutter app core features
- [ ] Firebase backend setup
- [ ] Basic AI integration
- [ ] Offline functionality
- [ ] Beta testing

### Phase 3: Launch Preparation
- [ ] Payment integration
- [ ] Advanced AI features
- [ ] Performance optimization
- [ ] Security audit
- [ ] App store submission

### Phase 4: Growth
- [ ] Next.js web app
- [ ] Community features
- [ ] B2B offerings
- [ ] International expansion

## 🤝 Contributing

This project is currently in private development. For questions or contributions:

1. **Design Contributions**: Focus on mobile-first mockups
2. **Documentation**: Keep AI-agent friendly formatting
3. **Code**: No code contributions until Phase 2

## 📞 Contact

**Project Owner**: Scott McQuaig
**Repository**: [github.com/scottmcquaig/app.stoicaf.co](https://github.com/scottmcquaig/app.stoicaf.co)
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