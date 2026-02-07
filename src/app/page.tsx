"use client";

import { useState } from "react";
import { Download, Loader2, Wand2 } from "lucide-react";

import { generateStyles } from "@/app/actions";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { initialCvHtml } from "@/lib/initial-cv-html";

export default function Home() {
  const [cvHtml, setCvHtml] = useState(initialCvHtml);
  const [generatedCss, setGeneratedCss] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateStyles = async () => {
    setIsLoading(true);
    // Don't clear previous styles, to avoid flash of unstyled content
    // setGeneratedCss(""); 
    const result = await generateStyles(cvHtml);
    if (result.success && result.css) {
      setGeneratedCss(result.css);
      toast({
        title: "Success!",
        description: "New styles have been generated for your CV.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error || "There was a problem with your request.",
      });
    }
    setIsLoading(false);
  };

  const handleDownload = () => {
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alegreya&family=Belleza&display=swap" rel="stylesheet">
  <style>
    ${generatedCss}
  </style>
</head>
<body>
  ${cvHtml}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "styled-cv.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const iframeSrcDoc = `
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css2?family=Alegreya&family=Belleza&display=swap" rel="stylesheet">
        <style>
          body { 
            opacity: 0; 
            transition: opacity 0.5s ease-in-out;
            background-color: white;
          }
          ${generatedCss}
        </style>
        <script>
          window.addEventListener('load', () => {
            setTimeout(() => {
              document.body.style.opacity = 1;
            }, 50)
          });
        </script>
      </head>
      <body>
        <div class="cv-container">
         ${cvHtml}
        </div>
      </body>
    </html>
  `;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex items-center gap-3 h-16">
          <Logo className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-headline tracking-tight font-bold">
            CV Alchemist
          </h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cv-html" className="text-lg font-headline">
                Your CV HTML
              </Label>
              <p className="text-sm text-muted-foreground">
                Paste the body content of your CV's HTML below. The initial
                content is just an example.
              </p>
            </div>
            <Textarea
              id="cv-html"
              value={cvHtml}
              onChange={(e) => setCvHtml(e.target.value)}
              className="flex-grow h-[50vh] min-h-[400px] font-mono text-sm resize-none"
              placeholder="Paste your CV's HTML body here..."
            />
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                onClick={handleGenerateStyles}
                disabled={isLoading}
                className="w-full sm:w-auto"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Styles
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                disabled={!generatedCss}
                className="w-full sm:w-auto"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" />
                Download HTML
              </Button>
            </div>
          </div>
          <div className="space-y-2 lg:h-[calc(50vh+160px)] min-h-[480px]">
            <Label className="text-lg font-headline">Preview</Label>
            <Card className="h-full w-full overflow-hidden shadow-lg border-2">
              <CardContent className="p-0 h-full">
                {cvHtml ? (
                  <iframe
                    srcDoc={iframeSrcDoc}
                    title="CV Preview"
                    className="w-full h-full border-0"
                    key={generatedCss}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Preview will appear here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-4 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Powered by AI. Built with Next.js and Firebase.</p>
        </div>
      </footer>
    </div>
  );
}
