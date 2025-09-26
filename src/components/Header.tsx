import React from "react";
import { Linkedin, Twitter, MessageCircle } from "lucide-react";
import { SiDiscord } from "react-icons/si";

const LOGO_HEIGHT_PX = 35;   // per your change
const HEADER_HEIGHT_PX = 200; // per your change

const Header: React.FC = () => {
  return (
    <header className="relative">
      {/* Top gradient */}
      <div
        className="w-full bg-gradient-to-b from-[#35078D] to-[#000000]"
        style={{ height: HEADER_HEIGHT_PX }}
      />

      {/* Content aligned to card grid width */}
      <div className="absolute inset-0">
        <div className="h-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col pt-16 md:pt-24">
          {/* Row 1: Logo + buttons */}
          <div className="flex items-center justify-between">
            {/* Logo pinned to left grid edge */}
            <a href="/" className="inline-flex items-center">
              <img
                src="/assets/Radar-logo.svg"
                alt="AIBoomi Radar"
                style={{ height: LOGO_HEIGHT_PX }}
                className="block"
                draggable={false}
              />
            </a>

            {/* Buttons pinned to right grid edge */}
            <div className="flex items-center gap-3">
              <button className="btn btn-green" type="button">
                Add your company
              </button>
              <button className="btn btn-outline" type="button">
                Filters
              </button>
            </div>
          </div>

          {/* Row 2: Blurb (left) + Social icons (right), top-aligned */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Blurb — spans half container on md+ */}
            <p className="text-white font-display text-[24px] leading-[28px] font-normal max-w-[52ch]">
              A living map of India’s AI startup ecosystem - spotlight on AI
              founders, startups, and movements reshaping the future.
            </p>

            {/* Social icons — right aligned, top-aligned with blurb */}
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
