import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn
} from '@wearemobi/ui';
import { ChevronDown } from 'lucide-react';

export interface MobiComboboxOption {
  value: string;
  label: string;
}

export interface MobiComboboxProps {
  options: MobiComboboxOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const MobiCombobox: React.FC<MobiComboboxProps> = ({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  className
}) => {
  const selectedOption = options.find(o => o.value === value) || options[0];
  const displayLabel = selectedOption?.label || placeholder;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted border border-border/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/20", className)}>
        <span className="text-xs font-bold font-sans tracking-wide text-foreground">{displayLabel}</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[16rem] rounded-xl p-1 shadow-lg border-border/50">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onValueChange(option.value)}
            className={cn(
              "cursor-pointer py-2 px-3 rounded-lg focus:bg-muted/50",
              option.value === value && "bg-muted/30"
            )}
          >
            <span className="font-sans font-medium text-sm">
              {option.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
