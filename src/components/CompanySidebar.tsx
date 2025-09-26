import React, { useState } from "react";
import { Company } from "../types/company";
import { ExternalLink, MapPin, Calendar, Edit3 } from "lucide-react";

interface CompanySidebarProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onEditCompany: (company: Company) => void;
}

const CompanySidebar: React.FC<CompanySidebarProps> = ({
  company,
  isOpen,
  onClose,
  onEditCompany,
}) => {
  const [logoError, setLogoError] = useState(false);
  if (!company) return null;

  const location = [company.city, company.state, company.country].filter(Boolean).join(", ");

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
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl overflow-hidden bg-white grid place-items-center">
              {!logoError ? (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="h-full w-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="font-display text-[20px] font-[700]">{company.name?.[0] || "•"}</span>
              )}
            </div>
            <div>
              <h2 className="font-display text-white text-[24px] leading-[28px] font-[700]">
                {company.name}
              </h2>
              <div className="mt-1 font-display text-[14px] leading-[18px] text-white/80">
                {typeof company.founded !== "undefined" && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Founded {company.founded}
                  </span>
                )}
                {location && <span className="mx-2">•</span>}
                {location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {location}
                  </span>
                )}
              </div>
              <div className="mt-1 text-white/70 text-[13px] leading-[16px]">
                {[company.category, ...(company.tags || [])].filter(Boolean).join(" • ")}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEditCompany(company)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/25 text-white hover:bg-white/10 transition"
            >
              <Edit3 className="h-4 w-4" />
              Edit info
            </button>
            <button
              onClick={onClose}
              className="social-icon !w-10 !h-10 border-white/30 text-white/90 hover:text-white"
              aria-label="Close"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          className="flex-1 overflow-y-auto scroll-area p-6 space-y-8"
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchMoveCapture={(e) => e.stopPropagation()}
        >
          {company.description && (
            <p className="font-sans text-[16px] leading-[24px] text-white/90">{company.description}</p>
          )}

          {/* Founders */}
          {company.founders?.length ? (
            <section>
              <div className="founder-label mb-3 text-white/90">// Founders</div>
              <ul className="space-y-2">
                {company.founders.map((f) => (
                  <li
                    key={f}
                    className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#F1E6FF] text-[#6600FF] grid place-items-center font-display font-[700]">
                      {f.trim()[0]}
                    </div>
                    <span className="founder-name text-white">{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Links */}
          <section className="space-y-2">
            {company.website && (
              <a
                className="inline-flex items-center gap-2 font-display text-[16px] leading-[20px] link-violet"
                href={company.website}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Website
              </a>
            )}
            {company.linkedinProfile && (
              <a
                className="inline-flex items-center gap-2 font-display text-[16px] leading-[20px] link-violet"
                href={company.linkedinProfile}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Linkedin
              </a>
            )}
          </section>
        </div>
      </aside>
    </>
  );
};

export default CompanySidebar;
