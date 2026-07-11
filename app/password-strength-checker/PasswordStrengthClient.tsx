"use client";

import { useState } from "react";
import Link from "next/link";
import zxcvbn from "zxcvbn";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Clock,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function PasswordStrengthClient() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Run zxcvbn on the current password
  const result = zxcvbn(password);

  // Map zxcvbn's 0-4 score to our UI colors and labels
  const getStrengthUI = (score: number, pwdLength: number) => {
    if (pwdLength === 0) return { label: "None", color: "bg-slate-300", textColor: "text-slate-500", width: "0%" };
    
    switch (score) {
      case 0: return { label: "Very Weak", color: "bg-red-600", textColor: "text-red-500", width: "15%" };
      case 1: return { label: "Weak", color: "bg-orange-500", textColor: "text-orange-500", width: "35%" };
      case 2: return { label: "Fair", color: "bg-amber-400", textColor: "text-amber-500", width: "60%" };
      case 3: return { label: "Strong", color: "bg-emerald-400", textColor: "text-emerald-500", width: "85%" };
      case 4: return { label: "Very Strong", color: "bg-emerald-500", textColor: "text-emerald-500", width: "100%" };
      default: return { label: "None", color: "bg-slate-300", textColor: "text-slate-500", width: "0%" };
    }
  };

  const strengthUI = getStrengthUI(result.score, password.length);

  const aboutDescription = (
    <>
      <p className="mb-4">
        The UseMil Password Strength Checker utilizes <strong>zxcvbn</strong>, an advanced open-source algorithm originally developed by Dropbox. Instead of just looking for symbols and numbers, it acts like a real hacker would.
      </p>
      <p className="mb-4">
        It cross-references your input against massive dictionaries of common passwords, names, television shows, and keyboard patterns (like "qwerty"). This provides a highly accurate "Time to Crack" estimation based on modern brute-force hardware.
      </p>
      <p>
        Entering your actual passwords into online forms is inherently dangerous. Because this tool operates entirely within your browser using JavaScript, your password data never leaves your device, ensuring complete privacy while you audit your security.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Type your Password",
      description: "Enter the password or passphrase you want to test into the secure input field.",
    },
    {
      title: "Review the Crack Time",
      description: "Look at the estimated time it would take a computer to guess your password. Aim for centuries, not seconds.",
    },
    {
      title: "Read the Feedback",
      description: "If your password is weak, the algorithm will provide specific warnings (like 'Avoid repeated words') and actionable suggestions to improve it.",
    },
  ];

  const faqs = [
    {
      question: "Is it safe to type my real password here?",
      answer: "Yes. This tool is built specifically to never transmit data. There are no API calls or database connections—everything is evaluated locally on your own CPU.",
    },
    {
      question: "Why does it say my long password is weak?",
      answer: "If your password is long but consists of common words (like 'correcthorsebatterystaple' or 'admin123456789'), the dictionary algorithm recognizes it. Hackers use these same dictionaries, so common patterns are instantly cracked regardless of length.",
    },
    {
      question: "What hardware is the 'Time to Crack' based on?",
      answer: "The algorithm calculates time based on a slow offline hashing scenario (like bcrypt or PBKDF2) at roughly 10,000 guesses per second. If the database was breached without these protections, the real crack time would be significantly faster.",
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
          Password <span className="text-blue-400">Strength Checker</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Instantly evaluate password entropy against real-world dictionary attacks.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      {/* Main Workspace */}
      <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          {/* Input Area */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-bold text-gray-900 sm:text-base">
              Test your password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Start typing..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3.5 pl-4 pr-12 text-lg text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Dynamic Strength Meter */}
          <div className="mb-6 rounded-xl bg-slate-100/60 p-5 border border-slate-200 shadow-inner">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-600">Security Rating</span>
              <span className={`text-sm font-bold uppercase tracking-wider ${strengthUI.textColor}`}>
                {strengthUI.label}
              </span>
            </div>
            
            {/* The Progress Bar */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-300">
              <div 
                className={`h-full transition-all duration-500 ease-out ${strengthUI.color}`} 
                style={{ width: strengthUI.width }}
              ></div>
            </div>
          </div>

          {/* Advanced Analytics Panel (Only shows when typing) */}
          {password.length > 0 && (
            <div className="space-y-4">
              
              {/* Time to Crack */}
              <div className="flex items-start gap-3 rounded-xl bg-slate-900 p-4 border border-slate-700 text-slate-200">
                <Clock className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Estimated Time to Crack</div>
                  <div className="font-mono text-lg font-medium text-white">
                    {result.crack_times_display.offline_slow_hashing_1e4_per_second}
                  </div>
                </div>
              </div>

              {/* Warnings and Suggestions */}
              {(result.feedback.warning || result.feedback.suggestions.length > 0) && (
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                  {result.feedback.warning && (
                    <div className="flex items-start gap-2 text-orange-800 mb-2">
                      <AlertTriangle className="h-5 w-5 shrink-0" />
                      <p className="text-sm font-bold">{result.feedback.warning}</p>
                    </div>
                  )}
                  {result.feedback.suggestions.length > 0 && (
                    <div className="flex items-start gap-2 text-slate-700">
                      <Lightbulb className="h-5 w-5 shrink-0 text-amber-500" />
                      <ul className="text-sm list-disc pl-4 space-y-1">
                        {result.feedback.suggestions.map((suggestion, idx) => (
                          <li key={idx}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

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