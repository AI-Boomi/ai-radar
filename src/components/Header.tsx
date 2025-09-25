import React from "react";

const LOGO_HEIGHT_PX = 35; // ← change this to the exact pixel height you want (e.g., 28, 30, 32)
const HEADER_HEIGHT_PX = 200; // ← header gradient height (adjust if needed)

const Header: React.FC = () => {
  return (
    <header className="relative">
      {/* Top gradient bar: #35078d → #000000 */}
      <div
        className="w-full bg-gradient-to-b from-[#35078d] to-[#000000]"
        style={{ height: HEADER_HEIGHT_PX }}
      />

      {/* Content aligned to the card grid container */}
      <div className="absolute inset-0">
        <div className="h-full max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Left: Logo pinned to the same left edge as the grid */}
          <a href="/" className="inline-flex items-center">
            <img
              src="/assets/Radar-logo.svg"
              alt="AIBoomi Radar"
              className="block"
              style={{ height: LOGO_HEIGHT_PX }}
              draggable={false}
            />
          </a>

          {/* Right: Buttons pinned to the same right edge as the grid */}
          <div className="flex items-center gap-3">
            <button
              className="rounded-full bg-[#00FF66] text-black px-5 py-2 font-medium hover:opacity-90 transition"
              type="button"
            >
              Add your company
            </button>
            <button
              className="rounded-full border border-white/30 text-white px-5 py-2 hover:bg-white/5 transition"
              type="button"
            >
              Filters
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
