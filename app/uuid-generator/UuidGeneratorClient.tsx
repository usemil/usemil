"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Copy, 
  Check, 
  RefreshCw,
  Trash2,
  Settings2
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function UuidGeneratorClient() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateUuids = useCallback(() => {
    const newUuids = Array.from({ length: quantity }, () => {
      let id = uuidv4();
      if (!hyphens) id = id.replace(/-/g, "");
      if (uppercase) id = id.toUpperCase();
      return id;
    });
    setUuids(newUuids);
  }, [quantity, uppercase, hyphens]);

  // Generate on initial load and when formatting options change
  useEffect(() => {
    generateUuids();
  }, [generateUuids]);

  const handleQuantityBlur = () => {
    let num = parseInt(quantityInput, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > 500) num = 500; // Cap at 500 to prevent browser freezing
    
    setQuantityInput(num.toString());
    setQuantity(num);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleQuantityBlur();
    }
  };

  const copyToClipboard = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        The UseMil UUID/GUID Generator allows you to instantly generate version 4 Universally Unique Identifiers. A UUID is a 128-bit label used for information in computer systems. Version 4 UUIDs are generated using cryptographic pseudo-random number generators, ensuring that the probability of a collision (generating the same ID twice) is virtually zero.
      </p>
      <p>
        Whether you need a single primary key for a database or hundreds of unique IDs for mock data, this tool can generate up to 500 UUIDs instantly. 
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Set Quantity",
      description: "Enter the number of UUIDs you need (between 1 and 500). Press enter or click outside the box to apply.",
    },
    {
      title: "Choose Formatting",
      description: "Toggle the settings to remove hyphens or switch the characters to uppercase depending on your database requirements.",
    },
    {
      title: "Generate and Copy",
      description: "Click the refresh icon to generate a new batch, and use the copy button to instantly copy all generated UUIDs to your clipboard.",
    },
  ];

  const faqs = [
    {
      question: "What is the difference between UUID and GUID?",
      answer: "They are essentially the same thing. UUID (Universally Unique Identifier) is the standard term used across the internet, while GUID (Globally Unique Identifier) is the specific term originally popularized by Microsoft.",
    },
    {
      question: "Are these UUIDs truly random?",
      answer: "Yes, this tool generates Version 4 UUIDs which are created using strong cryptographic randomness, making them completely unpredictable and safe for production databases.",
    },
    {
      question: "Can I generate UUIDs offline?",
      answer: "Absolutely. The generation logic is bundled into the JavaScript running on your browser, so you can generate thousands of IDs without an active internet connection.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Tool Hero Header */}
      <div className="px-6 py-12 text-center sm:py-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Utilities
        </Link>
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          UUID/GUID <span className="text-blue-400">Generator</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Generate random, cryptographically secure v4 UUIDs for your applications.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      {/* Main Workspace */}
      <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            
            {/* Left: Output Area */}
            <div className="flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-700">Generated UUIDs</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={generateUuids}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-colors ${copied ? "bg-emerald-600" : "bg-slate-800 hover:bg-slate-700"}`}
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} 
                    {copied ? "Copied!" : "Copy All"}
                  </button>
                </div>
              </div>
              <textarea
                readOnly
                value={uuids.join("\n")}
                className="h-64 w-full resize-none rounded-xl border border-slate-700 bg-slate-900 p-4 font-mono text-sm text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 custom-scrollbar"
              />
              <div className="mt-2 text-right text-xs font-medium text-slate-600">
                Showing {uuids.length} UUID{uuids.length !== 1 && "s"}
              </div>
            </div>

            {/* Right: Settings Panel */}
            <div className="flex flex-col space-y-6 rounded-xl border border-slate-300 bg-slate-100/50 p-5 shadow-inner">
              <div className="flex items-center gap-2 text-slate-800 border-b border-slate-300 pb-3">
                <Settings2 className="h-5 w-5" />
                <h3 className="font-bold">Settings</h3>
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Quantity (Max 500)
                </label>
                <input
                  type="text"
                  value={quantityInput}
                  onChange={(e) => setQuantityInput(e.target.value)}
                  onBlur={handleQuantityBlur}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Formatting Toggles */}
              <div className="space-y-4 pt-2">
                <label className="flex cursor-pointer items-center justify-between text-sm font-medium text-slate-700">
                  <span>Include Hyphens</span>
                  <input
                    type="checkbox"
                    checked={hyphens}
                    onChange={(e) => setHyphens(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
                <label className="flex cursor-pointer items-center justify-between text-sm font-medium text-slate-700">
                  <span>Uppercase</span>
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>

              <button
                onClick={() => setUuids([])}
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" /> Clear Output
              </button>
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