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
  suggestions: z.string().optional().describe('Additional styling suggestions from the user.'),
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

**Color Palette:**
Use hsl() CSS functions with the CSS variables available from the theme for all colors. The primary colors you MUST use are:
- \`--primary\`: For main headers and important elements.
- \`--background\`: For the main page background (outside the CV card).
- \`--accent\`: For highlights and subtitles.
- \`--sidebar-bg\`: For the background of the left sidebar column.
- Standard theme variables like \`--foreground\`, \`--card\`, \`--border\`, \`--muted\` etc. are also available for other elements.

**Instructions:**
  1.  **Base Styles:**
      - Set \`box-sizing: border-box;\` on all elements.
      - Set basic font styles on the \`body\`. Use 'Alegreya' as the font family. Use \`background-color: hsl(var(--background));\` and \`color: hsl(var(--foreground));\`.
      - Remove default margin, padding, and list-style from \`ul\` and \`li\`.
  2.  **Fonts:**
      - Use 'Belleza' for headings (\`h1\`, \`h2\`, \`h3\`).
  3.  **Main Layout (\`.cv-wrapper\`):**
      - Use \`display: flex;\`.
      - It should have a max-width and be centered (e.g. \`max-width: 900px; margin: 2rem auto;\`). Add a subtle box-shadow. Use \`background-color: hsl(var(--card));\`.
  4.  **Left Column (\`.sidebar\`):**
      - Set \`flex-basis: 35%;\` and \`flex-shrink: 0;\`.
      - Use \`background-color: hsl(var(--sidebar-bg));\` for its background, and add padding (e.g., 1.5rem).
  5.  **Right Column (\`.main-content\`):**
      - Set \`flex-basis: 65%;\` and \`flex-grow: 1;\`.
      - Give it padding (e.g., 1.5rem).
  6.  **Headings:**
      - Style \`h1\` to be large and bold.
      - Style section headings (\`h2\`) to be uppercase, with \`color: hsl(var(--primary));\` and a \`border-bottom\` using \`hsl(var(--border));\`.
  7.  **Subtitle (\`.subtitle\`):**
      - Make it stand out. Use \`background-color: hsl(var(--accent));\` and \`color: hsl(var(--accent-foreground));\`, and add padding.
  8.  **Lists (\`ul.contact-list\`, \`.skills-list\` etc):**
      - Style items (\`li\`) with proper spacing. For the contact list, use flexbox to align the SVG icon with the text vertically (\`align-items: center\`).
  9.  **Experience Section (\`.job-header\`, \`.job-subheader\`):**
      - Use \`display: flex;\` with \`justify-content: space-between;\` to place elements on opposite ends.
  10. **Language Dots (\`.language-item\`, \`.dots\`):**
      - Use flexbox. Style \`.dot.filled\` with \`background-color: hsl(var(--primary));\` and \`.dot\` (unfilled) with a border using \`hsl(var(--border));\`.
  11. **Impact Highlight (\`.impact-highlight\`):**
      - Style this to stand out. Give it a light background color (e.g., \`hsl(var(--accent) / 0.1)\`), a thick left border using the primary color (\`border-left: 4px solid hsl(var(--primary))\`), and some padding.
  12. **Print Styles:**
      - Add a \`@media print\` block.
      - Inside, the print output MUST look identical to the screen view.
      - Add \`@page { size: A4; margin: 0; }\` to control the print page.
      - For the \`body\`, reset margins (\`margin: 0;\`) and ensure background colors and images are printed by adding \`-webkit-print-color-adjust: exact; print-color-adjust: exact;\`.
      - For the main \`.cv-wrapper\`, remove any margin, box-shadow, and border to ensure it fits the page cleanly. Set its width to \`100%\` and ensure its height adjusts to the content.
      - To prevent sections from awkwardly splitting across pages (if the content is long), add \`break-inside: avoid;\` to elements like \`section\`, \`.job\`, and \`.education-item\`.
      - Ensure all background colors (like on \`.sidebar\`, \`.subtitle\`, \`.dot.filled\`, etc.) are printed by applying \`-webkit-print-color-adjust: exact; print-color-adjust: exact;\` to them.
      - DO NOT alter the two-column flex layout or force text to black. The print view must match the screen view.

  Also, consider the following user suggestions for styling:
  {{{suggestions}}}

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
