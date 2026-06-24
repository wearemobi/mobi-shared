import React from 'react';
import { Badge, cn } from '@wearemobi/ui';
import { cva } from 'class-variance-authority';

const badgeVariants = cva(
  "inline-flex items-center justify-center w-fit gap-1.5 font-semibold font-sans uppercase tracking-wider rounded-full",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
        success: "bg-success/10 text-success border-success/20 hover:bg-success/20",
        error: "bg-error/10 text-error border-error/20 hover:bg-error/20",
        warning: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
        info: "bg-info/10 text-info border-info/20 hover:bg-info/20",
      },
      size: {
        sm: '!px-2.5 !py-0.5 !h-5 text-[9px]',
        md: '!px-3.5 !py-1 !h-6 text-[10px]',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const dotVariants = cva(
  "h-1.5 w-1.5 rounded-full shrink-0",
  {
    variants: {
      variant: {
        default: "bg-current",
        outline: "bg-current",
        success: "bg-success",
        error: "bg-error",
        warning: "bg-warning",
        info: "bg-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type MobiBadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'outline';
export type MobiBadgeSize = 'sm' | 'md';

export interface MobiBadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'variant'> {
  variant?: MobiBadgeVariant;
  size?: MobiBadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
}

export const MobiBadge: React.FC<MobiBadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  children,
  className,
  ...props
}) => {
  // We use shadcn's 'outline' or 'default', but for custom colors we use 'secondary' as base to remove borders,
  // and let our CVA classes override the colors.
  const shadcnVariant = variant === 'outline' ? 'outline' : variant === 'default' ? 'default' : 'secondary';

  return (
    <Badge
      variant={shadcnVariant}
      className={cn(badgeVariants({ variant, size }), className)}
      {...(props as any)}
    >
      {dot && (
        <span
          className={dotVariants({ variant })}
          aria-hidden="true"
        />
      )}
      {icon && (
        <span className="shrink-0" aria-hidden="true">{icon}</span>
      )}
      {children}
    </Badge>
  );
};
