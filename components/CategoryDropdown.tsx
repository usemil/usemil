"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ChevronDown } from "lucide-react";
import { tools } from "@/data/tools";
import Link from "next/link";
export default function CategoryDropdown() {
    
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [...new Set(tools.map((tool) => tool.category))];
  

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
function goToCategory(category: string) {
  const id = category
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, "-");

  setOpen(false);

  if (pathname === "/") {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    return;
  }

  router.push(`/?category=${id}`);
}
  return (
    <div
      ref={dropdownRef}
      className="relative"
      
    >
      <button
  onClick={() => setOpen((prev) => !prev)}
  className={`flex items-center gap-1 transition ${
    open ? "text-white" : "text-slate-300 hover:text-white"
  }`}
>
        Categories

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
  className={`absolute left-0 mt-3 w-72 origin-top overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition-all duration-200 ${
    open
      ? "visible translate-y-0 scale-100 opacity-100"
      : "invisible -translate-y-2 scale-95 opacity-0"
  }`}
>
        <div className="py-2">
          {categories.map((category) => (
           <button
  key={category}
  onClick={() => goToCategory(category)}
  className="block w-full px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
>
  {category}
</button>
          ))}
        </div>
      </div>
    </div>
  );
}