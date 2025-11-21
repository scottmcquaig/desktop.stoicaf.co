# Sprint 2: Firebase & Authentication - Task List

**Sprint Goal**: Implement Firebase backend with complete authentication flow
**Estimated Time**: 8-12 hours
**Branch**: Create new branch `claude/firebase-auth-<session-id>`

---

## Phase 1: Firebase Setup (1-2 hours)

### Firebase Console Setup
- [ ] Create new Firebase project at console.firebase.google.com
  - [ ] Project name: `stoic-af-desktop` (or similar)
  - [ ] Enable Google Analytics (optional)
  - [ ] Select plan (Spark/free tier for development)

- [ ] Enable Authentication
  - [ ] Go to Authentication > Sign-in method
  - [ ] Enable Email/Password provider
  - [ ] Enable Google provider
  - [ ] Add authorized domain: `localhost` (for development)

- [ ] Create Firestore Database
  - [ ] Go to Firestore Database
  - [ ] Create database in test mode (start in test mode)
  - [ ] Choose location (us-central or closest to you)
  - [ ] Database ID: `(default)`

- [ ] Enable Cloud Storage
  - [ ] Go to Storage
  - [ ] Get started
  - [ ] Start in test mode
  - [ ] Same location as Firestore

- [ ] Get Firebase Config
  - [ ] Go to Project Settings > General
  - [ ] Scroll to "Your apps"
  - [ ] Click "Web" app icon (</>)
  - [ ] Register app: `stoic-web`
  - [ ] Copy Firebase config object

### Local Environment Setup
- [ ] Create `.env.local` file (copy from template below)
- [ ] Add Firebase config values
- [ ] Add `.env.local` to `.gitignore` (already done ✅)
- [ ] Create `.env.example` for team reference

