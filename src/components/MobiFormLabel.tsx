import React from 'react';
import { cn } from '@wearemobi/ui';

export interface MobiFormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  required?: boolean;
}

export const MobiFormLabel: React.FC<MobiFormLabelProps> = ({ label, required, className, ...props }) => {
  return (
    <label className={cn("block text-sm font-bold mb-1", className)} {...props}>
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
  );
};
