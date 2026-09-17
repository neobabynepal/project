import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getCompanies, getCompanyBySlug, getSiteSettings } from '@/lib/strapi';
import { getStrapiMediaUrl, getPlaceholderImage } from '@/lib/media';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RichText from '@/components/ui/RichText';

export default function CompanyDetailPage({ company }) {
  if (!company) return null;

  const imageUrl = getStrapiMediaUrl(company.coverImage || company.logo) || getPlaceholderImage('company');

  const isLogoImage = Boolean(!company.coverImage && company.logo);

  return (
    <>
      <Head>
        <title>{`${company.name} | Adhikari Group`}</title>
        <meta name="description" content={company.shortDesc || `${company.name} - subsidiary of Adhikari Group Nepal.`} />
        <meta property="og:title" content={`${company.name} | Adhikari Group`} />
        <meta property="og:description" content={company.shortDesc} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Companies', href: '/companies' },
              { label: company.name }
            ]}
          />
          <h1 className="page-hero-title">{company.name}</h1>
          {company.tagline && <p className="page-hero-desc">{company.tagline}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-layout-grid">
            {/* Main Details */}
            <div>
              <div className={isLogoImage ? "detail-logo-box" : "detail-cover-box"}>
                <img
                  src={imageUrl}
                  alt={company.name}
                  style={{ objectFit: isLogoImage ? 'contain' : 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getPlaceholderImage('company');
                  }}
                />
              </div>

              <div style={{ background: 'var(--color-bg-white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1.5rem' }}>
                  About the Company
                </h2>
                <RichText content={company.fullDesc || company.shortDesc} />

                {company.functions && company.functions.length > 0 && (
                  <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1rem' }}>
                      Key Operational Capabilities
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {company.functions.map((fn, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: 'var(--color-surface-subtle)',
                            color: 'var(--color-primary)',
                            padding: '0.45rem 1rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            border: '1px solid var(--color-border)'
                          }}
                        >
                          {fn}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar info */}
            <aside>
              <div style={{ background: 'var(--color-bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-orange-subtle)', paddingBottom: '0.75rem' }}>
                  Company Overview
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', fontWeight: 700 }}>Category</span>
                    <p style={{ fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.2rem' }}>{company.category || 'Subsidiary Enterprise'}</p>
                  </div>

                  {company.location && (
                    <div>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', fontWeight: 700 }}>Location</span>
                      <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginTop: '0.2rem' }}>{company.location}</p>
                    </div>
                  )}

                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', fontWeight: 700 }}>Parent Group</span>
                    <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginTop: '0.2rem' }}>Adhikari Group Nepal</p>
                  </div>
                </div>

                {company.website && company.website !== '#' ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', textAlign: 'center', marginBottom: '1rem' }}
                  >
                    Visit Official Website
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ) : null}

                <Link href="/companies" className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
                  &larr; Back to All Companies
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const companies = await getCompanies();
  const paths = companies.map(c => ({
    params: { slug: c.slug || String(c.id) }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const [company, settings] = await Promise.all([
    getCompanyBySlug(params.slug),
    getSiteSettings()
  ]);

  if (!company) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      company,
      settings
    },
    revalidate: 60
  };
}
