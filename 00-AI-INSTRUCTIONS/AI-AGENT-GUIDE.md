# AI Agent Guide for Stoic.af Desktop Development

## Quick Start for AI Agents

You are working on **Stoic.af Desktop**, a Next.js web application for Stoic journaling. This guide helps you understand the project structure and your responsibilities.

## Project Context

### What We're Building
- **Platform**: Next.js 14 desktop web app
- **Core**: Daily journaling with Stoic philosophy
- **AI**: ChadGPT coach and weekly summaries
- **Privacy**: End-to-end encryption, offline-first
- **Tech**: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Firebase

### Current Phase
**DEVELOPMENT READY** - Design phase is complete. Focus on:
1. Building component library with shadcn/ui
2. Implementing user flows
3. Integrating Firebase backend
4. Creating responsive desktop/tablet layouts
5. Testing accessibility and keyboard navigation

## Directory Navigation for AI Agents

### Read These First (In Order)
1. `/00-AI-INSTRUCTIONS/README.md` - Start here
2. `/01-PROJECT-OVERVIEW/PROJECT-BRIEF.md` - Business context
3. `/01-PROJECT-OVERVIEW/USER-PERSONAS.md` - Who we're building for
4. `/02-UI-UX-DESIGN/DESIGN-SYSTEM.md` - Visual language
5. `/05-USER-FLOWS/CRITICAL-USER-FLOWS.md` - How users navigate

### Reference As Needed
- `/02-UI-UX-DESIGN/` - Design specifications
- `/03-TECHNICAL-SPECS/` - Technical requirements
- `/04-DATA-MODELS/` - Database schemas
- `/06-COMPONENTS/` - Component specifications
- `/07-CONTENT/` - Copy and messaging

## Development Guidelines

### What TO DO Now
✅ Build Next.js pages using App Router
✅ Create components with shadcn/ui primitives
✅ Implement responsive layouts (desktop → tablet → mobile)
✅ Set up Firebase Auth and Firestore
✅ Add TypeScript types for all data models
✅ Test keyboard navigation and accessibility
✅ Implement offline functionality with service workers
✅ Use React Hook Form + Zod for form validation

### What NOT TO DO
❌ Don't bypass TypeScript (no `any` types)
❌ Don't inline styles (use Tailwind classes)
❌ Don't create components from scratch (use shadcn/ui first)
❌ Don't skip accessibility attributes
❌ Don't commit secrets or API keys
❌ Don't deploy without testing offline mode

## Key Development Constraints

### Desktop Constraints
- **Viewport**: Design for 1024px+ (desktop), adapt to 768px+ (tablet)
- **Keyboard Nav**: All interactions must work with keyboard
- **Performance**: Lighthouse score > 90
- **Offline**: Must work without internet (service workers)
- **Browser Support**: Chrome, Firefox, Safari, Edge (latest 2 versions)

