import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', fullWidth, style, className, children, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-300';
  
  const primaryClasses = 'bg-gradient-to-br from-brand to-purple-500 text-white border-none rounded-xl py-4 px-6 text-base font-bold shadow-[0_4px_20px_var(--color-brand-glow)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(139,92,246,0.6)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none';
  const secondaryClasses = 'bg-white/5 text-text-main border border-white/10 rounded-lg py-1.5 px-3 text-sm font-semibold hover:bg-white/10 hover:border-white/20';
  
  const variantClasses = variant === 'primary' ? primaryClasses : secondaryClasses;
  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClassName = `${baseClasses} ${variantClasses} ${widthClass} ${className || ''}`.trim();

  return (
    <button className={combinedClassName} style={style} {...props}>
      {children}
    </button>
  );
};
