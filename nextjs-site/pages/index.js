import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  getHomepageContent,
  getAboutContent,
  getBrands,
  getSiteSettings
} from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/media';
import SectionHeader from '@/components/ui/SectionHeader';
import BrandCard from '@/components/cards/BrandCard';
import RichText from '@/components/ui/RichText';
import Seo from '@/components/ui/Seo';

export default function HomePage({
  homepage,
  about,
  brands,
  settings
}) {
  const videoRef = useRef(null);

  const heroImage = getStrapiMediaUrl(homepage?.heroImage) || '/images/about-corporate.jpg';
  const heroVideo = getStrapiMediaUrl(homepage?.heroVideo) || '/images/mumbuds-production.mp4';
  const featuredBrands = (brands || []).slice(0, 4);
  const stats = homepage?.stats || [
    { number: "06", label: "Operating Companies" },
    { number: "05", label: "Retail Locations" },
    { number: "04+", label: "International Partners" },
    { number: "05+", label: "Key Brands" },
    { number: "50+", label: "Dealer Network" }
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay deferred or video playback handled:', err);
        });
      }
    }
  }, [heroVideo]);

  return (
    <>
      <Seo
        title="Adhikari Group | Diversified Business Group in Nepal"
        description="Adhikari Group is a diversified Nepal-based business group operating across import, distribution, retail, B2B commerce, baby care, hygiene products and consumer brands."
        image={heroImage}
      />

      {/* 1. HERO SECTION WITH RESPONSIVE BACKGROUND VIDEO */}
      <section
        className="hero-video-section"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Background video on desktop */}
        {heroVideo && (
          <video
            ref={videoRef}
            className="hero-video-bg"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={heroImage}
            aria-hidden="true"
            onError={(e) => {
              console.warn('Video failed to load, keeping static poster background:', e);
              e.target.style.display = 'none';
            }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}

        {/* Video & Gradient Overlay for Contrast */}
        <div className="hero-video-overlay" />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="hero-content">
            <div className="hero-badge">
              Adhikari Group Nepal
            </div>

            <h1 className="hero-title">
              {homepage?.heroTitle || "Growing from Nepal, Building Beyond Borders"}
            </h1>

            <p className="hero-subtitle">
              {homepage?.heroSubtitle || "From our own brand MUMBUDS USA to Nepal's fastest-growing baby retail network NEOBUDS, we're building the nation's most trusted baby care ecosystem."}
            </p>

            <div className="hero-actions">
              <Link href="/companies" className="btn btn-primary btn-lg">
                Explore Our Companies
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
              <Link
                href="/about/who-we-are"
                className="btn btn-outline"
                style={{
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(25, 60, 85, 0.4)'
                }}
              >
                About the Group
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE TEASER */}
      <section className="section">
        <div className="container">
          <div className="teaser-grid">
            <div>
              <div className="section-badge">
                {homepage?.aboutBadge || "Corporate Profile"}
              </div>
              <h2 className="section-title">
                {homepage?.aboutTitle || "Building Nepal's Leading Baby Care & Consumer Ecosystem"}
              </h2>
              
              {homepage?.aboutContent ? (
                <RichText content={homepage.aboutContent} />
              ) : (
                <>
                  <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    Adhikari Group is a diversified business group based in Nepal, operating across 6 specialized subsidiaries dedicated to maternal and infant wellness, certified diaper distribution, Malmal cotton apparel manufacturing, and modern retail chains.
                  </p>
                  <p style={{ fontSize: '0.98rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                    With international partnerships spanning Denmark and the USA alongside local manufacturing and provincial wholesale hubs, we connect certified quality to thousands of Nepali homes daily.
                  </p>
                </>
              )}

              <div style={{ marginTop: '2rem' }}>
                <Link href="/about/who-we-are" className="btn btn-primary">
                  Learn More About Us
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </div>

            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-border)',
              maxHeight: '380px'
            }}>
              <img
                src="/images/companies/neobuds.jpeg"
                alt="NeoBuds Retail Operations"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR BRANDS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            badge={homepage?.brandsBadge || "Brand Stewardship"}
            title={homepage?.brandsSectionTitle || "Trusted Consumer Brands"}
            subtitle={homepage?.brandsSectionSubtitle || "From internationally recognized diaper labels to in-house developed mother & baby apparel."}
          />

          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {featuredBrands.map((brand) => (
              <BrandCard key={brand.slug || brand.id} brand={brand} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/brands" className="btn btn-outline btn-lg">
              View Complete Brand Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GROUP AT A GLANCE (STATISTICS) */}
      <section className="section">
        <div className="container">
          <SectionHeader
            badge="Scale & Impact"
            title="Group at a Glance"
            subtitle="Continuous expansion in operations, retail footprint, and nationwide channel presence."
          />

          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SIMPLE FINAL CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #225071 0%, #193C55 100%)',
        color: '#FFFFFF',
        padding: '5rem 0',
        position: 'relative'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <div className="section-badge" style={{ background: 'rgba(238, 118, 38, 0.2)', borderColor: 'rgba(238, 118, 38, 0.5)' }}>
            {homepage?.careersBadge || "Join Our Journey"}
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            {homepage?.careersTitle || "Partner With Us or Build Your Career"}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            {homepage?.careersDescription || "Whether you are looking to become an authorized provincial dealer, supply products, or join our growing workforce across Nepal, we welcome collaboration."}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              {homepage?.contactCTATitle || "Contact & Business Inquiry"}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
            <Link href="/career/vacancies" className="btn btn-outline" style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
              View Career Openings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [
    homepage,
    about,
    brands,
    settings
  ] = await Promise.all([
    getHomepageContent(),
    getAboutContent(),
    getBrands(),
    getSiteSettings()
  ]);

  return {
    props: {
      homepage,
      about,
      brands,
      settings
    },
    revalidate: 60
  };
}
