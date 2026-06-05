import React from "react";
import { Label } from "../atoms/Label";
import { Input } from "../atoms/Input";

interface FormGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({ id, label, ...inputProps }) => (
  <div className="flex flex-col gap-2 mb-5">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...inputProps} />
  </div>
);
