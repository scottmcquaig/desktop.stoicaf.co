# API Contracts & Data Models

**Version:** 1.0.0
**Last Updated:** 2025-11-21
**Backend:** Firebase (Firestore, Auth, Functions, Storage)

This document defines all data models, API contracts, and Firebase integration patterns for Stoic.af.

---

## Table of Contents

1. [Firebase Architecture](#1-firebase-architecture)
2. [Data Models](#2-data-models)
3. [Firestore Collections](#3-firestore-collections)
4. [API Response Shapes](#4-api-response-shapes)
5. [Error Handling](#5-error-handling)
6. [Real-time Listeners](#6-real-time-listeners)
7. [Offline Sync Strategy](#7-offline-sync-strategy)
8. [Security Rules](#8-security-rules)
9. [Cloud Functions](#9-cloud-functions)

---

## 1. Firebase Architecture

### Services Used

| Service | Purpose |
|---------|---------|
| **Firebase Auth** | User authentication (email/password, Google, Apple) |
| **Firestore** | Primary database for users, entries, summaries |
| **Cloud Functions** | AI processing, weekly summaries, scheduled tasks |
| **Cloud Storage** | User avatars, attachment uploads |
| **Firebase Analytics** | Usage tracking, event logging |
| **Remote Config** | Feature flags, prompt templates |

### Data Flow

```
┌──────────────┐
│ Flutter App  │
└──────┬───────┘
       │
       ├─ Firebase Auth (Login)
       ├─ Firestore (CRUD operations)
       ├─ Cloud Functions (AI processing)
       └─ Local SQLite (Offline cache)
```

**Offline-First Pattern:**
1. User writes entry → Saved to local SQLite immediately
2. Entry queued for sync
3. When online → Sync to Firestore
4. Firestore change triggers Cloud Function (if AI needed)
5. AI response synced back to app via real-time listener

---

## 2. Data Models

### User Model

```typescript
interface User {
  uid: string;                    // Firebase Auth UID
  email: string;
  displayName: string;
  avatarUrl?: string;             // Cloud Storage URL
  createdAt: Timestamp;
  updatedAt: Timestamp;

  // Profile
  timezone: string;               // "America/New_York"
  preferences: UserPreferences;

  // Subscription
  subscription: UserSubscription;

  // Stats (denormalized for quick access)
  stats: UserStats;
}

interface UserPreferences {
  dailyReminderTime?: string;     // "20:00" (local time)
  dailyReminderEnabled: boolean;
  weeklyEmailEnabled: boolean;
  theme: "light" | "dark" | "auto";
  defaultPillar?: Pillar;
}

interface UserSubscription {
  tier: "free" | "plus";
  status: "active" | "trialing" | "past_due" | "canceled";
  periodStart?: Timestamp;
  periodEnd?: Timestamp;
  cancelAtPeriodEnd: boolean;
}

interface UserStats {
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  lastEntryDate?: Timestamp;
  entriesThisWeek: number;
  entriesThisMonth: number;
}
```

**Firestore Path:** `users/{uid}`

---

### Entry Model

```typescript
interface Entry {
  id: string;                     // Auto-generated
  userId: string;                 // Owner
  createdAt: Timestamp;
  updatedAt: Timestamp;
  date: string;                   // "2025-11-21" (for querying by day)

  // Content (encrypted at rest)
  title?: string;                 // Optional entry title
  content: string;                // Markdown text
  contentEncrypted: boolean;      // Flag for encryption

  // Metadata
  pillar: Pillar;                 // "money" | "ego" | "relationships" | "discipline"
  mood?: MoodRating;              // 1-5 scale
  tags: string[];                 // ["gratitude", "work"]

  // AI features
  promptId?: string;              // If created from prompt
  aiCoachingEnabled: boolean;     // User opted-in for AI feedback

  // Derived data (computed by Cloud Function)
  aiInsights?: AIInsights;

  // Sync
  syncStatus: "synced" | "pending" | "conflict";
  localOnly: boolean;             // Not yet synced to cloud
}

type Pillar = "money" | "ego" | "relationships" | "discipline";
type MoodRating = 1 | 2 | 3 | 4 | 5;

interface AIInsights {
  summary: string;                // 1-2 sentence summary
  sentiment: "positive" | "neutral" | "negative";
  keyThemes: string[];            // ["stress", "achievement"]
  suggestedActions: string[];     // ["Practice gratitude", "Set boundaries"]
  processedAt: Timestamp;
}
```

**Firestore Path:** `users/{uid}/entries/{entryId}`

**Encryption:**
- `content` encrypted client-side before upload (AES-256)
- Encryption key derived from user's auth token
- Cloud Functions cannot read encrypted content
- Search via local SQLite only (Firestore cannot search encrypted text)

---

### Prompt Model

```typescript
interface Prompt {
  id: string;
  title: string;
  description: string;
  pillar: Pillar | "any";
  difficulty: "beginner" | "intermediate" | "advanced";
  questions: string[];            // List of reflection questions
  tags: string[];
  isActive: boolean;              // Can be disabled via Remote Config
  usageCount: number;             // How many times used (for popularity)
}
```

**Firestore Path:** `prompts/{promptId}`

**Managed via Remote Config:**
- Prompts can be updated without app release
- New prompts pushed dynamically
- A/B test different prompt styles

---

### Weekly Summary Model

```typescript
interface WeeklySummary {
  id: string;
  userId: string;
  weekStart: Timestamp;           // Monday 00:00
  weekEnd: Timestamp;             // Sunday 23:59
  generatedAt: Timestamp;

  // Stats
  entriesCount: number;
  daysActive: number;             // 0-7
  pillarBreakdown: {
    money: number;
    ego: number;
    relationships: number;
    discipline: number;
  };
  averageMood: number;            // 1-5

  // AI-generated content
  highlights: string[];           // Key wins from the week
  insights: string;               // Narrative summary
  recommendations: string[];      // Suggested prompts for next week

  // Email delivery
  emailSent: boolean;
  emailSentAt?: Timestamp;
}
```

**Firestore Path:** `users/{uid}/weeklySummaries/{summaryId}`

**Generation:**
- Cloud Function runs every Monday at 6 AM user's local time
- Analyzes last 7 days of entries
- Sends email if user opted-in

---

### Prompt Event Model (Analytics)

```typescript
interface PromptEvent {
  id: string;
  userId: string;
  promptId: string;
  eventType: "viewed" | "started" | "completed" | "skipped";
  timestamp: Timestamp;
  entryId?: string;               // If completed, link to entry
}
```

**Firestore Path:** `promptEvents/{eventId}`

**Purpose:** Track prompt engagement for analytics dashboard

---

## 3. Firestore Collections

### Collection Structure

```
/users/{uid}
  - User document

  /entries/{entryId}
    - Entry documents (subcollection)

  /weeklySummaries/{summaryId}
    - Weekly summary documents (subcollection)

/prompts/{promptId}
  - Prompt documents (global, read-only for users)

/promptEvents/{eventId}
  - Analytics events (global, for admin dashboard)

/subscriptions/{subscriptionId}
  - Stripe subscription metadata
```

### Indexes Required

```javascript
// Query: Get user's entries by date (descending)
// Collection: users/{uid}/entries
// Fields: date (Descending), createdAt (Descending)

// Query: Get entries by pillar for analytics
// Collection: users/{uid}/entries
// Fields: pillar (Ascending), date (Descending)

// Query: Get entries with mood for trends
// Collection: users/{uid}/entries
// Fields: mood (Ascending), date (Descending)

// Query: Search prompts by pillar
// Collection: prompts
// Fields: pillar (Ascending), isActive (Ascending)
```

---

## 4. API Response Shapes

### Success Response

```typescript
interface APISuccess<T> {
  success: true;
  data: T;
  timestamp: string;              // ISO 8601
}

// Example
{
  "success": true,
  "data": {
    "id": "entry123",
    "title": "Morning reflection",
    "content": "Today was productive..."
  },
  "timestamp": "2025-11-21T14:30:00Z"
}
```

---

### Error Response

```typescript
interface APIError {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: string;
}

type ErrorCode =
  | "auth/invalid-credentials"
  | "auth/user-not-found"
  | "auth/email-already-in-use"
  | "firestore/permission-denied"
  | "firestore/not-found"
  | "firestore/unavailable"
  | "functions/timeout"
  | "functions/rate-limit-exceeded"
  | "validation/invalid-input"
  | "subscription/payment-required"
  | "subscription/invalid-tier";

// Example
{
  "success": false,
  "error": {
    "code": "auth/invalid-credentials",
    "message": "The email or password you entered is incorrect.",
    "details": {
      "attemptCount": 3
    }
  },
  "timestamp": "2025-11-21T14:30:00Z"
}
```

---

### Cloud Function Response (AI Processing)

```typescript
// Request to Cloud Function
interface ProcessEntryRequest {
  entryId: string;
  content: string;                // Plaintext (not encrypted)
  pillar: Pillar;
}

// Response from Cloud Function
interface ProcessEntryResponse {
  success: true;
  data: {
    insights: AIInsights;
    tokensUsed: number;
    processingTimeMs: number;
  };
}
```

**Endpoint:** `POST /processEntry` (Cloud Function)

**Usage:**
1. User saves entry with AI enabled
2. Client decrypts content, sends plaintext to function
3. Function calls OpenAI API
4. Function writes `aiInsights` back to Firestore
5. Client receives real-time update via listener

---

## 5. Error Handling

### Error Categories

| Category | HTTP Status | User Message |
|----------|------------|--------------|
| **Authentication** | 401 | "Please log in again" |
| **Authorization** | 403 | "You don't have permission to do that" |
| **Not Found** | 404 | "We couldn't find that entry" |
| **Validation** | 400 | "Please check your input and try again" |
| **Rate Limit** | 429 | "Too many requests. Please wait a moment" |
| **Server Error** | 500 | "Something went wrong. Please try again" |
| **Offline** | N/A | "You're offline. Changes will sync when online" |

### Retry Strategy

```typescript
interface RetryConfig {
  maxAttempts: 3;
  backoffMs: [1000, 2000, 4000]; // Exponential backoff
  retryableErrors: [
    "firestore/unavailable",
    "functions/timeout",
    "network-error"
  ];
}
```

**Non-retryable errors:**
- Authentication failures
- Validation errors
- Permission denied

---

## 6. Real-time Listeners

### Entry Listener

**Purpose:** Sync changes from other devices or AI processing

```dart
// Flutter
StreamSubscription listenToEntries() {
  return FirebaseFirestore.instance
    .collection('users/${auth.currentUser!.uid}/entries')
    .orderBy('date', descending: true)
    .limit(50)
    .snapshots()
    .listen((snapshot) {
      for (var change in snapshot.docChanges) {
        switch (change.type) {
          case DocumentChangeType.added:
            _handleEntryAdded(change.doc);
            break;
          case DocumentChangeType.modified:
            _handleEntryModified(change.doc);
            break;
          case DocumentChangeType.removed:
            _handleEntryDeleted(change.doc);
            break;
        }
      }
    });
}
```

**Use Cases:**
- Multi-device sync
- AI insights added by Cloud Function
- Weekly summary generation

---

### User Stats Listener

**Purpose:** Update UI when stats change (streak, total entries)

```dart
StreamSubscription listenToUserStats() {
  return FirebaseFirestore.instance
    .doc('users/${auth.currentUser!.uid}')
    .snapshots()
    .listen((snapshot) {
      final user = User.fromFirestore(snapshot);
      _updateUIWithStats(user.stats);
    });
}
```

---

## 7. Offline Sync Strategy

### Local Database (Hive)

**Structure:**
```dart
// Local boxes
- entries_box: Map<String, Entry>
- pending_sync_box: Queue<SyncOperation>
- user_cache_box: User
```

**Sync Operations:**
```typescript
interface SyncOperation {
  id: string;
  type: "create" | "update" | "delete";
  collection: "entries" | "user";
  documentId: string;
  data: any;
  timestamp: number;
  retryCount: number;
}
```

### Sync Flow

**1. Offline Write:**
```
User creates entry
  ↓
Save to Hive (entries_box)
  ↓
Queue sync operation (pending_sync_box)
  ↓
Show success UI (entry saved locally)
```

**2. Come Back Online:**
```
Detect connectivity
  ↓
Process pending_sync_box queue (FIFO)
  ↓
For each operation:
  - Attempt Firestore write
  - If success: Remove from queue
  - If fail: Increment retryCount, re-queue
  ↓
Update UI (show sync status)
```

**3. Conflict Resolution:**
```
Local entry timestamp: 14:30:00
Firestore entry timestamp: 14:31:00 (newer)
  ↓
Strategy: Last-write-wins (Firestore wins)
  ↓
Update local Hive with Firestore data
  ↓
Notify user: "Entry updated from another device"
```

---

## 8. Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      // Users can read/write their own document
      allow read, write: if isAuthenticated() && isOwner(userId);

      // Entries subcollection
      match /entries/{entryId} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }

      // Weekly summaries subcollection
      match /weeklySummaries/{summaryId} {
        allow read: if isAuthenticated() && isOwner(userId);
        allow write: if false; // Only Cloud Functions can write
      }
    }

    // Prompts collection (read-only for all users)
    match /prompts/{promptId} {
      allow read: if isAuthenticated();
      allow write: if false; // Only admins via console
    }

    // Prompt events (write-only for analytics)
    match /promptEvents/{eventId} {
      allow create: if isAuthenticated();
      allow read, update, delete: if false; // Only Cloud Functions
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // User avatars
    match /avatars/{userId}/{fileName} {
      // Users can upload their own avatar
      allow write: if request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024  // 5MB max
                   && request.resource.contentType.matches('image/.*');

      // Anyone can read avatars (for public profiles)
      allow read: if true;
    }
  }
}
```

---

## 9. Cloud Functions

### Function: `processEntry`

**Trigger:** HTTPS Callable
**Purpose:** Generate AI insights for journal entry

**Input:**
```typescript
{
  entryId: string;
  content: string;  // Plaintext content
  pillar: Pillar;
}
```

**Process:**
1. Validate user has Plus subscription
2. Call OpenAI API with prompt
3. Parse response into `AIInsights` structure
4. Write insights to Firestore: `users/{uid}/entries/{entryId}`
5. Return token usage

**Output:**
```typescript
{
  insights: AIInsights;
  tokensUsed: number;
}
```

**Error Handling:**
- Rate limit: 10 requests per minute per user
- Timeout: 30 seconds
- Retry: Auto-retry on transient OpenAI errors

---

### Function: `generateWeeklySummary`

**Trigger:** Scheduled (every Monday 6 AM)
**Purpose:** Create weekly summary for all active users

**Process:**
1. Query all users with `weeklyEmailEnabled: true`
2. For each user:
   - Fetch entries from last 7 days
   - Calculate stats (entriesCount, pillarBreakdown, averageMood)
   - Call OpenAI to generate narrative summary
   - Write to `users/{uid}/weeklySummaries/{summaryId}`
   - Send email via SendGrid
3. Log analytics event

**Rate Limiting:**
- Process max 100 users per invocation
- Batch subsequent users every 5 minutes

---

### Function: `updateUserStats`

**Trigger:** Firestore `onCreate` / `onUpdate` / `onDelete` on entries
**Purpose:** Keep user stats denormalized and current

**Process:**
```typescript
export const updateUserStats = functions.firestore
  .document('users/{userId}/entries/{entryId}')
  .onWrite(async (change, context) => {
    const userId = context.params.userId;

    // Fetch all user entries
    const entries = await getEntriesForUser(userId);

    // Calculate stats
    const stats = {
      totalEntries: entries.length,
      currentStreak: calculateStreak(entries),
      longestStreak: calculateLongestStreak(entries),
      lastEntryDate: entries[0]?.createdAt,
      entriesThisWeek: countEntriesThisWeek(entries),
      entriesThisMonth: countEntriesThisMonth(entries),
    };

    // Update user document
    await firestore.doc(`users/${userId}`).update({ stats });
  });
```

---

### Function: `onUserCreate`

**Trigger:** Firebase Auth `onCreate`
**Purpose:** Initialize user document in Firestore

**Process:**
1. User signs up via Firebase Auth
2. Function creates Firestore document: `users/{uid}`
3. Set default preferences, subscription (free tier), stats (all zeros)

---

## API Endpoint Summary

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/processEntry` | POST | Required | Generate AI insights |
| `/generateWeeklySummary` | Scheduled | N/A | Weekly email summaries |
| `/updateUserStats` | Firestore Trigger | N/A | Denormalize user stats |
| `/onUserCreate` | Auth Trigger | N/A | Initialize new user |

---

## Development Workflow

### 1. Local Development

**Firebase Emulators:**
```bash
firebase emulators:start --only firestore,functions,auth
```

- Firestore: `localhost:8080`
- Functions: `localhost:5001`
- Auth: `localhost:9099`

**Connect App to Emulators:**
```dart
// Flutter (main.dart)
await FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);
await FirebaseFunctions.instance.useFunctionsEmulator('localhost', 5001);
await FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
```

---

### 2. Testing

**Unit Tests (Cloud Functions):**
```bash
cd functions
npm test
```

**Integration Tests (Flutter):**
```dart
testWidgets('Entry syncs to Firestore', (tester) async {
  // Create entry offline
  final entry = await createEntry('Test content');

  // Go online
  await goOnline();

  // Wait for sync
  await tester.pumpAndSettle();

  // Verify Firestore has entry
  final doc = await firestore.doc('users/$uid/entries/${entry.id}').get();
  expect(doc.exists, true);
});
```

---

### 3. Monitoring

**Firebase Console:**
- Firestore usage and query performance
- Cloud Functions invocations and errors
- Authentication activity

**Custom Dashboards:**
- User growth (new signups per day)
- Entry creation rate
- AI processing success rate
- Weekly summary email deliveries

---

## Next Steps

1. **Initialize Firebase Project** - Create project, enable services
2. **Deploy Security Rules** - Apply Firestore and Storage rules
3. **Implement Data Models** - Create Dart classes with JSON serialization
4. **Write Cloud Functions** - Implement AI processing and summaries
5. **Set Up Offline Sync** - Configure Hive and sync logic
6. **Test End-to-End** - Validate offline → online → AI flow

**File References:**
- Design tokens: `tokens-complete.json`
- Component specs: `COMPONENT-SPECS.md`
- Dependencies: `DEPENDENCIES.md`
- Screen mockups: `SCREEN-MOCKUPS.md`
