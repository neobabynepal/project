import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavDropdown({ label, items, basePath }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const isCurrentActive = items.some(item => router.asPath === item.href || router.pathname === item.href) ||
    (basePath && router.pathname.startsWith(basePath));

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <li
      className={`nav-item-dropdown ${isOpen ? 'is-open' : ''}`}
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={`nav-link dropdown-trigger ${isCurrentActive ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <svg
          className="dropdown-chevron"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <ul className="dropdown-menu" role="menu">
        {items.map((item) => {
          const isItemActive = router.asPath === item.href || router.pathname === item.href;
          return (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                className={`dropdown-item ${isItemActive ? 'active' : ''}`}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
