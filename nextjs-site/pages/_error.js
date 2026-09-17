import React from 'react';
import Link from 'next/link';
import Seo from '@/components/ui/Seo';

function CustomError({ statusCode }) {
  const is404 = statusCode === 404;
  const pageTitle = is404 ? "Page Not Found (404)" : "Application Notice";
  const headingText = is404 ? "Requested Page Does Not Exist" : "Something Went Wrong";
  const descText = is404
    ? "The page you are looking for might have been removed or is temporarily unavailable."
    : "An unexpected system error occurred while processing your request. Please try again or contact our team directly.";

  return (
    <>
      <Seo title={`${pageTitle} | Adhikari Group`} description={descText} />

      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">{pageTitle}</h1>
          <p className="page-hero-desc">{descText}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <div style={{
            background: 'var(--color-bg-white)',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 2rem',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-full)',
              background: is404 ? 'var(--color-orange-subtle)' : 'rgba(239, 68, 68, 0.1)',
              color: is404 ? 'var(--color-orange)' : '#EF4444',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.6rem',
              fontWeight: 700,
              color: 'var(--color-heading)',
              marginBottom: '1rem'
            }}>
              {headingText}
            </h2>

            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              {descText}
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn btn-primary">
                Return to Homepage
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  if (err) {
    console.error('[Error Boundary Log]:', err);
  }
  return { statusCode };
};

export default CustomError;
