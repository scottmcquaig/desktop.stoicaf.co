# Component Library Specifications

**Version:** 1.0.0
**Last Updated:** 2025-11-21
**Platforms:** Flutter (Mobile) + Next.js (Web)

This document defines all reusable UI components for the Stoic.af app. Each component includes variants, states, props, and accessibility requirements.

---

## Table of Contents

1. [Buttons](#1-buttons)
2. [Inputs](#2-inputs)
3. [Cards](#3-cards)
4. [Modals & Dialogs](#4-modals--dialogs)
5. [Bottom Sheets](#5-bottom-sheets)
6. [Toasts & Snackbars](#6-toasts--snackbars)
7. [Loading Indicators](#7-loading-indicators)
8. [Badges & Chips](#8-badges--chips)
9. [Avatars](#9-avatars)
10. [Navigation Components](#10-navigation-components)
11. [Form Components](#11-form-components)
12. [List Items](#12-list-items)

---

## 1. Buttons

### Primary Button

**Purpose:** Primary actions (save, submit, continue)

**Variants:**
- `primary` - Primary brand color
- `secondary` - Outlined style
- `ghost` - Text-only, no background
- `danger` - Destructive actions (delete, cancel)

**Sizes:**
- `small` - Height 36px, Padding 12px 16px, Font 14px
- `medium` - Height 48px, Padding 16px 24px, Font 16px (default)
- `large` - Height 56px, Padding 20px 32px, Font 18px

**States:**
- `default` - Normal resting state
- `hover` - Background darkens 10%, elevation increases
- `pressed` - Background darkens 20%, elevation decreases
- `disabled` - Opacity 0.4, no interaction
- `loading` - Shows spinner, disabled interaction

**Props:**
```dart
// Flutter
class StoicButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final ButtonVariant variant; // primary | secondary | ghost | danger
  final ButtonSize size; // small | medium | large
  final bool isLoading;
  final bool isDisabled;
  final IconData? leadingIcon;
  final IconData? trailingIcon;
  final bool fullWidth;
}
```

```typescript
// Next.js
interface StoicButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
}
```

**Visual Specs:**

| Variant | Background | Text Color | Border |
|---------|-----------|------------|--------|
| Primary | #4B90C8 | #FFFFFF | None |
| Secondary | Transparent | #4B90C8 | 2px #4B90C8 |
| Ghost | Transparent | #4B90C8 | None |
| Danger | #EF4444 | #FFFFFF | None |

**Accessibility:**
- `role="button"` (web)
- `aria-label` for icon-only buttons
- `aria-disabled="true"` when disabled
- Semantics: label, hint (Flutter)
- Keyboard: Enter/Space triggers action
- Touch target: 44x44pt minimum

**Usage Example:**
```dart
// Save journal entry
StoicButton(
  label: 'Save Entry',
  variant: ButtonVariant.primary,
  size: ButtonSize.large,
  fullWidth: true,
  leadingIcon: Icons.save,
  onPressed: () => saveEntry(),
)
```

---

## 2. Inputs

### Text Input

**Purpose:** Single-line text entry (name, email, password)

**Types:**
- `text` - Plain text
- `email` - Email keyboard, validation
- `password` - Obscured text, show/hide toggle
- `number` - Numeric keyboard
- `phone` - Phone keyboard
- `url` - URL keyboard

**States:**
- `default` - Empty, ready for input
- `focus` - Border #4B90C8, 3px width
- `filled` - Contains text
- `error` - Red border, error message below
- `success` - Green border, success icon
- `disabled` - Grey background, no interaction

**Props:**
```dart
// Flutter
class StoicInput extends StatelessWidget {
  final String? label;
  final String? placeholder;
  final String? helperText;
  final String? errorText;
  final TextInputType type;
  final bool isPassword;
  final bool isDisabled;
  final IconData? leadingIcon;
  final IconData? trailingIcon;
  final VoidCallback? onTrailingIconPressed;
  final ValueChanged<String>? onChanged;
  final TextEditingController? controller;
  final int? maxLines; // 1 for single-line, null for multiline
  final int? maxLength;
}
```

**Visual Specs:**
- Height: 48px (single-line)
- Padding: 12px 16px
- Border radius: 10px
- Border: 1px #E2E8F0 (default), 3px #4B90C8 (focus)
- Font: Inter Regular, 16px
- Label: Inter Medium, 14px, #64748B
- Error text: Inter Regular, 12px, #EF4444

**Accessibility:**
- `role="textbox"` (web)
- `aria-label` or visible label
- `aria-describedby` for helper/error text
- `aria-invalid="true"` when error
- Semantics: label, hint, error (Flutter)

**Usage Example:**
```dart
// Email input with validation
StoicInput(
  label: 'Email Address',
  placeholder: 'you@example.com',
  type: TextInputType.emailAddress,
  leadingIcon: Icons.email,
  errorText: state.emailError,
  onChanged: (value) => validateEmail(value),
)
```

---

### Text Area

**Purpose:** Multi-line text entry (journal entries, notes)

**Props:**
- Same as `StoicInput` but:
  - `maxLines: null` for unlimited
  - `minLines: 4` for minimum height
  - Vertical resize enabled (web)

**Visual Specs:**
- Min height: 120px (mobile), 160px (desktop)
- Max height: Unlimited with scroll
- Padding: 16px
- All other specs same as Text Input

---

## 3. Cards

### Standard Card

**Purpose:** Container for grouped content

**Variants:**
- `default` - Standard elevation, white background
- `elevated` - Higher shadow, interactive
- `flat` - No shadow, border only
- `interactive` - Hover/press states, clickable

**Props:**
```dart
class StoicCard extends StatelessWidget {
  final Widget child;
  final CardVariant variant; // default | elevated | flat | interactive
  final VoidCallback? onTap;
  final EdgeInsets? padding;
  final BorderRadius? borderRadius;
  final Color? backgroundColor;
}
```

**Visual Specs:**
- Background: #FFFFFF
- Border radius: 16px
- Padding: 16px (default)
- Shadow (default): 0px 1px 3px rgba(0,0,0,0.08)
- Shadow (elevated): 0px 4px 8px rgba(0,0,0,0.12)
- Border (flat): 1px #E2E8F0

**Interactive States:**
- Hover: Shadow increases, border #4B90C8
- Pressed: Shadow decreases, scale 0.98
- Transition: 200ms ease-out

**Accessibility:**
- If clickable: `role="button"` or `role="article"`
- `aria-label` describing card content
- Semantics: button (if interactive)

---

### Entry Card

**Purpose:** Display journal entry preview

**Layout:**
```
┌─────────────────────────────────┐
│ 🟢 [Pillar Badge]    [Mood Icon]│
│                                 │
│ Entry Title (if present)        │
│ Entry preview text (2 lines)... │
│                                 │
│ Nov 21, 2025 • 3:45 PM         │
└─────────────────────────────────┘
```

**Props:**
```dart
class EntryCard extends StatelessWidget {
  final String entryId;
  final String title;
  final String preview; // First 2 lines
  final Pillar pillar;
  final MoodRating mood;
  final DateTime timestamp;
  final VoidCallback onTap;
}
```

**Visual Specs:**
- Height: Auto (min 100px)
- Padding: 16px
- Border radius: 16px
- Pillar badge: 8px circle (pillar color)
- Mood icon: 20x20px, top-right
- Title: Inter Semibold, 16px, #1E293B
- Preview: Inter Regular, 14px, #64748B, 2 lines max
- Timestamp: Inter Regular, 12px, #94A3B8

---

## 4. Modals & Dialogs

### Modal

**Purpose:** Focus user attention on specific task or information

**Variants:**
- `fullscreen` - Mobile (375px-767px)
- `sheet` - Tablet (768px-1023px), slides up from bottom
- `centered` - Desktop (1024px+), centered with backdrop

**Props:**
```dart
class StoicModal extends StatelessWidget {
  final String? title;
  final Widget child;
  final List<Widget>? actions; // Buttons for footer
  final bool isDismissible; // Can close by tapping backdrop
  final VoidCallback? onClose;
  final ModalVariant variant; // auto (based on breakpoint) | fullscreen | sheet | centered
}
```

**Visual Specs (Centered Modal - Desktop):**
- Width: 600px (default), 800px (large)
- Max-height: 80vh
- Background: #FFFFFF
- Border radius: 20px
- Padding: 24px
- Backdrop: rgba(15, 23, 42, 0.6)

**Visual Specs (Sheet Modal - Tablet):**
- Width: 100%
- Max-height: 90vh
- Border radius: 20px 20px 0 0
- Handle: 32px x 4px rounded bar at top

**Animation:**
- Backdrop: Fade in 200ms
- Modal: Slide up 300ms (mobile/tablet), Scale 0.95→1 300ms (desktop)

**Accessibility:**
- `role="dialog"` `aria-modal="true"`
- `aria-labelledby` pointing to title
- Focus trap: Tab cycles within modal
- Escape key closes (if dismissible)
- Initial focus: First focusable element

**Usage Example:**
```dart
showStoicModal(
  context: context,
  title: 'Delete Entry?',
  child: Text('This action cannot be undone.'),
  actions: [
    StoicButton(
      label: 'Cancel',
      variant: ButtonVariant.ghost,
      onPressed: () => Navigator.pop(context),
    ),
    StoicButton(
      label: 'Delete',
      variant: ButtonVariant.danger,
      onPressed: () => deleteEntry(),
    ),
  ],
)
```

---

## 5. Bottom Sheets

### Action Sheet

**Purpose:** Present list of actions (mobile-optimized)

**Props:**
```dart
class StoicBottomSheet extends StatelessWidget {
  final String? title;
  final List<BottomSheetAction> actions;
  final VoidCallback? onDismiss;
}

class BottomSheetAction {
  final String label;
  final IconData? icon;
  final VoidCallback onPressed;
  final bool isDestructive; // Red color
}
```

**Visual Specs:**
- Width: 100%
- Border radius: 20px 20px 0 0
- Padding: 16px 0
- Background: #FFFFFF
- Handle: 32px x 4px, #E2E8F0, centered, 8px from top

**Action Item:**
- Height: 56px
- Padding: 16px 20px
- Font: Inter Medium, 16px
- Icon: 24x24px, left-aligned
- Destructive: Text #EF4444

**Animation:**
- Slide up from bottom: 300ms ease-out
- Backdrop fade in: 200ms

**Accessibility:**
- `role="menu"` (web)
- Each action: `role="menuitem"`
- Focus: First action on open
- Arrow keys navigate actions

---

## 6. Toasts & Snackbars

### Toast Notification

**Purpose:** Temporary feedback messages

**Types:**
- `success` - Green, checkmark icon
- `error` - Red, X icon
- `warning` - Orange, exclamation icon
- `info` - Blue, info icon

**Props:**
```dart
class StoicToast {
  static void show({
    required BuildContext context,
    required String message,
    required ToastType type,
    int? durationMs, // Default based on type
    String? actionLabel,
    VoidCallback? onAction,
  });
}
```

**Visual Specs:**
- Width: 90% (mobile), 400px (desktop)
- Min height: 56px
- Padding: 12px 16px
- Border radius: 10px
- Position: Top center (mobile), Bottom right (desktop)
- Icon: 20x20px, left-aligned

**Colors:**
| Type | Background | Text | Icon |
|------|-----------|------|------|
| Success | #D1FAE5 | #065F46 | #10B981 |
| Error | #FEE2E2 | #991B1B | #EF4444 |
| Warning | #FEF3C7 | #92400E | #F59E0B |
| Info | #DBEAFE | #1E40AF | #3B82F6 |

**Duration:**
- Success: 3s (auto-dismiss)
- Error: 5s (dismissible)
- Warning: 5s (dismissible)
- Info: 4s (dismissible)

**Animation:**
- Slide in: 300ms ease-out
- Hold: Duration
- Slide out: 250ms ease-in

**Accessibility:**
- `role="alert"` or `role="status"`
- `aria-live="polite"` (info/success) or `"assertive"` (error/warning)
- Screen reader announces message

**Usage Example:**
```dart
StoicToast.show(
  context: context,
  message: 'Journal entry saved',
  type: ToastType.success,
);
```

---

## 7. Loading Indicators

### Spinner

**Purpose:** Indicate loading state (indeterminate)

**Sizes:**
- `small` - 16x16px
- `medium` - 24x24px (default)
- `large` - 40x40px

**Props:**
```dart
class StoicSpinner extends StatelessWidget {
  final SpinnerSize size;
  final Color? color; // Defaults to primary brand
}
```

**Visual Specs:**
- Stroke width: 2px (small/medium), 3px (large)
- Color: #4B90C8
- Animation: 1s infinite rotation

---

### Progress Bar

**Purpose:** Show determinate loading progress

**Props:**
```dart
class StoicProgressBar extends StatelessWidget {
  final double value; // 0.0 to 1.0
  final double height; // Default 4px
  final Color? color;
  final Color? backgroundColor;
}
```

**Visual Specs:**
- Height: 4px
- Border radius: Pill (9999px)
- Background: #E2E8F0
- Fill: #4B90C8
- Animation: Smooth fill transition 200ms

---

### Skeleton UI

**Purpose:** Content placeholder while loading

**Props:**
```dart
class StoicSkeleton extends StatelessWidget {
  final double width;
  final double height;
  final BorderRadius? borderRadius;
}
```

**Visual Specs:**
- Background: #E2E8F0
- Shimmer: #F1F5F9
- Animation: Shimmer slides left-to-right, 1.5s infinite
- Border radius: Matches content (default 10px)

**Usage Example:**
```dart
// Entry card skeleton
Column(
  children: [
    StoicSkeleton(width: 100, height: 20), // Title
    SizedBox(height: 8),
    StoicSkeleton(width: double.infinity, height: 14), // Line 1
    SizedBox(height: 4),
    StoicSkeleton(width: 200, height: 14), // Line 2
  ],
)
```

---

## 8. Badges & Chips

### Badge

**Purpose:** Numerical indicators (notifications, counts)

**Props:**
```dart
class StoicBadge extends StatelessWidget {
  final String count; // "1" to "99+"
  final Color? backgroundColor;
  final Color? textColor;
}
```

**Visual Specs:**
- Size: 20x20px (min), auto-width for 2+ digits
- Padding: 4px 6px
- Border radius: Pill (9999px)
- Background: #EF4444
- Text: #FFFFFF, Inter Bold, 12px
- Position: Top-right corner of parent (absolute)

---

### Chip / Tag

**Purpose:** Categorization labels (pillars, tags)

**Variants:**
- `default` - Neutral grey
- `pillar` - Pillar-specific color
- `removable` - Shows X button

**Props:**
```dart
class StoicChip extends StatelessWidget {
  final String label;
  final ChipVariant variant;
  final Color? backgroundColor;
  final Color? textColor;
  final IconData? leadingIcon;
  final bool isRemovable;
  final VoidCallback? onRemove;
}
```

**Visual Specs:**
- Height: 32px
- Padding: 8px 12px
- Border radius: Pill (9999px)
- Font: Inter Medium, 14px

**Colors (Pillar variant):**
| Pillar | Background | Text |
|--------|-----------|------|
| Money | #D1FAE5 | #065F46 |
| Ego | #EDE9FE | #5B21B6 |
| Relationships | #FCE7F3 | #9F1239 |
| Discipline | #FEF3C7 | #92400E |

**Usage Example:**
```dart
StoicChip(
  label: 'Money',
  variant: ChipVariant.pillar,
  backgroundColor: Color(0xFFD1FAE5),
  leadingIcon: Icons.attach_money,
)
```

---

## 9. Avatars

### User Avatar

**Purpose:** Display user profile image or initials

**Sizes:**
- `xs` - 24x24px
- `sm` - 32x32px
- `md` - 40x40px (default)
- `lg` - 48x48px
- `xl` - 64x64px
- `2xl` - 96x96px

**Props:**
```dart
class StoicAvatar extends StatelessWidget {
  final String? imageUrl;
  final String? initials; // Fallback if no image
  final AvatarSize size;
  final Color? backgroundColor;
  final Color? textColor;
}
```

**Visual Specs:**
- Shape: Circle (border radius: 50%)
- Border: None (or 2px white if on colored background)
- Background (no image): Generated from user ID hash
- Initials: Inter Semibold, 40% of avatar size

**Image Loading:**
- Placeholder: Skeleton shimmer
- Error fallback: Show initials
- Cache: Cache images locally

**Accessibility:**
- `alt` text: User's name
- Decorative if initials shown (name visible elsewhere)

---

## 10. Navigation Components

### Bottom Navigation Bar (Mobile)

**Purpose:** Primary navigation on mobile

**Props:**
```dart
class StoicBottomNav extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;
  final List<BottomNavItem> items;
}

class BottomNavItem {
  final IconData icon;
  final IconData activeIcon;
  final String label;
}
```

**Visual Specs:**
- Height: 56px
- Background: #FFFFFF
- Border top: 1px #E2E8F0
- Items: 3-5 items, evenly spaced
- Icon: 24x24px
- Label: Inter Medium, 12px
- Active color: #4B90C8
- Inactive color: #64748B

**Items:**
1. Home (Today View)
2. Journal (Entry List)
3. Insights (Analytics)
4. ChadGPT (AI Coach)
5. More (Settings, etc.)

---

### Sidebar Navigation (Desktop)

**Purpose:** Persistent navigation on desktop

**Props:**
```dart
class StoicSidebar extends StatelessWidget {
  final String currentRoute;
  final ValueChanged<String> onNavigate;
  final List<SidebarItem> items;
  final Widget userProfile; // Top section
}

class SidebarItem {
  final IconData icon;
  final String label;
  final String route;
  final int? badgeCount;
}
```

**Visual Specs:**
- Width: 240px
- Background: #FFFFFF
- Border right: 1px #E2E8F0

**Navigation Item:**
- Height: 48px
- Padding: 12px 20px
- Font: Inter Medium, 15px
- Active: Background #E0F2FE, left border 3px #4B90C8
- Hover: Background #F8FAFC
- Icon: 20x20px

---

### Header Bar (Desktop)

**Purpose:** Top navigation with search, notifications, profile

**Props:**
```dart
class StoicHeader extends StatelessWidget {
  final VoidCallback onSearchPressed;
  final int notificationCount;
  final VoidCallback onNotificationsPressed;
  final Widget userMenu;
}
```

**Visual Specs:**
- Height: 64px
- Background: #FFFFFF
- Border bottom: 1px #E2E8F0
- Padding: 0 24px

**Layout (left to right):**
1. Search button (⌘K indicator)
2. Spacer
3. Notifications icon + badge
4. User avatar + dropdown

---

## 11. Form Components

### Checkbox

**Props:**
```dart
class StoicCheckbox extends StatelessWidget {
  final bool value;
  final ValueChanged<bool> onChanged;
  final String? label;
  final bool isDisabled;
}
```

**Visual Specs:**
- Size: 20x20px
- Border radius: 4px
- Border: 2px #E2E8F0 (unchecked), #4B90C8 (checked)
- Background: Transparent (unchecked), #4B90C8 (checked)
- Checkmark: White, 14x14px
- Label: Inter Regular, 16px, 8px left margin

---

### Radio Button

**Props:**
```dart
class StoicRadio extends StatelessWidget {
  final bool isSelected;
  final VoidCallback onPressed;
  final String? label;
  final bool isDisabled;
}
```

**Visual Specs:**
- Size: 20x20px (outer circle)
- Border: 2px #E2E8F0 (unselected), #4B90C8 (selected)
- Inner circle: 10x10px, #4B90C8 (when selected)
- Label: Inter Regular, 16px, 8px left margin

---

### Toggle / Switch

**Props:**
```dart
class StoicSwitch extends StatelessWidget {
  final bool value;
  final ValueChanged<bool> onChanged;
  final String? label;
  final bool isDisabled;
}
```

**Visual Specs:**
- Width: 48px
- Height: 28px
- Border radius: Pill (9999px)
- Background: #E2E8F0 (off), #4B90C8 (on)
- Thumb: 24x24px circle, white, shadow sm
- Animation: Slide 200ms ease-out
- Label: Inter Regular, 16px, 12px right margin

---

## 12. List Items

### Simple List Item

**Purpose:** Generic list row with icon, text, and optional action

**Props:**
```dart
class StoicListItem extends StatelessWidget {
  final String title;
  final String? subtitle;
  final IconData? leadingIcon;
  final Widget? trailing; // Icon, badge, switch, chevron
  final VoidCallback? onTap;
}
```

**Visual Specs:**
- Height: 56px (single-line), 72px (two-line)
- Padding: 16px 20px
- Border bottom: 1px #E2E8F0 (optional)
- Leading icon: 24x24px, #64748B
- Title: Inter Medium, 16px, #1E293B
- Subtitle: Inter Regular, 14px, #64748B
- Trailing: Right-aligned

**Hover (Desktop):**
- Background: #F8FAFC
- Transition: 150ms

**Usage Example:**
```dart
StoicListItem(
  leadingIcon: Icons.notifications,
  title: 'Notifications',
  subtitle: 'Daily reminders and alerts',
  trailing: StoicSwitch(value: true, onChanged: (v) {}),
)
```

---

### Divider

**Purpose:** Visual separation between sections

**Props:**
```dart
class StoicDivider extends StatelessWidget {
  final double height; // Thickness
  final Color? color;
  final EdgeInsets? margin;
}
```

**Visual Specs:**
- Height: 1px
- Color: #E2E8F0
- Margin: 16px vertical (default)

---

## Component Usage Guidelines

### Consistency Rules

1. **Spacing:** Always use tokens (4, 8, 12, 16, 24, 32px scale)
2. **Colors:** Use semantic colors from tokens (never hardcode hex)
3. **Typography:** Use defined font sizes and weights
4. **Touch targets:** 44x44pt minimum (mobile)
5. **Animations:** Use standard durations (200ms, 300ms)

### Responsive Behavior

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Buttons | Full width | Inline | Inline |
| Modals | Fullscreen | Sheet | Centered |
| Navigation | Bottom bar | Bottom bar | Sidebar |
| Forms | Stacked | Stacked | Two-column |

### Accessibility Requirements

All components MUST include:
- ✅ Proper semantic roles
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Screen reader labels
- ✅ Color contrast compliance (WCAG AA)
- ✅ Touch target sizes

### Testing Checklist

For each component:
- [ ] All variants render correctly
- [ ] All states work (hover, focus, disabled, etc.)
- [ ] Responsive breakpoints adapt properly
- [ ] Accessibility features function
- [ ] Dark mode support (if applicable)
- [ ] Animations perform smoothly (60fps)
- [ ] Loading states don't cause layout shift

---

## Next Steps

1. **Build Component Library** - Implement these specs in Flutter and React
2. **Create Storybook** - Document all variants visually
3. **Write Unit Tests** - Test component behavior
4. **Accessibility Audit** - Verify WCAG compliance
5. **Design Review** - Validate with design team

**File References:**
- Design tokens: `tokens-complete.json`
- Screen mockups: `SCREEN-MOCKUPS.md`
- Dependencies: `DEPENDENCIES.md`
