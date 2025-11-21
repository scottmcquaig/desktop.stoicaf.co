# AI Agent Instructions - START HERE

## Project: Stoic.af - Desktop Web Stoic Journaling App

This directory contains all instructions organized for optimal AI agent comprehension. Read these files in sequence for complete context.

## Directory Structure

```
00-AI-INSTRUCTIONS/         # START HERE - AI agent instructions
01-PROJECT-OVERVIEW/        # Business context and vision
02-UI-UX-DESIGN/           # Design system and mockups
03-TECHNICAL-SPECS/        # Architecture and implementation
04-DATA-MODELS/            # Database schemas and APIs
05-USER-FLOWS/             # User journeys and interactions
06-COMPONENTS/             # Component specifications
07-CONTENT/                # Copy, prompts, and messaging
08-DEPLOYMENT/             # Build and deployment guides
```

## Quick Context for AI Agents

**Product**: Desktop web Stoic journaling app with AI coaching
**Tech Stack**: Next.js 14, Tailwind CSS, shadcn/ui, Firebase, Gemini AI
**Current Phase**: Ready for Development
**Key Features**:
- Daily journaling with adaptive prompts
- Four pillars: Money, Ego, Relationships, Discipline
- Weekly AI summaries
- ChadGPT AI coach
- Offline-first with encryption

## Development Process Order

1. Read PROJECT-BRIEF.md in 01-PROJECT-OVERVIEW
2. Review DESIGN-SYSTEM.md in 02-UI-UX-DESIGN
3. Check USER-PERSONAS.md for target audience
4. Follow USER-FLOWS for interaction patterns
5. Review COMPONENTS for UI specifications

## Important Notes for AI Agents

- This is a **DESKTOP-FIRST** design (Next.js web app)
- Privacy is critical - all journal entries are encrypted
- AI costs must stay under $0.20/user/month
- Offline functionality is mandatory (service workers)
- Follow Stoic philosophy principles in all design decisions
- Use shadcn/ui for component primitives
- Optimize for keyboard navigation

## Current Status

- [x] UI/UX Design Phase (COMPLETE)
- [x] Component Library Definition (COMPLETE)
- [x] User Flow Diagrams (COMPLETE)
- [x] Design System Tokens (COMPLETE)
- [ ] Development Phase (READY TO START)

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State**: Zustand or React Context
- **Forms**: React Hook Form + Zod

### Backend
- **Auth**: Firebase Authentication
- **Database**: Firestore
- **Functions**: Firebase Cloud Functions
- **AI**: Genkit + Gemini Flash
- **Storage**: Firebase Storage (encrypted)

### Development
- **Language**: TypeScript
- **Package Manager**: npm or pnpm
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library

## Contact

Project Owner: Scott McQuaig
Repository: github.com/scottmcquaig/desktop.stoicaf.co
