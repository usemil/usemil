"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ShieldCheck, Copy, Check, RefreshCw, ChevronLeft } from "lucide-react";
import StrengthBar from "@/components/tools/StrengthBar";
import ConfigOptions from "@/components/tools/ConfigOptions";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

 const generatePassword = useCallback(() => {
    let charset = "";
    const guaranteedChars: string[] = [];

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // 1. Build the charset and grab at least one of each selected type
    if (includeUppercase) {
      charset += upperChars;
      guaranteedChars.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
    }
    if (includeLowercase) {
      charset += lowerChars;
      guaranteedChars.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);
    }
    if (includeNumbers) {
      charset += numberChars;
      guaranteedChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    }
    if (includeSymbols) {
      charset += symbolChars;
      guaranteedChars.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
    }

    if (!charset) {
      setPassword("Select at least one option!");
      return;
    }

    // 2. Fill the remaining length with completely random characters from the allowed sets
    const remainingLength = length - guaranteedChars.length;
    let generated = guaranteedChars.join("");

    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }

    // 3. Securely shuffle the password (Fisher-Yates Algorithm) so the guaranteed characters aren't predictably at the start
    let chars = generated.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    
    setPassword(chars.join(''));
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password || password.startsWith("Select")) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthLabel = () => {
    const activeCount = [includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length;
    if (password.startsWith("Select")) return { text: "Invalid", color: "text-red-600" };
    if (length < 8 || activeCount <= 1) return { text: "Weak", color: "text-red-600" };
    if (length < 12 || activeCount <= 2) return { text: "Medium", color: "text-amber-600" };
    return { text: "Strong", color: "text-emerald-700" };
  };

  const strength = getStrengthLabel();

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
          Password <span className="text-blue-400">Generator</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Generate strong, random character strings securely on your browser instance.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Client-Side: Data logic stays localized to your system runtime environment.
        </div>
      </div>

      {/* Main Workspace Tool Grid Container */}
      <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          {/* Display Output Area */}
          <div className="mb-6 flex items-center justify-between gap-2 rounded-xl bg-slate-900 p-4 border border-slate-700">
            <span className={`font-mono text-base tracking-wider break-all select-all sm:text-xl ${password.startsWith("Select") ? "text-red-400 font-sans" : "text-white"}`}>
              {password}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={generatePassword}
                className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                title="Regenerate"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={copyToClipboard}
                className={`p-2 transition-colors ${copied ? "text-emerald-400" : "text-slate-400 hover:text-blue-400"}`}
                title="Copy Code"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Extracted Strength Badge */}
          <StrengthBar text={strength.text} color={strength.color} />

          {/* Extracted Form Inputs */}
          <ConfigOptions
            length={length}
            setLength={setLength}
            includeUppercase={includeUppercase}
            setIncludeUppercase={setIncludeUppercase}
            includeLowercase={includeLowercase}
            setIncludeLowercase={setIncludeLowercase}
            includeNumbers={includeNumbers}
            setIncludeNumbers={setIncludeNumbers}
            includeSymbols={includeSymbols}
            setIncludeSymbols={setIncludeSymbols}
            onGenerate={generatePassword}
          />

        </div>
      </div>
    </div>
  );
}