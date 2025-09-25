// src/components/UnifiedView.tsx
import React, { useMemo, useState } from "react";
import { Send, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Company } from "../types/company";
import CompanyCard from "./CompanyCard";

interface Props {
  companies: Company[];
}

const UnifiedView: React.FC<Props> = ({ companies }) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;

    return companies.filter((c) => {
      const haystack = [
        c.name,
        c.description,
        c.category,
        ...(c.tags || []),
        c.city,
        c.state,
        c.country,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [companies, query]);

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Search */}
      <div className="mt-14 md:mt-16">
        <div className="search-shell flex items-center gap-3">
          <input
            className="search-input"
            placeholder="Ask me anything ‘Show me financial services companies’ or ‘Show me voice tech companies’"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            aria-label="Search companies"
          />
          <button
            type="button"
            className="h-11 w-11 rounded-full bg-accent text-black flex items-center justify-center"
            aria-label="Submit search"
            title="Search"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Social icons row (right aligned) */}
        <div className="flex items-center gap-4 mt-4 justify-end pr-1 text-foreground/70">
          <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
          <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
          <a href="#" aria-label="Messages"><MessageCircle className="h-4 w-4" /></a>
          <a href="#" aria-label="Discord" className="inline-flex items-center">
            <SiDiscord size={16} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 h-px w-full bg-white/10" />

      {/* Cards grid — 4 per row on xl, equal heights */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-7 items-stretch">
        {filtered.map((c) => (
          <div key={c.id} className="h-full">
            <CompanyCard company={c} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnifiedView;
