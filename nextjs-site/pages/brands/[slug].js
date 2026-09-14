import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getBrands, getBrandBySlug, getSiteSettings } from '@/lib/strapi';
import { getStrapiMediaUrl, getPlaceholderImage } from '@/lib/media';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RichText from '@/components/ui/RichText';

export default function BrandDetailPage({ brand }) {
  if (!brand) return null;

  const logoUrl = getStrapiMediaUrl(brand.logo || brand.image) || getPlaceholderImage('brand');

  return (
    <>
      <Head>
        <title>{`${brand.name} | Adhikari Group`}</title>
        <meta name="description" content={brand.shortDesc || `${brand.name} brand under Adhikari Group Nepal.`} />
        <meta property="og:title" content={`${brand.name} | Adhikari Group`} />
        <meta property="og:description" content={brand.shortDesc} />
        {logoUrl && <meta property="og:image" content={logoUrl} />}
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Brands', href: '/brands' },
              { label: brand.name }
            ]}
          />
          <h1 className="page-hero-title">{brand.name}</h1>
          {brand.relationship && <p className="page-hero-desc">{brand.relationship}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)', gap: '3.5rem', alignItems: 'start' }}>
            {/* Main Story & Features */}
            <div>
              <div style={{ background: 'var(--color-bg-white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ width: '120px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={logoUrl}
                      alt={brand.name}
                      style={{ maxHeight: '70px', maxWidth: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getPlaceholderImage('brand');
                      }}
                    />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                      {brand.name}
                    </h2>
                    {brand.origin && (
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-orange)' }}>
                        Country of Origin: {brand.origin}
                      </span>
                    )}
                  </div>
                </div>

                <RichText content={brand.fullDesc || brand.shortDesc} />
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div style={{ background: 'var(--color-bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-orange-subtle)', paddingBottom: '0.75rem' }}>
                  Brand Information
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', fontWeight: 700 }}>Partnership Model</span>
                    <p style={{ fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.2rem' }}>{brand.relationship || 'Strategic Portfolio Brand'}</p>
                  </div>

                  {brand.origin && (
                    <div>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', fontWeight: 700 }}>Origin</span>
                      <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginTop: '0.2rem' }}>{brand.origin}</p>
                    </div>
                  )}

                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', fontWeight: 700 }}>Stewardship</span>
                    <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginTop: '0.2rem' }}>Adhikari Group Network</p>
                  </div>
                </div>

                {brand.website && brand.website !== '#' ? (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', textAlign: 'center', marginBottom: '1rem' }}
                  >
                    Visit Brand Website
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ) : null}

                <Link href="/brands" className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
                  &larr; Back to All Brands
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
  const brands = await getBrands();
  const paths = brands.map(b => ({
    params: { slug: b.slug || String(b.id) }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const [brand, settings] = await Promise.all([
    getBrandBySlug(params.slug),
    getSiteSettings()
  ]);

  if (!brand) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      brand,
      settings
    },
    revalidate: 60
  };
}
