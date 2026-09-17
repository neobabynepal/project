import React, { useState } from 'react';
import Head from 'next/head';
import { getGallery, getSiteSettings } from '@/lib/strapi';
import { getStrapiMediaUrl, getPlaceholderImage } from '@/lib/media';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';

export default function GalleryPage({ gallery, settings }) {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <>
      <Head>
        <title>Photo Gallery | Adhikari Group</title>
        <meta name="description" content="View corporate photo gallery, retail stores, logistics operations, and executive leadership moments from Adhikari Group." />
        <meta property="og:title" content="Photo Gallery | Adhikari Group" />
        <meta property="og:description" content="View corporate photo gallery, retail stores, logistics operations, and executive leadership moments from Adhikari Group." />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Media' }, { label: 'Gallery' }]} />
          <h1 className="page-hero-title">Corporate Photo Gallery</h1>
          <p className="page-hero-desc">
            A visual overview of our retail branches, distribution operations, manufacturing partnerships, and leadership team in action.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {gallery.length === 0 ? (
            <EmptyState
              title="Gallery Coming Soon"
              message="Our gallery images are currently being curated. Please check back shortly."
            />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: '1.75rem'
            }}>
              {gallery.map((item) => {
                const imgUrl = getStrapiMediaUrl(item.url || item) || getPlaceholderImage('corporate');
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveImage({ ...item, url: imgUrl })}
                    style={{
                      position: 'relative',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      height: '260px',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-subtle)',
                      transition: 'all var(--transition-normal)'
                    }}
                    className="gallery-item-card"
                  >
                    <img
                      src={imgUrl}
                      alt={item.caption || 'Adhikari Group Gallery'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform var(--transition-slow)'
                      }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getPlaceholderImage('corporate');
                      }}
                    />

                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
                      opacity: 0,
                      transition: 'opacity var(--transition-normal)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '1.25rem',
                      color: '#FFFFFF'
                    }}
                    className="gallery-overlay"
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-orange)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                          View Full Image
                        </div>
                        <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.4 }}>
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="modal-backdrop" onClick={() => setActiveImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setActiveImage(null)}
              aria-label="Close Preview"
            >
              &times;
            </button>
            <img
              src={activeImage.url}
              alt={activeImage.caption || 'Adhikari Group Gallery'}
              className="modal-img"
            />
            {activeImage.caption && (
              <p className="modal-caption">{activeImage.caption}</p>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-item-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .gallery-item-card:hover img {
          transform: scale(1.06);
        }
        .gallery-item-card:hover .gallery-overlay {
          opacity: 1;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const [gallery, settings] = await Promise.all([
    getGallery(),
    getSiteSettings()
  ]);

  return {
    props: {
      gallery,
      settings
    },
    revalidate: 60
  };
}
