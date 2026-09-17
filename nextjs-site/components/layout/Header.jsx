import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UtilityBar from './UtilityBar';
import NavDropdown from './NavDropdown';
import MobileMenu from './MobileMenu';

export default function Header({ settings }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const aboutDropdown = [
    { label: 'Who We Are', href: '/about/who-we-are' },
    { label: 'Our Story', href: '/about/our-story' }
  ];

  const mediaDropdown = [
    { label: 'News & Events', href: '/media/news-events' },
    { label: 'Gallery', href: '/media/gallery' }
  ];

  const careerDropdown = [
    { label: 'Vacancies', href: '/career/vacancies' },
    { label: 'Policies', href: '/career/policies' }
  ];

  return (
    <>
      <UtilityBar settings={settings} />
      <header className="main-header" id="main-header">
        <div className="container navbar">
          <Link href="/" className="brand-logo" aria-label="Adhikari Group Home">
            <img
              src="/images/logo.png"
              alt="Adhikari Group"
              style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          <nav aria-label="Primary Navigation">
            <ul className="nav-menu">
              <li>
                <Link
                  href="/"
                  className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>

              <NavDropdown
                label="About"
                basePath="/about"
                items={aboutDropdown}
              />

              <li>
                <Link
                  href="/companies"
                  className={`nav-link ${router.pathname.startsWith('/companies') ? 'active' : ''}`}
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/brands"
                  className={`nav-link ${router.pathname.startsWith('/brands') ? 'active' : ''}`}
                >
                  Brands
                </Link>
              </li>

              <NavDropdown
                label="Media"
                basePath="/media"
                items={mediaDropdown}
              />

              <NavDropdown
                label="Career"
                basePath="/career"
                items={careerDropdown}
              />

              <li>
                <Link
                  href="/contact"
                  className={`nav-link ${router.pathname === '/contact' ? 'active' : ''}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        settings={settings}
      />
    </>
  );
}
