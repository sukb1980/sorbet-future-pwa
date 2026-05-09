/* Card Component — Sorbet Future Fit Design System */
import React from 'react';

const cardStyles = {
  default: {
    background: 'var(--color-surface)',
    border: 'var(--glass-border)',
    boxShadow: 'var(--shadow-card)',
  },
  elevated: {
    background: 'var(--color-surface)',
    border: 'var(--glass-border)',
    boxShadow: 'var(--shadow-md)',
  },
  glass: {
    background: 'rgba(255, 252, 249, 0.7)',
    border: 'var(--glass-border)',
    boxShadow: 'var(--shadow-sm)',
    backdropFilter: 'blur(8px)',
  },
  blush: {
    background: 'var(--color-blush-light)',
    border: '1px solid var(--color-blush)',
    boxShadow: 'none',
  },
  accent: {
    background: 'linear-gradient(135deg, var(--color-rose-gold-light) 0%, var(--color-blush-light) 100%)',
    border: '1px solid var(--color-blush)',
    boxShadow: 'var(--shadow-card)',
  },
  flat: {
    background: 'var(--color-cream-deep)',
    border: 'none',
    boxShadow: 'none',
  },
};

export const Card = ({
  children,
  variant = 'default',
  padding = 'var(--space-lg)',
  radius = 'var(--radius-md)',
  onClick,
  hoverable = true,
  style = {},
  className = '',
  ...props
}) => {
  const cs = cardStyles[variant] || cardStyles.default;
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e); } : undefined}
      className={`animate-fade-in ${className}`}
      style={{
        borderRadius: radius,
        padding,
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'var(--transition-base)',
        ...cs,
        ...(isClickable && hoverable ? {} : {}),
        ...style,
      }}
      onMouseEnter={isClickable ? (e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; } : undefined}
      onMouseLeave={isClickable ? (e) => { e.currentTarget.style.boxShadow = cs.boxShadow || 'var(--shadow-card)'; e.currentTarget.style.transform = 'translateY(0)'; } : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
