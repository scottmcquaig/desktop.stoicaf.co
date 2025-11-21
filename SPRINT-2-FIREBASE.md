# Sprint 2: Firebase Integration & Authentication

## Context

**Project**: Stoic.af Desktop Web App
**Framework**: Next.js 14 (App Router) + TypeScript + Firebase
**Previous Sprint**: ✅ Design system and component showcase complete
**Goal**: Set up Firebase backend, implement authentication, and create onboarding flow

## What to Build

### 1. Firebase Project Setup

```bash
# Install Firebase dependencies
npm install firebase-admin
npm install -D firebase-tools

# Initialize Firebase
npx firebase login
npx firebase init

# Select services:
# [x] Firestore
# [x] Functions
# [x] Hosting
# [x] Storage
```

**Firebase Configuration Options:**
- **Firestore**: Use production mode initially
- **Functions**: TypeScript + ESLint
- **Hosting**: Configure for Next.js (out directory: `.next`)
- **Storage**: Enable for avatar uploads

### 2. Environment Configuration

Create `.env.local`:

```bash
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (for server-side operations)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key
```

### 3. Firebase Client Configuration

Create `src/lib/firebase/config.ts`:

```typescript
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Export services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
```

### 4. Authentication Context

Create `src/lib/firebase/auth-context.tsx`:

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from './config'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### 5. Protected Route Middleware

Create `src/middleware.ts`:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add authentication check here
  // Redirect to /login if not authenticated
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/journal/:path*', '/profile/:path*'],
}
```

### 6. Login Page

Create `src/app/login/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/firebase/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Stoic.af</CardTitle>
          <CardDescription>Sign in to continue your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-error">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              Continue with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a href="/signup" className="text-stoic-blue hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

### 7. Signup Page

Create `src/app/signup/page.tsx`:

Similar structure to login page, but use `signUp` method and include:
- Display name field
- Password confirmation field
- Terms of service checkbox
- Navigate to onboarding after signup

### 8. Onboarding Flow

Create `src/app/onboarding/page.tsx`:

**3-Step Onboarding:**

**Step 1: Welcome & Name**
- "Welcome to Stoic.af"
- "What should we call you?"
- Display name input
- Continue button

**Step 2: Pillar Selection**
- "Which pillar would you like to focus on first?"
- 4 pillar cards (Money, Ego, Relationships, Discipline)
- Brief description of each
- Single selection

**Step 3: Reminder Time**
- "When should we remind you to journal?"
- Time picker
- Toggle for daily reminders
- Start Journaling button → Dashboard

### 9. User Profile Creation

Create `src/lib/firebase/user-service.ts`:

```typescript
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from './config'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
  preferences: {
    dailyReminderTime?: string
    dailyReminderEnabled: boolean
    weeklyEmailEnabled: boolean
    theme: 'light' | 'dark' | 'auto'
    defaultPillar?: 'money' | 'ego' | 'relationships' | 'discipline'
  }
  subscription: {
    tier: 'free' | 'plus'
    status: 'active' | 'trialing' | 'past_due' | 'canceled'
  }
  stats: {
    totalEntries: number
    currentStreak: number
    longestStreak: number
  }
}

export async function createUserProfile(uid: string, email: string, displayName: string) {
  const userProfile: UserProfile = {
    uid,
    email,
    displayName,
    createdAt: new Date(),
    updatedAt: new Date(),
    preferences: {
      dailyReminderEnabled: true,
      weeklyEmailEnabled: true,
      theme: 'auto',
    },
    subscription: {
      tier: 'free',
      status: 'active',
    },
    stats: {
      totalEntries: 0,
      currentStreak: 0,
      longestStreak: 0,
    },
  }

  await setDoc(doc(db, 'users', uid), userProfile)
  return userProfile
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docSnap = await getDoc(doc(db, 'users', uid))
  return docSnap.exists() ? (docSnap.data() as UserProfile) : null
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>) {
  await updateDoc(doc(db, 'users', uid), {
    ...updates,
    updatedAt: new Date(),
  })
}
```

### 10. Firestore Security Rules

