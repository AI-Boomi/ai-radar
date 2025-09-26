import React from "react";
import { Linkedin, Twitter, MessageCircle } from "lucide-react";
import { SiDiscord } from "react-icons/si";

type Props = {
  onOpenAdd: () => void;
  onOpenFilters: () => void;
};

const LOGO_HEIGHT_PX = 35;
const HEADER_HEIGHT_PX = 200;

const Header: React.FC<Props> = ({ onOpenAdd, onOpenFilters }) => {
  return (
    <header className="relative">
      <div
        className="w-full bg-gradient-to-b from-[#35078D] to-[#000000]"
        style={{ height: HEADER_HEIGHT_PX }}
      />
      <div className="absolute inset-0">
        <div className="h-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col pt-12 md:pt-20">
          {/* Row 1: Logo + buttons */}
          <div className="flex items-center justify-between">
            <a href="/" className="inline-flex items-center">
              <img
                src="/assets/Radar-logo.svg"
                alt="AIBoomi Radar"
                style={{ height: LOGO_HEIGHT_PX }}
                className="block"
                draggable={false}
              />
            </a>
            <div className="flex items-center gap-3">
              <button className="btn btn-green" type="button" onClick={onOpenAdd}>
                Add your company
              </button>
              <button className="btn btn-outline" type="button" onClick={onOpenFilters}>
                Filters
              </button>
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
