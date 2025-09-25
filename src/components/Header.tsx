import React from 'react';
import { Plus, SlidersHorizontal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50">
      {/* Purple gradient bar */}
      <div className="h-20 w-full bg-gradient-to-r from-[#4D19FF] via-[#7A2BFF] to-[#B33CFF]" />

      {/* Content aligned over the gradient */}
      <div className="absolute inset-x-0 top-0 h-20 px-5 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-[8px] bg-white/90" />
          <div className="text-white text-2xl font-semibold">
            AIBoomi <span className="font-normal">Radar</span>
          </div>
        </div>

        {/* Primary actions */}
        <div className="flex items-center gap-3">
          <button className="btn btn-sm btn-primary">
            <Plus className="h-4 w-4" />
            Add your company
          </button>
          <button className="btn btn-sm btn-ghost border border-border">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
