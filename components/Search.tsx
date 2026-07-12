"use client";
import { useEffect, useState } from "react";
import { tools } from "@/data/tools";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  resetTrigger?: number;
}

export default function Search({ resetTrigger }: SearchProps) {
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    setQuery("");
  }, [resetTrigger]);

  const filtered = query 
    ? tools.filter(t => {
        const q = query.toLowerCase();
        
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesDescription = t.description.toLowerCase().includes(q);
        const matchesKeywords = t.keywords?.some((keyword) => 
          keyword.toLowerCase().includes(q)
        );

        return matchesName || matchesDescription || matchesKeywords;
      })
    : [];

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search tools..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      {query && filtered.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-[100] w-full rounded-xl border border-slate-700 bg-slate-800 p-2 shadow-xl">
          {filtered.map(tool => (
            <Link 
              key={tool.slug} 
              href={tool.slug} 
              onClick={() => setQuery("")} 
              className="block rounded-lg p-2 text-sm text-white hover:bg-slate-700"
            >
              <div className="font-medium">{tool.name}</div>
              <div className="text-xs text-slate-400 truncate">{tool.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}