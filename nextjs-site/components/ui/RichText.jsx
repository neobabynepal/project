import React from 'react';

function renderChildren(children) {
  if (!children || !Array.isArray(children)) return null;

  return children.map((child, idx) => {
    if (!child) return null;

    if (child.type === 'link') {
      return (
        <a
          key={idx}
          href={child.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
        >
          {renderChildren(child.children)}
        </a>
      );
    }

    let node = child.text || '';
    if (child.bold) {
      node = <strong key={idx} style={{ fontWeight: 700 }}>{node}</strong>;
    }
    if (child.italic) {
      node = <em key={idx}>{node}</em>;
    }
    if (child.underline) {
      node = <u key={idx}>{node}</u>;
    }
    if (child.strikethrough) {
      node = <s key={idx}>{node}</s>;
    }
    if (child.code) {
      node = <code key={idx} style={{ background: '#f1f5f9', padding: '0.15rem 0.35rem', borderRadius: '4px', fontSize: '0.9em' }}>{node}</code>;
    }

    return <React.Fragment key={idx}>{node}</React.Fragment>;
  });
}

export default function RichText({ content, className = '' }) {
  if (!content) return null;

  // Handle Strapi 5 Blocks format: Array of block objects
  if (Array.isArray(content)) {
    return (
      <div className={`rich-text ${className}`} style={{ lineHeight: '1.75' }}>
        {content.map((block, idx) => {
          if (typeof block === 'string') {
            return <p key={idx} style={{ marginBottom: '1rem' }}>{block}</p>;
          }

          if (block.type === 'paragraph') {
            return (
              <p key={idx} style={{ marginBottom: '1rem' }}>
                {renderChildren(block.children)}
              </p>
            );
          }

          if (block.type === 'heading') {
            const Tag = `h${block.level || 3}`;
            const sizeMap = {
              1: '2rem',
              2: '1.65rem',
              3: '1.35rem',
              4: '1.15rem',
              5: '1rem',
              6: '0.9rem'
            };
            return (
              <Tag
                key={idx}
                style={{
                  color: 'var(--color-heading)',
                  margin: '1.75rem 0 0.75rem 0',
                  fontFamily: 'var(--font-heading)',
                  fontSize: sizeMap[block.level] || '1.35rem',
                  fontWeight: 700
                }}
              >
                {renderChildren(block.children)}
              </Tag>
            );
          }

          if (block.type === 'list') {
            const isOrdered = block.format === 'ordered';
            const ListTag = isOrdered ? 'ol' : 'ul';
            return (
              <ListTag key={idx} style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem' }}>
                {block.children?.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ marginBottom: '0.45rem' }}>
                    {renderChildren(item.children)}
                  </li>
                ))}
              </ListTag>
            );
          }

          if (block.type === 'quote') {
            return (
              <blockquote
                key={idx}
                style={{
                  borderLeft: '4px solid var(--color-primary)',
                  paddingLeft: '1.25rem',
                  margin: '1.5rem 0',
                  fontStyle: 'italic',
                  color: 'var(--color-text-muted)'
                }}
              >
                {renderChildren(block.children)}
              </blockquote>
            );
          }

          return null;
        })}
      </div>
    );
  }

  // Handle standard string / markdown content
  if (typeof content === 'string') {
    const paragraphs = content.split('\n\n');
    return (
      <div className={`rich-text ${className}`} style={{ lineHeight: '1.75' }}>
        {paragraphs.map((p, idx) => {
          const trimmed = p.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} style={{ color: 'var(--color-heading)', margin: '1.5rem 0 0.5rem 0', fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700 }}>
                {trimmed.replace('### ', '')}
              </h3>
            );
          }

          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={idx} style={{ color: 'var(--color-heading)', margin: '1.75rem 0 0.75rem 0', fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 700 }}>
                {trimmed.replace('## ', '')}
              </h2>
            );
          }

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const items = trimmed.split('\n');
            return (
              <ul key={idx} style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                {items.map((it, iIdx) => {
                  const raw = it.replace(/^[-*]\s+/, '');
                  const parts = raw.split(/(\*\*.*?\*\*)/g);
                  return (
                    <li key={iIdx} style={{ marginBottom: '0.35rem' }}>
                      {parts.map((part, pIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={pIdx} style={{ color: 'var(--color-primary)' }}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </li>
                  );
                })}
              </ul>
            );
          }

          return (
            <p key={idx} style={{ marginBottom: '1rem' }}>
              {trimmed}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
}
