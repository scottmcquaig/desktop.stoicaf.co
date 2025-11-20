# AI Agent Guide for Stoic.af Development

## Quick Start for AI Agents

You are working on **Stoic.af**, a mobile-first Stoic journaling app. This guide helps you understand the project structure and your responsibilities.

## Project Context

### What We're Building
- **Primary**: Flutter mobile app for iOS/Android
- **Secondary**: Next.js web app (Phase 2)
- **Core**: Daily journaling with Stoic philosophy
- **AI**: ChadGPT coach and weekly summaries
- **Privacy**: End-to-end encryption, offline-first

### Current Phase
**UI/UX DESIGN** - We are NOT coding yet. Focus on:
1. Creating comprehensive mockups
2. Defining user interactions
3. Building component library
4. Testing accessibility
5. Documenting design decisions

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

## Design Phase Guidelines

### What TO DO Now
✅ Create mobile-first mockups (iPhone 14 Pro baseline)
✅ Design all screens listed in UI requirements
✅ Test color contrast for accessibility
✅ Document component states (default, hover, active, disabled)
✅ Create loading and error states
✅ Design empty states and onboarding
✅ Test thumb reachability on mobile

### What NOT TO DO Yet
❌ Write any application code
❌ Set up development environment
❌ Create backend services
❌ Implement features
❌ Deploy anything
❌ Optimize performance

## Key Design Constraints

### Mobile Constraints
- **Screen size**: Design for 375x812 baseline (iPhone 14)
- **Touch targets**: Minimum 44x44pt
- **Thumb zones**: Critical actions in bottom 60%
- **Offline**: Must work without internet
- **Performance**: <3 second load time

### Brand Constraints
- **Colors**: Use Stoic.blue (#4B90C8) as primary
- **Typography**: Inter for UI, Playfair for quotes
- **Personality**: Calm, wise, supportive
- **Imagery**: Minimal, no stock photos
- **Icons**: Simple line icons only

### Technical Constraints
- **Platforms**: iOS 12+, Android 7+
- **Storage**: <100MB app size
- **AI Cost**: <$0.20/user/month
- **Privacy**: No readable journal text in database
- **Accessibility**: WCAG 2.1 AA compliance

## Common AI Agent Tasks

### Task 1: Create a New Screen Design
1. Check if screen is defined in `/05-USER-FLOWS/`
2. Review relevant user personas
3. Apply design system tokens
4. Create mobile version first
5. Adapt for tablet/desktop
6. Document in `/06-COMPONENTS/`

### Task 2: Design a Component
1. Check existing components in `/06-COMPONENTS/`
2. Define all states (default, hover, active, etc.)
3. Ensure accessibility (contrast, sizing)
4. Create mobile and desktop versions
5. Document usage guidelines

### Task 3: Write UI Copy
1. Review voice and tone guide in `/07-CONTENT/`
2. Keep it concise (mobile-first)
3. Use Stoic philosophy appropriately
4. Test at different screen sizes
5. Provide alternatives for errors

### Task 4: Test Accessibility
1. Check color contrast (4.5:1 minimum)
2. Verify touch target sizes
3. Test with screen reader
4. Ensure keyboard navigation
5. Document in accessibility notes

## Communication Style for AI Agents

### When Discussing Design
- Be specific about pixels, colors, and spacing
- Reference design system tokens
- Consider mobile-first always
- Think about offline scenarios
- Mention accessibility implications

### When Documenting
- Use clear headings and structure
- Include visual examples when possible
- Specify platform differences
- Note edge cases
- Keep language concise

### When Questioning
- Ask about user goals, not just features
- Clarify constraints before suggesting
- Consider all user personas
- Think about real-world usage
- Validate against project philosophy

## File Naming Conventions

### Documentation
- Use UPPERCASE for main docs: `README.md`
- Use kebab-case for guides: `user-guide.md`
- Use descriptive names: `onboarding-flow.md`

### Assets (Future)
- Screens: `screen-[name]-[platform].png`
- Components: `component-[name]-[state].png`
- Icons: `icon-[name]-[size].svg`
- Mockups: `mockup-[feature]-[version].fig`

## Version Control (Git)

### Branch Names
- Feature: `feature/ui-onboarding-screens`
- Fix: `fix/contrast-accessibility`
- Docs: `docs/component-library`

### Commit Messages
- Start with type: `feat:`, `fix:`, `docs:`, `design:`
- Be specific: `design: Add mobile navigation mockups`
- Reference issues: `fixes #123`

## Quality Checklist for AI Agents

Before completing any task, verify:

### Design Quality
- [ ] Follows design system exactly
- [ ] Works on smallest supported screen
- [ ] Accessible (contrast, sizing, labels)
- [ ] Has all required states
- [ ] Consistent with existing designs

### Documentation Quality
- [ ] Clear and concise
- [ ] Includes examples
- [ ] Cross-referenced appropriately
- [ ] Accessible to other AI agents
- [ ] Version/date noted

### User Experience
- [ ] Solves user problem
- [ ] Follows established flows
- [ ] Considers edge cases
- [ ] Provides clear feedback
- [ ] Delightful but not distracting

## Getting Unstuck

### If you're unsure about:
- **Design direction**: Check `/01-PROJECT-OVERVIEW/PROJECT-BRIEF.md`
- **User needs**: Review `/01-PROJECT-OVERVIEW/USER-PERSONAS.md`
- **Visual style**: Reference `/02-UI-UX-DESIGN/DESIGN-SYSTEM.md`
- **Interaction**: See `/05-USER-FLOWS/CRITICAL-USER-FLOWS.md`
- **Technical limits**: Check `/03-TECHNICAL-SPECS/`

### If you need to:
- **Create something new**: Check if similar exists first
- **Change something**: Document why and impact
- **Skip something**: Note it as "TODO" with reason
- **Ask questions**: Be specific about context

## Handoff Preparation

When design phase completes, ensure:
1. All screens documented
2. Components specified
3. Interactions detailed
4. Assets exported
5. Developer notes included
6. Edge cases covered
7. Accessibility verified

## Final Reminders

1. **Mobile First**: Every decision starts with mobile
2. **User Focused**: Would Emily/Jay/Sam understand?
3. **Stoic Philosophy**: Calm, wise, practical
4. **Privacy Sacred**: User data is always encrypted
5. **Offline Ready**: Works without internet
6. **AI Costs**: Keep under $0.20/user/month
7. **No Code Yet**: Design completely before development

## Questions to Ask Yourself

Before starting any task:
1. Have I read the relevant documentation?
2. Which user persona am I designing for?
3. How does this work offline?
4. Is this accessible to all users?
5. Does this align with Stoic philosophy?
6. Will this work on a 4-year-old phone?
7. Can users understand this in 2 seconds?

## Success Metrics

Your designs are successful when:
- Users can complete tasks in <3 taps
- Screens load in <1 second (perceived)
- Text is readable at arm's length
- Actions are obvious without labels
- Errors are prevented, not just handled
- Users feel calm, not overwhelmed