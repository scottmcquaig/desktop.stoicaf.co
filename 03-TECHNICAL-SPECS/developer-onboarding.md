# Stoic.af — Developer Onboarding Guide

Welcome to the Stoic.af codebase. This guide helps new contributors get set up quickly and understand project structure, workflows, and core architecture.

---

## 🛠 Tech Stack

### Mobile (Primary)
- Flutter 3.x
- Riverpod / Bloc
- Firebase (Auth, Firestore, Storage, Functions, App Check)
- Hive for local storage
- Genkit + Gemini Flash (AI)
- Stripe In-App Purchases

### Web (Phase 2)
- Next.js 14 App Router
- React Query / Zustand
- IndexedDB
- Firebase Auth SSR

---

## 📁 Repo Structure (Proposed)

```text
/app
  /lib
    /features
    /core
    /ui
    /services
    /models
    /state
  /assets
  firebase.json
  pubspec.yaml

/web  (Phase 2)
  /src
  next.config.js

/functions
  index.ts
  /genkit

/tracks
  money-track.json
  ego-track.json
  relationships-track.json
  discipline-track.json

/prompts
  library.json

/docs
  PRD.md
  design-system.md
  developer-onboarding.md
```

---

## 🚀 Getting Started (Mobile)

### 1. Clone + Install

```bash
git clone https://github.com/YOUR_ORG/stoic-af.git
cd stoic-af/app
flutter pub get
```

### 2. Firebase Setup

You need:
- Firebase project ID  
- Google Services files  
  - `google-services.json` (Android)  
  - `GoogleService-Info.plist` (iOS)

Add them to:

```text
/android/app/
/ios/Runner/
```

### 3. Run the Project

```bash
flutter run
```

---

## 🔥 Firestore Rules (Important)

- Users may only access their own data  
- `entries` content must be encrypted client-side  
- `tracks` are read-only  
- Admin access is role-based and cannot read journals  

---

## ℹ️ Core Concepts

### Living Notebook

- Each day creates a single `entry` document  
- Templates appended throughout the day  
- Editor uses offline caching (Hive + Firestore)

### Prompt Engine

Order of selection:
1. Pillar track (Money/Ego/Relationships/Discipline)  
2. Quick audit (tag-based)  
3. Prompt library  
4. Optional AI remix  

### Weekly Summary

Cloud Functions:
- Fetch last 7 entries  
- Decrypt in memory  
- Generate summary (Gemini Flash)  
- Store in `weeklySummaries`  

### ChadGPT Coach

- Stateless sessions per chat open  
- Guardrailed system prompt  
- No PII sent to AI

---

## 🧪 Testing

### Flutter

```bash
flutter test
```

Widget + unit tests should cover:
- Prompt engine
- Entry creation logic
- Encryption/decryption
- Offline persistence

### Functions

```bash
firebase emulators:start
```

---

## 🚢 CI/CD

### GitHub Actions

- Lints + tests on PR  
- Builds release APK/IPA  
- Deploys to Firebase App Distribution  

---

## 📦 Deployment

### Mobile

- Android: Google Play  
- iOS: App Store  
- Use Flutter flavors for staging/production  

### Functions

```bash
firebase deploy --only functions
```

---

## 🛡 Security Notes

- Never log journal content  
- AI calls must strip PII  
- Ensure App Check is enabled  
- Always run Firestore rule tests before merging  

---

## 🙋 Troubleshooting

**App crashes on startup**  
→ Missing Google Services files  

**AI not working**  
→ Token bucket maxed OR Genkit credentials missing  

**No offline mode**  
→ Verify Firestore persistence + Hive init  

---

## 🎉 Welcome to the Stoic.af team!

Build with clarity. Ship with virtue.  
If in doubt, ask ChadGPT.
