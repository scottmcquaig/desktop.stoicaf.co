# Prompt System Data Models

## Overview

The Stoic.af prompt system uses a 3-tier architecture to deliver personalized journaling prompts:

1. **Track Prompts** - 30-day programs for each of the 4 pillars
2. **General Prompts** - Library of prompts for users not enrolled in tracks
3. **Personalized Prompts** - AI-generated prompts tailored to user's journal history

---

## 1. Track Prompt Model

### TypeScript/Dart Interface

```typescript
interface TrackPrompt {
  // Identity
  id: string;                    // Format: "{pillar}_{day}" (e.g., "MONEY_1")
  track_id: TrackID;             // "MONEY" | "EGO" | "RELATIONSHIPS" | "DISCIPLINE"
  day: number;                   // 1-30

  // Theme & Content
  daily_theme: string;           // e.g., "Theme Name #1"
  stoic_quote: string;           // Classical Stoic wisdom
  quote_author: StoicAuthor;     // "Marcus Aurelius" | "Epictetus" | "Seneca"
  bro_translation: string;       // Modern, accessible translation

  // Morning Prompts
  todays_intention: string;      // Daily intention statement

  // Evening Prompts
  todays_challenge: string;      // Main journaling prompt
  challenge_type: ChallengeType; // "reflection" | "action" | "gratitude" | "challenge"
  evening_reflection_prompts: string[];  // Array of 3 follow-up questions

  // Metadata
  pillar: Pillar;               // Lowercase version for consistency
  estimated_time_minutes: number; // 5-15 minutes
  created_at: Timestamp;
  updated_at: Timestamp;
}

type TrackID = "MONEY" | "EGO" | "RELATIONSHIPS" | "DISCIPLINE";
type StoicAuthor = "Marcus Aurelius" | "Epictetus" | "Seneca";
type ChallengeType = "reflection" | "action" | "gratitude" | "challenge";
type Pillar = "money" | "ego" | "relationships" | "discipline" | "any";
```

### Firestore Collection

**Collection:** `/track_prompts/{promptId}`
**Document Count:** 120 (30 days × 4 pillars)

**Example Document:**

```json
{
  "id": "MONEY_1",
  "track_id": "MONEY",
  "day": 1,
  "daily_theme": "Your Wealth Isn't Your Worth #1",
  "stoic_quote": "Wealth consists not in having great possessions, but in having few wants.",
  "quote_author": "Epictetus",
  "bro_translation": "Real wealth = wanting less, not having more.",
  "todays_intention": "Today, I will notice when I equate my worth with my bank balance.",
  "todays_challenge": "List three things you did today that mattered—that had nothing to do with money.",
  "challenge_type": "reflection",
  "evening_reflection_prompts": [
    "What did you notice about your relationship with money today?",
    "When did you feel most secure, and why?",
    "How would you like to think about wealth moving forward?"
  ],
  "pillar": "money",
  "estimated_time_minutes": 10,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

### Indexes Required

```
Collection: track_prompts
- track_id ASC, day ASC
- pillar ASC, day ASC
```

---

## 2. General Prompt Model

### TypeScript/Dart Interface

```typescript
interface GeneralPrompt {
  // Identity
  id: string;                    // Format: "gp_{number}" (e.g., "gp_001")
  title: string;                 // Short, descriptive title
  description: string;           // Brief explanation for UI

  // Targeting
  pillars: Pillar[];             // Can apply to multiple pillars
  difficulty: Difficulty;        // "beginner" | "intermediate" | "advanced"
  mood_match?: MoodRating[];     // Show when user in specific moods (1-5)

  // Content
  prompt_text: string;           // Main journaling prompt (200-400 chars)
  follow_up_questions: string[]; // 2-4 follow-up questions

  // Optional Stoic Wisdom
  stoic_wisdom?: {
    quote: string;
    author: StoicAuthor;
    translation: string;
  };

  // Behavior
  cooldown_days: number;         // Don't show again for N days after use
  max_uses_per_user?: number;    // Optional lifetime limit
  priority: number;              // 1-10, higher = more likely to be shown

  // Metadata
  tags: string[];                // ["gratitude", "mindfulness", "beginner-friendly"]
  isActive: boolean;             // Admin can enable/disable

  // Analytics
  usage_count: number;           // Total times shown
  completion_rate: number;       // % of users who completed entry
  avg_rating: number;            // 1-5 stars from user feedback

  created_at: Timestamp;
  updated_at: Timestamp;
}

