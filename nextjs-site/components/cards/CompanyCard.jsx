import React from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl, getPlaceholderImage } from '@/lib/media';

export default function CompanyCard({ company }) {
  const imageUrl = getStrapiMediaUrl(company.coverImage || company.logo) || getPlaceholderImage('company');
  const logoUrl = getStrapiMediaUrl(company.logo);
  const isLogoImage = Boolean(!company.coverImage && company.logo);

  return (
    <div className="card company-card">
      <div className={`company-card-img-wrapper ${isLogoImage ? 'company-card-logo-container' : ''}`}>
        <img
          src={imageUrl}
          alt={company.name}
          className={isLogoImage ? "company-card-logo" : "company-card-img"}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getPlaceholderImage('company');
          }}
        />
        {company.category && (
          <span className="company-card-category">{company.category}</span>
        )}
        {!isLogoImage && logoUrl && (
          <div className="company-card-logo-badge">
            <img
              src={logoUrl}
              alt={`${company.name} logo`}
              className="company-card-logo"
            />
          </div>
        )}
      </div>

      <div className="company-card-body">
        <h3 className="company-card-title">{company.name}</h3>
        {company.tagline && (
          <div className="company-card-tagline">{company.tagline}</div>
        )}
        <p className="company-card-desc">{company.shortDesc}</p>

        <div className="company-card-footer">
          <Link href={`/companies/${company.slug}`} className="btn btn-outline btn-sm">
            View Company Details
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
          {company.location && (
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
              {company.location.split(',')[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
