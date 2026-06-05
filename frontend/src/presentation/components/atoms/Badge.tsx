import React from 'react';

interface BadgeProps {
  status: 'active' | 'expired' | 'never';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  return <span className={`badge badge-${status}`}>{children}</span>;
};
