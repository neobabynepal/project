import React from 'react';
import Link from 'next/link';

export default function VacancyCard({ vacancy }) {
  return (
    <div className="vacancy-card">
      <div className="vacancy-info">
        <h3 className="vacancy-title">{vacancy.title}</h3>
        <div className="vacancy-tags">
          {vacancy.department && <span className="vacancy-tag">{vacancy.department}</span>}
          {vacancy.location && <span className="vacancy-tag">{vacancy.location}</span>}
          {vacancy.employmentType && <span className="vacancy-tag">{vacancy.employmentType}</span>}
          {vacancy.deadline && <span className="vacancy-tag" style={{ color: 'var(--color-orange)' }}>Deadline: {vacancy.deadline}</span>}
        </div>
        <p className="vacancy-desc">{vacancy.shortDesc}</p>
      </div>

      <div style={{ flexShrink: 0 }}>
        <Link href={`/career/vacancies/${vacancy.slug}`} className="btn btn-primary">
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
