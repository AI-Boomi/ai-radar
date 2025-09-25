import React from "react";

const LOGO_HEIGHT_PX = 35;
const HEADER_HEIGHT_PX = 200;

const Header: React.FC = () => {
  return (
    <header className="relative">
      <div
        className="w-full bg-gradient-to-b from-[#35078D] to-[#000000]"
        style={{ height: HEADER_HEIGHT_PX }}
      />
      <div className="absolute inset-0">
        <div className="h-full max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="/" className="inline-flex items-center">
            <img
              src="/assets/Radar-logo.svg"
              alt="AIBoomi Radar"
              className="block"
              style={{ height: LOGO_HEIGHT_PX }}
              draggable={false}
            />
          </a>
          <div className="flex items-center gap-3">
            <button className="btn btn-green" type="button">Add your company</button>
            <button className="btn btn-outline" type="button">Filters</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
