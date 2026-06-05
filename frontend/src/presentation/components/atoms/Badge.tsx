import React from 'react';

interface BadgeProps {
  status: 'active' | 'expired' | 'never';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold uppercase';
  const statusClasses = {
    active: 'bg-success-bg text-success-text border border-success-border',
    expired: 'bg-error-bg text-error-text border border-error-border',
    never: 'bg-never-bg text-text-dim border border-never-border',
  };
  
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{children}</span>;
};
