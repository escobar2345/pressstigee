"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const filters = ["Date", "Clients", "Service"];

export default function ReferralFilters() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          aria-label="Search referrals"
          className="w-full bg-brand-darker/60 border border-brand-border rounded-full pl-12 pr-5 py-3 text-white font-body text-sm placeholder-white/40 focus:outline-none focus:border-brand-teal/50 transition"
        />
      </div>

      {/* Filter pills */}
      <div className="flex items-center justify-between gap-3">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className="flex-1 inline-flex items-center justify-between gap-2 px-4 py-2 rounded-full bg-brand-darker/60 border border-brand-border text-white/70 font-body text-xs hover:text-white hover:border-brand-teal/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
          >
            {f}
            <ChevronDown size={12} className="text-white/45" />
          </button>
        ))}
      </div>
    </div>
  );
}
