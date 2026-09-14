import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAboutContent, getSiteSettings } from '@/lib/strapi';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SectionHeader from '@/components/ui/SectionHeader';
import RichText from '@/components/ui/RichText';

export default function OurStoryPage({ about, settings }) {
  const values = [
    {
      title: 'Integrity & Trust',
      desc: 'Open, honest and transparent relationships with all our partners, authorized dealerships, and customers across Nepal.'
    },
    {
      title: 'Quality Standards',
      desc: 'Delivering dermatologically certified, safe, and world-class maternal and baby products for every family.'
    },
    {
      title: 'Continuous Growth',
      desc: 'Pioneering nationwide distribution reach, modern digital B2B systems, and convenient retail store networks.'
    },
    {
      title: 'Customer Commitment',
      desc: 'Providing dependable service, responsive product support, and caring advice across all our brand touchpoints.'
    }
  ];

  return (
    <>
      <Head>
        <title>Our Story & Vision | About | Adhikari Group</title>
        <meta name="description" content="Discover the origins, vision, mission and values of Adhikari Group - building Nepal's premier diversified business enterprise." />
        <meta property="og:title" content="Our Story & Vision | About | Adhikari Group" />
        <meta property="og:description" content="Discover the origins, vision, mission and values of Adhikari Group - building Nepal's premier diversified business enterprise." />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'About', href: '/about/who-we-are' }, { label: 'Our Story' }]} />
          <h1 className="page-hero-title">{about?.ourStoryTitle || 'Our Story & Vision'}</h1>
          <p className="page-hero-desc">
            The foundation, core purpose, and foundational values that guide Adhikari Group&apos;s continued growth across Nepal and beyond.
          </p>
        </div>
      </section>

      {/* Story Content Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '920px' }}>
          <div style={{ background: 'var(--color-bg-white)', padding: '3.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', marginBottom: '4rem' }}>
            <RichText content={about?.ourStoryContent} />
          </div>

          {/* Vision & Mission Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #225071 0%, #193C55 100%)', color: '#FFFFFF', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ color: 'var(--color-orange)', marginBottom: '1rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 4.24 4.24" />
                  <path d="m14.83 9.17 4.24-4.24" />
                  <path d="m14.83 14.83 4.24 4.24" />
                  <path d="m9.17 14.83-4.24 4.24" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#FFFFFF' }}>
                Our Vision
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7, fontSize: '1rem' }}>
                To be Nepal’s premier diversified business enterprise, recognized for commercial integrity, brand stewardship, and operational excellence across every sector we serve.
              </p>
            </div>

            <div style={{ background: 'var(--color-primary-tint)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-primary)' }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-heading)' }}>
                Our Mission
              </h3>
              <p style={{ color: 'var(--color-text-main)', lineHeight: 1.7, fontSize: '1rem' }}>
                To foster sustainable business growth by introducing world-class products, developing trusted dealer networks, and operating customer-focused retail and B2B digital platforms.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <SectionHeader
            badge="Our Foundation"
            title="Core Corporate Values"
            subtitle="The fundamental pillars defining how we build partnerships, treat our people, and serve Nepali families."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--color-bg-white)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', background: 'var(--color-orange-subtle)', color: 'var(--color-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
                  {idx + 1}
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.5rem' }}>
                  {v.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/companies" className="btn btn-primary btn-lg">
              Explore Our Operating Companies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [about, settings] = await Promise.all([
    getAboutContent(),
    getSiteSettings()
  ]);

  return {
    props: {
      about,
      settings
    },
    revalidate: 60
  };
}
