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
  prompt: `You are an expert CSS designer. Your task is to create a professional, modern, two-column CV stylesheet based on the provided HTML.

  **Instructions:**
  1.  **Base Styles:**
      - Set \`box-sizing: border-box;\` on all elements.
      - Set basic font styles on the \`body\`. Use 'Alegreya' as the font family.
      - Remove default margin, padding, and list-style from \`ul\` and \`li\`.
  2.  **Fonts:**
      - Use 'Belleza' for headings (\`h1\`, \`h2\`, \`h3\`).
  3.  **Main Layout (\`.cv-wrapper\`):**
      - Use \`display: flex;\`.
      - It should have a max-width and be centered (e.g. \`max-width: 900px; margin: 2rem auto;\`). Add a subtle box-shadow.
  4.  **Left Column (\`.sidebar\`):**
      - Set \`flex-basis: 35%;\` and \`flex-shrink: 0;\`.
      - Give it a light background color (e.g., #f3f4f6) and padding (e.g., 1.5rem).
  5.  **Right Column (\`.main-content\`):**
      - Set \`flex-basis: 65%;\` and \`flex-grow: 1;\`.
      - Give it padding (e.g., 1.5rem).
  6.  **Profile Picture (\`.profile-pic\`):**
      - Make it circular (\`border-radius: 50%;\`) and give it a max-width and center it.
  7.  **Headings:**
      - Style \`h1\` to be large and bold.
      - Style section headings (\`h2\`) to be uppercase, with a color and a \`border-bottom\`.
  8.  **Subtitle (\`.subtitle\`):**
      - Make it stand out. Uppercase text with a background color (e.g. #d1e2e1), dark text, and padding is a good approach.
  9.  **Lists (\`ul.contact-list\`, \`.skills-list\` etc):**
      - Style items (\`li\`) with proper spacing. For the contact list, use flexbox to align the SVG icon with the text vertically (\`align-items: center\`).
  10. **Experience Section (\`.job-header\`, \`.job-subheader\`):**
      - Use \`display: flex;\` with \`justify-content: space-between;\` to place elements on opposite ends.
  11. **Language Dots (\`.language-item\`, \`.dots\`):**
      - Use flexbox. Style \`.dot.filled\` with a background color and \`.dot\` (unfilled) with a border.

  Generate ONLY the CSS code to style the following HTML. Do not add any explanations or comments in the CSS.
  Do not include the \`\`\`css markdown specifier in your output. Just return the raw CSS.

  \`\`\`html
  {{{cvHtml}}}
  \`\`\`
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
