"use client";

import { Info, HelpCircle, ListChecks, ChevronDown } from "lucide-react";
import React, { useState } from "react";

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface HowToStep {
  title: string;
  description: string;
}

interface ToolInfoProps {
  aboutDescription: React.ReactNode;
  howTo: HowToStep[];
  faqs: FAQItem[];
}

export default function ToolInfo({ aboutDescription, howTo, faqs }: ToolInfoProps) {
  // State to track which FAQ is currently open
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 space-y-12">
      
      {/* About Section */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
            <Info className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">About this Tool</h2>
        </div>
        <div className="prose prose-slate prose-invert max-w-none text-slate-400 leading-relaxed text-sm sm:text-base">
          {aboutDescription}
        </div>
      </section>

      {/* How To Section */}
      {howTo.length > 0 && (
        <section>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <ListChecks className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">How to Use</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {howTo.map((step, index) => (
              <div key={index} className="rounded-2xl border border-slate-700/50 bg-slate-800/20 p-5">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-300">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-slate-200">{step.title}</h3>
                </div>
                <p className="pl-9 text-sm text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <section>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              
              return (
                <div 
                  key={index} 
                  className="rounded-2xl border border-slate-700/50 bg-slate-800/20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full cursor-pointer items-center justify-between p-5 font-bold text-slate-200 transition-colors hover:bg-slate-800/40"
                  >
                    <span className="text-left">{faq.question}</span>
                    <ChevronDown 
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-400" : ""}`} 
                    />
                  </button>
                  
                  {/* Smooth Grid Animation Wrapper */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 text-sm leading-relaxed text-slate-400">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}