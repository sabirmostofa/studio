'use server';
/**
 * @fileOverview Converts raw CV data from text or an image into a structured HTML format.
 *
 * - convertCvToHtml - A function that takes CV text or image data and returns structured HTML.
 * - ConvertCvToHtmlInput - The input type for the convertCvToHtml function.
 * - ConvertCvToHtmlOutput - The return type for the convertCvToHtml function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ConvertCvToHtmlInputSchema = z.object({
  cvText: z.string().optional().describe('The text content of the CV.'),
  cvImageDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the CV as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ConvertCvToHtmlInput = z.infer<typeof ConvertCvToHtmlInputSchema>;

const ConvertCvToHtmlOutputSchema = z.object({
  cvHtml: z.string().describe('The structured HTML content of the CV.'),
});
export type ConvertCvToHtmlOutput = z.infer<typeof ConvertCvToHtmlOutputSchema>;

export async function convertCvToHtml(input: ConvertCvToHtmlInput): Promise<ConvertCvToHtmlOutput> {
  return convertCvToHtmlFlow(input);
}

const prompt = ai.definePrompt({
  name: 'convertCvToHtmlPrompt',
  input: { schema: ConvertCvToHtmlInputSchema },
  output: { schema: ConvertCvToHtmlOutputSchema },
  prompt: `You are an expert in parsing and structuring CV information. Your task is to convert the provided CV content (from text or an image) into a well-structured HTML document for styling. The HTML must follow a specific two-column layout.

**Output:**
A single HTML string for the body of the document.

**Required HTML Structure:**
The output HTML **MUST** use the following structure and CSS classes. Do not deviate from this structure.

\`\`\`html
<div class="cv-wrapper">
  <aside class="sidebar">
    <!-- Contact info, skills, achievements, interests go here -->
    <section>
      <h2>CONTACTS</h2>
      <ul class="contact-list">
        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> email@example.com</li>
        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 555-123-4567</li>
        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> City, Country</li>
        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> portfolio.com</li>
      </ul>
    </section>
    <section>
      <h2>SKILLS</h2>
      <ul class="skills-list">
        <li>Skill 1</li>
        <li>Skill 2</li>
      </ul>
    </section>
  </aside>
  <main class="main-content">
    <header class="cv-header">
      <h1>[Full Name]</h1>
      <div class="subtitle">[Job Title | Tagline]</div>
    </header>
    <section>
      <h2>SUMMARY</h2>
      <p>A brief summary of the person's career.</p>
    </section>
    <section class="experience">
      <h2>EXPERIENCE</h2>
      <div class="job">
        <div class="job-header">
          <h3>Job Title</h3>
          <span>City, Country</span>
        </div>
        <div class="job-subheader">
          <h4>Company Name</h4>
          <span>MM/YYYY - MM/YYYY</span>
        </div>
        <ul>
          <li>Responsibility or achievement.</li>
        </ul>
        <div class="impact-highlight">
            <p><strong>Key Impact:</strong> A brief, highlighted achievement or impact statement related to the role.</p>
        </div>
      </div>
    </section>
    <section>
      <h2>EDUCATION</h2>
       <div class="education-item">
        <div class="education-header">
          <h3>University Name</h3>
          <span>City, Country</span>
        </div>
        <div class="education-subheader">
          <h4>Degree</h4>
          <span>MM/YYYY - MM/YYYY</span>
        </div>
      </div>
    </section>
  </main>
</div>
\`\`\`

**Instructions:**
1.  Analyze the input (text or image) to identify all standard CV sections: Name, Contact, Summary, Experience, Education, Skills, etc.
2.  If the input is an image, use OCR to extract the text.
3.  For the **Contact** section, you **MUST** include an appropriate inline SVG icon before each contact item. Infer the correct icon from the contact type (email, phone, location, website/portfolio, LinkedIn, etc.). The SVGs must be 24x24 and use \`currentColor\` for the stroke. The example HTML shows the required SVG structure for email, phone, location, and portfolio. Use similar SVGs for other types.
4.  Place the "contact", "skills", "achievements", and "interests" into the \`<aside class="sidebar">\`.
5.  Place the "name", "summary", "experience", "education", and "training/courses" into the \`<main class="main-content">\`.
6.  For the **Experience** section, if a job description contains a special highlighted summary of impact or key achievements (like "Digitisation & Impact" in an example), place it inside a \`<div class="impact-highlight">\` within the corresponding \`<div class="job">\`. It should come after the \`<ul>\` of responsibilities.
7.  Use \`<h1>\` for the person's name and \`<div class="subtitle">\` for their title or tagline.
8.  Use \`<h2>\` for section titles.
9.  Use \`<ul>\` and \`<li>\` for lists. For the experience section, use the \`<div class="job">\` structure shown.
10. Do **not** include a profile picture, even if one is present in the source material.
11. Generate **ONLY** the HTML code for the content inside the \`<body>\` tag. Do not add any explanations, comments, or markdown.

**CV Input:**
{{#if cvText}}
{{{cvText}}}
{{else if cvImageDataUri}}
{{media url=cvImageDataUri}}
{{/if}}
`,
});

const convertCvToHtmlFlow = ai.defineFlow(
  {
    name: 'convertCvToHtmlFlow',
    inputSchema: ConvertCvToHtmlInputSchema,
    outputSchema: ConvertCvToHtmlOutputSchema,
  },
  async (input) => {
    if (!input.cvText && !input.cvImageDataUri) {
      throw new Error('Either CV text or image data must be provided.');
    }
    const { output } = await prompt(input);
    return output!;
  }
);
