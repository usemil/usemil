"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  CreditCard, 
  CheckCircle2, 
  XCircle,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
  ServerCog,
  Trash2
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

type NetworkType = "Visa" | "Mastercard" | "Amex" | "Discover" | "Unknown";

export default function CardClient() {
  // Validator State
  const [validateInput, setValidateInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [network, setNetwork] = useState<NetworkType>("Unknown");

  // Generator State
  const [genNetwork, setGenNetwork] = useState<NetworkType | "Random">("Visa");
  const [generatedCard, setGeneratedCard] = useState("");
  const [copied, setCopied] = useState(false);

  // --- LUHN ALGORITHM LOGIC ---
  const checkLuhn = (numString: string): boolean => {
    let sum = 0;
    let isSecond = false;
    for (let i = numString.length - 1; i >= 0; i--) {
      let d = parseInt(numString[i], 10);
      if (isSecond) {
        d = d * 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      isSecond = !isSecond;
    }
    return sum % 10 === 0;
  };

  const calculateLuhnCheckDigit = (partialNum: string): number => {
    let sum = 0;
    let isSecond = true;
    for (let i = partialNum.length - 1; i >= 0; i--) {
      let d = parseInt(partialNum[i], 10);
      if (isSecond) {
        d = d * 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      isSecond = !isSecond;
    }
    return (10 - (sum % 10)) % 10;
  };

  const identifyNetwork = (num: string): NetworkType => {
    if (/^4/.test(num)) return "Visa";
    if (/^5[1-5]/.test(num) || /^2(2[2-9][1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(num)) return "Mastercard";
    if (/^3[47]/.test(num)) return "Amex";
    if (/^6(?:011|5[0-9]{2})/.test(num)) return "Discover";
    return "Unknown";
  };

  // --- VALIDATOR HANDLER ---
  useEffect(() => {
    const cleanNum = validateInput.replace(/\D/g, "");
    
    if (cleanNum.length === 0) {
      setIsValid(null);
      setNetwork("Unknown");
      return;
    }

    setNetwork(identifyNetwork(cleanNum));

    if (cleanNum.length >= 13 && cleanNum.length <= 19) {
      setIsValid(checkLuhn(cleanNum));
    } else {
      setIsValid(false);
    }
  }, [validateInput]);

  // --- GENERATOR HANDLER ---
  const handleGenerate = () => {
    let targetNetwork = genNetwork;
    if (targetNetwork === "Random") {
      const networks: NetworkType[] = ["Visa", "Mastercard", "Amex", "Discover"];
      targetNetwork = networks[Math.floor(Math.random() * networks.length)];
    }

    let prefix = "";
    let length = 16;

    switch (targetNetwork) {
      case "Visa":
        prefix = "4";
        break;
      case "Mastercard":
        prefix = "5" + (Math.floor(Math.random() * 5) + 1).toString();
        break;
      case "Amex":
        prefix = "3" + (Math.random() < 0.5 ? "4" : "7");
        length = 15;
        break;
      case "Discover":
        prefix = "6011";
        break;
    }

    let partial = prefix;
    while (partial.length < length - 1) {
      partial += Math.floor(Math.random() * 10).toString();
    }

    const checkDigit = calculateLuhnCheckDigit(partial);
    const finalCard = partial + checkDigit.toString();

    const formattedCard = finalCard.replace(/(\d{4})(?=\d)/g, "$1 ");
    setGeneratedCard(formattedCard);
  };

  const copyToClipboard = () => {
    if (!generatedCard) return;
    navigator.clipboard.writeText(generatedCard.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Independent Clear Actions ---
  const clearValidator = () => {
    setValidateInput("");
    setIsValid(null);
    setNetwork("Unknown");
  };

  const clearGenerator = () => {
    setGeneratedCard("");
    setCopied(false);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        Credit card validation relies on the <strong>Luhn Algorithm</strong> (Modulus 10), a mathematical checksum formula created by IBM scientist Hans Peter Luhn in 1954. It is designed to protect against accidental errors, like mistyping a digit.
      </p>
      <p className="mb-4">
        The tool identifies the card's network (Visa, Mastercard, Amex, etc.) based on its Issuer Identification Number (IIN) prefix, and then runs the Luhn checksum to verify if the number is structurally valid.
      </p>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 text-sm font-medium">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p>
            <strong>Developer Disclaimer:</strong> The generator creates <em>dummy test numbers</em> that pass the Luhn check for testing payment gateways (like Stripe test mode). These are not real credit cards, do not have CVVs or expiration dates, and cannot be used for actual transactions.
          </p>
        </div>
      </div>
    </>
  );

  const howToSteps = [
    {
      title: "Validate a Number",
      description: "Type or paste a card number into the Validator. It will instantly strip spaces and dashes, identify the network, and run the mathematical checksum.",
    },
    {
      title: "Generate Test Data",
      description: "Select a card network from the dropdown and click Generate. The tool will calculate a structurally valid fake number using reverse Luhn logic.",
    },
    {
      title: "Copy or Reset",
      description: "Use the copy button to instantly grab the generated test number, or use the clear actions to wipe the outputs and start fresh.",
    },
  ];

  const faqs = [
    {
      question: "Is it safe to type my real credit card here?",
      answer: "Yes, because this application runs entirely locally in your browser. However, as a general cybersecurity best practice, you should never type your real credit card number into random online forms unless making a purchase.",
    },
    {
      question: "Why does it say valid if the card isn't real?",
      answer: "The Luhn algorithm only checks if the number is mathematically possible and free of typos. It does not ping a bank to check if the account actually exists, is active, or has funds.",
    },
    {
      question: "Why are Amex cards 15 digits instead of 16?",
      answer: "Different networks have different standards. Visa and Mastercard standardly use 16 digits, American Express uses 15, and legacy Diners Club cards often used 14.",
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
          Card <span className="text-blue-400">Validator & Generator</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Validate card structures via the Luhn algorithm and generate mock data for testing.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* LEFT: Validator Panel */}
          <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-slate-700/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Luhn Validator</h2>
              </div>
              <button
                onClick={clearValidator}
                disabled={!validateInput}
                className="flex items-center gap-1.5 rounded-lg border border-slate-500 bg-transparent px-2.5 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200/80 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Clear input"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-800">Card Number</label>
                <input
                  type="text"
                  value={validateInput}
                  onChange={(e) => setValidateInput(e.target.value)}
                  placeholder="Enter number to validate..."
                  className="w-full rounded-xl border border-slate-400 bg-white py-3 pl-4 pr-4 font-mono text-base text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              {validateInput.length > 0 && (
                <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm animate-fadeIn">
                  
                  {/* Validation Status */}
                  <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                    {isValid ? (
                      <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-500" />
                    )}
                    <div>
                      <div className={`text-lg font-bold ${isValid ? "text-emerald-700" : "text-red-700"}`}>
                        {isValid ? "Valid Checksum" : "Invalid Checksum"}
                      </div>
                      <div className="text-xs font-medium text-slate-500">
                        {isValid ? "Passes Luhn algorithm check." : "Fails mathematical structure test."}
                      </div>
                    </div>
                  </div>

                  {/* Network Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase text-slate-500">Network</div>
                      <div className="font-semibold text-slate-900">{network}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-slate-500">Length</div>
                      <div className="font-semibold text-slate-900">
                        {validateInput.replace(/\D/g, "").length} digits
                      </div>
                    </div>
                  </div>
                  
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Generator Panel */}
          <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-slate-700/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-2 text-white shadow-sm">
                  <ServerCog className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Test Data Generator</h2>
              </div>
              <button
                onClick={clearGenerator}
                disabled={!generatedCard}
                className="flex items-center gap-1.5 rounded-lg border border-slate-500 bg-transparent px-2.5 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200/80 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Clear generated output"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-800">Select Network</label>
                <select
                  value={genNetwork}
                  onChange={(e) => setGenNetwork(e.target.value as NetworkType | "Random")}
                  className="w-full rounded-xl border border-slate-400 bg-white py-3 pl-4 pr-4 text-sm font-bold text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                >
                  <option value="Random">Random Network</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Amex">American Express</option>
                  <option value="Discover">Discover</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-700"
              >
                <RefreshCw className="h-4 w-4" /> Generate Dummy Card
              </button>

              {generatedCard && (
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-inner relative group animate-fadeIn">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Mock Card Number</span>
                    <button
                      onClick={copyToClipboard}
                      className="text-blue-600 transition-colors hover:text-blue-700"
                      title="Copy raw number"
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="font-mono text-2xl font-bold tracking-widest text-slate-900 text-center py-2">
                    {generatedCard}
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