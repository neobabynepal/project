import React from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl, getPlaceholderImage } from '@/lib/media';

export default function BrandCard({ brand }) {
  const logoUrl = getStrapiMediaUrl(brand.logo || brand.image) || getPlaceholderImage('brand');

  return (
    <div className="brand-card">
      <div className="brand-logo-wrapper">
        <img
          src={logoUrl}
          alt={brand.name}
          className="brand-card-logo"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getPlaceholderImage('brand');
          }}
        />
      </div>

      <h3 className="brand-card-title">{brand.name}</h3>
      {brand.origin && (
        <span className="brand-card-origin">Origin: {brand.origin}</span>
      )}
      <p className="brand-card-desc">{brand.shortDesc}</p>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', width: '100%' }}>
        <Link href={`/brands/${brand.slug}`} className="btn btn-outline-orange btn-sm" style={{ width: '100%' }}>
          Explore Brand
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