type Difficulty = "beginner" | "intermediate" | "advanced";
type MoodRating = 1 | 2 | 3 | 4 | 5;
```

### Firestore Collection

**Collection:** `/general_prompts/{promptId}`
**Document Count:** 50-100 prompts

**Example Document:**

```json
{
  "id": "gp_001",
  "title": "Gratitude in Small Moments",
  "description": "Reflect on three small wins from today",
  "pillars": ["any"],
  "difficulty": "beginner",
  "mood_match": [3, 4, 5],
  "prompt_text": "List three small moments from today that you're grateful for. They don't need to be big—a good cup of coffee, a kind word, or a moment of peace all count.",
  "follow_up_questions": [
    "Which of these moments surprised you?",
    "How can you create more moments like these tomorrow?",
    "Who contributed to these moments, and have you thanked them?"
  ],
  "stoic_wisdom": {
    "quote": "He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.",
    "author": "Epictetus",
    "translation": "Focus on what you have, not what you're missing."
  },
  "cooldown_days": 7,
  "max_uses_per_user": null,
  "priority": 8,
  "tags": ["gratitude", "mindfulness", "beginner-friendly"],
  "isActive": true,
  "usage_count": 1247,
  "completion_rate": 0.82,
  "avg_rating": 4.6,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-15T00:00:00Z"
}
```

### Indexes Required

```
Collection: general_prompts
- isActive ASC, priority DESC
- pillars ARRAY, isActive ASC
- difficulty ASC, isActive ASC
- tags ARRAY, isActive ASC
```

---

## 3. Personalized Prompt Template Model

### TypeScript/Dart Interface

```typescript
interface PersonalizedPromptTemplate {
  // Identity
  id: string;                    // Format: "pt_{name}" (e.g., "pt_mood_decline")
  name: string;                  // Internal name
  description: string;           // What this template does

  // Trigger Conditions (AND logic)
  trigger_conditions: {
    mood_pattern?: MoodPattern;  // "declining_3_days" | "improving_3_days" | "consistently_low"
    streak_milestone?: number;   // 7, 30, 100 days
    journal_themes?: string[];   // Detected recurring topics
    time_of_day?: TimeOfDay;     // "morning" | "afternoon" | "evening"
    min_entries?: number;        // Minimum entries before eligible
    days_since_last?: number;    // Inactive for N days
  };

  // AI Generation Instructions
  system_prompt: string;          // Instructions for AI (Gemini)
  user_context_template: string;  // Template filled with user data

  // Constraints
  max_length_chars: number;       // 200-400 chars for generated prompt
  tone: PromptTone;               // "supportive" | "challenging" | "reflective"
  include_stoic_quote: boolean;   // Whether to add a quote

  // Behavior
  cooldown_hours: number;         // Don't trigger again for N hours
  priority: number;               // 1-10, higher = check first
  requires_plus_tier: boolean;    // Gated to paid users

  // Metadata
  pillar?: Pillar;               // Optional pillar association
  tags: string[];
  isActive: boolean;

  // Analytics
  trigger_count: number;          // Times this template was triggered
  avg_rating: number;             // User feedback
  avg_tokens_used: number;        // AI token tracking

  created_at: Timestamp;
  updated_at: Timestamp;
}

type MoodPattern = "declining_3_days" | "improving_3_days" | "consistently_low" | "consistently_high" | "volatile";
type TimeOfDay = "morning" | "afternoon" | "evening";
type PromptTone = "supportive" | "challenging" | "reflective" | "celebrating";
```

### Firestore Collection

**Collection:** `/personalized_templates/{templateId}`
**Document Count:** 10-20 templates

**Example Document:**

```json
{
  "id": "pt_mood_decline",
  "name": "Mood Recovery Support",
  "description": "Supportive prompt when mood declining 3+ days",
  "trigger_conditions": {
    "mood_pattern": "declining_3_days",
    "min_entries": 7
  },
  "system_prompt": "You are a supportive Stoic coach. The user has been experiencing declining mood for several days. Create a gentle, actionable prompt that helps them process their feelings and find a small step forward. Reference Stoic principles of focusing on what they can control. Keep the prompt to 250-300 characters.",
  "user_context_template": "User {{userName}} is practicing the {{pillar}} pillar. Recent mood trend: {{moodTrend}}. Recurring themes in recent entries: {{recentThemes}}. Current streak: {{streakDays}} days.",
  "max_length_chars": 300,
  "tone": "supportive",
  "include_stoic_quote": true,
  "cooldown_hours": 72,
  "priority": 9,
  "requires_plus_tier": true,
  "pillar": null,
  "tags": ["mood", "support", "ai-generated"],
  "isActive": true,
  "trigger_count": 342,
  "avg_rating": 4.7,
  "avg_tokens_used": 125,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-20T00:00:00Z"
}
```

### Indexes Required

```
Collection: personalized_templates
- isActive ASC, priority DESC
- requires_plus_tier ASC, isActive ASC
```

---

## 4. User Prompt History Model

### TypeScript/Dart Interface

```typescript
interface UserPromptHistory {
  // Identity
  id: string;                    // Auto-generated document ID
  userId: string;                // Reference to users collection
  prompt_id: string;             // ID of prompt (track, general, or personalized)
  prompt_type: PromptType;       // "track" | "general" | "personalized"

