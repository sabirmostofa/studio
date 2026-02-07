"use server";

import { suggestStyleImprovements } from "@/ai/flows/suggest-style-improvements";

export async function generateStyles(cvHtml: string) {
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

    const result = await suggestStyleImprovements({ cvHtml: fullHtml });
    if (!result.styleSuggestions) {
      return { success: false, error: "The AI did not return any style suggestions." };
    }
    return { success: true, css: result.styleSuggestions };
  } catch (error) {
    console.error("Error generating styles:", error);
    return { success: false, error: "An unexpected error occurred while generating styles." };
  }
}
