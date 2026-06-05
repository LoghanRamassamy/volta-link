import React, { LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return <label className="text-[0.85rem] font-semibold text-text-dim uppercase tracking-[0.05em]" {...props}>{children}</label>;
};
