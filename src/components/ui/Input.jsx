import React from 'react';
import clsx from 'clsx';

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  required
}) => {
  return (
    <div className={clsx('input-group', className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
        required={required}
      />
    </div>
  );
};
