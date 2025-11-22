import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Check if API key is configured
const apiKey = process.env.GOOGLE_GENAI_API_KEY;

export const ai = genkit({
  plugins: [googleAI({ apiKey })],
  model: 'googleai/gemini-1.5-flash',
});

export function isAIConfigured(): boolean {
  return !!apiKey && apiKey !== 'your-gemini-api-key-here';
}
