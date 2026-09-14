import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MobileMenu({ isOpen, onClose, settings }) {
  const router = useRouter();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleLinkClick = () => {
    onClose();
    setOpenSection(null);
  };

  const navTree = [
    { label: 'Home', href: '/' },
    {
      label: 'About',
      id: 'about',
      children: [
        { label: 'Who We Are', href: '/about/who-we-are' },
        { label: 'Our Story', href: '/about/our-story' }
      ]
    },
    { label: 'Companies', href: '/companies' },
    { label: 'Brands', href: '/brands' },
    {
      label: 'Media',
      id: 'media',
      children: [
        { label: 'News & Events', href: '/media/news-events' },
        { label: 'Gallery', href: '/media/gallery' }
      ]
    },
    {
      label: 'Career',
      id: 'career',
      children: [
        { label: 'Vacancies', href: '/career/vacancies' },
        { label: 'Policies', href: '/career/policies' }
      ]
    },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <Link href="/" className="brand-logo" onClick={handleLinkClick}>
            <img src="/images/logo.png" alt="Adhikari Group" style={{ height: '40px', width: 'auto' }} />
          </Link>
          <button type="button" onClick={onClose} aria-label="Close menu" style={{ color: 'var(--color-primary)', padding: '0.5rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mobile-menu-body">
          {navTree.map((item) => {
            if (item.children) {
              const isChildActive = item.children.some(c => router.asPath === c.href || router.pathname === c.href);
              const isSectionOpen = openSection === item.id || isChildActive;

              return (
                <div key={item.id} className="mobile-nav-group">
                  <button
                    type="button"
                    className={`mobile-nav-link ${isChildActive ? 'active' : ''}`}
                    onClick={() => toggleSection(item.id)}
                    style={{ width: '100%' }}
                  >
                    <span>{item.label}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: isSectionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isSectionOpen && (
                    <div className="mobile-dropdown-content">
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={handleLinkClick}
                          className={`mobile-dropdown-item ${router.asPath === child.href ? 'active' : ''}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = router.asPath === item.href || (item.href !== '/' && router.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}

          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
            <Link href="/contact" onClick={handleLinkClick} className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
