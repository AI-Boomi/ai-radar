import React from "react";
import { ExternalLink, MapPin, Calendar } from "lucide-react";
import { Company } from "../types/company";

interface Props {
  company: Company;
  /** If true, Website/LinkedIn links will stop propagation so parent onClick isn't triggered */
  stopCardClickOnLinks?: boolean;
}

const CompanyCard: React.FC<Props> = ({ company, stopCardClickOnLinks }) => {
  const location = [company.city, company.state, company.country]
    .filter(Boolean)
    .join(", ");

  const stop = (e: React.MouseEvent) => {
    if (stopCardClickOnLinks) e.stopPropagation();
  };

  return (
    <div className="card-wrap h-full">
      <article className="card rounded-[15px] h-full flex flex-col p-6 text-[#000]">
        {/* Title */}
        <h2 className="font-display text-[40px] leading-[48px] font-[700]">
          {company.name || "Company Name"}
        </h2>

        {/* Category */}
        {company.category ? (
          <div className="mt-3 -ml-1">
            <span className="badge-purple badge-wrap">
              {company.category}
            </span>
          </div>
        ) : null}

        {/* Description */}
        {company.description ? (
          <p className="mt-5 font-sans text-[16px] leading-[24px] line-clamp-3">
            {company.description}
          </p>
        ) : null}

        {/* Links */}
        <div className="mt-6 flex flex-wrap items-center gap-8">
          {company.website && (
            <a
              className="inline-flex items-center gap-2 font-display text-[16px] leading-[20px] link-violet"
              href={company.website}
              target="_blank"
              rel="noreferrer"
              onClick={stop}
            >
              <ExternalLink className="h-[18px] w-[18px]" />
              Website
            </a>
          )}
          {company.linkedinProfile && (
            <a
              className="inline-flex items-center gap-2 font-display text-[16px] leading-[20px] link-violet"
              href={company.linkedinProfile}
              target="_blank"
              rel="noreferrer"
              onClick={stop}
            >
              <ExternalLink className="h-[18px] w-[18px]" />
              Linkedin
            </a>
          )}
        </div>

        {/* Divider */}
        <hr className="mt-4 mb-4 border-t border-[#E8F1DC]" />

        {/* Founders */}
        <div className="founder-label">// Founders</div>
        {company.founders?.length ? (
          <ul className="mt-3 space-y-1.5">
            {company.founders.map((f) => (
              <li key={f} className="founder-name">
                {f}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Bottom meta (stacked) */}
        <div className="mt-auto pt-8 flex flex-col gap-1 font-display text-[16px] leading-[20px]">
          <div className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{location || "Location"}</span>
          </div>
          {company.founded ? (
            <div className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Founded {company.founded}</span>
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
};

export default CompanyCard;
