import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  cn
} from '@wearemobi/ui';

export interface MobiDropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MobiDropdownProps {
  options: MobiDropdownOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const MobiDropdown = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  MobiDropdownProps
>(({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  label,
  className,
  disabled
}, ref) => {
  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      {label && <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</Label>}
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger ref={ref} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
MobiDropdown.displayName = 'MobiDropdown';
