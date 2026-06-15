import React from 'react';
import { cn } from '@wearemobi/ui';
import { X } from 'lucide-react';
import { MobiBadge, type MobiBadgeVariant } from './MobiBadge';

export interface MobiChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'variant'> {
  label: string;
  onDelete?: () => void;
  icon?: React.ReactNode;
  variant?: MobiBadgeVariant;
}

export const MobiChip: React.FC<MobiChipProps> = ({
  label,
  onDelete,
  icon,
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <MobiBadge
      variant={variant}
      className={cn(
        "rounded-full pl-2 pr-2 font-medium tracking-normal normal-case",
        onDelete && "pr-1",
        className
      )}
      icon={icon}
      {...props}
    >
      {label}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="ml-1 rounded-full outline-none hover:bg-foreground/20 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors flex items-center justify-center p-0.5"
        >
          <X size={12} strokeWidth={3} />
          <span className="sr-only">Remove {label}</span>
        </button>
      )}
    </MobiBadge>
  );
};
