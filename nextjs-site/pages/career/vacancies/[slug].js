import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getVacancies, getVacancyBySlug, getSiteSettings } from '@/lib/strapi';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RichText from '@/components/ui/RichText';

export default function VacancyDetailPage({ vacancy }) {
  if (!vacancy) return null;

  return (
    <>
      <Head>
        <title>{`${vacancy.title} | Careers | Adhikari Group`}</title>
        <meta name="description" content={vacancy.shortDesc || `Apply for ${vacancy.title} at Adhikari Group Nepal.`} />
        <meta property="og:title" content={`${vacancy.title} | Careers | Adhikari Group`} />
        <meta property="og:description" content={vacancy.shortDesc} />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Career', href: '/career/vacancies' },
              { label: 'Vacancies', href: '/career/vacancies' },
              { label: vacancy.title }
            ]}
          />
          <h1 className="page-hero-title">{vacancy.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            {vacancy.department && <span className="vacancy-tag">{vacancy.department}</span>}
            {vacancy.location && <span className="vacancy-tag">{vacancy.location}</span>}
            {vacancy.employmentType && <span className="vacancy-tag">{vacancy.employmentType}</span>}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)', gap: '3.5rem', alignItems: 'start' }}>
            {/* Main Job Details */}
            <div style={{ background: 'var(--color-bg-white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1rem' }}>
                Role Overview
              </h2>
              <RichText content={vacancy.description || vacancy.shortDesc} />

              {vacancy.responsibilities && (
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1rem' }}>
                    Key Responsibilities
                  </h3>
                  <RichText content={vacancy.responsibilities} />
                </div>
              )}

              {vacancy.requirements && (
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1rem' }}>
                    Candidate Requirements & Qualifications
                  </h3>
                  <RichText content={vacancy.requirements} />
                </div>
              )}
            </div>

            {/* Sidebar with Application details */}
            <aside>
              <div style={{ background: 'var(--color-bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-orange-subtle)', paddingBottom: '0.5rem' }}>
                  Position Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', fontWeight: 700 }}>Department</span>
                    <p style={{ fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.15rem' }}>{vacancy.department || 'General Management'}</p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', fontWeight: 700 }}>Location</span>
                    <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginTop: '0.15rem' }}>{vacancy.location || 'Kathmandu, Nepal'}</p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', fontWeight: 700 }}>Employment Type</span>
                    <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginTop: '0.15rem' }}>{vacancy.employmentType || 'Full-Time'}</p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', fontWeight: 700 }}>Application Deadline</span>
                    <p style={{ fontWeight: 700, color: 'var(--color-orange)', marginTop: '0.15rem' }}>{vacancy.deadline || 'Open until filled'}</p>
                  </div>
                </div>

                <a
                  href={vacancy.applyLink || `mailto:careers@adhikarigroup.com?subject=Application for ${encodeURIComponent(vacancy.title)}`}
                  className="btn btn-primary"
                  style={{ width: '100%', textAlign: 'center', marginBottom: '1rem' }}
                >
                  Apply for this Position
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>

                <Link href="/career/vacancies" className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
                  &larr; All Vacancies
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
  const vacancies = await getVacancies();
  const paths = vacancies.map(v => ({
    params: { slug: v.slug || String(v.id) }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const [vacancy, settings] = await Promise.all([
    getVacancyBySlug(params.slug),
    getSiteSettings()
  ]);

  if (!vacancy) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      vacancy,
      settings
    },
    revalidate: 60
  };
}
