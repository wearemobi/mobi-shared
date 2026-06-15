import React, { useState, useCallback } from 'react';
import { filterNumericKeys } from '../utils/input';
import { Input, Field, InputGroup, InputGroupPrefix, InputGroupSuffix, cn } from '@wearemobi/ui';
import { Eye, EyeOff } from 'lucide-react';

export interface MobiInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'prefix'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'money';
  label?: string;
  description?: string;
  error?: string;
  technical?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  allowNegative?: boolean;
  currencySymbol?: string;
  currencyCode?: string;
}

export const MobiInput = React.forwardRef<HTMLInputElement, MobiInputProps>(({
  type = 'text',
  label,
  description,
  error,
  technical = false,
  prefixIcon,
  suffixIcon,
  allowNegative = false,
  currencySymbol = '$',
  currencyCode = 'USD',
  className,
  disabled = false,
  required = false,
  id,
  onKeyDown,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = useCallback(() => setShowPassword(v => !v), []);

  const fontStyles = technical ? 'font-mono' : 'font-sans';
  const hasError = !!error;
  const inputId = id || React.useId();

  let inputType: string = type === 'money' ? 'text' : type;
  if (type === 'password' && showPassword) {
    inputType = 'text';
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === 'number' || type === 'money') {
      filterNumericKeys(e, allowNegative);
    }
    onKeyDown?.(e);
  };

  const resolvedPrefixIcon = type === 'money' && !prefixIcon
    ? <span className="text-muted-foreground font-bold text-sm select-none">{currencySymbol}</span>
    : prefixIcon;

  const resolvedSuffixIcon = type === 'money' && !suffixIcon
    ? <span className="text-[9px] font-black text-muted-foreground tracking-wider uppercase select-none">{currencyCode}</span>
    : suffixIcon;

  return (
    <Field label={label} description={description} error={error} htmlFor={inputId} className={className}>
      <InputGroup>
        {resolvedPrefixIcon && (
          <InputGroupPrefix>
            {resolvedPrefixIcon}
          </InputGroupPrefix>
        )}
        
        <Input
          ref={ref}
          id={inputId}
          type={inputType}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          onKeyDown={handleKeyDown}
          className={cn(
            fontStyles,
            resolvedPrefixIcon && "pl-10",
            (resolvedSuffixIcon || type === 'password') && "pr-10",
            hasError && "border-destructive focus-visible:ring-destructive",
            "bg-background"
          )}
          {...(props as any)}
        />

        {type === 'password' && (
          <InputGroupSuffix>
            <button
              type="button"
              onClick={togglePassword}
              disabled={disabled}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 hover:bg-muted rounded-lg"
              title={showPassword ? 'Hide password' : 'Show password'}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </InputGroupSuffix>
        )}

        {resolvedSuffixIcon && type !== 'password' && (
          <InputGroupSuffix>
            {resolvedSuffixIcon}
          </InputGroupSuffix>
        )}
      </InputGroup>
    </Field>
  );
});
MobiInput.displayName = 'MobiInput';