  // Timing
  shown_at: Timestamp;           // When prompt was displayed
  completed_at?: Timestamp;      // When user finished entry
  skipped_at?: Timestamp;        // If user explicitly skipped

  // Status
  status: PromptStatus;          // "shown" | "completed" | "skipped"

  // Context
  mood_before?: MoodRating;      // User's mood when prompt shown
  mood_after?: MoodRating;       // User's mood after completing entry
  time_of_day: TimeOfDay;        // When it was shown

  // Entry Data (if completed)
  entry_id?: string;             // Reference to created entry
  entry_word_count?: number;
  time_to_complete_minutes?: number;

  // Feedback
  rating?: 1 | 2 | 3 | 4 | 5;   // User's rating of prompt
  was_helpful: boolean;          // Quick thumbs up/down
  feedback_text?: string;        // Optional written feedback

  // Metadata
  created_at: Timestamp;
  updated_at: Timestamp;
}

type PromptType = "track" | "general" | "personalized";
type PromptStatus = "shown" | "completed" | "skipped" | "abandoned";
```

### Firestore Collection

**Collection:** `/user_prompt_history/{userId}/prompts/{historyId}`
**Subcollection under users**

**Example Document:**

```json
{
  "id": "uph_abc123",
  "userId": "user_123",
  "prompt_id": "gp_001",
  "prompt_type": "general",
  "shown_at": "2025-01-20T08:00:00Z",
  "completed_at": "2025-01-20T08:12:00Z",
  "status": "completed",
  "mood_before": 3,
  "mood_after": 4,
  "time_of_day": "morning",
  "entry_id": "entry_xyz789",
  "entry_word_count": 247,
  "time_to_complete_minutes": 12,
  "rating": 5,
  "was_helpful": true,
  "feedback_text": null,
  "created_at": "2025-01-20T08:00:00Z",
  "updated_at": "2025-01-20T08:12:00Z"
}
```

### Indexes Required

```
Collection: user_prompt_history/{userId}/prompts
- shown_at DESC
- prompt_type ASC, shown_at DESC
- status ASC, shown_at DESC
```

---

## 5. Prompt Selection Context Model

### TypeScript/Dart Interface

```typescript
interface PromptSelectionContext {
  // User State
  userId: string;
  userTier: "free" | "plus";
  activeTrack?: {
    trackId: TrackID;
    currentDay: number;
    startedAt: Timestamp;
  };

  // Preferences
  defaultPillar?: Pillar;
  preferredTone?: PromptTone;
  difficulty?: Difficulty;

  // Current Context
  timeOfDay: TimeOfDay;
  currentMood?: MoodRating;
  lastEntryDate?: Timestamp;
  isOnStreak: boolean;
  streakDays: number;
  dayOfWeek: number;            // 0-6

  // Request Details
  requestSource: RequestSource;
  explicitPillar?: Pillar;      // User manually selected pillar

  // Recent History
  recentPromptIds: string[];    // Last 10 prompts shown
  recentThemes: string[];       // Detected from journal entries
  moodTrend?: MoodPattern;
}

type RequestSource = "dashboard" | "notification" | "new_entry" | "quick_capture" | "manual";
```

---

## 6. Generated Personalized Prompt Model

### TypeScript/Dart Interface

```typescript
interface GeneratedPersonalizedPrompt {
  // Identity
  id: string;                    // Auto-generated
  userId: string;
  templateId: string;            // Reference to template used

  // Generated Content
  prompt_text: string;           // AI-generated prompt
  follow_up_questions?: string[]; // Optional AI-generated questions
  stoic_quote?: {
    quote: string;
    author: StoicAuthor;
    translation: string;
  };

  // Generation Metadata
  generated_at: Timestamp;
  model_used: string;            // "gemini-1.5-flash"
  tokens_used: number;
  generation_time_ms: number;

  // Context
  user_context: {
    recentThemes: string[];
    moodTrend: string;
    streakDays: number;
    pillar: Pillar;
  };

  // Behavior
  expires_at: Timestamp;         // After 24 hours
  used: boolean;

