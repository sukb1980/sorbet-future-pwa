import React from 'react';
import clsx from 'clsx';

export const Pill = ({ children, active, className, colorMode }) => {
  return (
    <div className={clsx('pill', active && 'active', colorMode && `pill-${colorMode}`, className)}>
      {children}
    </div>
  );
};
