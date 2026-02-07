"use server";

import { convertCvToHtml } from "@/ai/flows/convert-cv-to-html";
import { suggestStyleImprovements } from "@/ai/flows/suggest-style-improvements";

export async function generateCvFromRawInput(
  inputType: 'text' | 'image',
  content: string, // text or data URI
  styleSuggestions?: string
) {
  try {
    const { cvHtml } = await convertCvToHtml({
      [inputType === 'text' ? 'cvText' : 'cvImageDataUri']: content,
    });

    if (!cvHtml) {
      return { success: false, error: "The AI could not convert your input to HTML." };
    }
    
    const styleResult = await generateStyles(cvHtml, styleSuggestions);

    if (styleResult.success) {
      return { success: true, css: styleResult.css, html: cvHtml };
    } else {
      return { success: false, error: styleResult.error, html: cvHtml };
    }
  } catch (error) {
    console.error("Error generating CV from raw input:", error);
    return { success: false, error: "An unexpected error occurred while generating the CV." };
  }
}

export async function generateStyles(cvHtml: string, suggestions?: string) {
  try {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CV</title>
</head>
<body>
  ${cvHtml}
</body>
</html>`;

    const result = await suggestStyleImprovements({ cvHtml: fullHtml, suggestions });
    if (!result.styleSuggestions) {
      return { success: false, error: "The AI did not return any style suggestions." };
    }
    return { success: true, css: result.styleSuggestions };
  } catch (error) {
    console.error("Error generating styles:", error);
    return { success: false, error: "An unexpected error occurred while generating styles." };
  }
}