  created_at: Timestamp;
}
```

### Firestore Collection

**Collection:** `/generated_prompts/{userId}/prompts/{promptId}`
**TTL:** 24 hours (auto-delete)

---

## Data Flow

### 1. Track Prompt Flow

```
User enrolled in track
→ Load track prompt for current day
→ Display morning intention
→ User writes entry
→ Display evening reflection questions
→ Advance to next day
```

### 2. General Prompt Flow

```
User not on track
→ Get user context (pillar, mood, history)
→ Filter available prompts (cooldown, mood match)
→ Weight by priority + pillar preference
→ Select prompt
→ Record in user_prompt_history
```

### 3. Personalized Prompt Flow

```
Check trigger conditions for all templates
→ If match found:
  → Generate personalized prompt via AI
  → Cache in generated_prompts (24hr TTL)
  → Record token usage
  → Display to user
  → Track in user_prompt_history
```

---

## Storage Estimates

### Firestore Documents

- **Track Prompts:** 120 docs × 2KB = 240KB
- **General Prompts:** 100 docs × 1.5KB = 150KB
- **Personalized Templates:** 20 docs × 1KB = 20KB
- **User Prompt History:** 1000 users × 365 prompts/year × 0.5KB = 182MB/year
- **Generated Prompts:** Temporary (24hr), ~1KB each

### Total Storage (Year 1, 1000 users):** ~200MB

---

## Migration Strategy

### From JSON to Firestore

```typescript
// Migration script
async function migrateTrackPrompts() {
  const tracks = ['money', 'ego', 'relationships', 'discipline'];

  for (const track of tracks) {
    const data = await fs.readFile(`/07-CONTENT/prompts/tracks/${track}.json`);
    const trackData = JSON.parse(data);

    for (const day of trackData.days) {
      const docId = `${track.toUpperCase()}_${day.day}`;
      await db.collection('track_prompts').doc(docId).set({
        id: docId,
        track_id: track.toUpperCase(),
        day: day.day,
        daily_theme: day.daily_theme,
        stoic_quote: day.stoic_quote,
        quote_author: day.quote_author,
        bro_translation: day.bro_translation,
        todays_intention: day.todays_intention,
        todays_challenge: day.todays_challenge,
        challenge_type: day.challenge_type,
        evening_reflection_prompts: day.evening_reflection_prompts,
        pillar: track,
        estimated_time_minutes: 10,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
      });
    }
  }
}
```

---

## Testing Data

### Mock Data for Development

Create lightweight mock services that return static data:

```dart
class MockPromptService {
  Future<TrackPrompt> getTrackPrompt(String trackId, int day) async {
    // Return hardcoded prompt for testing
    return TrackPrompt(
      id: '${trackId}_$day',
      trackId: trackId,
      day: day,
      dailyTheme: 'Test Theme #$day',
      // ... rest of fields
    );
  }
}
```

Replace with real Firestore calls during Firebase integration phase.

---

## Security Rules

```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Track prompts - read-only for all authenticated users
    match /track_prompts/{promptId} {
      allow read: if request.auth != null;
      allow write: if false; // Admin SDK only
    }

    // General prompts - read-only for all authenticated users
    match /general_prompts/{promptId} {
      allow read: if request.auth != null && resource.data.isActive == true;
      allow write: if false; // Admin SDK only
    }

    // Personalized templates - read-only for Plus users
    match /personalized_templates/{templateId} {
      allow read: if request.auth != null
                  && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.tier == 'plus';
      allow write: if false; // Admin SDK only
    }

    // User prompt history - user can only access their own
    match /user_prompt_history/{userId}/prompts/{historyId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Generated prompts - user can only access their own
    match /generated_prompts/{userId}/prompts/{promptId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Performance Considerations

### Caching Strategy

1. **Track Prompts:** Cache locally for 7 days (rarely change)
2. **General Prompts:** Cache active prompts locally, refresh daily
3. **User History:** Keep last 30 days in memory for quick filtering
4. **Generated Prompts:** Cache for 24 hours, then expire

### Query Optimization

- Use composite indexes for common queries
- Limit prompt selection queries to 50 docs max
- Paginate user history if > 100 entries

---

## Cost Analysis

### Firestore Operations (per 1000 users/day)

- **Track Prompt Reads:** 1000 reads/day = $0.036/million = $0.000036/day
- **General Prompt Reads:** 500 reads/day = $0.018/day
- **History Writes:** 1000 writes/day = $0.18/million = $0.00018/day
- **Personalized Generations:** 100 AI calls/day × $0.000001 = $0.0001/day

**Total Daily Cost (1000 users):** ~$0.02/day = $7/month

**Per User Cost:** $0.007/month (well under $0.20 AI budget)

---

## Summary

The prompt system data models provide:

- ✅ Rich 30-day track programs with Stoic wisdom
- ✅ Flexible general prompt library
- ✅ AI-powered personalization with cost controls
- ✅ Comprehensive tracking and analytics
- ✅ Scalable Firestore architecture
- ✅ Privacy-focused user data isolation

All models are optimized for offline-first mobile apps with Firebase sync.