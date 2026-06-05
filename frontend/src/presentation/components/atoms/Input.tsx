import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input 
      className="w-full bg-black/30 border border-white/10 rounded-xl py-[14px] px-4 text-text-main text-base transition-all duration-300 focus:outline-none focus:border-brand focus:shadow-[0_0_0_3px_var(--color-brand-glow)] focus:bg-black/50 placeholder:text-text-muted" 
      {...props} 
    />
  );
};
