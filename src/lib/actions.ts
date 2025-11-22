'use server';

import { aiChadGPT } from '@/ai/flows/ai-chadgpt';
import { generateWeeklyReflections } from '@/ai/flows/generate-weekly-reflections';
import { journalEntries } from '@/lib/data';
import type { JournalEntry } from '@/lib/types';

type ActionState = {
  advice: string;
  error: string | null;
};

// Helper to extract content from entry blocks
function getEntryContent(entry: JournalEntry): string {
  if (!entry.blocks || entry.blocks.length === 0) return '';

  return entry.blocks
    .map((block) => {
      if (block.type === 'dichotomy') {
        const parts = [];
        if (block.inControl) parts.push(`In my control: ${block.inControl}`);
        if (block.notInControl) parts.push(`Not in my control: ${block.notInControl}`);
        return parts.join('\n');
      }
      return block.content || '';
    })
    .filter(Boolean)
    .join('\n\n');
}

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
          content: getEntryContent(entry),
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
