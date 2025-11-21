# Prompt Selection Engine

## Overview

The Prompt Selection Engine is the core system that determines which journaling prompt to show a user. It implements a 3-tier waterfall strategy that prioritizes track prompts, then checks for AI-personalized opportunities, and finally falls back to the general prompt library.

## Architecture

```
┌─────────────────────────────────────────────────┐
│         User Requests Prompt                     │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
         ┌─────────────────────┐
         │  Is user on track?  │
         └─────────┬───────────┘
                   │
        ┌──────────┴──────────┐
        │ YES                 │ NO
        ▼                     ▼
┌───────────────────┐  ┌────────────────────────┐
│ Return Track      │  │ Check Personalized     │
│ Prompt (Day N)    │  │ Eligibility            │
└───────────────────┘  └──────────┬─────────────┘
                                  │
                       ┌──────────┴──────────┐
                       │ Eligible?           │
                       └──────────┬──────────┘
                                  │
                       ┌──────────┴──────────┐
                       │ YES                 │ NO
                       ▼                     ▼
              ┌─────────────────┐   ┌──────────────────┐
              │ Generate         │   │ Select General   │
              │ Personalized     │   │ Prompt           │
              │ Prompt via AI    │   │ (Weighted)       │
              └─────────────────┘   └──────────────────┘
```

## Core Implementation

### PromptSelectionEngine Class

