import React from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl, getPlaceholderImage } from '@/lib/media';

export default function NewsCard({ post }) {
  const imageUrl = getStrapiMediaUrl(post.coverImage) || getPlaceholderImage('news');
  const dateFormatted = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <div className="card">
      <div className="news-card-img-wrapper">
        <img
          src={imageUrl}
          alt={post.title}
          className="news-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getPlaceholderImage('news');
          }}
        />
      </div>

      <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="news-card-meta">
          {post.category && <span className="news-card-badge">{post.category}</span>}
          {dateFormatted && <span>{dateFormatted}</span>}
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.65rem', lineHeight: 1.35 }}>
          {post.title}
        </h3>

        <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
          {post.summary}
        </p>

        <div style={{ marginTop: 'auto' }}>
          <Link href={`/media/news-events/${post.slug}`} className="btn btn-outline btn-sm">
            Read Full Story
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
