import React from 'react';

export type MobiBadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'outline';
export type MobiBadgeSize = 'sm' | 'md';

export interface MobiBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic color variant.
   * @default 'default'
   */
  variant?: MobiBadgeVariant;
  /**
   * Size preset.
   * @default 'md'
   */
  size?: MobiBadgeSize;
  /** Optional dot indicator rendered before the label. */
  dot?: boolean;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
}

const VARIANT_CLASS: Record<MobiBadgeVariant, string> = {
  default: 'bg-mobi-surface border border-mobi-border text-mobi-text',
  success: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400',
  error: 'bg-rose-500/10 border border-rose-500/20 text-rose-400',
  warning: 'bg-amber-500/10 border border-amber-500/20 text-amber-400',
  info: 'bg-blue-500/10 border border-blue-500/20 text-blue-400',
  outline: 'bg-transparent border border-mobi-border text-mobi-text-muted',
};

const DOT_CLASS: Record<MobiBadgeVariant, string> = {
  default: 'bg-mobi-text-muted',
  success: 'bg-emerald-400',
  error: 'bg-rose-400',
  warning: 'bg-amber-400',
  info: 'bg-blue-400',
  outline: 'bg-mobi-text-muted',
};

/**
 * M.O.B.I.™ Badge / Chip.
 * Compact status indicator. Supports semantic variants, dot indicators, icons, and custom content.
 *
 * @example
 * ```tsx
 * <MobiBadge variant="success" dot>Online</MobiBadge>
 * <MobiBadge variant="error">Failed</MobiBadge>
 * <MobiBadge variant="info" icon={<InfoIcon />}>In Review</MobiBadge>
 * <MobiBadge>v1.3.6</MobiBadge>
 * ```
 */
export const MobiBadge: React.FC<MobiBadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  children,
  className = '',
  ...props
}) => {
  const sizeClass = size === 'sm'
    ? 'px-1.5 py-0.5 text-[9px]'
    : 'px-2.5 py-1 text-[10px]';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-black font-sans uppercase tracking-widest
        ${sizeClass} ${VARIANT_CLASS[variant]} ${className}
      `}
      {...props}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${DOT_CLASS[variant]}`}
          aria-hidden="true"
        />
      )}
      {icon && (
        <span className="shrink-0" aria-hidden="true">{icon}</span>
      )}
      {children}
    </span>
  );
};
