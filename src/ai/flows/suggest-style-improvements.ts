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
  prompt: `You are an expert CSS designer. Your task is to create a stylesheet for a CV based on the provided HTML. The final design should look like a professional, modern, two-column CV format.

  **Layout:**
  - The CV must have a two-column layout using flexbox or grid. The main container is \`.cv-wrapper\`.
  - The left column (\`aside.sidebar\`) should be approximately 30% of the total width.
  - The right column (\`main.main-content\`) should be approximately 70% of the total width.
  - The left column has a light teal background (e.g., #e8f5f4) and padding (e.g., 2rem).
  - The right column has a white background and padding.

  **Header (Right Column):**
  - The name (\`h1\`) should be large, bold, and dark grey. Use the font 'Belleza'.
  - The subtitle (\`.subtitle\`) should be inside a rounded rectangle with a teal background (e.g., #a7d8d4), white text, and padding. It should be uppercase and have letter spacing.

  **Left Column:**
  - The profile picture (\`.profile-pic\`) must be circular (border-radius: 50%).
  - Section headings (\`h2\`) in the left column should be uppercase, a dark teal color, and have a border-bottom.
  - The contact list icons (\`ul.contact-list svg\`) should be small (e.g., 16px) and vertically aligned with the text.
  - Skills should be presented as a simple list.
  - Key achievements (\`.achievements-list\`) should have a small icon (like a bullet point) before each \`h3\`.

  **Right Column:**
  - Section headings (\`h2\`) should be uppercase, a dark teal color (e.g., #4db6ac). They should have a border-bottom.
  - Experience section (\`.experience .job\`):
    - Use flexbox to align job title/location and company/dates on separate lines but with items spaced out.
    - Job titles (\`h3\`) should be bold.
  - Languages section (\`.language-item\`) should show proficiency with filled and empty dots. Use flexbox. \`.dot.filled\` should have a background color.

  **General Typography & Colors:**
  - Body font: 'Alegreya', a serif font.
  - Heading font: 'Belleza', a sans-serif font.
  - Primary color (teals): #a7d8d4 (light), #4db6ac (medium), #2F7C76 (dark).
  - Text color: Dark grey (e.g., #333) for body, slightly lighter for subheadings.
  - Lists should not have default browser styling (list-style: none; padding: 0).

  Please generate ONLY the CSS code to style the following HTML:
  \`\`\`html
  {{{cvHtml}}}
  \`\`\`
  Do not include the \`\`\`css markdown specifier in your output. Just return the raw CSS.
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
