import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 shadow-sm sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-500 transition-opacity hover:opacity-80">
          <LayoutGrid className="h-6 w-6" />
          UseMil
        </Link>
        <nav className="hidden sm:flex gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
        </nav>
      </div>
    </header>
  );
}