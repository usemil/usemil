"use client";

import { useState } from "react";
import Link from "next/link";
import forge from "node-forge";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Copy, 
  Check, 
  Trash2,
  Key,
  Unlock,
  Lock,
  Loader2,
  AlertTriangle
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function RsaClient() {
  const [keySize, setKeySize] = useState<number>(2048);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedPrivate, setCopiedPrivate] = useState(false);

  const generateKeys = () => {
    setIsGenerating(true);
    setPublicKey("");
    setPrivateKey("");

    // node-forge's generateKeyPair is asynchronous when a callback is provided
    // We wrap it in a slight timeout to ensure React renders the loading spinner first
    setTimeout(() => {
      forge.pki.rsa.generateKeyPair({ bits: keySize, workers: -1 }, (err, keypair) => {
        if (err) {
          console.error("Key generation failed", err);
          setIsGenerating(false);
          return;
        }
        
        const pubPem = forge.pki.publicKeyToPem(keypair.publicKey);
        const privPem = forge.pki.privateKeyToPem(keypair.privateKey);
        
        setPublicKey(pubPem);
        setPrivateKey(privPem);
        setIsGenerating(false);
      });
    }, 50);
  };

  const copyToClipboard = (text: string, type: "public" | "private") => {
    if (!text) return;

    // Strip PEM headers, footers, and all line breaks to get the raw base64 string
    const rawKey = text
      .replace(/-----BEGIN [A-Z ]+-----/, "")
      .replace(/-----END [A-Z ]+-----/, "")
      .replace(/\s+/g, ""); // Removes all whitespace and newlines

    navigator.clipboard.writeText(rawKey);

    if (type === "public") {
      setCopiedPublic(true);
      setTimeout(() => setCopiedPublic(false), 2000);
    } else {
      setCopiedPrivate(true);
      setTimeout(() => setCopiedPrivate(false), 2000);
    }
  };

  const clearAll = () => {
    setPublicKey("");
    setPrivateKey("");
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        RSA (Rivest-Shamir-Adleman) is a public-key cryptosystem that is widely used for secure data transmission. Unlike symmetric algorithms (like AES) where the same key locks and unlocks the data, RSA uses an <strong>asymmetric</strong> key pair.
      </p>
      <p>
        The <strong>Public Key</strong> can be shared openly with anyone. They use it to encrypt a message. However, once encrypted, that message can <em>only</em> be decrypted by the mathematically linked <strong>Private Key</strong>, which must be kept completely secret.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Select Key Size",
      description: "Choose your bit length. 2048-bit is the current industry standard. 4096-bit is highly secure but will take several seconds to generate in your browser.",
    },
    {
      title: "Generate Key Pair",
      description: "Click generate. Your browser will perform complex prime-number mathematics locally to construct a cryptographically secure PEM-formatted pair.",
    },
    {
      title: "Securely Store Keys",
      description: "Copy your Private Key and store it in a secure vault. You can safely share the Public Key with external services (like GitHub or remote servers).",
    },
  ];

  const faqs = [
    {
      question: "Why is 4096-bit taking so long?",
      answer: "Generating an RSA key requires finding two massive, cryptographically secure prime numbers. Doing this prime-number generation in browser-based JavaScript on a 4096-bit scale is extremely CPU-intensive and can take up to 20 seconds on older devices.",
    },
    {
      question: "Is it safe to generate SSH/RSA keys in a browser?",
      answer: "Yes, provided the code runs entirely locally. Because this tool uses JavaScript to compute the keys on your own device's CPU, the unencrypted private key is never transmitted across the network.",
    },
    {
      question: "Can I derive the private key from the public key?",
      answer: "No. That is the fundamental math behind RSA. While they are linked, current computing power would take millions of years to factor the massive prime numbers required to guess the private key from the public key.",
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
          RSA <span className="text-blue-400">Key Generator</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Generate secure 1024, 2048, or 4096-bit asymmetric RSA key pairs in PEM format.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          {/* Controls Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/20 pb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <Key className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Key Pair Configuration</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={keySize}
                onChange={(e) => setKeySize(Number(e.target.value))}
                disabled={isGenerating}
                className="rounded-lg border border-slate-400 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 focus:border-blue-600 focus:outline-none disabled:opacity-50"
              >
                <option value={1024}>1024-bit (Fast, Less Secure)</option>
                <option value={2048}>2048-bit (Standard)</option>
                <option value={4096}>4096-bit (Secure, Very Slow)</option>
              </select>
              
              <button
                onClick={generateKeys}
                disabled={isGenerating}
                className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Key className="h-4 w-4" />}
                {isGenerating ? "Computing Primes..." : "Generate Keys"}
              </button>

              <button
                onClick={clearAll}
                disabled={isGenerating}
                className="flex items-center gap-1.5 rounded-lg border border-slate-400 bg-transparent px-3 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {keySize === 4096 && !publicKey && !isGenerating && (
            <div className="mb-6 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">
                <strong>Warning:</strong> Generating a 4096-bit key in the browser is computationally intense. Your browser may appear to freeze for 5 to 20 seconds while calculating the prime numbers.
              </p>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            
            {/* Public Key Panel */}
            <div className="flex flex-col rounded-xl border border-slate-300 bg-slate-100/50 p-5 shadow-inner">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800">
                  <Unlock className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-bold">Public Key</h3>
                </div>
                <button
                  onClick={() => copyToClipboard(publicKey, "public")}
                  disabled={!publicKey}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-colors disabled:opacity-50 ${copiedPublic ? "bg-emerald-600" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {copiedPublic ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedPublic ? "Copied" : "Copy Public"}
                </button>
              </div>
              
              <textarea
                readOnly
                value={publicKey}
                placeholder="Public Key (PEM) will appear here..."
                className="h-72 w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-xs text-slate-700 focus:outline-none custom-scrollbar"
              />
            </div>

            {/* Private Key Panel */}
            <div className="flex flex-col rounded-xl border border-slate-300 bg-slate-100/50 p-5 shadow-inner">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800">
                  <Lock className="h-5 w-5 text-red-600" />
                  <h3 className="font-bold">Private Key</h3>
                </div>
                <button
                  onClick={() => copyToClipboard(privateKey, "private")}
                  disabled={!privateKey}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-colors disabled:opacity-50 ${copiedPrivate ? "bg-emerald-600" : "bg-slate-800 hover:bg-slate-700"}`}
                >
                  {copiedPrivate ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedPrivate ? "Copied" : "Copy Private"}
                </button>
              </div>
              
              <textarea
                readOnly
                value={privateKey}
                placeholder="Private Key (PEM) will appear here. Keep this secret!"
                className="h-72 w-full resize-none rounded-xl border border-red-300/50 bg-white p-4 font-mono text-xs text-slate-700 focus:outline-none custom-scrollbar"
              />
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