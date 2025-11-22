'use server';

import { aiChadGPT } from '@/ai/flows/ai-chadgpt';
import { generateWeeklyReflections } from '@/ai/flows/generate-weekly-reflections';
import { journalEntries } from '@/lib/data';
import type { JournalEntry } from '@/lib/types';

type ActionState = {
  advice: string;
  error: string | null;
};

export async function getAIChadGPTAction(prevState: ActionState, formData: FormData) {
  const query = formData.get('query') as string;
  if (!query) {
    return { advice: '', error: 'Please enter a question.' };
  }

  try {
    const { advice } = await aiChadGPT({ query });
    return { advice, error: null };
  } catch (error) {
    console.error(error);
    return { advice: '', error: 'Failed to get coaching advice. Please try again.' };
  }
}

export async function getWeeklyReflectionAction() {
  try {
    const entriesToReflect = journalEntries.slice(0, 5);
    const result = await generateWeeklyReflections({
      journalEntries: JSON.stringify(
        entriesToReflect.map((entry: JournalEntry) => ({
          date: entry.date,
          content: entry.content,
          mood: entry.mood,
        }))
      ),
    });
    return { ...result, error: null };
  } catch (error) {
    console.error(error);
    return { summary: '', insights: '', error: 'Failed to generate reflections. Please try again.' };
  }
}
