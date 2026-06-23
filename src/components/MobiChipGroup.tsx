import React from 'react';
import { cn } from '@wearemobi/ui';

export interface MobiChipGroupOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface MobiChipGroupProps {
  options: MobiChipGroupOption[];
  value: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
  className?: string;
  chipClassName?: string;
}

export const MobiChipGroup: React.FC<MobiChipGroupProps> = ({
  options,
  value,
  onChange,
  multiple = true,
  className,
  chipClassName,
}) => {
  const handleToggle = (optionValue: string) => {
    if (multiple) {
      if (value.includes(optionValue)) {
        onChange(value.filter((v) => v !== optionValue));
      } else {
        onChange([...value, optionValue]);
      }
    } else {
      if (value.includes(optionValue)) {
        onChange([]); 
      } else {
        onChange([optionValue]);
      }
    }
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => {
        const isSelected = value.includes(option.value);

        return (
          <label
            key={option.value}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer select-none',
              isSelected
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border text-muted-foreground hover:bg-muted',
              chipClassName
            )}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              className="sr-only"
              checked={isSelected}
              onChange={() => handleToggle(option.value)}
            />
            {option.icon && <span>{option.icon}</span>}
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};