```dart
class PromptSelectionEngine {
  final PromptRepository promptRepo;
  final UserRepository userRepo;
  final AIService aiService;
  final AnalyticsService analytics;

  PromptSelectionEngine({
    required this.promptRepo,
    required this.userRepo,
    required this.aiService,
    required this.analytics,
  });

  /// Main entry point - selects appropriate prompt for user
  Future<Prompt> selectPrompt({
    required String userId,
    required PromptSelectionContext context,
  }) async {
    try {
      // 1. Check if user is enrolled in a track
      final user = await userRepo.getUser(userId);

      if (user.activeTrack != null) {
        final trackPrompt = await _getTrackPrompt(
          user.activeTrack!.trackId,
          user.activeTrack!.currentDay,
        );
        await _recordPromptShown(userId, trackPrompt, 'track', context);
        return trackPrompt;
      }

      // 2. Check for personalized prompt eligibility
      if (await _shouldShowPersonalized(user, context)) {
        final personalizedPrompt = await _generatePersonalizedPrompt(
          user,
          context,
        );

        if (personalizedPrompt != null) {
          await _recordPromptShown(userId, personalizedPrompt, 'personalized', context);
          return personalizedPrompt;
        }
      }

      // 3. Fall back to general prompt library
      final generalPrompt = await _selectGeneralPrompt(user, context);
      await _recordPromptShown(userId, generalPrompt, 'general', context);
      return generalPrompt;

    } catch (e) {
      // Fallback to default prompt if all else fails
      analytics.logError('prompt_selection_failed', error: e);
      return _getDefaultPrompt();
    }
  }

  /// Get track prompt for specific day
  Future<TrackPrompt> _getTrackPrompt(String trackId, int day) async {
    final prompt = await promptRepo.getTrackPrompt(trackId, day);
    if (prompt == null) {
      throw PromptNotFoundException('Track prompt not found: $trackId day $day');
    }
    return prompt;
  }

  /// Check if user is eligible for personalized prompts
  Future<bool> _shouldShowPersonalized(User user, PromptSelectionContext context) async {
    // Must be Plus tier
    if (user.tier != 'plus') return false;

    // Must have minimum entries
    final entryCount = await userRepo.getEntryCount(user.uid);
    if (entryCount < 7) return false;

    // Check cooldown period
    final lastPersonalized = await promptRepo.getLastPersonalizedPrompt(user.uid);
    if (lastPersonalized != null) {
      final hoursSince = DateTime.now().difference(lastPersonalized.shownAt).inHours;
      if (hoursSince < 48) return false; // 48-hour cooldown
    }

    // Check if any trigger conditions are met
    return await _checkTriggerConditions(user, context);
  }

  /// Check if any personalized prompt templates have triggered
  Future<bool> _checkTriggerConditions(User user, PromptSelectionContext context) async {
    final templates = await promptRepo.getActivePersonalizedTemplates();

    for (final template in templates) {
      if (await _evaluateTriggers(template, user, context)) {
        return true;
      }
    }

    return false;
  }

  /// Evaluate if a template's triggers are met
  Future<bool> _evaluateTriggers(
    PersonalizedPromptTemplate template,
    User user,
    PromptSelectionContext context,
  ) async {
    final triggers = template.triggerConditions;

    // Mood pattern check
    if (triggers.moodPattern != null && context.moodTrend != triggers.moodPattern) {
      return false;
    }

    // Streak milestone check
    if (triggers.streakMilestone != null && user.stats.currentStreak != triggers.streakMilestone) {
      return false;
    }

    // Min entries check
    if (triggers.minEntries != null) {
      final count = await userRepo.getEntryCount(user.uid);
      if (count < triggers.minEntries) return false;
    }

    // Inactive check
    if (triggers.daysSinceLast != null) {
      final daysSince = user.lastEntryDate != null
          ? DateTime.now().difference(user.lastEntryDate!).inDays
          : 999;
      if (daysSince < triggers.daysSinceLast) return false;
    }

    // Time of day check
    if (triggers.timeOfDay != null && context.timeOfDay != triggers.timeOfDay) {
      return false;
    }

    return true; // All conditions met
  }

  /// Generate AI-personalized prompt
  Future<Prompt?> _generatePersonalizedPrompt(
    User user,
    PromptSelectionContext context,
  ) async {
    try {
      // Find best matching template
      final template = await _findBestTemplate(user, context);
      if (template == null) return null;

      // Get recent entries for context
      final recentEntries = await userRepo.getRecentEntries(user.uid, limit: 7);

      // Extract themes and patterns
      final themes = _extractThemes(recentEntries);
      final moodTrend = _analyzeMoodTrend(recentEntries);

      // Fill context template
      final userContext = template.userContextTemplate
          .replaceAll('{{userName}}', user.displayName ?? 'friend')
          .replaceAll('{{pillar}}', user.preferences.defaultPillar ?? 'balance')
          .replaceAll('{{moodTrend}}', moodTrend)
          .replaceAll('{{recentThemes}}', themes.join(', '))
          .replaceAll('{{streakDays}}', user.stats.currentStreak.toString());

      // Generate via AI
      final generatedPrompt = await aiService.generatePrompt(
        systemPrompt: template.systemPrompt,
        userContext: userContext,
        maxTokens: 150,
        temperature: 0.7,
      );

      // Track token usage
      await userRepo.incrementTokenUsage(user.uid, generatedPrompt.tokensUsed);

      // Create and cache prompt
      return Prompt.personalized(
        text: generatedPrompt.text,
        templateId: template.id,
        userId: user.uid,
        tone: template.tone,
      );

    } catch (e) {
      analytics.logError('personalized_prompt_generation_failed', error: e);
      return null; // Fall back to general prompts
    }
  }

  /// Select general prompt from library
  Future<GeneralPrompt> _selectGeneralPrompt(
    User user,
    PromptSelectionContext context,
  ) async {
    // Get user's prompt history (last 30 days)
    final history = await promptRepo.getUserPromptHistory(user.uid, days: 30);
    final usedPromptIds = history.map((h) => h.promptId).toSet();

    // Get available prompts
    var available = await promptRepo.getGeneralPrompts(
      pillar: user.preferences.defaultPillar,
      difficulty: user.preferences.difficulty,
      isActive: true,
    );

    // Filter by cooldown
    available = available.where((prompt) {
      if (!usedPromptIds.contains(prompt.id)) return true;

      final lastUsed = history.firstWhere((h) => h.promptId == prompt.id);
      final daysSince = DateTime.now().difference(lastUsed.shownAt).inDays;
      return daysSince >= prompt.cooldownDays;
    }).toList();

    // Filter by mood match (if applicable)
    if (context.currentMood != null && available.isNotEmpty) {
      final moodMatched = available.where((p) {
        return p.moodMatch == null || p.moodMatch!.contains(context.currentMood);
      }).toList();

      if (moodMatched.isNotEmpty) {
        available = moodMatched;
      }
    }

    // If no prompts available, reset cooldowns and try again
    if (available.isEmpty) {
      available = await promptRepo.getGeneralPrompts(isActive: true);
    }

    // Weight prompts by various factors
    final weighted = _weightPrompts(available, user, context);

    // Select using weighted random
    return _weightedRandomSelection(weighted);
  }

  /// Weight prompts by user preferences and context
  List<WeightedPrompt> _weightPrompts(
    List<GeneralPrompt> prompts,
    User user,
    PromptSelectionContext context,
  ) {
    return prompts.map((prompt) {
      double weight = prompt.priority.toDouble();

      // Boost for user's default pillar
      if (prompt.pillars.contains(user.preferences.defaultPillar)) {
        weight *= 2.0;
      }

      // Boost for mood match
      if (context.currentMood != null &&
          prompt.moodMatch != null &&
          prompt.moodMatch!.contains(context.currentMood)) {
        weight *= 1.5;
      }

      // Boost for high ratings
      if (prompt.avgRating >= 4.5) {
        weight *= 1.3;
      }

      // Reduce weight for heavily used prompts
      if (prompt.usageCount > 1000) {
        weight *= 0.8;
      }

      // Boost for beginner difficulty if new user
      final daysSinceSignup = DateTime.now().difference(user.createdAt).inDays;
      if (daysSinceSignup < 7 && prompt.difficulty == 'beginner') {
        weight *= 1.4;
      }

      return WeightedPrompt(prompt: prompt, weight: weight);
    }).toList();
  }

  /// Weighted random selection
  GeneralPrompt _weightedRandomSelection(List<WeightedPrompt> weighted) {
    final totalWeight = weighted.fold<double>(0, (sum, wp) => sum + wp.weight);
    var random = Random().nextDouble() * totalWeight;

    for (final wp in weighted) {
      random -= wp.weight;
      if (random <= 0) {
        return wp.prompt;
      }
    }

    return weighted.last.prompt; // Fallback
  }

  /// Extract common themes from recent entries
  List<String> _extractThemes(List<Entry> entries) {
    // Simple keyword extraction
    final keywords = <String, int>{};

    for (final entry in entries) {
      final tags = entry.tags ?? [];
      for (final tag in tags) {
        keywords[tag] = (keywords[tag] ?? 0) + 1;
      }
    }

    return keywords.entries
        .where((e) => e.value >= 2) // Appears in 2+ entries
        .map((e) => e.key)
        .take(3)
        .toList();
  }

  /// Analyze mood trend from recent entries
  String _analyzeMoodTrend(List<Entry> entries) {
    if (entries.length < 3) return 'stable';

    final moods = entries
        .where((e) => e.mood != null)
        .map((e) => e.mood!)
        .toList();

    if (moods.length < 3) return 'stable';

    // Check if declining (3+ days of lower mood)
    bool isDecl

ining = true;
    for (int i = 0; i < moods.length - 1; i++) {
      if (moods[i] <= moods[i + 1]) {
        isDeclining = false;
        break;
      }
    }
    if (isDeclining) return 'declining_3_days';

    // Check if improving
    bool isImproving = true;
    for (int i = 0; i < moods.length - 1; i++) {
      if (moods[i] >= moods[i + 1]) {
        isImproving = false;
        break;
      }
    }
    if (isImproving) return 'improving_3_days';

    // Check if consistently low
    final avgMood = moods.reduce((a, b) => a + b) / moods.length;
    if (avgMood <= 2.0) return 'consistently_low';

    // Check if consistently high
    if (avgMood >= 4.5) return 'consistently_high';

    return 'stable';
  }

  /// Find best matching personalized template
  Future<PersonalizedPromptTemplate?> _findBestTemplate(
    User user,
    PromptSelectionContext context,
  ) async {
    final templates = await promptRepo.getActivePersonalizedTemplates();

    // Sort by priority
    templates.sort((a, b) => b.priority.compareTo(a.priority));

    for (final template in templates) {
      if (await _evaluateTriggers(template, user, context)) {
        return template;
      }
    }

    return null;
  }

  /// Record prompt shown to user
  Future<void> _recordPromptShown(
    String userId,
    Prompt prompt,
    String promptType,
    PromptSelectionContext context,
  ) async {
    await promptRepo.recordPromptHistory(UserPromptHistory(
      userId: userId,
      promptId: prompt.id,
      promptType: promptType,
      shownAt: DateTime.now(),
      status: 'shown',
      timeOfDay: context.timeOfDay,
      moodBefore: context.currentMood,
    ));

    analytics.logEvent('prompt_shown', parameters: {
      'prompt_id': prompt.id,
      'prompt_type': promptType,
      'user_tier': context.userTier,
    });
  }

  /// Get default fallback prompt
  Prompt _getDefaultPrompt() {
    return GeneralPrompt(
      id: 'default',
      title: 'Daily Reflection',
      description: 'What happened today?',
      promptText: 'Take a moment to reflect on your day. What stands out? What did you learn?',
      followUpQuestions: [
        'What went well today?',
        'What challenged you?',
        'What will you do differently tomorrow?',
      ],
      pillars: ['any'],
      difficulty: 'beginner',
      cooldownDays: 0,
      priority: 1,
      tags: ['default', 'reflection'],
      isActive: true,
    );
  }
}

class WeightedPrompt {
  final GeneralPrompt prompt;
  final double weight;

  WeightedPrompt({required this.prompt, required this.weight});
}
```

