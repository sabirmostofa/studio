'use server';

/**
 * @fileOverview Analyzes CV content and suggests styling improvements for readability and visual appeal.
 *
 * - suggestStyleImprovements - A function that takes CV HTML content and returns CSS style suggestions.
 * - SuggestStyleImprovementsInput - The input type for the suggestStyleImprovements function.
 * - SuggestStyleImprovementsOutput - The return type for the suggestStyleImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestStyleImprovementsInputSchema = z.object({
  cvHtml: z.string().describe('The HTML content of the CV.'),
});
export type SuggestStyleImprovementsInput = z.infer<typeof SuggestStyleImprovementsInputSchema>;

const SuggestStyleImprovementsOutputSchema = z.object({
  styleSuggestions: z.string().describe('CSS style suggestions to improve the CV appearance and readability.'),
});
export type SuggestStyleImprovementsOutput = z.infer<typeof SuggestStyleImprovementsOutputSchema>;

export async function suggestStyleImprovements(input: SuggestStyleImprovementsInput): Promise<SuggestStyleImprovementsOutput> {
  return suggestStyleImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStyleImprovementsPrompt',
  input: {schema: SuggestStyleImprovementsInputSchema},
  output: {schema: SuggestStyleImprovementsOutputSchema},
  prompt: `You are an expert in CV styling and design. Analyze the provided CV HTML content and suggest CSS style improvements to enhance its visual appeal and readability, based on modern design principles.

Consider aspects such as typography, color palettes, layout, and spacing to create a professional and effective CV.

Ensure the suggested styles are compatible with standard HTML and CSS practices.

Here is the CV HTML content:

{{{cvHtml}}}
`,
});

const suggestStyleImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestStyleImprovementsFlow',
    inputSchema: SuggestStyleImprovementsInputSchema,
    outputSchema: SuggestStyleImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
