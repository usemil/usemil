"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  FileText, 
  Trash2,
  Copy,
  Check,
  Settings2,
  RefreshCw
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", 
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", 
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", 
  "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", 
  "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", 
  "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", 
  "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "scelerisque", "fermentum", 
  "faucibus", "pellentesque", "tellus", "vestibulum", "mattis", "ullamcorper", "blandit", "massa"
];

type GenType = "paragraphs" | "sentences" | "words";

export default function LoremClient() {
  const [output, setOutput] = useState("");
  const [count, setCount] = useState<number>(3);
  const [genType, setGenType] = useState<GenType>("paragraphs");
  const [includeHtml, setIncludeHtml] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- GENERATION LOGIC ---
  const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

  const generateSentence = (isFirst: boolean = false) => {
    if (isFirst) return "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    
    const wordCount = Math.floor(Math.random() * 8) + 5; // 5 to 12 words
    const words = Array.from({ length: wordCount }, () => getRandomWord());
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  };

  const generateParagraph = (isFirst: boolean = false) => {
    const sentenceCount = Math.floor(Math.random() * 4) + 4; // 4 to 7 sentences
    const sentences = Array.from({ length: sentenceCount }, (_, i) => generateSentence(isFirst && i === 0));
    return sentences.join(" ");
  };

  const generateLorem = useCallback(() => {
    const safeCount = Math.max(1, Math.min(100, count)); // Limit between 1 and 100
    let generated: string[] = [];

    if (genType === "words") {
      generated = Array.from({ length: safeCount }, (_, i) => {
        const word = getRandomWord();
        return i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
      });
      setOutput(includeHtml ? `<p>${generated.join(" ")}</p>` : generated.join(" "));
      return;
    }

    if (genType === "sentences") {
      generated = Array.from({ length: safeCount }, (_, i) => generateSentence(i === 0));
      setOutput(includeHtml ? `<p>${generated.join(" ")}</p>` : generated.join(" "));
      return;
    }

    if (genType === "paragraphs") {
      generated = Array.from({ length: safeCount }, (_, i) => generateParagraph(i === 0));
      if (includeHtml) {
        setOutput(generated.map(p => `<p>${p}</p>`).join("\n\n"));
      } else {
        setOutput(generated.join("\n\n"));
      }
      return;
    }
  }, [count, genType, includeHtml]);

  // Generate initially and when settings change
  useEffect(() => {
    generateLorem();
  }, [generateLorem]);

  const clearAll = () => {
    setOutput("");
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        Lorem Ipsum is a placeholder text commonly used in the graphic, print, and web design industries to preview layouts and visual mockups. It helps designers and developers focus on typography and page structure without being distracted by readable content.
      </p>
      <p>
        Instead of using a static, pre-written paragraph, this tool generates mathematically randomized Latin text using a standard dictionary, ensuring your mockups look natural and organic.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Select Format",
      description: "Choose whether you need full paragraphs, individual sentences, or just a specific number of words.",
    },
    {
      title: "Adjust Quantity",
      description: "Use the slider or number input to determine exactly how much text you want to generate (up to 100 units).",
    },
    {
      title: "Add HTML (Optional)",
      description: "Toggle 'Wrap in HTML tags' to automatically wrap your generated paragraphs or sentences in <p> tags, saving you manual coding time.",
    },
  ];

  const faqs = [
    {
      question: "What does Lorem Ipsum actually mean?",
      answer: "It is a scrambled piece of Latin text derived from Cicero's 1st-century BC work 'De finibus bonorum et malorum' (On the Ends of Good and Evil). The words have been altered to be nonsensical.",
    },
    {
      question: "Why does the first paragraph always start the same way?",
      answer: "By design, the very first sentence generated always begins with the classic 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' to provide the immediate visual recognition expected from placeholder text.",
    },
    {
      question: "Does this require an internet connection?",
      answer: "No! The Latin dictionary is bundled directly into the application, allowing your browser to generate random text instantly and locally.",
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
          Lorem Ipsum <span className="text-blue-400">Generator</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Generate organic, randomized Latin placeholder text for your mockups and designs.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            
            {/* LEFT: Output & Controls */}
            <div className="flex flex-col h-full w-full">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/20 pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Generated Text</h2>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={generateLorem}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-700 active:scale-95"
                  >
                    <RefreshCw className="h-4 w-4" /> Regenerate
                  </button>
                  <button
                    onClick={clearAll}
                    disabled={!output}
                    className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm transition-all hover:bg-red-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="h-4 w-4" /> Clear
                  </button>
                </div>
              </div>

              <div className="relative flex-grow h-full min-h-[400px]">
                <textarea
                  readOnly
                  value={output}
                  placeholder="Your generated text will appear here..."
                  className="absolute inset-0 h-full w-full resize-none rounded-xl border border-slate-400 bg-white p-5 text-sm text-slate-900 focus:outline-none shadow-inner custom-scrollbar"
                />
                
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className={`absolute bottom-4 right-4 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-white shadow-md transition-colors ${copied ? "bg-emerald-600" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} 
                    {copied ? "Copied!" : "Copy Text"}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT: Settings Panel */}
            <div className="flex flex-col space-y-6 rounded-xl border border-slate-300 bg-slate-100/50 p-5 shadow-inner h-fit">
              <div className="flex items-center gap-2 border-b border-slate-300 pb-3 text-slate-800">
                <Settings2 className="h-5 w-5" />
                <h3 className="font-bold">Configuration</h3>
              </div>

              {/* Type Selection */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">Generate</label>
                <div className="flex flex-col gap-2">
                  {(["paragraphs", "sentences", "words"] as GenType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setGenType(type)}
                      className={`rounded-lg px-3 py-2 text-sm font-bold capitalize border transition-all text-left ${
                        genType === type
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                          : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Count Input */}
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm font-bold text-slate-800">
                  <label className="capitalize">Number of {genType}</label>
                  <span className="rounded-md bg-slate-800 px-2.5 py-0.5 font-mono text-white">{count}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={genType === "paragraphs" ? 20 : 100}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-blue-600 mb-2"
                />
                <input 
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  className="w-full rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* HTML Toggle */}
              <div className="pt-2 border-t border-slate-300">
                <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                  <span>Wrap in HTML tags</span>
                  <input
                    type="checkbox"
                    checked={includeHtml}
                    onChange={(e) => setIncludeHtml(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                  />
                </label>
                <p className="mt-1 text-xs text-slate-500 font-medium">Adds &lt;p&gt; tags around the output.</p>
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