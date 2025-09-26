import React, { useState } from "react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  countries: string[];
  states: string[];
  selectedCategories: string[];
  selectedCountries: string[];
  selectedStates: string[];
  foundedYearRange: [number, number];
  onCategoryChange: (categories: string[]) => void;
  onCountryChange: (countries: string[]) => void;
  onStateChange: (states: string[]) => void;
  onFoundedYearChange: (range: [number, number]) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = (props) => {
  const {
    isOpen,
    onClose,
    categories,
    countries,
    states,
    selectedCategories,
    selectedCountries,
    selectedStates,
    foundedYearRange,
    onCategoryChange,
    onCountryChange,
    onStateChange,
    onFoundedYearChange,
  } = props;

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const activeFiltersCount =
    selectedCategories.length +
    selectedCountries.length +
    selectedStates.length +
    (foundedYearRange[0] !== 2010 || foundedYearRange[1] !== 2025 ? 1 : 0);

  const toggle = (arr: string[], value: string, setter: (v: string[]) => void) => {
    setter(arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={onClose} />
      )}

      <aside
        className={`fixed right-0 top-0 w-full max-w-[520px]
        h-[100dvh] flex flex-col overflow-hidden
        bg-black/90 backdrop-blur-lg border-l border-[#E8F1DC1A] z-[70]
        transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8F1DC1A] flex items-start justify-between">
          <div>
            <h2 className="sidebar-title text-white">Filters</h2>
            <p className="mt-2 text-white/80 text-[13px] leading-[16px]">
              Refine your radar discovery
              {activeFiltersCount > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[12px] bg-white/10 border border-white/20">
                  {activeFiltersCount} selected
                </span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="social-icon !w-10 !h-10 border-white/30 text-white/90 hover:text-white"
            aria-label="Close"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto scroll-area p-6 space-y-5 pb-28"
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchMoveCapture={(e) => e.stopPropagation()}
        >
          {/* Selected Pills */}
          {activeFiltersCount > 0 && (
            <div className="rounded-xl border border-[#E8F1DC1A] bg-white/[0.02] p-4">
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((c) => (
                  <span key={c} className="badge-purple badge-wrap">
                    {c}
                    <button
                      className="ml-2 text-[#6600FF] hover:text-[#7A33FF]"
                      onClick={() => toggle(selectedCategories, c, onCategoryChange)}
                      aria-label={`Remove ${c}`}
                      title="Remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedCountries.map((c) => (
                  <span key={c} className="badge-purple badge-wrap">
                    {c}
                    <button
                      className="ml-2 text-[#6600FF] hover:text-[#7A33FF]"
                      onClick={() => toggle(selectedCountries, c, onCountryChange)}
                      aria-label={`Remove ${c}`}
                      title="Remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedStates.map((s) => (
                  <span key={s} className="badge-purple badge-wrap">
                    {s}
                    <button
                      className="ml-2 text-[#6600FF] hover:text-[#7A33FF]"
                      onClick={() => toggle(selectedStates, s, onStateChange)}
                      aria-label={`Remove ${s}`}
                      title="Remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {(foundedYearRange[0] !== 2010 || foundedYearRange[1] !== 2025) && (
                  <span className="badge-purple badge-wrap">
                    {foundedYearRange[0]} – {foundedYearRange[1]}
                    <button
                      className="ml-2 text-[#6600FF] hover:text-[#7A33FF]"
                      onClick={() => onFoundedYearChange([2010, 2025])}
                      aria-label="Reset founded year"
                      title="Reset"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Inline expanding groups */}
          {[
            {
              id: "categories",
              label: `Categories${selectedCategories.length ? ` (${selectedCategories.length})` : ""}`,
              items: categories,
              selected: selectedCategories,
              onToggle: (v: string) => toggle(selectedCategories, v, onCategoryChange),
            },
            {
              id: "countries",
              label: `Countries${selectedCountries.length ? ` (${selectedCountries.length})` : ""}`,
              items: countries,
              selected: selectedCountries,
              onToggle: (v: string) => toggle(selectedCountries, v, onCountryChange),
            },
            {
              id: "states",
              label: `States${selectedStates.length ? ` (${selectedStates.length})` : ""}`,
              items: states,
              selected: selectedStates,
              onToggle: (v: string) => toggle(selectedStates, v, onStateChange),
            },
          ].map((grp) => (
            <div key={grp.id}>
              <button
                onClick={() => setOpenDropdown(openDropdown === grp.id ? null : grp.id)}
                className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-left text-white flex items-center justify-between hover:bg-white/[0.06] transition"
              >
                <span className="font-display text-[15px]">{grp.label}</span>
                <span
                  className={`text-white/70 transition-transform ${openDropdown === grp.id ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>

              {openDropdown === grp.id && (
                <div className="mt-2 max-h-60 overflow-y-auto rounded-xl border border-white/15 bg-black/70 backdrop-blur-md">
                  {grp.items.map((item) => {
                    const active = grp.selected.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => grp.onToggle(item)}
                        className={`w-full px-4 py-2 text-left text-[14px] ${
                          active ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Founded year */}
          <div className="rounded-xl border border-white/15 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-white">Founded year</span>
              <span className="text-white/70 text-sm">
                {foundedYearRange[0]} – {foundedYearRange[1]}
              </span>
            </div>
            <div className="mt-3 space-y-4">
              <input
                type="range"
                min={2010}
                max={2025}
                value={foundedYearRange[0]}
                onChange={(e) => onFoundedYearChange([parseInt(e.target.value), foundedYearRange[1]])}
                className="w-full accent-[#60F]"
              />
              <input
                type="range"
                min={2010}
                max={2025}
                value={foundedYearRange[1]}
                onChange={(e) => onFoundedYearChange([foundedYearRange[0], parseInt(e.target.value)])}
                className="w-full accent-[#60F]"
              />
            </div>
          </div>
        </div>

        {/* Footer (no green Filter button) */}
        <div className="shrink-0 border-t border-[#E8F1DC1A] bg-black/80 backdrop-blur-md p-4">
          <button
            onClick={() => {
              onCategoryChange([]);
              onCountryChange([]);
              onStateChange([]);
              onFoundedYearChange([2010, 2025]);
              setOpenDropdown(null);
            }}
            className="btn btn-outline w-full"
          >
            Clear all
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
