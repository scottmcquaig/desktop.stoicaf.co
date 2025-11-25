import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Schema for daily prompt generation
const DailyPromptSchema = z.object({
  prompt: z.string(),
  theme: z.string(),
  reflection: z.string(),
});

// Schema for weekly reflection
const WeeklyReflectionSchema = z.object({
  summary: z.string(),
  keyThemes: z.array(z.string()),
  insights: z.array(z.string()),
  growthAreas: z.array(z.string()),
  recommendations: z.array(z.string()),
});

// Schema for Chad insights
const ChadInsightSchema = z.object({
  insight: z.string(),
  tone: z.enum(['supportive', 'challenging', 'humorous', 'philosophical']),
  actionItems: z.array(z.string()),
});

type DailyPromptInput = {
  track: 'discipline' | 'money' | 'relationships' | 'ego';
  recentTopics?: string[];
  userId: string;
};

type WeeklyReflectionInput = {
  entries: Array<{ content: string; date: string; mood?: string }>;
  track: 'discipline' | 'money' | 'relationships' | 'ego';
  userId: string;
};

type ChadInsightInput = {
  entry: string;
  track: 'discipline' | 'money' | 'relationships' | 'ego';
  previousInsights?: string[];
  userId: string;
};

type JournalSuggestionsInput = {
  mood?: string;
  situation?: string;
  track: 'discipline' | 'money' | 'relationships' | 'ego';
};

/**
 * Generate a daily journal prompt based on user's track and recent entries
 */
export async function generateDailyPrompt(input: DailyPromptInput) {
  const prompt = `
    Generate a thoughtful daily journal prompt for someone on the ${input.track} track.
    ${input.recentTopics ? `Recent topics they've explored: ${input.recentTopics.join(', ')}` : ''}

    Create a prompt that:
    1. Is specific and actionable
    2. Encourages deep reflection
    3. Relates to their ${input.track} journey
    4. Builds on their recent reflections if available

    Respond with a JSON object containing:
    - prompt: The main journal prompt question
    - theme: The underlying theme (1-3 words)
    - reflection: A brief follow-up question for deeper thought
  `;

  const { text } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    config: {
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  return DailyPromptSchema.parse(JSON.parse(jsonMatch[0]));
}

/**
 * Generate weekly reflection summary from journal entries
 */
export async function generateWeeklyReflection(input: WeeklyReflectionInput) {
  const entriesText = input.entries
    .map((e) => `[${e.date}${e.mood ? ` - Mood: ${e.mood}` : ''}]: ${e.content}`)
    .join('\n\n');

  const prompt = `
    Analyze these journal entries from someone on the ${input.track} track:

    ${entriesText}

    Provide a comprehensive weekly reflection that:
    1. Summarizes the key developments
    2. Identifies recurring themes
    3. Highlights insights and breakthroughs
    4. Notes areas for growth
    5. Offers specific recommendations for the coming week

    Be supportive yet honest, focusing on growth and self-awareness.

    Respond with a JSON object containing:
    - summary: Brief overview of the week (2-3 sentences)
    - keyThemes: Array of main themes that emerged
    - insights: Array of key realizations or breakthroughs
    - growthAreas: Array of areas that need attention
    - recommendations: Array of specific actions for next week
  `;

  const { text } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    config: {
      temperature: 0.6,
      maxOutputTokens: 1000,
    },
  });

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  return WeeklyReflectionSchema.parse(JSON.parse(jsonMatch[0]));
}

/**
 * Generate Chad insights on journal entries
 * Chad is the motivational AI companion with a unique personality
 */
export async function generateChadInsight(input: ChadInsightInput) {
  const prompt = `
    You are Chad, a motivational AI companion with a unique personality.
    You're part life coach, part philosopher, part tough-love friend.

    Analyze this journal entry from someone on the ${input.track} track:
    "${input.entry}"

    ${input.previousInsights ? `Previous insights you've given: ${input.previousInsights.join('; ')}` : ''}

    Provide an insight that:
    1. Cuts through any self-deception or excuses
    2. Highlights what they might be missing
    3. Offers a fresh perspective
    4. Includes 1-3 specific action items

    Your tone can be supportive, challenging, humorous, or philosophical - choose what fits best.
    Be authentic, not generic. Challenge them to grow.

    Respond with a JSON object containing:
    - insight: Your main insight/response (2-4 sentences, conversational)
    - tone: The tone you're using (one of: supportive, challenging, humorous, philosophical)
    - actionItems: Array of 1-3 specific actions they should take
  `;

  const { text } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    config: {
      temperature: 0.8,
      maxOutputTokens: 600,
    },
  });

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  return ChadInsightSchema.parse(JSON.parse(jsonMatch[0]));
}

/**
 * Generate journal entry suggestions based on mood or situation
 */
export async function generateJournalSuggestions(input: JournalSuggestionsInput) {
  const context = input.mood
    ? `feeling ${input.mood}`
    : input.situation
      ? `dealing with ${input.situation}`
      : 'starting their journal';

  const prompt = `
    Someone on the ${input.track} track is ${context} and wants to journal.

    Provide:
    1. 3-5 specific topic suggestions they could write about
    2. A starter prompt to help them begin writing

    Make suggestions specific to their ${input.track} journey and current state.

    Respond with a JSON object containing:
    - suggestions: Array of 3-5 specific topics to explore
    - starterPrompt: A sentence starter to help them begin
  `;

  const { text } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    config: {
      temperature: 0.7,
      maxOutputTokens: 400,
    },
  });

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  return JSON.parse(jsonMatch[0]) as { suggestions: string[]; starterPrompt: string };
}
