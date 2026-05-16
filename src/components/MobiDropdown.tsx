import React from 'react';
import { MobiFormLabel } from './MobiFormLabel';
import { FormError } from './FormError';
import { MobiIcon } from './MobiIcon';

export interface MobiDropdownOption {
  /**
   * The actual form value of the option.
   */
  value: string;
  /**
   * The text label displayed in the dropdown.
   */
  label: string;
  /**
   * If true, prevents selecting this option.
   */
  disabled?: boolean;
}

export interface MobiDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * List of available options.
   */
  options: MobiDropdownOption[];
  /**
   * Optional field label text.
   */
  label?: string;
  /**
   * Optional helper description or sub-label.
   */
  description?: string;
  /**
   * Error message displayed in red below the dropdown.
   */
  error?: string;
  /**
   * If true, applies high-contrast monospace fonts.
   * @default false
   */
  technical?: boolean;
  /**
   * Placeholder/default prompt text when no option is chosen.
   * @default 'Select an option...'
   */
  placeholder?: string;
}

/**
 * M.O.B.I.™ Standard Dropdown Selector.
 * Custom-styled `<select>` wrapper supporting options, labels, subtext descriptions,
 * error boundaries, and light/dark theme aesthetics.
 *
 * @example
 * ```tsx
 * <MobiDropdown
 *   label="Access Level"
 *   placeholder="Choose authorization tier..."
 *   options={[
 *     { value: 'read', label: 'Read-only Access' },
 *     { value: 'write', label: 'Write Access' },
 *     { value: 'admin', label: 'Full System Operator' }
 *   ]}
 * />
 * ```
 */
export const MobiDropdown: React.FC<MobiDropdownProps> = ({
  options,
  label,
  description,
  error,
  technical = false,
  placeholder = 'Select an option...',
  className = '',
  disabled = false,
  required = false,
  ...props
}) => {
  const fontStyles = technical ? 'font-mono' : 'font-sans';
  const hasError = !!error;
  const errorId = props.id ? `${props.id}-error` : undefined;

  const selectStyles = `
    w-full bg-mobi-surface border rounded-xl px-4 py-3 text-sm font-medium
    text-mobi-text placeholder:text-mobi-text-muted outline-none transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer pr-10
    ${hasError
      ? 'border-red-500/40 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 bg-red-500/[0.01]'
      : 'border-mobi-border focus:border-mobi-primary focus:ring-1 focus:ring-mobi-primary/20'
    }
    ${fontStyles}
  `;

  // If uncontrolled (no value prop), ensure the placeholder renders as selected by default
  const isControlled = props.value !== undefined;

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
        <select
          className={selectStyles}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          {...(!isControlled ? { defaultValue: '' } : {})}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="bg-mobi-surface text-mobi-text font-medium"
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-mobi-text-muted">
          <MobiIcon name="chevron-down" size={18} />
        </div>
      </div>

      {hasError && <FormError id={errorId} message={error!} />}
    </div>
  );
};
export default MobiDropdown;
