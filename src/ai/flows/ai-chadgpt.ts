'use server';

/**
 * @fileOverview This file defines the AI ChadGPT flow for providing Stoic advice.
 *
 * - aiChadGPT - An asynchronous function to get personalized Stoic advice.
 * - AIChadGPTInput - The input type for the aiChadGPT function, a string representing the user's question.
 * - AIChadGPTOutput - The output type for the aiChadGPT function, a string containing the AI's advice.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChadGPTInputSchema = z.object({
  query: z.string().describe('The user\u2019s question about implementing Stoicism in their daily life.'),
});
export type AIChadGPTInput = z.infer<typeof AIChadGPTInputSchema>;

const AIChadGPTOutputSchema = z.object({
  advice: z.string().describe('The AI\u2019s personalized advice for implementing Stoicism.'),
});
export type AIChadGPTOutput = z.infer<typeof AIChadGPTOutputSchema>;

export async function aiChadGPT(input: AIChadGPTInput): Promise<AIChadGPTOutput> {
  return aiChadGPTFlow(input);
}

const aiChadGPTPrompt = ai.definePrompt({
  name: 'aiChadGPTPrompt',
  input: {schema: AIChadGPTInputSchema},
  output: {schema: AIChadGPTOutputSchema},
  prompt: `You are a Stoic philosopher providing practical advice. Answer the user's question with clear, actionable steps rooted in Stoic principles.\n\nQuestion: {{{query}}}`,
});

const aiChadGPTFlow = ai.defineFlow(
  {
    name: 'aiChadGPTFlow',
    inputSchema: AIChadGPTInputSchema,
    outputSchema: AIChadGPTOutputSchema,
  },
  async input => {
    const {output} = await aiChadGPTPrompt(input);
    return output!;
  }
);
