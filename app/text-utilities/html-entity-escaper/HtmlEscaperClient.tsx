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
  Code2,
  FileDigit,
  FileText
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

type Mode = "encode" | "decode";

export default function HtmlEscaperClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  
  // Settings State
  const [mode, setMode] = useState<Mode>("encode");
  
  // Analytics State
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);

  // Conversion Logic
  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      setCharCount(0);
      return;
    }

    setCharCount(inputText.length);

    if (mode === "encode") {
      // Safely encode the 5 core HTML entities
      const encoded = inputText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
      setOutputText(encoded);
    } else {
      // Safely decode entities back to raw text using the browser's native DOM parser
      try {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = inputText;
        setOutputText(textarea.value);
      } catch (e) {
        setOutputText("Error decoding input.");
      }
    }
  }, [inputText, mode]);

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
        The HTML Entities Escaper is a critical developer utility that converts reserved HTML characters (like <code>&lt;</code>, <code>&gt;</code>, and <code>&amp;</code>) into safe string entities. This allows you to display code snippets on a webpage without the browser accidentally executing them.
      </p>
      <p>
        By toggling into <strong>Decode Mode</strong>, you can also reverse the process, turning an unreadable block of encoded entities back into raw, readable HTML. This process happens instantly and entirely within your local browser, meaning your proprietary code is never sent to a remote server.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Input your Code",
      description: "Paste your raw HTML, script tags, or text block into the Original Content panel.",
    },
    {
      title: "Select Processing Mode",
      description: "Use the toggle switch on the right panel to choose whether you want to Encode (make safe) or Decode (revert to raw code) the input.",
    },
    {
      title: "Copy the Safe String",
      description: "Click the 'Copy Result' button to instantly grab the converted output and paste it directly into your CMS or codebase.",
    },
  ];

  const faqs = [
    {
      question: "Which characters does this tool encode?",
      answer: "To ensure maximum safety and compatibility, the tool encodes the five core reserved characters in HTML: Ampersands (&), Less-than (<), Greater-than (>), Double Quotes (\"), and Single Quotes (').",
    },
    {
      question: "Is this safe to use for preventing XSS?",
      answer: "Yes. By encoding these specific characters, any script tags or malicious HTML payloads are neutralized and rendered purely as visual text, which is a primary defense against Cross-Site Scripting (XSS).",
    },
    {
      question: "Can it decode obscure entities?",
      answer: "Yes! While the encoder focuses on the core 5 characters for efficiency, the Decoder mode utilizes the browser's native parsing engine, allowing it to correctly decode hundreds of complex HTML entities like &copy; or &euro;.",
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
          HTML Entity <span className="text-blue-400">Escaper</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Safely encode HTML tags or decode entity strings instantly in your browser.
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
                <Code2 className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Entity Converter</h2>
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
                  {charCount > 0 && (
                    <span className="text-xs font-bold text-slate-500">{charCount} Chars</span>
                  )}
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={mode === "encode" ? "Paste raw HTML here (e.g., <div>Hello</div>)..." : "Paste encoded string here (e.g., &lt;div&gt;)..."}
                  className="h-[250px] sm:h-[350px] lg:h-[450px] w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
                />
              </div>

              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800">Converted Result</label>
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
                  placeholder="Your safe converted output will appear here..."
                  className="h-[250px] sm:h-[350px] lg:h-[450px] w-full resize-none rounded-xl border border-slate-300 bg-slate-100 p-4 font-mono text-sm text-slate-900 focus:outline-none shadow-inner custom-scrollbar"
                />
              </div>
            </div>

            {/* RIGHT SIDE: Configuration Panel */}
            <div className="flex flex-col space-y-5 h-full">
              
              {/* Mode Box */}
              <div className="rounded-xl border border-slate-300 bg-slate-100/50 p-4 shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-300 pb-2.5 text-slate-800 mb-3">
                  <Settings2 className="h-4 w-4" />
                  <h3 className="font-bold text-sm">Processing Mode</h3>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setMode("encode")}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg transition-all ${mode === "encode" ? "bg-slate-900 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"}`}
                  >
                    <FileDigit className={`h-4 w-4 ${mode === "encode" ? "text-blue-400" : "text-slate-500"}`} /> 
                    Encode (Raw → Entity)
                  </button>
                  
                  <button
                    onClick={() => setMode("decode")}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-lg transition-all ${mode === "decode" ? "bg-slate-900 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"}`}
                  >
                    <FileText className={`h-4 w-4 ${mode === "decode" ? "text-emerald-400" : "text-slate-500"}`} /> 
                    Decode (Entity → Raw)
                  </button>
                </div>
                
                <p className="mt-4 text-xs font-medium text-slate-500 leading-relaxed">
                  {mode === "encode" 
                    ? "Encoding prevents browsers from executing your code. Ideal for rendering code blocks in tutorials." 
                    : "Decoding reverses safe entities back into executable syntax. Ideal for extracting data."}
                </p>
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