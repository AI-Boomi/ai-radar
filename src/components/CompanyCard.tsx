import React from "react";
import { ExternalLink, MapPin, Calendar } from "lucide-react";
import { Company } from "../types/company";

interface Props { company: Company; }

const CompanyCard: React.FC<Props> = ({ company }) => {
  const location = [company.city, company.state, company.country].filter(Boolean).join(", ");

  return (
    <article
      className="
        h-full flex flex-col
        bg-[#F8FFE9] text-[#000]
        border border-[#E8F1DC]
        rounded-[15px]   /* 25% smaller than 20px */
        p-6
      "
    >
      {/* Company name — Degular 40/48 Bold */}
      <h2 className="font-display text-[40px] leading-[48px] font-[700]">
        {company.name || "Company Name"}
      </h2>

      {/* Category tag — nudged left for optical alignment */}
      {company.category ? (
        <div className="mt-3 -ml-1">
          <span className="inline-flex items-center rounded-full bg-[#F1E6FF] text-[#6600FF] font-sans text-[14px] leading-[18px] font-[500] px-3 py-1">
            {company.category}
          </span>
        </div>
      ) : null}

      {/* Description — clamp to 3 lines */}
      {company.description ? (
        <p className="mt-5 font-sans text-[16px] leading-[24px] line-clamp-3">
          {company.description}
        </p>
      ) : null}

      {/* Links */}
      <div className="mt-6 flex flex-wrap items-center gap-8">
        {company.website && (
          <a
            className="inline-flex items-center gap-2 font-display text-[16px] leading-[20px] text-[#6600FF]"
            href={company.website}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="h-[18px] w-[18px]" />
            Website
          </a>
        )}
        {company.linkedinProfile && (
          <a
            className="inline-flex items-center gap-2 font-display text-[16px] leading-[20px] text-[#6600FF]"
            href={company.linkedinProfile}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="h-[18px] w-[18px]" />
            Linkedin
          </a>
        )}
      </div>

      {/* Separator + Founders */}
      <hr className="mt-8 mb-6 border-t border-[#E8F1DC]" />
      <div className="font-mono text-[14px] leading-[16px]">// Founders</div>

      {company.founders?.length ? (
        <ul className="mt-4 space-y-2">
          {company.founders.map((f) => (
            <li key={f} className="font-display text-[24px] leading-[28px] font-[700]">
              {f}
            </li>
          ))}
        </ul>
      ) : null}

      {/* Bottom meta — pinned to bottom */}
      <div className="mt-auto pt-8 flex flex-wrap items-center gap-x-12 gap-y-3 font-display text-[16px] leading-[20px]">
        <div className="inline-flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          <span>{location || "Location"}</span>
        </div>
        {company.founded ? (
          <div className="inline-flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Founded {company.founded}</span>
          </div>
        ) : null}
      </div>
    </article>
  );
};

export default CompanyCard;
