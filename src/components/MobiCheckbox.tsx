import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MobiCheckboxVariant = 'checkbox' | 'radio' | 'toggle';

export interface MobiCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * The input control variant.
   * - `checkbox` — standard multi-select checkbox.
   * - `radio` — single-select from a group.
   * - `toggle` — on/off switch.
   * @default 'checkbox'
   */
  variant?: MobiCheckboxVariant;
  /** Label text rendered next to the control. */
  label?: string;
  /** Helper text shown below the label. */
  description?: string;
  /** Validation error message. Shows the control in an error state. */
  error?: string;
  /** Associates this control with a form label by ID. */
  'aria-labelledby'?: string;
}

// ─── Sub-renderers ────────────────────────────────────────────────────────────

const CheckboxControl: React.FC<{
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
}> = ({ checked, disabled, error }) => (
  <span
    aria-hidden="true"
    className={`
      flex h-4 w-4 shrink-0 items-center justify-center rounded
      border-2 transition-all duration-150
      ${checked
        ? 'bg-mobi-primary border-mobi-primary'
        : error
          ? 'border-rose-500 bg-transparent'
          : 'border-mobi-border bg-transparent'
      }
      ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
    `}
  >
    {checked && (
      <svg className="h-2.5 w-2.5 text-mobi-bg" viewBox="0 0 12 12" fill="none" stroke="currentColor">
        <path d="M2 6l3 3 5-5" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </span>
);

const RadioControl: React.FC<{
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
}> = ({ checked, disabled, error }) => (
  <span
    aria-hidden="true"
    className={`
      flex h-4 w-4 shrink-0 items-center justify-center rounded-full
      border-2 transition-all duration-150
      ${checked
        ? 'border-mobi-primary'
        : error
          ? 'border-rose-500'
          : 'border-mobi-border'
      }
      ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
    `}
  >
    {checked && (
      <span className="h-2 w-2 rounded-full bg-mobi-primary" />
    )}
  </span>
);

const ToggleControl: React.FC<{
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
}> = ({ checked, disabled, error }) => (
  <span
    aria-hidden="true"
    className={`
      relative flex h-5 w-9 shrink-0 items-center rounded-full
      border-2 transition-all duration-200
      ${checked
        ? 'bg-mobi-primary border-mobi-primary'
        : error
          ? 'border-rose-500 bg-transparent'
          : 'border-mobi-border bg-transparent'
      }
      ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
    `}
  >
    <span
      className={`
        absolute h-3 w-3 rounded-full transition-all duration-200
        ${checked ? 'translate-x-[18px] bg-white' : 'translate-x-[2px] bg-mobi-text-muted'}
      `}
    />
  </span>
);

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * M.O.B.I.™ Selection Control.
 * Supports checkbox, radio, and toggle variants with unified styling,
 * error states, and full accessibility.
 *
 * @example
 * ```tsx
 * // Checkbox
 * <MobiCheckbox
 *   label="Accept Terms"
 *   description="You agree to our terms of service."
 *   checked={accepted}
 *   onChange={(e) => setAccepted(e.target.checked)}
 * />
 *
 * // Toggle
 * <MobiCheckbox
 *   variant="toggle"
 *   label="Enable notifications"
 *   checked={enabled}
 *   onChange={(e) => setEnabled(e.target.checked)}
 * />
 *
 * // Radio group (controlled externally)
 * {['option-a', 'option-b'].map(opt => (
 *   <MobiCheckbox
 *     key={opt}
 *     variant="radio"
 *     name="my-group"
 *     value={opt}
 *     label={opt}
 *     checked={selected === opt}
 *     onChange={() => setSelected(opt)}
 *   />
 * ))}
 * ```
 */
export const MobiCheckbox: React.FC<MobiCheckboxProps> = ({
  variant = 'checkbox',
  label,
  description,
  error,
  id,
  disabled,
  checked,
  className = '',
  ...inputProps
}) => {
  const inputId = id ?? `mobi-check-${Math.random().toString(36).slice(2, 7)}`;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;

  const inputType = variant === 'radio' ? 'radio' : 'checkbox';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={inputId}
        className={`
          flex items-center gap-3 cursor-pointer group
          ${disabled ? 'cursor-not-allowed opacity-60' : ''}
        `}
      >
        {/* Hidden native input */}
        <input
          id={inputId}
          type={inputType}
          checked={checked}
          disabled={disabled}
          aria-describedby={[descId, errId].filter(Boolean).join(' ') || undefined}
          aria-invalid={!!error}
          className="sr-only"
          {...inputProps}
        />

        {/* Visual control */}
        {variant === 'checkbox' && (
          <CheckboxControl checked={checked} disabled={disabled} error={!!error} />
        )}
        {variant === 'radio' && (
          <RadioControl checked={checked} disabled={disabled} error={!!error} />
        )}
        {variant === 'toggle' && (
          <ToggleControl checked={checked} disabled={disabled} error={!!error} />
        )}

        {/* Label text */}
        {label && (
          <span className="text-sm font-bold text-mobi-text font-sans tracking-tight select-none group-hover:text-mobi-text/90 transition-colors">
            {label}
          </span>
        )}
      </label>

      {/* Description */}
      {description && !error && (
        <p id={descId} className="text-xs text-mobi-text-muted font-medium pl-7 font-sans">
          {description}
        </p>
      )}

      {/* Error */}
      {error && (
        <p id={errId} role="alert" className="text-xs font-bold text-rose-500 pl-7 font-sans flex items-center gap-1">
          <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};
