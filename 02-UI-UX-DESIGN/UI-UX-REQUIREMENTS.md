# UI/UX Design Requirements

## Design Philosophy

### Core Principles
1. **Calm Technology**: The interface should fade into the background, letting content shine
2. **Mobile-First**: Every interaction optimized for thumb reach and one-handed use
3. **Instant Response**: Perceived performance through optimistic updates and local-first
4. **Progressive Disclosure**: Show only what's needed when it's needed
5. **Accessible**: WCAG 2.1 AA compliance minimum

## Mobile Design Specifications

### Screen Categories

#### 1. Onboarding Screens (First-Time User Experience)
- **Welcome Screen**: App value prop, sign-up/login CTAs
- **Auth Screen**: Email/Google/Apple sign-in
- **Virtue Selection**: Choose focus (Money/Ego/Relationships/Discipline)
- **Tone Selection**: Choose ChadGPT personality
- **Notification Setup**: Permission request and scheduling

#### 2. Core Journaling Screens
- **Today View**: Current day's living notebook entry
- **Editor Screen**: Full-screen writing experience
- **Quick Capture**: Modal overlay for fast thoughts
- **Prompt Selection**: Swipeable prompt cards
- **Mood Tracker**: Visual mood selection

#### 3. Navigation & Discovery
- **Home Dashboard**: Streak, mood chart, quick actions
- **Journal List**: Searchable, filterable entry history
- **Insights**: Charts, patterns, AI summaries
- **Settings**: Profile, subscription, preferences

#### 4. AI Features
- **ChadGPT Chat**: Coaching conversation interface
- **Weekly Summary**: AI-generated insights display
- **Prompt Remix**: AI customization interface

### Mobile-Specific Interactions

#### Gestures
- **Swipe right**: Navigate back
- **Swipe left**: Quick actions menu
- **Pull down**: Refresh/sync
- **Long press**: Context menu
- **Pinch**: Zoom text in reader

#### Touch Targets
- Minimum: 44x44pt (iOS) / 48x48dp (Android)
- Preferred: 48x48pt minimum
- Spacing: 8pt minimum between targets

#### Thumb Zones
- **Green Zone** (Easy): Bottom 60% of screen
- **Yellow Zone** (Stretch): Top 30%, far edges
- **Red Zone** (Hard): Top corners

Place critical actions in green zone:
- Primary CTAs
- Navigation tabs
- Quick entry button

### Component Specifications

#### Bottom Navigation (Mobile)
```
Height: 56dp + safe area
Items: 4 max
- Today (journal icon)
- Insights (chart icon)
- CHAD (floating center button)
- Profile (user icon)
```

#### Floating Action Button (FAB)
```
Position: Bottom right, 16dp margin
Size: 56dp diameter
Actions:
- Primary: Quick journal entry
- Long press: Voice note
- Swipe up: Full editor
```

#### Entry Cards
```
Padding: 16dp
Corner radius: 12dp
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Content:
- Date/time (overline)
- Mood indicator (visual)
- Entry preview (2-3 lines)
- Tags (pills)
- Word count (metadata)
```

#### Editor Specifications
```
Font size: 16sp default (adjustable 14-20sp)
Line height: 1.6
Padding: 20dp horizontal
Features:
- Markdown support (bold, italic, lists)
- Auto-save indicator
- Word count
- Offline indicator
- Template selector (bottom sheet)
```

## Web/Desktop Adaptations

### Responsive Breakpoints
- **Mobile**: 0-767px (phone)
- **Tablet**: 768-1023px (tablet portrait)
- **Desktop**: 1024px+ (tablet landscape & desktop)

### Desktop Layout
```
Sidebar (240px) | Content (max 768px) | Optional Right Panel (320px)
```

### Desktop-Specific Features
- Keyboard shortcuts (⌘+K quick entry)
- Multi-pane layouts
- Hover states
- Advanced search/filter
- Bulk operations
- Data export tools

## Accessibility Requirements

### Visual
- Color contrast: 4.5:1 minimum (7:1 for small text)
- Focus indicators: 3px outline minimum
- Text resize: Up to 200% without horizontal scroll
- Dark mode: System preference detection

### Motor
- All functions keyboard accessible
- No time limits on interactions
- Gesture alternatives for all swipe actions
- Large touch targets (48x48dp minimum)

### Cognitive
- Clear labels (no icon-only buttons for critical actions)
- Consistent navigation patterns
- Error prevention and clear recovery
- Simple language (8th grade reading level)

### Screen Readers
- Semantic HTML structure
- ARIA labels for interactive elements
- Heading hierarchy
- Form field labels and descriptions

## Performance Targets

### Mobile
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Layout Shift: < 0.1
- Input latency: < 50ms
- Scroll performance: 60fps

### Perceived Performance
- Skeleton screens while loading
- Optimistic updates for user actions
- Progressive image loading
- Lazy load below-fold content
- Offline-first with background sync

## Platform-Specific Considerations

### iOS (Flutter)
- Safe area respect (notch, home indicator)
- iOS-style navigation transitions
- Haptic feedback for actions
- iOS date/time pickers
- Apple sign-in button styling

### Android (Flutter)
- Material Design 3 principles
- Back button handling
- Material transitions
- Android-style notifications
- Google sign-in integration

### Web (Next.js)
- Progressive enhancement
- SEO optimization (public pages only)
- Browser compatibility (last 2 versions)
- PWA capabilities
- Responsive images

## Design System Integration

All designs must use tokens from `/02-UI-UX-DESIGN/tokens.json`:
- Colors from defined palette
- Typography scale
- Spacing units (4px base)
- Border radius values
- Shadow definitions

## Micro-interactions

### Feedback Animations
- Button press: Scale 0.95 with ease-out
- Success: Green check with subtle bounce
- Loading: Pulsing skeleton or spinner
- Error: Shake animation with red highlight

### Transitions
- Screen navigation: 250ms slide
- Modal appearance: 200ms fade + scale
- Tab switches: 150ms fade
- Accordion expand: 200ms height animation

## Empty States

Each screen needs designed empty states:
- No entries yet: Encouraging CTA to start journaling
- No internet: Offline mode explanation
- No search results: Suggestions to refine
- No insights yet: Minimum entries needed
- Loading: Skeleton screens

## Error Handling

### Error Types
1. **Network errors**: Offline mode activation
2. **Validation errors**: Inline field messages
3. **System errors**: Toast notifications
4. **Permission errors**: Educational dialogs

### Recovery
- Clear error messages (what went wrong)
- Actionable solutions (what to do)
- Retry mechanisms
- Fallback options

## Testing Requirements

### Usability Testing
- Task completion rates > 90%
- Time on task within benchmarks
- Error rates < 5%
- User satisfaction > 4.5/5

### Device Testing
- iPhone (11 Pro, 13, 15 Pro)
- Android (Pixel 5, Samsung S21)
- iPad (Air, Pro)
- Desktop (Chrome, Safari, Firefox)

### Accessibility Testing
- Screen reader navigation
- Keyboard-only navigation
- Color blind modes
- Text scaling (up to 200%)

## Design Deliverables Checklist

### Required Mockups
- [ ] Mobile onboarding flow (5 screens)
- [ ] Mobile core screens (10 screens)
- [ ] Tablet adaptations (5 screens)
- [ ] Desktop layouts (5 screens)
- [ ] Component library
- [ ] Interaction prototypes
- [ ] Design system documentation

### Required Specs
- [ ] Color palette with accessibility notes
- [ ] Typography scale and usage
- [ ] Spacing and grid system
- [ ] Icon library
- [ ] Animation guidelines
- [ ] Platform-specific adaptations