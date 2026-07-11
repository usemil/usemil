"use client";

import { useState } from "react";
import Link from "next/link";
import CryptoJS from "crypto-js";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Copy, 
  Check, 
  Trash2,
  KeyRound
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function HmacClient() {
  const [message, setMessage] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [algorithm, setAlgorithm] = useState("sha256");
  const [outputFormat, setOutputFormat] = useState("hex");
  const [uppercase, setUppercase] = useState(false);
  const [copied, setCopied] = useState(false);

  // Compute HMAC dynamically
  const computeHmac = () => {
    if (!message || !secretKey) return "";

    let hashObj;
    switch (algorithm) {
      case "md5":
        hashObj = CryptoJS.HmacMD5(message, secretKey);
        break;
      case "sha1":
        hashObj = CryptoJS.HmacSHA1(message, secretKey);
        break;
      case "sha512":
        hashObj = CryptoJS.HmacSHA512(message, secretKey);
        break;
      case "sha256":
      default:
        hashObj = CryptoJS.HmacSHA256(message, secretKey);
        break;
    }

    let result = outputFormat === "base64" 
      ? CryptoJS.enc.Base64.stringify(hashObj) 
      : CryptoJS.enc.Hex.stringify(hashObj);

    if (outputFormat === "hex" && uppercase) {
      result = result.toUpperCase();
    }

    return result;
  };

  const generatedHmac = computeHmac();

  const copyToClipboard = () => {
    if (!generatedHmac) return;
    navigator.clipboard.writeText(generatedHmac);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setMessage("");
    setSecretKey("");
    setCopied(false);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        HMAC (Hash-based Message Authentication Code) is a specific type of message authentication code involving a cryptographic hash function and a secret cryptographic key. It is used to simultaneously verify both the data integrity and the authenticity of a message.
      </p>
      <p>
        HMACs are widely used in modern web APIs (like Stripe, AWS, and GitHub webhooks) to securely sign requests. By using a secret key known only to the sender and receiver, it prevents "man-in-the-middle" attackers from tampering with the payload.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Enter Data and Key",
      description: "Provide the plaintext message (payload) and the secret key. Both are required to generate an HMAC signature.",
    },
    {
      title: "Select Algorithm",
      description: "Choose the hashing algorithm. HMAC-SHA256 is the modern standard for most web APIs and webhooks.",
    },
    {
      title: "Format and Copy",
      description: "Select between Hexadecimal or Base64 output formatting depending on your API requirements, then copy the result.",
    },
  ];

  const faqs = [
    {
      question: "Why do I need a secret key?",
      answer: "Standard hashes (like regular SHA-256) only verify that data hasn't changed. HMAC uses a secret key to also prove *who* sent the data, ensuring the message came from an authorized sender who possesses the secret key.",
    },
    {
      question: "Hex vs Base64 output?",
      answer: "Hex outputs the hash as a string of numbers and letters (0-9, a-f). Base64 outputs a shorter, denser string including uppercase, lowercase, and special characters (+, /, =). Check your API documentation to see which format they expect.",
    },
    {
      question: "Is it safe to paste my API Secret Key here?",
      answer: "Yes. All computations are performed strictly in your browser using client-side JavaScript. Your secret keys and payloads are never sent over the network or logged.",
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
          HMAC <span className="text-blue-400">Generator</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Generate secure HMAC signatures using MD5, SHA-1, SHA-256, or SHA-512.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          <div className="mb-6 flex items-center justify-between border-b border-slate-700/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <KeyRound className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Live HMAC Signer</h2>
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
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Message (Payload)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter the message or JSON payload..."
                  className="h-32 w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 custom-scrollbar"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Secret Key
                </label>
                <input
                  type="text"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter your secret key..."
                  className="w-full rounded-xl border border-slate-400 bg-white p-3 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>

            {/* Output Area */}
            <div className="flex flex-col rounded-xl border border-slate-300 bg-slate-100/50 p-5 shadow-inner">
              
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Algorithm</label>
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="w-full rounded-lg border border-slate-400 bg-white p-2 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="sha256">HMAC-SHA256</option>
                    <option value="sha512">HMAC-SHA512</option>
                    <option value="sha1">HMAC-SHA1</option>
                    <option value="md5">HMAC-MD5</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Format</label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full rounded-lg border border-slate-400 bg-white p-2 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="hex">Hexadecimal</option>
                    <option value="base64">Base64</option>
                  </select>
                </div>
              </div>

              {outputFormat === "hex" && (
                <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Uppercase Output</span>
                </label>
              )}

              <div className="mt-auto">
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  HMAC Signature
                </label>
                <textarea
                  readOnly
                  value={generatedHmac}
                  placeholder="Waiting for message and key..."
                  className="h-28 w-full resize-none rounded-xl border border-slate-400 bg-slate-200 p-4 font-mono text-sm font-medium text-slate-900 focus:outline-none custom-scrollbar"
                />
                
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedHmac}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-50 ${copied ? "bg-emerald-600 hover:bg-emerald-500" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Signature Copied!" : "Copy HMAC Signature"}
                </button>
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