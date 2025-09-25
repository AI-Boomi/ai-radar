import React from "react";
import { ExternalLink, MapPin, Calendar } from "lucide-react";
import { Company } from "../types/company";

interface Props { company: Company; }

const CompanyCard: React.FC<Props> = ({ company }) => {
  const location = [company.city, company.state, company.country].filter(Boolean).join(", ");

  return (
    <article className="card card-hover rounded-[15px] h-full flex flex-col p-6 text-[#000]">
      {/* Title */}
      <h2 className="font-display text-[40px] leading-[48px] font-[700]">
        {company.name || "Company Name"}
      </h2>

      {/* Category */}
      {company.category ? (
        <div className="mt-3 -ml-1">
          <span className="badge-purple">{company.category}</span>
        </div>
      ) : null}

      {/* Description (3 lines) */}
      {company.description ? (
        <p className="mt-5 font-sans text-[16px] leading-[24px] line-clamp-3">
          {company.description}
        </p>
      ) : null}

      {/* Links */}
      <div className="mt-6 flex flex-wrap items-center gap-8">
        {company.website && (
          <a className="inline-flex items-center gap-2 font-display text-[16px] leading-[20px] link-violet"
             href={company.website} target="_blank" rel="noreferrer">
            <ExternalLink className="h-[18px] w-[18px]" />
            Website
          </a>
        )}
        {company.linkedinProfile && (
          <a className="inline-flex items-center gap-2 font-display text-[16px] leading-[20px] link-violet"
             href={company.linkedinProfile} target="_blank" rel="noreferrer">
            <ExternalLink className="h-[18px] w-[18px]" />
            Linkedin
          </a>
        )}
      </div>

      {/* Divider + Founders */}
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

      {/* Bottom meta pinned */}
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
