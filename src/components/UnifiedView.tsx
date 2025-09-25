import React, { useMemo, useState } from "react";
import { Linkedin, Twitter, MessageCircle } from "lucide-react";
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
    <div className="max-w-[1400px] mx-auto px-4 md:px-8">
      {/* Search pill */}
      <div className="mt-14 md:mt-16">
        <div className="search-shell flex items-center gap-3 border-[#E8F1DC]/70">
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
          {/* Your green circular search button using the provided SVG */}
          <button
            type="button"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full grid place-items-center"
            aria-label="Search"
            title="Search"
          >
            <img
              src="/assets/Search-Button.svg"
              alt=""
              className="h-full w-full"
              draggable={false}
            />
          </button>
        </div>

        {/* Social icons, right aligned within the same container width */}
        <div className="flex items-center gap-4 mt-4 justify-end pr-1 text-foreground/70">
          <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
          <a href="#" aria-label="Twitter / X"><Twitter className="h-4 w-4" /></a>
          <a href="#" aria-label="Messages"><MessageCircle className="h-4 w-4" /></a>
          <a href="#" aria-label="Discord" className="inline-flex items-center">
            <SiDiscord size={16} />
          </a>
        </div>
      </div>

      {/* Divider under search */}
      <div className="mt-10 h-px w-full bg-[#E8F1DC]/70" />

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
