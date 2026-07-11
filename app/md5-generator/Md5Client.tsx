"use client";

import { useState } from "react";
import Link from "next/link";
import MD5 from "crypto-js/md5";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Copy, 
  Check, 
  Trash2,
  FileDigit
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function Md5Client() {
  const [inputText, setInputText] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [copied, setCopied] = useState(false);

  // Compute hash in real-time. If input is empty, clear the hash.
  const hash = inputText 
    ? (uppercase ? MD5(inputText).toString().toUpperCase() : MD5(inputText).toString())
    : "";

  const copyToClipboard = () => {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInputText("");
    setCopied(false);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        MD5 (Message-Digest Algorithm 5) is a widely used cryptographic hash function that produces a 128-bit (16-byte) hash value, typically rendered as a 32-character hexadecimal number. 
      </p>
      <p>
        While it is no longer considered secure against modern cryptographic attacks (and should <strong>never</strong> be used for hashing passwords), MD5 remains an industry standard for verifying data integrity, generating unique cache keys, and creating Gravatar profile URLs.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Enter your Data",
      description: "Type or paste your plaintext string into the input box. The tool processes the data in real-time.",
    },
    {
      title: "Format the Output",
      description: "Use the toggle switch to change the resulting 32-character hexadecimal hash to uppercase if your database or application requires it.",
    },
    {
      title: "Copy the Hash",
      description: "Click the copy button to instantly save the generated MD5 signature to your clipboard.",
    },
  ];

  const faqs = [
    {
      question: "Is MD5 secure for storing passwords?",
      answer: "No. MD5 is cryptographically broken and vulnerable to 'collision attacks' and fast dictionary brute-forcing. For passwords, you should use our Bcrypt Generator instead.",
    },
    {
      question: "What is a collision?",
      answer: "A collision occurs when two completely different pieces of text accidentally generate the exact same MD5 hash. Because of mathematical vulnerabilities discovered in MD5, hackers can intentionally create these collisions, which is why it was retired from high-security cryptographic use.",
    },
    {
      question: "Does this tool send my data to a server?",
      answer: "No. The MD5 hashing algorithm runs entirely within your browser using JavaScript. Your input text is processed locally and never leaves your device.",
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
          MD5 <span className="text-blue-400">Hash Generator</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Instantly compute MD5 cryptographic hashes from text strings directly in your browser.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      {/* Main Workspace */}
      <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          <div className="mb-6 flex items-center justify-between border-b border-slate-700/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <FileDigit className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Live MD5 Converter</h2>
            </div>
            
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 rounded-lg border border-slate-400 bg-transparent px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
            >
              <Trash2 className="h-4 w-4" /> Clear
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Input Area */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Input Text
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text here to generate an MD5 hash..."
                className="h-48 w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 custom-scrollbar"
              />
            </div>

            {/* Output Area */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800">
                  MD5 Hash Output
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700">
                  <span>Uppercase</span>
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
              
              <textarea
                readOnly
                value={hash}
                placeholder="Hash will appear here..."
                className="h-48 w-full resize-none rounded-xl border border-slate-400 bg-slate-100 p-4 font-mono text-sm font-medium text-slate-900 focus:outline-none custom-scrollbar"
              />
              
              <button
                onClick={copyToClipboard}
                disabled={!hash}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-50 ${copied ? "bg-emerald-600 hover:bg-emerald-500" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied to Clipboard!" : "Copy MD5 Hash"}
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