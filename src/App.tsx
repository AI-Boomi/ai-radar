// src/App.tsx
import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import UnifiedView from "./components/UnifiedView";
import AddCompanySidebar from "./components/AddCompanySidebar";
import CompanySidebar from "./components/CompanySidebar";
import EditCompanySidebar from "./components/EditCompanySidebar";
import FilterModal from "./components/FilterModal";
import { Company } from "./types/company";
import { useCompanies } from "./hooks/useCompanies"; // ← named import (fixes 2613)
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";

const App: React.FC = () => {
  const { companies, loading, error } = useCompanies();

  // Sidebars / modals state
  const [addOpen, setAddOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // inside App component:
  const anyOpen = addOpen || filterOpen || companyOpen || editOpen;
  useBodyScrollLock(anyOpen);

  // Derive filter lists (typed, so not unknown[])
  const categories: string[] = useMemo(() => {
    const vals = companies
      .map((c: Company) => c.category)
      .filter((v): v is string => !!v);
    return Array.from(new Set(vals)).sort();
  }, [companies]);

  const countries: string[] = useMemo(() => {
    const vals = companies
      .map((c: Company) => c.country)
      .filter((v): v is string => !!v);
    return Array.from(new Set(vals)).sort();
  }, [companies]);

  const states: string[] = useMemo(() => {
    const vals = companies
      .map((c: Company) => c.state)
      .filter((v): v is string => !!v);
    return Array.from(new Set(vals)).sort();
  }, [companies]);

  // Selected filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [foundedRange, setFoundedRange] = useState<[number, number]>([2010, 2025]);

  // Apply filters to companies
  const visibleCompanies: Company[] = useMemo(() => {
    return companies.filter((c: Company) => {
      const okCategory =
        selectedCategories.length === 0 ||
        (!!c.category && selectedCategories.includes(c.category));
      const okCountry =
        selectedCountries.length === 0 ||
        (!!c.country && selectedCountries.includes(c.country));
      const okState =
        selectedStates.length === 0 ||
        (!!c.state && selectedStates.includes(c.state));
      const okFounded =
        typeof c.founded !== "number" ||
        (c.founded >= foundedRange[0] && c.founded <= foundedRange[1]);

      return okCategory && okCountry && okState && okFounded;
    });
  }, [companies, selectedCategories, selectedCountries, selectedStates, foundedRange]);

  const openCompany = (c: Company) => {
    setSelectedCompany(c);
    setCompanyOpen(true);
  };

  return (
    <>
      <Header
        onOpenAdd={() => setAddOpen(true)}
        onOpenFilters={() => setFilterOpen(true)}
      />

      {loading && (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-10 text-white/80">
          Loading companies…
        </div>
      )}
      {error && (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-10 text-red-300">
          {String(error)}
        </div>
      )}

      {!loading && !error && (
        <UnifiedView
          companies={visibleCompanies}
          onOpenCompany={openCompany}
        />
      )}

      {/* Sidebars / Modals */}
      <AddCompanySidebar isOpen={addOpen} onClose={() => setAddOpen(false)} />

      <CompanySidebar
        company={selectedCompany}
        isOpen={companyOpen}
        onClose={() => setCompanyOpen(false)}
        onEditCompany={(c: Company) => {
          setSelectedCompany(c);
          setEditOpen(true);
        }}
      />

      <EditCompanySidebar
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        company={selectedCompany}
      />

      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        categories={categories}                 // string[]
        countries={countries}                   // string[]
        states={states}                         // string[]
        selectedCategories={selectedCategories} // string[]
        selectedCountries={selectedCountries}   // string[]
        selectedStates={selectedStates}         // string[]
        foundedYearRange={foundedRange}         // [number, number]
        onCategoryChange={setSelectedCategories}
        onCountryChange={setSelectedCountries}
        onStateChange={setSelectedStates}
        onFoundedYearChange={setFoundedRange}
      />
    </>
  );
};

export default App;
