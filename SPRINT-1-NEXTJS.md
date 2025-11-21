# Sprint 1: Next.js Foundation & Design System

## Context

**Project**: Stoic.af Desktop Web App
**Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
**Goal**: Set up project foundation with complete design system and component showcase

## What to Build

### 1. Project Initialization

```bash
# Create Next.js project
npx create-next-app@latest stoic-web \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd stoic-web

# Install dependencies
npm install firebase @tanstack/react-query zustand lucide-react class-variance-authority clsx tailwind-merge

# Install shadcn/ui
npx shadcn-ui@latest init
```

When shadcn asks:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

### 2. Design System Setup

#### A. Configure Tailwind with Design Tokens

Edit `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Stoic brand colors
        stoic: {
          blue: '#4B90C8',
          'blue-light': '#6BA8D7',
          'blue-dark': '#3A7AAF',
        },
        // Pillar colors
        money: '#10B981',    // Green
        ego: '#8B5CF6',      // Purple
        relationships: '#F59E0B', // Amber
        discipline: '#EF4444', // Red
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        quote: ['var(--font-playfair)', 'serif'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

#### B. Set Up Fonts

Edit `src/app/layout.tsx`:

```typescript
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

#### C. Update Global Styles

Edit `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 203 58% 54%; /* Stoic blue */
    --primary-foreground: 210 40% 98%;
    /* Add other CSS variables as needed */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* Dark mode variables */
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }

  /* Stoic quote styling */
  .quote {
    @apply font-quote text-xl italic text-gray-700 dark:text-gray-300;
  }

  .quote-author {
    @apply font-quote text-sm text-gray-500 dark:text-gray-400;
  }
}
```

### 3. Install Core shadcn/ui Components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add label
npx shadcn-ui@latest add switch
```

### 4. Create Utility Functions

Create `src/lib/utils.ts` (if not already exists):

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 5. Build Component Showcase Page

Create `src/app/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun, Mail, Lock } from 'lucide-react'

export default function ComponentShowcase() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-stoic-blue">Stoic.af Component Showcase</h1>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Heading 1</h1>
            <h2 className="text-4xl font-bold">Heading 2</h2>
            <h3 className="text-3xl font-bold">Heading 3</h3>
            <h4 className="text-2xl font-bold">Heading 4</h4>
            <h5 className="text-xl font-bold">Heading 5</h5>
            <h6 className="text-lg font-bold">Heading 6</h6>
            <p className="text-lg">Body Large</p>
            <p className="text-base">Body Medium</p>
            <p className="text-sm">Body Small</p>
            <blockquote className="quote">
              "The happiness of your life depends upon the quality of your thoughts."
            </blockquote>
            <p className="quote-author">— Marcus Aurelius</p>
          </div>
        </section>

        {/* Colors */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="Primary" color="bg-stoic-blue" hex="#4B90C8" />
            <ColorSwatch name="Success" color="bg-success" hex="#10B981" />
            <ColorSwatch name="Warning" color="bg-warning" hex="#F59E0B" />
            <ColorSwatch name="Error" color="bg-error" hex="#EF4444" />
          </div>
          <h3 className="text-xl font-semibold mt-8">Pillar Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="Money" color="bg-money" hex="#10B981" />
            <ColorSwatch name="Ego" color="bg-ego" hex="#8B5CF6" />
            <ColorSwatch name="Relationships" color="bg-relationships" hex="#F59E0B" />
            <ColorSwatch name="Discipline" color="bg-discipline" hex="#EF4444" />
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Buttons</h2>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>

            <h3 className="text-xl font-semibold">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>

            <h3 className="text-xl font-semibold">With Icons</h3>
            <div className="flex flex-wrap gap-4">
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button variant="outline">
                <Lock className="mr-2 h-4 w-4" />
                Secure
              </Button>
            </div>

            <h3 className="text-xl font-semibold">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button className="cursor-wait">Loading...</Button>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Form Inputs</h2>

          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="journal">Journal Entry</Label>
              <Textarea
                id="journal"
                placeholder="Write your thoughts..."
                rows={5}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="notifications" />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Cards</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>This is a standard card component</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cards are used to group related content and actions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-stoic-blue">
              <CardHeader>
                <CardTitle>Highlighted Card</CardTitle>
                <CardDescription>With custom border color</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You can customize card styling with Tailwind classes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-stoic-blue text-white">
              <CardHeader>
                <CardTitle>Primary Card</CardTitle>
                <CardDescription className="text-white/80">With primary background</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/90">
                  Cards can have different background colors.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacing Scale */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Spacing Scale</h2>
          <div className="space-y-4">
            <SpacingDemo label="Space 1 (4px)" spacing="w-1" />
            <SpacingDemo label="Space 2 (8px)" spacing="w-2" />
            <SpacingDemo label="Space 3 (12px)" spacing="w-3" />
            <SpacingDemo label="Space 4 (16px)" spacing="w-4" />
            <SpacingDemo label="Space 6 (24px)" spacing="w-6" />
            <SpacingDemo label="Space 8 (32px)" spacing="w-8" />
          </div>
        </section>
      </main>
    </div>
  )
}

