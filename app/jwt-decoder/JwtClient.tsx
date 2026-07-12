"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Trash2,
  FileJson,
  AlertCircle,
  Copy,
  Check
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

export default function JwtClient() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Safe Base64Url to UTF-8 decoding function
  const decodeBase64Url = (str: string) => {
    try {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      const pad = base64.length % 4;
      if (pad) base64 += '='.repeat(4 - pad);
      
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(bytes);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (!token.trim()) {
      setHeader("");
      setPayload("");
      setSignature("");
      setError("");
      return;
    }

    const parts = token.split(".");
    
    if (parts.length !== 3) {
      setError("Invalid JWT format. A valid token must contain 3 parts separated by dots.");
      setHeader("");
      setPayload("");
      setSignature("");
      return;
    }

    const decodedHeader = decodeBase64Url(parts[0]);
    const decodedPayload = decodeBase64Url(parts[1]);

    if (!decodedHeader || !decodedPayload) {
      setError("Failed to decode token. Ensure the string is a valid Base64Url encoded JWT.");
      setHeader("");
      setPayload("");
      setSignature("");
      return;
    }

    setError("");
    
    try {
      setHeader(JSON.stringify(JSON.parse(decodedHeader), null, 2));
    } catch {
      setHeader(decodedHeader);
    }

    try {
      setPayload(JSON.stringify(JSON.parse(decodedPayload), null, 2));
    } catch {
      setPayload(decodedPayload);
    }

    setSignature(parts[2]);
  }, [token]);

  const clearAll = () => {
    setToken("");
    setError("");
  };

  const copyToClipboard = (text: string, section: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        JSON Web Tokens (JWT) are an open, industry-standard (RFC 7519) method for representing claims securely between two parties. They are widely used for modern web authentication and API authorization.
      </p>
      <p>
        A standard JWT consists of three parts separated by dots: a <strong>Header</strong> (containing the algorithm), a <strong>Payload</strong> (containing the session data or user claims), and a <strong>Signature</strong> (to verify the token hasn't been tampered with).
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Paste your Token",
      description: "Paste your raw JWT string into the encoded input box. The tool will instantly split the token at the dots (.).",
    },
    {
      title: "View Decoded Data",
      description: "The Header and Payload are Base64Url decoded back into readable JSON. The signature is displayed securely as raw output.",
    },
    {
      title: "Check Expiration",
      description: "If your payload contains an 'exp' or 'iat' claim, those are Unix timestamps indicating when the token expires or was issued.",
    },
  ];

  const faqs = [
    {
      question: "Is it safe to paste my production JWT here?",
      answer: "Yes. Because this tool runs 100% locally in your browser, your sensitive token data never leaves your device. We do not have servers to intercept your session claims.",
    },
    {
      question: "Does this tool verify the signature?",
      answer: "No. This is a decoder, not a verifier. It unpacks the Base64Url data so you can read it. To verify a signature, you would need the original Secret Key (HMAC) or Public Key (RSA) used by the issuing server.",
    },
    {
      question: "Can I edit the payload to gain admin access?",
      answer: "You can edit the payload text, but if you send that altered token back to a server, the server will reject it. Modifying the payload without possessing the Secret Key breaks the cryptographically secure Signature.",
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
          JWT <span className="text-blue-400">Decoder</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Safely decode and inspect JSON Web Tokens locally without sending data to a server.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          <div className="mb-6 flex items-center justify-between border-b border-slate-700/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <FileJson className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Live Token Inspector</h2>
            </div>
            
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 rounded-lg border border-slate-400 bg-transparent px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
            >
              <Trash2 className="h-4 w-4" /> Clear
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            
            {/* Input Area */}
            <div className="flex flex-col">
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Encoded JWT
              </label>
              <textarea
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your JWT here (e.g. eyJhbGciOiJIUzI1NiIsInR...)"
                className="h-full min-h-[400px] w-full resize-none rounded-xl border border-slate-400 bg-white p-4 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 break-all custom-scrollbar"
              />
            </div>

            {/* Output Area */}
            <div className="flex flex-col space-y-4">
              
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-bold">{error}</p>
                </div>
              )}

              {/* Header Panel */}
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 shadow-sm relative group">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-red-700">
                    Header <span className="text-red-500/70 font-medium">(Algorithm & Type)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(header, "header")}
                    disabled={!header}
                    className="text-red-600/50 transition-colors hover:text-red-700 disabled:opacity-0"
                    title="Copy Header JSON"
                  >
                    {copiedSection === "header" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={header}
                  placeholder="Decoded header..."
                  className="h-28 w-full resize-none bg-transparent font-mono text-sm font-medium text-slate-900 focus:outline-none custom-scrollbar"
                />
              </div>

              {/* Payload Panel */}
              <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/50 p-4 shadow-sm relative group">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-fuchsia-700">
                    Payload <span className="text-fuchsia-500/70 font-medium">(Data & Claims)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(payload, "payload")}
                    disabled={!payload}
                    className="text-fuchsia-600/50 transition-colors hover:text-fuchsia-700 disabled:opacity-0"
                    title="Copy Payload JSON"
                  >
                    {copiedSection === "payload" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={payload}
                  placeholder="Decoded payload..."
                  className="h-56 w-full resize-none bg-transparent font-mono text-sm font-medium text-slate-900 focus:outline-none custom-scrollbar"
                />
              </div>

              {/* Signature Panel */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm relative group">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Verify Signature
                  </div>
                  <button
                    onClick={() => copyToClipboard(signature, "signature")}
                    disabled={!signature}
                    className="text-blue-600/50 transition-colors hover:text-blue-700 disabled:opacity-0"
                    title="Copy Signature"
                  >
                    {copiedSection === "signature" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={signature}
                  placeholder="Signature string..."
                  className="h-16 w-full resize-none bg-transparent font-mono text-xs font-medium text-slate-900 focus:outline-none break-all custom-scrollbar"
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