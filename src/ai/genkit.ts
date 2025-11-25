import {genkit, Genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Lazy-initialized Genkit instance to avoid build-time errors
let aiInstance: Genkit | null = null;

export function getAI(): Genkit {
  if (!aiInstance) {
    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_GENAI_API_KEY is not configured');
    }
    aiInstance = genkit({
      plugins: [googleAI({ apiKey })],
      model: 'googleai/gemini-1.5-flash',
    });
  }
  return aiInstance;
}

// For backwards compatibility
export const ai = {
  generate: async (options: Parameters<Genkit['generate']>[0]) => {
    return getAI().generate(options);
  }
};

export function isAIConfigured(): boolean {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  return !!apiKey && apiKey !== 'your-gemini-api-key-here';
}
