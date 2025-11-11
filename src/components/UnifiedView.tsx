import React, { useMemo, useState } from "react";
import { Company } from "../types/company";
import CompanyCard from "./CompanyCard";
import { useGeminiSearch } from "../hooks/useGeminiSearch";

interface Props {
  companies: Company[];
  onOpenCompany: (c: Company) => void;
}

const SEARCH_H = 56;
const RADIUS = 9999;
const SEARCH_FILL = "#2D0070";
const SEARCH_STROKE = "#6600FF";
const SEARCH_TEXT = "#BFC9AF";

const UnifiedView: React.FC<Props> = ({ companies, onOpenCompany }) => {
  const [query, setQuery] = useState("");
  const [aiFilters, setAiFilters] = useState<any>(null);
  const { searchWithAI, isSearching, searchError } = useGeminiSearch();
  
  const filtered = useMemo(() => {
    let result = companies;
    if (aiFilters) {
      result = result.filter((c) => {
        if (aiFilters.categories?.length > 0 && !aiFilters.categories.includes(c.category)) {
          return false;
        }
        if (aiFilters.countries?.length > 0 && !aiFilters.countries.includes(c.country)) {
          return false;
        }
        if (aiFilters.states?.length > 0 && !aiFilters.states.includes(c.state)) {
          return false;
        }
        if (aiFilters.cities?.length > 0 && !aiFilters.cities.includes(c.city)) {
          return false;
        }
        if (aiFilters.foundedYearRange) {
          const [minYear, maxYear] = aiFilters.foundedYearRange;
          const companyYear = c.foundedYear;
          if (companyYear && (companyYear < minYear || companyYear > maxYear)) {
            return false;
          }
        }
        if (aiFilters.keywords?.length > 0) {
          const haystack = [c.name, c.description, c.category, ...(c.tags || []), c.city, c.state, c.country].filter(Boolean).join(" ").toLowerCase();
          return aiFilters.keywords.some((keyword: string) => haystack.includes(keyword.toLowerCase()));
        }
        return true;
      });
    } else {
      const q = query.trim().toLowerCase();
      if (q) {
        result = result.filter((c) => {
          const haystack = [c.name, c.description, c.category, ...(c.tags || []), c.city, c.state, c.country].filter(Boolean).join(" ").toLowerCase();
          return haystack.includes(q);
        });
      }
    }
    return result;
  }, [companies, query, aiFilters]);
  
  const handleSearch = async () => {
    if (!query.trim()) return;
    const categories = Array.from(new Set(companies.map(c => c.category).filter(Boolean))) as string[];
    console.log('🔍 Triggering AI search with query:', query);
    console.log('📊 Available categories:', categories);
    console.log('📦 Total companies:', companies.length);
    const filters = await searchWithAI(query, { categories, locations: [], companies, });
    if (filters) {
      console.log('✅ AI filters applied:', filters);
      setAiFilters(filters);
    } else {
      console.error('❌ Failed to get AI filters');
      setAiFilters(null);
    }
  };
  
  const handleClearFilters = () => {
    setAiFilters(null);
    setQuery("");
  };
  
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="mt-32">
        <div className="search-pill flex items-center w-full pl-6 pr-px" style={{ height: SEARCH_H, borderRadius: RADIUS, background: SEARCH_FILL, border: `1px solid ${SEARCH_STROKE}`, }}>
          <input className="search-input" style={{ color: SEARCH_TEXT }} placeholder="Ask me anything 'Show me financial services companies' or 'Show me voice tech companies'" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSearch(); } }} aria-label="Search companies" disabled={isSearching} />
          <button type="button" className="ml-2 btn-round shrink-0" style={{ height: SEARCH_H, width: SEARCH_H, borderRadius: RADIUS }} aria-label="Search" title="Search" onClick={handleSearch} disabled={isSearching || !query.trim()}>
            <img src="/assets/Search-Button.svg" alt="" className="h-full w-full" draggable={false} />
          </button>
        </div>
        {searchError && (
          <div className="mt-4 p-3 bg-red-500 bg-opacity-20 text-red-400 rounded-lg text-sm">Search error: {searchError}</div>
        )}
        {aiFilters && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm" style={{ color: SEARCH_TEXT }}>✅ AI filters applied</span>
            <button type="button" onClick={handleClearFilters} className="text-sm px-3 py-1 rounded" style={{ background: SEARCH_STROKE, color: "white" }}>Clear Filters</button>
          </div>
        )}
        {isSearching && (
          <div className="mt-4 flex items-center gap-2">
            <div className="animate-spin">⚙️</div>
            <span className="text-sm" style={{ color: SEARCH_TEXT }}>AI is analyzing your query...</span>
          </div>
        )}
      </div>
      <div className="mt-10 h-px w-full" style={{ background: "rgba(232, 241, 220, 0.7)" }} />
      <div className="mt-6 text-sm" style={{ color: SEARCH_TEXT }}>Found {filtered.length} company{filtered.length !== 1 ? "ies" : ""}</div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-7 items-stretch">
        {filtered.map((c) => (
          <button key={c.id} type="button" onClick={() => onOpenCompany(c)} className="text-left h-full focus:outline-none" style={{ WebkitTapHighlightColor: "transparent" }}>
            <CompanyCard company={c} stopCardClickOnLinks />
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="mt-20 text-center">
          <p style={{ color: SEARCH_TEXT }}>{query ? "No companies match your search" : "No companies available"}</p>
        </div>
      )}
    </div>
  );
};

export default UnifiedView;