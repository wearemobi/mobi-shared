import React from 'react';
import { MobiIcon } from './MobiIcon';

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

  return (
    <button
      className={`${baseStyles} ${fontStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <MobiIcon
          name="loader"
          size={size === 'sm' ? 12 : size === 'lg' ? 20 : 16}
          strokeWidth={4}
          className="animate-spin shrink-0"
        />
      ) : (
        icon && <span className="shrink-0" aria-hidden="true">{icon}</span>
      )}
      {children}
      {!loading && suffixIcon && <span className="shrink-0" aria-hidden="true">{suffixIcon}</span>}
    </button>
  );
};
