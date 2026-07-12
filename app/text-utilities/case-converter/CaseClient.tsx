"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  CaseUpper, 
  Trash2,
  Copy,
  Check,
  ArrowRightLeft
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

type CaseType = 
  | "lower" 
  | "upper" 
  | "title" 
  | "sentence" 
  | "camel" 
  | "pascal" 
  | "snake" 
  | "kebab" 
  | "constant" 
  | "inverse" 
  | "alternating";

export default function CaseClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType>("lower");
  const [copied, setCopied] = useState(false);

  // --- CONVERSION LOGIC ---
  const convertText = (text: string, type: CaseType) => {
    if (!text) return "";

    // Helper: Split into words for programming cases (strips punctuation)
    const getWords = (str: string) => str.match(/[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g) || str.split(/[^a-zA-Z0-9]+/);

    switch (type) {
      case "lower":
        return text.toLowerCase();
      
      case "upper":
        return text.toUpperCase();
      
      case "sentence":
        return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
      
      case "title":
        return text.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
      
      case "camel":
        return getWords(text)
          .map((word, index) => {
            const lower = word.toLowerCase();
            return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
          })
          .join("");
      
      case "pascal":
        return getWords(text)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join("");
      
      case "snake":
        return getWords(text).map((w) => w.toLowerCase()).join("_");
      
      case "kebab":
        return getWords(text).map((w) => w.toLowerCase()).join("-");
      
      case "constant":
        return getWords(text).map((w) => w.toUpperCase()).join("_");

      case "inverse":
        return text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');

      case "alternating":
        return text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
        
      default:
        return text;
    }
  };

  useEffect(() => {
    setOutputText(convertText(inputText, activeCase));
  }, [inputText, activeCase]);

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

  const cases: { id: CaseType; label: string; group: string }[] = [
    { id: "sentence", label: "Sentence case", group: "Standard" },
    { id: "lower", label: "lowercase", group: "Standard" },
    { id: "upper", label: "UPPERCASE", group: "Standard" },
    { id: "title", label: "Title Case", group: "Standard" },
    { id: "camel", label: "camelCase", group: "Programming" },
    { id: "pascal", label: "PascalCase", group: "Programming" },
    { id: "snake", label: "snake_case", group: "Programming" },
    { id: "kebab", label: "kebab-case", group: "Programming" },
    { id: "constant", label: "CONSTANT_CASE", group: "Programming" },
    { id: "inverse", label: "iNVERSE cASE", group: "Fun" },
    { id: "alternating", label: "aLtErNaTiNg CaSe", group: "Fun" },
  ];

  const aboutDescription = (
    <>
      <p className="mb-4">
        The Case Converter is a fast, versatile text formatting tool that transforms your input into standard grammatical formats or common programming naming conventions. 
      </p>
      <p>
        Whether you accidentally left Caps Lock on while typing an email, or you need to convert a standard English sentence into <code>camelCase</code> for a JavaScript variable, this tool parses and converts your text instantly directly in your browser.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Input your Text",
      description: "Paste your raw, unformatted text into the left input panel.",
    },
    {
      title: "Select Formatting",
      description: "Click any of the format buttons (like lowercase, Title Case, or snake_case) to instantly transform the text.",
    },
    {
      title: "Copy the Result",
      description: "Once your text matches the desired case, click the copy button on the output panel to grab the formatted string.",
    },
  ];

  const faqs = [
    {
      question: "How does it handle programming cases like snake_case?",
      answer: "When you select a programming case, the tool uses Regex to strip out punctuation, isolate the words, and reconstruct them using the specific capitalization and separator rules of that convention.",
    },
    {
      question: "Is there a limit to how much text I can convert?",
      answer: "No hard limit. Because the text processing runs entirely on your local device's CPU, it can instantly format thousands of words without relying on server uploads.",
    },
    {
      question: "What is inverse case?",
      answer: "Inverse case swaps the current capitalization of every individual letter. If a letter is uppercase, it becomes lowercase, and vice versa.",
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
          Case <span className="text-blue-400">Converter</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Instantly transform text between lowercase, UPPERCASE, camelCase, snake_case, and more.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/20 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <CaseUpper className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Live Format Converter</h2>
            </div>
            
            {/* UPDATED CLEAR BUTTON */}
            <button
              onClick={clearAll}
              disabled={!inputText}
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm transition-all hover:bg-red-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
          </div>

          {/* Format Selectors */}
          <div className="mb-8 flex flex-wrap gap-2">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCase(c.id)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  activeCase === c.id 
                    ? "bg-slate-900 text-white shadow-md" 
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] items-center">
            
            {/* Input Area */}
            <div className="flex flex-col h-full w-full">
              <label className="mb-2 block text-sm font-bold text-slate-800">Original Text</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your unformatted text here..."
                className="h-[350px] w-full resize-none rounded-xl border border-slate-400 bg-white p-5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
              />
            </div>

            {/* Visual Separator (Only on large screens) */}
            <div className="hidden lg:flex flex-col items-center justify-center p-2 mt-6">
              <div className="rounded-full bg-slate-800/10 p-3">
                <ArrowRightLeft className="h-6 w-6 text-slate-700" />
              </div>
            </div>

            {/* Output Area */}
            <div className="flex flex-col h-full w-full mt-4 lg:mt-0">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800">Converted Output</label>
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
                placeholder="Your converted text will appear here..."
                className="h-[350px] w-full resize-none rounded-xl border border-slate-300 bg-slate-100 p-5 text-sm text-slate-900 focus:outline-none shadow-inner custom-scrollbar"
              />
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