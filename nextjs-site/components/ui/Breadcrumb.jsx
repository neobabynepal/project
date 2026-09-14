import React from 'react';
import Link from 'next/link';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <span className="breadcrumb-separator">/</span>
            {isLast || !item.href ? (
              <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 600 }}>{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
