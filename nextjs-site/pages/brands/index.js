import React from 'react';
import Head from 'next/head';
import { getBrands, getSiteSettings } from '@/lib/strapi';
import BrandCard from '@/components/cards/BrandCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';

export default function BrandsPage({ brands, settings }) {
  return (
    <>
      <Head>
        <title>Our Brands | Adhikari Group</title>
        <meta name="description" content="Discover our portfolio of trusted mother and baby care brands, from owned labels to authorized global partnerships in Nepal." />
        <meta property="og:title" content="Our Brands | Adhikari Group" />
        <meta property="og:description" content="Discover our portfolio of trusted mother and baby care brands, from owned labels to authorized global partnerships in Nepal." />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Brands' }]} />
          <h1 className="page-hero-title">Our Brand Portfolio</h1>
          <p className="page-hero-desc">
            Curated baby care, certified organic hygiene, traditional Malmal apparel, and travel mobility solutions trusted by Nepali families.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {brands.length === 0 ? (
            <EmptyState
              title="Brands Coming Soon"
              message="Our brand directory is currently being updated. Please check back shortly."
            />
          ) : (
            <div className="card-grid">
              {brands.map((brand) => (
                <BrandCard key={brand.slug || brand.id} brand={brand} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const [brands, settings] = await Promise.all([
    getBrands(),
    getSiteSettings()
  ]);

  return {
    props: {
      brands,
      settings
    },
    revalidate: 60
  };
}
