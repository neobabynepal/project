import React from 'react';
import Head from 'next/head';
import { getPolicies, getSiteSettings } from '@/lib/strapi';
import PolicyCard from '@/components/cards/PolicyCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';

export default function PoliciesPage({ policies, settings }) {
  const safePolicies = policies || [];

  return (
    <>
      <Head>
        <title>Corporate Policies | Adhikari Group</title>
        <meta name="description" content="Read Adhikari Group's corporate governance, infant product safety standards, compliance, and equal opportunity workplace policies." />
        <meta property="og:title" content="Corporate Policies | Adhikari Group" />
        <meta property="og:description" content="Read Adhikari Group's corporate governance, infant product safety standards, compliance, and equal opportunity workplace policies." />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Career' }, { label: 'Policies' }]} />
          <h1 className="page-hero-title">Corporate Policies & Governance</h1>
          <p className="page-hero-desc">
            Our established operational principles, ethical conduct codes, and safety standards upholding transparency across all subsidiaries.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {safePolicies.length === 0 ? (
            <EmptyState
              title="Policies Coming Soon"
              message="Our corporate policy documents are currently being compiled. Please check back shortly."
            />
          ) : (
            <div className="card-grid">
              {policies.map((policy) => (
                <PolicyCard key={policy.slug || policy.id} policy={policy} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [policies, settings] = await Promise.all([
    getPolicies(),
    getSiteSettings()
  ]);

  return {
    props: {
      policies,
      settings
    },
    revalidate: 60
  };
}
