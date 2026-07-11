import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | UseMil",
  description: "Read about our commitment to keeping your data local and secure.",
};

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-32">
      <div className="mb-10 inline-flex items-center justify-center rounded-2xl bg-emerald-500/10 p-4 text-emerald-600">
        <ShieldCheck className="h-10 w-10" />
      </div>
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        Privacy <span className="text-blue-500">Policy</span>
      </h1>
      <div className="prose prose-slate prose-lg max-w-none text-white-700">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-white-900 mt-8 mb-4">1. Local Processing Only</h2>
        <p>
          At UseMil, privacy isn't just a policy; it's our core architecture. Every utility, generator, and calculator provided on this platform executes 100% locally on your machine via JavaScript within your browser instance. 
        </p>

        <h2 className="text-2xl font-bold text-white-900 mt-8 mb-4">2. Zero Data Collection</h2>
        <p>
          We do not transmit, collect, store, or log any user input data. Whether you are generating a complex password, decoding a JWT, or encrypting text, your inputs never leave your device. We do not have servers capable of receiving this data.
        </p>

        <h2 className="text-2xl font-bold text-white-900 mt-8 mb-4">3. Third-Party Analytics</h2>
        <p>
          We use basic analytics tools (like Vercel Analytics) strictly to monitor website performance, traffic volumes, and error rates. These tools collect anonymized usage metrics (such as page views and browser types) but have no access to the data you enter into the tools.
        </p>

        <h2 className="text-2xl font-bold text-white-900 mt-8 mb-4">4. Cookies</h2>
        <p>
          UseMil does not use tracking cookies or advertising cookies. Any local storage utilized is strictly for saving your UI preferences (like theme toggles) on your own device.
        </p>
      </div>
    </div>
  );
}