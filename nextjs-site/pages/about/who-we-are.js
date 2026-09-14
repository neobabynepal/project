import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAboutContent, getLeaders, getChairmanMessage, getSiteSettings } from '@/lib/strapi';
import { getStrapiMediaUrl, getPlaceholderImage } from '@/lib/media';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SectionHeader from '@/components/ui/SectionHeader';
import RichText from '@/components/ui/RichText';

export default function WhoWeArePage({ about, leaders, chairman, settings }) {
  const chairmanPhoto = getStrapiMediaUrl(chairman?.photo) || getPlaceholderImage('leader');

  return (
    <>
      <Head>
        <title>Who We Are | About | Adhikari Group</title>
        <meta name="description" content="Learn about Adhikari Group - a diversified corporate enterprise leading mother & baby care, nationwide distribution, retail, and B2B commerce in Nepal." />
        <meta property="og:title" content="Who We Are | About | Adhikari Group" />
        <meta property="og:description" content="Learn about Adhikari Group - a diversified corporate enterprise leading mother & baby care, nationwide distribution, retail, and B2B commerce in Nepal." />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'About', href: '/about/who-we-are' }, { label: 'Who We Are' }]} />
          <h1 className="page-hero-title">{about?.whoWeAreTitle || 'Who We Are'}</h1>
          <p className="page-hero-desc">
            A diversified Nepalese business group driving excellence in retail chains, import distribution, and trusted consumer brands.
          </p>
        </div>
      </section>

      {/* Main Who We Are Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div className="section-badge">Corporate Profile</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1.5rem', lineHeight: 1.25 }}>
                Nepal&apos;s Trusted Corporate Ecosystem
              </h2>
              <RichText content={about?.whoWeAreContent} />

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <Link href="/about/our-story" className="btn btn-primary">
                  Our Story & Vision
                </Link>
                <Link href="/companies" className="btn btn-outline">
                  Explore Companies
                </Link>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)' }}>
                <img
                  src="/images/about-corporate.jpg"
                  alt="Adhikari Group Corporate Headquarters"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman Message Feature */}
      {chairman && (
        <section className="section section-primary-tint">
          <div className="container">
            <div style={{ background: 'var(--color-bg-white)', borderRadius: 'var(--radius-lg)', padding: '3.5rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '260px minmax(0, 1fr)', gap: '3rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '200px', height: '200px', borderRadius: 'var(--radius-full)', overflow: 'hidden', margin: '0 auto 1.25rem auto', border: '4px solid var(--color-primary-tint)', boxShadow: 'var(--shadow-sm)' }}>
                    <img
                      src={chairmanPhoto}
                      alt={chairman.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getPlaceholderImage('leader');
                      }}
                    />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                    {chairman.name}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-orange)', fontWeight: 600 }}>
                    {chairman.designation}
                  </p>
                </div>

                <div>
                  <div className="section-badge">Leadership Perspective</div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1.25rem' }}>
                    Chairman&apos;s Message
                  </h2>
                  <RichText content={chairman.fullMessage || chairman.shortMessage} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Executive Leadership Grid */}
      {leaders && leaders.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeader
              badge="Our Leaders"
              title="Executive Leadership Team"
              subtitle="Guiding Adhikari Group's strategic growth, corporate governance, and nationwide market presence."
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', justifyContent: 'center' }}>
              {leaders.map((leader) => {
                const photoUrl = getStrapiMediaUrl(leader.photo) || getPlaceholderImage('leader');
                return (
                  <div
                    key={leader.id}
                    style={{
                      background: 'var(--color-bg-white)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      padding: '2.5rem 2rem',
                      textAlign: 'center',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ width: '140px', height: '140px', borderRadius: 'var(--radius-full)', overflow: 'hidden', margin: '0 auto 1.5rem auto', border: '3px solid var(--color-orange-subtle)' }}>
                      <img
                        src={photoUrl}
                        alt={leader.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.35rem' }}>
                      {leader.name}
                    </h3>
                    <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-orange)', marginBottom: '1rem' }}>
                      {leader.position}
                    </p>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                      {leader.shortBio || leader.biography}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export async function getStaticProps() {
  const [about, leaders, chairman, settings] = await Promise.all([
    getAboutContent(),
    getLeaders(),
    getChairmanMessage(),
    getSiteSettings()
  ]);

  return {
    props: {
      about,
      leaders,
      chairman,
      settings
    },
    revalidate: 60
  };
}
