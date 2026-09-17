import React, { useState } from 'react';
import Head from 'next/head';
import { getCompanies, getSiteSettings } from '@/lib/strapi';
import SectionHeader from '@/components/ui/SectionHeader';
import CompanyCard from '@/components/cards/CompanyCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';

export default function CompaniesPage({ companies, settings }) {
  const [filter, setFilter] = useState('all');
  const safeCompanies = companies || [];

  const categories = ['all', ...new Set(safeCompanies.map(c => c.category).filter(Boolean))];

  const filteredCompanies = filter === 'all'
    ? safeCompanies
    : safeCompanies.filter(c => c.category === filter);

  return (
    <>
      <Head>
        <title>Our Companies | Adhikari Group</title>
        <meta name="description" content="Explore the diverse operating subsidiaries under Adhikari Group across distribution, retail, B2B commerce, and brand acceleration in Nepal." />
        <meta property="og:title" content="Our Companies | Adhikari Group" />
        <meta property="og:description" content="Explore the diverse operating subsidiaries under Adhikari Group across distribution, retail, B2B commerce, and brand acceleration in Nepal." />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Companies' }]} />
          <h1 className="page-hero-title">Our Operating Companies</h1>
          <p className="page-hero-desc">
            A cohesive ecosystem of specialized subsidiaries operating across import, nationwide distribution, retail chains, and digital B2B commerce.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {safeCompanies.length === 0 ? (
            <EmptyState
              title="Companies Coming Soon"
              message="We are currently updating our corporate directory. Please check back shortly."
            />
          ) : (
            <>
              {categories.length > 2 && (
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setFilter(cat)}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {cat === 'all' ? 'All Businesses' : cat}
                    </button>
                  ))}
                </div>
              )}

              <div className="card-grid">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.slug || company.id} company={company} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [companies, settings] = await Promise.all([
    getCompanies(),
    getSiteSettings()
  ]);

  return {
    props: {
      companies,
      settings
    },
    revalidate: 60
  };
}
