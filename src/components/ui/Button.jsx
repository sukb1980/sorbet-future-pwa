import React from 'react';
import clsx from 'clsx';

export const Button = ({ 
  children, 
  variant = 'solid', // solid | outline | text | accent
  className,
  disabled,
  onClick,
  type = 'button',
  icon
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx('btn', `btn-${variant}`, className)}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};
