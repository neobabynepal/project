import React from 'react';
import Link from 'next/link';

export default function PolicyCard({ policy }) {
  return (
    <div className="policy-card">
      <div>
        <div style={{ color: 'var(--color-orange)', marginBottom: '0.75rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>
          {policy.title}
        </h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Official governance and operational standards adopted across all Adhikari Group entities.
        </p>
      </div>

      <div>
        <Link href={`/career/policies/${policy.slug}`} className="btn btn-outline-orange btn-sm">
          Read Policy
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
