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
  ArrowLeftRight
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function ReverseTextClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  
  // Settings State
  const [reverseCharacters, setReverseCharacters] = useState(true);
  const [reverseWords, setReverseWords] = useState(false);
  const [reverseLines, setReverseLines] = useState(false);
  
  // Analytics State
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      setCharCount(0);
      return;
    }

    let lines = inputText.split("\n");

    // 1. Reverse the vertical order of lines
    if (reverseLines) {
      lines = lines.reverse();
    }

    // 2. Process words and characters within each line
    if (reverseWords || reverseCharacters) {
      lines = lines.map((line) => {
        let words = line.split(" ");
        
        // Reverse the sequence of words
        if (reverseWords) {
          words = words.reverse();
        }
        
        // Reverse the spelling of each word
        if (reverseCharacters) {
          words = words.map((word) => word.split("").reverse().join(""));
        }
        
        return words.join(" ");
      });
    }

    const finalResult = lines.join("\n");
    setOutputText(finalResult);
    setCharCount(finalResult.length);
  }, [inputText, reverseCharacters, reverseWords, reverseLines]);

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
        The Reverse Text generator is a simple yet powerful string manipulation tool that allows you to instantly flip text backwards. Whether you are generating mirror writing, creating palindromes, or modifying array data structures, this utility processes everything locally in milliseconds.
      </p>
      <p>
        Unlike basic text flippers, this tool provides modular execution criteria. You can choose to reverse individual characters (spelling words backwards), reverse the order of words in a sentence, or even flip the vertical order of an entire list of lines. You can also stack these modifiers for complete document reversal.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Input your Text",
      description: "Paste your standard text, paragraphs, or lists into the Original Content panel.",
    },
    {
      title: "Select Execution Modifiers",
      description: "Use the toggles on the right to choose whether you want to reverse characters, word order, line order, or a combination of all three.",
    },
    {
      title: "Copy the Result",
      description: "Click the 'Copy Result' button to grab your fully reversed text snippet.",
    },
  ];

  const faqs = [
    {
      question: "Can I reverse a list without spelling the words backwards?",
      answer: "Yes! Simply uncheck 'Reverse Characters' and check 'Reverse Line Order'. This will flip your list upside down while keeping the spelling of the items completely normal.",
    },
    {
      question: "What happens if I check all three options?",
      answer: "Checking all three options will execute a complete mirror flip of your document. The last line will become the first line, the last word will become the first word, and every word will be spelled backwards.",
    },
    {
      question: "Is my text data sent to a server?",
      answer: "No. The text reversal process happens entirely within your web browser using local JavaScript. Your data remains completely private and is never transmitted to an external server.",
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
          Reverse <span className="text-blue-400">Text</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Instantly reverse characters, flip word order, and invert text lines.
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
                <ArrowLeftRight className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Transformation Engine</h2>
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
                  placeholder="Type or paste the text you want to reverse here..."
                  className="h-[250px] sm:h-[350px] lg:h-[450px] w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
                />
              </div>

              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800">Reversed Text</label>
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
                  placeholder="Your backward text will display here..."
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
                      <span className="font-bold">Reverse Characters</span>
                      <span className="text-xs text-slate-500 mt-0.5">Reverses the spelling of every single word (e.g., 'dog' becomes 'god').</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={reverseCharacters}
                      onChange={(e) => setReverseCharacters(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-start justify-between gap-3 text-sm text-slate-800">
                    <div className="flex flex-col">
                      <span className="font-bold">Reverse Word Order</span>
                      <span className="text-xs text-slate-500 mt-0.5">Flips the sequence of words in a sentence (e.g., 'Hello World' becomes 'World Hello').</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={reverseWords}
                      onChange={(e) => setReverseWords(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex cursor-pointer items-start justify-between gap-3 text-sm text-slate-800">
                    <div className="flex flex-col">
                      <span className="font-bold">Reverse Line Order</span>
                      <span className="text-xs text-slate-500 mt-0.5">Inverts the vertical order of your document, putting the last line at the top.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={reverseLines}
                      onChange={(e) => setReverseLines(e.target.checked)}
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
                  <span className="text-slate-400">Total Characters:</span>
                  <span className="font-bold text-emerald-400">{charCount}</span>
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