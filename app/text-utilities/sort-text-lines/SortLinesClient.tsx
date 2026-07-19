"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Copy, 
  Check, 
  Trash2,
  ArrowDownAZ,
  Settings2,
  Shuffle,
  ArrowDown10,
  Ruler,
  ArrowDownUp
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

type SortMethod = 
  | "az" 
  | "za" 
  | "num-asc" 
  | "num-desc" 
  | "len-asc" 
  | "len-desc" 
  | "reverse" 
  | "shuffle"
  | "none";

export default function SortLinesClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  
  // Settings State
  const [sortMethod, setSortMethod] = useState<SortMethod>("az");
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  
  // Analytics State
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      return;
    }

    let lines = inputText.split("\n");

    if (removeEmpty) {
      lines = lines.filter(line => line.trim() !== "");
    }

    // Create a copy to sort without mutating the original split array
    let result = [...lines];

    // Using Intl.Collator for robust, natural language sorting
    const collatorAlpha = new Intl.Collator(undefined, { 
      sensitivity: ignoreCase ? "base" : "variant" 
    });
    
    // Natural numeric sorting (treats "File10" as greater than "File2")
    const collatorNum = new Intl.Collator(undefined, { 
      numeric: true, 
      sensitivity: ignoreCase ? "base" : "variant" 
    });

    switch (sortMethod) {
      case "az":
        result.sort(collatorAlpha.compare);
        break;
      case "za":
        result.sort((a, b) => collatorAlpha.compare(b, a));
        break;
      case "num-asc":
        result.sort(collatorNum.compare);
        break;
      case "num-desc":
        result.sort((a, b) => collatorNum.compare(b, a));
        break;
      case "len-asc":
        result.sort((a, b) => a.length - b.length);
        break;
      case "len-desc":
        result.sort((a, b) => b.length - a.length);
        break;
      case "reverse":
        result.reverse();
        break;
      case "shuffle":
        // Fisher-Yates Shuffle
        for (let i = result.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [result[i], result[j]] = [result[j], result[i]];
        }
        break;
      case "none":
      default:
        break;
    }

    setOutputText(result.join("\n"));
  }, [inputText, sortMethod, ignoreCase, removeEmpty]);

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
        The Sort Text Lines utility is a fast and robust tool for organizing lists, code constants, or datasets. It goes far beyond simple alphabetical sorting by including <strong>Natural Numeric sorting</strong>, which correctly identifies that <code>Item 10</code> comes after <code>Item 2</code> rather than pushing it to the top.
      </p>
      <p>
        You can also organize lists by string length, completely reverse the input order, or shuffle the lines into a randomized sequence for lotteries or testing. Everything runs locally in your browser memory for maximum privacy.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Input your List",
      description: "Paste your unorganized list, text block, or dataset into the Original Content panel.",
    },
    {
      title: "Select a Sorting Method",
      description: "Click one of the sorting algorithms on the right (like A-Z, Length, or Natural Number) to instantly reorder your output.",
    },
    {
      title: "Configure Rules",
      description: "Use the toggle switches to decide if the algorithm should ignore capital letters or automatically delete empty lines to clean up your data.",
    },
  ];

  const faqs = [
    {
      question: "What is Natural / Numeric sorting?",
      answer: "Standard computer sorting looks at characters one by one, which means 'File10' gets sorted before 'File2' because '1' is less than '2'. Natural sorting groups numbers together, so 'File2' correctly comes before 'File10'.",
    },
    {
      question: "Does 'Shuffle' give a truly random result?",
      answer: "Yes, it uses the industry-standard Fisher-Yates shuffling algorithm to mathematically ensure every possible line permutation has an equal probability of occurring.",
    },
    {
      question: "What does 'Ignore Character Case' do?",
      answer: "If disabled, uppercase letters are prioritized, meaning 'Zebra' would be sorted before 'apple'. Enabling it treats 'Zebra' and 'zebra' equally, resulting in a standard dictionary order.",
    },
  ];

  const sortOptions = [
    { id: "az", label: "Alphabetical (A-Z)", icon: ArrowDownAZ },
    { id: "za", label: "Alphabetical (Z-A)", icon: ArrowDownAZ },
    { id: "num-asc", label: "Natural Number (Asc)", icon: ArrowDown10 },
    { id: "num-desc", label: "Natural Number (Desc)", icon: ArrowDown10 },
    { id: "len-asc", label: "Length (Short to Long)", icon: Ruler },
    { id: "len-desc", label: "Length (Long to Short)", icon: Ruler },
    { id: "reverse", label: "Reverse Order", icon: ArrowDownUp },
    { id: "shuffle", label: "Random Shuffle", icon: Shuffle },
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
          Sort Text <span className="text-blue-400">Lines</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Alphabetize, randomize, or sort lines by length and natural numbers instantly.
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
                <ArrowDownAZ className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Line Organizer</h2>
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
                  placeholder="Paste your unorganized list here..."
                  className="h-[250px] sm:h-[350px] lg:h-[500px] w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
                />
              </div>

              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800">Sorted Result</label>
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
                  placeholder="Your sorted text will display here..."
                  className="h-[250px] sm:h-[350px] lg:h-[500px] w-full resize-none rounded-xl border border-slate-300 bg-slate-100 p-4 font-mono text-sm text-slate-900 focus:outline-none shadow-inner custom-scrollbar"
                />
              </div>
            </div>

            {/* RIGHT SIDE: Configuration Panel */}
            <div className="flex flex-col space-y-5 h-full">
              
              {/* Algorithm Box */}
              <div className="rounded-xl border border-slate-300 bg-slate-100/50 p-4 shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-2.5 text-slate-800 mb-3">
                  <ArrowDownAZ className="h-5 w-5" />
                  <h3 className="font-bold">Sorting Method</h3>
                </div>

                <div className="flex flex-col gap-1.5">
                  {sortOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSortMethod(opt.id as SortMethod)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-all ${
                          sortMethod === opt.id
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${sortMethod === opt.id ? "opacity-100" : "text-slate-500"}`} /> 
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Modifiers Box */}
              <div className="rounded-xl border border-slate-300 bg-slate-100/50 p-4 shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-2.5 text-slate-800 mb-3">
                  <Settings2 className="h-5 w-5" />
                  <h3 className="font-bold">List Modifiers</h3>
                </div>

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                    <span>Remove Empty Lines</span>
                    <input
                      type="checkbox"
                      checked={removeEmpty}
                      onChange={(e) => setRemoveEmpty(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800" title="When disabled, uppercase letters are sorted before lowercase.">
                    <span>Ignore Character Case</span>
                    <input
                      type="checkbox"
                      checked={ignoreCase}
                      onChange={(e) => setIgnoreCase(e.target.checked)}
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