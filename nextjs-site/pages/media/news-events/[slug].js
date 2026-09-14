import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getNewsPosts, getNewsPostBySlug, getSiteSettings } from '@/lib/strapi';
import { getStrapiMediaUrl, getPlaceholderImage } from '@/lib/media';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RichText from '@/components/ui/RichText';

export default function NewsPostDetailPage({ post }) {
  if (!post) return null;

  const imageUrl = getStrapiMediaUrl(post.coverImage) || getPlaceholderImage('news');
  const dateFormatted = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <>
      <Head>
        <title>{`${post.title} | Adhikari Group`}</title>
        <meta name="description" content={post.summary || post.title} />
        <meta property="og:title" content={`${post.title} | Adhikari Group`} />
        <meta property="og:description" content={post.summary} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Media', href: '/media/news-events' },
              { label: 'News & Events', href: '/media/news-events' },
              { label: post.title }
            ]}
          />
          <h1 className="page-hero-title">{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '1rem' }}>
            {post.category && (
              <span style={{ background: 'var(--color-orange)', color: '#fff', padding: '0.3rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                {post.category}
              </span>
            )}
            {dateFormatted && <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem' }}>{dateFormatted}</span>}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ background: 'var(--color-bg-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            {imageUrl && (
              <div style={{ height: '420px', width: '100%', overflow: 'hidden', background: 'var(--color-surface-subtle)' }}>
                <img
                  src={imageUrl}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getPlaceholderImage('news');
                  }}
                />
              </div>
            )}

            <div style={{ padding: '3rem' }}>
              {post.summary && (
                <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '2rem', lineHeight: 1.6, borderLeft: '4px solid var(--color-orange)', paddingLeft: '1.25rem' }}>
                  {post.summary}
                </p>
              )}

              <RichText content={post.content} />

              <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <Link href="/media/news-events" className="btn btn-outline">
                  &larr; Back to News & Events
                </Link>

                <Link href="/contact" className="btn btn-primary btn-sm">
                  Media Inquiries & Press
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getNewsPosts();
  const paths = posts.map(p => ({
    params: { slug: p.slug || String(p.id) }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const [post, settings] = await Promise.all([
    getNewsPostBySlug(params.slug),
    getSiteSettings()
  ]);

  if (!post) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      post,
      settings
    },
    revalidate: 60
  };
}