Create `firestore.rules`:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(uid) {
      return isAuthenticated() && request.auth.uid == uid;
    }

    // Users collection
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId);
    }

    // Journal entries
    match /users/{userId}/entries/{entryId} {
      allow read, write: if isOwner(userId);
    }

    // Weekly summaries
    match /users/{userId}/summaries/{summaryId} {
      allow read: if isOwner(userId);
      allow write: if false; // Only Cloud Functions can write
    }
  }
}
```

### 11. Update Root Layout

Update `src/app/layout.tsx`:

```typescript
import './globals.css'
import { AuthProvider } from '@/lib/firebase/auth-context'

export const metadata = {
  title: 'Stoic.af - Build Stoic Strength',
  description: 'Build habits across Money • Ego • Relationships • Discipline',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### 12. Dashboard Placeholder

Create `src/app/dashboard/page.tsx`:

```typescript
'use client'

import { useAuth } from '@/lib/firebase/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        <p className="text-lg">Welcome back, {user.email}!</p>
        <p className="text-muted-foreground mt-2">
          Your journal awaits. (Full dashboard coming in Sprint 3)
        </p>
      </div>
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
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── onboarding/page.tsx
│   │   ├── dashboard/page.tsx
│   │   └── layout.tsx (updated with AuthProvider)
│   ├── lib/
│   │   └── firebase/
│   │       ├── config.ts
│   │       ├── auth-context.tsx
│   │       └── user-service.ts
│   └── middleware.ts
├── .env.local (gitignored)
├── .env.example (template)
├── firestore.rules
├── firestore.indexes.json
└── firebase.json
```

### Dependencies to Add
```bash
# Already installed from Sprint 1
# firebase (v12.6.0) ✅

# May need to add:
npm install react-hook-form @hookform/resolvers zod
```

## Success Criteria

✅ Firebase project created and configured
✅ Environment variables set up
✅ Firebase client SDK initialized
✅ Authentication context working
✅ Login page functional (email + Google)
✅ Signup page functional
✅ Onboarding flow complete (3 steps)
✅ User profile created in Firestore on signup
✅ Protected routes redirect to login
✅ Dashboard accessible only when authenticated
✅ Sign out functionality works
✅ Firestore security rules deployed
✅ TypeScript compiles with zero errors
✅ All auth flows tested (signup → onboarding → dashboard)

## Out of Scope (Future Sprints)
- Actual journal entry creation
- AI prompt integration
- Weekly summaries
- Streak tracking
- Profile editing
- Password reset flow
- Email verification

## Development Checklist

### Setup Phase
- [ ] Create Firebase project in console
- [ ] Enable Authentication (Email/Password + Google)
- [ ] Create Firestore database
- [ ] Set up Firebase Storage
- [ ] Download service account key
- [ ] Configure environment variables

### Implementation Phase
- [ ] Create Firebase config file
- [ ] Build authentication context
- [ ] Create login page
- [ ] Create signup page
- [ ] Build onboarding flow (3 steps)
- [ ] Implement user profile creation
- [ ] Add protected route middleware
- [ ] Create dashboard placeholder
- [ ] Write Firestore security rules

### Testing Phase
- [ ] Test signup flow end-to-end
- [ ] Test login with email/password
- [ ] Test Google sign-in
- [ ] Test onboarding completion
- [ ] Verify user profile created in Firestore
- [ ] Test protected routes redirect
- [ ] Test sign out
- [ ] Verify security rules work

### Deployment Phase
- [ ] Deploy Firestore rules
- [ ] Deploy Firestore indexes
- [ ] Test on staging environment
- [ ] Commit and push to feature branch

## Testing Notes

1. **Firebase Emulator Suite** (Optional but Recommended):
```bash
npm install -D firebase-tools
npx firebase init emulators
# Select: Authentication, Firestore, Functions
npx firebase emulators:start
```

2. **Test Accounts**:
- Create at least 2 test accounts
- Test with different pillar selections
- Verify data isolation between users

3. **Edge Cases to Test**:
- Invalid email format
- Weak password
- Duplicate email signup
- Network offline during signup
- Interrupted onboarding flow

---

**Ready to build!** Sprint 2 sets up the authentication foundation. Sprint 3 will add the actual journaling features. 🚀
