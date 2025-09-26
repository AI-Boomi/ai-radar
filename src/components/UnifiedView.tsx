import React, { useMemo, useState } from "react";
import { Company } from "../types/company";
import CompanyCard from "./CompanyCard";

interface Props {
  companies: Company[];
  onOpenCompany: (c: Company) => void;
}

// search styling
const SEARCH_H = 56;
const RADIUS = 9999;
const SEARCH_FILL = "#2D0070";
const SEARCH_STROKE = "#6600FF";
const SEARCH_TEXT = "#BFC9AF";

const UnifiedView: React.FC<Props> = ({ companies, onOpenCompany }) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => {
      const haystack = [
        c.name, c.description, c.category,
        ...(c.tags || []), c.city, c.state, c.country,
      ].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [companies, query]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8">
      {/* Full-width search bar */}
      <div className="mt-32">
        <div
          className="search-pill flex items-center w-full pl-6 pr-px"
          style={{
            height: SEARCH_H,
            borderRadius: RADIUS,
            background: SEARCH_FILL,
            border: `1px solid ${SEARCH_STROKE}`,
          }}
        >
          <input
            className="search-input"
            style={{ color: SEARCH_TEXT }}
            placeholder="Ask me anything ‘Show me financial services companies’ or ‘Show me voice tech companies’"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
            aria-label="Search companies"
          />
          <button
            type="button"
            className="ml-2 btn-round shrink-0"
            style={{ height: SEARCH_H, width: SEARCH_H, borderRadius: RADIUS }}
            aria-label="Search"
            title="Search"
          >
            <img src="/assets/Search-Button.svg" alt="" className="h-full w-full" draggable={false} />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 h-px w-full" style={{ background: "rgba(232, 241, 220, 0.7)" }} />

      {/* Cards grid — clicking opens CompanySidebar */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-7 items-stretch">
        {filtered.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onOpenCompany(c)}
            className="text-left h-full focus:outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <CompanyCard
              company={c}
              // ensure links inside the card don't open the sidebar
              stopCardClickOnLinks
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default UnifiedView;