## Selection Context

```dart
class PromptSelectionContext {
  final String userId;
  final String userTier;
  final TimeOfDay timeOfDay;
  final int? currentMood;
  final DateTime? lastEntryDate;
  final bool isOnStreak;
  final int streakDays;
  final int dayOfWeek;
  final String requestSource;
  final String? explicitPillar;
  final List<String> recentPromptIds;
  final List<String> recentThemes;
  final String? moodTrend;

  PromptSelectionContext({
    required this.userId,
    required this.userTier,
    required this.timeOfDay,
    this.currentMood,
    this.lastEntryDate,
    required this.isOnStreak,
    required this.streakDays,
    required this.dayOfWeek,
    required this.requestSource,
    this.explicitPillar,
    this.recentPromptIds = const [],
    this.recentThemes = const [],
    this.moodTrend,
  });
}
```

## Testing Strategy

### Unit Tests

```dart
void main() {
  group('PromptSelectionEngine', () {
    test('returns track prompt when user enrolled', () async {
      final user = User(activeTrack: Track(trackId: 'MONEY', currentDay: 5));
      final context = PromptSelectionContext(/* ... */);

      final prompt = await engine.selectPrompt(userId: user.uid, context: context);

      expect(prompt.type, 'track');
      expect((prompt as TrackPrompt).day, 5);
    });

    test('respects cooldown periods for general prompts', () async {
      final history = [
        UserPromptHistory(promptId: 'gp_001', shownAt: DateTime.now().subtract(Duration(days: 3)))
      ];

      final available = await engine._filterByCooldown(allPrompts, history);

      expect(available.any((p) => p.id == 'gp_001'), isFalse);
    });

    test('generates personalized prompt on streak milestone', () async {
      final user = User(stats: UserStats(currentStreak: 30));
      final context = PromptSelectionContext(/* ... */);

      final shouldPersonalize = await engine._shouldShowPersonalized(user, context);

      expect(shouldPersonalize, isTrue);
    });

    test('falls back to general prompts if personalization fails', () async {
      when(aiService.generatePrompt(any)).thenThrow(Exception());

      final prompt = await engine.selectPrompt(userId: 'user_123', context: context);

      expect(prompt.type, 'general');
    });
  });
}
```

