"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Search, 
  Trash2,
  Copy,
  Check,
  Settings2,
  ReplaceAll,
  Plus,
  Minus,
  ArrowRightLeft
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

type Rule = {
  find: string;
  replace: string;
  id: string;
};

export default function FindReplaceClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  
  // Rules State
  const [rules, setRules] = useState<Rule[]>([{ find: "", replace: "", id: "1" }]);
  
  // Settings State
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  
  // Analytics State
  const [matchesFound, setMatchesFound] = useState(0);
  const [copied, setCopied] = useState(false);

  // Helper to generate a safe RegExp based on user settings
  const createRegex = useCallback((findStr: string) => {
    if (!findStr) return null;
    try {
      let pattern = findStr;
      if (!useRegex) {
        // Escape standard string characters if not using literal regex
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      if (wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }
      return new RegExp(pattern, caseSensitive ? 'g' : 'gi');
    } catch (e) {
      return null; // Invalid regex catch
    }
  }, [caseSensitive, wholeWord, useRegex]);

  // Live preview & processing
  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      setMatchesFound(0);
      return;
    }

    let currentText = inputText;
    let totalMatches = 0;

    // Process each rule sequentially
    rules.forEach((rule) => {
      if (!rule.find) return;

      const regex = createRegex(rule.find);
      if (regex) {
        // Count matches for this rule before replacing
        const matches = currentText.match(regex);
        if (matches) totalMatches += matches.length;

        // Execute replace
        currentText = currentText.replace(regex, rule.replace);
      }
    });

    setOutputText(currentText);
    setMatchesFound(totalMatches);

  }, [inputText, rules, caseSensitive, wholeWord, useRegex, createRegex]);

  // Rule Management
  const addRule = () => {
    setRules([...rules, { find: "", replace: "", id: Math.random().toString(36).substring(7) }]);
  };

  const removeRule = (id: string) => {
    if (rules.length === 1) {
      setRules([{ find: "", replace: "", id: "1" }]);
      return;
    }
    setRules(rules.filter(r => r.id !== id));
  };

  const updateRule = (id: string, field: "find" | "replace", value: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setRules([{ find: "", replace: "", id: "1" }]);
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
        The Advanced Find & Replace tool goes beyond standard text editors by allowing you to execute multiple substitution rules simultaneously. Whether you are renaming a dozen programming variables, migrating SEO meta tags across hundreds of HTML lines, or simply fixing common typos in an essay, this tool handles it instantly.
      </p>
      <p>
        Because all text processing is handled natively in your browser using JavaScript Regular Expressions, it securely powers through massive documents with zero network latency or upload limits.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Input your Document",
      description: "Paste your raw code, essay, or dataset into the Original Text panel.",
    },
    {
      title: "Build Replacement Rules",
      description: "Add one or more 'Find' and 'Replace' pairs. The tool will execute these rules sequentially from top to bottom.",
    },
    {
      title: "Configure Modifiers",
      description: "Toggle settings like Case Sensitivity or Whole Word matching. Enable Regex mode for complex pattern matching.",
    },
  ];

  const faqs = [
    {
      question: "What is 'Whole Word Only'?",
      answer: "If you search for 'cat' without this enabled, it will also replace the 'cat' inside the word 'catch'. Enabling 'Whole Word Only' ensures it only replaces the standalone word 'cat'.",
    },
    {
      question: "How does batch replacing work?",
      answer: "The tool runs your rules in order. If Rule 1 changes 'Apple' to 'Banana', and Rule 2 changes 'Banana' to 'Orange', your final output for 'Apple' will be 'Orange'. Keep order in mind!",
    },
    {
      question: "Are my documents secure?",
      answer: "Absolutely. The text is processed entirely within your browser's local memory. Nothing is ever sent to a server, making it safe for proprietary code or sensitive documents.",
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
          Find & <span className="text-blue-400">Replace</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Execute single or complex batch text replacements instantly and securely.
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
                <ReplaceAll className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Batch Processing Engine</h2>
            </div>
            
            <button
              onClick={clearAll}
              disabled={!inputText && rules.length === 1 && !rules[0].find}
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm transition-all hover:bg-red-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            
            {/* LEFT SIDE: Rules & Configuration */}
            <div className="flex flex-col space-y-5">
              
              {/* Rules Builder */}
              <div className="rounded-xl border border-slate-300 bg-slate-100/50 p-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-3 text-slate-800">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <h3 className="font-bold text-sm">Replacement Rules</h3>
                  </div>
                  <button 
                    onClick={addRule}
                    className="flex items-center gap-1 rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    <Plus className="h-3 w-3" /> Add Rule
                  </button>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
                  {rules.map((rule, index) => (
                    <div key={rule.id} className="relative rounded-lg border border-slate-300 bg-white p-3 shadow-sm group animate-fadeIn">
                      <button
                        onClick={() => removeRule(rule.id)}
                        className="absolute -right-2 -top-2 hidden rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200 group-hover:block transition-colors"
                        title="Remove Rule"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      
                      <div className="space-y-2">
                        <div>
                          <input
                            type="text"
                            value={rule.find}
                            onChange={(e) => updateRule(rule.id, "find", e.target.value)}
                            placeholder="Find..."
                            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                        <div className="flex justify-center text-slate-400">
                          <ArrowRightLeft className="h-3 w-3 rotate-90" />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={rule.replace}
                            onChange={(e) => updateRule(rule.id, "replace", e.target.value)}
                            placeholder="Replace with..."
                            className="w-full rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modifiers Box */}
              <div className="rounded-xl border border-slate-300 bg-slate-100/50 p-4 shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-2 mb-3 text-slate-800">
                  <Settings2 className="h-4 w-4" />
                  <h3 className="font-bold text-sm">Search Modifiers</h3>
                </div>

                <div className="space-y-2.5">
                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                    <span>Match Case</span>
                    <input
                      type="checkbox"
                      checked={caseSensitive}
                      onChange={(e) => setCaseSensitive(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                    <span>Whole Word Only</span>
                    <input
                      type="checkbox"
                      checked={wholeWord}
                      onChange={(e) => setWholeWord(e.target.checked)}
                      disabled={useRegex}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500 disabled:opacity-40"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                    <span>Regular Expression</span>
                    <input
                      type="checkbox"
                      checked={useRegex}
                      onChange={(e) => {
                        setUseRegex(e.target.checked);
                        if (e.target.checked) setWholeWord(false);
                      }}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: Text Areas */}
            <div className="flex flex-col h-full space-y-4">
              
              {/* Analytics HUD */}
              <div className="flex items-center justify-between rounded-xl bg-slate-900 px-5 py-3 text-white shadow-md">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Live Status</span>
                <div className="flex gap-4 font-mono text-sm">
                  <span className="text-emerald-400">
                    <span className="text-white font-bold">{matchesFound}</span> Replaced
                  </span>
                </div>
              </div>

              {/* Text Grid */}
              <div className="grid gap-4 sm:grid-cols-2 flex-grow min-h-[400px]">
                <div className="flex flex-col">
                  <label className="mb-2 block text-sm font-bold text-slate-800">Original Text</label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste the text you want to modify here..."
                    className="flex-grow w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-800">Live Preview Output</label>
                    <button
                      onClick={copyToClipboard}
                      disabled={!outputText}
                      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${copied ? "bg-emerald-600" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} 
                      {copied ? "Copied" : "Copy Output"}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={outputText}
                    placeholder="Your modified text will appear here instantly..."
                    className="flex-grow w-full resize-none rounded-xl border border-slate-300 bg-slate-100 p-4 font-mono text-sm text-slate-900 focus:outline-none shadow-inner custom-scrollbar"
                  />
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