"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { tools } from "@/data/tools";

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false);
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

  function scrollToCategory(category: string) {
    const id = category
      .toLowerCase()
      .replace(/&/g, "")
      .replace(/\s+/g, "-");

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setOpen(false);
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-slate-300 transition hover:text-white"
      >
        Categories

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => scrollToCategory(category)}
              className="flex w-full items-center px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}