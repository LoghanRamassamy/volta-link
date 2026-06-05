import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', fullWidth, style, className, children, ...props }) => {
  const combinedClassName = `btn-${variant} ${className || ''}`.trim();
  const combinedStyle = fullWidth ? { width: '100%', ...style } : style;

  return (
    <button className={combinedClassName} style={combinedStyle} {...props}>
      {children}
    </button>
  );
};
