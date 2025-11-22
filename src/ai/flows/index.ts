import { configureGenkit } from '@genkit-ai/core';
import { googleGenAI } from '@genkit-ai/google-genai';
import {
  generateDailyPrompt,
  generateWeeklyReflection,
  generateChadInsight,
  generateJournalSuggestions
} from './journalFlows';

// Configure Genkit with Google Generative AI
export const ai = configureGenkit({
  plugins: [
    googleGenAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
});

// Export all flows
export {
  generateDailyPrompt,
  generateWeeklyReflection,
  generateChadInsight,
  generateJournalSuggestions,
};