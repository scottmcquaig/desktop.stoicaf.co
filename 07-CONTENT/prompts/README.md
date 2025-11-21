# Prompt System Documentation

## Overview

The Stoic.af prompt system delivers personalized journaling prompts through a 3-tier architecture designed to keep users engaged while maintaining strict AI cost controls.

## Directory Structure

```
/07-CONTENT/prompts/
├── tracks/                  # 30-day pillar programs
│   ├── money.json          # "Your Wealth Isn't Your Worth"
│   ├── ego.json            # "Let Results Talk"
│   ├── relationships.json  # "Lead With Respect"
│   └── discipline.json     # "Small Reps, Big Gains"
│
├── general/                 # Non-track prompt library
│   └── general-prompts.json # 20 diverse prompts
│
├── personalized/            # AI generation templates
│   └── templates.json       # 5 trigger-based templates
│
└── README.md               # This file
```

## 3-Tier Prompt Architecture

### Tier 1: Track Prompts (30-Day Programs)

**Purpose:** Structured journaling programs for users enrolled in one of the 4 pillars.

**Content:**
- 30 days of carefully curated content per pillar
- Morning intentions
- Daily challenges with reflection questions
- Evening prompts (3 follow-up questions)
- Stoic quotes with modern translations

**Selection Logic:**
```
IF user.activeTrack EXISTS
  RETURN track_prompt[track_id][current_day]
```

**Files:** `/tracks/{pillar}.json` (4 files, ~25KB each)

**User Experience:** Users select a pillar during onboarding and progress day-by-day through the program.

---

### Tier 2: Personalized Prompts (AI-Generated)

**Purpose:** Tailored prompts based on user's journal history, mood patterns, and milestones.

**Triggers:**
1. **Mood Patterns** - Declining 3+ days, consistently low
2. **Streak Milestones** - 7, 30, 100 days
3. **Recurring Themes** - Detected from journal content
4. **Inactivity** - 3+ days without journaling

**Selection Logic:**
```
IF user.tier == "plus" AND entry_count >= 7
  FOR EACH template IN templates
    IF template.triggers.match(user_context)
      GENERATE personalized_prompt via AI
      RETURN personalized_prompt
```

**AI Generation:**
- Model: Gemini 1.5 Flash
- Max tokens: 150 per generation
- Monthly budget: <$0.20/user
- Cooldown: 48-72 hours between generations

**Files:** `/personalized/templates.json` (5 templates)

**User Experience:** Plus tier users occasionally receive highly relevant prompts that reference their recent journaling patterns.

---

### Tier 3: General Prompts (Curated Library)

**Purpose:** Diverse prompt library for users not on tracks.

**Content:**
- 20 curated prompts across all pillars
- Range of difficulties (beginner, intermediate, advanced)
- Mood matching (show based on current mood)
- Cooldown periods (prevent repetition)

**Selection Logic:**
```
available_prompts = filter_by_cooldown(all_prompts, user_history)
available_prompts = filter_by_mood(available_prompts, current_mood)
weighted_prompts = apply_weights(available_prompts, user_preferences)
RETURN weighted_random_selection(weighted_prompts)
```

**Weighting Factors:**
- User's default pillar (+2x)
- Mood match (+1.5x)
- High rating (+1.3x)
- Low usage (+1.2x)
- Prompt priority (1-10 scale)

**Files:** `/general/general-prompts.json` (20 prompts)

**User Experience:** Free and Plus users get varied, relevant prompts that never feel repetitive.

---

## Prompt Data Schema

### Track Prompt

```json
{
  "day": 1,
  "daily_theme": "Your Wealth Isn't Your Worth #1",
  "stoic_quote": "Wealth consists not in having great possessions...",
  "quote_author": "Epictetus",
  "bro_translation": "Real wealth = wanting less, not having more.",
  "todays_intention": "Today, I will notice when I equate my worth with my bank balance.",
  "todays_challenge": "List three things you did today that mattered...",
  "challenge_type": "reflection",
  "evening_reflection_prompts": [
    "What did you notice about your relationship with money today?",
    "When did you feel most secure, and why?",
    "How would you like to think about wealth moving forward?"
  ]
}
```

