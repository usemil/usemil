"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  GitCompare, 
  Trash2,
  RefreshCw,
  AlertTriangle,
  Type,
  List
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

type DiffPart = {
  type: "added" | "removed" | "unchanged";
  value: string;
};

type DiffMode = "words" | "lines";

export default function DiffClient() {
  const [originalText, setOriginalText] = useState("");
  const [modifiedText, setModifiedText] = useState("");
  const [diffs, setDiffs] = useState<DiffPart[] | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [diffMode, setDiffMode] = useState<DiffMode>("words");

  // --- DIFFERENCE ALGORITHM (LCS) ---
  const runComparison = (mode: DiffMode, orig: string, mod: string) => {
    setIsComparing(true);
    
    setTimeout(() => {
      let oldTokens: string[] = [];
      let newTokens: string[] = [];

      if (mode === "lines") {
        // Smart Line Splitting: 
        // 1. Converts sentence endings (e.g. ". ") into real line breaks ("\n")
        // 2. Splits by those newlines so paragraphs are evaluated sentence-by-sentence
        const processLines = (text: string) => {
          return text
            .replace(/([.!?])\s+/g, '$1\n') 
            .split('\n')
            .filter(t => t.trim().length > 0);
        };
        oldTokens = processLines(orig);
        newTokens = processLines(mod);
      } else {
        // Word Splitting: Split by ALL whitespace but keep the delimiter 
        // to accurately reconstruct the exact spacing inline.
        oldTokens = orig.split(/(\s+)/).filter(t => t.length > 0);
        newTokens = mod.split(/(\s+)/).filter(t => t.length > 0);
      }

      // Safeguard against browser memory crash
      if (oldTokens.length > 4000 || newTokens.length > 4000) {
        setDiffs([
          { type: 'unchanged', value: `⚠️ Text too large for browser memory. Please compare chunks of less than 4,000 ${mode} at a time.` }
        ]);
        setIsComparing(false);
        return;
      }

      // Optimization: Using Int32Array prevents browser lag on large grids
      const dp = Array(oldTokens.length + 1);
      for (let i = 0; i <= oldTokens.length; i++) {
        dp[i] = new Int32Array(newTokens.length + 1);
      }

      for (let i = 1; i <= oldTokens.length; i++) {
        for (let j = 1; j <= newTokens.length; j++) {
          if (oldTokens[i - 1] === newTokens[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
      }

      const result: DiffPart[] = [];
      let i = oldTokens.length;
      let j = newTokens.length;

      // Backtrack to build the diff
      while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && oldTokens[i - 1] === newTokens[j - 1]) {
          result.unshift({ type: 'unchanged', value: oldTokens[i - 1] });
          i--;
          j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
          result.unshift({ type: 'added', value: newTokens[j - 1] });
          j--;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
          result.unshift({ type: 'removed', value: oldTokens[i - 1] });
          i--;
        }
      }

      setDiffs(result);
      setIsComparing(false);
    }, 50);
  };

  const handleCompareClick = () => {
    if (!originalText && !modifiedText) return;
    runComparison(diffMode, originalText, modifiedText);
  };

  const handleModeChange = (mode: DiffMode) => {
    setDiffMode(mode);
    if (diffs !== null && (originalText || modifiedText)) {
      runComparison(mode, originalText, modifiedText);
    }
  };

  const clearAll = () => {
    setOriginalText("");
    setModifiedText("");
    setDiffs(null);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        The Text Diff Checker is a visual comparison tool that highlights the exact differences between two pieces of text. It is invaluable for programmers reviewing code changes, writers tracking manuscript edits, or anyone trying to find a subtle typo between two similar documents.
      </p>
      <p className="mb-4">
        This tool uses a custom implementation of the <strong>Longest Common Subsequence (LCS)</strong> algorithm to compare your text entirely within your browser memory.
      </p>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 text-sm font-medium">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p>
            <strong>Performance Limit:</strong> Because LCS math scales exponentially, this tool has a safety cap of 4,000 tokens (words or lines) per input to prevent your browser from freezing. For massive logs, compare them in chunks!
          </p>
        </div>
      </div>
    </>
  );

  const howToSteps = [
    {
      title: "Input Original Text",
      description: "Paste the older or original version of your text into the left text box.",
    },
    {
      title: "Select Mode",
      description: "Choose 'Word-by-Word' for standard paragraphs and essays, or 'Lines' to evaluate code snippets or sentence-by-sentence changes.",
    },
    {
      title: "Compare & Review",
      description: "Click 'Compare Texts'. Deletions will be highlighted in red with a strikethrough, and additions will be highlighted in green.",
    },
  ];

  const faqs = [
    {
      question: "Which comparison mode should I use?",
      answer: "If you are looking for specific typo fixes (like a single changed letter), use Word-by-Word. If you want to see which entire sentences or lines of code were rewritten, use Lines.",
    },
    {
      question: "Is my text sent to a server for comparison?",
      answer: "No. The entire mathematical comparison algorithm is downloaded to your device when you load the page. Your sensitive code or private documents never leave your browser.",
    },
    {
      question: "What does LCS mean?",
      answer: "Longest Common Subsequence is a classic computer science algorithm used to find the longest sequence of characters (or lines) that appear in the same order in both strings. By finding what stayed the same, we can calculate what was added or removed.",
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
          Text Diff <span className="text-blue-400">Checker</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Compare two text documents to instantly spot additions, deletions, and modifications.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/20 pb-4 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                  <GitCompare className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Comparison Engine</h2>
              </div>
              
              {/* Diff Mode Toggle */}
              <div className="flex bg-slate-200/60 rounded-lg p-1 border border-slate-300">
                <button
                  onClick={() => handleModeChange("words")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${diffMode === "words" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                >
                  <Type className="h-3.5 w-3.5" /> Words
                </button>
                <button
                  onClick={() => handleModeChange("lines")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${diffMode === "lines" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                >
                  <List className="h-3.5 w-3.5" /> Lines
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCompareClick}
                disabled={(!originalText && !modifiedText) || isComparing}
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isComparing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <GitCompare className="h-4 w-4" />} 
                {isComparing ? "Comparing..." : "Compare Texts"}
              </button>
              <button
                onClick={clearAll}
                disabled={!originalText && !modifiedText && !diffs}
                className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm transition-all hover:bg-red-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-4 w-4" /> Clear All
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            
            {/* Original Text Input */}
            <div className="flex flex-col">
              <label className="mb-2 block text-sm font-bold text-slate-800">Original Text</label>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Paste the original document here..."
                className="h-[300px] w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
              />
            </div>

            {/* Modified Text Input */}
            <div className="flex flex-col">
              <label className="mb-2 block text-sm font-bold text-slate-800">Modified Text</label>
              <textarea
                value={modifiedText}
                onChange={(e) => setModifiedText(e.target.value)}
                placeholder="Paste the modified document here..."
                className="h-[300px] w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
              />
            </div>

          </div>

          {/* Diff Output Viewer */}
          {diffs && (
            <div className="rounded-xl border border-slate-300 bg-white shadow-inner overflow-hidden animate-fadeIn">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-300 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">
                  Difference Output <span className="text-slate-500 font-medium ml-1">({diffMode === "words" ? "Word-by-Word" : "Sentence/Line"})</span>
                </span>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1 text-emerald-800"><span className="w-3 h-3 bg-emerald-200 border border-emerald-400 rounded-sm"></span> Added</span>
                  <span className="flex items-center gap-1 text-rose-800"><span className="w-3 h-3 bg-rose-200 border border-rose-400 rounded-sm"></span> Removed</span>
                </div>
              </div>
              
              <div className="p-5 overflow-x-auto max-h-[500px] custom-scrollbar">
                
                {diffMode === "words" ? (
                  /* INLINE WORD RENDERING */
                  <div className="text-base leading-relaxed text-slate-900 whitespace-pre-wrap font-sans break-words">
                    {diffs.map((diff, index) => (
                      <span 
                        key={index} 
                        className={`
                          ${diff.type === 'added' ? 'bg-emerald-200 text-emerald-950 font-bold px-1 rounded-sm shadow-sm' : ''}
                          ${diff.type === 'removed' ? 'bg-rose-200 text-rose-950 font-bold px-1 rounded-sm shadow-sm line-through decoration-rose-950/50' : ''}
                        `}
                      >
                        {diff.value}
                      </span>
                    ))}
                  </div>
                ) : (
                  /* LINE-BY-LINE RENDERING */
                  <div className="font-mono text-sm">
                    {diffs.map((diff, index) => (
                      <div 
                        key={index} 
                        className={`whitespace-pre-wrap px-2 py-1 mb-1 rounded-md flex ${
                          diff.type === 'added' ? 'bg-emerald-100 text-emerald-900 font-medium border border-emerald-200' :
                          diff.type === 'removed' ? 'bg-rose-100 text-rose-900 line-through opacity-90 border border-rose-200' : 
                          'text-slate-700'
                        }`}
                      >
                        <span className="select-none w-6 shrink-0 opacity-50 text-right pr-2">
                          {diff.type === 'added' ? '+' : diff.type === 'removed' ? '-' : ' '}
                        </span>
                        <span className="break-all leading-relaxed">{diff.value || " "}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          )}

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