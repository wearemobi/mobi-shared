import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MobiFormLabel } from './MobiFormLabel';
import { FormError } from './FormError';
import { MobiIcon } from './MobiIcon';

export interface MobiInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'prefix'> {
  /**
   * The input type format.
   * - `text`: Generic text input
   * - `email`: Styled email input
   * - `password`: Password field with premium show/hide toggler
   * - `number`: Standard numbers input with key-filtering
   * - `textarea`: Multi-line text field with auto-resizing
   * - `money`: Financial input with pre-configured prefix ($) and suffix (USD)
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'money';
  /**
   * Optional field label text.
   */
  label?: string;
  /**
   * Optional sub-label helper or description.
   */
  description?: string;
  /**
   * If provided, displays an error message at the bottom and forces red danger border states.
   */
  error?: string;
  /**
   * If true, applies a clean monospace styling and strict technical padding (ideal for keys or parameters).
   * @default false
   */
  technical?: boolean;
  /**
   * Custom element rendered to the left inside the input field.
   */
  prefixIcon?: React.ReactNode;
  /**
   * Custom element rendered to the right inside the input field.
   */
  suffixIcon?: React.ReactNode;
  /**
   * If true, allows negative values in number/money inputs.
   * @default false
   */
  allowNegative?: boolean;
  /**
   * Textarea-specific props (only relevant when type='textarea').
   */
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

/**
 * M.O.B.I.™ Unified Input Component.
 * Encapsulates text formats, passwords, financials (money), and textareas into a premium package.
 * Integrates error handling with smooth CSS animations and interactive states.
 *
 * @example
 * ```tsx
 * <MobiInput label="Secret Token" type="password" error={tokenError} required />
 * <MobiInput label="Allocated Budget" type="money" value={budget} onChange={setBudget} technical />
 * ```
 */
export const MobiInput: React.FC<MobiInputProps> = ({
  type = 'text',
  label,
  description,
  error,
  technical = false,
  prefixIcon,
  suffixIcon,
  allowNegative = false,
  textareaProps,
  className = '',
  disabled = false,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const togglePassword = useCallback(() => setShowPassword(v => !v), []);

  // Auto-resize only when type is textarea
  useEffect(() => {
    if (type !== 'textarea') return;
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
  }, [type, props.value]);

  const fontStyles = technical ? 'font-mono' : 'font-sans';
  const hasError = !!error;
  const errorId = props.id ? `${props.id}-error` : undefined;

  const baseInputStyles = `
    w-full bg-mobi-surface border rounded-xl px-4 py-3 text-sm font-medium
    text-mobi-text placeholder:text-mobi-text-muted outline-none transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    ${hasError
      ? 'border-red-500/40 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 bg-red-500/[0.01]'
      : 'border-mobi-border focus:border-mobi-primary focus:ring-1 focus:ring-mobi-primary/20'
    }
    ${prefixIcon || type === 'money' ? 'pl-10' : ''}
    ${suffixIcon || type === 'password' || type === 'money' ? 'pr-14' : ''}
    ${fontStyles}
  `;

  const renderInput = () => {
    if (type === 'textarea') {
      const { onKeyDown: _omit, ...textareaCompatProps } = props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
      return (
        <textarea
          ref={textareaRef}
          className={`${baseInputStyles} resize-none min-h-[90px]`}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          {...textareaCompatProps}
          {...textareaProps}
        />
      );
    }

    let inputType: string = type === 'money' ? 'text' : type;
    if (type === 'password' && showPassword) {
      inputType = 'text';
    }

    // Compose keydown: numerical filter first, then consumer's handler
    const consumerKeyDown = props.onKeyDown;
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === 'number' || type === 'money') {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', '.'];
        if (allowNegative) allowedKeys.push('-');
        if (!allowedKeys.includes(e.key) && isNaN(Number(e.key))) {
          e.preventDefault();
        }
      }
      consumerKeyDown?.(e);
    };

    return (
      <input
        {...props}
        type={inputType}
        className={baseInputStyles}
        disabled={disabled}
        required={required}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        onKeyDown={handleKeyDown}
      />
    );
  };

  // Prefix icon for money type
  const resolvedPrefixIcon = type === 'money' && !prefixIcon
    ? <span className="text-mobi-text-muted font-bold text-sm select-none">$</span>
    : prefixIcon;

  // Suffix icon for money type
  const resolvedSuffixIcon = type === 'money' && !suffixIcon
    ? <span className="text-[9px] font-black text-mobi-text-muted tracking-wider uppercase select-none">USD</span>
    : suffixIcon;

  return (
    <div className={`w-full flex flex-col mb-4 ${className}`}>
      {label && (
        <MobiFormLabel
          label={label}
          description={description}
          required={required}
          htmlFor={props.id}
        />
      )}
      <div className="relative w-full">
        {resolvedPrefixIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
            {resolvedPrefixIcon}
          </div>
        )}

        {renderInput()}

        {type === 'password' && (
          <button
            type="button"
            onClick={togglePassword}
            disabled={disabled}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-mobi-text-muted hover:text-mobi-text transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50 hover:bg-mobi-surface-hover rounded-lg"
            title={showPassword ? 'Hide password' : 'Show password'}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <MobiIcon name="eye-off" size={18} />
            ) : (
              <MobiIcon name="eye" size={18} />
            )}
          </button>
        )}

        {resolvedSuffixIcon && type !== 'password' && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
            {resolvedSuffixIcon}
          </div>
        )}
      </div>

      {hasError && <FormError id={errorId} message={error!} />}
    </div>
  );
};
export default MobiInput;
