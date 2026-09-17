import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavDropdown({ label, items, basePath }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);
  const router = useRouter();

  const dropdownId = `nav-dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const isCurrentActive = items.some(item => router.asPath === item.href || router.pathname === item.href) ||
    (basePath && router.pathname.startsWith(basePath));

  // Close on outside click or focus blur
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleTriggerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const nextState = !isOpen;
      setIsOpen(nextState);
      if (nextState && itemRefs.current[0]) {
        setTimeout(() => itemRefs.current[0]?.focus(), 50);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setTimeout(() => itemRefs.current[0]?.focus(), 50);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const handleItemKeyDown = (index, e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) {
        triggerRef.current?.focus();
      } else {
        itemRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <li
      className={`nav-item-dropdown ${isOpen ? 'is-open' : ''}`}
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`nav-link dropdown-trigger ${isCurrentActive ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={dropdownId}
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
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <ul
        id={dropdownId}
        className="dropdown-menu"
        role="menu"
        aria-label={`${label} sub-navigation`}
      >
        {items.map((item, index) => {
          const isItemActive = router.asPath === item.href || router.pathname === item.href;
          return (
            <li key={item.href} role="none">
              <Link
                ref={(el) => (itemRefs.current[index] = el)}
                href={item.href}
                className={`dropdown-item ${isItemActive ? 'active' : ''}`}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                onKeyDown={(e) => handleItemKeyDown(index, e)}
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