```bash
# .env.local template
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## Phase 2: Firebase Integration (2-3 hours)

### Firebase Client Configuration
- [ ] Create `src/lib/firebase/` directory
- [ ] Create `src/lib/firebase/config.ts`
  - [ ] Import Firebase SDK modules
  - [ ] Initialize Firebase app
  - [ ] Export auth, db, storage instances
  - [ ] Add singleton pattern (check if already initialized)

### Authentication Context
- [ ] Create `src/lib/firebase/auth-context.tsx`
  - [ ] Create AuthContext with createContext
  - [ ] Create AuthProvider component
  - [ ] Implement useAuth hook
  - [ ] Add Firebase auth state listener (onAuthStateChanged)
  - [ ] Implement signIn method (email/password)
  - [ ] Implement signUp method
  - [ ] Implement signInWithGoogle method
  - [ ] Implement signOut method
  - [ ] Add loading state
  - [ ] Export useAuth hook

### User Service
- [ ] Create `src/lib/firebase/user-service.ts`
  - [ ] Define UserProfile TypeScript interface
  - [ ] Implement createUserProfile function
  - [ ] Implement getUserProfile function
  - [ ] Implement updateUserProfile function
  - [ ] Add error handling

### Update Root Layout
- [ ] Update `src/app/layout.tsx`
  - [ ] Import AuthProvider
  - [ ] Wrap children with AuthProvider
  - [ ] Ensure fonts still load correctly

---

## Phase 3: Authentication Pages (3-4 hours)

### Login Page
- [ ] Create `src/app/login/page.tsx`
  - [ ] Add 'use client' directive
  - [ ] Create form state (email, password, error, loading)
  - [ ] Build login form UI
    - [ ] Email input field
    - [ ] Password input field
    - [ ] Submit button
    - [ ] Error message display
  - [ ] Add Google sign-in button
  - [ ] Implement email/password sign-in handler
  - [ ] Implement Google sign-in handler
  - [ ] Add "Sign up" link
  - [ ] Redirect to dashboard on success
  - [ ] Add loading states and disabled buttons

### Signup Page
- [ ] Create `src/app/signup/page.tsx`
  - [ ] Add 'use client' directive
  - [ ] Create form state (email, password, confirmPassword, displayName, error, loading)
  - [ ] Build signup form UI
    - [ ] Display name input
    - [ ] Email input field
    - [ ] Password input field
    - [ ] Confirm password field
    - [ ] Terms checkbox (optional)
    - [ ] Submit button
    - [ ] Error message display
  - [ ] Add password validation (min 8 chars)
  - [ ] Add password match validation
  - [ ] Implement signup handler
  - [ ] Create user profile in Firestore after signup
  - [ ] Redirect to onboarding on success
  - [ ] Add "Login" link for existing users

### Onboarding Flow
- [ ] Create `src/app/onboarding/page.tsx`
  - [ ] Add 'use client' directive
  - [ ] Create multi-step state (currentStep, formData)
  - [ ] Protect route (redirect if not authenticated)

  **Step 1: Welcome & Display Name**
  - [ ] Welcome message
  - [ ] Display name input (pre-filled from signup)
  - [ ] Continue button

  **Step 2: Pillar Selection**
  - [ ] Four pillar cards (Money, Ego, Relationships, Discipline)
  - [ ] Card descriptions from design system
  - [ ] Single selection (radio-style)
  - [ ] Highlight selected pillar
  - [ ] Continue button (disabled if no selection)

  **Step 3: Daily Reminder**
  - [ ] Time picker input
  - [ ] Toggle for enabling daily reminders
  - [ ] "Start Journaling" button
  - [ ] Save preferences to Firestore
  - [ ] Redirect to dashboard

### Dashboard Placeholder
- [ ] Create `src/app/dashboard/page.tsx`
  - [ ] Add 'use client' directive
  - [ ] Protect route with auth check
  - [ ] Show loading state
  - [ ] Redirect to login if not authenticated
  - [ ] Display user email
  - [ ] Add sign out button
  - [ ] Add placeholder content
  - [ ] Test sign out functionality

---

## Phase 4: Protected Routes (1 hour)

### Middleware
- [ ] Create `src/middleware.ts`
  - [ ] Import NextRequest, NextResponse
  - [ ] Add authentication check logic
  - [ ] Redirect unauthenticated users to /login
  - [ ] Allow authenticated users to proceed
  - [ ] Configure matcher for protected routes
  - [ ] Test with dashboard route

### Route Configuration
- [ ] Define protected route patterns:
  - [ ] `/dashboard/*`
  - [ ] `/journal/*` (for future sprints)
  - [ ] `/profile/*` (for future sprints)

---

## Phase 5: Firestore Setup (1 hour)

### Security Rules
- [ ] Create `firestore.rules` file
  - [ ] Define helper functions (isAuthenticated, isOwner)
  - [ ] Add rules for users collection
  - [ ] Add rules for entries subcollection
  - [ ] Add rules for summaries subcollection
  - [ ] Test rules in Firebase console

### Indexes
- [ ] Create `firestore.indexes.json` (if needed)
- [ ] Add composite indexes for queries

### Deployment
- [ ] Install Firebase CLI: `npm install -D firebase-tools`
- [ ] Login: `npx firebase login`
- [ ] Initialize: `npx firebase init`
  - [ ] Select Firestore
  - [ ] Select Functions (optional for Sprint 2)
  - [ ] Select Hosting (optional)
  - [ ] Use existing project
- [ ] Deploy rules: `npx firebase deploy --only firestore:rules`

---

## Phase 6: Testing (1-2 hours)

### Manual Testing Checklist

**Signup Flow:**
- [ ] Visit `/signup`
- [ ] Try invalid email → see error
- [ ] Try weak password → see error
- [ ] Try mismatched passwords → see error
- [ ] Successfully sign up
- [ ] Verify redirected to onboarding
- [ ] Check user created in Firebase Auth console
- [ ] Check user profile created in Firestore

**Onboarding Flow:**
- [ ] Complete step 1 (display name)
- [ ] Complete step 2 (pillar selection)
- [ ] Complete step 3 (reminder time)
- [ ] Verify redirected to dashboard
- [ ] Check preferences saved in Firestore

**Login Flow:**
- [ ] Sign out from dashboard
- [ ] Visit `/login`
- [ ] Try wrong password → see error
- [ ] Try wrong email → see error
- [ ] Successfully log in with email/password
- [ ] Verify redirected to dashboard

**Google Sign-In:**
- [ ] Click "Continue with Google"
- [ ] Select Google account
- [ ] If first time: redirected to onboarding
- [ ] If returning: redirected to dashboard

**Protected Routes:**
- [ ] Sign out
- [ ] Try to visit `/dashboard` → redirected to `/login`
- [ ] Sign in → can access `/dashboard`

**Sign Out:**
- [ ] Click sign out button
- [ ] Verify redirected to login
- [ ] Verify can't access dashboard without signing in

### Data Verification
- [ ] Open Firebase Console > Authentication
  - [ ] Verify test users created
  - [ ] Check user metadata
- [ ] Open Firebase Console > Firestore
  - [ ] Verify `users` collection exists
  - [ ] Check user documents have correct structure
  - [ ] Verify preferences saved correctly

### Error Handling
- [ ] Test with network offline
- [ ] Test with invalid Firebase config
- [ ] Test with duplicate email signup
- [ ] Verify all errors display user-friendly messages

---

## Phase 7: Code Quality & Documentation (30 mins)

### Code Review
- [ ] Check all TypeScript errors resolved
- [ ] Run `npm run build` → must succeed
- [ ] Check for console errors
- [ ] Verify all imports are correct
- [ ] Check for unused variables/imports

### Documentation Updates
- [ ] Update CLAUDE.md with Sprint 2 completion
- [ ] Add Firebase setup notes
- [ ] Document any issues encountered
- [ ] Update README.md if needed

---

## Phase 8: Git & Deployment (30 mins)

### Commit & Push
- [ ] Review all changes with `git status`
- [ ] Stage all files: `git add .`
- [ ] Commit with descriptive message
- [ ] Push to branch: `git push -u origin <branch-name>`

### Commit Message Template:
```
Add Firebase authentication and onboarding flow

Sprint 2 complete:
- Set up Firebase project (Auth, Firestore, Storage)
- Implemented authentication context and hooks
- Built login page (email/password + Google sign-in)
- Built signup page with validation
- Created 3-step onboarding flow (name, pillar, reminder)
- Implemented user profile creation in Firestore
- Added protected route middleware
- Built dashboard placeholder with sign-out
- Deployed Firestore security rules
- All auth flows tested end-to-end

Technical additions:
- Firebase SDK integrated
- AuthProvider context wrapper
- User service for Firestore operations
- Protected route middleware
- TypeScript types for UserProfile

Next sprint: Journal entry system
```

---

## Success Criteria (Checklist)

- [ ] ✅ Firebase project created and configured
- [ ] ✅ Firebase SDK initialized in Next.js
- [ ] ✅ Authentication works (email + Google)
- [ ] ✅ Signup creates user profile in Firestore
- [ ] ✅ Onboarding flow completes successfully
- [ ] ✅ Protected routes redirect unauthenticated users
- [ ] ✅ Dashboard accessible only when logged in
- [ ] ✅ Sign out functionality works
- [ ] ✅ Firestore security rules deployed
- [ ] ✅ TypeScript compiles with zero errors
- [ ] ✅ Build succeeds (`npm run build`)
- [ ] ✅ All manual tests pass

---

## Notes & Troubleshooting

### Common Issues

**Firebase initialization error:**
- Verify all environment variables are set
- Check `.env.local` format (no quotes needed)
- Restart dev server after adding env vars

**Authentication redirect loop:**
- Check middleware logic
- Verify auth state loading is handled
- Ensure proper route protection

**Google sign-in popup blocked:**
- Allow popups in browser
- Test in different browser
- Check authorized domains in Firebase console

**User profile not created:**
- Check Firestore security rules
- Verify user service createUserProfile called after signup
- Check Firebase console for errors

### Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Firebase commands
npx firebase login
npx firebase init
npx firebase deploy --only firestore:rules
npx firebase deploy --only firestore:indexes

# Check Firebase project
npx firebase projects:list
```

---

## Estimated Time Breakdown

- Phase 1: Firebase Setup → 1-2 hours
- Phase 2: Firebase Integration → 2-3 hours
- Phase 3: Authentication Pages → 3-4 hours
- Phase 4: Protected Routes → 1 hour
- Phase 5: Firestore Setup → 1 hour
- Phase 6: Testing → 1-2 hours
- Phase 7: Code Quality → 30 mins
- Phase 8: Git & Deployment → 30 mins

**Total: 10-14 hours**

---

**Ready to start Sprint 2! 🚀**
