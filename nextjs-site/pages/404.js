import React from 'react';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/strapi';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Seo from '@/components/ui/Seo';

export default function Custom404({ settings }) {
  return (
    <>
      <Seo
        title="Page Not Found (404)"
        description="The requested corporate page could not be found."
      />

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: '404 Error' }]} />
          <h1 className="page-hero-title">Page Not Found</h1>
          <p className="page-hero-desc">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
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
              fontSize: '5rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              color: 'var(--color-orange)',
              lineHeight: 1,
              marginBottom: '1rem'
            }}>
              404
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.6rem',
              fontWeight: 700,
              color: 'var(--color-heading)',
              marginBottom: '1rem'
            }}>
              Requested Page Does Not Exist
            </h2>

            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Please check the URL for errors or use the navigation below to explore our corporate entities, brands, and career opportunities.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn btn-primary">
                Return to Homepage
              </Link>
              <Link href="/companies" className="btn btn-outline">
                Our Companies
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

export async function getStaticProps() {
  const settings = await getSiteSettings();

  return {
    props: {
      settings
    }
  };
}
