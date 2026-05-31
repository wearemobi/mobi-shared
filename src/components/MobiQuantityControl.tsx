import React from 'react';
import { MobiIcon } from './MobiIcon';

export interface MobiQuantityControlProps {
  /** The current quantity value. */
  value: number;
  /** Called when the value changes (either by +/- buttons). */
  onChange: (value: number) => void;
  /**
   * The minimum allowed value.
   * @default 0
   */
  min?: number;
  /**
   * The maximum allowed value.
   */
  max?: number;
  /**
   * The step amount to increment or decrement by.
   * @default 1
   */
  step?: number;
  /**
   * If true, the minus ("-") button will not be rendered when the value is less than or equal to `min`.
   * @default false
   */
  hideMinusAtMin?: boolean;
  /** Additional CSS classes for the container. */
  className?: string;
  /**
   * Visual size of the control.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * M.O.B.I.™ Quantity Control Component.
 * A customizable +/- control for adjusting quantities, such as in a shopping cart.
 *
 * @example
 * ```tsx
 * const [qty, setQty] = useState(1);
 * 
 * <MobiQuantityControl
 *   value={qty}
 *   onChange={setQty}
 *   min={0}
 *   hideMinusAtMin={true}
 * />
 * ```
 */
export const MobiQuantityControl: React.FC<MobiQuantityControlProps> = ({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  hideMinusAtMin = false,
  className = '',
  size = 'md',
}) => {
  const handleDecrement = () => {
    const nextValue = value - step;
    if (nextValue >= min) {
      onChange(nextValue);
    }
  };

  const handleIncrement = () => {
    const nextValue = value + step;
    if (max === undefined || nextValue <= max) {
      onChange(nextValue);
    }
  };

  const isMinusDisabled = value <= min;
  const isPlusDisabled = max !== undefined && value >= max;

  const showMinus = !(hideMinusAtMin && isMinusDisabled);

  // Size variations
  const containerSizeClass = {
    sm: 'h-7 px-1 text-xs',
    md: 'h-9 px-1 text-sm',
    lg: 'h-11 px-2 text-base'
  }[size];

  const buttonSizeClass = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-8 h-8'
  }[size];

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16
  }[size];

  const buttonBaseClass = `
    inline-flex items-center justify-center rounded-md
    text-mobi-text hover:bg-mobi-surface-hover hover:text-mobi-primary
    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-mobi-text
    transition-colors flex-shrink-0 cursor-pointer outline-none
  `;

  return (
    <div className={`inline-flex items-center border border-mobi-border bg-mobi-surface rounded-lg font-sans ${containerSizeClass} ${className}`}>
      {showMinus ? (
        <button
          type="button"
          onClick={handleDecrement}
          disabled={isMinusDisabled}
          className={`${buttonBaseClass} ${buttonSizeClass}`}
          aria-label="Decrease quantity"
        >
          <MobiIcon name="minus" size={iconSize} strokeWidth={2.5} />
        </button>
      ) : (
        // Placeholder to maintain width if we hide the minus button
        <div className={buttonSizeClass} aria-hidden="true" />
      )}

      <div className="flex-1 text-center font-medium min-w-[2ch] px-2 text-mobi-text selection:bg-mobi-primary/20">
        {value}
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={isPlusDisabled}
        className={`${buttonBaseClass} ${buttonSizeClass}`}
        aria-label="Increase quantity"
      >
        <MobiIcon name="plus" size={iconSize} strokeWidth={2.5} />
      </button>
    </div>
  );
};
