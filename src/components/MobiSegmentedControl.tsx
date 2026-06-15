import React from 'react';
import { cn } from '@wearemobi/ui';

export interface MobiSegmentedControlOption {
  value: string;
  label: React.ReactNode;
}

export interface MobiSegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: React.ReactNode;
  options: MobiSegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
}

export const MobiSegmentedControl: React.FC<MobiSegmentedControlProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <div
      role="radiogroup"
      aria-label={typeof label === 'string' ? label : "Segmented Control"}
      className={cn(
        "flex flex-wrap items-center gap-4 p-3 rounded-xl border border-border bg-muted/20",
        className
      )}
      {...props}
    >
      {label && (
        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground shrink-0">
          {label}
        </span>
      )}
      <div className="flex items-center gap-1">
        {options.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              type="button"
              role="radio"
              aria-checked={isActive}
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
