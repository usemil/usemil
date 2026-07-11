"use client";

import { useState } from "react";
import Link from "next/link";
import CryptoJS from "crypto-js";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Lock, 
  Unlock, 
  Copy,
  Check,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function AesClient() {
  // Encrypt State
  const [encryptText, setEncryptText] = useState("");
  const [encryptKey, setEncryptKey] = useState("");
  const [encryptedResult, setEncryptedResult] = useState("");
  const [copiedEncrypt, setCopiedEncrypt] = useState(false);

  // Decrypt State
  const [decryptText, setDecryptText] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [decryptedResult, setDecryptedResult] = useState("");
  const [decryptError, setDecryptError] = useState("");
  const [copiedDecrypt, setCopiedDecrypt] = useState(false);

  // Handlers
  const handleEncrypt = () => {
    if (!encryptText || !encryptKey) return;
    const ciphertext = CryptoJS.AES.encrypt(encryptText, encryptKey).toString();
    setEncryptedResult(ciphertext);
  };

  const handleDecrypt = () => {
    if (!decryptText || !decryptKey) return;
    setDecryptError("");
    setDecryptedResult("");
    
    try {
      const bytes = CryptoJS.AES.decrypt(decryptText.trim(), decryptKey);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!originalText) {
        setDecryptError("Decryption failed. Incorrect secret key or corrupted ciphertext.");
        return;
      }
      
      setDecryptedResult(originalText);
    } catch (error) {
      setDecryptError("Decryption failed. Ensure the input is a valid AES ciphertext.");
    }
  };

  const copyToClipboard = (text: string, type: "encrypt" | "decrypt") => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === "encrypt") {
      setCopiedEncrypt(true);
      setTimeout(() => setCopiedEncrypt(false), 2000);
    } else {
      setCopiedDecrypt(true);
      setTimeout(() => setCopiedDecrypt(false), 2000);
    }
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        The Advanced Encryption Standard (AES) is a symmetric-key encryption algorithm established by the U.S. National Institute of Standards and Technology (NIST). It is used globally to secure sensitive data, from classified government documents to your daily web traffic.
      </p>
      <p>
        "Symmetric" means the exact same secret key (passphrase) is used to both encrypt and decrypt the data. Without the correct key, AES ciphertext is mathematically considered unbreakable by modern computing.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Encrypt Data",
      description: "Enter your sensitive plaintext and create a strong secret key. The tool will generate a Base64-encoded ciphertext string.",
    },
    {
      title: "Store or Share",
      description: "You can safely store the resulting ciphertext or send it over unencrypted channels. Just ensure you share the secret key via a separate, secure method.",
    },
    {
      title: "Decrypt Data",
      description: "Paste the ciphertext and the correct secret key into the Decrypt panel to instantly reveal the original message.",
    },
  ];

  const faqs = [
    {
      question: "Is it safe to encrypt highly sensitive data here?",
      answer: "Yes. The encryption and decryption happen entirely within your browser's memory using local JavaScript. We do not transmit your plaintext, ciphertext, or secret keys to any external servers.",
    },
    {
      question: "What happens if I lose my secret key?",
      answer: "If you lose the secret key, the encrypted data is gone forever. There is no 'password reset' or backdoor to recover AES-encrypted information.",
    },
    {
      question: "Why does the ciphertext change if I encrypt the same thing twice?",
      answer: "The underlying algorithm generates a random cryptographic 'salt' and Initialization Vector (IV) every time you press encrypt. This ensures that even identical messages produce completely different ciphertexts, preventing pattern analysis attacks.",
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
          AES <span className="text-blue-400">Encryption</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Securely encrypt and decrypt text using the Advanced Encryption Standard.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* LEFT: Encrypt Panel */}
          <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-700/20 pb-4">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Encrypt Message</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-800">Plaintext Data</label>
                <textarea
                  value={encryptText}
                  onChange={(e) => setEncryptText(e.target.value)}
                  placeholder="Enter the sensitive text you want to lock..."
                  className="h-32 w-full resize-none rounded-xl border border-slate-400 bg-white p-4 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 custom-scrollbar"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-800">Secret Key (Passphrase)</label>
                <input
                  type="text"
                  value={encryptKey}
                  onChange={(e) => setEncryptKey(e.target.value)}
                  placeholder="Enter a strong password..."
                  className="w-full rounded-xl border border-slate-400 bg-white py-2.5 pl-4 pr-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <button
                onClick={handleEncrypt}
                disabled={!encryptText || !encryptKey}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Lock className="h-4 w-4" /> Encrypt Data
              </button>

              {encryptedResult && (
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-blue-800">Ciphertext Result</span>
                    <button
                      onClick={() => copyToClipboard(encryptedResult, "encrypt")}
                      className="text-blue-700 transition-colors hover:text-blue-500"
                    >
                      {copiedEncrypt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={encryptedResult}
                    className="h-24 w-full resize-none bg-transparent font-mono text-sm font-medium text-slate-900 focus:outline-none custom-scrollbar"
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Decrypt Panel */}
          <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-700/20 pb-4">
              <div className="rounded-lg bg-slate-800 p-2 text-white shadow-sm">
                <Unlock className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Decrypt Message</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-800">Encrypted Ciphertext</label>
                <textarea
                  value={decryptText}
                  onChange={(e) => setDecryptText(e.target.value)}
                  placeholder="Paste the Base64 ciphertext (e.g., U2FsdGVkX1...)"
                  className="h-32 w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 custom-scrollbar"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-800">Secret Key (Passphrase)</label>
                <input
                  type="text"
                  value={decryptKey}
                  onChange={(e) => setDecryptKey(e.target.value)}
                  placeholder="Enter the original password..."
                  className="w-full rounded-xl border border-slate-400 bg-white py-2.5 pl-4 pr-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <button
                onClick={handleDecrypt}
                disabled={!decryptText || !decryptKey}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Unlock className="h-4 w-4" /> Decrypt Data
              </button>

              {decryptError && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-bold">{decryptError}</p>
                </div>
              )}

              {decryptedResult && (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-emerald-800">Decrypted Plaintext</span>
                    <button
                      onClick={() => copyToClipboard(decryptedResult, "decrypt")}
                      className="text-emerald-700 transition-colors hover:text-emerald-500"
                    >
                      {copiedDecrypt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={decryptedResult}
                    className="h-24 w-full resize-none bg-transparent font-sans text-sm font-medium text-slate-900 focus:outline-none custom-scrollbar"
                  />
                </div>
              )}
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