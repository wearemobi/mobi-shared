import React from 'react';
import { MobiFormLabel } from './MobiFormLabel';

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
 * Customstyled `<select>` wrapper supporting options, labels, subtext descriptions,
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
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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
export default MobiDropdown;