function ColorSwatch({ name, color, hex }: { name: string; color: string; hex: string }) {
  return (
    <div className="space-y-2">
      <div className={`h-24 rounded-lg ${color} border`} />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500 font-mono">{hex}</p>
      </div>
    </div>
  )
}

function SpacingDemo({ label, spacing }: { label: string; spacing: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`${spacing} h-8 bg-stoic-blue rounded`} />
      <span className="text-sm">{label}</span>
    </div>
  )
}
```

## Technical Requirements

### File Structure
```
stoic-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Component showcase
│   │   └── globals.css         # Global styles + design tokens
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── textarea.tsx
│   │       ├── label.tsx
│   │       └── switch.tsx
│   └── lib/
│       └── utils.ts            # cn() helper
├── tailwind.config.ts          # Tailwind with design tokens
├── tsconfig.json
├── package.json
└── next.config.js
```

### Design References

Refer to:
- `/02-UI-UX-DESIGN/DESIGN-SYSTEM.md` - Complete design system
- `/02-UI-UX-DESIGN/tokens-complete.json` - Design tokens
- shadcn/ui docs - https://ui.shadcn.com/docs

## Success Criteria

✅ Next.js 14 app initialized with TypeScript
✅ Tailwind CSS configured with design tokens
✅ Fonts loaded (Inter + Playfair Display)
✅ shadcn/ui components installed
✅ Component showcase page displays:
  - Typography scale
  - Color palette (primary + pillar colors)
  - Button variants and sizes
  - Form inputs (text, password, textarea, switch)
  - Card components
  - Spacing scale
✅ Light/dark theme toggle works
✅ Fully responsive (desktop → tablet → mobile)
✅ Hot reload functional
✅ TypeScript compiles with zero errors

## Out of Scope (Future Sprints)
- Firebase integration
- Authentication
- Actual app pages (onboarding, journal, etc.)
- State management setup
- API routes

## Development Notes

1. **Start with setup** - Initialize Next.js, install dependencies, configure Tailwind
2. **Configure fonts** - Set up Inter and Playfair Display in layout
3. **Install shadcn/ui** - Install and customize component library
4. **Build showcase** - Create component showcase page to visualize design system
5. **Test theming** - Verify light/dark mode toggle works
6. **TypeScript** - Ensure zero TypeScript errors

## Testing Checklist

- [ ] App runs with `npm run dev`
- [ ] Component showcase displays all sections
- [ ] Theme toggle switches between light/dark mode
- [ ] Fonts load correctly (Inter for UI, Playfair for quotes)
- [ ] Colors match design system (#4B90C8 for primary)
- [ ] Responsive on desktop, tablet, and mobile
- [ ] TypeScript compiles without errors
- [ ] No console errors in browser

---

**Ready to build!** This foundation will make subsequent sprints fast. Focus on getting the design system configured correctly. 🚀
