// Re-export AI instance from genkit config
export { ai } from '@/ai/genkit';

// Export all flows
export {
  generateDailyPrompt,
  generateWeeklyReflection,
  generateChadInsight,
  generateJournalSuggestions,
} from './journalFlows';
