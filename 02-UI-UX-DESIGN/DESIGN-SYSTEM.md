# Stoic.af Design System

A unified design system used across Flutter and Next.js through shared JSON tokens.

---

## 🎨 Colors

### Primary Palette
| Token | Hex | Usage |
|-------|------|--------|
| stoic.blue | #4B90C8 | Primary actions |
| stoic.dark | #1E293B | Dark surfaces, streak cards |
| stoic.light | #F8FAFC | App background |
| stoic.gray | #64748B | Secondary text |

### Semantic Colors
| Purpose | Light Mode | Dark Mode |
|---------|------------|-----------|
| Success | #16A34A | #22C55E |
| Warning | #F59E0B | #FBBF24 |
| Error | #EF4444 | #F87171 |
| Info | #0EA5E9 | #38BDF8 |

---

## ✍ Typography

### Font Families
- **Inter** — UI, headings, body
- **Playfair Display** — Quotes & philosophical highlights

### Sizes
- Display: 32px  
- Section titles: 24px  
- Card titles: 18px  
- Body: 15–16px  
- Overlines/meta: 12px uppercase, letter-spacing 0.08em  

### Line Height
- 1.4 for body
- 1.6 for long-form reading

---

## 📐 Spacing & Layout

### Spacing scale (px)
4 — 8 — 12 — 16 — 24 — 32

### Layout Rules
- 16px default padding  
- 24px vertical section spacing  
- Max content width (desktop): **1040px**  
- Mobile-first design hierarchy  
- Desktop: left sidebar + top header  
- Mobile: bottom nav + floating Quick Entry button  

---

## 🧩 Components

### Cards
- Radius: 10–16px  
- Border: #E2E8F0  
- Shadow: soft (0 10px 25px rgba(0,0,0,0.06))

### Buttons
**Primary:**  
- Background: stoic.blue  
- Text: white  
- Radius: pill (9999px)

**Secondary (ghost):**  
- Border: stoic.blue  
- Text: stoic.blue  
- Background: transparent  

### Inputs
- Radius: 10px  
- Border: #E2E8F0  
- Focus ring: stoic.blue  

### Navigation
**Mobile:**  
- Bottom nav + FAB  
**Desktop:**  
- Sidebar w/ icons + labels  

### Templates UI
- Template cards with overline label  
- Stoic quote block with serif font  
- Light-tinted insight cards  

### Charts
- Mood trend sparkline  
- Pillar Progress Wheel using blue variants  

---

## 🌙 Dark Mode

- Replace backgrounds: stoic.light → stoic.dark  
- Text: light grays (#E2E8F0, #F8FAFC)  
- Primary blue unchanged  

---

## 🎛 Design Tokens (Excerpt)

```json
{
  "color": {
    "brand": { "primary": "#4B90C8" },
    "bg": { "app": "#F8FAFC", "dark": "#1E293B" },
    "text": { "primary": "#1E293B", "secondary": "#64748B" }
  },
  "radius": { "sm": 6, "md": 10, "lg": 16, "pill": 9999 },
  "spacing": { "sm": 8, "md": 16, "lg": 24 },
  "typography": {
    "fontFamily": { "sans": "Inter", "serifQuote": "Playfair Display" },
    "size": { "bodyMd": 16, "headingMd": 24, "displayLg": 32 }
  }
}

---
