import React from 'react';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';

interface FormGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({ id, label, ...inputProps }) => {
  return (
    <div className="form-group">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} />
    </div>
  );
};
