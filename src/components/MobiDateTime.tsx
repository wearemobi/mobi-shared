import React from 'react';
import { MobiIcon } from './MobiIcon';

export interface MobiDateTimeProps {
  /** The date to display. Can be a Date object, timestamp, or ISO string. */
  value: Date | string | number;
  /**
   * Display mode. 
   * @default 'datetime'
   */
  mode?: 'date' | 'time' | 'datetime';
  /**
   * Optional custom format string. Supports:
   * YYYY, YY, MM, DD, HH, mm, ss, A (AM/PM)
   * If not provided, falls back to the system locale format.
   */
  format?: string;
  /** Size of the display. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Optional click handler for interaction */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Additional container classes */
  className?: string;
  /** Whether to show the leading icon. @default true */
  showIcon?: boolean;
}

/**
 * MobiDateTime
 * A standardized component for displaying dates and times with built-in
 * formatting capabilities, sizing, and interaction support.
 */
export const MobiDateTime: React.FC<MobiDateTimeProps> = ({
  value,
  mode = 'datetime',
  format,
  size = 'md',
  onClick,
  className = '',
  showIcon = true,
}) => {
  // Parse the input value into a valid Date object
  const dateObj = value instanceof Date ? value : new Date(value);

  // Check if date is valid
  const isValidDate = !isNaN(dateObj.getTime());

  // Formatter fallback logic
  const getFormattedString = (): string => {
    if (!isValidDate) return 'Invalid Date';

    if (format) {
      // Lightweight custom formatter
      const pad = (n: number) => n.toString().padStart(2, '0');
      const YYYY = dateObj.getFullYear().toString();
      const YY = YYYY.slice(-2);
      const M = dateObj.getMonth() + 1;
      const MM = pad(M);
      const D = dateObj.getDate();
      const DD = pad(D);
      const H24 = dateObj.getHours();
      const HH = pad(H24);
      const m = dateObj.getMinutes();
      const mm = pad(m);
      const s = dateObj.getSeconds();
      const ss = pad(s);
      const A = H24 >= 12 ? 'PM' : 'AM';

      return format
        .replace(/YYYY/g, YYYY)
        .replace(/YY/g, YY)
        .replace(/MM/g, MM)
        .replace(/DD/g, DD)
        .replace(/HH/g, HH)
        .replace(/mm/g, mm)
        .replace(/ss/g, ss)
        .replace(/A/g, A);
    }

    // System formatting fallback based on mode
    const locale = undefined; // use system locale
    if (mode === 'date') {
      return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(dateObj);
    }
    if (mode === 'time') {
      return new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(dateObj);
    }
    
    // datetime
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(dateObj);
  };

  const displayString = getFormattedString();

  // Determine Icon based on mode
  const getIconName = () => {
    if (mode === 'time') return 'time';
    if (mode === 'date') return 'calendar';
    return 'calendar';
  };

  // Sizing definitions
  const sizeClasses = {
    sm: {
      text: 'text-xs',
      padding: 'px-2 py-1',
      iconSize: 12,
      gap: 'gap-1.5'
    },
    md: {
      text: 'text-sm',
      padding: 'px-3 py-1.5',
      iconSize: 16,
      gap: 'gap-2'
    },
    lg: {
      text: 'text-base font-bold',
      padding: 'px-4 py-2',
      iconSize: 20,
      gap: 'gap-2.5'
    }
  };

  const selectedSize = sizeClasses[size];

  const interactableClasses = onClick 
    ? 'cursor-pointer hover:bg-mobi-border/50 hover:border-mobi-primary/50 transition-colors active:scale-[0.98]' 
    : '';

  return (
    <div 
      className={`
        inline-flex items-center rounded-lg border border-mobi-border bg-mobi-surface text-mobi-text font-mono
        ${selectedSize.padding} ${selectedSize.gap} ${interactableClasses} ${className}
      `}
      onClick={onClick}
    >
      {showIcon && (
        <MobiIcon 
          name={getIconName()} 
          size={selectedSize.iconSize} 
          className="text-mobi-text-muted shrink-0" 
        />
      )}
      <span className={`${selectedSize.text} leading-none tracking-tight`}>
        {displayString}
      </span>
    </div>
  );
};

export default MobiDateTime;
