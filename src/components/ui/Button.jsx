/* Button Component — Sorbet Future Fit Design System */
import React from 'react';

const variants = {
  primary: {
    background: 'var(--color-accent)',
    color: '#fff',
    border: 'none',
    hover: 'var(--color-accent-hover)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--color-accent)',
    border: '2px solid var(--color-accent)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: 'none',
  },
  danger: {
    background: 'var(--color-error)',
    color: '#fff',
    border: 'none',
  },
  dark: {
    background: 'var(--color-charcoal)',
    color: '#fff',
    border: 'none',
  },
  light: {
    background: 'var(--color-cream-deep)',
    color: 'var(--text-primary)',
    border: '1px solid var(--color-border)',
  },
  // Legacy alias
  solid: {
    background: 'var(--color-accent)',
    color: '#fff',
    border: 'none',
  },
};

const sizes = {
  sm: { padding: '8px 16px', fontSize: '0.8125rem', borderRadius: 'var(--radius-full)', height: '36px' },
  md: { padding: '12px 24px', fontSize: '0.9375rem', borderRadius: 'var(--radius-full)', height: '48px' },
  lg: { padding: '14px 32px', fontSize: '1rem', borderRadius: 'var(--radius-full)', height: '56px' },
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  fullWidth = false,
  onClick,
  type = 'button',
  style = {},
  className = '',
  ...props
}) => {
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: 'var(--font-family)',
        fontWeight: 600,
        letterSpacing: '0.01em',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.55 : 1,
        transition: 'var(--transition-base)',
        boxShadow: variant === 'primary' || variant === 'solid' ? '0 2px 12px var(--color-rose-gold-glow)' : 'none',
        width: fullWidth ? '100%' : undefined,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        ...v,
        ...s,
        ...style,
      }}
      {...props}
    >
      {loading ? (
        <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px', borderTopColor: variant === 'outline' ? 'var(--color-accent)' : '#fff' }} />
      ) : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
};

export default Button;
