"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { masterDictionary } from "@/data/dictionary"; // Import the massive list
import { 
  ShieldCheck, 
  ChevronLeft, 
  Copy, 
  Check, 
  RefreshCw,
  Settings2,
  TextCursorInput,
  AlertCircle
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function PassphraseClient() {
  const [passphrase, setPassphrase] = useState("");
  const [wordCount, setWordCount] = useState(4);
  const [minLength, setMinLength] = useState(3);
  const [maxLength, setMaxLength] = useState(6);
  const [separator, setSeparator] = useState("-");
  const [capitalization, setCapitalization] = useState("lowercase");
  const [includeNumber, setIncludeNumber] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const getSecureRandomInt = (max: number) => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  };

  const generatePassphrase = useCallback(() => {
    setError("");

    // 1. Filter the master dictionary based on the user's length settings
    const availableWords = masterDictionary.filter(
      word => word.length >= minLength && word.length <= maxLength
    );

    // 2. Handle edge case where sliders cross or no words match
    if (availableWords.length === 0) {
      setError("No words found in the dictionary matching that exact length range.");
      setPassphrase("");
      return;
    }

    let selectedWords: string[] = [];

    // 3. Select random words from the FILTERED list
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = getSecureRandomInt(availableWords.length);
      selectedWords.push(availableWords[randomIndex]);
    }

    // Apply capitalization
    selectedWords = selectedWords.map(word => {
      if (capitalization === "uppercase") return word.toUpperCase();
      if (capitalization === "capitalize") return word.charAt(0).toUpperCase() + word.slice(1);
      return word; 
    });

    // Inject numbers
    if (includeNumber) {
      const targetWordIndex = getSecureRandomInt(selectedWords.length);
      const randomNumber = getSecureRandomInt(100); 
      selectedWords[targetWordIndex] = `${selectedWords[targetWordIndex]}${randomNumber}`;
    }

    setPassphrase(selectedWords.join(separator));
  }, [wordCount, minLength, maxLength, separator, capitalization, includeNumber]);

  useEffect(() => {
    generatePassphrase();
  }, [generatePassphrase]);

  // Prevent Max Length from being lower than Min Length
  const handleMinChange = (val: number) => {
    setMinLength(val);
    if (val > maxLength) setMaxLength(val);
  };

  const handleMaxChange = (val: number) => {
    setMaxLength(val);
    if (val < minLength) setMinLength(val);
  };

  const copyToClipboard = () => {
    if (!passphrase) return;
    navigator.clipboard.writeText(passphrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        A Passphrase Generator creates passwords by stringing together random dictionary words instead of random character jumbles. This method relies on the mathematical principle that length is the most critical factor in password entropy.
      </p>
      <p>
        For example, a phrase like <code>correct-horse-battery-staple</code> is astronomically harder for a computer to crack than <code>Tr0ub4dor&3</code>, yet it is significantly easier for a human brain to memorize and type. 
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Set Word Count & Length",
      description: "Select how many words you want, and restrict the length of those words to ensure the phrase isn't too long to type.",
    },
    {
      title: "Customize Formatting",
      description: "Adjust the separator (hyphens, spaces, dots) and capitalization to match the specific requirements of the website you are registering on.",
    },
    {
      title: "Add Entropy (Optional)",
      description: "Many sites require at least one number. Use the 'Include Numbers' toggle to securely inject random digits into your phrase.",
    },
  ];

  const faqs = [
    {
      question: "Are passphrases really better than passwords?",
      answer: "Yes, in almost every scenario. A 4-word passphrase is typically 25+ characters long. A hacker attempting a brute-force attack would need centuries to guess it, whereas an 8-character complex password can often be cracked in hours.",
    },
    {
      question: "Is this cryptographically secure?",
      answer: "Yes. Instead of using standard JavaScript Math.random() (which is predictable), this tool uses the browser's Web Crypto API to ensure the word selection is cryptographically random and safe for production use.",
    },
    {
      question: "Can I use spaces in my password?",
      answer: "Many modern systems and password managers fully support spaces in passwords. However, if a legacy system rejects spaces, you can easily switch the separator to hyphens or underscores.",
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
          Passphrase <span className="text-blue-400">Generator</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Generate secure, memorable passwords using randomized dictionary words.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            
            {/* Left: Output & Generation */}
            <div className="flex flex-col">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-700/20 pb-4">
                <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                  <TextCursorInput className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Your Passphrase</h2>
              </div>

              <div className="mb-6 rounded-xl border border-slate-400 bg-white p-6 shadow-sm">
                {error ? (
                   <div className="flex items-center justify-center gap-2 text-red-600 font-bold h-12">
                     <AlertCircle className="h-5 w-5" /> {error}
                   </div>
                ) : (
                  <div className="text-center font-mono text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl break-all">
                    {passphrase}
                  </div>
                )}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-4">
                <button
                  onClick={generatePassphrase}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-400 bg-white py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                >
                  <RefreshCw className="h-4 w-4" /> Generate New
                </button>
                <button
                  onClick={copyToClipboard}
                  disabled={!!error}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${copied ? "bg-emerald-600 hover:bg-emerald-500" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy Phrase"}
                </button>
              </div>
            </div>

            {/* Right: Settings Panel */}
            <div className="flex flex-col space-y-6 rounded-xl border border-slate-300 bg-slate-100/50 p-5 shadow-inner">
              <div className="flex items-center gap-2 border-b border-slate-300 pb-3 text-slate-800">
                <Settings2 className="h-5 w-5" />
                <h3 className="font-bold">Configuration</h3>
              </div>

              {/* Word Count */}
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm font-bold text-slate-800">
                  <label>Number of Words</label>
                  <span className="rounded-md bg-slate-800 px-2.5 py-0.5 font-mono text-white">{wordCount}</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-blue-600"
                />
              </div>

              {/* Min Length */}
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm font-bold text-slate-800">
                  <label>Min Word Length</label>
                  <span className="rounded-md bg-slate-800 px-2.5 py-0.5 font-mono text-white">{minLength}</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={minLength}
                  onChange={(e) => handleMinChange(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-blue-600"
                />
              </div>

              {/* Max Length */}
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm font-bold text-slate-800">
                  <label>Max Word Length</label>
                  <span className="rounded-md bg-slate-800 px-2.5 py-0.5 font-mono text-white">{maxLength}</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={maxLength}
                  onChange={(e) => handleMaxChange(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-blue-600"
                />
              </div>

              {/* Separator */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">Separator</label>
                <select
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  className="w-full rounded-lg border border-slate-400 bg-white p-2.5 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
                >
                  <option value="-">Hyphen (-)</option>
                  <option value=" ">Space ( )</option>
                  <option value="_">Underscore (_)</option>
                  <option value=".">Period (.)</option>
                  <option value="">None</option>
                </select>
              </div>

              {/* Include Numbers */}
              <div className="pt-2">
                <label className="flex cursor-pointer items-center justify-between text-sm font-bold text-slate-800">
                  <span>Include Numbers</span>
                  <input
                    type="checkbox"
                    checked={includeNumber}
                    onChange={(e) => setIncludeNumber(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
                  />
                </label>
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