"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Type, 
  Trash2,
  Copy,
  Check,
  AlignLeft
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function WordCounterClient() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // --- METRICS CALCULATION ---
  // Using \S+ to match any non-whitespace sequence as a word
  const words = text.match(/\S+/g)?.length || 0;
  
  const characters = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  
  // Split by common sentence enders (. ! ?)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  
  // Split by newlines
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
  
  // Average reading speed is ~200 words per minute
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const clearAll = () => {
    setText("");
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        The Word & Character Counter is an essential utility for writers, marketers, and developers. Whether you are writing a tweet with a strict character limit, an essay with a minimum word count requirement, or optimizing SEO meta descriptions, this tool provides real-time, accurate metrics.
      </p>
      <p>
        Because it processes everything locally in your browser using JavaScript, it handles thousands of words instantly without lag, and ensures your private documents remain entirely on your device.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Input Text",
      description: "Start typing or paste your document directly into the text area. The analytics engine will process the text on every keystroke.",
    },
    {
      title: "Review Metrics",
      description: "Check the live dashboard for total words, characters (with and without spaces), sentences, and paragraphs.",
    },
    {
      title: "Reading Time",
      description: "Use the estimated reading time metric to gauge how long it will take an average person (reading at ~200 words per minute) to consume your content.",
    },
  ];

  const faqs = [
    {
      question: "Does this save my text?",
      answer: "No. This tool operates entirely client-side. Your text is processed in your browser's temporary memory and vanishes as soon as you close or refresh the tab.",
    },
    {
      question: "How are words counted?",
      answer: "The algorithm splits the text by whitespace (spaces, tabs, and newlines). Hyphenated words are typically treated as a single word depending on how you format them.",
    },
    {
      question: "What is the difference between Characters and Characters (No Spaces)?",
      answer: "Standard character count includes every single space, tab, and line break in your document. 'No Spaces' strips those out, which is a common metric required for specific academic or professional formatting guidelines.",
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
          Word <span className="text-blue-400">Counter</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Instantly calculate words, characters, paragraphs, and reading time for your text.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/20 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <Type className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Text Analytics</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                disabled={!text}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${copied ? "bg-emerald-600" : "bg-slate-800 hover:bg-slate-700"}`}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} 
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={clearAll}
                disabled={!text}
                className="flex items-center gap-1.5 rounded-lg border border-slate-500 bg-transparent px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200/80 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            
            {/* Input Area */}
            <div className="flex flex-col h-full">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here to begin counting..."
                className="h-[400px] w-full resize-none rounded-xl border border-slate-400 bg-white p-5 text-base text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
              />
            </div>

            {/* Metrics Dashboard */}
            <div className="flex flex-col space-y-4">
              
              {/* Primary Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm text-center">
                  <div className="text-3xl font-black text-blue-700">{words}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-900/60 mt-1">Words</div>
                </div>
                <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-4 shadow-sm text-center">
                  <div className="text-3xl font-black text-fuchsia-700">{characters}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-fuchsia-900/60 mt-1">Characters</div>
                </div>
              </div>

              {/* Secondary Metrics List */}
              <div className="rounded-xl border border-slate-300 bg-slate-100/50 p-5 shadow-inner space-y-4">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <AlignLeft className="h-4 w-4" /> Sentences
                  </div>
                  <div className="font-mono text-lg font-bold text-slate-900">{sentences}</div>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <AlignLeft className="h-4 w-4" /> Paragraphs
                  </div>
                  <div className="font-mono text-lg font-bold text-slate-900">{paragraphs}</div>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <Type className="h-4 w-4" /> Chars (no spaces)
                  </div>
                  <div className="font-mono text-lg font-bold text-slate-900">{charsNoSpaces}</div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">Reading Time</span>
                    <span className="text-xs text-slate-500 font-medium">@ 200 words/min</span>
                  </div>
                  <div className="font-mono text-lg font-bold text-blue-700">
                    {words === 0 ? "0 min" : `~${readingTime} min`}
                  </div>
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