import React, { useState, useRef, useEffect } from 'react';
import { MobiFormLabel } from './MobiFormLabel';

export interface MobiInputProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'type' | 'prefix'> {
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
  className = '',
  disabled = false,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize for textarea to prevent ugly scrollbars on premium views
  useEffect(() => {
    if (type === 'textarea' && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
    }
  }, [type, props.value]);

  const fontStyles = technical ? 'font-mono' : 'font-sans';
  const hasError = !!error;

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
      return (
        <textarea
          ref={textareaRef}
          className={`${baseInputStyles} resize-none min-h-[90px]`}
          disabled={disabled}
          required={required}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      );
    }

    let inputType = type === 'money' ? 'text' : type;
    if (type === 'password' && showPassword) {
      inputType = 'text';
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow numerical filter for numbers/money
      if (type === 'number' || type === 'money') {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', '.'];
        if (!allowedKeys.includes(e.key) && isNaN(Number(e.key)) && e.key !== '-') {
          e.preventDefault();
        }
      }
      if (props.onKeyDown) {
        props.onKeyDown(e);
      }
    };

    return (
      <input
        type={inputType}
        className={baseInputStyles}
        disabled={disabled}
        required={required}
        onKeyDown={handleKeyDown}
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  };

  // Determine prefix icon for money
  const resolvedPrefixIcon = type === 'money' && !prefixIcon 
    ? <span className="text-mobi-text-muted font-bold text-sm select-none">$</span>
    : prefixIcon;

  // Determine suffix icon for money
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
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-mobi-text-muted hover:text-mobi-text transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50 hover:bg-mobi-surface-hover rounded-lg"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            ) : (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}

        {resolvedSuffixIcon && type !== 'password' && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
            {resolvedSuffixIcon}
          </div>
        )}
      </div>

      {hasError && (
        <span className="text-red-500 font-bold font-sans text-[10px] mt-1.5 animate-in fade-in slide-in-from-top-1 flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
};
export default MobiInput;