### Brand Constraints
- **Colors**: Use Stoic.blue (#4B90C8) as primary
- **Typography**: Inter for UI, Playfair Display for quotes
- **Personality**: Calm, wise, supportive
- **Icons**: Use lucide-react icons
- **Components**: Build on shadcn/ui primitives

### Technical Constraints
- **TypeScript**: Strict mode enabled
- **Bundle Size**: <500KB initial JS bundle
- **AI Cost**: <$0.20/user/month
- **Privacy**: No readable journal text in database (encrypt client-side)
- **Accessibility**: WCAG 2.1 AA compliance

## Common AI Agent Tasks

### Task 1: Create a New Page
1. Create file in `app/(routes)/[page-name]/page.tsx`
2. Use App Router conventions (layout.tsx, loading.tsx, error.tsx)
3. Import design tokens from theme configuration
4. Build with shadcn/ui components
5. Add SEO metadata
6. Test keyboard navigation

### Task 2: Build a Component
1. Check if shadcn/ui has a primitive (button, input, card, etc.)
2. If not, create in `components/ui/[component-name].tsx`
3. Define TypeScript props interface
4. Use Tailwind for styling (reference design tokens)
5. Add accessibility attributes (aria-*, role)
6. Document usage in Storybook or comments

### Task 3: Integrate Firebase
1. Use Firebase SDK v9+ (modular)
2. Store config in environment variables
3. Create service files in `lib/firebase/`
4. Use React Query for data fetching
5. Implement offline persistence
6. Handle auth state with context/Zustand

### Task 4: Implement Authentication
1. Use Firebase Auth (email/password, Google)
2. Create auth context with user state
3. Protect routes with middleware
4. Handle loading and error states
5. Persist auth tokens securely
6. Test sign-up, login, logout flows

### Task 5: Add Form Validation
1. Use React Hook Form for form state
2. Define Zod schema for validation
3. Show inline error messages
4. Disable submit until valid
5. Handle async validation (email uniqueness)
6. Test accessibility with screen reader

## Tech Stack Details

### Next.js 14 Best Practices
- Use App Router (not Pages Router)
- Server Components by default
- Client Components only when needed ('use client')
- Route Groups for organization: `(auth)`, `(dashboard)`
- Loading UI with Suspense boundaries
- Error boundaries for graceful failures

### Styling with Tailwind
- Use utility classes (don't create custom CSS unless necessary)
- Reference design tokens in `tailwind.config.ts`
- Use `cn()` helper for conditional classes
- Responsive: `md:`, `lg:`, `xl:` breakpoints
- Dark mode: `dark:` prefix
- Animations: use Tailwind animation utilities

### Component Library (shadcn/ui)
- Install components individually: `npx shadcn-ui add button`
- Components live in `components/ui/`
- Customize via `components.json` config
- Use Radix UI primitives underneath
- Accessible by default

### State Management
- **Local State**: useState for component state
- **Server State**: React Query (@tanstack/react-query)
- **Global State**: Zustand or React Context
- **Form State**: React Hook Form
- **URL State**: Next.js router (searchParams)

### Data Fetching Patterns
```typescript
// Server Component (preferred)
async function getEntries() {
  const entries = await db.collection('entries').get()
  return entries.docs.map(d => d.data())
}

// Client Component with React Query
const { data, isLoading } = useQuery({
  queryKey: ['entries'],
  queryFn: () => fetchEntries()
})
```

### Form Handling Pattern
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})
```

## File Structure

```
desktop.stoicaf.co/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected routes
│   │   ├── home/
│   │   ├── journal/
│   │   └── insights/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── features/            # Feature-specific components
│   └── layouts/             # Layout components
├── lib/
│   ├── firebase/            # Firebase config and services
│   ├── utils/               # Utility functions
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
├── styles/                  # Additional styles
└── types/                   # TypeScript type definitions
```

## Communication Style for AI Agents

### When Writing Code
- Use TypeScript strict mode (no `any`)
- Add JSDoc comments for complex functions
- Use descriptive variable names
- Keep components small (<200 lines)
- Extract reusable logic to hooks

### When Documenting
- Be specific about component props
- Include usage examples
- Note browser compatibility
- Document keyboard interactions
- Keep language concise

### When Asking Questions
- Reference specific files/lines
- Clarify technical constraints
- Consider performance implications
- Think about edge cases
- Validate against design specs

## Quality Checklist for AI Agents

Before completing any task, verify:

### Code Quality
- [ ] TypeScript types defined (no `any`)
- [ ] Components use shadcn/ui primitives
- [ ] Tailwind classes follow design system
- [ ] No console.logs in production code
- [ ] Error boundaries implemented

### Functionality
- [ ] Works on desktop (1920px) and tablet (768px)
- [ ] Keyboard navigation functional
- [ ] Forms validate correctly
- [ ] Loading states shown
- [ ] Errors handled gracefully

### Accessibility
- [ ] ARIA labels on interactive elements
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader tested
- [ ] Keyboard shortcuts documented

### Performance
- [ ] Images optimized (next/image)
- [ ] Code splitting applied
- [ ] Bundle size acceptable
- [ ] Lighthouse score > 90
- [ ] No unnecessary re-renders

### Security
- [ ] No secrets in code
- [ ] Firebase rules configured
- [ ] XSS prevention (sanitize inputs)
- [ ] CSRF protection
- [ ] Secure authentication flow

## Development Workflow

### Sprint Structure
1. **Sprint 1**: Design system + shadcn/ui setup
2. **Sprint 2**: Authentication flows
3. **Sprint 3**: Journal entry CRUD
4. **Sprint 4**: Prompt system integration
5. **Sprint 5**: AI features (summaries, chat)
6. **Sprint 6**: Insights and analytics
7. **Sprint 7**: Settings and profile
8. **Sprint 8**: Polish and optimization

### Git Workflow
- Branch naming: `feature/page-name`, `fix/bug-description`
- Commit messages: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- PR template: Include screenshots, testing notes
- Code review: Check accessibility, performance, TypeScript

### Testing Strategy
- **Unit Tests**: Jest for utilities and hooks
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright (critical user flows)
- **Manual Testing**: Keyboard nav, screen reader, offline mode

## Getting Unstuck

### If you're unsure about:
- **Design specs**: Check `/02-UI-UX-DESIGN/SCREEN-MOCKUPS.md`
- **User flows**: See `/05-USER-FLOWS/CRITICAL-USER-FLOWS.md`
- **Data models**: Reference `/04-DATA-MODELS/PROMPT-MODELS.md`
- **Tech stack**: Review `/03-TECHNICAL-SPECS/`
- **shadcn/ui**: Visit https://ui.shadcn.com/docs

### If you need to:
- **Add a component**: Check shadcn/ui first, then build custom
- **Style something**: Use Tailwind utilities, reference design tokens
- **Fetch data**: Use React Query for async state
- **Handle forms**: React Hook Form + Zod validation
- **Store state**: Local (useState), Server (React Query), Global (Zustand)

## Final Reminders

1. **Desktop First**: Optimize for keyboard and large screens
2. **Type Safety**: TypeScript strict mode, no `any`
3. **Component Library**: Use shadcn/ui primitives
4. **Accessibility**: WCAG AA, keyboard nav, ARIA labels
5. **Performance**: Bundle size, Lighthouse, offline mode
6. **Privacy**: Client-side encryption, secure Firebase rules
7. **Design System**: Follow tokens exactly

## Success Metrics

Your code is successful when:
- TypeScript compiles with zero errors
- All pages load in <2 seconds
- Lighthouse score > 90 across all metrics
- Keyboard navigation works perfectly
- Works offline (service workers)
- Accessible to screen readers
- Matches design mockups exactly

## Questions to Ask Yourself

Before starting any task:
1. Have I read the relevant design specs?
2. Does shadcn/ui have a component I can use?
3. Is this accessible with keyboard only?
4. How does this work offline?
5. What are the edge cases?
6. Have I added TypeScript types?
7. Does this match the design system tokens?
