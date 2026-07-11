"use client";

import { useState } from "react";
import Link from "next/link";
import bcrypt from "bcryptjs";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  XCircle,
  Copy,
  Check,
  RefreshCw,
  Loader2
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function BcryptClient() {
  // Generator State
  const [textToHash, setTextToHash] = useState("");
  const [saltRounds, setSaltRounds] = useState(10);
  const [generatedHash, setGeneratedHash] = useState("");
  const [isHashing, setIsHashing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Verifier State
  const [verifyText, setVerifyText] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);

  // Generate Hash Logic
  const handleGenerate = () => {
    if (!textToHash) return;
    setIsHashing(true);
    setGeneratedHash("");
    
    // bcryptjs uses a timeout internally so it doesn't completely freeze the UI
    setTimeout(() => {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(textToHash, salt);
      setGeneratedHash(hash);
      setIsHashing(false);
    }, 50);
  };

  // Verify Hash Logic
  const handleVerify = () => {
    if (!verifyText || !verifyHash) return;
    setIsVerifying(true);
    setIsMatch(null);

    setTimeout(() => {
      try {
        const match = bcrypt.compareSync(verifyText, verifyHash);
        setIsMatch(match);
      } catch (error) {
        setIsMatch(false); // Fails if the hash format is totally invalid
      }
      setIsVerifying(false);
    }, 50);
  };

  const copyToClipboard = () => {
    if (!generatedHash) return;
    navigator.clipboard.writeText(generatedHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        Bcrypt is an industry-standard password-hashing function designed by Niels Provos and David Mazières. Unlike fast hashing algorithms (like MD5 or SHA-256), Bcrypt incorporates "key stretching" and salts. 
      </p>
      <p>
        The algorithm is specifically designed to be computationally slow. By increasing the "Salt Rounds," the time it takes to compute a hash doubles with each increment. This intentionally limits how many passwords a hacker can guess per second during a brute-force attack.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Generate a Hash",
      description: "Enter your plaintext string, select your salt rounds (10-12 is modern standard), and generate. Note: High salt rounds will take longer to compute.",
    },
    {
      title: "Verify a Hash",
      description: "Because bcrypt generates a random salt, the same password hashed twice will look different. Use the Verification panel to check if a plaintext string matches an existing hash.",
    },
  ];

  const faqs = [
    {
      question: "Can I decrypt a Bcrypt hash?",
      answer: "No. Hashing is a one-way cryptographic process. You cannot 'decrypt' a hash back into text; you can only compare new text against the hash to see if they match.",
    },
    {
      question: "Why did my browser freeze slightly?",
      answer: "Bcrypt is extremely CPU-intensive by design. If you select a high number of salt rounds (like 14+), it forces your device's processor to do massive amounts of math. Since JavaScript is single-threaded, this will pause the browser momentarily.",
    },
    {
      question: "Why does the hash change every time?",
      answer: "Bcrypt automatically generates a random 'salt' (a string of random characters) and attaches it to your password before hashing. This ensures that even if two users have the exact same password, their database hashes will look completely different.",
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
          Bcrypt <span className="text-blue-400">Generator & Verifier</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Securely hash strings and verify bcrypt hashes natively in your browser.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      {/* Main Workspace */}
      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* LEFT: Generator Panel */}
          <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-700/20 pb-4">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Generate Hash</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-800">String to Hash</label>
                <input
                  type="text"
                  value={textToHash}
                  onChange={(e) => setTextToHash(e.target.value)}
                  placeholder="Enter secret string..."
                  className="w-full rounded-xl border border-slate-400 bg-white py-2.5 pl-4 pr-4 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm font-bold text-slate-800">
                  <label>Salt Rounds (Work Factor)</label>
                  <span className="rounded-md bg-slate-800 px-2.5 py-0.5 font-mono text-white">{saltRounds}</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="16"
                  value={saltRounds}
                  onChange={(e) => setSaltRounds(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-blue-600"
                />
                <p className="mt-2 text-xs font-medium text-slate-600">
                  Warning: Values above 12 may cause your browser to freeze momentarily during calculation.
                </p>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!textToHash || isHashing}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isHashing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                {isHashing ? "Computing Hash..." : "Generate Bcrypt Hash"}
              </button>

              {generatedHash && (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-emerald-800">Result</span>
                    <button
                      onClick={copyToClipboard}
                      className="text-emerald-700 transition-colors hover:text-emerald-500"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="break-all font-mono text-sm font-medium text-slate-900">
                    {generatedHash}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Verifier Panel */}
          <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-700/20 pb-4">
              <div className="rounded-lg bg-slate-800 p-2 text-white shadow-sm">
                <Unlock className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Verify Hash</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-800">Plaintext String</label>
                <input
                  type="text"
                  value={verifyText}
                  onChange={(e) => setVerifyText(e.target.value)}
                  placeholder="Enter original string..."
                  className="w-full rounded-xl border border-slate-400 bg-white py-2.5 pl-4 pr-4 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-800">Bcrypt Hash</label>
                <input
                  type="text"
                  value={verifyHash}
                  onChange={(e) => setVerifyHash(e.target.value)}
                  placeholder="$2a$10$..."
                  className="w-full rounded-xl border border-slate-400 bg-white py-2.5 pl-4 pr-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={!verifyText || !verifyHash || isVerifying}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                {isVerifying ? "Verifying..." : "Verify Match"}
              </button>

              {isMatch !== null && (
                <div className={`mt-4 rounded-xl border p-4 flex items-center gap-3 ${isMatch ? "border-emerald-500/30 bg-emerald-50 text-emerald-800" : "border-red-500/30 bg-red-50 text-red-800"}`}>
                  {isMatch ? <CheckCircle2 className="h-6 w-6 shrink-0" /> : <XCircle className="h-6 w-6 shrink-0" />}
                  <div>
                    <h4 className="font-bold">{isMatch ? "Match Found" : "No Match"}</h4>
                    <p className="text-xs mt-0.5">
                      {isMatch ? "The plaintext string matches the hash signature." : "The plaintext string does not match this hash."}
                    </p>
                  </div>
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