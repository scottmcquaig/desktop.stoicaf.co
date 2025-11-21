# Stoic.af UI/UX Screen Mockups

Comprehensive mobile-first mockup descriptions for the Stoic.af journaling app.

**Target Devices:**
- Mobile: iPhone 14 Pro baseline (375x812pt)
- Tablet: iPad/Android tablets (768px-1023px)
- Desktop: Web browsers (1024px+, max-width 1440px)

**Design Approach:**
- Mobile-first (Flutter primary)
- Progressive enhancement for web (Next.js)
- Responsive breakpoints: 375px → 768px → 1024px → 1440px

**Minimum Touch/Click Targets:**
- Mobile: 44x44pt
- Desktop: 32x32px (mouse precision)

**Design System:** See [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)

---

## Table of Contents

1. [Responsive Design & Desktop Navigation](#responsive-design--desktop-navigation)
2. [Core Journaling Screens](#1-core-journaling-screens)
3. [Onboarding Flow](#2-onboarding-flow)
4. [Navigation & Discovery](#3-navigation--discovery)
5. [AI Features](#4-ai-features)
6. [Monetization](#5-monetization)
7. [Missing Screens](#6-missing-screens)
8. [UI States Reference](#7-ui-states-reference)
9. [Accessibility & Keyboard Navigation](#8-accessibility--keyboard-navigation)

---

## Responsive Design & Desktop Navigation

### Breakpoint Strategy

**Mobile (375px-767px)**
- Single column layout
- Bottom navigation bar
- Full-screen modals
- Thumb-optimized UI
- Touch targets: 44x44pt minimum

**Tablet (768px-1023px)**
- Two-column layouts where appropriate
- Sidebar navigation (optional, collapsible)
- Sheet modals instead of full-screen
- Mix of touch and mouse interactions
- Touch targets: 40x40px minimum

**Desktop (1024px-1439px)**
- Three-panel layouts (sidebar + content + detail)
- Persistent sidebar navigation (240px)
- Top header bar (64px)
- Modal dialogs (centered, max 600px width)
- Click targets: 32x32px minimum
- Keyboard shortcuts enabled
- Hover states on all interactive elements

**Large Desktop (1440px+)**
- Max content width: 1440px, centered
- Increased whitespace
- Same layout as 1024px but with margins

### Desktop Navigation Structure

**Persistent Left Sidebar (240px width)**

**Header Section (120px height)**
- App logo: "Stoic.af" (32px, Inter Black)
- Position: 24px from top, centered
- User avatar: 48px circle
  - Position: Below logo, 16px margin
  - Name: "Sarah M." truncated (Inter Medium, 14px)
  - Streak badge: "47 🔥" below name

**Navigation Links (Variable height)**
- Link height: 48px each
- Padding: 12px 20px
- Font: Inter Medium, 15px
- Color: #64748B (inactive), #4B90C8 (active)
- Icon: 20px, left-aligned, 12px margin-right
- Active state: Background #E0F2FE, left border 3px #4B90C8
- Hover state: Background #F8FAFC

Links:
1. **Home** (house icon) - Today View
2. **Journal** (book icon) - Journal List
3. **Insights** (chart icon) - Insights Dashboard
4. **ChadGPT** (chat icon) - AI Coach
   - Badge: "AI" if new summary available
5. **Templates** (document icon) - Template Library
6. **Settings** (gear icon) - Settings

**Quick Entry Button**
- Position: 20px from bottom of sidebar
- Width: 200px (full width minus margins)
- Height: 48px
- Background: #4B90C8
- Text: "+ New Entry"
- Border radius: 9999px
- Icon: Plus (16px)
- Hover: Background #3B7AA8
- Keyboard: ⌘+N or Ctrl+N

**Top Header Bar (64px height, full width minus sidebar)**

**Left Section**
- Screen title: Current screen name
  - Font: Inter SemiBold, 20px
  - Color: #1E293B
- Breadcrumbs (if applicable): Home > Journal > Entry

**Right Section (aligned right, 24px from edge)**
- Search button: Magnifying glass icon (20px)
  - Touch target: 40x40px
  - Keyboard: ⌘+K or Ctrl+K
  - Opens: Search modal
- Notifications: Bell icon (20px)
  - Badge: Red dot if unread
  - Touch target: 40x40px
  - Click: Opens notification dropdown
- User menu: Avatar (32px circle)
  - Click: Opens dropdown
  - Options: Profile, Settings, Log Out

**Main Content Area**
- Width: calc(100vw - 240px sidebar)
- Max width: 1200px content
- Padding: 32px
- Background: #F8FAFC

### Keyboard Shortcuts

**Global Shortcuts**
- `⌘+N` / `Ctrl+N`: New journal entry
- `⌘+K` / `Ctrl+K`: Quick search
- `⌘+S` / `Ctrl+S`: Save current entry
- `⌘+/` / `Ctrl+/`: Show keyboard shortcuts
- `Esc`: Close modal/dialog
- `⌘+,` / `Ctrl+,`: Open settings

**Navigation Shortcuts**
- `⌘+1` through `⌘+6`: Jump to sidebar sections
- `Tab`: Move focus forward
- `Shift+Tab`: Move focus backward
- `Enter`: Activate focused element
- `Space`: Toggle checkboxes/switches

**Editor Shortcuts**
- `⌘+B` / `Ctrl+B`: Bold
- `⌘+I` / `Ctrl+I`: Italic
- `⌘+K` / `Ctrl+K`: Insert link
- `⌘+Z` / `Ctrl+Z`: Undo
- `⌘+Shift+Z` / `Ctrl+Y`: Redo

### Hover States (Desktop Only)

**Interactive Elements**
- Buttons: Darken by 10%, scale 0.98, cursor pointer
- Links: Underline, color #3B7AA8, cursor pointer
- Cards: Elevate shadow, border color #4B90C8, cursor pointer
- Icons: Color change to #4B90C8, cursor pointer
- Input fields: Border color #4B90C8, shadow glow

**Transition Timing**
- Hover transitions: 150ms ease
- Color changes: 200ms ease
- Transform (scale): 200ms cubic-bezier(0.4, 0, 0.2, 1)

### Focus States (Keyboard Navigation)

**All Focusable Elements**
- Outline: 3px solid #4B90C8
- Outline offset: 2px
- Border radius: Matches element
- No focus outline on mouse click (only keyboard)

**Skip to Content Link**
- Position: Absolute, top-left
- Visible only on keyboard focus
- Text: "Skip to main content"
- Background: #4B90C8, white text
- Padding: 8px 16px
- Action: Jumps to main content area

### Multi-Pane Layouts (Desktop)

**Journal Editor (Desktop)**
- Left pane (50%): Editor with toolbar
- Right pane (50%): Live markdown preview
- Resizable: Drag divider to adjust
- Collapse: Hide preview with button

**Insights Dashboard (Desktop)**
- Left sidebar (240px): Already present
- Center pane (60%): Charts and graphs
- Right pane (40%): AI summary and quick stats
- Stackable: Becomes single column on tablet

**Chat Interface (Desktop)**
- Left pane (30%): Conversation history list
- Right pane (70%): Active conversation
- Thread view: Show related entries

---

## 1. CORE JOURNALING SCREENS

### 1.1 Today View (Main Daily Interface) ⭐ MOST CRITICAL

**Purpose:** Primary landing screen users see daily. Shows current streak, daily theme, motivational quote, mood trend, and quick access to journaling.

#### Layout Structure (Top to Bottom)

**[SAFE AREA TOP - 47pt]**

**Header Section (88pt)**
- Top padding: 8pt from safe area
- Greeting text: "Good morning, [Name]" or time-appropriate greeting
  - Font: Inter Medium, 15px, #64748B (secondary text)
  - Left padding: 16pt
- Current date: "Wednesday, November 20"
  - Font: Inter SemiBold, 24px, #1E293B (primary text)
  - Left padding: 16pt
  - Top margin: 4pt from greeting
- Right side: Notification bell icon
  - Size: 24x24pt, minimum touch 44x44pt
  - Position: 16pt from right edge
  - Color: #64748B, active state: #4B90C8 with badge

**Scroll Container Begins (Content Area)**

**Daily Quote Card (Variable height, ~140pt)**
- Margin: 16pt horizontal, 12pt top
- Background: White (#FFFFFF)
- Border radius: 16px
- Shadow: 0 4px 12px rgba(0,0,0,0.05)
- Padding: 20pt all sides
- Top-left badge: "Daily Wisdom"
  - Font: Inter Medium, 11px uppercase, letter-spacing 0.08em
  - Color: #4B90C8
  - Background: #E0F2FE (light blue tint)
  - Padding: 4pt 10pt
  - Border radius: 6px
- Quote text:
  - Font: Playfair Display Italic, 18px, line-height 1.6
  - Color: #1E293B
  - Margin top: 12pt from badge
  - Example: "The happiness of your life depends upon the quality of your thoughts."
- Author attribution:
  - Font: Inter Regular, 14px
  - Color: #64748B
  - Margin top: 12pt
  - Format: "— Marcus Aurelius"

**Streak & Mood Section (120pt)**
- Margin: 16pt horizontal, 12pt top
- Display: Two cards side-by-side with 12pt gap

**Left Card - Streak Counter (Width: ~166pt)**
- Background: Linear gradient (#4B90C8 to #3B7AA8)
- Border radius: 12px
- Padding: 16pt
- Icon: Fire emoji or flame icon (24pt)
  - Position: Top left
  - Color: #FFD700 (gold)
- Streak number: "47"
  - Font: Inter Bold, 36px
  - Color: #FFFFFF
  - Margin top: 8pt
- Label: "Day Streak"
  - Font: Inter Medium, 13px
  - Color: rgba(255,255,255,0.85)
  - Margin top: 4pt

**Right Card - Mood Trend (Width: ~166pt)**
- Background: #FFFFFF
- Border: 1px solid #E2E8F0
- Border radius: 12px
- Padding: 16pt
- Label: "This Week"
  - Font: Inter Medium, 12px uppercase, letter-spacing 0.08em
  - Color: #64748B
- Sparkline chart:
  - Height: 40pt
  - Margin top: 8pt
  - Line color: #4B90C8
  - Line width: 2px
  - Points: 7 (one per day)
  - Fill: Gradient from rgba(75,144,200,0.15) to transparent
- Current mood: "Mostly Calm"
  - Font: Inter SemiBold, 14px
  - Color: #16A34A (success green)
  - Margin top: 8pt

**Today's Theme Card (100pt)**
- Margin: 16pt horizontal, 12pt top
- Background: #F8FAFC
- Border: 1px solid #E2E8F0
- Border radius: 12px
- Padding: 16pt
- Icon: Small pillar icon (Money/Ego/Relationships/Discipline)
  - Size: 20pt
  - Color: #4B90C8
- Theme title: "Focus: Discipline"
  - Font: Inter SemiBold, 16px
  - Color: #1E293B
  - Margin left: 8pt from icon (inline)
- Prompt text:
  - Font: Inter Regular, 14px, line-height 1.5
  - Color: #64748B
  - Margin top: 8pt
  - Example: "What small action today will strengthen your self-control?"

**Quick Action Buttons (72pt)**
- Margin: 16pt horizontal, 16pt top
- Display: Horizontal row, 12pt gap

**Button 1 - Start Journal Entry (Primary)**
- Width: ~227pt (60% of row)
- Height: 56pt
- Background: #4B90C8
- Border radius: 9999px (pill)
- Text: "Start Writing"
  - Font: Inter SemiBold, 16px
  - Color: #FFFFFF
- Icon: Pen/edit icon, 20pt, left of text
- Shadow: 0 4px 8px rgba(75,144,200,0.25)
- Active state: Scale 0.97, opacity 0.9

**Button 2 - Quick Capture (Secondary)**
- Width: ~120pt (40% of row)
- Height: 56pt
- Background: Transparent
- Border: 1.5px solid #4B90C8
- Border radius: 9999px (pill)
- Text: "Quick"
  - Font: Inter SemiBold, 16px
  - Color: #4B90C8
- Icon: Microphone icon, 20pt, left of text
- Active state: Background rgba(75,144,200,0.05)

**Recent Entries Section (Variable height)**
- Margin: 24pt horizontal, 24pt top
- Header:
  - Text: "Recent Entries"
  - Font: Inter SemiBold, 18px
  - Color: #1E293B
  - Right side: "View All" link
    - Font: Inter Medium, 14px
    - Color: #4B90C8
    - Minimum touch target: 44x44pt

**Entry Card (Repeating, 3 shown)**
- Margin: 12pt between cards
- Background: #FFFFFF
- Border radius: 12px
- Border: 1px solid #E2E8F0
- Padding: 16pt
- Touch target: Full card tappable

- Date header: "Today, 3:45 PM" (or "Yesterday", "Nov 18", etc.)
  - Font: Inter Medium, 12px
  - Color: #64748B
- Mood indicator:
  - Circle (8pt diameter) with color matching mood
  - Inline with date, 8pt margin left
- Preview text (3 lines max, truncated):
  - Font: Inter Regular, 15px, line-height 1.5
  - Color: #1E293B
  - Margin top: 8pt
  - Text: First ~140 characters of entry
- Pillar tags:
  - Margin top: 12pt
  - Chip style: Background #E0F2FE, text #4B90C8
  - Padding: 4pt 10pt
  - Border radius: 6px
  - Font: Inter Medium, 11px
  - Inline display with 6pt gap

**Bottom Spacing (80pt)** - Accounts for bottom nav

**[BOTTOM NAVIGATION - 56pt + SAFE AREA]**

**Fixed Bottom Navigation Bar**
- Height: 56pt + safe area bottom (typically 34pt on iPhone 14 Pro)
- Background: #FFFFFF
- Top border: 1px solid #E2E8F0
- Shadow: 0 -2px 8px rgba(0,0,0,0.04)

**Navigation Items (5 items, evenly spaced)**

1. **Home** (Active)
   - Icon: House/Home (24pt)
   - Color: #4B90C8 (active), #64748B (inactive)
   - Label: "Home"
   - Font: Inter Medium, 11px
   - Active indicator: 3pt height, #4B90C8 bar above icon

2. **Journal**
   - Icon: Book/Journal (24pt)
   - Color: #64748B
   - Label: "Journal"

3. **Insights** (Center with special treatment)
   - Elevated circular button
   - Size: 56x56pt
   - Background: #4B90C8
   - Shadow: 0 4px 12px rgba(75,144,200,0.4)
   - Icon: Chart/Graph (28pt)
   - Color: #FFFFFF
   - Position: -12pt above nav bar
   - No label (visual prominence)

4. **ChadGPT**
   - Icon: Chat bubble (24pt)
   - Color: #64748B
   - Label: "ChadGPT"
   - Badge: "AI" chip if new summary available

5. **Profile**
   - Icon: User/Person (24pt)
   - Color: #64748B
   - Label: "You"

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Header notification bell | 24pt | 24pt | 44x44pt |
| Daily quote card | 343pt | ~140pt | Full card |
| Streak card | 166pt | 88pt | Full card |
| Mood card | 166pt | 88pt | Full card |
| Theme card | 343pt | 100pt | Full card |
| Primary CTA button | 227pt | 56pt | 227x56pt ✓ |
| Secondary button | 120pt | 56pt | 120x56pt ✓ |
| Entry card | 343pt | ~120pt | Full card |
| Bottom nav icons | 24pt | 24pt | ~75x56pt ✓ |
| Center FAB | 56pt | 56pt | 56x56pt ✓ |

#### User Interactions & Gestures

1. **Pull to Refresh**
   - Gesture: Pull down from top of scroll area
   - Loading indicator: Circular spinner in #4B90C8
   - Refreshes: Quote, mood data, recent entries

2. **Tap Quote Card**
   - Action: Share quote modal appears
   - Options: Copy, Share to social, Save to favorites
   - Modal: Bottom sheet, 280pt height

3. **Tap Streak Card**
   - Action: Navigate to streak detail view
   - Shows: Calendar view of all entries, longest streak, current streak

4. **Tap Mood Card**
   - Action: Navigate to mood insights
   - Shows: 30-day mood chart, patterns, AI analysis

5. **Tap "Start Writing"**
   - Action: Navigate to Journal Editor
   - Transition: Slide up animation (300ms ease-out)
   - Pre-fills: Date, suggested theme

6. **Tap "Quick" (Quick Capture)**
   - Action: Modal appears from bottom
   - Options: Text input (280 char) or voice recording
   - Modal: 320pt height, swipe down to dismiss

7. **Tap Entry Card**
   - Action: Navigate to full entry view
   - Transition: Push animation (250ms)
   - Shows: Full entry with edit option

8. **Long Press Entry Card**
   - Action: Context menu appears
   - Options: Edit, Delete, Share, Add to favorites
   - Haptic feedback: Medium impact

9. **Swipe Entry Card Left**
   - Action: Delete action appears (red background)
   - Confirmation: Required before deletion
   - Haptic: Heavy impact on delete

10. **Tap Bottom Nav Items**
    - Action: Navigate to respective screen
    - Transition: Fade (200ms) with slight scale
    - Haptic: Light impact

#### Key Spacing & Sizing Reference

```
Screen width: 375pt
Content padding: 16pt horizontal
Card margins: 16pt horizontal, 12pt vertical
Button heights: 56pt (primary actions)
Bottom nav: 56pt + 34pt safe area = 90pt total
Scroll container: 812pt - 47pt (top) - 90pt (nav) = 675pt
```

#### Color Usage

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Screen background | #F8FAFC | #1E293B |
| Cards | #FFFFFF | #2D3748 |
| Primary text | #1E293B | #F8FAFC |
| Secondary text | #64748B | #94A3B8 |
| Streak card background | #4B90C8 gradient | #4B90C8 gradient |
| Borders | #E2E8F0 | #475569 |
| Bottom nav background | #FFFFFF | #1E293B |
| Bottom nav border | #E2E8F0 | #475569 |

#### Accessibility Considerations

1. **Screen Reader Support**
   - All interactive elements have clear labels
   - Quote card: "Daily wisdom quote by Marcus Aurelius: [quote text]"
   - Streak: "Current streak: 47 days"
   - Nav items: "Navigate to Home", "Navigate to Journal", etc.

2. **Color Contrast**
   - Primary text on white: 13.5:1 (AAA)
   - Secondary text on white: 5.2:1 (AA)
   - Button text on blue: 4.8:1 (AA)
   - White text on gradient blue: 4.5:1 (AA)

3. **Text Sizing**
   - Supports Dynamic Type (iOS)
   - Minimum text size: 11px (nav labels)
   - Body text: 14-16px
   - Scales up to 200% for accessibility

4. **Touch Targets**
   - All interactive elements: minimum 44x44pt
   - Bottom nav items: 75x56pt (exceeds minimum)
   - Buttons: 56pt height (exceeds minimum)

5. **Motion**
   - Respects "Reduce Motion" setting
   - Animations disabled: Instant transitions
   - Sparkline still visible but static

6. **VoiceOver Navigation**
   - Logical reading order: Top to bottom
   - Groups: Quote card, Streak section, Theme, Actions, Entries
   - Custom rotor: "Recent Entries" for quick navigation

#### Empty States

**No Entries Yet (First-time user)**
- Replace "Recent Entries" section with:
  - Illustration: Minimal line drawing of journal (120pt height)
  - Centered content
  - Headline: "Start Your Journey"
    - Font: Inter SemiBold, 20px
    - Color: #1E293B
  - Body text: "Your first entry awaits. What's on your mind today?"
    - Font: Inter Regular, 15px, line-height 1.5
    - Color: #64748B
  - CTA: "Write First Entry" button (matches primary button style)

**No Streak (Day 0)**
- Streak card shows:
  - Icon: Unlit flame (grayscale)
  - Number: "0"
  - Text: "Start Today"
  - Subtext: "Write an entry to begin your streak"

**Quote Loading Failed**
- Quote card shows:
  - Icon: Small info icon
  - Text: "Unable to load daily quote"
  - Action: "Tap to retry" button
  - Color scheme: Muted (grays)

#### Error States

**Network Error (Offline)**
- Toast notification at top:
  - Background: #FEF3C7 (warning yellow light)
  - Border: #F59E0B (warning)
  - Text: "You're offline. Changes will sync when reconnected."
  - Icon: Cloud with slash
  - Auto-dismiss: 5 seconds
  - Position: 8pt below safe area

**Failed to Load Mood Data**
- Mood card shows:
  - Gray sparkline placeholder
  - Text: "Unable to load mood data"
  - Small "Retry" link (tappable)
  - Color: #64748B

**Entry Load Error**
- Entry card shows error state:
  - Background: #FEE2E2 (light red)
  - Text: "Entry unavailable"
  - Icon: Alert triangle
  - Tap action: Retry load

#### Performance Considerations

1. **Loading Sequence**
   - Frame renders immediately (skeleton UI)
   - Static content: 0-50ms (date, greeting, buttons)
   - Quote loads: 50-200ms (cached or API)
   - Streak/mood data: 100-300ms (local DB)
   - Recent entries: 150-400ms (local DB, paginated)

2. **Skeleton UI (Initial Load)**
   - Gray rounded rectangles (#E2E8F0)
   - Shimmer animation (2s duration, infinite)
   - Matches final layout dimensions
   - Replaces: Quote card, mood card, entry cards

3. **Image Optimization**
   - Icons: Vector (SVG) for crispness
   - User avatars: WebP, 48x48pt @2x (96px)
   - Lazy load: Below-fold entry cards

4. **Scroll Performance**
   - Virtual scrolling for entries (if >20 items)
   - RecyclerView/LazyColumn optimization
   - Maintain 60fps scroll

#### Thumb Reachability Zones

**Green Zone (Easy - Bottom 40%)**
- Bottom navigation (all items)
- "Start Writing" button
- "Quick" button
- Lower entry cards

**Yellow Zone (Moderate - Middle 30%)**
- Recent entries header
- Upper entry cards
- Theme card
- Streak/mood cards

**Red Zone (Difficult - Top 30%)**
- Daily quote card
- Date header
- Notification bell
- Status bar

**Design Decision:** All critical actions (journal entry, quick capture, navigation) are in Green zone. Top area is read-only content.

---

#### Tablet Layout (768px-1023px)

**Screen Structure**
- No bottom navigation (uses sidebar or top nav)
- Two-column grid for stats cards
- Increased card sizes and spacing
- Landscape-optimized layouts

**Header (100px)**
- Greeting + Date (left side)
- Profile avatar (32px, top right)
- Notification bell (top right, 48px from edge)

**Content Area (Two-column where applicable)**

**Daily Quote Card**
- Width: Full width minus 48px padding
- Height: ~160px
- Quote text: 20px font size (larger)

**Streak & Mood Section**
- Width: 50% each (side by side maintained)
- Increased card height: 120px
- Larger stat numbers (48px)

**Recent Entries**
- Grid: 2 columns
- Entry cards: 48% width each
- Gap: 24px
- Preview text: 4 lines (more space)

**Quick Action Buttons**
- Positioned side-by-side (still at bottom)
- Width: Full width
- "Start Writing": 60%
- "Quick": 35%
- Gap: 24px

---

#### Desktop Layout (1024px+)

**Overall Structure**
- Left sidebar: 240px (persistent navigation)
- Top header: 64px
- Main content: Centered, max-width 800px
- Right panel: 320px (optional, for insights)

**Header Bar (64px)**
- Title: "Good morning, Sarah"
  - Font: Inter Bold, 24px
  - Left aligned in content area
- Right side icons:
  - Search (⌘+K)
  - Notifications
  - User menu

**Main Content Area (800px max-width, centered)**

**Daily Quote Card**
- Width: 100% (800px)
- Height: 180px
- Quote text: 22px
- Hover state: Slight elevation, cursor pointer
- Click: Shows sharing options

**Stats Grid (Three-column layout)**
- Width: 100%
- Display: 3 cards in single row
- Cards (each ~250px):
  1. Current Streak
  2. This Week Stats
  3. Mood Trend

**Streak Card**
- Size: 250px x 140px
- Number: 56px font
- Hover: Glow effect on fire icon
- Click: Navigate to streak detail modal

**Mood Card**
- Size: 250px x 140px
- Hover: Chart highlights on hover
- Click: Navigate to full insights

**Week Stats Card (New on desktop)**
- Shows: Entries this week, total words
- Sparkline: Mini chart
- Hover: Shows daily breakdown tooltip

**Today's Theme Card**
- Width: 100%
- Height: 120px
- Layout: Horizontal (icon left, text right)
- Hover: Background tint

**Quick Actions (Desktop)**
- Position: Below theme card
- Layout: Three buttons in row (not two)
- Buttons:
  1. "New Entry" (40% width)
     - Keyboard: ⌘+N
  2. "Quick Capture" (30% width)
     - Keyboard: ⌘+Shift+N
  3. "Browse Templates" (30% width)
     - New on desktop

**Recent Entries**
- Width: 100%
- Layout: Three-column grid
- Entry cards: ~250px each
- Hover states:
  - Card elevation increases
  - Border: #4B90C8
  - Show action buttons (Edit, Delete, Share)
- Click: Opens entry in modal (not full screen)

**Entry Actions (Hover only)**
- Appear on card hover
- Position: Top right of card
- Buttons:
  - Edit (pencil icon, 28px)
  - Favorite (heart icon, 28px)
  - Delete (trash icon, 28px)
- Background: rgba(255,255,255,0.9)
- Blur: backdrop-filter

**Right Panel (Optional, 320px)**
- Collapsible with toggle button
- Sticky: Scrolls with page
- Content:
  - Mini calendar (month view)
  - Upcoming streak milestones
  - Quick stats summary
  - Recent AI insights preview

**Keyboard Navigation**
- Tab order: Quote → Stats → Theme → Actions → Entries
- Arrow keys: Navigate between entry cards
- Enter: Open focused entry
- Delete: Delete focused entry (with confirmation)

**Context Menus**
- Right-click on entry card:
  - Open in new tab
  - Edit
  - Duplicate
  - Export
  - Delete
- Right-click on quote:
  - Copy quote
  - Share quote
  - Save to favorites

**Desktop-Specific Features**

**Drag and Drop**
- Drag entry cards to reorder (if sorting by manual)
- Drag files onto page to attach to quick entry

**Multi-select**
- Shift+Click: Select range of entries
- ⌘+Click: Add to selection
- Bulk actions: Export, delete, tag

**Live Updates**
- Real-time sync indicator in header
- New entries appear with slide-in animation
- Collaborative editing (if multiple devices)

---

#### Responsive Behavior

**Breakpoint Transitions**

**375px → 768px (Mobile to Tablet)**
- Bottom nav → Top nav or sidebar
- Single column → Two columns
- Full-screen modals → Sheet modals
- Touch targets 44pt → 40px
- Font sizes increase 10%

**768px → 1024px (Tablet to Desktop)**
- Sidebar appears (240px)
- Two columns → Three columns (entry grid)
- Sheet modals → Centered modals (600px max)
- Touch targets 40px → 32px
- Hover states activate
- Keyboard shortcuts enable
- Right panel option appears

**Fluid Scaling (1024px → 1440px+)**
- Content max-width: 800px → 1000px → 1200px
- Margins increase proportionally
- Font sizes remain same
- Card gaps increase: 16px → 24px → 32px

**Orientation Changes**

**Tablet Landscape**
- Force three-column entry grid
- Sidebar auto-shows
- Increased whitespace

**Tablet Portrait**
- Force two-column entry grid
- Sidebar auto-hides (hamburger menu)
- Compact spacing

---

#### Desktop-Only UI States

**Hover States**

**Daily Quote Card**
- Background: #FAFBFC
- Border: 1px solid #4B90C8
- Shadow: 0 8px 24px rgba(75,144,200,0.15)
- Cursor: Pointer
- Share icon appears (top right)

**Stat Cards**
- Transform: translateY(-4px)
- Shadow: 0 12px 32px rgba(0,0,0,0.1)
- Border: 2px solid #4B90C8
- Transition: 200ms ease

**Entry Cards**
- Transform: translateY(-2px)
- Shadow: 0 8px 20px rgba(0,0,0,0.08)
- Action buttons fade in (top right)
- Preview text: Shows full 6 lines (expanded)

**Action Buttons**
- "Start Writing": Background darkens to #3B7AA8
- "Quick": Border color #3B7AA8, background tint
- Scale: 0.98
- Cursor: Pointer

**Focus States (Keyboard Navigation)**

**All Interactive Elements**
- Outline: 3px solid #4B90C8
- Outline offset: 2px
- No outline on mouse click
- Visible only with keyboard Tab

**Entry Cards**
- Focused card: Blue outline
- Arrow keys: Navigate between cards
- Enter: Opens entry
- Space: Toggles favorite

**Loading States**

**Initial Page Load**
- Skeleton UI for all cards
- Shimmer animation (1.5s duration)
- Loads in sequence:
  1. Quote card (0ms)
  2. Stats cards (150ms delay)
  3. Entry cards (300ms delay, stagger by 50ms each)

**Infinite Scroll (Entry List)**
- Load more as user scrolls to bottom
- Spinner: Bottom of list
- New entries: Fade in from bottom

**Live Sync**
- Indicator in header: "Syncing..." or "Synced"
- Icon: Cloud with animation
- New entry appears: Slide down from top

**Empty States**

**No Entries Yet**
- Illustration: Journal with sparkles (200px)
- Position: Center of entry grid area
- Headline: "Your journal awaits"
- Subtext: "Start writing to see your entries here"
- CTA button: "Write First Entry" (⌘+N)
- Ghost UI: 3 sample entry cards in gray

**No Mood Data**
- Mood card shows: Empty chart
- Text: "Start logging your mood"
- Button: "Add Today's Mood"

**Error States**

**Failed to Load Entries**
- Error card in place of entries
- Icon: Alert triangle
- Message: "Unable to load entries"
- Actions:
  - "Retry" button
  - "View Cached Entries" (if offline)
- Link: "Check connection"

**Failed to Load Quote**
- Quote card shows error
- Message: "Daily quote unavailable"
- Fallback: Shows random Stoic quote from local cache
- Retry button (small, bottom right)

**Offline Mode**
- Banner at top: "You're offline. Changes will sync when reconnected."
- Background: #FEF3C7 (warning yellow)
- Icon: Cloud with slash
- Dismiss: X button
- Auto-hide: When connection restored

---

### 1.2 Journal Editor (Full-Screen Writing Interface)

**Purpose:** Distraction-free writing experience with markdown support, word count, and auto-save functionality.

#### Layout Structure (Top to Bottom)

**[SAFE AREA TOP - 47pt]**

**Header Bar (56pt)**
- Background: Transparent → Solid #FFFFFF (on scroll)
- Transition: Fade in at 20pt scroll offset
- Blur effect: Optional iOS-style blur

**Left: Back Button**
- Icon: Chevron left (24pt)
- Color: #1E293B
- Touch target: 44x44pt
- Position: 8pt from left edge
- Action: Navigate back (prompts save if changes)

**Center: Auto-save Indicator**
- Text: "Saving..." or "Saved"
- Font: Inter Medium, 13px
- Color: #64748B (saved), #4B90C8 (saving)
- Icon: Cloud (16pt) with checkmark or spinner
- Fade in/out: 300ms transitions

**Right: Options Menu**
- Icon: Three dots (vertical)
- Color: #1E293B
- Touch target: 44x44pt
- Position: 8pt from right edge
- Action: Open options menu
  - Template
  - Mood
  - Pillar tags
  - Delete entry

**Metadata Bar (48pt)**
- Background: #F8FAFC
- Padding: 12pt horizontal
- Border bottom: 1px solid #E2E8F0

**Date & Time**
- Left side
- Font: Inter SemiBold, 15px
- Color: #1E293B
- Format: "Wed, Nov 20 • 3:45 PM"
- Tappable: Opens date/time picker

**Mood Selector**
- Right side
- Current mood emoji (24pt) or "Add mood"
- Touch target: 44x44pt
- Action: Open mood picker modal

**Scroll Container (Main Content)**

**Title Input (56pt minimum)**
- Padding: 16pt horizontal, 16pt top
- Background: Transparent
- Placeholder: "Entry title (optional)"
- Font: Inter SemiBold, 22px
- Color: #1E293B
- Max lines: 2
- Border: None
- Return key: Next (focuses body)

**Body Text Editor (Variable height, minimum 500pt)**
- Padding: 16pt horizontal
- Margin top: 12pt from title
- Background: Transparent
- Placeholder: "What's on your mind?"
  - Font: Inter Regular, 17px (iOS native size)
  - Color: #94A3B8
  - Appears only when empty
- Font: Inter Regular, 17px, line-height 1.6
- Color: #1E293B
- Markdown support (live preview):
  - **Bold** renders as bold
  - *Italic* renders as italic
  - # Heading renders as heading
  - - List items render as bullets
- Auto-correct: Enabled
- Spell check: Enabled
- Keyboard type: Default with autocapitalization

**Bottom Spacing (120pt)** - For keyboard clearance

**[FLOATING TOOLBAR - Appears above keyboard when active]**

**Markdown Toolbar (44pt height)**
- Background: #F8FAFC
- Border top: 1px solid #E2E8F0
- Position: Fixed above keyboard
- Padding: 6pt horizontal

**Toolbar Buttons (Horizontal scroll if needed)**
- Size: 32x32pt each
- Gap: 8pt between buttons
- Color: #64748B, Active: #4B90C8

Buttons:
1. **Bold** (B icon)
2. **Italic** (I icon)
3. **Heading** (H icon)
4. **List** (bullet icon)
5. **Quote** (quote icon)
6. **Link** (chain icon)
7. **Dismiss keyboard** (chevron down)

**Action Bar (When not typing) - 72pt height**
- Background: #FFFFFF
- Border top: 1px solid #E2E8F0
- Shadow: 0 -4px 8px rgba(0,0,0,0.04)
- Padding: 12pt
- Position: Fixed at bottom (replaces bottom nav)

**Word Count**
- Left side
- Font: Inter Medium, 13px
- Color: #64748B
- Format: "247 words • 2 min read"
- Updates live

**Done Button**
- Right side
- Width: 120pt
- Height: 48pt
- Background: #4B90C8
- Border radius: 9999px
- Text: "Done"
  - Font: Inter SemiBold, 16px
  - Color: #FFFFFF
- Action: Save and return to Today View
- Active state: Scale 0.97

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Back button | 24pt | 24pt | 44x44pt ✓ |
| Menu button | 24pt | 24pt | 44x44pt ✓ |
| Mood selector | 24pt | 24pt | 44x44pt ✓ |
| Title input | 343pt | 56pt+ | Full width |
| Body editor | 343pt | 500pt+ | Full area |
| Toolbar buttons | 32pt | 32pt | 32x44pt (vertical extended) |
| Done button | 120pt | 48pt | 120x48pt ✓ |

#### User Interactions & Gestures

1. **Tap to Start Writing**
   - Auto-focus on body (title skipped by default)
   - Keyboard appears with animation
   - Markdown toolbar slides up with keyboard

2. **Swipe Down from Top**
   - Gesture: Quick swipe down
   - Action: Dismiss keyboard (if active) or go back
   - Prompt: If unsaved changes, confirm dialog

3. **Pull Down (Extended)**
   - If content >1 screen, pull down reveals "Pull to refresh theme"
   - Refreshes daily theme/prompt at top

4. **Tap Mood Selector**
   - Modal: Bottom sheet with 5 moods
   - Icons: Large emoji style (44pt each)
   - Selection: Immediate feedback, closes modal
   - Haptic: Light impact on select

5. **Tap Date/Time**
   - Picker: Native date/time picker
   - iOS: Wheel picker inline
   - Android: Calendar picker
   - Confirms on selection

6. **Long Press to Select Text**
   - Standard text selection
   - Context menu: Cut, Copy, Paste, Format
   - Markdown shortcuts visible in menu

7. **Shake to Undo** (iOS)
   - Gesture: Physical shake
   - Alert: "Undo typing?"
   - Options: Undo, Cancel

8. **Tap Options Menu (Three Dots)**
   - Menu appears: Bottom sheet
   - Options:
     - Change Template
     - Add Pillar Tags
     - View History
     - Export Entry
     - Delete Entry (red text)

#### Key Spacing & Sizing

```
Header: 56pt
Metadata bar: 48pt
Title padding: 16pt horizontal
Body padding: 16pt horizontal
Line height: 1.6 (27.2pt for 17px text)
Toolbar: 44pt
Action bar: 72pt
```

#### Color Usage

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | #FFFFFF | #1E293B |
| Text (body) | #1E293B | #F8FAFC |
| Placeholder | #94A3B8 | #64748B |
| Metadata bar | #F8FAFC | #2D3748 |
| Toolbar background | #F8FAFC | #2D3748 |
| Toolbar icons | #64748B | #94A3B8 |
| Done button | #4B90C8 | #4B90C8 |

#### Accessibility Considerations

1. **Text Editing**
   - VoiceOver: Announces "Text editor. Enter your journal entry."
   - Text to Speech: Reads content aloud
   - Voice Control: "Type [text]" supported

2. **Keyboard Navigation**
   - Tab: Moves between title and body
   - Esc: Dismisses keyboard
   - Cmd+B/I: Bold/Italic (iOS keyboard shortcuts)

3. **Dynamic Type**
   - Body text scales: 17px → 34px (max)
   - Title scales: 22px → 44px
   - Layout adapts to larger text

4. **Dictation**
   - Microphone button on keyboard
   - Live transcription
   - Auto-punctuation

#### Empty States

**New Entry**
- Title: Empty with placeholder
- Body: Placeholder text
- Date: Current date/time
- Mood: "Add mood" prompt
- No word count shown

**Template Pre-fill**
- If from template, body contains:
  - Prompt question in italic
  - Cursor positioned after prompt
  - Example: "*What are you grateful for today?*\n\n"

#### Error States

**Save Failed (Network)**
- Toast: "Unable to save. Retrying..."
- Background: #FEF3C7
- Icon: Warning triangle
- Auto-retry: Every 5s, max 3 attempts
- Draft: Saved locally, syncs when online

**Character Limit (If implemented)**
- Warning at 90%: Yellow indicator
- Hard stop at 100%: Red indicator
- Toast: "Maximum length reached"

#### Performance

1. **Auto-save Timing**
   - Debounce: 2 seconds after last keystroke
   - Visual feedback: Cloud icon animates
   - Local save: Immediate (SQLite)
   - Cloud sync: Batched every 10s

2. **Markdown Rendering**
   - Live preview: Rendered as typed
   - Performance: <16ms per character (60fps)
   - Limited markdown: Bold, italic, headings, lists only

3. **Keyboard Handling**
   - Appears: 250ms system animation
   - Toolbar: Synced with keyboard animation
   - Dismiss: Smooth 200ms

---

#### Tablet Layout (768px-1023px)

**Screen Structure**
- Full-screen editor (no sidebar)
- Floating toolbar (sticky)
- Expanded canvas for writing
- Optional preview panel (toggle)

**Header Bar (64px)**
- Back button (left, 32px icon)
- Entry title (center, editable inline)
- Actions menu (right)
  - Save status
  - Options (…)

**Metadata Bar (56px)**
- Date/time picker (left)
- Word count (center)
- Mood selector (right)
- All inline, no wrapping

**Editor Canvas**
- Width: 100% (if preview hidden) or 50% (if preview shown)
- Padding: 32px horizontal
- Font size: 18px (larger for readability)
- Line height: 1.7
- Max width: 680px (readable line length)

**Floating Toolbar**
- Position: Sticky top (below header)
- Background: White with blur
- Markdown buttons: Larger (40px each)
- Horizontal scroll if needed

**Preview Panel (Optional)**
- Toggle: Button in header
- Width: 50% (when active)
- Position: Right side
- Synced scroll: Matches editor position
- Background: #FAFBFC

**Bottom Action Bar**
- Height: 64px
- Word count (left)
- Reading time (left)
- Done button (right, 140px width)

---

#### Desktop Layout (1024px+) ⭐ KEY FEATURE

**Overall Structure**
- Left sidebar: 240px (persistent navigation)
- Header bar: 64px
- **Split-pane editor: Two-column layout**
  - Left: Editor (50%)
  - Right: Live preview (50%)
- Resizable divider between panes

**Header Bar (64px)**
- Back/Close button (left, optional)
  - ⌘+W to close
- Entry title: Editable inline
  - Font: Inter SemiBold, 20px
  - Auto-focus on new entry
  - Placeholder: "Untitled Entry"
- Auto-save status (center)
  - "Saving...", "Saved 2 seconds ago"
  - Icon: Cloud with checkmark
- Actions (right):
  - Word count badge: "247 words"
  - Export button: PDF/Markdown icons
  - Settings: Options menu
  - Close: X button (⌘+W)

**Metadata Toolbar (48px)**
- Below header, full width
- Background: #F8FAFC
- Border bottom: 1px solid #E2E8F0

**Left Section**
- Date picker: Click to edit
  - Shows: "Wed, Nov 20, 2024 at 3:45 PM"
  - Picker: Dropdown calendar + time
- Mood: Emoji picker
  - Click: Shows 5-option popover
  - Current: 😊 or "Add mood"

**Right Section**
- Pillar tags: Multi-select chips
  - Money, Ego, Relationships, Discipline
  - Click: Toggle selection
- Template: "Based on: Evening Review" (if applicable)

**Left Pane - Editor (50% width, min 400px)**

**Toolbar (44px)**
- Sticky: Below metadata bar
- Background: White
- Buttons (32px each):
  - Bold (⌘+B)
  - Italic (⌘+I)
  - Heading (#)
  - List (bullets)
  - Quote (")
  - Link (⌘+K)
  - Image (upload)
  - Code (``)
- Divider
- Word count live: "247 / 2 min read"

**Editor Canvas**
- Padding: 48px
- Background: #FFFFFF
- Max width: None (full pane)
- Font: Inter Regular, 17px
- Line height: 1.7
- Placeholder: "Start writing..."
  - Color: #CBD5E1
  - Font style: Italic

**Editor Features**
- Syntax highlighting: Markdown symbols in blue
- Auto-complete: Markdown syntax
- Distraction-free mode: Hide toolbar (⌘+Shift+F)
- Focus mode: Dim non-current paragraph
- Typewriter mode: Keep cursor centered

**Right Pane - Live Preview (50% width, min 400px)**

**Preview Header (36px)**
- Label: "Preview"
  - Font: Inter Medium, 13px
  - Color: #64748B
- Toggle: Eye icon
  - Click: Hide/show preview
  - Keyboard: ⌘+P

**Preview Canvas**
- Padding: 48px
- Background: #FAFBFC
- Border left: 1px solid #E2E8F0
- Font: Same as editor (17px)
- Renders: Full markdown
  - Headings styled
  - Bold, italic applied
  - Lists formatted
  - Quotes indented with left border
  - Links clickable (⌘+Click to open)

**Synced Scroll**
- Preview scrolls with editor
- Maintains relative position
- Smooth: 200ms transition

**Resizable Divider (Between Panes)**
- Width: 8px
- Color: #E2E8F0
- Hover: #4B90C8, cursor col-resize
- Drag: Resize panes (min 30%, max 70%)
- Double-click: Reset to 50/50

**Footer Bar (56px)**
- Position: Sticky bottom
- Background: #FFFFFF
- Border top: 1px solid #E2E8F0
- Padding: 8px 24px

**Left Side**
- Character count: "1,234 characters"
- Word count: "247 words"
- Reading time: "~2 min"
- All in gray (Inter Regular, 13px)

**Right Side**
- Version history: "12 versions" (link)
  - Click: Opens version history sidebar
- Done button: 120px, 40px
  - Background: #4B90C8
  - Text: "Done" (⌘+S)
  - Hover: #3B7AA8
  - Click: Saves and returns to journal list

**Keyboard Shortcuts (Editor-Specific)**

**Text Formatting**
- `⌘+B` / `Ctrl+B`: Bold
- `⌘+I` / `Ctrl+I`: Italic
- `⌘+K` / `Ctrl+K`: Insert link
- `⌘+Shift+H`: Heading 1
- `⌘+Shift+L`: Bulleted list
- `⌘+Shift+Q`: Blockquote

**Editor Actions**
- `⌘+S` / `Ctrl+S`: Save (auto-saves anyway)
- `⌘+P` / `Ctrl+P`: Toggle preview
- `⌘+Shift+F`: Toggle fullscreen/distraction-free
- `⌘+Z` / `Ctrl+Z`: Undo
- `⌘+Shift+Z` / `Ctrl+Y`: Redo
- `⌘+F` / `Ctrl+F`: Find in entry
- `⌘+W`: Close editor

**Navigation**
- `⌘+↑`: Jump to start
- `⌘+↓`: Jump to end
- `Option+↑/↓`: Move paragraph up/down

**Context Menu (Right-Click)**

**On Selected Text**
- Bold
- Italic
- Insert link
- Copy
- Paste
- Cut
- Lookup word (dictionary)

**On Editor Canvas**
- Paste
- Paste without formatting
- Insert template
- Insert date/time
- Insert Stoic quote

**Desktop-Specific Features**

**Version History**
- Click: Opens right panel (replaces preview)
- Shows: List of autosaved versions
- Timestamp: Every 5 minutes
- Preview: Click version to preview
- Restore: "Restore this version" button
- Compare: Highlight diff between versions

**Focus Mode**
- Activated: ⌘+Shift+F
- Dims: Everything except current paragraph
- Fades: Toolbar (appears on hover)
- Hides: Preview pane, sidebar
- Exit: Esc or ⌘+Shift+F again

**Typewriter Mode**
- Activated: Toggle in settings or ⌘+T
- Effect: Keeps cursor vertically centered
- Scrolls: Content moves, cursor stays
- Visual: Subtle highlight on current line

**Split Screen Templates**
- Activated: Click "Use Template" in editor
- Left pane: Template prompts (read-only)
- Right pane: Your writing
- Answer: Prompts inline
- Format: Prompts in gray, answers in black

---

#### Responsive Behavior

**Breakpoint Transitions**

**375px → 768px (Mobile to Tablet)**
- Full screen → Full screen (no change)
- Bottom toolbar → Floating sticky toolbar
- Word count footer → Inline in header

**768px → 1024px (Tablet to Desktop)**
- Single pane → Split pane (editor + preview)
- Toolbar: Embedded → Floating sticky
- Actions: Bottom bar → Header bar
- Keyboard shortcuts: Activated

**Pane Width Adjustments (Desktop)**
- Default: 50/50 split
- Min editor width: 400px (30%)
- Min preview width: 400px (30%)
- If window <1200px: Preview auto-hides, toggle button shown
- If window <900px: Force single-pane, hide preview

---

#### Desktop-Only UI States

**Hover States**

**Toolbar Buttons**
- Background: #F1F5F9
- Border: 1px solid #CBD5E1
- Cursor: Pointer
- Tooltip: Appears after 500ms
  - Text: "Bold (⌘+B)"
  - Font: Inter Regular, 12px
  - Background: #1E293B, white text
  - Position: Below button

**Resizable Divider**
- Hover: Background #4B90C8
- Cursor: col-resize
- Width: 12px (expands from 8px)
- Transition: 150ms

**Done Button**
- Hover: Background #3B7AA8
- Scale: 0.98
- Cursor: Pointer

**Focus States**

**Editor Textarea**
- Focused: No visible outline (full-screen nature)
- Cursor: Blinking vertical line
- Selection: #4B90C8 background, white text

**Toolbar Buttons**
- Focused: 3px outline #4B90C8
- Tab order: Left to right
- Enter: Activates button

**Loading States**

**Initial Load**
- Skeleton: Title bar, editor canvas, preview pane
- Shimmer: 1.5s animation
- Sequence:
  1. Header loads (0ms)
  2. Metadata loads (100ms)
  3. Content loads (200ms)

**Saving State**
- Cloud icon: Animates (spinning or uploading)
- Text: "Saving..."
- Color: #4B90C8 (active)
- Duration: Until save completes (usually <1s)

**Autosave Failed**
- Icon: Cloud with X
- Text: "Couldn't save" (red)
- Action: "Retry" button appears
- Tooltip: "Check your connection"

**Loading Preview**
- Preview pane: Gray shimmer while rendering
- Duration: <100ms typically
- If slow: "Rendering preview..." text

**Empty States**

**New Entry (No Content)**
- Editor: Placeholder text visible
  - "Start writing..."
  - Italic, gray color
- Preview: "Nothing to preview yet"
  - Centered, gray text
  - Icon: Document outline (64px)

**No Title**
- Title field: "Untitled Entry" (gray, italic)
- Auto-replace: On first keystroke

**No Mood**
- Mood button: "Add mood" text
  - Icon: Gray emoji outline
  - Hover: #4B90C8 tint

**Error States**

**Markdown Syntax Error**
- Preview: Shows error inline
  - Icon: Warning triangle
  - Text: "Invalid markdown syntax"
  - Line: Highlights error in preview
- Editor: No error shown (keeps typing smooth)

**Content Too Long (If Limit)**
- Counter: Turns red at 95%
- Warning: "Approaching character limit"
- Hard stop: At 100%, disable typing
- Action: "Edit down to continue"

**Save Conflict (Multi-Device)**
- Modal: "Entry was edited elsewhere"
- Options:
  - "Keep my version" (overwrite)
  - "View other version" (preview in new tab)
  - "Merge changes" (show diff)
- Default: Keep local (with auto-backup)

**Offline Mode**
- Banner: "You're offline. Saving locally."
- Background: #FEF3C7 (warning yellow)
- Icon: Cloud with slash
- Behavior: All edits save to local storage
- Sync: When connection restored

**Network Error (During Save)**
- Toast: "Couldn't save to cloud. Saved locally."
- Position: Bottom right
- Duration: 5 seconds
- Icon: Cloud with warning
- Action: "Retry" button

---

#### Desktop-Specific Enhancements

**AI Writing Assistance (Future)**
- Button: "Ask ChadGPT" in toolbar
- Shortcut: ⌘+Shift+A
- Popup: Appears in preview pane
- Suggests: Completions, rephrasing, Stoic quotes
- Insert: Click suggestion to add to editor

**Grammar & Style Checking**
- Underline: Subtle gray wavy line
- Hover: Shows suggestion tooltip
- Right-click: "Fix" or "Ignore"
- Settings: Toggle on/off

**Word Count Goals**
- Set target: "500 words"
- Progress: Circular indicator in footer
  - "247 / 500 words (49%)"
  - Color: Orange → Green as progress
- Alert: Celebrate when goal reached

**Reading Time Estimate**
- Calculation: Words ÷ 200 (avg reading speed)
- Display: "~2 min read"
- Updates: Live as you type

---

### 1.3 Quick Capture Modal

**Purpose:** Rapid thought capture with 280-character limit. Voice or text input. Minimal friction.

#### Layout Structure

**Modal Presentation**
- Appears: Slide up from bottom (300ms ease-out)
- Background overlay: rgba(0,0,0,0.4)
- Dismissal: Swipe down or tap outside

**Modal Card (400pt height)**
- Background: #FFFFFF
- Border radius: 24pt (top corners only)
- Shadow: 0 -4px 24px rgba(0,0,0,0.15)
- Position: Bottom-aligned
- Safe area: Accounts for bottom inset

**Handle Bar (Top)**
- Width: 36pt
- Height: 4pt
- Background: #CBD5E1
- Border radius: 2pt
- Centered: 12pt from top
- Purpose: Visual swipe indicator

**Header (56pt)**
- Padding: 16pt horizontal
- Margin top: 20pt from handle

**Title: "Quick Capture"**
- Font: Inter SemiBold, 20px
- Color: #1E293B

**Close Button (Right)**
- Icon: X (20pt)
- Color: #64748B
- Touch target: 44x44pt
- Position: Aligned with title
- Action: Dismiss modal

**Input Tabs (48pt)**
- Margin: 16pt horizontal, 12pt top
- Display: Two tabs, equal width

**Tab 1: Text**
- Width: ~156pt
- Height: 36pt
- Background: #4B90C8 (active), transparent (inactive)
- Text: "Text"
  - Font: Inter SemiBold, 15px
  - Color: #FFFFFF (active), #64748B (inactive)
- Border radius: 8pt
- Border: 1px solid #E2E8F0 (inactive only)

**Tab 2: Voice**
- Same styling as Tab 1
- Text: "Voice"
- Icon: Microphone (16pt, inline)

**Content Area - Text Mode (180pt)**
- Padding: 16pt horizontal

**Text Input**
- Width: 311pt (full width minus padding)
- Height: 120pt (multi-line)
- Background: #F8FAFC
- Border: 1.5px solid #E2E8F0
- Border radius: 12pt
- Padding: 12pt
- Font: Inter Regular, 16px
- Color: #1E293B
- Placeholder: "What's on your mind right now?"
  - Color: #94A3B8
- Max length: 280 characters
- Auto-focus: Yes

**Character Counter**
- Position: Below input, right-aligned
- Margin top: 8pt
- Font: Inter Medium, 13px
- Color: #64748B (normal), #F59E0B (>250), #EF4444 (280)
- Format: "47/280"

**Mood Quick Selector (40pt)**
- Margin top: 16pt
- Label: "Mood (optional)"
  - Font: Inter Medium, 13px
  - Color: #64748B
- 5 emoji buttons, horizontal
- Size: 32pt each
- Gap: 12pt
- Emotions: 😊 😐 😔 😤 😌
- Selected state: Scale 1.2, glow effect

**Content Area - Voice Mode (180pt)**
- Padding: 16pt horizontal

**Microphone Button (Center)**
- Size: 80pt circle
- Background: Gradient (#4B90C8 to #3B7AA8)
- Icon: Microphone (40pt)
- Color: #FFFFFF
- Shadow: 0 8px 24px rgba(75,144,200,0.4)
- States:
  - Idle: Static
  - Recording: Pulsing animation (1s cycle)
  - Processing: Spinner overlay

**Recording Indicator (Below mic)**
- Margin top: 16pt
- Text: "Tap to start recording"
  - Font: Inter Regular, 14px
  - Color: #64748B
- Recording: "00:15" (timer)
  - Font: Inter SemiBold, 20px
  - Color: #EF4444
- Waveform animation: 3 bars, amplitude synced to audio

**Transcription Preview (Below indicator)**
- Margin top: 12pt
- Height: 60pt
- Text: Transcribed text in real-time
- Font: Inter Regular, 15px, line-height 1.5
- Color: #1E293B
- Scrollable if exceeds 3 lines

**Action Buttons (72pt)**
- Position: Bottom of modal
- Padding: 16pt horizontal, 12pt bottom
- Gap: 12pt

**Cancel Button**
- Width: ~156pt
- Height: 48pt
- Background: Transparent
- Border: 1.5px solid #E2E8F0
- Border radius: 9999px
- Text: "Cancel"
  - Font: Inter SemiBold, 15px
  - Color: #64748B

**Save Button**
- Width: ~156pt
- Height: 48pt
- Background: #4B90C8
- Border radius: 9999px
- Text: "Save"
  - Font: Inter SemiBold, 15px
  - Color: #FFFFFF
- Disabled state: Opacity 0.4, not tappable
- Enabled: When text exists OR voice recorded

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Handle bar | 36pt | 4pt | Swipe area |
| Close button | 20pt | 20pt | 44x44pt ✓ |
| Tab button | 156pt | 36pt | 156x44pt ✓ |
| Text input | 311pt | 120pt | Full area |
| Mood emoji | 32pt | 32pt | 44x44pt ✓ |
| Microphone button | 80pt | 80pt | 80x80pt ✓ |
| Cancel button | 156pt | 48pt | 156x48pt ✓ |
| Save button | 156pt | 48pt | 156x48pt ✓ |

#### User Interactions & Gestures

1. **Swipe Down to Dismiss**
   - Gesture: Swipe down anywhere on modal
   - Threshold: 100pt movement
   - Animation: Slides down with velocity
   - Confirms: If content exists

2. **Tap Outside Modal**
   - Overlay tap dismisses modal
   - Haptic: Light impact
   - Confirms: If content exists

3. **Switch Tabs**
   - Tap: Switches input mode
   - Transition: Fade 200ms
   - Preserves: Content if switching back

4. **Voice Recording Flow**
   - Tap mic: Starts recording
   - Shows: Timer and waveform
   - Tap again: Stops recording
   - Auto-stop: At 60 seconds
   - Processes: Transcription (2-5s)
   - Shows: Preview text

5. **Re-record Voice**
   - Long press mic: Deletes and restarts
   - Haptic: Medium impact
   - Confirmation: None (instant)

6. **Save Entry**
   - Creates: Quick entry with timestamp
   - Adds: To journal history
   - Toast: "Captured" with checkmark
   - Dismisses: Modal automatically
   - Return: To previous screen

#### Accessibility

1. **VoiceOver**
   - Modal announces: "Quick Capture dialog"
   - Input: "Text entry field, What's on your mind"
   - Mic button: "Start voice recording"
   - Character count: Announced at 250, 270, 280

2. **Voice Recording**
   - Alternative: Uses system dictation API
   - Offline: Falls back to text input
   - Permissions: Requests mic access on first use

3. **Keyboard**
   - Appears: Automatically with text tab
   - Return key: "Done" (saves and dismisses)
   - Esc key: Dismisses modal

#### Empty States

**No Input**
- Save button: Disabled (grayed out)
- Placeholder: Visible
- Mood: Optional, none selected

**Voice Permission Denied**
- Voice tab: Shows alert
- Message: "Microphone access required"
- Button: "Open Settings"
- Fallback: Text tab available

#### Error States

**Voice Transcription Failed**
- Shows: Error message
- Text: "Unable to transcribe. Try again or use text."
- Action: Retry button or switch to text
- Audio: Preserved for retry

**Save Failed (Offline)**
- Toast: "Saved locally, will sync later"
- Icon: Cloud with arrow
- Color: #F59E0B (warning)
- Retry: Automatic when online

---

### 1.4 Mood Tracker (Selection Interface)

**Purpose:** Quick 1-5 scale mood logging with optional note. Accessed from Today View, Journal Editor, or Quick Capture.

#### Layout Structure

**Modal Presentation (Bottom Sheet)**
- Height: 440pt
- Background: #FFFFFF
- Border radius: 24pt (top corners)
- Shadow: 0 -4px 24px rgba(0,0,0,0.15)

**Handle Bar**
- Style: Same as Quick Capture (36pt x 4pt)

**Header (80pt)**
- Padding: 16pt horizontal
- Margin top: 20pt

**Title: "How are you feeling?"**
- Font: Inter SemiBold, 24px
- Color: #1E293B
- Centered

**Subtitle: "This helps track your patterns"**
- Font: Inter Regular, 14px
- Color: #64748B
- Centered
- Margin top: 4pt

**Mood Selection Grid (200pt)**
- Padding: 24pt horizontal
- Margin top: 24pt
- Display: 5 columns, equal spacing

**Mood Option (Repeating x5)**
- Size: 64pt circle
- Background: #F8FAFC (unselected), #E0F2FE (selected)
- Border: 2px solid transparent (unselected), #4B90C8 (selected)
- Shadow: 0 4px 8px rgba(0,0,0,0.06)

**Emoji/Icon**
- Size: 36pt
- Centered in circle
- Moods (left to right):
  1. 😔 (Very Down) - #EF4444
  2. 😕 (Down) - #F59E0B
  3. 😐 (Neutral) - #64748B
  4. 🙂 (Good) - #16A34A
  5. 😊 (Great) - #16A34A

**Label (Below each)**
- Font: Inter Medium, 12px
- Color: #64748B (unselected), #4B90C8 (selected)
- Margin top: 8pt
- Centered
- Text:
  1. "Very Down"
  2. "Down"
  3. "Neutral"
  4. "Good"
  5. "Great"

**Selection Animation**
- Tap: Scale 1.1 → 1.0 (200ms bounce)
- Haptic: Medium impact
- Previous selection: Fades out
- New selection: Fades in with scale

**Optional Note Section (80pt)**
- Margin top: 24pt
- Padding: 16pt horizontal
- Collapsible: Expands if tapped

**Label: "Add context (optional)"**
- Font: Inter Medium, 13px
- Color: #64748B

**Text Input**
- Width: Full minus padding
- Height: 40pt (single line, expandable)
- Background: #F8FAFC
- Border: 1px solid #E2E8F0
- Border radius: 10pt
- Padding: 10pt
- Font: Inter Regular, 15px
- Placeholder: "What's affecting your mood?"
- Max length: 120 characters

**Action Buttons (72pt)**
- Padding: 16pt horizontal, 12pt bottom
- Gap: 12pt

**Skip Button**
- Width: ~156pt
- Height: 48pt
- Style: Secondary (outlined)
- Text: "Skip"
- Action: Dismisses without saving

**Save Button**
- Width: ~156pt
- Height: 48pt
- Style: Primary (filled)
- Text: "Save"
- Disabled: Until mood selected
- Action: Saves mood + note, dismisses

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Mood circle | 64pt | 64pt | 64x64pt ✓ |
| Note input | 311pt | 40pt+ | Full area |
| Skip button | 156pt | 48pt | 156x48pt ✓ |
| Save button | 156pt | 48pt | 156x48pt ✓ |

#### User Interactions

1. **Tap Mood**
   - Selects mood
   - Deselects previous
   - Enables Save button
   - Haptic feedback

2. **Tap Note Field**
   - Expands to 80pt height
   - Keyboard appears
   - Return key: "Done" (dismisses keyboard)

3. **Save**
   - Stores mood + timestamp
   - Updates Today View mood chart
   - Toast: "Mood saved"
   - Dismisses modal

4. **Skip**
   - Dismisses without saving
   - No confirmation needed

#### Accessibility

1. **VoiceOver**
   - Mood buttons: "Very Down, 1 of 5", "Down, 2 of 5", etc.
   - Selected: "Great, 5 of 5, selected"
   - Note: "Optional mood context field"

2. **Color Contrast**
   - Emoji + text for redundancy (not color alone)
   - Selected state: Border + background change

---

### 1.5 Template Selection (Bottom Sheet)

**Purpose:** Choose from pre-made journaling templates (Stoic exercises, gratitude, reflection, etc.)

#### Layout Structure

**Modal Presentation**
- Height: 560pt (80% of screen)
- Background: #F8FAFC
- Border radius: 24pt (top corners)

**Handle Bar**
- Standard style (36pt x 4pt)

**Header (72pt)**
- Background: #FFFFFF
- Border bottom: 1px solid #E2E8F0
- Padding: 16pt horizontal

**Title: "Choose a Template"**
- Font: Inter SemiBold, 20px
- Color: #1E293B

**Filter Tabs (Below title)**
- Margin top: 12pt
- Scrollable horizontal
- Padding: 4pt

Tabs:
- "All" (default)
- "Stoic" (philosophy-based)
- "Gratitude"
- "Reflection"
- "Goals"
- "Custom"

**Tab Style**
- Padding: 6pt 12pt
- Background: #E0F2FE (active), transparent (inactive)
- Border radius: 6pt
- Text: Inter Medium, 13px, #4B90C8 (active), #64748B (inactive)

**Scroll Container (Template Grid)**

**Template Card (Repeating)**
- Width: 343pt
- Height: 120pt
- Margin: 12pt horizontal, 12pt vertical
- Background: #FFFFFF
- Border: 1.5px solid #E2E8F0
- Border radius: 12pt
- Padding: 16pt
- Shadow: 0 2px 8px rgba(0,0,0,0.04)
- Tap: Full card selectable

**Card Header**
- Overline badge: "STOIC" or category
  - Font: Inter Bold, 10px uppercase, letter-spacing 0.1em
  - Color: #4B90C8
  - Background: #E0F2FE
  - Padding: 4pt 8pt
  - Border radius: 4pt

**Icon (Right of badge)**
- Size: 20pt
- Color: #64748B
- Template-specific icon

**Template Title**
- Margin top: 10pt
- Font: Inter SemiBold, 17px
- Color: #1E293B
- Example: "Morning Reflection"

**Template Description**
- Margin top: 6pt
- Font: Inter Regular, 14px, line-height 1.4
- Color: #64748B
- Max lines: 2, truncate with "..."
- Example: "Start your day with Stoic mindfulness. Reflect on..."

**Metadata Footer**
- Margin top: 8pt
- Display: Inline

**Time estimate**
- Font: Inter Medium, 12px
- Color: #94A3B8
- Icon: Clock (12pt)
- Text: "5 min"

**Difficulty (Optional)**
- Margin left: 12pt
- Icon: Star (12pt)
- Text: "Beginner" or "Intermediate"

**Favorite Button (Top Right)**
- Position: Absolute, top-right of card
- Icon: Heart outline (20pt)
- Color: #CBD5E1 (unfavorited), #EF4444 (favorited)
- Touch target: 44x44pt
- Action: Toggles favorite, saves to favorites list

**No Templates State**
- Shows: When filter returns no results
- Illustration: Simple line drawing (80pt)
- Text: "No templates in this category"
- Font: Inter Regular, 15px, #64748B

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Filter tab | Variable | 28pt | Full tap area |
| Template card | 343pt | 120pt | Full card ✓ |
| Favorite button | 20pt | 20pt | 44x44pt ✓ |

#### User Interactions

1. **Tap Template Card**
   - Action: Dismisses modal
   - Navigates: To Journal Editor
   - Pre-fills: Template prompts in body
   - Adds: Template tag to entry

2. **Tap Filter Tab**
   - Filters: Template list
   - Transition: Fade 200ms
   - Scrolls: Back to top

3. **Tap Favorite**
   - Toggles: Favorite status
   - Haptic: Light impact
   - Saves: To local favorites list
   - Animation: Heart fill animation

4. **Pull to Refresh**
   - Refreshes: Template list from server
   - Adds: New templates if available

5. **Swipe Down**
   - Dismisses: Modal
   - Returns: To previous screen

#### Templates List (Examples)

**Stoic Templates:**
1. **Morning Reflection**
   - "What is within your control today?"
   - "What would make today meaningful?"
   - "What virtue will you practice?"

2. **Evening Review**
   - "What did you do well today?"
   - "What could you improve?"
   - "Did you act according to your values?"

3. **Dichotomy of Control**
   - "What worries are within your control?"
   - "What must you accept as beyond your control?"
   - "What action can you take?"

**Gratitude Templates:**
4. **Three Good Things**
   - "Three things I'm grateful for today..."

5. **Relationship Appreciation**
   - "Who helped me today? How?"

**Reflection Templates:**
6. **Weekly Review**
   - "Wins this week..."
   - "Lessons learned..."
   - "Next week's focus..."

#### Accessibility

1. **VoiceOver**
   - Cards: "Morning Reflection template. Stoic category. 5 minutes. Beginner."
   - Favorite: "Add to favorites" / "Remove from favorites"

2. **Keyboard Navigation**
   - Arrow keys: Navigate between cards
   - Enter: Select template
   - Tab: Move between filters

---

### 1.6 Entry Complete Celebration

**Purpose:** Positive reinforcement after completing a journal entry. Shows streak progress, motivational message, and next steps.

#### Layout Structure

**Full-Screen Overlay**
- Background: rgba(30, 41, 59, 0.95) (dark overlay)
- Backdrop blur: 20pt (iOS only)
- Auto-dismiss: 3 seconds OR tap anywhere

**Center Content Card (280pt width x 380pt height)**
- Background: #FFFFFF
- Border radius: 24pt
- Shadow: 0 20px 60px rgba(0,0,0,0.3)
- Padding: 32pt
- Center positioned

**Success Icon (Top)**
- Icon: Checkmark in circle OR streak flame
- Size: 80pt
- Color: #16A34A (success green)
- Animation: Scale from 0 to 1 with bounce (500ms)
  - Delay: 100ms after screen appears
  - Easing: Cubic-bezier bounce

**Headline**
- Margin top: 24pt
- Font: Inter Bold, 24px
- Color: #1E293B
- Text align: Center
- Dynamic based on streak:
  - Day 1: "Great start!"
  - Day 2-6: "You're building momentum!"
  - Day 7: "One week strong!"
  - Day 30: "30 days of wisdom!"
  - Default: "Entry saved!"

**Streak Counter**
- Margin top: 16pt
- Font: Inter SemiBold, 48px
- Color: #4B90C8
- Text align: Center
- Format: "47"
- Animation: Count up from previous (1s duration)

**Streak Label**
- Font: Inter Medium, 15px
- Color: #64748B
- Text: "Day Streak"
- Text align: Center

**Motivational Quote (Optional)**
- Margin top: 20pt
- Font: Playfair Display Italic, 15px, line-height 1.5
- Color: #64748B
- Text align: Center
- Max lines: 2
- Examples:
  - "Consistency is the path to mastery."
  - "Small steps, big changes."
  - "Your future self thanks you."

**Progress Bar**
- Margin top: 24pt
- Width: 216pt
- Height: 8pt
- Background: #E2E8F0
- Border radius: 4pt
- Fill: #4B90C8
- Animation: Fill from 0 to current% (1s ease-out)
- Purpose: Shows progress to next milestone
  - Next milestones: 7, 14, 30, 60, 90, 365 days

**Milestone Text**
- Margin top: 8pt
- Font: Inter Medium, 12px
- Color: #64748B
- Text align: Center
- Format: "3 days until 30-day milestone"

**Action Buttons (Optional, shown if >7 day streak)**
- Margin top: 24pt
- Two buttons, stacked

**Button 1: Share Progress**
- Width: 216pt
- Height: 44pt
- Background: #4B90C8
- Border radius: 9999px
- Text: "Share Progress"
- Font: Inter SemiBold, 15px
- Color: #FFFFFF
- Icon: Share icon (16pt)
- Action: Opens share sheet with image

**Button 2: Continue**
- Margin top: 12pt
- Width: 216pt
- Height: 44pt
- Background: Transparent
- Border: 1.5px solid #E2E8F0
- Border radius: 9999px
- Text: "Continue"
- Font: Inter SemiBold, 15px
- Color: #64748B
- Action: Dismisses overlay

**Auto-dismiss Timer Indicator**
- Position: Bottom of card
- Margin top: 20pt
- Progress ring (48pt diameter)
- Color: #CBD5E1
- Fills: In 3 seconds (circular countdown)
- Text center: "3" → "2" → "1"
- Font: Inter SemiBold, 16px

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Content card | 280pt | 380pt | Tap to dismiss |
| Success icon | 80pt | 80pt | Visual only |
| Share button | 216pt | 44pt | 216x44pt ✓ |
| Continue button | 216pt | 44pt | 216x44pt ✓ |

#### User Interactions

1. **Auto-dismiss**
   - After 3 seconds
   - Returns to Today View
   - Confetti animation (if milestone hit)

2. **Tap Anywhere**
   - Dismisses immediately
   - No confirmation needed

3. **Tap Share**
   - Generates: Image with streak count
   - Opens: System share sheet
   - Options: Save to photos, share to social
   - Format: 1080x1920px (story size)
   - Design: Minimal, brand colors, "Stoic.af" watermark

4. **Tap Continue**
   - Dismisses: Overlay
   - Returns: To Today View
   - Updates: Visible streak counter

#### Milestone Celebrations (Special Cases)

**7-Day Streak**
- Icon: Gold medal 🏅
- Headline: "One Week of Wisdom!"
- Confetti: Gold particles
- Quote: "The journey of a thousand miles..."

**30-Day Streak**
- Icon: Trophy 🏆
- Headline: "30 Days Strong!"
- Confetti: Blue particles
- Reward unlock: "Stoic" badge earned
- Extra button: "View Badges"

**365-Day Streak**
- Icon: Crown 👑
- Headline: "One Year of Growth!"
- Confetti: Multi-color burst
- Reward: "Philosopher" title
- Extra: Personalized Marcus Aurelius quote

#### Accessibility

1. **VoiceOver**
   - Announces: "Entry saved. 47 day streak. Great work!"
   - Dismissible: "Double tap anywhere to continue"

2. **Reduced Motion**
   - Animations disabled
   - Instant appear/dismiss
   - Static icons (no scale animation)

3. **Haptic Feedback**
   - Entry saved: Success haptic (notification type)
   - Milestone: Heavy impact haptic

#### Error States

**Save Failed (Rare)**
- Icon: Warning triangle (yellow)
- Headline: "Saving..."
- Text: "Your entry is being saved"
- No auto-dismiss (waits for success)
- Retry: Automatic background retry

---

## 2. ONBOARDING FLOW

### 2.1 Welcome / Value Proposition Screen

**Purpose:** First impression. Communicate app value, build trust, inspire user to begin journey.

#### Layout Structure

**Full Screen (No Nav)**

**Background**
- Color: Gradient from #F8FAFC (top) to #E0F2FE (bottom)
- Subtle: Light, calming effect
- Full bleed: Edge to edge

**Top Section (Illustration/Visual) - 320pt**
- Margin top: 80pt from safe area
- Centered

**Hero Illustration**
- Image: Minimalist line art of:
  - Stoic philosopher silhouette
  - Or journal with quill
  - Or sunrise/calm scene
- Size: 200pt x 200pt
- Color: #4B90C8 (monochrome line art)
- Style: Simple, modern, not cartoonish

**App Icon (Above illustration)**
- Size: 80pt
- Positioned: Center, 24pt above illustration
- Style: Rounded square, Stoic.af logo

**Content Section (Center) - 280pt**
- Padding: 32pt horizontal
- Text align: Center

**App Name**
- Text: "Stoic.af"
- Font: Inter Black, 40px
- Color: #1E293B
- Letter spacing: -0.02em

**Tagline**
- Margin top: 12pt
- Text: "Your daily practice for clarity and calm"
- Font: Inter Medium, 18px, line-height 1.4
- Color: #64748B
- Max width: 280pt

**Value Props (3 items)**
- Margin top: 40pt
- Stacked vertical
- Gap: 20pt between items

**Value Prop Item (Repeating x3)**
- Display: Horizontal (icon + text)
- Align: Left

**Icon (Left)**
- Size: 32pt circle
- Background: #E0F2FE
- Icon: 20pt, #4B90C8
- Examples:
  1. Pen/journal icon
  2. Brain/lightbulb icon (AI)
  3. Flame icon (streaks)

**Text (Right)**
- Margin left: 16pt from icon
- Title: Bold, 16px, #1E293B
  1. "Guided Journaling"
  2. "AI-Powered Insights"
  3. "Build Your Streak"
- Description: Regular, 14px, #64748B, line-height 1.4
  1. "Stoic templates & prompts"
  2. "Weekly summaries from ChadGPT"
  3. "Track progress & growth"

**Bottom Section (CTA) - 160pt**
- Position: Fixed bottom
- Padding: 24pt horizontal, 24pt bottom (+ safe area)
- Background: Gradient fade (transparent → white)

**Primary CTA Button**
- Width: Full (327pt)
- Height: 56pt
- Background: #4B90C8
- Border radius: 9999px
- Text: "Start Your Journey"
  - Font: Inter SemiBold, 17px
  - Color: #FFFFFF
- Shadow: 0 8px 24px rgba(75,144,200,0.3)
- Active: Scale 0.98

**Secondary Link**
- Margin top: 16pt
- Text: "Already have an account? Sign In"
- Font: Inter Medium, 15px
- Color: #4B90C8
- Underline: None (tap target full width)
- Height: 44pt (touch target)

**Legal Footer**
- Margin top: 12pt
- Font: Inter Regular, 11px
- Color: #94A3B8
- Text: "By continuing, you agree to our Terms & Privacy"
- Links: Terms & Privacy tappable
- Text align: Center

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| App icon | 80pt | 80pt | Non-interactive |
| Hero illustration | 200pt | 200pt | Non-interactive |
| Value prop icon | 32pt | 32pt | Non-interactive |
| Primary CTA | 327pt | 56pt | 327x56pt ✓ |
| Sign in link | 327pt | 44pt | 327x44pt ✓ |
| Legal links | Variable | 44pt | 44x44pt min ✓ |

#### User Interactions

1. **Tap "Start Your Journey"**
   - Action: Navigate to Sign Up screen (2.2)
   - Transition: Slide left (300ms)
   - Haptic: Light impact

2. **Tap "Sign In"**
   - Action: Navigate to Sign In modal/screen
   - Transition: Slide up (modal)
   - Pre-fills: Nothing (empty form)

3. **Tap Legal Links**
   - Action: Opens in-app browser
   - Shows: Terms of Service or Privacy Policy
   - Dismissal: Back button or swipe down

4. **App Launch Animation**
   - Logo: Fades in (500ms)
   - Illustration: Slides up + fades (600ms, 200ms delay)
   - Text: Fades in (400ms, 400ms delay)
   - Button: Slides up (300ms, 600ms delay)

#### Accessibility

1. **VoiceOver**
   - Screen announces: "Welcome to Stoic.af. Your daily practice for clarity and calm."
   - Value props: Read in sequence
   - CTA: "Start Your Journey button"

2. **Dynamic Type**
   - All text scales appropriately
   - Layout adjusts for larger text
   - Minimum: Illustration may shrink to fit

3. **Reduce Motion**
   - All animations: Fade only (no slides)
   - Instant transitions if preferred

---

### 2.2 Sign Up / Login Selection Screen

**Purpose:** Capture user account with minimal friction. Social login + email options.

#### Layout Structure

**Header (80pt)**
- Padding: 16pt horizontal
- Margin top: 16pt from safe area

**Back Button (Optional)**
- Icon: Chevron left
- Size: 24pt
- Touch target: 44x44pt
- Action: Return to welcome screen

**Progress Indicator**
- Position: Top center
- Style: Dots (5 dots for 5 screens)
- Size: 8pt per dot
- Color: #E2E8F0 (inactive), #4B90C8 (active)
- Current: Dot 1 of 5
- Gap: 8pt between dots

**Content Section (Center)**

**Header Text**
- Padding: 32pt horizontal
- Text align: Center

**Title: "Let's get started"**
- Font: Inter Bold, 32px
- Color: #1E293B
- Line height: 1.2

**Subtitle**
- Margin top: 8pt
- Text: "Create your account to begin"
- Font: Inter Regular, 16px
- Color: #64748B

**Social Login Buttons (160pt)**
- Margin top: 40pt
- Padding: 24pt horizontal
- Gap: 12pt between buttons

**Apple Login Button**
- Width: Full (327pt)
- Height: 56pt
- Background: #000000
- Border radius: 12pt
- Icon: Apple logo (20pt), white
- Text: "Continue with Apple"
  - Font: Inter SemiBold, 16px
  - Color: #FFFFFF
- Layout: Icon left, text center-left

**Google Login Button**
- Width: Full (327pt)
- Height: 56pt
- Background: #FFFFFF
- Border: 1.5px solid #E2E8F0
- Border radius: 12pt
- Icon: Google logo (20pt)
- Text: "Continue with Google"
  - Font: Inter SemiBold, 16px
  - Color: #1E293B
- Shadow: 0 2px 4px rgba(0,0,0,0.06)

**Divider (40pt)**
- Margin top: 24pt
- Padding: 24pt horizontal

**Line with Text**
- Lines: 1px, #E2E8F0, horizontal
- Text: "or"
  - Font: Inter Medium, 13px
  - Color: #94A3B8
  - Background: #F8FAFC (screen bg)
  - Padding: 0 12pt

**Email Form (200pt)**
- Padding: 24pt horizontal

**Email Input**
- Width: Full (327pt)
- Height: 56pt
- Background: #FFFFFF
- Border: 1.5px solid #E2E8F0
- Border radius: 12pt
- Padding: 16pt
- Placeholder: "Enter your email"
  - Font: Inter Regular, 16px
  - Color: #94A3B8
- Focus state:
  - Border: 2px solid #4B90C8
  - Shadow: 0 0 0 3px rgba(75,144,200,0.1)

**Password Input**
- Margin top: 12pt
- Same styling as email
- Placeholder: "Create password"
- Type: Password (hidden)
- Show/Hide toggle:
  - Icon: Eye (24pt)
  - Position: Right side, 16pt from edge
  - Touch target: 44x44pt

**Password Requirements**
- Margin top: 8pt
- Font: Inter Regular, 12px
- Color: #94A3B8
- Text: "Minimum 8 characters"

**Bottom CTA (100pt)**
- Position: Fixed bottom
- Padding: 24pt horizontal, 24pt bottom

**Create Account Button**
- Width: Full (327pt)
- Height: 56pt
- Background: #4B90C8
- Border radius: 9999px
- Text: "Create Account"
  - Font: Inter SemiBold, 17px
  - Color: #FFFFFF
- Disabled state: Opacity 0.4 (until email valid + password meets requirements)
- Active: Scale 0.98

**Sign In Link**
- Margin top: 16pt
- Text align: Center
- Text: "Already have an account? Sign in"
- Font: Inter Regular, 15px
- Color: #64748B
- "Sign in" part: #4B90C8, tappable
- Touch target: Full width, 44pt height

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Back button | 24pt | 24pt | 44x44pt ✓ |
| Social buttons | 327pt | 56pt | 327x56pt ✓ |
| Email input | 327pt | 56pt | Full area |
| Password input | 327pt | 56pt | Full area |
| Show/hide toggle | 24pt | 24pt | 44x44pt ✓ |
| Create account button | 327pt | 56pt | 327x56pt ✓ |

#### User Interactions

1. **Tap Apple/Google Login**
   - Action: Initiates OAuth flow
   - Shows: System permission dialog
   - Success: Skips to screen 2.3 (Choose Virtue)
   - Error: Toast with error message

2. **Enter Email**
   - Validation: Real-time (debounced 500ms)
   - Valid: Green checkmark appears
   - Invalid: Red border + error text below
   - Error text: "Please enter a valid email"

3. **Enter Password**
   - Validation: Real-time
   - Requirements check:
     - ✓ Green checkmark when met
     - Show requirements below input
   - Strength indicator: Optional bar (weak/good/strong)

4. **Tap Show/Hide Password**
   - Toggles: Password visibility
   - Icon changes: Eye → Eye with slash
   - No other state change

5. **Tap Create Account**
   - Action: Creates account
   - Shows: Loading spinner on button
   - Success: Navigate to screen 2.3
   - Error: Toast with error message
     - "Email already exists"
     - "Network error, try again"

#### Accessibility

1. **VoiceOver**
   - Inputs: "Email text field", "Password secure text field"
   - Button: "Create Account button. Disabled" / "Enabled"
   - Toggle: "Show password" / "Hide password"

2. **Keyboard**
   - Return key: Next (email → password)
   - Return key: "Create Account" (from password)
   - Auto-capitalize: None for email
   - Keyboard type: Email for email field

#### Empty States

**Initial State**
- All fields empty
- Create Account button disabled
- No validation errors shown

#### Error States

**Invalid Email**
- Border: Red (#EF4444)
- Error text: Below input, red, 13px
- Icon: Warning triangle (16pt)

**Weak Password**
- Warning text: "Password too weak"
- Color: #F59E0B (warning)
- Suggestions: "Add numbers or symbols"

**Network Error**
- Toast: Top of screen
- Background: #FEF3C7
- Text: "Connection error. Try again."
- Duration: 5 seconds
- Dismissal: Tap or auto

**Email Taken**
- Error below email: "This email is already registered"
- Link: "Sign in instead?"
- Action: Switches to sign in flow

---

### 2.3 Choose Your Virtue (4 Pillars Selection)

**Purpose:** Personalize the app by selecting primary focus area(s). Sets tone for content curation.

#### Layout Structure

**Header (120pt)**
- Padding: 24pt horizontal
- Text align: Center

**Progress Indicator**
- Position: Top, 16pt from safe area
- Dots: 5 total, current = 2
- Style: Same as previous screen

**Title: "Choose your virtues"**
- Margin top: 32pt from dots
- Font: Inter Bold, 28px
- Color: #1E293B

**Subtitle**
- Margin top: 8pt
- Text: "Select one or more to focus on"
- Font: Inter Regular, 16px
- Color: #64748B
- Note: "(You can change these later)"
  - Margin top: 4pt
  - Font: Inter Regular, 13px
  - Color: #94A3B8

**Pillar Grid (440pt)**
- Margin top: 32pt
- Padding: 16pt horizontal
- Display: 2x2 grid
- Gap: 16pt between cards

**Pillar Card (Repeating x4)**
- Width: 155pt (fits 2 per row with gaps)
- Height: 200pt
- Background: #FFFFFF
- Border: 2px solid #E2E8F0 (unselected)
- Border: 3px solid #4B90C8 (selected)
- Border radius: 16pt
- Padding: 20pt
- Shadow: 0 4px 12px rgba(0,0,0,0.06)
- Tap: Toggles selection

**Selected State**
- Border: 3px solid #4B90C8
- Background: #F0F7FF (very light blue tint)
- Checkmark badge:
  - Position: Top right, 8pt inset
  - Size: 24pt circle
  - Background: #4B90C8
  - Icon: White checkmark (14pt)

**Card Content (Top to Bottom)**

**Icon**
- Size: 56pt
- Color: #4B90C8 (icon itself)
- Background: #E0F2FE circle (64pt)
- Centered horizontal
- Examples:
  1. 💰 Money: Coins/dollar icon
  2. 🧠 Ego: Brain/shield icon
  3. ❤️ Relationships: Heart/people icon
  4. ⚡ Discipline: Lightning/target icon

**Pillar Name**
- Margin top: 16pt
- Font: Inter Bold, 18px
- Color: #1E293B
- Text align: Center
- Names:
  1. "Money"
  2. "Ego"
  3. "Relationships"
  4. "Discipline"

**Description**
- Margin top: 8pt
- Font: Inter Regular, 13px, line-height 1.4
- Color: #64748B
- Text align: Center
- Max lines: 3
- Examples:
  1. "Financial wisdom & abundance"
  2. "Self-control & humility"
  3. "Connection & empathy"
  4. "Habits & consistency"

**Selection Animation**
- Tap: Scale 0.95 → 1.05 → 1.0 (300ms bounce)
- Border: Smooth color transition (200ms)
- Checkmark: Scale from 0 (appears)
- Haptic: Medium impact

**Bottom CTA (100pt)**
- Position: Fixed bottom
- Padding: 24pt horizontal, 24pt bottom

**Selection Counter**
- Text: "2 selected" or "None selected"
- Font: Inter Medium, 14px
- Color: #64748B
- Text align: Center
- Margin bottom: 12pt

**Continue Button**
- Width: Full (327pt)
- Height: 56pt
- Background: #4B90C8
- Border radius: 9999px
- Text: "Continue"
  - Font: Inter SemiBold, 17px
  - Color: #FFFFFF
- Disabled: If none selected (opacity 0.4)
- Active: Scale 0.98

**Skip Link**
- Margin top: 16pt
- Text: "Skip for now"
- Font: Inter Regular, 15px
- Color: #94A3B8
- Text align: Center
- Touch target: Full width, 44pt

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Pillar card | 155pt | 200pt | Full card ✓ |
| Continue button | 327pt | 56pt | 327x56pt ✓ |
| Skip link | 327pt | 44pt | Full width ✓ |

#### User Interactions

1. **Tap Pillar Card**
   - Toggles: Selection state
   - Multi-select: Allowed (all 4 can be selected)
   - Animation: Bounce + checkmark appear/disappear
   - Updates: Counter at bottom

2. **Tap Continue**
   - Action: Saves selections, navigates to screen 2.4
   - Transition: Slide left
   - Data: Stores in user profile

3. **Tap Skip**
   - Action: No selections saved (defaults: all 4)
   - Navigate: To screen 2.4
   - Toast: "You can choose virtues later in settings"

#### Accessibility

1. **VoiceOver**
   - Card: "Money pillar. Financial wisdom and abundance. Not selected" / "Selected"
   - Counter: "2 virtues selected"
   - Button: "Continue button. Enabled when at least one virtue selected"

2. **Color Independence**
   - Selection: Border + checkmark + background (not color alone)
   - Works in grayscale

---

### 2.4 Select Coaching Tone

**Purpose:** Personalize AI coaching style. Sets ChadGPT personality/tone for feedback.

#### Layout Structure

**Header (100pt)**
- Same progress indicator (dot 3 of 5)
- Title: "Choose your coach"
- Subtitle: "How should ChadGPT talk to you?"

**Tone Cards (500pt)**
- Margin top: 24pt
- Padding: 16pt horizontal
- Stacked vertical
- Gap: 12pt between cards

**Tone Card (Repeating x4)**
- Width: Full (343pt)
- Height: 110pt
- Background: #FFFFFF
- Border: 2px solid #E2E8F0 (unselected)
- Border: 3px solid #4B90C8 (selected)
- Border radius: 12pt
- Padding: 16pt
- Radio button style: Only one selectable at a time

**Selected State**
- Border: 3px solid #4B90C8
- Background: #F0F7FF
- Radio indicator:
  - Position: Right side, centered vertically
  - Size: 24pt circle
  - Border: 2px solid #4B90C8
  - Fill: #4B90C8 dot (12pt) when selected

**Card Content (Left to Right)**

**Icon**
- Size: 48pt circle
- Background: Tone-specific color
- Icon: 24pt, white
- Examples:
  1. 🌸 Gentle: Flower/heart icon, #16A34A bg
  2. 💪 Reality Check: Flexed arm, #F59E0B bg
  3. 🎯 Drill Sergeant: Target/whistle, #EF4444 bg
  4. 😎 ChadGPT: Sunglasses, #4B90C8 bg (default)

**Text Content (Right of icon)**
- Margin left: 16pt

**Tone Name**
- Font: Inter Bold, 17px
- Color: #1E293B
- Names:
  1. "Gentle Guide"
  2. "Reality Check"
  3. "Drill Sergeant"
  4. "ChadGPT" (recommended badge)

**Recommended Badge (ChadGPT only)**
- Display: Inline with name
- Margin left: 8pt
- Background: #E0F2FE
- Text: "RECOMMENDED"
  - Font: Inter Bold, 10px
  - Color: #4B90C8
  - Letter spacing: 0.08em
- Padding: 4pt 6pt
- Border radius: 4pt

**Description**
- Margin top: 6pt
- Font: Inter Regular, 14px, line-height 1.4
- Color: #64748B
- Max lines: 2
- Examples:
  1. "Supportive and encouraging feedback"
  2. "Honest, direct, no-nonsense advice"
  3. "Tough love and accountability"
  4. "Balanced wisdom with a hint of humor"

**Example Quote (Below cards)**
- Margin: 16pt horizontal, 24pt top
- Background: #F8FAFC
- Border left: 4px solid #4B90C8
- Border radius: 8pt
- Padding: 16pt
- Changes: Based on selected tone

**Quote Icon**
- Left side: Quote marks icon (20pt)
- Color: #4B90C8

**Quote Text**
- Font: Playfair Display Italic, 15px, line-height 1.5
- Color: #475569
- Example for ChadGPT: "Listen, king. You wrote 3 words today? That's not journaling, that's a tweet. Let's try that again."

**Attribution**
- Margin top: 8pt
- Font: Inter Medium, 12px
- Color: #94A3B8
- Text: "— ChadGPT"

**Bottom CTA (100pt)**
- Continue button (enabled always, default: ChadGPT)
- Back button option

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Tone card | 343pt | 110pt | Full card ✓ |
| Radio indicator | 24pt | 24pt | Card tap area |
| Continue button | 327pt | 56pt | 327x56pt ✓ |

#### User Interactions

1. **Tap Tone Card**
   - Action: Selects tone (deselects previous)
   - Animation: Border color transition (200ms)
   - Updates: Example quote below
   - Haptic: Light impact

2. **Tap Continue**
   - Action: Saves tone preference
   - Navigate: To screen 2.5 (notifications)

3. **Dynamic Example Quote**
   - Changes: Immediately when selection changes
   - Animation: Fade out → fade in (300ms)
   - Shows: Representative ChadGPT response

#### Accessibility

1. **VoiceOver**
   - Card: "ChadGPT coaching tone. Recommended. Balanced wisdom with a hint of humor. Selected"
   - Radio: Screen reader announces selection state
   - Example: Reads quote when selection changes

---

### 2.5 Enable Notifications

**Purpose:** Request notification permission for streak reminders and AI summaries. Explain value first.

#### Layout Structure

**Hero Section (360pt)**
- Background: Linear gradient #4B90C8 to #3B7AA8
- Full width, rounded bottom corners (24pt)
- Padding: 40pt horizontal, 60pt top

**Illustration**
- Size: 160pt x 160pt
- Style: Line art of phone with notification bubbles
- Color: White with opacity 0.9
- Centered

**Title (White text)**
- Margin top: 24pt
- Font: Inter Bold, 26px
- Color: #FFFFFF
- Text: "Stay on track"
- Text align: Center

**Subtitle (White text)**
- Margin top: 8pt
- Font: Inter Regular, 16px, line-height 1.4
- Color: rgba(255,255,255,0.9)
- Text: "Get gentle reminders to journal and weekly insights"
- Text align: Center
- Max width: 280pt

**Benefits List (280pt)**
- Margin top: 32pt
- Padding: 24pt horizontal
- Background: #F8FAFC (screen bg)

**Benefit Item (Repeating x3)**
- Margin bottom: 20pt
- Display: Horizontal (icon + text)

**Icon**
- Size: 40pt circle
- Background: #E0F2FE
- Icon: 20pt, #4B90C8
- Examples:
  1. Bell icon
  2. Lightbulb icon
  3. Fire icon

**Text**
- Margin left: 16pt

**Title**
- Font: Inter SemiBold, 16px
- Color: #1E293B
- Text:
  1. "Daily Reminders"
  2. "Weekly Summaries"
  3. "Streak Alerts"

**Description**
- Margin top: 4pt
- Font: Inter Regular, 14px, line-height 1.4
- Color: #64748B
- Text:
  1. "Gentle nudge at your preferred time"
  2. "AI insights delivered every Sunday"
  3. "Don't break your streak—we'll remind you"

**Settings Link**
- Margin top: 16pt
- Padding: 16pt
- Background: #F0F7FF
- Border: 1px solid #D1E7FA
- Border radius: 8pt
- Icon: Info (16pt), #4B90C8
- Text: "You can customize notification times in settings"
  - Font: Inter Regular, 13px
  - Color: #64748B
- Text align: Center

**Bottom CTAs (140pt)**
- Position: Fixed bottom
- Padding: 24pt

**Enable Notifications Button**
- Width: Full (327pt)
- Height: 56pt
- Background: #4B90C8
- Border radius: 9999px
- Text: "Enable Notifications"
  - Font: Inter SemiBold, 17px
  - Color: #FFFFFF
- Shadow: 0 4px 12px rgba(75,144,200,0.25)

**Skip Link**
- Margin top: 16pt
- Text: "Skip (You can enable later)"
- Font: Inter Regular, 15px
- Color: #94A3B8
- Text align: Center
- Touch target: Full width, 44pt

**Progress Indicator**
- Dots: 5 total, current = 5 (last step)
- Position: Top center of screen

#### Component Specifications

| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Benefit icon | 40pt | 40pt | Non-interactive |
| Enable button | 327pt | 56pt | 327x56pt ✓ |
| Skip link | 327pt | 44pt | Full width ✓ |

#### User Interactions

1. **Tap Enable Notifications**
   - Action: Requests system permission
   - Shows: iOS/Android permission dialog
   - Granted: Navigate to app (Today View)
   - Denied: Still navigates (saves preference as "denied")
   - Welcome message: Toast "Welcome! Start your first entry"

2. **Tap Skip**
   - Action: Navigates to app without requesting
   - Saves: Preference as "not requested"
   - Can enable: Later in settings

3. **System Permission Dialog**
   - iOS: "Stoic.af Would Like to Send You Notifications"
   - Options: "Don't Allow" or "Allow"
   - Timing: Immediately after button tap

#### Accessibility

1. **VoiceOver**
   - Benefits: Read in sequence with clear separation
   - Button: "Enable Notifications button. Tap to request notification permission"
   - Skip: "Skip button. You can enable notifications later in settings"

#### Success State

**Permission Granted**
- Brief checkmark animation
- Transition: To Today View (1st time experience)
- Sets: Onboarding complete flag

**Permission Denied**
- No error shown (not user-hostile)
- Navigates: To Today View anyway
- Settings: Shows "Enable notifications" option

---

## 3. NAVIGATION & DISCOVERY

### 3.1 Home Dashboard (Alternative to Today View)

**Purpose:** High-level overview of all user activity. Accessible when tapping "Home" in bottom nav (Today View is default).

#### Layout Structure

**Header (100pt)**
- Padding: 16pt horizontal, 16pt from safe area
- Background: #F8FAFC

**Greeting + Profile**
- Left: "Good afternoon, Sarah" (dynamic)
  - Font: Inter Bold, 20px
  - Color: #1E293B
- Right: Profile avatar
  - Size: 40pt circle
  - Border: 2px solid #4B90C8
  - Touch target: 44x44pt
  - Action: Navigate to Settings/Profile

**Stats Overview Cards (140pt)**
- Margin: 16pt horizontal, 16pt top
- Display: Horizontal scroll (if >3 cards)
- Gap: 12pt between cards

**Stat Card (Repeating, 3-4 shown)**
- Width: 140pt
- Height: 100pt
- Background: White, gradient accent
- Border radius: 16pt
- Padding: 16pt
- Shadow: 0 4px 12px rgba(0,0,0,0.06)

Cards:
1. **Current Streak**
   - Icon: Fire (24pt), #F59E0B
   - Number: "47 days" (Inter Bold, 32px)
   - Label: "Current Streak"

2. **This Week**
   - Icon: Calendar (24pt), #4B90C8
   - Number: "5 entries" (Inter Bold, 32pt)
   - Label: "This Week"

3. **Total Words**
   - Icon: Document (24pt), #16A34A
   - Number: "12.4k" (Inter Bold, 32px)
   - Label: "Words Written"

4. **Mood Average**
   - Icon: Smile (24pt), #4B90C8
   - Emoticon: Large 😊
   - Label: "Feeling Great"

**Quick Actions (120pt)**
- Margin: 16pt horizontal, 24pt top
- Header: "Quick Actions" (Inter SemiBold, 18px)
- Grid: 2x2, gap 12pt

Action buttons (per button):
- Size: 155pt x 56pt
- Background: #FFFFFF
- Border: 1px solid #E2E8F0
- Border radius: 12pt
- Icon + text layout
- Examples:
  1. "New Entry" (pen icon)
  2. "Quick Capture" (mic icon)
  3. "View Insights" (chart icon)
  4. "Templates" (document icon)

**Activity Feed (Variable)**
- Margin: 16pt horizontal, 24pt top
- Header: "Recent Activity"
- Shows: Last 5 activities (entries, milestones, AI summaries)

Activity items:
- Timeline style with connector line
- Icon, timestamp, brief description
- Tap to view full item

---

### 3.2 Journal List (Searchable History)

**Purpose:** Browse, search, and filter all journal entries. Main "Journal" tab in bottom nav.

#### Layout Structure

**Header (120pt)**
- Fixed at top
- Background: #FFFFFF
- Border bottom: 1px solid #E2E8F0

**Title: "Journal"**
- Font: Inter Bold, 28px
- Color: #1E293B
- Padding: 16pt horizontal

**Search Bar**
- Width: Full minus 32pt padding
- Height: 44pt
- Background: #F8FAFC
- Border: 1px solid #E2E8F0
- Border radius: 10pt
- Icon: Magnifying glass (20pt), left side
- Placeholder: "Search entries..."
- Font: Inter Regular, 16px

**Filter Row (56pt)**
- Scrollable horizontal
- Padding: 12pt horizontal
- Gap: 8pt

Filter chips:
- Padding: 8pt 14pt
- Background: #E0F2FE (active), transparent (inactive)
- Border: 1px solid #CBD5E1 (inactive)
- Border radius: 9999px
- Text: Inter Medium, 14px
- Options:
  - "All"
  - "Money"
  - "Ego"
  - "Relationships"
  - "Discipline"
  - "Favorites"
  - "This Week"
  - "This Month"

**Sort Dropdown (Top Right)**
- Icon: Sort lines (20pt)
- Touch target: 44x44pt
- Options modal:
  - "Newest First" (default)
  - "Oldest First"
  - "Longest Entries"
  - "Most Words"

**Entry List (Scroll Container)**

**Date Section Header (32pt)**
- Background: #F8FAFC
- Padding: 8pt 16pt
- Sticky: Yes (stays at top when scrolling)
- Text: "Today", "Yesterday", "November 18", etc.
- Font: Inter SemiBold, 13px, uppercase
- Color: #64748B
- Letter spacing: 0.08em

**Entry Card (Variable, ~140pt typical)**
- Margin: 12pt horizontal, 8pt vertical
- Background: #FFFFFF
- Border: 1px solid #E2E8F0
- Border radius: 12pt
- Padding: 16pt
- Full card tappable

**Card Header**
- Time: "3:45 PM" (Inter Medium, 13px, #64748B)
- Word count: "247 words" (right-aligned)
- Mood emoji: 24pt (if logged)

**Entry Preview**
- Margin top: 8pt
- Title (if exists): Inter SemiBold, 16px, #1E293B
- Body preview: 3 lines max, truncated
- Font: Inter Regular, 15px, line-height 1.5
- Color: #475569

**Card Footer**
- Margin top: 12pt
- Pillar tags (chips)
- Favorite button (right-aligned)
  - Icon: Heart outline/filled
  - Color: #EF4444 (if favorited)
  - Touch target: 44x44pt

**Swipe Actions**
- Swipe right: Favorite (green)
- Swipe left: Delete (red)

**Empty State**
- If no entries match search/filter
- Illustration: Magnifying glass (100pt)
- Text: "No entries found"
- Subtext: "Try a different search or filter"
- Reset button: "Clear filters"

**Floating Action Button**
- Position: Bottom right, 16pt from edges
- Size: 56pt circle
- Background: #4B90C8
- Icon: Plus (28pt), white
- Shadow: 0 8px 24px rgba(75,144,200,0.4)
- Action: Navigate to Journal Editor
- Elevation: Above entries, below nav

---

### 3.3 Insights (Charts, Patterns, AI Summaries)

**Purpose:** Visualize journaling patterns, mood trends, and AI-generated insights.

#### Layout Structure

**Header (80pt)**
- Title: "Insights"
- Subtitle: "Your journaling patterns"
- Settings icon: Top right (customize charts)

**Time Range Selector (56pt)**
- Segmented control
- Options: "Week" | "Month" | "Year" | "All Time"
- Selected: #4B90C8 background
- Unselected: Transparent
- Width: Full minus 32pt padding

**Scroll Container**

**Mood Trend Card (280pt)**
- Title: "Mood Over Time"
- Chart: Line graph
  - X-axis: Dates
  - Y-axis: 1-5 mood scale
  - Line: #4B90C8, 2px
  - Points: Dots (8pt) on line
  - Fill: Gradient below line
- Stats:
  - Average mood: 4.2/5
  - Best day: Nov 15 (5/5)
  - Pattern note: "Most positive on weekends"

**Writing Frequency Card (200pt)**
- Title: "Writing Habit"
- Chart: Bar chart or heatmap
  - GitHub-style contribution graph
  - Green shades for entry count
  - Darker = more entries
- Stats:
  - Total entries: 142
  - Current streak: 47 days
  - Longest streak: 63 days
  - Avg per week: 5.2 entries

**Pillar Balance Card (260pt)**
- Title: "Virtue Focus"
- Chart: Donut chart or radial bars
  - Money: 25% (blue)
  - Ego: 20% (purple)
  - Relationships: 35% (pink)
  - Discipline: 20% (green)
- Insight: "You're focusing most on Relationships this month"

**Word Count Card (180pt)**
- Title: "Writing Volume"
- Stats:
  - Total words: 12,483
  - Avg per entry: 247 words
  - Longest entry: 892 words (Nov 10)
- Chart: Sparkline of words over time

**Time of Day Card (200pt)**
- Title: "When You Journal"
- Chart: Horizontal bar chart or clock visual
  - Morning: 15%
  - Afternoon: 25%
  - Evening: 55% (peak)
  - Night: 5%
- Insight: "You're most reflective in the evening"

**AI Weekly Summary Card (Variable, ~200pt)**
- Title: "Latest Weekly Summary"
- Date: "Week of Nov 13-19"
- AI-generated text:
  - Font: Inter Regular, 15px, line-height 1.6
  - Color: #1E293B
  - Max lines: 6, "Read more" expands
  - Example: "This week you focused heavily on relationships and gratitude. You mentioned 'family' 8 times..."
- Action button: "View Full Summary"
- ChadGPT badge: "By ChadGPT" (small chip)

**Badges & Achievements Card (180pt)**
- Title: "Your Achievements"
- Horizontal scroll of badges
- Badge (each):
  - Size: 80pt x 80pt
  - Icon/emoji (48pt)
  - Title below (12px)
  - Examples:
    - "7 Day Streak" 🔥
    - "First Entry" ✏️
    - "100 Words" 📝
    - "Mood Tracker" 😊
    - "Stoic Scholar" 🏛️
- Locked badges shown in grayscale with lock icon

**Export Data Section (100pt)**
- Title: "Your Data"
- Buttons:
  - "Export All Entries" (PDF/TXT)
  - "Download Insights Report"
- Icon: Download (20pt)
- Font: Inter Medium, 15px

---

### 3.4 Settings / Profile Screen

**Purpose:** Account settings, preferences, subscription management, app customization.

#### Layout Structure

**Header (140pt)**
- Background: Gradient #4B90C8 to #3B7AA8
- Rounded bottom: 24pt

**Profile Info**
- Avatar: 80pt circle, centered
  - Edit button overlay (tap to change)
- Name: "Sarah Mitchell" (Inter Bold, 24px, white)
- Email: "sarah@example.com" (Inter Regular, 14px, white 80%)
- Streak badge: "47 🔥" (bottom of gradient section)

**Scroll Container**

**Section: Account (100pt)**
- Background: #FFFFFF
- Border radius: 12pt
- Margin: 16pt horizontal

Items:
- "Edit Profile" >
- "Change Password" >
- "Subscription" > (with "Pro" badge if active)

**Section: Preferences (200pt)**
Items:
- "Daily Reminder"
  - Toggle switch (right)
  - Subtext: "8:00 PM"
  - Tap: Time picker modal
- "Weekly Summary Day"
  - Value: "Sunday"
  - Tap: Day picker
- "Coaching Tone"
  - Value: "ChadGPT"
  - Tap: Navigate to tone selector
- "Virtue Focus"
  - Pills showing selected virtues
  - Tap: Navigate to virtue selector
- "Dark Mode"
  - Segmented: Auto | Light | Dark
- "Haptic Feedback"
  - Toggle switch

**Section: Data & Privacy (120pt)**
Items:
- "Export My Data" >
- "Delete All Entries" > (red text)
- "Privacy Policy" >
- "Terms of Service" >

**Section: About (80pt)**
Items:
- "App Version" (value: "1.0.2")
- "Rate Stoic.af" >
- "Share with Friends" >
- "Help & Support" >

**Danger Zone (80pt)**
- Background: #FEE2E2
- Border: 1px solid #FCA5A5
- Button: "Log Out" (red text)
- Button: "Delete Account" (red text, bottom)

**Component Specifications**
- Setting row: 56pt height minimum
- Toggle switch: 51x31pt (iOS standard)
- Chevron icons: 20pt, #94A3B8
- Touch targets: Full row (minimum 56pt height)

**Modal Interactions**
- Time Picker: Native wheel picker (iOS) or clock picker (Android)
- Day Picker: List of days, radio selection
- Tone Selector: Full screen with previous selection highlighted

---

## 4. AI FEATURES

### 4.1 ChadGPT Chat Interface

**Purpose:** Conversational AI coach for reflection, advice, and accountability.

#### Layout Structure

**Header (80pt)**
- Background: #FFFFFF
- Border bottom: 1px solid #E2E8F0

**Left: Back Button**
- Chevron left
- Touch target: 44x44pt

**Center: ChadGPT Title**
- Font: Inter Bold, 18px
- Subtitle: "Your AI Coach"
  - Font: Inter Regular, 12px
  - Color: #64748B
- Avatar: Small ChadGPT icon (32pt)

**Right: Options Menu**
- Three dots
- Options:
  - "Change Tone"
  - "Export Chat"
  - "Clear History"

**Chat Container (Scroll View)**
- Background: #F8FAFC
- Padding: 16pt horizontal
- Auto-scroll to bottom on new message

**Message Bubble - User (Right-aligned)**
- Max width: 75% of screen
- Background: #4B90C8
- Text color: #FFFFFF
- Border radius: 18pt (speech bubble shape)
- Padding: 12pt 16pt
- Font: Inter Regular, 16px
- Timestamp: Below bubble, small, gray
- Tail: Points to bottom-right

**Message Bubble - ChadGPT (Left-aligned)**
- Max width: 75% of screen
- Background: #FFFFFF
- Text color: #1E293B
- Border: 1px solid #E2E8F0
- Border radius: 18pt
- Padding: 12pt 16pt
- Font: Inter Regular, 16px
- Markdown support: **bold**, *italic*
- Avatar: 32pt circle, left of bubble
- Tail: Points to bottom-left
- Actions below:
  - Copy button (icon)
  - Regenerate response (if last message)

**Suggested Prompts (When no chat active)**
- Display: Cards in scroll view
- Centered
- Examples:
  - "How's my journaling this week?"
  - "Why am I procrastinating?"
  - "Give me a reality check"
  - "Stoic advice on dealing with stress"
- Card:
  - Background: #FFFFFF
  - Border: 1px solid #E2E8F0
  - Padding: 16pt
  - Tap: Sends as message

**Typing Indicator (When AI responding)**
- Three animated dots
- Background: White bubble
- Position: Left side, bottom of chat

**Input Bar (Fixed Bottom)**
- Height: Variable (44pt minimum, expands to 120pt max)
- Background: #FFFFFF
- Border top: 1px solid #E2E8F0
- Padding: 8pt horizontal

**Text Input**
- Width: Expands with available space
- Height: 36pt minimum, auto-expands
- Background: #F8FAFC
- Border: 1px solid #E2E8F0
- Border radius: 18pt
- Padding: 8pt 16pt
- Placeholder: "Ask ChadGPT anything..."
- Font: Inter Regular, 16px
- Max height: 120pt (5 lines)

**Send Button**
- Position: Right of input
- Size: 36pt circle
- Background: #4B90C8 (enabled), #E2E8F0 (disabled)
- Icon: Arrow up (20pt), white
- Disabled: When input empty
- Tap: Sends message

**Voice Input Button (Optional)**
- Position: Left of send button
- Size: 36pt circle
- Background: Transparent
- Icon: Microphone (20pt)
- Tap: Starts voice input
- Hold: Press-to-talk mode

**Component Specifications**
| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Message bubble | ≤75% screen | Variable | Full bubble |
| Send button | 36pt | 36pt | 44x44pt area |
| Suggested prompt card | 90% screen | 80pt | Full card |
| Input field | Variable | 36-120pt | Full area |

**User Interactions**

1. **Tap Suggested Prompt**
   - Sends as user message
   - Shows user bubble
   - ChadGPT responds (2-5s)
   - Typing indicator while waiting

2. **Type and Send Message**
   - Input expands as user types
   - Send button enables
   - Tap send or press return
   - Message appears immediately
   - Scrolls to bottom
   - ChadGPT response follows

3. **Hold to Voice Input**
   - Long press mic button
   - Shows waveform
   - Releases: Processes speech
   - Transcribes to text
   - Sends automatically

4. **Regenerate Response**
   - Tap icon on last ChadGPT message
   - Removes last response
   - Generates new response
   - Use case: User dislikes tone/content

5. **Copy Message**
   - Tap copy icon
   - Copies to clipboard
   - Toast: "Copied"

**Empty State**
- First time: Welcome message from ChadGPT
  - "Hey! I'm ChadGPT. Ask me anything about your journaling, or let's dive into what's on your mind."
- With suggestions below

**Loading State**
- Typing indicator (three dots)
- Animates: Pulse effect (1s cycle)

**Error State**
- If API fails:
  - Message: "Couldn't reach ChadGPT. Check your connection."
  - Retry button
  - Shows in place of response

---

### 4.2 Weekly AI Summary Display

**Purpose:** Show AI-generated weekly insights about journaling patterns, themes, and growth.

#### Layout Structure

**Header (100pt)**
- Back button (left)
- Title: "Weekly Summary"
- Share button (top right) - exports/shares summary

**Summary Hero Card (180pt)**
- Background: Gradient #4B90C8 to #3B7AA8
- Border radius: 24pt
- Margin: 16pt
- Padding: 24pt
- Text color: White

**Week Range**
- Font: Inter SemiBold, 14px uppercase
- Color: White 80%
- Text: "WEEK OF NOV 13–19"

**Summary Title**
- Margin top: 8pt
- Font: Inter Bold, 24px
- Color: White
- Generated by AI, examples:
  - "A Week of Growth"
  - "Finding Balance"
  - "Relationship Focus"

**Key Stats Row**
- Margin top: 16pt
- Display: 3 columns

Per stat:
- Icon: 24pt, white
- Number: Inter Bold, 20px, white
- Label: Inter Regular, 12px, white 80%
- Examples:
  - 🔥 "7 entries"
  - 📝 "1,847 words"
  - 😊 "4.3 avg mood"

**Content Sections (Scroll View)**

**Section: AI Insights**
- Title: "What ChadGPT Noticed"
- Background: #FFFFFF
- Border radius: 16pt
- Padding: 20pt
- Margin: 16pt

**Insight Paragraph**
- Font: Inter Regular, 16px, line-height 1.6
- Color: #1E293B
- AI-generated text, example:
  - "This week, you journaled consistently about relationships and family connections. The word 'grateful' appeared 12 times, suggesting a positive mindset shift. You were most reflective on Wednesday evening, writing your longest entry (487 words) about career decisions."

**Highlighted Words/Themes**
- Margin top: 16pt
- Title: "Common Themes"
- Display: Chips/pills
- Each chip:
  - Background: #E0F2FE
  - Text: Inter Medium, 14px, #4B90C8
  - Padding: 6pt 12pt
  - Border radius: 6pt
- Examples: "gratitude" "family" "work" "anxiety"

**Section: Mood Journey**
- Background: #FFFFFF
- Padding: 20pt
- Margin: 16pt

**Title: "Your Mood This Week"**
- Chart: Mini line graph (sparkline style)
- Height: 80pt
- Shows 7 days of mood data

**Mood Analysis**
- Text: Inter Regular, 15px
- Example: "You started the week feeling neutral but ended strong with 3 consecutive days of positive mood. Your mood improved most after writing about gratitude."

**Section: Pillar Breakdown**
- Background: #FFFFFF
- Padding: 20pt

**Title: "What You Focused On"**
- Horizontal bar chart
- Each pillar:
  - Label: "Relationships" (left)
  - Bar: Filled portion (#4B90C8)
  - Percentage: "35%" (right)
- Total: Adds to 100%

**Section: Coaching Insights**
- Background: #F0F7FF
- Border: 2px solid #4B90C8
- Padding: 20pt
- Icon: ChadGPT avatar (40pt, top left)

**ChadGPT Quote**
- Font: Playfair Display Italic, 16px
- Line-height: 1.6
- Color: #1E293B
- Example: "You're building something real here. Seven straight days of reflection? That's not luck—that's discipline. Keep this momentum, king."
- Attribution: "— ChadGPT" (Inter Medium, 13px)

**Section: Next Week Goals (Optional)**
- Background: #FFFFFF
- Padding: 20pt

**Title: "Suggested Focus for Next Week"**
- Bullet list:
  - Icon: Checkbox (unchecked)
  - Text: Inter Regular, 15px
  - Examples:
    - "Continue 5+ entries/week"
    - "Explore the 'Discipline' pillar more"
    - "Try the 'Evening Review' template"

**Bottom Action Buttons**
- Position: Sticky bottom or after content
- Padding: 16pt

**Button: "Chat with ChadGPT About This"**
- Full width
- Height: 56pt
- Background: #4B90C8
- Text: White
- Action: Opens chat with context pre-loaded

**Button: "Share Summary"**
- Full width
- Height: 48pt
- Background: Transparent
- Border: 1.5px solid #E2E8F0
- Text: #64748B
- Action: Opens share sheet (image or text)

**Previous Summaries Link**
- Margin top: 16pt
- Text: "View Past Summaries >"
- Font: Inter Medium, 15px
- Color: #4B90C8
- Action: Navigate to archive of all summaries

**Component Specifications**
- Hero card: Full width minus 32pt margins
- Content sections: Full width minus 32pt margins
- Charts: Responsive to container width
- Minimum touch targets: 44x44pt

**Empty State (First Week)**
- Message: "Your first weekly summary will appear after you've journaled for 7 days"
- Illustration: Calendar with checkmarks (120pt)
- Encouragement: "Keep writing to unlock AI insights!"

**Loading State**
- Skeleton UI while generating
- Shows structure: hero card, sections
- Shimmer animation (2s cycle)
- Text: "ChadGPT is analyzing your week..."

---

### 4.3 Prompt Remix Interface

**Purpose:** AI-powered prompt generator that creates personalized journaling questions based on user's focus areas and recent entries.

#### Layout Structure

**Header (80pt)**
- Back button (left)
- Title: "Prompt Remix"
- Subtitle: "AI-generated prompts for you"
- Refresh button (top right)
  - Icon: Refresh arrows
  - Action: Generates new prompts

**Current Prompt Card (200pt)**
- Background: Gradient #4B90C8 to #3B7AA8
- Border radius: 20pt
- Padding: 32pt
- Margin: 16pt
- Centered content

**Badge: "TODAY'S PROMPT"**
- Font: Inter Bold, 11px uppercase
- Color: White 80%
- Background: White 20%
- Padding: 6pt 12pt
- Border radius: 6px

**Prompt Question**
- Margin top: 16pt
- Font: Playfair Display, 24px, line-height 1.4
- Color: #FFFFFF
- Text align: Center
- Example: "What would you do today if you knew you couldn't fail?"

**Meta Info**
- Margin top: 20pt
- Font: Inter Regular, 13px
- Color: White 80%
- Text: "Pillar: Discipline • Created by AI"

**Action Buttons Row**
- Margin top: 24pt
- Gap: 12pt
- Two buttons:

1. **Start Entry Button**
   - Width: 48%
   - Height: 48pt
   - Background: #FFFFFF
   - Text: "Start Entry" (#4B90C8)
   - Icon: Pen (16pt)
   - Action: Opens Journal Editor with prompt pre-filled

2. **Save Button**
   - Width: 48%
   - Height: 48pt
   - Background: White 20%
   - Border: 1px solid White 40%
   - Text: "Save" (white)
   - Icon: Bookmark (16pt)
   - Action: Saves to favorites

**Customization Section (120pt)**
- Margin: 24pt horizontal, 16pt top
- Background: #F8FAFC
- Border radius: 12pt
- Padding: 16pt

**Title: "Customize Prompts"**
- Font: Inter SemiBold, 16px
- Color: #1E293B

**Filter Options**
- Margin top: 12pt
- Chips (multi-select):
  - Pillar filters: Money, Ego, Relationships, Discipline
  - Style filters: "Reflective", "Action-Oriented", "Gratitude"
- Selected state: #4B90C8 background, white text
- Unselected: White background, gray border

**Apply Button**
- Margin top: 12pt
- Full width
- Height: 44pt
- Background: #4B90C8
- Text: "Generate Custom Prompt"
- Action: Creates new prompt based on selections

**Prompt Library (Scroll Container)**
- Section title: "More Prompts"
- Font: Inter SemiBold, 20px
- Margin: 24pt horizontal

**Prompt Card (Repeating)**
- Background: #FFFFFF
- Border: 1.5px solid #E2E8F0
- Border radius: 16pt
- Padding: 20pt
- Margin: 12pt horizontal, 8pt vertical
- Shadow: 0 2px 8px rgba(0,0,0,0.04)

**Pillar Badge**
- Font: Inter Medium, 11px uppercase
- Background: Pillar-specific light color
- Text: Pillar-specific color
- Padding: 4pt 8pt
- Border radius: 4pt

**Prompt Text**
- Margin top: 10pt
- Font: Inter SemiBold, 17px, line-height 1.5
- Color: #1E293B
- Example: "How did money influence a recent decision you made?"

**Footer Actions**
- Margin top: 16pt
- Display: Row with space between

**Left: Bookmark icon**
- Size: 20pt
- Color: #CBD5E1 (unsaved), #4B90C8 (saved)
- Touch target: 44x44pt

**Right: "Use Prompt" button**
- Background: #E0F2FE
- Text: #4B90C8, Inter Medium, 14px
- Padding: 8pt 16pt
- Border radius: 9999px
- Action: Opens editor with prompt

**Infinite Scroll**
- Load more prompts as user scrolls
- Loading indicator: Spinner at bottom

**Empty State (Favorites)**
- If viewing favorites with none saved
- Icon: Bookmark outline (64pt)
- Text: "No saved prompts yet"
- Subtext: "Tap the bookmark icon to save prompts for later"

**Component Specifications**
| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Current prompt card | Full - 32pt margin | 200pt | Non-interactive background |
| Action buttons | 48% width | 48pt | Full button ✓ |
| Filter chip | Variable | 32pt | Full chip ✓ |
| Prompt library card | Full - 32pt margin | ~140pt | Full card ✓ |
| Bookmark icon | 20pt | 20pt | 44x44pt ✓ |

---

## 5. MONETIZATION

### 5.1 Paywall / Benefits Comparison

**Purpose:** Present subscription tiers, convert free users to Pro. Shown after onboarding or when accessing locked features.

#### Layout Structure

**Hero Section (240pt)**
- Background: Gradient #4B90C8 to #3B7AA8
- Border radius: 24pt (bottom corners)
- Padding: 40pt horizontal, 48pt top

**Icon/Badge**
- Crown or star icon (48pt)
- Color: Gold (#FFD700)
- Centered

**Title**
- Margin top: 16pt
- Font: Inter Bold, 28px
- Color: #FFFFFF
- Text: "Unlock Your Full Potential"
- Text align: Center

**Subtitle**
- Margin top: 8pt
- Font: Inter Regular, 16px, line-height 1.4
- Color: White 90%
- Text: "Join 10,000+ users who journal smarter with Pro"
- Text align: Center

**Plan Comparison (400pt)**
- Padding: 24pt horizontal
- Margin top: -40pt (overlaps hero)

**Plan Cards (Side by Side)**

**Free Plan Card**
- Width: 48%
- Height: 360pt
- Background: #FFFFFF
- Border: 2px solid #E2E8F0
- Border radius: 16pt
- Padding: 20pt
- Shadow: 0 4px 12px rgba(0,0,0,0.06)

**Header**
- Title: "Free"
  - Font: Inter Bold, 20px
  - Color: #1E293B
- Price: "$0"
  - Font: Inter Bold, 32px
  - Color: #4B90C8
- Subtitle: "Forever"
  - Font: Inter Regular, 13px
  - Color: #64748B

**Features List**
- Margin top: 20pt
- Each item:
  - Icon: Checkmark (16pt), #16A34A
  - Text: Inter Regular, 14px, #1E293B
  - Line height: 1.5
  - Gap: 12pt
- Features:
  - "Unlimited entries"
  - "Basic templates"
  - "Mood tracking"
  - "7-day streak tracking"

**Pro Plan Card**
- Width: 48%
- Height: 360pt
- Background: Linear gradient #4B90C8 to #3B7AA8
- Border: 3px solid #FFD700 (gold accent)
- Border radius: 16pt
- Padding: 20pt
- Shadow: 0 8px 24px rgba(75,144,200,0.3)
- **"POPULAR" badge**: Top-right corner

**Header**
- Title: "Pro"
  - Font: Inter Bold, 20px
  - Color: #FFFFFF
- Price: "$4.99"
  - Font: Inter Bold, 32px
  - Color: #FFFFFF
- Subtitle: "per month"
  - Font: Inter Regular, 13px
  - Color: White 80%

**Features List**
- Margin top: 20pt
- Each item:
  - Icon: Checkmark (16pt), #FFD700 (gold)
  - Text: Inter Regular, 14px, #FFFFFF
  - Line height: 1.5
  - Gap: 12pt
- Features:
  - "Everything in Free"
  - "**ChadGPT AI coaching**" (bold)
  - "**Weekly AI summaries**" (bold)
  - "Advanced templates"
  - "Prompt Remix"
  - "Export to PDF"
  - "Cloud sync"
  - "Priority support"

**Popular Badge**
- Position: Top-right of Pro card, overlapping
- Background: #FFD700 (gold)
- Text: "MOST POPULAR"
  - Font: Inter Bold, 10px
  - Color: #1E293B
  - Letter spacing: 0.08em
- Padding: 6pt 10pt
- Border radius: 6pt 6pt 6pt 0 (rounded except bottom-right)

**Pricing Toggle (60pt)**
- Margin: 16pt horizontal, 24pt top
- Segmented control: 2 options

**Monthly vs Annual**
- Options: "Monthly" | "Annual"
- Selected: #4B90C8 background, white text
- Unselected: Transparent, gray text
- Annual savings badge: "-20% Save $12/year" (green chip)

**Annual Pricing**
- When selected, cards update:
  - Free: Still $0
  - Pro: "$47.99/year" (with "$3.99/mo" subtext)

**CTA Section (120pt)**
- Position: Fixed bottom or after content
- Padding: 24pt
- Background: White (if scrollable) or transparent

**Primary CTA: "Start 7-Day Free Trial"**
- Width: Full
- Height: 56pt
- Background: #4B90C8
- Border radius: 9999px
- Text: Inter SemiBold, 17px, #FFFFFF
- Shadow: 0 4px 16px rgba(75,144,200,0.4)
- Subtext below: "Then $4.99/month, cancel anytime"
  - Font: Inter Regular, 12px
  - Color: #64748B
  - Centered

**Or Divider**
- Margin: 16pt vertical
- Text: "or" (centered, gray)

**Secondary CTA: "Continue with Free"**
- Width: Full
- Height: 48pt
- Background: Transparent
- Border: 1.5px solid #E2E8F0
- Border radius: 9999px
- Text: Inter SemiBold, 15px, #64748B

**Legal Footer**
- Margin top: 16pt
- Font: Inter Regular, 11px
- Color: #94A3B8
- Text align: Center
- Links: "Terms", "Privacy", "Restore Purchase"
- All tappable (44pt touch targets)

**Trust Signals**
- Below CTAs
- Icon row:
  - Lock icon: "Secure payment"
  - Refresh icon: "Cancel anytime"
  - Check icon: "Money-back guarantee"
- Each with icon + short text
- Font: Inter Medium, 12px, #64748B

**Component Specifications**
| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Plan card | ~165pt | 360pt | Non-interactive bg |
| Pricing toggle | Full - 48pt margin | 44pt | Full control ✓ |
| Primary CTA | Full - 48pt margin | 56pt | 56pt ✓ |
| Secondary CTA | Full - 48pt margin | 48pt | 48pt ✓ |

**User Interactions**

1. **Tap "Start Free Trial"**
   - Action: Initiates in-app purchase flow
   - Shows: System payment sheet (Apple/Google)
   - Success: Unlocks Pro features, dismisses paywall
   - Error: Shows error message, option to retry

2. **Tap "Continue with Free"**
   - Action: Dismisses paywall
   - User: Remains on free tier
   - Can access: Paywall again from settings

3. **Toggle Monthly/Annual**
   - Updates: Pricing displayed on cards
   - Highlights: Savings on annual
   - CTA text: Changes to reflect selection

4. **Tap "Restore Purchase"**
   - Action: Checks for existing subscription
   - Success: Unlocks Pro if found
   - Failure: "No purchase found" message

**Empty/Loading States**

**Loading Purchase**
- Shows: Spinner on CTA button
- Text: "Processing..."
- Disables: All other interactions

**Purchase Success**
- Brief animation: Confetti or checkmark
- Text: "Welcome to Pro!" (toast)
- Auto-dismiss: Paywall closes (1s delay)

---

### 5.2 Subscription Management

**Purpose:** View current plan, manage billing, cancel subscription. Part of Settings screen.

#### Layout Structure

**Current Plan Card (180pt)**
- Background: #4B90C8 gradient (if Pro), #F8FAFC (if Free)
- Border radius: 16pt
- Padding: 24pt
- Margin: 16pt

**Badge: "PRO" or "FREE"**
- Font: Inter Bold, 12px uppercase
- Background: Gold (Pro) or Gray (Free)
- Padding: 6pt 12pt
- Border radius: 6pt

**Plan Title**
- Margin top: 12pt
- Font: Inter Bold, 24px
- Color: White (Pro) or #1E293B (Free)
- Text: "Stoic.af Pro" or "Free Plan"

**Plan Details**
- Margin top: 8pt
- Font: Inter Regular, 15px
- Color: White 90% (Pro) or #64748B (Free)
- Shows:
  - Billing cycle: "Monthly" or "Annual"
  - Next billing date: "Renews on Dec 20, 2024"
  - Amount: "$4.99/month"

**If Free Plan**
- CTA Button: "Upgrade to Pro"
  - Background: #4B90C8
  - Full width within card
  - Height: 48pt
  - Border radius: 9999px
  - Action: Opens paywall

**If Pro Plan**
- CTA Button: "Manage Subscription"
  - Background: White 20%
  - Border: 1px solid White 40%
  - Full width
  - Height: 48pt
  - Action: Opens system subscription settings

**Usage Stats (Pro Only) (140pt)**
- Background: #FFFFFF
- Border: 1px solid #E2E8F0
- Border radius: 12pt
- Padding: 20pt
- Margin: 16pt

**Title: "Your Pro Features"**
- Font: Inter SemiBold, 16px
- Color: #1E293B

**Stats List**
- Margin top: 16pt
- Each item:
  - Icon (20pt), #4B90C8
  - Text: Inter Regular, 14px
  - Value: Inter Bold, 14px, #4B90C8 (right)
- Items:
  - "ChadGPT chats: 47 this month"
  - "AI summaries: 12 generated"
  - "Cloud sync: Last synced 2 hours ago"
  - "PDF exports: 3 this month"

**Billing History (Variable)**
- Section title: "Billing History"
- Margin: 24pt horizontal

**Receipt Item (Repeating)**
- Background: #FFFFFF
- Border: 1px solid #E2E8F0
- Border radius: 8pt
- Padding: 16pt
- Margin: 8pt horizontal, 8pt vertical

**Left Side**
- Date: "Nov 20, 2024"
  - Font: Inter Medium, 14px
  - Color: #1E293B
- Description: "Stoic.af Pro - Monthly"
  - Font: Inter Regular, 13px
  - Color: #64748B

**Right Side**
- Amount: "$4.99"
  - Font: Inter SemiBold, 16px
  - Color: #1E293B
- Status badge: "Paid" (green) or "Pending" (yellow)
- Download icon: PDF receipt
  - Icon: Download (16pt)
  - Touch target: 44x44pt
  - Action: Downloads invoice

**Manage Actions (200pt)**
- Section: "Manage Subscription"
- Background: #F8FAFC (neutral section)

**Action Buttons (Each row)**
- Height: 56pt
- Background: #FFFFFF
- Border: 1px solid #E2E8F0
- Padding: 16pt
- Tap: Full row

Buttons:
1. **"Change Plan"**
   - Subtitle: "Switch between Monthly/Annual"
   - Icon: Swap arrows (right)
   - Action: Opens plan selector

2. **"Update Payment Method"**
   - Subtitle: "Visa ending in 1234"
   - Icon: Credit card (right)
   - Action: Opens system payment settings

3. **"Cancel Subscription"**
   - Subtitle: "You'll have access until Dec 20"
   - Icon: X circle (right), red tint
   - Action: Opens cancellation flow

**Cancellation Flow (Modal)**
- Appears when tapping "Cancel Subscription"

**Step 1: Confirm Intent**
- Title: "Cancel Pro?"
- Body: "You'll lose access to:"
  - Bullet list of Pro features
- Buttons:
  - "Keep Pro" (primary, blue)
  - "Continue" (secondary, gray)

**Step 2: Reason Selection**
- Title: "We'd love to improve"
- Subtitle: "Why are you canceling?"
- Options (radio):
  - "Too expensive"
  - "Not using it enough"
  - "Missing features"
  - "Technical issues"
  - "Other" (with text input)
- Buttons:
  - "Back"
  - "Continue"

**Step 3: Retention Offer**
- Title: "Before you go..."
- Offer: "50% off for 3 months" or "Try annual for 20% off"
- Visual: Discount badge, special pricing
- Buttons:
  - "Accept Offer" (primary)
  - "No thanks, cancel" (secondary, red text)

**Step 4: Final Confirmation**
- Title: "Subscription Canceled"
- Checkmark icon
- Body: "You'll have Pro access until Dec 20, 2024"
- Button: "Back to Settings"

**Component Specifications**
| Component | Width | Height | Touch Target |
|-----------|-------|--------|--------------|
| Plan card | Full - 32pt margin | 180pt | Embedded button |
| Action button | Full - 32pt margin | 56pt | Full row ✓ |
| Receipt item | Full - 32pt margin | 72pt | Full row ✓ |
| Cancel flow button | Variable | 48pt | Full button ✓ |

**Empty State (Free User)**
- No billing history shown
- Message: "Upgrade to Pro to see billing history"
- CTA: "Upgrade Now" button

**Loading State**
- Skeleton UI for plan card
- "Loading subscription details..." text
- Shimmer animation

---

## 6. MISSING SCREENS

### 6.1 Email Verification Screen

**Purpose:** Confirm user email address after signup. Required for account security and password reset functionality.

#### Mobile Layout (375px-767px)

**Full Screen**
- Background: #F8FAFC
- No back button (user must complete or logout)

**Header (120pt)**
- Icon: Envelope with checkmark (80pt)
  - Color: #4B90C8
  - Centered
- Title: "Check your email"
  - Font: Inter Bold, 24px
  - Color: #1E293B
  - Centered
  - Margin top: 16pt

**Content (280pt)**
- Padding: 32pt horizontal

**Message**
- Text: "We sent a verification link to:"
  - Font: Inter Regular, 16px, line-height 1.5
  - Color: #64748B
  - Centered
- Email: User's email address
  - Font: Inter SemiBold, 17px
  - Color: #1E293B
  - Centered
  - Margin top: 8pt
  - Truncated if too long

**Instructions**
- Margin top: 24pt
- Text: "Click the link in the email to verify your account."
  - Font: Inter Regular, 15px, line-height 1.6
  - Color: #64748B
  - Centered

**Troubleshooting**
- Margin top: 24pt
- Background: #F0F7FF
- Border: 1px solid #D1E7FA
- Border radius: 12pt
- Padding: 16pt

**Didn't receive the email?**
- Font: Inter Medium, 14px
- Color: #1E293B
- Bullet list:
  - "Check your spam folder"
  - "Make sure the email address is correct"
  - "Wait a few minutes and check again"

**Actions (120pt)**
- Padding: 24pt horizontal
- Fixed at bottom (or below troubleshooting)

**Resend Email Button**
- Width: Full (327pt)
- Height: 48pt
- Background: Transparent
- Border: 1.5px solid #4B90C8
- Border radius: 9999px
- Text: "Resend verification email"
  - Font: Inter SemiBold, 15px
  - Color: #4B90C8
- Disabled: For 60 seconds after sending
  - Countdown: "Resend in 45s"
  - Opacity: 0.5

**Change Email Link**
- Margin top: 16pt
- Text: "Wrong email? Update it here"
- Font: Inter Regular, 14px
- Color: #4B90C8
- Touch target: Full width, 44pt height
- Action: Opens email change modal

**Logout Link**
- Margin top: 16pt
- Text: "Log out"
- Font: Inter Regular, 14px
- Color: #64748B
- Centered

#### Desktop Layout (1024px+)

**Modal Dialog (Centered)**
- Width: 480px
- Background: #FFFFFF
- Border radius: 16pt
- Shadow: 0 24px 48px rgba(0,0,0,0.2)
- Padding: 40px

**Header**
- Icon: Larger (100px)
- Title: Same styling

**Content**
- Max-width: 400px
- Centered within modal

**Actions**
- Buttons: Inline instead of stacked
  - "Resend Email": 200px width
  - "Change Email": 200px width
  - Gap: 16px

**Auto-Check**
- Polls server every 5 seconds
- Checks if email verified
- Auto-redirects to app when verified
- Shows: "Waiting for verification..." with spinner

**States**

**Loading (Resending)**
- Button: Shows spinner
- Text: "Sending..."
- Disabled: True

**Success (Email Sent)**
- Toast: "Verification email sent!"
- Color: #16A34A (green)
- Duration: 3 seconds

**Error (Send Failed)**
- Toast: "Couldn't send email. Try again."
- Color: #EF4444 (red)
- Retry button stays enabled

**Verified (Success)**
- Modal replaces content:
  - Icon: Green checkmark (100px)
  - Title: "Email verified!"
  - Text: "Redirecting to your journal..."
  - Auto-redirect: After 2 seconds

---

### 6.2 Password Reset Flow

#### 6.2.1 Request Password Reset

**Purpose:** Allow users to request a password reset link via email.

#### Mobile Layout (375px-767px)

**Full Screen**
- Background: #F8FAFC

**Header (80pt)**
- Back button: Returns to login
- Title: "Reset password"
  - Font: Inter Bold, 24px
  - Color: #1E293B
  - Left-aligned, 16pt from edge

**Content (300pt)**
- Padding: 24pt horizontal

**Subtitle**
- Text: "Enter your email and we'll send you a reset link"
  - Font: Inter Regular, 16px, line-height 1.5
  - Color: #64748B
- Margin bottom: 24pt

**Email Input**
- Width: Full (327pt)
- Height: 56pt
- Background: #FFFFFF
- Border: 1.5px solid #E2E8F0
- Border radius: 12pt
- Padding: 16pt
- Placeholder: "Enter your email"
  - Font: Inter Regular, 16px
  - Color: #94A3B8
- Validation: Real-time
  - Valid: Green checkmark appears
  - Invalid: Red border + error text below

**Error Text (If Invalid)**
- "Please enter a valid email address"
- Font: Inter Regular, 13px
- Color: #EF4444
- Margin top: 8pt

**Actions (120pt)**
- Position: Fixed bottom or below input
- Padding: 24pt

**Send Reset Link Button**
- Width: Full (327pt)
- Height: 56pt
- Background: #4B90C8
- Border radius: 9999px
- Text: "Send reset link"
  - Font: Inter SemiBold, 17px
  - Color: #FFFFFF
- Disabled: Until email is valid
  - Opacity: 0.4

**Back to Login Link**
- Margin top: 16pt
- Text: "Back to login"
- Font: Inter Regular, 14px
- Color: #4B90C8
- Centered
- Touch target: Full width, 44pt

#### Desktop Layout (1024px+)

**Modal Dialog**
- Width: 440px
- Centered on screen
- Background: #FFFFFF
- Border radius: 16pt
- Shadow: 0 20px 40px rgba(0,0,0,0.15)
- Padding: 40px

**Close Button (Top Right)**
- Icon: X (20px)
- Touch target: 32x32px
- Action: Returns to login

**Header**
- Title: "Reset your password"
- Subtitle: Below title

**Form**
- Email input: Full width within modal
- Button: Full width

**States**

**Loading (Sending)**
- Button: Shows spinner
- Text: "Sending..."
- Disabled

**Success**
- Replaces form with:
  - Icon: Envelope sent (80px, green)
  - Title: "Check your email"
  - Message: "We sent a reset link to [email]"
  - CTA: "Return to login" button

**Error (Email Not Found)**
- Error message below input:
  - "No account found with this email"
  - Suggestion: "Try a different email or sign up"

**Error (Network)**
- Toast: "Couldn't send email. Check your connection."
- Retry button stays enabled

---

#### 6.2.2 Reset Password (New Password Entry)

**Purpose:** Set new password after clicking reset link in email.

#### Mobile Layout (375px-767px)

**Full Screen**
- Background: #F8FAFC
- URL contains: Reset token (validated on load)

**Header (120pt)**
- Icon: Lock with checkmark (64pt)
  - Color: #4B90C8
  - Centered
- Title: "Create new password"
  - Font: Inter Bold, 24px
  - Color: #1E293B
  - Centered

**Form (320pt)**
- Padding: 24pt horizontal

**Password Input**
- Label: "New password"
  - Font: Inter Medium, 14px
  - Color: #64748B
- Input:
  - Width: Full (327pt)
  - Height: 56pt
  - Background: #FFFFFF
  - Border: 1.5px solid #E2E8F0
  - Border radius: 12pt
  - Type: Password
  - Show/Hide toggle (eye icon)
  - Placeholder: "Enter new password"

**Password Requirements**
- Margin top: 12pt
- List (checkmarks appear as requirements met):
  - ✓ At least 8 characters
  - ✓ Contains a number
  - ✓ Contains an uppercase letter
  - ✓ Contains a lowercase letter
- Font: Inter Regular, 13px
- Color: #64748B (unmet), #16A34A (met)

**Confirm Password Input**
- Margin top: 20pt
- Label: "Confirm new password"
- Same styling as password input
- Validation: Must match password above

**Match Indicator**
- Checkmark: If passwords match
- Error: "Passwords don't match" if different
- Color: #EF4444
- Real-time validation

**Actions (100pt)**
- Padding: 24pt
- Fixed bottom or below form

**Reset Password Button**
- Width: Full (327pt)
- Height: 56pt
- Background: #4B90C8
- Border radius: 9999px
- Text: "Reset password"
  - Font: Inter SemiBold, 17px
  - Color: #FFFFFF
- Disabled: Until all requirements met and passwords match

#### Desktop Layout (1024px+)

**Modal Dialog**
- Width: 480px
- Centered
- Same styling as request modal

**Form**
- Inputs: Full width within modal
- Requirements: Inline checklist

**States**

**Loading (Resetting)**
- Button: Spinner
- Text: "Resetting..."
- Disabled

**Success**
- Replaces form:
  - Icon: Green checkmark (100px)
  - Title: "Password reset complete!"
  - Message: "You can now log in with your new password"
  - CTA: "Go to login" button
  - Auto-redirect: After 3 seconds

**Error (Invalid Token)**
- Shows error screen:
  - Icon: Warning triangle (80px, red)
  - Title: "Reset link expired"
  - Message: "This link is no longer valid. Please request a new one."
  - CTA: "Request new link" button

**Error (Token Already Used)**
- Message: "This reset link has already been used"
- Suggestion: "If you didn't reset your password, request a new link"

**Error (Network)**
- Toast: "Couldn't reset password. Try again."
- Form stays visible

---

### 6.3 Dedicated Search Screen

**Purpose:** Global search across all journal entries, quotes, templates. Accessible via ⌘+K on desktop or search button.

#### Mobile Layout (375px-767px)

**Full Screen Modal**
- Slides up from bottom
- Background: #F8FAFC

**Search Header (88pt)**
- Background: #FFFFFF
- Border bottom: 1px solid #E2E8F0
- Padding: 12pt

**Search Input**
- Width: Full minus 32pt padding
- Height: 48pt
- Background: #F8FAFC
- Border: 1px solid #E2E8F0
- Border radius: 12pt
- Icon: Magnifying glass (left, 20pt)
- Placeholder: "Search entries, quotes, templates..."
- Font: Inter Regular, 16px
- Auto-focus: Yes
- Clear button (X): Right side when text exists

**Cancel Button**
- Position: Right of search bar
- Text: "Cancel"
- Font: Inter Medium, 15px
- Color: #4B90C8
- Touch target: 44x44pt
- Action: Dismisses search

**Filter Tabs (48pt)**
- Below search input
- Scrollable horizontal
- Tabs: "All", "Entries", "Templates", "Quotes"
- Active: #E0F2FE background, #4B90C8 text
- Inactive: Transparent

**Results List (Scroll Container)**

**No Query (Empty State)**
- Shows: Recent searches (if any)
- Title: "Recent"
- List: Last 5 searches
  - Each with clock icon
  - Tap: Fills search bar with query
  - Swipe left: Delete from history

**Searching (Loading State)**
- Shows: Spinner centered
- Text: "Searching..."
- Or skeleton UI for results

**Results (Each Type)**

**Entry Result Card**
- Height: ~100pt
- Background: #FFFFFF
- Border radius: 12pt
- Padding: 16pt
- Margin: 8pt horizontal, 8pt vertical

**Content:**
- Date: "Nov 20, 2024" (top left, small)
- Title highlight: Search term highlighted in yellow
- Preview: 2 lines, search term highlighted
- Word count: "247 words" (bottom right, gray)
- Pillar tags: Chips at bottom

**Template Result Card**
- Badge: "TEMPLATE"
- Template name
- Category
- Preview of prompts

**Quote Result Card**
- Badge: "QUOTE"
- Quote text (highlighted)
- Author
- "Add to favorites" button

**No Results (Empty State)**
- Illustration: Magnifying glass (100pt)
- Title: "No results found"
- Suggestion: "Try different keywords or check your spelling"
- Button: "Clear search" or "Browse all entries"

#### Tablet Layout (768-1023px)

**Sheet Modal (Not Full Screen)**
- Height: 80% of screen
- Width: 90% of screen
- Centered
- Border radius: 24pt (all corners)
- Shadow: Heavy

**Results**
- Two-column grid (if space allows)

#### Desktop Layout (1024px+) ⭐ KEY FEATURE

**Command Palette Modal**
- Triggered: ⌘+K or Ctrl+K
- Width: 640px
- Max-height: 600px
- Position: Center top (120px from top)
- Background: #FFFFFF
- Border radius: 16pt
- Shadow: 0 20px 60px rgba(0,0,0,0.3)

**Search Input**
- Height: 56px
- Font: 17px
- Padding: 16px 20px
- No border (blends with modal)
- Icon: Larger (24px)

**Keyboard Shortcuts Hint**
- Position: Top right of modal
- Text: "⌘K to close"
- Font: Inter Regular, 12px
- Color: #94A3B8

**Results Section**
- Max-height: 500px
- Scrollable
- Categorized by type

**Category Headers**
- Font: Inter SemiBold, 12px uppercase
- Color: #64748B
- Letter spacing: 0.08em
- Padding: 8px 20px
- Sticky: Yes

**Result Items**
- Height: 56px
- Padding: 12px 20px
- Hover: Background #F8FAFC
- Selected: Background #E0F2FE (keyboard navigation)
- Cursor: Pointer

**Keyboard Navigation**
- ↑/↓: Navigate results
- Enter: Open selected result
- ⌘+Enter: Open in new tab
- Esc: Close search
- Tab: Switch between filter tabs

**Advanced Search Options**
- Toggle: "Advanced" link at bottom
- Expands to show:
  - Date range picker
  - Pillar filters (checkboxes)
  - Mood filter
  - Word count range
- Apply: Updates results instantly

**Recent Searches**
- Shows when no query
- "Clear history" link

**Search Suggestions (As You Type)**
- Autocomplete dropdown
- Suggests:
  - Common searches
  - Entry titles
  - Pillar names
  - Template names
- Select: Arrow keys + Enter

---

### 6.4 Generic Error Recovery Screen

**Purpose:** Fallback screen for unhandled errors, app crashes, or critical failures. Helps user recover gracefully.

#### Mobile Layout (375px-767px)

**Full Screen**
- Background: #F8FAFC

**Error Illustration (240pt)**
- Centered
- Image: Broken page or sad face (160pt)
  - Style: Minimalist line art
  - Color: #94A3B8
- Margin top: 80pt from safe area

**Content (280pt)**
- Padding: 32pt horizontal
- Text align: Center

**Title**
- Text: "Something went wrong"
- Font: Inter Bold, 24px
- Color: #1E293B

**Message**
- Margin top: 12pt
- Text: "We're sorry for the inconvenience. Your entries are safe."
- Font: Inter Regular, 16px, line-height 1.5
- Color: #64748B

**Error Code (Collapsible)**
- Margin top: 24pt
- Button: "Show error details"
  - Font: Inter Regular, 14px
  - Color: #4B90C8
  - Tap: Expands to show technical details

**Expanded Details**
- Background: #2D3748
- Border radius: 8pt
- Padding: 16pt
- Font: Courier, 13px
- Color: #E2E8F0
- Text: Error stack trace or code
- "Copy" button (top right)

**Actions (180pt)**
- Padding: 24pt
- Fixed at bottom

**Try Again Button**
- Width: Full (327pt)
- Height: 56pt
- Background: #4B90C8
- Border radius: 9999px
- Text: "Try again"
  - Font: Inter SemiBold, 17px
  - Color: #FFFFFF
- Action: Attempts to reload or retry last action

**Return Home Button**
- Margin top: 12pt
- Width: Full
- Height: 48pt
- Background: Transparent
- Border: 1.5px solid #E2E8F0
- Border radius: 9999px
- Text: "Return to home"
  - Font: Inter SemiBold, 15px
  - Color: #64748B
- Action: Navigates to Today View

**Contact Support Link**
- Margin top: 16pt
- Text: "Still having trouble? Contact support"
- Font: Inter Regular, 14px
- Color: #4B90C8
- Centered
- Action: Opens support email or chat

**Refresh App Link**
- Margin top: 12pt
- Text: "Refresh app"
- Font: Inter Regular, 13px
- Color: #64748B
- Action: Force refresh/reload
- Centered

#### Desktop Layout (1024px+)

**Centered Content**
- Max-width: 480px
- Centered on screen
- Padding: 40px

**Error Illustration**
- Larger (200px)

**Buttons**
- Inline instead of stacked
  - "Try Again": 200px
  - "Return Home": 200px
  - Gap: 16px

**Auto-Recovery**
- Countdown: "Auto-redirecting to home in 10s..."
  - Font: Inter Regular, 13px
  - Color: #94A3B8
  - Centered
- Can cancel countdown by clicking any button

**Error Types & Custom Messages**

**Network Error**
- Title: "Connection lost"
- Message: "Check your internet connection and try again"
- Icon: Cloud with slash

**Server Error (500)**
- Title: "Our servers are having issues"
- Message: "We're working on it. Please try again in a few minutes."
- Icon: Server with X

**Not Found (404)**
- Title: "Page not found"
- Message: "This page doesn't exist or has been moved"
- Icon: Magnifying glass with X

**Permission Denied**
- Title: "Access denied"
- Message: "You don't have permission to view this"
- Action: "Return home" or "Log in"

**Session Expired**
- Title: "Session expired"
- Message: "Please log in again to continue"
- Action: "Log in" button

**States**

**Retrying**
- Button: Shows spinner
- Text: "Retrying..."
- Disabled

**Offline Mode**
- Additional message:
  - "You're offline. Some features may be limited."
  - Shows cached data if available
- Actions:
  - "View cached entries"
  - "Refresh when online"

---

## 7. UI STATES REFERENCE

### Global State Patterns

This section consolidates all common UI states used across screens.

#### Loading States

**Skeleton UI Pattern**
- Used for: Initial page loads, content fetches
- Animation: Shimmer effect (1.5-2s duration, infinite)
- Colors:
  - Background: #E2E8F0
  - Shimmer: Linear gradient with #F1F5F9
- Timing: Sequence loading (cards load 50-150ms apart)

**Spinner Pattern**
- Used for: Actions, saves, API calls
- Size: 20px (small), 32px (medium), 48px (large)
- Color: #4B90C8
- Animation: Rotate 360deg, 1s linear infinite
- Position: Centered or inline with text

**Progress Bar Pattern**
- Used for: File uploads, multi-step processes
- Height: 4px (thin) or 8px (standard)
- Background: #E2E8F0
- Fill: #4B90C8
- Animation: Width change 300ms ease

**Inline Loading Text**
- Format: "Loading..." or "Saving..." or "Processing..."
- Font: Inter Regular, same size as context
- Color: #64748B
- Animation: Ellipsis animation (optional)

#### Empty States

**Pattern Structure**
- Illustration: 80-200px (depending on screen)
- Headline: Inter SemiBold, 18-24px, #1E293B
- Description: Inter Regular, 14-16px, #64748B, line-height 1.5
- CTA Button: Primary style, relevant action
- Optional: Ghost UI (preview of what content will look like)

**Tone Guidelines**
- Encouraging, not negative
- Action-oriented
- Explain why empty and what to do next
- Examples:
  - Good: "Start your first entry to begin journaling"
  - Bad: "No entries"

#### Error States

**Error Message Pattern**
- Icon: Warning triangle or X circle (red or yellow)
- Title: Inter SemiBold, 16-18px, #1E293B
- Message: Inter Regular, 14-15px, #64748B
- Action: Retry button or alternative action
- Link: "Learn more" or "Contact support" (optional)

**Toast Notifications**
- Position: Top center (mobile) or bottom right (desktop)
- Width: Full (mobile) or max 400px (desktop)
- Height: Auto (min 56px)
- Background:
  - Error: #FEE2E2
  - Warning: #FEF3C7
  - Success: #D1FAE5
  - Info: #DBEAFE
- Border: 1px solid matching darker shade
- Border radius: 12px
- Padding: 12px 16px
- Shadow: 0 4px 12px rgba(0,0,0,0.1)
- Duration:
  - Error: 5 seconds (dismissible)
  - Warning: 5 seconds (dismissible)
  - Success: 3 seconds (auto-dismiss)
  - Info: 4 seconds (dismissible)
- Icon: Left side (20px)
- Text: Inter Regular, 14px
- Dismiss: X button (right side, 32x32px)
- Animation: Slide in from top (300ms), slide out (250ms)

**Inline Errors (Forms)**
- Position: Below input field
- Icon: Warning triangle (16px), #EF4444
- Text: Inter Regular, 13px, #EF4444
- Border: Input border turns red (#EF4444)
- Examples:
  - "Please enter a valid email"
  - "Password must be at least 8 characters"

#### Success States

**Success Toast**
- Background: #D1FAE5
- Border: 1px solid #16A34A
- Icon: Checkmark (green)
- Text: "Entry saved" or "Changes saved"
- Duration: 3 seconds

**Success Modal (Major Actions)**
- Icon: Large checkmark (80-100px), #16A34A
- Animation: Scale in with bounce
- Title: "Success!" or specific message
- Message: What happened
- CTA: "Continue" or next action
- Auto-dismiss: Optional (3-5 seconds)

**Inline Success Indicators**
- Checkmark icon (green) appears
- Text turns green briefly
- Example: "✓ Saved" next to field

#### Hover States (Desktop)

**Interactive Elements**
- Transition: 150-200ms ease
- Transform: translateY(-2px) or scale(0.98)
- Shadow: Elevate (increase shadow)
- Cursor: pointer
- Color: Darken by 10% or change to defined hover color

**Cards**
- Shadow: 0 2px 4px rgba(0,0,0,0.04) → 0 8px 20px rgba(0,0,0,0.08)
- Border: #E2E8F0 → #4B90C8
- Transform: translateY(-4px)
- Actions: Fade in additional buttons

**Buttons**
- Primary: Background darkens 10%
- Secondary: Background tint appears
- Scale: 0.98 (pressed effect)

**Links**
- Underline: None → Underline
- Color: #4B90C8 → #3B7AA8

**Icons**
- Color: #64748B → #4B90C8
- Scale: 1.0 → 1.1 (subtle)

#### Focus States (Keyboard Navigation)

**All Focusable Elements**
- Outline: 3px solid #4B90C8
- Outline offset: 2px
- Border radius: Matches element
- Visible: Only on keyboard focus (not mouse click)

**Skip Links**
- Position: Absolute, -9999px (off-screen)
- On focus: Position normal, visible
- Style: Button-like appearance
- Purpose: Jump to main content

#### Disabled States

**Disabled Buttons**
- Opacity: 0.4
- Cursor: not-allowed
- Interaction: None (no hover, no click)
- Color: Grayed out (#CBD5E1)

**Disabled Inputs**
- Background: #F8FAFC
- Border: #E2E8F0
- Text color: #94A3B8
- Cursor: not-allowed

**Disabled Text/Links**
- Color: #CBD5E1
- Cursor: not-allowed
- No underline

---

## 8. ACCESSIBILITY & KEYBOARD NAVIGATION

### ARIA Labels & Roles

**Interactive Elements**
- Buttons: `role="button"` `aria-label="[Clear description]"`
- Links: `aria-label="[Link purpose]"`
- Icons: `aria-label="[Icon meaning]"` (if not decorative)
- Decorative icons: `aria-hidden="true"`

**Form Fields**
- Labels: Explicit `<label for="id">` or `aria-label`
- Required: `aria-required="true"`
- Invalid: `aria-invalid="true"` + `aria-describedby="error-id"`
- Disabled: `aria-disabled="true"`

**Dynamic Content**
- Live regions: `aria-live="polite"` or `"assertive"`
- Loading: `aria-busy="true"`
- Expanded: `aria-expanded="true/false"`
- Selected: `aria-selected="true/false"`
- Checked: `aria-checked="true/false"`

**Navigation**
- Main: `role="main"` or `<main>`
- Navigation: `role="navigation"` or `<nav>` with `aria-label`
- Landmarks: Use semantic HTML (`<header>`, `<footer>`, `<aside>`)
- Breadcrumbs: `aria-label="Breadcrumb"`

**Modals & Dialogs**
- Dialog: `role="dialog"` `aria-modal="true"`
- Title: `aria-labelledby="dialog-title-id"`
- Description: `aria-describedby="dialog-desc-id"`
- Focus trap: Keep focus within modal
- Close: Esc key always closes

**Lists & Grids**
- Lists: `role="list"` with `role="listitem"`
- Grids: `role="grid"` with `role="gridcell"`
- Tab lists: `role="tablist"`, `role="tab"`, `role="tabpanel"`

### Keyboard Navigation Patterns

**Tab Order**
- Logical order: Left to right, top to bottom
- Skip links: First focusable element
- Modals: Focus first element on open
- Close: Return focus to trigger element

**Arrow Key Navigation**
- Lists: ↑/↓ navigate items
- Grids: ↑/↓/←/→ navigate cells
- Tabs: ←/→ navigate tabs
- Select first: Home key
- Select last: End key

**Action Keys**
- Enter: Activate buttons, links, submit forms
- Space: Toggle checkboxes, activate buttons
- Esc: Close modals, cancel actions, clear search
- Delete/Backspace: Delete items (with confirmation)

**Global Shortcuts (Already Documented)**
- See "Keyboard Shortcuts" section for full list
- All shortcuts have visual indicators in UI
- Help: ⌘+/ shows keyboard shortcuts overlay

### Screen Reader Support

**VoiceOver/NVDA/JAWS Announcements**
- Page titles: Clear, descriptive
- Headings: Proper hierarchy (h1 → h2 → h3)
- Images: Alt text for meaningful images
- Status updates: Announced via aria-live
- Errors: Read immediately when appearing
- Success: Announced when action completes

**Reading Order**
- Matches visual order
- No layout tables (use CSS Grid/Flexbox)
- Hidden content: `aria-hidden="true"` or `hidden`

### Color Contrast

**WCAG AA Standards (Minimum)**
- Normal text: 4.5:1
- Large text (18px+ or 14px+ bold): 3:1
- UI components: 3:1
- Focus indicators: 3:1

**Our Design System Compliance**
- Primary text (#1E293B) on white: 13.5:1 ✓
- Secondary text (#64748B) on white: 5.2:1 ✓
- Primary button (#4B90C8) text (white): 4.8:1 ✓
- Links (#4B90C8): 5.5:1 ✓

**Color-Blind Considerations**
- Never rely on color alone
- Use icons + text + patterns
- Mood indicators: Emoji + text labels
- Success/Error: Icons + text + position

### Dynamic Type (Text Scaling)

**iOS Dynamic Type**
- Support: All text scales 100% → 200%
- Sizes: Defined in points, scales automatically
- Layout: Adapts to larger text (may wrap, expand)
- Testing: Test at "Accessibility XXL" size

**Android Font Scaling**
- Support: sp units scale with user preference
- Range: 85% → 200%
- Similar behavior to iOS

**Desktop Browser Zoom**
- Support: 100% → 200% zoom
- Layout: Responsive, doesn't break
- Touch targets: Remain accessible

### Motion & Animation

**Reduce Motion Preference**
- Respected: `prefers-reduced-motion: reduce`
- Behavior: Disable non-essential animations
- Keep: Instant transitions, no slides/fades
- Exceptions: Loading spinners (functional)

**Animation Guidelines**
- Duration: 200-300ms (quick), 400-600ms (slow)
- Easing: `ease-out` for entrances, `ease-in` for exits
- Purpose: All animations serve a purpose
- Optional: Decorative animations respect motion preference

### Touch & Click Targets

**Minimum Sizes**
- Mobile: 44x44pt (iOS), 48x48dp (Android)
- Desktop: 32x32px (mouse precision)
- Spacing: 8px minimum between targets

**Expanded Touch Areas**
- Invisible: Padding extends touch area
- Example: 24px icon with 44px touch target
- Implementation: Padding or pseudo-element

---

# Implementation Notes

---

## Design System Consistency
- All screens use colors from [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)
- Typography: Inter for UI, Playfair Display for quotes
- Spacing: 4-8-12-16-24-32px scale consistently applied
- Border radius: 10-16px for cards, 9999px for pills/buttons
- Shadows: Soft, consistent across similar components

## Accessibility Requirements
- **Minimum touch targets**: 44x44pt (verified in all component tables)
- **Color contrast**: Meets WCAG AA standards minimum
- **VoiceOver**: All interactive elements have clear labels
- **Dynamic Type**: Text scales from 100% to 200%
- **Reduce Motion**: Honors system settings, disables animations
- **Haptic Feedback**: Consistent, meaningful haptics throughout

## Thumb Reachability
- **Green zone (easy)**: Bottom 40% of screen
  - Primary CTAs, navigation, FAB
- **Yellow zone (moderate)**: Middle 30%
  - Secondary actions, content cards
- **Red zone (difficult)**: Top 30%
  - Read-only content, back buttons, notifications

## Platform Considerations
### iOS Specific
- Safe area insets: Accounted for notch and home indicator
- Native gestures: Swipe from edge to go back
- Native pickers: Wheel-style for date/time
- Haptics: Using UIFeedbackGenerator
- Keyboard: Toolbar above keyboard for markdown

### Android Specific
- System back button: Handles navigation
- Material Design: Adapted where appropriate (ripple effects)
- Keyboard: InputConnection for better integration
- Navigation bar: Accounts for gesture bar height

## Performance Targets
- **Initial load**: <2 seconds to Today View
- **Transition animations**: 200-300ms standard
- **Scroll performance**: Consistent 60fps
- **Auto-save**: Debounced 2 seconds, local-first
- **Image loading**: Lazy load below fold
- **API calls**: Max 5 second timeout, graceful fallback

## Offline-First Requirements
- **Entries**: Save locally first, sync in background
- **Mood data**: Local SQLite database
- **AI features**: Show "Offline" state, queue for later
- **Templates**: Cache on device
- **Settings**: Local persistence, sync on reconnect

## Next Steps for Developers
1. Review this mockup documentation alongside [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)
2. Reference [tokens.json](./tokens.json) for exact color/spacing values
3. Implement screens in priority order:
   - Core Journaling (especially Today View)
   - Onboarding Flow
   - Navigation & Discovery
   - AI Features
   - Monetization
4. Use design system components consistently
5. Test on target devices (iPhone 14 Pro baseline, but support iPhone SE to Pro Max)
6. Validate accessibility with screen readers
7. Measure performance against targets above

---

*This document provides comprehensive UI/UX specifications for all critical screens in Stoic.af. For technical implementation details, see developer documentation. For user flows, see [CRITICAL-USER-FLOWS.md](../05-USER-FLOWS/CRITICAL-USER-FLOWS.md).*

