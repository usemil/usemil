"use client";

import { useState } from "react";
import Link from "next/link";
import SHA1 from "crypto-js/sha1";
import SHA256 from "crypto-js/sha256";
import SHA512 from "crypto-js/sha512";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Copy, 
  Check, 
  Trash2,
  Binary
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function ShaClient() {
  const [inputText, setInputText] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Compute hashes in real-time
  const computeHash = (hashFn: any) => {
    if (!inputText) return "";
    const hash = hashFn(inputText).toString();
    return uppercase ? hash.toUpperCase() : hash;
  };

  const hashes = {
    sha1: computeHash(SHA1),
    sha256: computeHash(SHA256),
    sha512: computeHash(SHA512),
  };

  const copyToClipboard = (text: string, type: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const clearAll = () => {
    setInputText("");
    setCopiedType(null);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        The Secure Hash Algorithm (SHA) family is a set of cryptographic hash functions published by the National Institute of Standards and Technology (NIST). This tool allows you to instantly generate the three most common variants: SHA-1, SHA-256, and SHA-512.
      </p>
      <p>
        While SHA-1 is largely deprecated due to collision vulnerabilities, SHA-256 and SHA-512 (part of the SHA-2 family) remain the gold standard for global web security. They are used in SSL certificates, blockchain technology (like Bitcoin), and secure data verification.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Enter your Data",
      description: "Type or paste your text into the input field. The tool will process the data simultaneously across all three algorithms in real-time.",
    },
    {
      title: "Format Output",
      description: "Use the global uppercase toggle if your database or verification system requires uppercase hexadecimal strings.",
    },
    {
      title: "Copy the Result",
      description: "Click the copy icon next to the specific hash variant (SHA-1, SHA-256, or SHA-512) you need to use.",
    },
  ];

  const faqs = [
    {
      question: "Which SHA algorithm should I use?",
      answer: "Always use SHA-256 or SHA-512 for new applications. SHA-1 is considered cryptographically broken and should only be used for verifying legacy data or checksums on older files.",
    },
    {
      question: "Can these hashes be reversed?",
      answer: "No. Cryptographic hashes are mathematically designed to be one-way functions. You cannot reverse a hash back into its original text.",
    },
    {
      question: "Does this handle large amounts of text?",
      answer: "Yes, the local engine can process paragraphs of text instantly. However, very large file structures (like hashing an entire video) would require a dedicated file-hashing utility rather than this text-based tool.",
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
          SHA <span className="text-blue-400">Hash Generator</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Instantly compute SHA-1, SHA-256, and SHA-512 cryptographic hashes simultaneously.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      {/* Main Workspace */}
      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          <div className="mb-6 flex items-center justify-between border-b border-slate-700/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <Binary className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Live SHA Suite</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-800">
                <span>Uppercase Output</span>
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                />
              </label>
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 rounded-lg border border-slate-400 bg-transparent px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
              >
                <Trash2 className="h-4 w-4" /> Clear
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* Input Area */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Plaintext Input
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="h-64 w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 custom-scrollbar"
              />
            </div>

            {/* Output Area */}
            <div className="flex flex-col space-y-4">
              
              {/* SHA-1 */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">SHA-1 (160-bit)</label>
                  <button
                    onClick={() => copyToClipboard(hashes.sha1, "sha1")}
                    disabled={!hashes.sha1}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold text-white transition-colors disabled:opacity-50 ${copiedType === "sha1" ? "bg-emerald-600" : "bg-slate-800 hover:bg-slate-700"}`}
                  >
                    {copiedType === "sha1" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedType === "sha1" ? "Copied" : "Copy"}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={hashes.sha1}
                  className="h-16 w-full resize-none rounded-xl border border-slate-400 bg-slate-100 p-3 font-mono text-xs font-medium text-slate-900 focus:outline-none"
                />
              </div>

              {/* SHA-256 */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">SHA-256 (256-bit)</label>
                  <button
                    onClick={() => copyToClipboard(hashes.sha256, "sha256")}
                    disabled={!hashes.sha256}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold text-white transition-colors disabled:opacity-50 ${copiedType === "sha256" ? "bg-emerald-600" : "bg-slate-800 hover:bg-slate-700"}`}
                  >
                    {copiedType === "sha256" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedType === "sha256" ? "Copied" : "Copy"}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={hashes.sha256}
                  className="h-20 w-full resize-none rounded-xl border border-slate-400 bg-slate-100 p-3 font-mono text-xs font-medium text-slate-900 focus:outline-none"
                />
              </div>

              {/* SHA-512 */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">SHA-512 (512-bit)</label>
                  <button
                    onClick={() => copyToClipboard(hashes.sha512, "sha512")}
                    disabled={!hashes.sha512}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold text-white transition-colors disabled:opacity-50 ${copiedType === "sha512" ? "bg-emerald-600" : "bg-slate-800 hover:bg-slate-700"}`}
                  >
                    {copiedType === "sha512" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedType === "sha512" ? "Copied" : "Copy"}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={hashes.sha512}
                  className="h-24 w-full resize-none rounded-xl border border-slate-400 bg-slate-100 p-3 font-mono text-xs font-medium text-slate-900 focus:outline-none"
                />
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