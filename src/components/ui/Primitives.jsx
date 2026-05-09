/* ProgressBar, Badge, Avatar, StarRating, EmptyState, Pill
   Sorbet Future Fit Design System */
import React from 'react';

/* ---- ProgressBar ---- */
export const ProgressBar = ({ value, max = 100, label, showPercent = true, height = 8 }) => {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      {(label || showPercent) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          {label && <span>{label}</span>}
          {showPercent && <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div style={{ height: `${height}px`, background: 'var(--color-cream-deep)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--color-rose-gold), var(--color-blush-mid))', borderRadius: 'var(--radius-full)', transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
};

/* ---- Badge ---- */
export const Badge = ({ children, color = 'var(--color-accent)', bg, style = {} }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '20px', height: '20px', padding: '0 6px', borderRadius: 'var(--radius-full)', background: bg || color, color: '#fff', fontSize: '0.6875rem', fontWeight: 700, ...style }}>
    {children}
  </span>
);

/* ---- Avatar ---- */
export const Avatar = ({ src, name, size = 48, style = {} }) => {
  const initials = name ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  return src ? (
    <img src={src} alt={name || 'Avatar'} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-blush)', ...style }} />
  ) : (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-rose-gold), var(--color-blush-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: `${size * 0.35}px`, ...style }}>
      {initials}
    </div>
  );
};

/* ---- StarRating ---- */
export const StarRating = ({ rating, max = 5, size = 16, interactive = false, onChange }) => {
  return (
    <div className="star-rating">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`star ${i < Math.round(rating) ? 'filled' : 'empty'}`} style={{ fontSize: `${size}px`, cursor: interactive ? 'pointer' : 'default' }} onClick={() => interactive && onChange?.(i + 1)}>
          {i < Math.round(rating) ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

/* ---- EmptyState ---- */
export const EmptyState = ({ icon = '✨', title, description, action }) => (
  <div className="empty-state animate-fade-in">
    <div className="empty-state-icon">{icon}</div>
    <h3 className="empty-state-title">{title}</h3>
    {description && <p className="empty-state-body">{description}</p>}
    {action && <div style={{ marginTop: 'var(--space-lg)' }}>{action}</div>}
  </div>
);

/* ---- Pill / Chip ---- */
export const Pill = ({ children, active, onClick, color, icon, style = {} }) => (
  <button onClick={onClick}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '6px 14px', borderRadius: 'var(--radius-full)',
      border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
      background: active ? 'var(--color-rose-gold-light)' : 'var(--color-surface)',
      color: active ? 'var(--color-accent)' : 'var(--text-secondary)',
      fontSize: '0.8125rem', fontWeight: active ? 600 : 400,
      cursor: onClick ? 'pointer' : 'default', fontFamily: 'var(--font-family)',
      transition: 'var(--transition-fast)', whiteSpace: 'nowrap',
      ...style
    }}>
    {icon && <span>{icon}</span>}
    {children}
  </button>
);

/* ---- Skeleton Loader ---- */
export const Skeleton = ({ width = '100%', height = 16, radius = 'var(--radius-sm)', style = {} }) => (
  <div className="skeleton" style={{ width, height, borderRadius: radius, ...style }} />
);

export const SkeletonCard = ({ height = 180 }) => (
  <div className="skeleton skeleton-card" style={{ height }} />
);

export default ProgressBar;
