# Technology Dependencies

**Version:** 1.0.0
**Last Updated:** 2025-11-21
**Platforms:** Flutter (Mobile & Web) + Next.js (Desktop Web)

This document specifies all third-party dependencies, packages, and libraries for the Stoic.af app.

---

## Table of Contents

1. [Flutter Dependencies](#1-flutter-dependencies)
2. [Next.js Dependencies](#2-nextjs-dependencies)
3. [Firebase Configuration](#3-firebase-configuration)
4. [Development Tools](#4-development-tools)
5. [Version Requirements](#5-version-requirements)

---

## 1. Flutter Dependencies

### Core Dependencies

Add to `pubspec.yaml`:

```yaml
name: stoic_app
description: A stoic journaling app with AI coaching
version: 1.0.0+1

environment:
  sdk: ">=3.2.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter

  # ============================================
  # FIREBASE & BACKEND
  # ============================================

  firebase_core: ^2.24.2
  # Purpose: Initialize Firebase services
  # Why: Required foundation for all Firebase features

  firebase_auth: ^4.15.3
  # Purpose: User authentication (email, Google, Apple Sign-In)
  # Why: Built-in support for social auth, secure token management

  cloud_firestore: ^4.13.6
  # Purpose: NoSQL database for users, entries, summaries
  # Why: Real-time sync, offline persistence, scalable

  firebase_storage: ^11.5.6
  # Purpose: Store user avatars and attachments
  # Why: CDN-backed, secure file storage with rules

  firebase_functions: ^4.5.12
  # Purpose: Call Cloud Functions (AI processing, summaries)
  # Why: Secure backend logic, scales automatically

  firebase_analytics: ^10.7.4
  # Purpose: Track user events, screen views, conversions
  # Why: Privacy-focused analytics, integrates with Firebase

  firebase_remote_config: ^4.3.8
  # Purpose: Feature flags, prompt templates, A/B testing
  # Why: Update app behavior without releases

  # ============================================
  # STATE MANAGEMENT
  # ============================================

  riverpod: ^2.4.9
  flutter_riverpod: ^2.4.9
  # Purpose: State management (chosen architecture)
  # Why: Type-safe, testable, compile-time safety, less boilerplate than Bloc
  # Alternative considered: Provider (too basic), Bloc (too verbose)

  # ============================================
  # LOCAL STORAGE & OFFLINE
  # ============================================

  hive: ^2.2.3
  hive_flutter: ^1.1.0
  # Purpose: Offline-first local database
  # Why: Fast, lightweight, encrypted boxes, perfect for offline sync
  # Alternative considered: sqflite (slower), shared_preferences (too simple)

  path_provider: ^2.1.1
  # Purpose: Get device storage paths for Hive
  # Why: Cross-platform directory access

  # ============================================
  # UI COMPONENTS & EDITOR
  # ============================================

  flutter_quill: ^9.0.0
  # Purpose: Rich text editor for journal entries (Markdown)
  # Why: WYSIWYG, toolbar, format persistence, widely used
  # Alternative considered: flutter_markdown (read-only), zefyrka (abandoned)

  flutter_markdown: ^0.6.18
  # Purpose: Render Markdown in read mode
  # Why: Standard Flutter markdown renderer

  fl_chart: ^0.65.0
  # Purpose: Charts for insights dashboard (mood trends, pillar breakdown)
  # Why: Highly customizable, smooth animations, actively maintained
  # Alternative considered: syncfusion_flutter_charts (paid), charts_flutter (discontinued)

  lucide_icons: ^0.1.0
  # Purpose: Icon set (alternative to Material Icons)
  # Why: Modern, consistent, matches design system
  # Fallback: If not available, use icons_plus or flutter_svg with custom SVGs

  shimmer: ^3.0.0
  # Purpose: Skeleton loading UI
  # Why: Pre-built shimmer effect for loading states

  # ============================================
  # NETWORKING & API
  # ============================================

  dio: ^5.4.0
  # Purpose: HTTP client for API calls (if needed beyond Firebase)
  # Why: Interceptors, retry logic, better than http package

  connectivity_plus: ^5.0.2
  # Purpose: Detect online/offline status
  # Why: Trigger sync when connection restored

  # ============================================
  # IMAGE HANDLING
  # ============================================

  cached_network_image: ^3.3.0
  # Purpose: Cache avatars and images
  # Why: Automatic caching, placeholder support, memory efficient

  image_picker: ^1.0.5
  # Purpose: Pick avatar images from gallery/camera
  # Why: Official Flutter plugin, cross-platform

  # ============================================
  # AUTHENTICATION (SOCIAL)
  # ============================================

  google_sign_in: ^6.1.6
  # Purpose: Google OAuth login
  # Why: Seamless Firebase Auth integration

  sign_in_with_apple: ^5.0.0
  # Purpose: Apple Sign-In (required for iOS)
  # Why: App Store requirement, native integration

  # ============================================
  # PAYMENTS & SUBSCRIPTIONS
  # ============================================

  in_app_purchase: ^3.1.11
  # Purpose: Handle Plus subscription purchases
  # Why: Official Flutter plugin, supports iOS and Android

  purchases_flutter: ^6.9.0
  # Purpose: Alternative - RevenueCat SDK for subscriptions
  # Why: Easier subscription management, cross-platform receipts
  # Decision: Choose ONE (RevenueCat recommended for simplicity)

  # ============================================
  # UTILITIES
  # ============================================

  intl: ^0.18.1
  # Purpose: Date/time formatting, localization
  # Why: Standard Flutter i18n, timezone handling

  timeago: ^3.6.0
  # Purpose: Relative timestamps ("2 hours ago")
  # Why: User-friendly time display

  uuid: ^4.2.2
  # Purpose: Generate unique IDs for local entries
  # Why: Consistent ID format, collision-free

  shared_preferences: ^2.2.2
  # Purpose: Store simple preferences (theme, onboarding completed)
  # Why: Key-value storage for settings

  url_launcher: ^6.2.2
  # Purpose: Open links (privacy policy, terms, help)
  # Why: Cross-platform URL handling

  package_info_plus: ^5.0.1
  # Purpose: App version, build number (for support)
  # Why: Display in settings, analytics

  # ============================================
  # ENCRYPTION (FOR JOURNAL CONTENT)
  # ============================================

  encrypt: ^5.0.3
  # Purpose: AES-256 encryption for journal entries
  # Why: Client-side encryption before Firestore upload
  # Alternative: pointycastle (lower level, more complex)

  # ============================================
  # ANIMATIONS
  # ============================================

  lottie: ^2.7.0
  # Purpose: Animated illustrations (onboarding, empty states)
  # Why: Smooth, scalable animations from JSON files
  # Optional: Can use static PNGs if performance is an issue

dev_dependencies:
  flutter_test:
    sdk: flutter

  # ============================================
  # LINTING & CODE QUALITY
  # ============================================

  flutter_lints: ^3.0.1
  # Purpose: Official Flutter linting rules
  # Why: Enforce best practices, consistency

  very_good_analysis: ^5.1.0
  # Purpose: Stricter lint rules (optional, if team prefers)
  # Why: Catch more issues, opinionated standards

  # ============================================
  # TESTING
  # ============================================

  mockito: ^5.4.4
  # Purpose: Mock dependencies in unit tests
  # Why: Test components in isolation

  build_runner: ^2.4.7
  # Purpose: Code generation (Mockito, Hive, Riverpod)
  # Why: Required for @GenerateMocks, Hive adapters

  hive_generator: ^2.0.1
  # Purpose: Generate Hive type adapters
  # Why: Simplify Hive model serialization

  integration_test:
    sdk: flutter
  # Purpose: End-to-end testing
  # Why: Test full user flows (signup → entry → sync)

  golden_toolkit: ^0.15.0
  # Purpose: Visual regression testing (Golden tests)
  # Why: Catch UI changes, validate responsive layouts

  # ============================================
  # DEBUGGING
  # ============================================

  flutter_launcher_icons: ^0.13.1
  # Purpose: Generate app icons for iOS and Android
  # Why: Single config, multiple outputs

  flutter_native_splash: ^2.3.7
  # Purpose: Generate native splash screens
  # Why: Consistent launch experience
```

---

## 2. Next.js Dependencies

**For Desktop Web Version (Optional Secondary Platform)**

### Core Framework

```json
{
  "name": "stoic-web",
  "version": "1.0.0",
  "dependencies": {
    "next": "^14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.3"
  }
}
```

### Firebase

```json
"firebase": "^10.7.1"
```
Purpose: Firebase SDK for web (Auth, Firestore, Functions)

### UI & Components

```json
"@radix-ui/react-dialog": "^1.0.5",
"@radix-ui/react-dropdown-menu": "^2.0.6",
"@radix-ui/react-toast": "^1.1.5",
"@radix-ui/react-tooltip": "^1.0.7"
```
Purpose: Accessible, unstyled component primitives
Why: Build custom components matching design system

```json
"tailwindcss": "^3.4.0",
"autoprefixer": "^10.4.16",
"postcss": "^8.4.32"
```
Purpose: Utility-first CSS framework
Why: Rapid UI development, matches design tokens

```json
"lucide-react": "^0.294.0"
```
Purpose: Icon library (matches Flutter lucide_icons)
Why: Consistency across platforms

### Editor

```json
"@tiptap/react": "^2.1.13",
"@tiptap/starter-kit": "^2.1.13",
"@tiptap/extension-placeholder": "^2.1.13"
```
Purpose: Rich text editor for journal entries
Why: Modern, extensible, markdown support

### State Management

```json
"zustand": "^4.4.7"
```
Purpose: Lightweight state management
Why: Simple, React hooks-based (similar to Riverpod philosophy)

### Development

```json
"devDependencies": {
  "@types/node": "^20.10.5",
  "@types/react": "^18.2.45",
  "@types/react-dom": "^18.2.18",
  "eslint": "^8.56.0",
  "eslint-config-next": "^14.0.4",
  "prettier": "^3.1.1"
}
```

---

## 3. Firebase Configuration

### Firebase Project Setup

**Required Services:**
- ✅ Authentication (Email, Google, Apple)
- ✅ Firestore Database
- ✅ Cloud Storage
- ✅ Cloud Functions (Node.js 18)
- ✅ Analytics
- ✅ Remote Config
- ❌ Realtime Database (not needed)
- ❌ Crashlytics (use Sentry instead for better insights)

### Firebase Config Files

**Flutter:**
- `android/app/google-services.json` (from Firebase Console)
- `ios/Runner/GoogleService-Info.plist` (from Firebase Console)
- `lib/firebase_options.dart` (generated via `flutterfire configure`)

**Next.js:**
- `.env.local`:
  ```
  NEXT_PUBLIC_FIREBASE_API_KEY=
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
  NEXT_PUBLIC_FIREBASE_APP_ID=
  ```

---

## 4. Development Tools

### Required Installations

| Tool | Version | Purpose |
|------|---------|---------|
| **Flutter SDK** | 3.16+ | Build mobile and web apps |
| **Dart SDK** | 3.2+ | Included with Flutter |
| **Node.js** | 18+ | Firebase Functions, Next.js |
| **Firebase CLI** | Latest | Deploy functions, manage project |
| **Xcode** | 15+ | iOS development (macOS only) |
| **Android Studio** | Latest | Android development |
| **VS Code** | Latest | Recommended IDE |

### VS Code Extensions

```json
{
  "recommendations": [
    "Dart-Code.dart-code",
    "Dart-Code.flutter",
    "Firebase.vscode-firebase-explorer",
    "usernamehw.errorlens",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### Firebase Tools

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize project (run in repo root)
firebase init

# Select:
# - Firestore (rules and indexes)
# - Functions (JavaScript or TypeScript)
# - Storage (rules)
# - Hosting (for Next.js deployment)
```

### FlutterFire CLI

```bash
# Install
dart pub global activate flutterfire_cli

# Configure Firebase for Flutter
flutterfire configure
```

This generates `lib/firebase_options.dart` with platform-specific configs.

---

## 5. Version Requirements

### Flutter Project (`pubspec.yaml`)

```yaml
environment:
  sdk: ">=3.2.0 <4.0.0"
  flutter: ">=3.16.0"
```

**Why:**
- Dart 3.2+: Required for pattern matching, class modifiers
- Flutter 3.16+: Latest stable features, Impeller rendering (iOS)

### iOS

```
ios/Podfile:
platform :ios, '13.0'
```

**Why:** Firebase requires iOS 13+

### Android

```gradle
// android/app/build.gradle
android {
  compileSdkVersion 34
  defaultConfig {
    minSdkVersion 21  // Android 5.0+
    targetSdkVersion 34
  }
}
```

**Why:** Firebase requires Android 5.0 (API 21)+

### Node.js (Cloud Functions)

```json
// functions/package.json
"engines": {
  "node": "18"
}
```

**Why:** Firebase Functions officially supports Node 18 LTS

---

## Decision Log

### Why Riverpod over Bloc?

| Factor | Riverpod | Bloc |
|--------|----------|------|
| Boilerplate | Low | High (events, states, mappers) |
| Type safety | ✅ Compile-time | ❌ Runtime errors possible |
| Testing | Easy (ProviderContainer) | Verbose (test helpers) |
| Learning curve | Moderate | Steep |
| Community | Growing | Mature |

**Decision:** Riverpod for cleaner code and modern patterns.

---

### Why Hive over Sqflite?

| Factor | Hive | Sqflite |
|--------|------|---------|
| Performance | Faster (NoSQL) | Slower (SQL) |
| Encryption | Built-in | Manual |
| Queries | Key-value | SQL queries |
| Learning curve | Low | Moderate (SQL) |

**Decision:** Hive for speed and simplicity (our queries are simple).

---

### Why flutter_quill over flutter_markdown?

| Factor | flutter_quill | flutter_markdown |
|--------|---------------|------------------|
| Editing | ✅ WYSIWYG | ❌ Plain text only |
| Toolbar | ✅ Built-in | ❌ Need custom |
| Delta format | ✅ Quill Delta | N/A |

**Decision:** flutter_quill for rich editing experience.

---

### Why RevenueCat over in_app_purchase?

| Factor | RevenueCat | in_app_purchase |
|--------|-----------|-----------------|
| Cross-platform | ✅ Unified API | ❌ Separate iOS/Android |
| Webhooks | ✅ Built-in | ❌ Manual setup |
| Analytics | ✅ Dashboard | ❌ Need Firebase |
| Server validation | ✅ Automatic | ❌ Manual backend |

**Decision:** Use RevenueCat (`purchases_flutter`) for simpler subscription management.

**Note:** Remove `in_app_purchase` from final pubspec.yaml.

---

## Installation Instructions

### 1. Flutter Project Setup

```bash
# Clone repo
git clone <repo-url>
cd stoic-app

# Install Flutter dependencies
flutter pub get

# Generate code (Hive adapters, Mockito mocks)
flutter pub run build_runner build

# Run app (iOS simulator)
flutter run -d ios

# Run app (Android emulator)
flutter run -d android
```

---

### 2. Firebase Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (select Firestore, Functions, Storage)
firebase init

# Deploy Firestore rules and indexes
firebase deploy --only firestore

# Deploy Cloud Functions
cd functions
npm install
cd ..
firebase deploy --only functions
```

---

### 3. Environment Variables

Create `.env` file in project root (not committed to git):

```
# Firebase (if needed for additional config)
FIREBASE_PROJECT_ID=stoic-app-prod

# OpenAI (for Cloud Functions)
OPENAI_API_KEY=sk-...

# SendGrid (for email summaries)
SENDGRID_API_KEY=SG.

# RevenueCat (for subscriptions)
REVENUECAT_API_KEY_IOS=appl_...
REVENUECAT_API_KEY_ANDROID=goog_...
```

**Security:** Never commit `.env` to git. Add to `.gitignore`.

---

## Dependency Update Strategy

### Monthly Updates
```bash
# Check for outdated packages
flutter pub outdated

# Update non-breaking changes
flutter pub upgrade --minor-versions
```

### Breaking Changes
- Review changelogs before upgrading major versions
- Test thoroughly (unit, integration, golden tests)
- Update code generation: `flutter pub run build_runner build --delete-conflicting-outputs`

### Firebase SDK Updates
- Monitor [FlutterFire releases](https://github.com/firebase/flutterfire/releases)
- Breaking changes usually announced 3 months in advance

---

## Next Steps

1. **Create Flutter Project** - `flutter create stoic_app`
2. **Add Dependencies** - Copy `pubspec.yaml` dependencies
3. **Run `flutter pub get`** - Install packages
4. **Generate Code** - Run build_runner for Hive and Mockito
5. **Initialize Firebase** - Run `flutterfire configure`
6. **Test Build** - Run app on iOS and Android

**File References:**
- Design tokens: `tokens-complete.json`
- Component specs: `COMPONENT-SPECS.md`
- API contracts: `API-CONTRACTS.md`
- Screen mockups: `SCREEN-MOCKUPS.md`
