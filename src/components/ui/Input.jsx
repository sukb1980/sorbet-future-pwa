/* Input Component — Sorbet Future Fit Design System */
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helper,
  icon,
  iconRight,
  required = false,
  disabled = false,
  id,
  style = {},
  containerStyle = {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const hasError = !!error;

  return (
    <div style={{ marginBottom: 'var(--space-md)', ...containerStyle }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: 'block',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: hasError ? 'var(--color-error)' : 'var(--text-secondary)',
            marginBottom: '6px',
            letterSpacing: '0.02em',
          }}
        >
          {label}{required && <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <span style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            {icon}
          </span>
        )}
        <input
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          style={{
            width: '100%',
            padding: `14px ${isPassword || iconRight ? '48px' : '16px'} 14px ${icon ? '44px' : '16px'}`,
            background: disabled ? 'var(--color-cream-deep)' : 'var(--color-surface)',
            border: `1px solid ${hasError ? 'var(--color-error)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.9375rem',
            color: 'var(--text-primary)',
            outline: 'none',
            transition: 'var(--transition-fast)',
            cursor: disabled ? 'not-allowed' : 'text',
            opacity: disabled ? 0.6 : 1,
            ...style,
          }}
          onFocus={(e) => { e.target.style.borderColor = hasError ? 'var(--color-error)' : 'var(--color-accent)'; e.target.style.boxShadow = hasError ? 'none' : '0 0 0 3px var(--color-rose-gold-light)'; }}
          onBlur={(e) => { e.target.style.borderColor = hasError ? 'var(--color-error)' : 'var(--color-border)'; e.target.style.boxShadow = 'none'; }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            style={{ position: 'absolute', right: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
        {iconRight && !isPassword && (
          <span style={{ position: 'absolute', right: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>{iconRight}</span>
        )}
      </div>
      {error && <p style={{ color: 'var(--color-error)', fontSize: '0.8125rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>⚠ {error}</p>}
      {helper && !error && <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '6px' }}>{helper}</p>}
    </div>
  );
};

export const Checkbox = ({ label, checked, onChange, required, id, error }) => {
  const checkId = id || `cb-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div style={{ marginBottom: 'var(--space-sm)' }}>
      <label htmlFor={checkId} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        <input id={checkId} type="checkbox" checked={checked} onChange={onChange} required={required}
          style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--color-accent)', flexShrink: 0, cursor: 'pointer' }} />
        <span>{label}{required && <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>}</span>
      </label>
      {error && <p style={{ color: 'var(--color-error)', fontSize: '0.8125rem', marginTop: '4px' }}>{error}</p>}
    </div>
  );
};

export const Select = ({ label, value, onChange, options, required, disabled, id, error }) => {
  const selId = id || `sel-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div style={{ marginBottom: 'var(--space-md)' }}>
      {label && <label htmlFor={selId} style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>{label}{required && <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>}</label>}
      <select id={selId} value={value} onChange={onChange} required={required} disabled={disabled}
        style={{ width: '100%', padding: '14px 16px', background: 'var(--color-surface)', border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-sm)', fontSize: '0.9375rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
        {options.map((opt) => <option key={opt.value ?? opt} value={opt.value ?? opt}>{opt.label ?? opt}</option>)}
      </select>
      {error && <p style={{ color: 'var(--color-error)', fontSize: '0.8125rem', marginTop: '6px' }}>{error}</p>}
    </div>
  );
};

export const Textarea = ({ label, value, onChange, placeholder, rows = 4, required, id, error, helper }) => {
  const taId = id || `ta-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div style={{ marginBottom: 'var(--space-md)' }}>
      {label && <label htmlFor={taId} style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>{label}{required && <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>}</label>}
      <textarea id={taId} value={value} onChange={onChange} placeholder={placeholder} rows={rows} required={required}
        style={{ width: '100%', padding: '14px 16px', background: 'var(--color-surface)', border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-sm)', fontSize: '0.9375rem', color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'var(--font-family)', outline: 'none' }} />
      {error && <p style={{ color: 'var(--color-error)', fontSize: '0.8125rem', marginTop: '6px' }}>{error}</p>}
      {helper && !error && <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '6px' }}>{helper}</p>}
    </div>
  );
};

export default Input;
