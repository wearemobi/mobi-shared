import React from 'react';

export type MobiButtonVariant = 'solid' | 'outline' | 'ghost' | 'danger';

export interface MobiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button.
   * @default 'solid'
   */
  variant?: MobiButtonVariant;
  /**
   * The vertical size and padding of the button.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Optional icon to render before the children.
   */
  icon?: React.ReactNode;
  /**
   * Optional icon to render after the children (e.g. chevron, external link).
   */
  suffixIcon?: React.ReactNode;
  /**
   * If true, shows a spinner and disables the button.
   * @default false
   */
  loading?: boolean;
  /**
   * If true, uses a monospace font and more precise padding for a technical look.
   * @default false
   */
  technical?: boolean;
}

/**
 * M.O.B.I.™ Standard Button Component.
 * Supports a "technical" mode for engineering-focused UIs,
 * a `loading` state with spinner, and prefix/suffix icons.
 *
 * @example
 * ```tsx
 * <MobiButton variant="solid">Normal Button</MobiButton>
 * <MobiButton variant="outline" technical>Engineering View</MobiButton>
 * <MobiButton variant="solid" loading>Submitting...</MobiButton>
 * ```
 */
export const MobiButton: React.FC<MobiButtonProps> = ({
  variant = 'solid',
  size = 'md',
  icon,
  suffixIcon,
  loading = false,
  technical = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const baseStyles = "inline-flex items-center justify-center gap-2 transition-all outline-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-2 border-transparent";

  const fontStyles = technical
    ? "font-bold font-mono tracking-tight"
    : "font-semibold font-sans";

  const variantStyles = {
    solid: "bg-mobi-primary text-mobi-bg hover:opacity-90",
    outline: "border-mobi-border bg-transparent text-mobi-text hover:border-mobi-primary hover:bg-mobi-primary hover:text-mobi-bg",
    ghost: "text-mobi-text-muted hover:text-mobi-text hover:bg-mobi-surface/50 border-transparent",
    danger: "border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10"
  };

  const sizeStyles = {
    sm: technical ? "px-3 py-1 rounded-md text-[10px]" : "px-4 py-1.5 rounded-md text-xs",
    md: technical ? "px-5 py-2 rounded-lg text-xs" : "px-6 py-2.5 rounded-lg text-sm",
    lg: technical ? "px-7 py-3 rounded-xl text-sm" : "px-8 py-3.5 rounded-xl text-base"
  };

  const spinnerSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

  return (
    <button
      className={`${baseStyles} ${fontStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <svg
          className={`${spinnerSize} animate-spin shrink-0`}
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        icon && <span className="shrink-0" aria-hidden="true">{icon}</span>
      )}
      {children}
      {!loading && suffixIcon && <span className="shrink-0" aria-hidden="true">{suffixIcon}</span>}
    </button>
  );
};
