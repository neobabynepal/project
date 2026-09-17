import React from 'react';
import Head from 'next/head';
import { getVacancies, getSiteSettings } from '@/lib/strapi';
import VacancyCard from '@/components/cards/VacancyCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';

export default function VacanciesPage({ vacancies, settings }) {
  const safeVacancies = vacancies || [];
  const activeVacancies = safeVacancies.filter(v => v.isActive !== false);

  return (
    <>
      <Head>
        <title>Career Opportunities | Adhikari Group</title>
        <meta name="description" content="Explore exciting career opportunities at Adhikari Group. Join our rapidly growing operations across retail, distribution, finance, and corporate management in Nepal." />
        <meta property="og:title" content="Career Opportunities | Adhikari Group" />
        <meta property="og:description" content="Explore exciting career opportunities at Adhikari Group. Join our rapidly growing operations across retail, distribution, finance, and corporate management in Nepal." />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Career' }, { label: 'Vacancies' }]} />
          <h1 className="page-hero-title">Career Opportunities</h1>
          <p className="page-hero-desc">
            Build your career with one of Nepal&apos;s leading diversified business groups. Discover roles where your skills drive tangible impact.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          {activeVacancies.length === 0 ? (
            <EmptyState
              title="No Current Vacancies"
              message="No current vacancies. Please check back soon or send your spontaneous CV to careers@adhikarigroup.com."
              actionText="Contact HR"
              actionHref="/contact"
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {activeVacancies.map((vacancy) => (
                <VacancyCard key={vacancy.slug || vacancy.id} vacancy={vacancy} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [vacancies, settings] = await Promise.all([
    getVacancies(),
    getSiteSettings()
  ]);

  return {
    props: {
      vacancies,
      settings
    },
    revalidate: 60
  };
}
