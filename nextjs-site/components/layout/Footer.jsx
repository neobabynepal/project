import React from 'react';
import Link from 'next/link';

export default function Footer({ settings }) {
  const phone = settings?.phone;
  const email = settings?.email;
  const address = settings?.address;
  const officeHours = settings?.officeHours;
  const facebook = settings?.facebook;
  const instagram = settings?.instagram;
  const linkedin = settings?.linkedin;
  const tiktok = settings?.tiktok;

  const hasContactItems = Boolean(address || phone || email || officeHours);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand info */}
          <div className="footer-brand">
            <Link href="/" className="brand-logo" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              <img
                src="/images/logo.png"
                alt="Adhikari Group"
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>
            <p>
              Adhikari Group is a diversified business group operating across import, nationwide distribution, retail chains, baby care, hygiene products, and trusted consumer brands in Nepal.
            </p>
            <div className="utility-socials" style={{ marginTop: '1.25rem' }}>
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'var(--color-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--color-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--color-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              )}
              {tiktok && (
                <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: 'var(--color-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="footer-heading">Corporate</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about/who-we-are">Who We Are</Link></li>
              <li><Link href="/about/our-story">Our Story & Vision</Link></li>
              <li><Link href="/companies">Our Companies</Link></li>
              <li><Link href="/brands">Our Brands</Link></li>
            </ul>
          </div>

          {/* Col 3: Media & Careers */}
          <div>
            <h4 className="footer-heading">Media & Careers</h4>
            <ul className="footer-links">
              <li><Link href="/media/news-events">News & Events</Link></li>
              <li><Link href="/media/gallery">Photo Gallery</Link></li>
              <li><Link href="/career/vacancies">Career Opportunities</Link></li>
              <li><Link href="/career/policies">Corporate Policies</Link></li>
              <li><Link href="/contact">Contact & Inquiry</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          {hasContactItems && (
            <div>
              <h4 className="footer-heading">Contact HQ</h4>
              {address && (
                <div className="footer-contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{address}</span>
                </div>
              )}
              {phone && (
                <div className="footer-contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{phone}</span>
                </div>
              )}
              {email && (
                <div className="footer-contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>{email}</span>
                </div>
              )}
              {officeHours && (
                <div className="footer-contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{officeHours}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Adhikari Group. All Rights Reserved.
          </div>
          <div>
            Diversified Business Group &bull; Kathmandu, Nepal
          </div>
        </div>
      </div>
    </footer>
  );
}
