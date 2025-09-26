// src/components/AddCompanySidebar.tsx
import React, { useMemo, useState } from "react";

interface AddCompanySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FORM_URL = "https://aiboomi.typeform.com/to/p54zzzPv";

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
    } catch {/* noop */}
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
        {/* Section 1: Title */}
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

        {/* Sections 2 & 3 */}
        <div
          className="flex-1 min-h-0 overflow-y-auto scroll-area p-7 space-y-10"
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchMoveCapture={(e) => e.stopPropagation()}
        >
          {/* Section 2: Options (center) */}
          <section className="space-y-8">
            {/* Option 1 */}
            <div className="flex flex-col items-center text-center gap-4">
              <h3 className="font-display text-white text-[18px] leading-[22px] font-[700]">
                Option 1: Fill out this form
              </h3>
              <p className="text-white/80 text-[14px] leading-[20px] max-w-[46ch]">
                Share your details with us and we’ll add your company to the database.
              </p>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green inline-flex items-center justify-center px-6 py-3 rounded-full"
              >
                Add my AI startup
              </a>
            </div>

            {/* OR with side dividers */}
            <div className="flex items-center gap-5">
              <Divider />
              <span className="px-3 py-1 rounded-full bg-[#6600FF] text-white text-[12px] font-[700] tracking-wider shadow">
                OR
              </span>
              <Divider />
            </div>

            {/* Option 2 */}
            <div className="flex flex-col items-center text-center gap-4">
              <h3 className="font-display text-white text-[18px] leading-[22px] font-[700]">
                Option 2: Join AIBoomi Radar via GitHub
              </h3>
              <p className="text-white/80 text-[14px] leading-[20px] max-w-[56ch]">
                Edit our open Github repository and add details yourself. Please follow the
                instructions given below.
              </p>
              <a
                href="https://github.com/AI-Boomi/ai-radar-companies"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green inline-flex items-center justify-center px-6 py-3 rounded-full"
              >
                Open GitHub Repository
              </a>

              {/* Faint separator AFTER option 2 button */}
              <div className="w-full mt-6">
                <Divider />
              </div>
            </div>
          </section>

          {/* Section 3: How-to steps */}
          <section className="space-y-7">
            <h3 className="font-display text-white text-[16px] leading-[20px] font-[700]">
              How to edit the Github repo and add your data
            </h3>

            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  1
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Locate the Companies JSON File
                </h4>
              </div>
              <div className="pl-11 space-y-4">
                <p className="text-white/80 text-[14px] leading-[20px]">
                  Navigate to the companies data file and add your company information.
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
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  2
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Edit the file
                </h4>
              </div>
              <div className="pl-11">
                <ul className="text-white/80 text-[14px] leading-[20px] list-disc pl-5 space-y-2">
                  <li>
                    Click on <code>companies.json</code>
                  </li>
                  <li>Click the pencil icon (✏️) to edit the file</li>
                  <li>
                    Add your company data at the end of the array (before the closing{" "}
                    <code style={{ color: "#00FF4E" }}>]</code>)
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  3
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Add Your Company Data
                </h4>
              </div>
              <div className="pl-11 space-y-4">
                <p className="text-white/80 text-[14px] leading-[20px]">
                  Copy and customize this template with your company information:
                </p>

                <div className="relative rounded-lg border border-white/15 bg-black/40 p-4">
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
                  <strong className="text-amber-200">Important:</strong> Make sure to add a comma
                  after the previous company entry and ensure your JSON is properly formatted.
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full grid place-items-center bg-white/10 border border-white/20 text-white">
                  4
                </span>
                <h4 className="font-display text-white text-[16px] leading-[20px] font-[700]">
                  Submit Your Pull Request
                </h4>
              </div>
              <div className="pl-11">
                <p className="text-white/80 text-[14px] leading-[20px] mb-2">
                  Once you've added your company data, submit it for review.
                </p>
                <ul className="text-white/80 text-[14px] leading-[20px] list-disc pl-5 space-y-2">
                  <li>Scroll down to &quot;Commit changes&quot; section</li>
                  <li>
                    Add a commit message like: <code>Add [Your Company Name] to AI Radar</code>
                  </li>
                  <li>
                    Select &quot;Create a new branch for this commit and start a pull request&quot;
                  </li>
                  <li>Click &quot;Propose changes&quot;</li>
                  <li>Review your changes and click &quot;Create pull request&quot;</li>
                </ul>
                <div className="mt-3 text-white/80 text-[14px] leading-[20px]">
                  ✓ That’s it! Your pull request will be reviewed and merged, adding your company to
                  the AI Radar.
                </div>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
};

export default AddCompanySidebar;