### General Prompt

```json
{
  "id": "gp_001",
  "title": "Gratitude in Small Moments",
  "pillars": ["any"],
  "difficulty": "beginner",
  "mood_match": [3, 4, 5],
  "prompt_text": "List three small moments from today...",
  "follow_up_questions": ["...", "...", "..."],
  "stoic_wisdom": {
    "quote": "...",
    "author": "Epictetus",
    "translation": "..."
  },
  "cooldown_days": 7,
  "priority": 8,
  "tags": ["gratitude", "mindfulness"]
}
```

### Personalized Template

```json
{
  "id": "pt_mood_decline",
  "name": "Mood Recovery Support",
  "trigger_conditions": {
    "mood_pattern": "declining_3_days",
    "min_entries": 7
  },
  "system_prompt": "You are a supportive Stoic coach...",
  "user_context_template": "User {{userName}} is practicing {{pillar}}...",
  "max_length_chars": 300,
  "tone": "supportive",
  "cooldown_hours": 72
}
```

## Development Strategy

### Phase 1: Foundation (Week 1)
- Load track prompts from local JSON (no Firebase yet)
- Implement track day progression
- Build UI for track selection and daily viewing

**Mock Data:**
```dart
class MockPromptService {
  Future<TrackPrompt> getTrackPrompt(String trackId, int day) async {
    final jsonData = await rootBundle.loadString('assets/tracks/$trackId.json');
    final track = jsonDecode(jsonData);
    return TrackPrompt.fromJson(track['days'][day - 1]);
  }
}
```

### Phase 2: General Library (Week 2)
- Load general prompts from local JSON
- Implement cooldown logic (store in Hive)
- Build weighted selection algorithm
- Add prompt rating/feedback UI

**Mock Data:**
```dart
class MockGeneralPromptService {
  Future<List<GeneralPrompt>> getAvailablePrompts() async {
    final jsonData = await rootBundle.loadString('assets/prompts/general-prompts.json');
    return (jsonDecode(jsonData)['prompts'] as List)
        .map((p) => GeneralPrompt.fromJson(p))
        .toList();
  }
}
```

### Phase 3: AI Templates (Week 3)
- Load personalized templates
- Implement trigger detection (mood analysis, theme extraction)
- **Stub AI generation initially** - return pre-written responses
- Build token tracking UI

**Mock AI Service:**
```dart
class MockAIService {
  Future<GeneratedPrompt> generatePrompt({
    required String systemPrompt,
    required String userContext,
  }) async {
    // Return pre-written "AI" response for testing
    await Future.delayed(Duration(seconds: 2)); // Simulate API call

    return GeneratedPrompt(
      text: "I've noticed you've been reflecting on [theme] lately. What's one small step you could take today to address this?",
      tokensUsed: 120,
      generationTimeMs: 2000,
    );
  }
}
```

### Phase 4: Firebase Integration (Week 4)
- Migrate prompts to Firestore
- Integrate real Gemini API
- Implement token tracking and budgets
- Add admin prompt management UI

**Real Services:**
```dart
class FirestorePromptService {
  Future<TrackPrompt> getTrackPrompt(String trackId, int day) async {
    final doc = await firestore
        .collection('track_prompts')
        .doc('${trackId}_$day')
        .get();
    return TrackPrompt.fromFirestore(doc);
  }
}

class GeminiAIService {
  Future<GeneratedPrompt> generatePrompt({
    required String systemPrompt,
    required String userContext,
  }) async {
    final response = await genkit.generate(
      model: 'gemini-1.5-flash',
      prompt: '$systemPrompt\n\n$userContext',
      maxTokens: 150,
    );

    return GeneratedPrompt(
      text: response.text,
      tokensUsed: response.usage.totalTokens,
    );
  }
}
```

## Adding New Prompts

### Adding a General Prompt

1. Open `/07-CONTENT/prompts/general/general-prompts.json`
2. Add new prompt object to `prompts` array:

