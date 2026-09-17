import React from 'react';
import Head from 'next/head';

export default function Seo({
  title,
  description,
  image = '/images/about-corporate.jpg',
  type = 'website',
  url
}) {
  const siteTitle = title
    ? (title.includes('Adhikari Group') ? title : `${title} | Adhikari Group`)
    : 'Adhikari Group | Diversified Business Group in Nepal';
  const defaultDesc = 'Adhikari Group is a leading Nepal-based business group operating across import, nationwide distribution, retail chains, B2B commerce, baby care, and consumer brands.';
  const metaDesc = description || defaultDesc;
  const metaImage = image || '/images/about-corporate.jpg';

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={metaDesc} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Adhikari Group Nepal" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      {url && <meta property="og:url" content={url} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />
    </Head>
  );
}
