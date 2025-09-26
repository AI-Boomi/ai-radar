import React from "react";
import { Company } from "../types/company";

interface EditCompanySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
}

const EditCompanySidebar: React.FC<EditCompanySidebarProps> = ({ isOpen, onClose, company }) => {
  if (!company) return null;

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
            <h2 className="sidebar-title text-white">Edit company</h2>
            <p className="mt-2 text-white/80 text-[14px] leading-[18px]">
              Update <span className="text-white">{company.name}</span> via GitHub.
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

        {/* Body */}
        <div
          className="flex-1 overflow-y-auto scroll-area p-6 space-y-8"
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchMoveCapture={(e) => e.stopPropagation()}
        >
          {/* Step 1 */}
          <section className="space-y-3">
            <h3 className="font-display text-white text-[18px] leading-[22px] font-[700]">
              1. Go to the GitHub repository
            </h3>
            <div className="pl-6">
              <a
                href="https://github.com/AI-Boomi/ai-radar-companies"
                target="_blank"
                rel="noreferrer"
                className="btn btn-green inline-flex items-center justify-center px-5 py-2.5 rounded-full"
              >
                Open GitHub Repository
              </a>
            </div>
          </section>

          {/* Step 2 */}
          <section className="space-y-3">
            <h3 className="font-display text-white text-[18px] leading-[22px] font-[700]">
              2. Find and edit the JSON
            </h3>
            <div className="pl-6 space-y-3">
              <p className="text-white/80 text-[14px] leading-[20px]">
                Locate your company entry and update the fields you need.
              </p>
              <div className="rounded-lg border border-white/15 bg-white/5 p-3">
                <div className="text-[12px] text-white/60 mb-1 font-mono">File path</div>
                <div
                  className="font-mono text-[13px] bg-black/40 border border-white/10 rounded px-2 py-1 inline-block"
                  style={{ color: "#00FF4E" }}
                >
                  companies.json
                </div>
              </div>
              <div className="rounded-md border border-amber-400/30 bg-amber-400/10 text-amber-100 text-[13px] leading-[18px] p-3">
                Keep valid JSON formatting—no stray commas or quotes.
              </div>
            </div>
          </section>

          {/* Step 3: Current data */}
          <section className="space-y-3">
            <h3 className="font-display text-white text-[18px] leading-[22px] font-[700]">
              3. Current company data
            </h3>
            <div className="pl-6 rounded-lg border border-white/15 bg-black/40 p-3 overflow-x-auto">
              <pre className="text-[12px] leading-[18px] text-white/90 whitespace-pre-wrap">{`{
  "Name": "${company.name}",
  "Founded": ${typeof company.founded === "number" ? company.founded : `"${company.founded ?? ""}"`},
  "Founders": "${(company.founders || []).join(", ")}",
  "Website": "${company.website ?? ""}",
  "Category": "${[company.category, ...(company.tags || [])].filter(Boolean).join(", ")}",
  "Country": "${company.country ?? ""}",
  "State": "${company.state ?? ""}",
  "City": "${company.city ?? ""}",
  "Logo": "${company.logoUrl ?? ""}",
  "Description": "${(company.description ?? "").replace(/"/g, '\\"')}",
  "Linkedin Profile URL": "${company.linkedinProfile ?? ""}",
  "uuid": ${company.id ?? 0}
}`}</pre>
            </div>
          </section>

          {/* Step 4 */}
          <section className="space-y-3">
            <h3 className="font-display text-white text-[18px] leading-[22px] font-[700]">
              4. Submit your changes
            </h3>
            <ul className="pl-6 text-white/80 text-[14px] leading-[20px] list-disc space-y-1">
              <li>Add a clear commit message</li>
              <li>Create a new branch &amp; propose changes</li>
              <li>Open a pull request with a short description</li>
            </ul>
          </section>
        </div>
      </aside>
    </>
  );
};

export default EditCompanySidebar;