```json
{
  "id": "gp_021",
  "title": "Your Prompt Title",
  "description": "Brief description",
  "pillars": ["money", "discipline"],
  "difficulty": "intermediate",
  "mood_match": [2, 3, 4],
  "prompt_text": "Your main prompt (200-400 chars)",
  "follow_up_questions": [
    "Question 1?",
    "Question 2?",
    "Question 3?"
  ],
  "stoic_wisdom": {
    "quote": "Optional Stoic quote",
    "author": "Marcus Aurelius",
    "translation": "Modern translation"
  },
  "cooldown_days": 10,
  "priority": 7,
  "tags": ["tag1", "tag2"]
}
```

3. Test locally before deploying to Firebase
4. Monitor usage and ratings after deployment

### Adding a Personalized Template

1. Open `/07-CONTENT/prompts/personalized/templates.json`
2. Add new template:

```json
{
  "id": "pt_new_template",
  "name": "Template Name",
  "description": "What this template does",
  "trigger_conditions": {
    "mood_pattern": "consistently_high",
    "min_entries": 14
  },
  "system_prompt": "Instructions for AI...",
  "user_context_template": "Context with {{placeholders}}...",
  "max_length_chars": 300,
  "tone": "reflective",
  "include_stoic_quote": true,
  "cooldown_hours": 168,
  "priority": 6,
  "requires_plus_tier": true,
  "tags": ["custom", "advanced"]
}
```

3. Test trigger conditions with mock data
4. Monitor token usage and generation quality

## Testing Prompts

### Manual Testing Checklist

**Track Prompts:**
- [ ] All 30 days load correctly
- [ ] Stoic quotes display properly
- [ ] Reflection questions appear in evening
- [ ] Day progression works
- [ ] Can switch between tracks

**General Prompts:**
- [ ] Cooldown prevents immediate repeats
- [ ] Mood matching works
- [ ] Weighting favors user preferences
- [ ] All pillars represented over time
- [ ] Rating system functional

**Personalized Prompts:**
- [ ] Triggers activate correctly
- [ ] AI generation stays under 150 tokens
- [ ] Generated prompts are relevant
- [ ] Cooldown prevents spam
- [ ] Token tracking accurate

### Automated Tests

```dart
test('track prompt has all required fields', () {
  final prompt = TrackPrompt.fromJson(trackJson);

  expect(prompt.dailyTheme, isNotEmpty);
  expect(prompt.stoicQuote, isNotEmpty);
  expect(prompt.todaysIntention, isNotEmpty);
  expect(prompt.eveningReflectionPrompts, hasLength(3));
});

test('general prompt respects cooldown', () async {
  // Show prompt
  await promptService.showPrompt('gp_001');

  // Try to show again immediately
  final available = await promptService.getAvailablePrompts();

  expect(available.any((p) => p.id == 'gp_001'), isFalse);
});

test('personalized prompt stays under token budget', () async {
  final prompt = await aiService.generatePrompt(/* ... */);

  expect(prompt.tokensUsed, lessThanOrEqualTo(150));
});
```

## Cost Analysis

### Track Prompts
- **Storage:** 120 docs × 2KB = 240KB
- **Reads:** 1 per user per day = $0.000036/1000 users/day
- **Cost:** Negligible

### General Prompts
- **Storage:** 100 docs × 1.5KB = 150KB
- **Reads:** 1-2 per user per day = $0.00007/1000 users/day
- **Cost:** Negligible

### Personalized Prompts
- **AI Generation:** $0.000075 per 1M input tokens, $0.0003 per 1M output tokens (Gemini Flash)
- **Average:** 100 input + 50 output tokens per generation
- **Per Generation:** ~$0.000025
- **Usage:** 10 generations/user/month (gated to Plus tier)
- **Cost:** $0.00025/user/month
- **Well under:** $0.20/user/month budget

## Analytics & Optimization

### Track These Metrics

1. **Prompt Effectiveness:**
   - Completion rate by prompt type
   - Average word count per prompt
   - Time to complete
   - User ratings