### Integration Tests

```dart
void main() {
  group('Prompt Selection Integration', () {
    testWidgets('complete 30-day track progression', (tester) async {
      for (int day = 1; day <= 30; day++) {
        final prompt = await engine.selectPrompt(/* ... */);
        expect((prompt as TrackPrompt).day, day);

        // Simulate user completing entry
        await userRepo.advanceTrackDay(userId);
      }
    });

    test('no duplicate prompts within cooldown period', () async {
      final shownPrompts = <String>{};

      for (int i = 0; i < 30; i++) {
        final prompt = await engine.selectPrompt(/* ... */);
        expect(shownPrompts.contains(prompt.id), isFalse);
        shownPrompts.add(prompt.id);
      }
    });
  });
}
```

## Performance Optimization

### Caching Strategy

```dart
class CachedPromptRepository implements PromptRepository {
  final PromptRepository _remote;
  final Cache _cache;

  @override
  Future<List<GeneralPrompt>> getGeneralPrompts({/* ... */}) async {
    final cacheKey = 'general_prompts_${pillar}_${difficulty}';

    // Try cache first
    final cached = await _cache.get(cacheKey);
    if (cached != null) return cached;

    // Fetch from Firestore
    final prompts = await _remote.getGeneralPrompts(/* ... */);

    // Cache for 24 hours
    await _cache.set(cacheKey, prompts, ttl: Duration(hours: 24));

    return prompts;
  }
}
```

