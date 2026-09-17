import React from 'react';
import Link from 'next/link';

export default function EmptyState({
  title = "Content Coming Soon",
  message = "We are currently updating this section. Please check back shortly.",
  actionText = "Back to Home",
  actionHref = "/"
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-text">{message}</p>
      {actionHref && (
        <div style={{ marginTop: '1.5rem' }}>
          <Link href={actionHref} className="btn btn-outline">
            {actionText}
          </Link>
        </div>
      )}
    </div>
  );
}