2. **Engagement:**
   - Prompts shown vs completed
   - Skip rate by prompt
   - Repeat request rate

3. **AI Performance:**
   - Token usage per generation
   - Generation latency
   - User satisfaction with personalized prompts
   - Template trigger accuracy

4. **Cost Control:**
   - Daily/monthly token consumption
   - Cost per user
   - AI vs non-AI prompt ratio

### Optimization Opportunities

**Low Completion Rate** → Review prompt text, simplify or clarify
**High Skip Rate** → Check mood matching, adjust cooldowns
**Low Ratings** → Revise or retire prompt
**High Token Usage** → Optimize system prompts, reduce max tokens
**Template Never Triggers** → Review trigger conditions

## Migration to Firebase

When ready to move from local JSON to Firestore:

1. **Run Migration Script:**
```bash
npm run migrate:prompts
```

2. **Verify Data:**
```bash
npm run verify:prompts
```

3. **Update Service Layer:**
```dart
// Change from:
final prompt = await MockPromptService().getPrompt();

// To:
final prompt = await FirestorePromptService().getPrompt();
```

4. **Test Thoroughly:**
- Verify all prompts load
- Check indexes are created
- Confirm security rules work
- Test offline sync

5. **Deploy Gradually:**
- 10% of users
- Monitor errors and latency
- Expand to 50%, then 100%

## Best Practices

### Writing Prompts

**Do:**
- ✅ Keep prompt text 200-400 characters
- ✅ Use clear, actionable language
- ✅ Include 2-3 focused follow-up questions
- ✅ Reference Stoic principles when relevant
- ✅ Consider different user contexts (time of day, mood)

**Don't:**
- ❌ Use jargon or complex philosophical terms
- ❌ Make prompts too open-ended
- ❌ Ask more than 3 follow-up questions
- ❌ Assume user's situation or values
- ❌ Be preachy or judgmental

### System Prompts for AI

**Do:**
- ✅ Specify exact character count
- ✅ Define tone clearly (supportive, challenging, reflective)
- ✅ Include constraints (no medical advice, no judgment)
- ✅ Reference user context variables
- ✅ Request specific format (prompt + questions)

**Don't:**
- ❌ Allow open-ended generation
- ❌ Skip character limits
- ❌ Forget to specify tone
- ❌ Miss opportunities to reference user data
- ❌ Generate without content review process

## Troubleshooting

**Issue:** Prompts repeating too often
**Solution:** Increase cooldown_days or expand prompt library

**Issue:** AI generation fails
**Solution:** Check token budget, verify API keys, review system prompts

**Issue:** Triggers not activating
**Solution:** Review trigger conditions, check user data availability

**Issue:** Poor prompt relevance
**Solution:** Improve mood matching, adjust weights, gather user feedback

**Issue:** High costs
**Solution:** Reduce generation frequency, lower max tokens, gate to Plus only

## Roadmap

### Q1 2025
- ✅ Launch with track prompts
- ✅ Deploy general prompt library
- ✅ Beta test personalized prompts

### Q2 2025
- [ ] Expand general library to 50 prompts
- [ ] Add community-submitted prompts
- [ ] Implement prompt A/B testing
- [ ] Launch prompt remix feature (user can request variations)

### Q3 2025
- [ ] Multi-language support
- [ ] Voice prompt option
- [ ] Image prompts (visual journaling)
- [ ] Collaborative prompts (for groups)

### Q4 2025
- [ ] Custom prompt builder (Plus tier)
- [ ] Prompt marketplace
- [ ] Advanced AI personalization (longer context)
- [ ] Integration with wearables (mood from biometrics)

## Support

For questions or issues with the prompt system:
- **Documentation:** `/04-DATA-MODELS/PROMPT-MODELS.md`
- **Implementation:** `/03-TECHNICAL-SPECS/PROMPT-SELECTION-ENGINE.md`
- **Issues:** github.com/scottmcquaig/app.stoicaf.co/issues

---

**Remember:** Great prompts spark reflection without overwhelming. Keep them focused, actionable, and rooted in Stoic wisdom.