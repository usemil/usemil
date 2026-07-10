import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-bold text-blue-500">UseMil</h2>
          <p className="mt-1 text-sm text-slate-400">Fast, free online tools that respect your privacy.</p>
        </div>
        <div className="flex gap-6 text-sm text-slate-400">
          <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
          <span>© {new Date().getFullYear()} UseMil</span>
        </div>
      </div>
    </footer>
  );
}