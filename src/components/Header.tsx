// src/components/Header.tsx
import React from "react";
import { Linkedin, Twitter, MessageCircle, Plus, SlidersHorizontal } from "lucide-react";
import { SiDiscord } from "react-icons/si";

type Props = {
  onOpenAdd: () => void;
  onOpenFilters: () => void;
  activeFilterCount?: number;
};

const Header: React.FC<Props> = ({ onOpenAdd, onOpenFilters, activeFilterCount = 0 }) => {
  return (
    <header className="relative">
      {/* Taller on mobile to add space before the search bar below */}
      <div className="w-full bg-gradient-to-b from-[#35078D] to-[#000000] h-[240px] md:h-[200px]" />
      <div className="absolute inset-0">
        <div className="h-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col pt-12 md:pt-20">
          {/* Row 1: Logo + buttons */}
          <div className="flex items-center justify-between">
            <a href="/" className="inline-flex items-center">
  <img
    src="/assets/Radar-logo.svg"
    alt="AIBoomi Radar"
    className="block h-7 md:h-9 lg:h-10" // 28px / 36px / 40px
    draggable={false}
  />
</a>

            {/* Actions: icon-only on mobile, original text buttons on desktop */}
            <div className="flex items-center gap-3">
              {/* Mobile (icon buttons) */}
              <div className="flex md:hidden items-center gap-2">
                {/* Filters (with badge if active) */}
                <button
                  className="relative social-icon"
                  type="button"
                  onClick={onOpenFilters}
                  aria-label={`Filters${activeFilterCount ? `, ${activeFilterCount} active` : ""}`}
                  title="Filters"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  {activeFilterCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1.5
                                 rounded-full bg-[#FF3B30] text-white text-[11px] font-semibold
                                 leading-[18px] text-center ring-2 ring-black"
                      aria-live="polite"
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Add company */}
                <button
                  className="social-icon"
                  type="button"
                  onClick={onOpenAdd}
                  aria-label="Add your company"
                  title="Add your company"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* Desktop (original text buttons) */}
              <div className="hidden md:flex items-center gap-3">
                <button className="btn btn-green" type="button" onClick={onOpenAdd}>
                  Add your company
                </button>

                <button
                  className="relative btn btn-outline"
                  type="button"
                  onClick={onOpenFilters}
                  aria-label={`Filters${activeFilterCount ? `, ${activeFilterCount} active` : ""}`}
                >
                  Filters
                  {activeFilterCount > 0 && (
                    <span
                      className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1.5
                                 rounded-full bg-[#FF3B30] text-white text-[11px] font-semibold
                                 leading-[18px] text-center ring-2 ring-black"
                      aria-live="polite"
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Blurb + Socials */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <p className="text-white font-display text-[24px] leading-[28px] font-normal max-w-[52ch]">
              A living map of India’s AI startup ecosystem - spotlight on AI
              founders, startups, and movements reshaping the future.
            </p>
            <div className="flex md:justify-end items-start gap-3">
              <a href="#" aria-label="LinkedIn" className="social-icon">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter / X" className="social-icon">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Messages" className="social-icon">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Discord" className="social-icon">
                <SiDiscord size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
