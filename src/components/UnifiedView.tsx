import React, { useMemo, useState } from "react";
import { Linkedin, Twitter, MessageCircle } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Company } from "../types/company";
import CompanyCard from "./CompanyCard";

interface Props { companies: Company[]; }

const SEARCH_H = 56;
const RADIUS = 9999;
const SEARCH_FILL = "#2D0070";
const SEARCH_STROKE = "#6600FF";
const SEARCH_TEXT = "#BFC9AF";

const UnifiedView: React.FC<Props> = ({ companies }) => {
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
      {/* same 4-col grid as cards; search spans 3 */}
      <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-6">
        {/* SEARCH */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-3">
          <div
            className="flex items-center w-full pl-6 pr-px search-pill"
            style={{ height: SEARCH_H, borderRadius: RADIUS, background: SEARCH_FILL, border: `1px solid ${SEARCH_STROKE}` }}
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

        {/* SOCIAL */}
        <div className="col-span-1 flex items-center justify-end gap-3">
          <span className="social-icon"><Linkedin className="h-4 w-4" /></span>
          <span className="social-icon"><Twitter className="h-4 w-4" /></span>
          <span className="social-icon"><MessageCircle className="h-4 w-4" /></span>
          <span className="social-icon"><SiDiscord size={16} /></span>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 h-px w-full" style={{ background: "rgba(232, 241, 220, 0.7)" }} />

      {/* Cards grid */}
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
