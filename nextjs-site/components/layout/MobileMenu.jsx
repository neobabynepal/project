import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MobileMenu({ isOpen, onClose, settings }) {
  const router = useRouter();
  const [openSection, setOpenSection] = useState(null);
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleLinkClick = () => {
    onClose();
    setOpenSection(null);
  };

  // Body scroll lock, focus trap, & Escape key listener
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
      return;
    }

    // Save active element before menu opened
    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
    <div
      className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        id="mobile-navigation-drawer"
        ref={drawerRef}
        className="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-menu-header">
          <Link href="/" className="brand-logo" onClick={handleLinkClick}>
            <img src="/images/logo.png" alt="Adhikari Group" style={{ height: '40px', width: 'auto' }} />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            style={{ color: 'var(--color-primary)', padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-menu-body" aria-label="Mobile Primary Navigation">
          {navTree.map((item) => {
            if (item.children) {
              const isChildActive = item.children.some(c => router.asPath === c.href || router.pathname === c.href);
              const isSectionOpen = openSection === item.id || isChildActive;
              const subMenuId = `mobile-sub-menu-${item.id}`;

              return (
                <div key={item.id} className="mobile-nav-group">
                  <button
                    type="button"
                    className={`mobile-nav-link ${isChildActive ? 'active' : ''}`}
                    onClick={() => toggleSection(item.id)}
                    aria-expanded={isSectionOpen}
                    aria-controls={subMenuId}
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
                      aria-hidden="true"
                      style={{
                        transform: isSectionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isSectionOpen && (
                    <div id={subMenuId} className="mobile-dropdown-content" role="region" aria-label={`${item.label} sub-links`}>
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
        </nav>
      </div>
    </div>
  );
}
