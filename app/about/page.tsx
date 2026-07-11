import { 
  LayoutGrid, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  HelpCircle 
} from "lucide-react";

export const metadata = {
  title: "About | UseMil",
  description: "Learn more about UseMil and our mission to provide fast, local browser utilities.",
};

export default function About() {
  const faqs = [
    {
      question: "Are these tools completely free?",
      answer: "Yes. UseMil is 100% free to use. There are no premium tiers, no hidden paywalls, and no required account registrations.",
    },
    {
      question: "Do you store any of my data?",
      answer: "Absolutely not. Our core philosophy is privacy-first. Every tool runs locally in your browser using JavaScript. We don't have databases logging your generated passwords, formatted code, or hashed strings.",
    },
    {
      question: "Can I use these tools offline?",
      answer: "Because all the processing logic is bundled into the client-side code, many of our tools will continue to work perfectly even if you lose your internet connection after loading the page.",
    },
    {
      question: "Is the project open-source?",
      answer: "Yes! UseMil is built by developers for developers. The entire codebase is hosted on GitHub. We welcome bug reports, feature requests, and code contributions from the community.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      
      {/* Header Section */}
      <div className="mb-16 text-center sm:text-left">
        <div className="mb-8 inline-flex items-center justify-center rounded-3xl bg-blue-600/10 p-5 text-blue-600">
          <LayoutGrid className="h-10 w-10 sm:h-12 sm:w-12" />
        </div>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white-900 sm:text-6xl">
          About <span className="text-blue-500">UseMil</span>
        </h1>
        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-grey-600 sm:text-xl">
          <p>
            Welcome to UseMil, a comprehensive collection of developer tools and client-side utilities designed to make your daily workflow faster, safer, and infinitely more efficient.
          </p>
          <p>
            We realized that many online utility sites require you to send your sensitive data to third-party servers just to format a JSON string, generate a password, or hash a token. That didn't sit right with us.
          </p>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="mb-20 grid gap-8 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
          <ShieldCheck className="mb-5 h-8 w-8 text-emerald-500" />
          <h3 className="mb-3 text-xl font-bold text-slate-900">Privacy First</h3>
          <p className="text-slate-600">
            <strong>Your data stays on your device.</strong> There are no backend servers capturing your inputs and absolutely no hidden tracking scripts.
          </p>
        </div>
        
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
          <Zap className="mb-5 h-8 w-8 text-amber-500" />
          <h3 className="mb-3 text-xl font-bold text-slate-900">Lightning Fast</h3>
          <p className="text-slate-600">
            By eliminating server round-trips, our utilities process your requests instantly. No loading spinners, just immediate results.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
          <Globe2 className="mb-5 h-8 w-8 text-blue-500" />
          <h3 className="mb-3 text-xl font-bold text-slate-900">Modern Web</h3>
          <p className="text-slate-600">
            Built with modern web standards, ensuring a responsive, clean, and accessible experience across all your devices and screen sizes.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white shadow-xl">
        <div className="mb-10 flex items-center gap-4">
          <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-3">
              <h4 className="text-lg font-bold text-slate-100">
                {faq.question}
              </h4>
              <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}