// src/components/EditCompanySidebar.tsx
import React, { useMemo, useState } from "react";
import { Company } from "../types/company";

interface EditCompanySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  company?: Company | null;
}

const REPO_URL = "https://github.com/AI-Boomi/ai-radar-companies";

const EditCompanySidebar: React.FC<EditCompanySidebarProps> = ({
  isOpen,
  onClose,
  company,
}) => {
  const [copied, setCopied] = useState(false);

  const companyName = company?.name ?? "your company";

  const currentJson = useMemo(
    () =>
      company
        ? JSON.stringify(company, null, 2)
        : "// Select a company to see its current data here.",
    [company]
  );

  const copyCurrent = async () => {
    try {
      await navigator.clipboard.writeText(currentJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  const Divider = () => (
    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#60F]/70 to-transparent drop-shadow" />
  );

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
        <div className="shrink-0 px-6 py-6 border-b border-[#E8F1DC1A] flex items-start justify-between">
          <div>
            <h2 className="sidebar-title text-white">Edit your company</h2>
            <p className="mt-3 font-display text-[14px] leading-[20px] text-white/80">
              Make changes to your company record on AIBoomi Radar.
            </p>
          </div>
          <button
            onClick={onClose}
            className="social-icon !w-10 !h-10 border-white/30 text-white/90 hover:text-white"
            aria-label="Close"
            title="Close"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        {/* Body */}
        <div
          className="flex-1 min-h-0 overflow-y-auto scroll-area p-7 space-y-10"
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchMoveCapture={(e) => e.stopPropagation()}
        >
          {/* Intro + Repo button */}
          <section className="space-y-6">
            <p className="text-white/80 text-[14px] leading-[20px] text-center max-w-[56ch] mx-auto">
              Start with accessing our open Github repository
            </p>
            <div className="flex justify-center">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green inline-flex items-center justify-center px-6 py-3 rounded-full"
              >
                Open GitHub Repository
              </a>
            </div>
            <Divider />
          </section>

          {/* Steps */}
          <section className="space-y-7">
            {/* 1. Locate file */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  1
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Locate the Companies JSON File
                </h4>
              </div>
              <div className="pl-11">
                <div className="rounded-lg border border-white/15 bg-white/5 p-4 inline-block">
                  <div className="text-[12px] text-white/60 mb-2 font-mono">File path</div>
                  <div
                    className="font-mono text-[13px] bg-black/40 border border-white/10 rounded px-2 py-1 inline-block"
                    style={{ color: "#00FF4E" }}
                  >
                    companies.json
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Find company & edit */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  2
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Find Your Company in the JSON File
                </h4>
              </div>
              <div className="pl-11">
                <ul className="text-white/80 text-[14px] leading-[20px] list-disc pl-5 space-y-2">
                  <li>
                    Click on <code>companies.json</code>
                  </li>
                  <li>Click the pencil icon (✏️) to edit the file</li>
                  <li>
                    Search for <code>&quot;{companyName}&quot;</code> to find your company entry
                  </li>
                  <li>Update the fields you want to change</li>
                </ul>
              </div>
            </div>

            {/* 3. Current company data */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  3
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Your Current Company Data
                </h4>
              </div>
              <div className="pl-11 space-y-4">
                <p className="text-white/80 text-[14px] leading-[20px]">
                  Here's your current company information. Update any fields as needed:
                </p>

                <div className="relative rounded-lg border border-white/15 bg-black/40 p-4">
                  <button
                    onClick={copyCurrent}
                    className="absolute top-3 right-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-[12px] hover:bg-white/15"
                    aria-label="Copy JSON to clipboard"
                    title="Copy JSON"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <pre className="text-[12px] leading-[18px] text-white/90 whitespace-pre-wrap">
                    {currentJson}
                  </pre>
                </div>
              </div>
            </div>

            {/* 4. Submit changes */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  4
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Submit Your Changes
                </h4>
              </div>
              <div className="pl-11">
                <p className="text-white/80 text-[14px] leading-[20px] mb-2">
                  Once you've made your changes, submit them for review.
                </p>
                <ul className="text-white/80 text-[14px] leading-[20px] list-disc pl-5 space-y-2">
                  <li>Scroll down to &quot;Commit changes&quot; section</li>
                  <li>
                    Add a commit message like:{" "}
                    <code>Update {companyName} information</code>
                  </li>
                  <li>
                    Select &quot;Create a new branch for this commit and start a pull request&quot;
                  </li>
                  <li>Click &quot;Propose changes&quot;</li>
                  <li>Review your changes and click &quot;Create pull request&quot;</li>
                  <li>Add a description of what you changed and why</li>
                </ul>

                {/* NEW: boxed success note, same style as the amber "Important" box */}
                <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-400/10 text-amber-100 text-[13px] leading-[18px] p-3">
                  ✓ Done! Your changes will be reviewed and merged, updating your company information
                  on the AI Radar.
                </div>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
};

export default EditCompanySidebar;
