// src/components/CompanySidebar.tsx
import React from "react";
import { MapPin, Calendar, X, Pencil, Globe, Linkedin } from "lucide-react";
import { Company } from "../types/company";

interface CompanySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  onEditCompany?: (c: Company) => void;
}

/** Try exact keys first, then fall back to a loose search by substrings. */
function pickUrl(obj: unknown, exactKeys: string[], looseKeys?: string[]): string | undefined {
  const rec = obj as Record<string, unknown> | null;
  if (!rec) return undefined;

  for (const k of exactKeys) {
    const v = rec[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  if (looseKeys && looseKeys.length) {
    for (const [k, v] of Object.entries(rec)) {
      const lk = k.toLowerCase();
      if (looseKeys.some((s) => lk.includes(s))) {
        if (typeof v === "string" && v.trim()) return v.trim();
      }
    }
  }
  return undefined;
}

const CompanySidebar: React.FC<CompanySidebarProps> = ({
  isOpen,
  onClose,
  company,
  onEditCompany,
}) => {
  const websiteUrl =
    pickUrl(company, ["website", "Website", "websiteUrl", "website_url", "WebsiteURL", "Website Url"], ["web", "site"]) ??
    undefined;

  const linkedinUrl =
    pickUrl(
      company,
      [
        "linkedin",
        "Linkedin",
        "linkedinUrl",
        "linkedin_url",
        "linkedinProfileUrl",
        "Linkedin Profile URL",
        "LinkedIn Profile URL",
        "LinkedInURL",
        "LinkedinURL",
      ],
      ["linkedin", "linked-in"]
    ) ?? undefined;

  const category = company?.category ? String(company.category).trim() : "";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed right-0 top-0 w-full max-w-[520px]
        h-[100dvh] flex flex-col overflow-hidden
        bg-black/90 backdrop-blur-xl border-l border-[#E8F1DC1A] z-[70]
        transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="shrink-0 px-6 py-6 border-b border-[#E8F1DC1A] flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="sidebar-title text-white break-words">
              {company?.name ?? ""}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {company && onEditCompany && (
              <button
                onClick={() => onEditCompany(company)}
                className="social-icon !w-10 !h-10 border-white/30 text-white/90 hover:text-white"
                aria-label="Edit"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="social-icon !w-10 !h-10 border-white/30 text-white/90 hover:text-white"
              aria-label="Close"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          className="flex-1 min-h-0 overflow-y-auto scroll-area p-6 space-y-7"
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchMoveCapture={(e) => e.stopPropagation()}
        >
          {/* Website & LinkedIn — white, spaced, with icons */}
          {(websiteUrl || linkedinUrl) && (
            <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-[#60F] font-display text-[16px] leading-[20px] underline-offset-4 hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-[#60F] font-display text-[16px] leading-[20px] underline-offset-4 hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  Linkedin
                </a>
              )}
            </div>
          )}

          {/* Category pill (same style as card; only once) */}
          {category && (
            <div>
              <span className="badge-purple badge-wrap">{category}</span>
            </div>
          )}

          {/* Description — Instrument Sans 16/24 regular */}
          {company?.description && (
  <p className="body-regular text-white/90">
    {company.description}
  </p>
)}
          {/* Founders — label in Geist Mono 12/18 regular; names as Degular H6/Bold */}
         {company?.founders && company.founders.length > 0 && (
  <section className="space-y-3">
    <div className="label-founders">// Founders</div>
    <div className="space-y-2">
      {company.founders.map((f, i) => (
        <div
          key={`${f}-${i}`}
          className="font-display text-[16px] leading-[20px] font-[700] text-white"
        >
          {f}
        </div>
      ))}
    </div>
  </section>
)}

          {/* Location & Founded */}
          {(company?.city || company?.state || company?.country || company?.founded) && (
            <section className="space-y-3 pt-2">
              {company?.city || company?.state || company?.country ? (
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="h-4 w-4 text-white/70" />
                  <span className="font-display text-[16px] leading-[20px]">
                    {[company?.city, company?.state, company?.country]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              ) : null}

              {typeof company?.founded !== "undefined" && company?.founded !== null && (
                <div className="flex items-center gap-2 text-white/90">
                  <Calendar className="h-4 w-4 text-white/70" />
                  <span className="font-display text-[16px] leading-[20px]">
                    Founded {String(company.founded)}
                  </span>
                </div>
              )}
            </section>
          )}
        </div>
      </aside>
    </>
  );
};

export default CompanySidebar;
