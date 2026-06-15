import React from 'react';
import { Button, cn } from '@wearemobi/ui';
import { Loader2 } from 'lucide-react';

export type MobiButtonVariant = 'solid' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'error' | 'danger';

export interface MobiButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'variant' | 'size'> {
  variant?: MobiButtonVariant;
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const shadcnVariantMap: Record<string, 'default' | 'destructive' | 'outline' | 'ghost'> = {
  solid: 'default',
  error: 'destructive',
  danger: 'destructive',
  outline: 'outline',
  ghost: 'ghost',
};

const sizeMap: Record<'sm' | 'md' | 'lg' | 'icon', 'sm' | 'default' | 'lg' | 'icon'> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
  icon: 'icon',
};

// Custom class maps for variants that don't map to shadcn
const customVariantClasses: Record<string, string> = {
  secondary:
    'bg-muted text-foreground border border-border hover:bg-muted/70 active:bg-muted/90',
  tertiary:
    'bg-primary/10 text-primary border-transparent hover:bg-primary/15 active:bg-primary/20',
};

const customSizeClasses: Record<'sm' | 'md' | 'lg' | 'icon', string> = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-9 px-4 text-sm rounded-md',
  lg: 'h-11 px-6 text-base rounded-md',
  icon: 'h-9 w-9 rounded-md p-0',
};

const isCustomVariant = (v: MobiButtonVariant) => v === 'secondary' || v === 'tertiary';

export const MobiButton = React.forwardRef<HTMLButtonElement, MobiButtonProps>((
  {
    variant = 'solid',
    size = 'md',
    icon,
    suffixIcon,
    loading = false,
    fullWidth = false,
    children,
    className,
    disabled,
    ...props
  },
  ref
) => {
  const iconContent = loading ? (
    <Loader2 className="animate-spin shrink-0 h-4 w-4" />
  ) : (
    icon && <span className="shrink-0" aria-hidden="true">{icon}</span>
  );
  const suffixContent = !loading && suffixIcon && (
    <span className="shrink-0" aria-hidden="true">{suffixIcon}</span>
  );

  if (isCustomVariant(variant)) {
    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        className={cn(
          'inline-flex items-center justify-center font-sans font-bold gap-2 transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50',
          customVariantClasses[variant],
          customSizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {iconContent}
        {children}
        {suffixContent}
      </button>
    );
  }

  return (
    <Button
      ref={ref}
      variant={shadcnVariantMap[variant]}
      size={sizeMap[size]}
      className={cn(
        'font-sans font-bold gap-2',
        fullWidth && 'w-full',
        className
      )}
      disabled={loading || disabled}
      {...(props as any)}
    >
      {iconContent}
      {children}
      {suffixContent}
    </Button>
  );
});
MobiButton.displayName = 'MobiButton';
