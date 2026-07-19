"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Copy, 
  Check, 
  Trash2,
  Settings2,
  Link2,
  ListFilter
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

type Separator = "hyphen" | "underscore";

export default function TextSlugClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  
  // Settings State
  const [separator, setSeparator] = useState<Separator>("hyphen");
  const [lowercase, setLowercase] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  
  // Analytics State
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  // SEO Stop Words Dictionary
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "as", "is", "it"
  ]);

  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      setLineCount(0);
      return;
    }

    const lines = inputText.split("\n");
    setLineCount(lines.length);

    const sepChar = separator === "hyphen" ? "-" : "_";

    const processedLines = lines.map(line => {
      if (!line.trim()) return ""; // Preserve empty lines in bulk processing

      let slug = line;

      // 1. Lowercase (if enabled)
      if (lowercase) {
        slug = slug.toLowerCase();
      }

      // 2. Remove Accents / Diacritics (e.g., café -> cafe)
      slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // 3. Remove Numbers (if enabled)
      if (removeNumbers) {
        slug = slug.replace(/[0-9]/g, "");
      }

      // 4. Remove Stop Words (if enabled)
      if (removeStopWords) {
        // We split by non-alphanumeric to check words cleanly
        const words = slug.split(/[^a-zA-Z0-9]+/);
        slug = words.filter(word => !stopWords.has(word.toLowerCase())).join(" ");
      }

      // 5. Replace all remaining non-alphanumeric characters with the separator
      slug = slug.replace(/[^a-zA-Z0-9]+/g, sepChar);

      // 6. Clean up multiple separators and trim edges
      const multiSepRegex = new RegExp(`\\${sepChar}+`, "g");
      slug = slug.replace(multiSepRegex, sepChar);
      
      const edgeSepRegex = new RegExp(`^\\${sepChar}+|\\${sepChar}+$`, "g");
      slug = slug.replace(edgeSepRegex, "");

      return slug;
    });

    setOutputText(processedLines.join("\n"));
  }, [inputText, separator, lowercase, removeNumbers, removeStopWords]);

  const clearAll = () => {
    setInputText("");
    setOutputText("");
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        The Text to Slug converter is a developer and SEO utility that transforms standard readable titles into clean, URL-safe strings. It automatically strips out special characters, removes accents (e.g., transforming "café" to "cafe"), and replaces spaces with your choice of hyphens or underscores.
      </p>
      <p>
        Unlike simple generators, this tool supports <strong>Bulk Line-by-Line Processing</strong>. You can paste a list of 100 blog article titles and instantly generate 100 clean routing slugs. It also features an advanced SEO mode to automatically strip filler "stop words" (like <em>a, and, the</em>) to keep your URLs concise and keyword-dense.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Input Text",
      description: "Paste a single title or a multi-line list of titles into the Original Text panel.",
    },
    {
      title: "Select Separator",
      description: "Choose whether you want words separated by hyphens (best for SEO) or underscores (best for variable naming).",
    },
    {
      title: "Apply SEO Modifiers",
      description: "Toggle 'Remove Stop Words' to automatically delete filler words and make your slugs shorter and more search-engine friendly.",
    },
  ];

  const faqs = [
    {
      question: "Should I use hyphens or underscores for SEO?",
      answer: "Hyphens (-) are strongly recommended by Google for URLs. Search engines treat hyphens as space replacements, meaning 'my-new-post' is read as 'my new post'. Underscores (_) join words together, so 'my_new_post' is read as 'mynewpost'.",
    },
    {
      question: "What are 'Stop Words'?",
      answer: "Stop words are extremely common words (like 'a', 'the', 'is', 'at') that don't add semantic value to a search phrase. Removing them keeps your URL slugs short and focused purely on the important keywords.",
    },
    {
      question: "Does this support bulk conversion?",
      answer: "Yes! If you paste a list separated by line breaks, the tool will individually slugify every single line while preserving your list's order and structure.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="px-6 py-12 text-center sm:py-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Utilities
        </Link>
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Text to <span className="text-blue-400">Slug</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Convert titles and strings into clean, SEO-friendly URLs instantly.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          {/* Header Control Panel */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/20 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <Link2 className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">URL Slugifier</h2>
            </div>
            
            <button
              onClick={clearAll}
              disabled={!inputText}
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm transition-all hover:bg-red-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            
            {/* LEFT SIDE: Inputs and Outputs */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800">Original Title(s)</label>
                  {lineCount > 1 && (
                    <span className="text-xs font-bold text-slate-500">{lineCount} Lines Detected</span>
                  )}
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your titles here (one per line for bulk processing)..."
                  className="h-[200px] sm:h-[300px] lg:h-[400px] w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
                />
              </div>

              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800">Generated Slug(s)</label>
                  <button
                    onClick={copyToClipboard}
                    disabled={!outputText}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${copied ? "bg-emerald-600" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} 
                    {copied ? "Copied" : "Copy Result"}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={outputText}
                  placeholder="your-clean-seo-slugs-will-appear-here"
                  className="h-[200px] sm:h-[300px] lg:h-[400px] w-full resize-none rounded-xl border border-slate-300 bg-slate-100 p-4 font-mono text-sm text-slate-900 focus:outline-none shadow-inner custom-scrollbar"
                />
              </div>
            </div>

            {/* RIGHT SIDE: Configuration Panel */}
            <div className="flex flex-col space-y-5 h-full">
              
              {/* Separator Box */}
              <div className="rounded-xl border border-slate-300 bg-slate-100/50 p-4 shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-2.5 text-slate-800 mb-3">
                  <ListFilter className="h-4 w-4" />
                  <h3 className="font-bold text-sm">Separator Style</h3>
                </div>

                <div className="flex bg-slate-200/60 rounded-lg p-1 border border-slate-300">
                  <button
                    onClick={() => setSeparator("hyphen")}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${separator === "hyphen" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    Hyphen (-)
                  </button>
                  <button
                    onClick={() => setSeparator("underscore")}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${separator === "underscore" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    Underscore (_)
                  </button>
                </div>
              </div>

              {/* Modifiers Box */}
              <div className="rounded-xl border border-slate-300 bg-slate-100/50 p-4 shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-2.5 text-slate-800 mb-3">
                  <Settings2 className="h-4 w-4" />
                  <h3 className="font-bold text-sm">Format Modifiers</h3>
                </div>

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                    <span>Force Lowercase</span>
                    <input
                      type="checkbox"
                      checked={lowercase}
                      onChange={(e) => setLowercase(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                    <span>Remove Numbers</span>
                    <input
                      type="checkbox"
                      checked={removeNumbers}
                      onChange={(e) => setRemoveNumbers(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800" title="Removes filler words like 'a', 'and', 'the' for cleaner URLs.">
                    <span>Remove Stop Words (SEO)</span>
                    <input
                      type="checkbox"
                      checked={removeStopWords}
                      onChange={(e) => setRemoveStopWords(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <ToolInfo 
        aboutDescription={aboutDescription}
        howTo={howToSteps}
        faqs={faqs}
      />
    </div>
  );
}