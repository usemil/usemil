"use client";
import CategoryDropdown from "@/components/CategoryDropdown";
import { useState } from "react";
import Link from "next/link";
import { tools } from "@/data/tools";
import {
  LayoutGrid,
  Menu,
  Search as SearchIcon,
  X,
  Home,
  Folder,
  ShieldCheck,
  Info,
} from "lucide-react";
import Search from "@/components/Search";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
const [showCategories, setShowCategories] = useState(false);
const [searchReset, setSearchReset] = useState(0);
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-blue-500"
          >
            <LayoutGrid className="h-6 w-6" />
            UseMil
          </Link>

          <div className="flex items-center gap-6">
  {/* Desktop Navigation */}
  <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
  <Link
    href="/"
    className="text-slate-300 transition hover:text-white"
  >
    Home
  </Link>

<CategoryDropdown
  open={showCategories}
  setOpen={setShowCategories}
  onOpen={() => {
    setShowSearch(false);
    setSearchReset((prev) => prev + 1);
  }}
/>

  <Link
    href="/about"
    className="text-slate-300 transition hover:text-white"
  >
    About
  </Link>

  <Link
    href="/privacy"
    className="text-slate-300 transition hover:text-white"
  >
    Privacy
  </Link>
</nav>

  {/* Desktop Search */}
  <div
  className="hidden md:block"
  onClick={() => setShowCategories(false)}
>
  <Search resetTrigger={searchReset} />
</div>

  {/* Mobile Search */}
  <button
    onClick={() => setShowSearch(!showSearch)}
    className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 md:hidden"
  >
    <SearchIcon className="h-5 w-5" />
  </button>

  {/* Mobile Menu */}
  <button
    onClick={() => {
  setShowSearch(false);
  setShowMenu(true);
}}
    className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 md:hidden"
  >
    <Menu className="h-6 w-6" />
  </button>
</div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="border-t border-slate-800 bg-slate-900 px-6 py-4 sm:hidden">
            <Search />
          </div>
        )}
      </header>

      {/* Mobile Drawer + Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Drawer */}
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 h-full w-72 border-r border-slate-800 bg-slate-900 shadow-2xl transition-transform duration-300"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div className="flex items-center gap-2 text-xl font-bold text-blue-500">
                <LayoutGrid className="h-6 w-6" />
                UseMil
              </div>

              <button
                onClick={closeMenu}
                className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 p-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>

              <div className="rounded-xl border border-slate-800">
  <div className="flex items-center gap-3 px-4 py-3 text-slate-200">
    <Folder className="h-5 w-5" />
    Categories
  </div>

  <div className="border-t border-slate-800">
  {[...new Set(tools.map((tool) => tool.category))].map((category) => (
    <button
  key={category}
  onClick={() => {
    closeMenu();

    const id = category
      .toLowerCase()
      .replace(/&/g, "")
      .replace(/\s+/g, "-");

    if (window.location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.location.href = `/?category=${id}`;
    }
  }}
  className="block w-full px-8 py-2 text-left text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
>
  {category}
</button>
  ))}
</div>
</div>

              <Link
                href="/privacy"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
              >
                <ShieldCheck className="h-5 w-5" />
                Privacy
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
              >
                <Info className="h-5 w-5" />
                About
              </Link>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 w-full border-t border-slate-800 p-4 text-center text-xs text-slate-500">
              UseMil © 2026
            </div>
          </aside>
        </div>
      )}
    </>
  );
}