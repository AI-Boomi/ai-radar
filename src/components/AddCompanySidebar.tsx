import React, { useMemo, useState } from "react";

interface AddCompanySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// TODO: replace with your actual form link
const FORM_URL = "#";

const AddCompanySidebar: React.FC<AddCompanySidebarProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const jsonTemplate = useMemo(
    () =>
      `{
  "Name": "Your Company Name",
  "Founded": 2024,
  "Founders": "Founder Name 1, Founder Name 2",
  "Website": "https://yourcompany.com",
  "Category": "AI/ML, Machine Learning, SaaS",
  "Country": "India",
  "State": "Karnataka",
  "City": "Bangalore",
  "Logo": "https://your-logo-url.com/logo.png",
  "Description": "Brief description of what your company does...",
  "Linkedin Profile URL": "https://linkedin.com/company/yourcompany",
  "uuid": 123
}`,
    []
  );

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // silent
    }
  };

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
        bg-black/90 backdrop-blur-lg border-l border-[#E8F1DC1A] z-[70]
        transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="shrink-0 px-6 py-6 border-b border-[#E8F1DC1A] flex items-start justify-between">
          <div>
            <h2 className="sidebar-title text-white">Add your company</h2>
            <p className="mt-3 font-display text-[14px] leading-[20px] text-white/80">
              Ready to showcase your AI company?
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

        {/* Body (scroll area) */}
        <div
          className="flex-1 min-h-0 overflow-y-auto scroll-area p-7 space-y-12"
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchMoveCapture={(e) => e.stopPropagation()}
        >
          {/* ========== Option 1 ========== */}
          <section className="space-y-5">
            <h3 className="font-display text-white text-[18px] leading-[22px] font-[700]">
              Option 1: Fill out this form
            </h3>
            <p className="text-white/80 text-[14px] leading-[20px] pl-1">
              Share your details with us and we’ll add your company to the database.
            </p>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-green inline-flex items-center justify-center px-6 py-3 rounded-full"
            >
              Fill out company form
            </a>
          </section>

          {/* OR separator (more prominent) */}
          <div className="flex items-center gap-5">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#60F]/70 to-transparent drop-shadow" />
            <span className="px-3 py-1 rounded-full bg-[#6600FF] text-white text-[12px] font-[700] tracking-wider shadow">
              OR
            </span>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#60F]/70 to-transparent drop-shadow" />
          </div>

          {/* ========== Option 2 ========== */}
          <section className="space-y-7">
            <h3 className="font-display text-white text-[18px] leading-[22px] font-[700]">
              Option 2: Join AIBoomi Radar via GitHub
            </h3>

            {/* Intro + Repo button */}
            <div className="space-y-4">
              <p className="text-white/80 text-[14px] leading-[20px] pl-1">
                Start by navigating to the GitHub repository.
              </p>
              <a
                href="https://github.com/AI-Boomi/ai-radar-companies"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green inline-flex items-center justify-center px-6 py-3 rounded-full"
              >
                Open GitHub Repository
              </a>
            </div>

            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  1
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Locate the companies JSON file
                </h4>
              </div>
              <div className="pl-11 space-y-4">
                <p className="text-white/80 text-[14px] leading-[20px]">
                  Find and edit the data file to add your record.
                </p>
                <div className="rounded-lg border border-white/15 bg-white/5 p-4">
                  <div className="text-[12px] text-white/60 mb-2 font-mono">File path</div>
                  <div
                    className="font-mono text-[13px] bg-black/40 border border-white/10 rounded px-2 py-1 inline-block"
                    style={{ color: "#00FF4E" }}
                  >
                    companies.json
                  </div>
                </div>
                <ul className="text-white/80 text-[14px] leading-[20px] list-disc pl-5 space-y-2">
                  <li>
                    Open <code style={{ color: "#00FF4E" }}>companies.json</code>
                  </li>
                  <li>Click the pencil icon to edit</li>
                  <li>Add your company object at the end of the array</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  2
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Add your company data
                </h4>
              </div>
              <div className="pl-11 space-y-4">
                <div className="relative rounded-lg border border-white/15 bg-black/40 p-4">
                  {/* Copy button */}
                  <button
                    onClick={copyJson}
                    className="absolute top-3 right-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-[12px] hover:bg-white/15"
                    aria-label="Copy JSON to clipboard"
                    title="Copy JSON"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <pre className="text-[12px] leading-[18px] text-white/90 whitespace-pre-wrap">
                    {jsonTemplate}
                  </pre>
                </div>
                <div className="rounded-md border border-amber-400/30 bg-amber-400/10 text-amber-100 text-[13px] leading-[18px] p-3">
                  Don’t forget commas and brackets—keep valid JSON!
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  3
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Submit your pull request
                </h4>
              </div>
              <div className="pl-11">
                <ul className="text-white/80 text-[14px] leading-[20px] list-disc pl-5 space-y-2">
                  <li>Add a clear commit message</li>
                  <li>Create a new branch &amp; propose changes</li>
                  <li>Open a pull request for review</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
};

export default AddCompanySidebar;
