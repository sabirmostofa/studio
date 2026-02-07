"use client";

import { useEffect, useState } from "react";
import {
  FileCode,
  FileImage,
  FileText,
  Loader2,
  Type,
  Wand2,
} from "lucide-react";

import { generateCvFromRawInput, generateStyles } from "@/app/actions";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { initialCvHtml } from "@/lib/initial-cv-html";
import { initialCvCss } from "@/lib/initial-cv-css";
import { hexToHsl, hslToHex } from "@/lib/utils";

type InputType = "text" | "html" | "image";

export default function Home() {
  const [cvHtml, setCvHtml] = useState(initialCvHtml);
  const [textCv, setTextCv] = useState(
    "Mila Allen, Startup Founder, based in Denver..."
  );
  const [imageCv, setImageCv] = useState<string | null>(null);
  const [inputType, setInputType] = useState<InputType>("html");
  const [additionalSuggestions, setAdditionalSuggestions] = useState("");

  const [generatedCss, setGeneratedCss] = useState(initialCvCss);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [primaryColor, setPrimaryColor] = useState({ h: 162, s: 44, l: 47 });
  const [backgroundColor, setBackgroundColor] = useState({
    h: 220,
    s: 17,
    l: 95,
  });
  const [accentColor, setAccentColor] = useState({ h: 145, s: 45, l: 58 });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary",
      `${primaryColor.h} ${primaryColor.s}% ${primaryColor.l}%`
    );
  }, [primaryColor]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background",
      `${backgroundColor.h} ${backgroundColor.s}% ${backgroundColor.l}%`
    );
  }, [backgroundColor]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--accent",
      `${accentColor.h} ${accentColor.s}% ${accentColor.l}%`
    );
  }, [accentColor]);

  const handleColorChange =
    (setter: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const hsl = hexToHsl(e.target.value);
      if (hsl) {
        setter(hsl);
      }
    };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageCv(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    let result;

    if (inputType === "html") {
      result = await generateStyles(cvHtml, additionalSuggestions);
      if (result.success && result.css) {
        setGeneratedCss(result.css);
      }
    } else if (inputType === "text") {
      result = await generateCvFromRawInput(
        "text",
        textCv,
        additionalSuggestions
      );
      if (result.success && result.html && result.css) {
        setCvHtml(result.html);
        setGeneratedCss(result.css);
      }
    } else if (inputType === "image" && imageCv) {
      result = await generateCvFromRawInput(
        "image",
        imageCv,
        additionalSuggestions
      );
      if (result.success && result.html && result.css) {
        setCvHtml(result.html);
        setGeneratedCss(result.css);
      }
    }

    if (result?.success) {
      toast({
        title: "Success!",
        description: "Your CV has been generated.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          result?.error || "There was a problem with your request.",
      });
    }
    setIsLoading(false);
  };

  const handleDownloadPdf = () => {
    const iframe = document.getElementById('cv-preview-iframe') as HTMLIFrameElement | null;
    if (iframe?.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } else {
      toast({
        variant: "destructive",
        title: "Could not generate PDF.",
        description: "Preview iframe not found.",
      });
    }
  };

  const iframeSrcDoc = `
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css2?family=Alegreya&family=Belleza&display=swap" rel="stylesheet">
        <style>
          :root {
            --background: ${backgroundColor.h} ${backgroundColor.s}% ${backgroundColor.l}%;
            --foreground: 220 10% 20%;
            --card: 220 17% 100%;
            --card-foreground: 220 10% 20%;
            --popover: 220 17% 100%;
            --popover-foreground: 220 10% 20%;
            --primary: ${primaryColor.h} ${primaryColor.s}% ${primaryColor.l}%;
            --primary-foreground: 210 40% 98%;
            --secondary: 220 16% 91%;
            --secondary-foreground: 220 10% 20%;
            --muted: 220 16% 91%;
            --muted-foreground: 220 9% 45%;
            --accent: ${accentColor.h} ${accentColor.s}% ${accentColor.l}%;
            --accent-foreground: 210 40% 98%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 0 0% 98%;
            --border: 220 13% 85%;
            --input: 220 13% 90%;
            --ring: 213 31% 50%;
          }
          body { 
            opacity: 0; 
            transition: opacity 0.5s ease-in-out;
            background-color: hsl(var(--background));
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
        ${cvHtml}
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
            <Tabs
              value={inputType}
              onValueChange={(value) => setInputType(value as InputType)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html">
                  <FileCode className="mr-2" />
                  HTML
                </TabsTrigger>
                <TabsTrigger value="text">
                  <Type className="mr-2" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="image">
                  <FileImage className="mr-2" />
                  Image
                </TabsTrigger>
              </TabsList>
              <TabsContent value="html" className="mt-4">
                <Label htmlFor="cv-html" className="text-lg font-headline">
                  Your CV HTML
                </Label>
                 <p className="text-sm text-muted-foreground mb-2">
                  Paste the body content of your CV's HTML below.
                </p>
                <Textarea
                  id="cv-html"
                  value={cvHtml}
                  onChange={(e) => setCvHtml(e.target.value)}
                  className="flex-grow h-[40vh] min-h-[300px] font-mono text-sm resize-none"
                  placeholder="Paste your CV's HTML body here..."
                />
              </TabsContent>
              <TabsContent value="text" className="mt-4">
                <Label htmlFor="cv-text" className="text-lg font-headline">
                  Your CV Text
                </Label>
                 <p className="text-sm text-muted-foreground mb-2">
                  Paste the entire text content of your CV below.
                </p>
                <Textarea
                  id="cv-text"
                  value={textCv}
                  onChange={(e) => setTextCv(e.target.value)}
                  className="flex-grow h-[40vh] min-h-[300px] text-sm resize-none"
                  placeholder="Paste your CV text here..."
                />
              </TabsContent>
              <TabsContent value="image" className="mt-4">
                <Label htmlFor="cv-image" className="text-lg font-headline">
                  Your CV Image
                </Label>
                 <p className="text-sm text-muted-foreground mb-2">
                  Upload an image of your CV.
                </p>
                <Input
                  id="cv-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-4"
                />
                {imageCv && (
                  <div className="p-2 border rounded-md max-h-[26vh] overflow-auto">
                    <img
                      src={imageCv}
                      alt="CV preview"
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="space-y-2 pt-4">
              <Label htmlFor="suggestions" className="text-lg font-headline">
                Styling Suggestions
              </Label>
              <p className="text-sm text-muted-foreground">
                Enter any specific styling requests, e.g., "Make the headings
                green" or "Use a serif font for the body text."
              </p>
              <Textarea
                id="suggestions"
                value={additionalSuggestions}
                onChange={(e) => setAdditionalSuggestions(e.target.value)}
                className="h-24 text-sm resize-none"
                placeholder="Enter styling suggestions here..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 flex-wrap">
              <Button
                onClick={handleGenerate}
                disabled={isLoading || (inputType === "image" && !imageCv)}
                className="w-full sm:w-auto"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate CV
              </Button>
              <Button
                onClick={handleDownloadPdf}
                variant="outline"
                disabled={!generatedCss}
                className="w-full sm:w-auto"
                size="lg"
              >
                <FileText className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
            <div className="space-y-4 pt-8">
              <h3 className="text-lg font-headline">Theme Customization</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <Input
                    id="primary-color"
                    type="color"
                    value={hslToHex(
                      primaryColor.h,
                      primaryColor.s,
                      primaryColor.l
                    )}
                    onChange={handleColorChange(setPrimaryColor)}
                    className="p-1 h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background-color">Background Color</Label>
                  <Input
                    id="background-color"
                    type="color"
                    value={hslToHex(
                      backgroundColor.h,
                      backgroundColor.s,
                      backgroundColor.l
                    )}
                    onChange={handleColorChange(setBackgroundColor)}
                    className="p-1 h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <Input
                    id="accent-color"
                    type="color"
                    value={hslToHex(
                      accentColor.h,
                      accentColor.s,
                      accentColor.l
                    )}
                    onChange={handleColorChange(setAccentColor)}
                    className="p-1 h-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 lg:h-[calc(100vh - 12rem)] min-h-[480px]">
            <Label className="text-lg font-headline">Preview</Label>
            <Card className="h-full w-full overflow-hidden shadow-lg border-2">
              <CardContent className="p-0 h-full">
                {isLoading && !generatedCss ? (
                   <div className="flex items-center justify-center h-full text-muted-foreground">
                    <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                    <p>Generating your CV...</p>
                  </div>
                ) : cvHtml ? (
                  <iframe
                    id="cv-preview-iframe"
                    srcDoc={iframeSrcDoc}
                    title="CV Preview"
                    className="w-full h-full border-0"
                    key={`${cvHtml}${generatedCss}${primaryColor.h}${backgroundColor.h}${accentColor.h}`}
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
