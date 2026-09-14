import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getPolicies, getPolicyBySlug, getSiteSettings } from '@/lib/strapi';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RichText from '@/components/ui/RichText';

export default function PolicyDetailPage({ policy }) {
  if (!policy) return null;

  return (
    <>
      <Head>
        <title>{`${policy.title} | Adhikari Group`}</title>
        <meta name="description" content={`Official corporate policy on ${policy.title} for Adhikari Group Nepal.`} />
        <meta property="og:title" content={`${policy.title} | Adhikari Group`} />
        <meta property="og:description" content={`Official corporate policy on ${policy.title} for Adhikari Group Nepal.`} />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Career', href: '/career/vacancies' },
              { label: 'Policies', href: '/career/policies' },
              { label: policy.title }
            ]}
          />
          <h1 className="page-hero-title">{policy.title}</h1>
          <p className="page-hero-desc">Official Adhikari Group Policy Document</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ background: 'var(--color-bg-white)', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <RichText content={policy.content} />

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <Link href="/career/policies" className="btn btn-outline">
                &larr; Back to Policies
              </Link>

              <Link href="/contact" className="btn btn-outline-orange btn-sm">
                Compliance Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const policies = await getPolicies();
  const paths = policies.map(p => ({
    params: { slug: p.slug || String(p.id) }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const [policy, settings] = await Promise.all([
    getPolicyBySlug(params.slug),
    getSiteSettings()
  ]);

  if (!policy) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      policy,
      settings
    },
    revalidate: 60
  };
}
