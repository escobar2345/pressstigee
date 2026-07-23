"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function AdminToolbar({
  placeholder = "Search",
  filters = [],
  action,
}: {
  placeholder?: string;
  filters?: string[];
  action?: React.ReactNode;
}) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
      <div className="relative flex-1 max-w-md">
        <Search
          size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full bg-brand-dark/70 border border-brand-border rounded-full pl-10 pr-4 py-2.5 text-white font-body text-sm placeholder-white/40 focus:outline-none focus:border-brand-teal/50 transition"
        />
      </div>

      <div className="flex items-center gap-3 md:ml-auto">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-dark/70 border border-brand-border text-white/70 font-body text-xs hover:text-white hover:border-brand-teal/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
          >
            {f}
            <ChevronDown size={12} className="text-white/45" />
          </button>
        ))}
        {action}
      </div>
    </div>
  );
}
