import React from 'react';

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className = ''
}) {
  return (
    <div className={`section-header ${align === 'left' ? 'text-left' : ''} ${className}`}>
      {badge && <div className="section-badge">{badge}</div>}
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
