import React, { useState } from 'react';
import Head from 'next/head';
import { getNewsPosts, getSiteSettings } from '@/lib/strapi';
import NewsCard from '@/components/cards/NewsCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';

export default function NewsEventsPage({ posts, settings }) {
  const [filter, setFilter] = useState('all');
  const safePosts = posts || [];

  const categories = ['all', ...new Set(safePosts.map(p => p.category).filter(Boolean))];

  const filteredPosts = filter === 'all'
    ? safePosts
    : safePosts.filter(p => p.category === filter);

  return (
    <>
      <Head>
        <title>News & Events | Adhikari Group</title>
        <meta name="description" content="Stay updated with the latest press releases, corporate announcements, retail expansion news, and events from Adhikari Group." />
        <meta property="og:title" content="News & Events | Adhikari Group" />
        <meta property="og:description" content="Stay updated with the latest press releases, corporate announcements, retail expansion news, and events from Adhikari Group." />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Media' }, { label: 'News & Events' }]} />
          <h1 className="page-hero-title">News & Corporate Events</h1>
          <p className="page-hero-desc">
            Official announcements, brand milestones, retail store openings, and press updates across Adhikari Group enterprises.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {safePosts.length === 0 ? (
            <EmptyState
              title="News and Events Coming Soon"
              message="We have no announcements to display right now. Please check back shortly for updates."
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
                      {cat === 'all' ? 'All Stories' : cat}
                    </button>
                  ))}
                </div>
              )}

              <div className="card-grid">
                {filteredPosts.map((post) => (
                  <NewsCard key={post.slug || post.id} post={post} />
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
  const [posts, settings] = await Promise.all([
    getNewsPosts(),
    getSiteSettings()
  ]);

  return {
    props: {
      posts,
      settings
    },
    revalidate: 60
  };
}
