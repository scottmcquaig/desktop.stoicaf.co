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

// Proxy object that lazily initializes AI and forwards all method calls
// This allows the old `ai.generate()`, `ai.defineFlow()`, etc. patterns to work
export const ai: Genkit = new Proxy({} as Genkit, {
  get(_, prop: keyof Genkit) {
    const instance = getAI();
    const value = instance[prop];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  }
});

export function isAIConfigured(): boolean {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  return !!apiKey && apiKey !== 'your-gemini-api-key-here';
}
