'use server';
/**
 * @fileOverview AI-powered weekly reflections on journal entries.
 *
 * - generateWeeklyReflections - A function that generates weekly reflections.
 * - GenerateWeeklyReflectionsInput - The input type for the generateWeeklyReflections function.
 * - GenerateWeeklyReflectionsOutput - The return type for the generateWeeklyReflections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWeeklyReflectionsInputSchema = z.object({
  journalEntries: z.string().describe('A JSON string of the user\'s journal entries for the week.'),
});
export type GenerateWeeklyReflectionsInput = z.infer<typeof GenerateWeeklyReflectionsInputSchema>;

const GenerateWeeklyReflectionsOutputSchema = z.object({
  summary: z.string().describe('A summary of the week\'s journal entries.'),
  insights: z.string().describe('Insights and areas for improvement based on the journal entries.'),
});
export type GenerateWeeklyReflectionsOutput = z.infer<typeof GenerateWeeklyReflectionsOutputSchema>;

export async function generateWeeklyReflections(
  input: GenerateWeeklyReflectionsInput
): Promise<GenerateWeeklyReflectionsOutput> {
  return generateWeeklyReflectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWeeklyReflectionsPrompt',
  input: {schema: GenerateWeeklyReflectionsInputSchema},
  output: {schema: GenerateWeeklyReflectionsOutputSchema},
  prompt: `You are a stoic philosopher providing weekly reflections on a user's journal entries. Analyze the journal entries and provide a summary of the week and insights for improvement.

Journal Entries: {{{journalEntries}}}`,
});

const generateWeeklyReflectionsFlow = ai.defineFlow(
  {
    name: 'generateWeeklyReflectionsFlow',
    inputSchema: GenerateWeeklyReflectionsInputSchema,
    outputSchema: GenerateWeeklyReflectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
