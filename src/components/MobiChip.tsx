import React from 'react';

export type MobiChipVariant = 'primary' | 'success' | 'warning' | 'error' | 'default';

export interface MobiChipProps {
  /** The main text to display */
  label: string;
  /** Optional override for the 1-2 letter initials. Auto-calculated if omitted. */
  initials?: string;
  /** Optional element to render at the end (e.g., a MobiButton) */
  action?: React.ReactNode;
  /** Visual color variant for the avatar circle */
  variant?: MobiChipVariant;
  /** Additional classes for the container */
  className?: string;
}

/**
 * Standardized pill/chip with an avatar circle and optional action.
 * Commonly used for Operators, Users, or generic Entities.
 */
export const MobiChip: React.FC<MobiChipProps> = ({
  label,
  initials,
  action,
  variant = 'primary',
  className = '',
}) => {
  // Auto-calculate initials if not provided
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  const displayInitials = initials || getInitials(label);

  const variantStyles = {
    primary: 'bg-mobi-primary/20 text-mobi-primary',
    success: 'bg-emerald-500/20 text-emerald-500',
    warning: 'bg-amber-500/20 text-amber-500',
    error: 'bg-red-500/20 text-red-500',
    default: 'bg-mobi-surface-hover text-mobi-text',
  };

  const currentVariantStyle = variantStyles[variant] || variantStyles.primary;

  return (
    <div className={`flex items-center gap-2 bg-mobi-surface px-4 py-2 rounded-full border border-mobi-border/30 shadow-sm ${className}`}>
      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-[11px] font-sans ${currentVariantStyle}`}>
        {displayInitials}
      </span>
      <span className="font-bold truncate max-w-[100px] sm:max-w-none text-sm text-mobi-text font-sans">
        {label}
      </span>
      {action && (
        <span className="shrink-0 flex items-center pl-1">
          {action}
        </span>
      )}
    </div>
  );
};
