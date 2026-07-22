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
  AlignLeft,
  Wand2
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function WhitespaceCleanerClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  
  // Settings State
  const [trimLines, setTrimLines] = useState(true);
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [tabsToSpaces, setTabsToSpaces] = useState(true);
  
  // Analytics State
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      setCharCount(0);
      return;
    }

    let text = inputText;

    if (tabsToSpaces) {
      text = text.replace(/\t/g, " ");
    }

    if (trimLines) {
      // Trims leading/trailing spaces from EACH line
      text = text.split("\n").map((line) => line.trim()).join("\n");
    }

    if (removeExtraSpaces) {
      // Replaces 2+ consecutive spaces with a single space
      text = text.replace(/ +/g, " ");
    }

    if (removeEmptyLines) {
      // Removes lines that are completely blank
      text = text.replace(/^\s*[\r\n]/gm, "");
    }

    // Final trim to ensure no trailing newlines at the very end of the document
    text = text.trim();

    setOutputText(text);
    setCharCount(text.length);
  }, [inputText, trimLines, removeExtraSpaces, removeEmptyLines, tabsToSpaces]);

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setCharCount(0);
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
        The Whitespace Cleaner is a text formatting utility designed to instantly scrub invisible, unnecessary characters from your documents and code snippets. When collaborating across different text editors or copy-pasting from web sources, text often inherits broken formatting, excessive tabs, and chaotic line breaks.
      </p>
      <p>
        This tool uses regular expressions to quickly identify and strip out excess blank lines, trim trailing spaces, and normalize indentation. It provides fine-grained execution criteria so you can dictate exactly how aggressive the formatting should be, resulting in perfectly structured, readable plaintext.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Input your Text",
      description: "Paste your poorly formatted text, code, or paragraphs into the Original Content panel.",
    },
    {
      title: "Adjust Modifiers",
      description: "Use the execution criteria to determine whether you want to purge empty lines, convert tabs to standard spaces, or trim the edges of every line.",
    },
    {
      title: "Copy the Result",
      description: "Click the 'Copy Result' button to grab the sanitized, uniform plaintext output.",
    },
  ];

  const faqs = [
    {
      question: "Will this merge all my text into one single paragraph?",
      answer: "No, not unless you want it to. Standard line breaks are preserved by default. The 'Remove Empty Lines' criteria only deletes excessive blank vertical space, keeping your standard paragraph breaks intact.",
    },
    {
      question: "What does 'Tabs to Spaces' actually do?",
      answer: "Different text editors render the 'Tab' key differently. This setting standardizes your text by finding every hidden Tab character and replacing it with standard space characters, ensuring your layout looks identical everywhere.",
    },
    {
      question: "Is my text sent to a server for processing?",
      answer: "No. The entire formatting process happens securely within your browser's local memory using JavaScript. Your data is never transmitted externally.",
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
          Whitespace <span className="text-blue-400">Cleaner</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Instantly remove extra spaces, empty lines, and tabs from your text or code.
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
                <Wand2 className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Formatting Engine</h2>
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
                  <label className="text-sm font-bold text-slate-800">Original Content</label>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your messy text here..."
                  className="h-[250px] sm:h-[350px] lg:h-[450px] w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
                />
              </div>

              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800">Cleaned Text</label>
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
                  placeholder="Your perfectly formatted text will display here..."
                  className="h-[250px] sm:h-[350px] lg:h-[450px] w-full resize-none rounded-xl border border-slate-300 bg-slate-100 p-4 font-mono text-sm text-slate-900 focus:outline-none shadow-inner custom-scrollbar"
                />
              </div>
            </div>

            {/* RIGHT SIDE: Configuration Panel */}
            <div className="flex flex-col space-y-5 h-full">
              
              <div className="rounded-xl border border-slate-300 bg-slate-100/50 p-4 shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-2.5 text-slate-800 mb-4">
                  <Settings2 className="h-4 w-4" />
                  <h3 className="font-bold text-sm">Execution Criteria</h3>
                </div>

                <div className="space-y-4">
                  <label className="flex cursor-pointer items-start justify-between gap-3 text-sm text-slate-800">
                    <div className="flex flex-col">
                      <span className="font-bold">Trim Line Ends</span>
                      <span className="text-xs text-slate-500 mt-0.5">Removes invisible leading and trailing spaces from every individual line.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={trimLines}
                      onChange={(e) => setTrimLines(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-start justify-between gap-3 text-sm text-slate-800">
                    <div className="flex flex-col">
                      <span className="font-bold">Remove Extra Spaces</span>
                      <span className="text-xs text-slate-500 mt-0.5">Scans for two or more consecutive spaces and shrinks them down to a single space.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={removeExtraSpaces}
                      onChange={(e) => setRemoveExtraSpaces(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-start justify-between gap-3 text-sm text-slate-800">
                    <div className="flex flex-col">
                      <span className="font-bold">Remove Empty Lines</span>
                      <span className="text-xs text-slate-500 mt-0.5">Purges lines that are completely blank or only contain invisible spacing.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={removeEmptyLines}
                      onChange={(e) => setRemoveEmptyLines(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-start justify-between gap-3 text-sm text-slate-800">
                    <div className="flex flex-col">
                      <span className="font-bold">Tabs to Spaces</span>
                      <span className="text-xs text-slate-500 mt-0.5">Finds all invisible tab indentations and converts them into standard spaces.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={tabsToSpaces}
                      onChange={(e) => setTabsToSpaces(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              {/* Status Box */}
              <div className="mt-auto rounded-xl bg-slate-900 p-4 text-white shadow-md">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
                  <AlignLeft className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Output Analytics</span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-slate-400">Final Length:</span>
                  <span className="font-bold text-emerald-400">{charCount} Chars</span>
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