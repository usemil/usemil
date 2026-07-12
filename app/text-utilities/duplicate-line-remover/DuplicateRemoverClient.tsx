"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Copy, 
  Check, 
  Trash2,
  CopyCheck,
  Settings2,
  Rows,
  ListMinus
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

type DuplicateStat = {
  value: string;
  count: number;
};

export default function DuplicateRemoverClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  
  // Settings State
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [sortResult, setSortResult] = useState(false);
  
  // Analytics State
  const [originalCount, setOriginalCount] = useState(0);
  const [removedCount, setRemovedCount] = useState(0);
  const [duplicateStats, setDuplicateStats] = useState<DuplicateStat[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      setOriginalCount(0);
      setRemovedCount(0);
      setDuplicateStats([]);
      return;
    }

    const lines = inputText.split("\n");
    const lineCounts = new Map<string, { original: string, count: number }>();
    
    let emptyLinesRemoved = 0;

    lines.forEach((line) => {
      let processedLine = line;

      // 1. Apply conditional trimming
      if (trimLines) {
        processedLine = processedLine.trim();
      }

      // 2. Handle Empty Lines
      if (removeEmpty && processedLine === "") {
        emptyLinesRemoved++;
        return; // Skip empty rows entirely
      }

      // 3. Prepare match keys based on ignore settings
      let matchKey = processedLine;
      if (ignoreCase) {
        matchKey = matchKey.toLowerCase();
      }

      // 4. Track Frequencies
      if (lineCounts.has(matchKey)) {
        lineCounts.get(matchKey)!.count++;
      } else {
        lineCounts.set(matchKey, { original: line, count: 1 });
      }
    });

    const uniqueLines: string[] = [];
    const stats: DuplicateStat[] = [];
    let dupesRemoved = 0;

    // Process the Map into our outputs
    lineCounts.forEach((val) => {
      uniqueLines.push(val.original); // Push original to preserve formatting/casing
      if (val.count > 1) {
        stats.push({ value: val.original, count: val.count });
        dupesRemoved += (val.count - 1); // Count how many EXACT duplicates were scrubbed
      }
    });

    // Optional Sort A-Z
    if (sortResult) {
      uniqueLines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    }

    // Sort stats by highest frequency first
    stats.sort((a, b) => b.count - a.count);

    setOutputText(uniqueLines.join("\n"));
    setOriginalCount(lines.length);
    setRemovedCount(dupesRemoved + emptyLinesRemoved);
    setDuplicateStats(stats);

  }, [inputText, ignoreCase, trimLines, removeEmpty, sortResult]);

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setDuplicateStats([]);
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
        The Duplicate Line Remover is an ultra-fast text conditioning engine designed to instantly scrub repeating datasets. When compiling massive lists—like configuration constants, keyword maps, email lists, or database keys—it is incredibly common to introduce accidental copies.
      </p>
      <p>
        By parsing your lists through a native browser-side frequency tracker, this utility safely isolates unique objects, provides a comprehensive breakdown of exactly which lines were duplicated, and gives you full control over conditional trimming and casing limits.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Paste Content",
      description: "Drop your list, dataset, logs, or unorganized text block directly into the Left configuration terminal.",
    },
    {
      title: "Configure Parsing Rules",
      description: "Determine whether the string processor should ignore trailing whitespace mutations, case anomalies, or sort the elements alphabetically.",
    },
    {
      title: "Review Frequency Analysis",
      description: "Check the 'Duplicate Analysis' board to see exactly which items were repeated and how many times they appeared in your dataset.",
    },
  ];

  const faqs = [
    {
      question: "Will 'Ignore Case' mutate my actual text to lowercase?",
      answer: "No. The text properties remain completely unchanged. The 'Ignore Case' flag only converts strings inside a temporary lookup loop to prevent structural duplicates like 'Apple' and 'apple' from bypassing safety sweeps.",
    },
    {
      question: "How does the sorting engine execute data positioning?",
      answer: "The code applies a natural local sorting sequence (`localeCompare`) to arrange non-standard alphanumeric strings, special characters, and numbers into standard ascending dictionary groupings.",
    },
    {
      question: "Is there a row capacity limit?",
      answer: "Since your device's core CPU architecture handles calculations inside local RAM, strings stretching past 25,000 continuous data points compile seamlessly with absolute zero network lag.",
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
          Duplicate Line <span className="text-blue-400">Remover</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Instantly scrub, deduplicate, filter, and analyze repeating datasets locally.
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
                <Rows className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">List Sanitizer</h2>
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
                <label className="mb-2 block text-sm font-bold text-slate-800">Original Content</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste lists or line logs here..."
                  className="h-[250px] sm:h-[350px] lg:h-[500px] w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
                />
              </div>

              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800">Cleaned Result</label>
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
                  placeholder="Deduplicated text output displays here..."
                  className="h-[250px] sm:h-[350px] lg:h-[500px] w-full resize-none rounded-xl border border-slate-300 bg-slate-100 p-4 font-mono text-sm text-slate-900 focus:outline-none shadow-inner custom-scrollbar"
                />
              </div>
            </div>

            {/* RIGHT SIDE: Configuration & Analysis Panel */}
            <div className="flex flex-col space-y-5 h-full">
              
              {/* Configuration Box */}
              <div className="rounded-xl border border-slate-300 bg-slate-100/50 p-5 shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-2.5 text-slate-800 mb-3">
                  <Settings2 className="h-5 w-5" />
                  <h3 className="font-bold">Execution Criteria</h3>
                </div>

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                    <span>Trim Whitespace</span>
                    <input
                      type="checkbox"
                      checked={trimLines}
                      onChange={(e) => setTrimLines(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                    <span>Ignore Character Case</span>
                    <input
                      type="checkbox"
                      checked={ignoreCase}
                      onChange={(e) => setIgnoreCase(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                    <span>Remove Empty Lines</span>
                    <input
                      type="checkbox"
                      checked={removeEmpty}
                      onChange={(e) => setRemoveEmpty(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                    <span>Sort Output A-Z</span>
                    <input
                      type="checkbox"
                      checked={sortResult}
                      onChange={(e) => setSortResult(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              {/* Processing Metrics Box */}
              <div className="rounded-xl bg-slate-900 p-4 text-white shadow-md">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
                  <CopyCheck className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Processing Analytics</span>
                </div>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Lines:</span>
                    <span className="font-bold">{originalCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Items Removed:</span>
                    <span className={`font-bold ${removedCount > 0 ? "text-rose-400" : "text-slate-300"}`}>{removedCount}</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-slate-800">
                    <span className="text-blue-400">Clean Rows Remain:</span>
                    <span className="font-bold text-emerald-400">{originalCount - removedCount}</span>
                  </div>
                </div>
              </div>

              {/* NEW: Dynamic Duplicate Analysis Box */}
              {duplicateStats.length > 0 && (
                <div className="flex-grow rounded-xl border border-rose-200 bg-rose-50 p-4 shadow-sm animate-fadeIn flex flex-col min-h-[150px]">
                  <div className="mb-3 flex items-center gap-2 border-b border-rose-200 pb-2">
                    <ListMinus className="h-4 w-4 text-rose-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Duplicate Analysis</span>
                  </div>
                  
                  <div className="flex-grow overflow-y-auto max-h-[180px] custom-scrollbar pr-2 space-y-2">
                    {duplicateStats.map((stat, i) => (
                      <div key={i} className="flex items-start justify-between gap-2 text-sm border-b border-rose-100 pb-1.5 last:border-0 last:pb-0">
                        <span 
                          className="font-mono text-slate-700 truncate" 
                          title={stat.value || "(Empty Line)"}
                        >
                          {stat.value || <span className="italic text-slate-400">{"(Empty Line)"}</span>}
                        </span>
                        <span className="shrink-0 rounded bg-rose-200 px-1.5 py-0.5 text-xs font-bold text-rose-800">
                          {stat.count}x
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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