import React from 'react';
import clsx from 'clsx';

export const Card = ({ children, className, onClick }) => {
  const isClickable = !!onClick;
  return (
    <div 
      className={clsx('card', isClickable && 'clickable', className)} 
      onClick={onClick}
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
    >
      {children}
    </div>
  );
};