### Query Optimization

- Use composite indexes for common queries
- Limit results to top 50 prompts
- Paginate user history if > 100 entries
- Preload track prompts for next 7 days

## Error Handling

```dart
try {
  return await selectPrompt(userId: userId, context: context);
} on PromptNotFoundException catch (e) {
  // Track prompt missing - log and fall back
  analytics.logError('track_prompt_missing', error: e);
  return _selectGeneralPrompt(user, context);
} on AIGenerationException catch (e) {
  // AI failed - fall back to general
  analytics.logError('ai_generation_failed', error: e);
  return _selectGeneralPrompt(user, context);
} on NetworkException catch (e) {
  // Network issue - use cached prompts
  analytics.logError('network_error', error: e);
  return _getCachedPrompt(userId);
} catch (e) {
  // Unknown error - use default
  analytics.logError('prompt_selection_unknown_error', error: e);
  return _getDefaultPrompt();
}
```

## Analytics Events

Track these events for optimization:

- `prompt_shown` - Which prompt was displayed
- `prompt_completed` - User finished entry
- `prompt_skipped` - User dismissed prompt
- `prompt_rated` - User provided feedback
- `personalized_triggered` - AI prompt generated
- `selection_failed` - Error in selection

## Cost Control

### AI Token Budget

```dart
class TokenBudgetService {
  static const MAX_TOKENS_PER_USER_PER_MONTH = 5000;
  static const MAX_TOKENS_PER_GENERATION = 150;

  Future<bool> canGeneratePrompt(String userId) async {
    final usage = await getMonthlyTokenUsage(userId);
    return usage + MAX_TOKENS_PER_GENERATION <= MAX_TOKENS_PER_USER_PER_MONTH;
  }

  Future<void> trackTokenUsage(String userId, int tokens) async {
    await db.collection('user_ai_usage').doc(userId).update({
      'monthly_tokens': FieldValue.increment(tokens),
      'last_generated': FieldValue.serverTimestamp(),
    });
  }
}
```

Target: <$0.20/user/month for AI features

## Summary

The Prompt Selection Engine provides:

- ✅ Intelligent 3-tier prompt selection
- ✅ AI-powered personalization with cost controls
- ✅ Weighted selection based on user preferences
- ✅ Cooldown management to prevent repetition
- ✅ Graceful fallbacks for all error cases
- ✅ Comprehensive analytics for optimization
- ✅ Offline-first with caching strategy

The engine is designed to deliver relevant, engaging prompts while maintaining strict cost controls and providing a delightful user experience.