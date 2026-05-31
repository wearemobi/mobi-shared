import React from 'react';
import { MobiBentoItem, MobiBentoItemProps } from './MobiBentoGrid';

export interface MobiBentoIndicatorProps extends Omit<MobiBentoItemProps, 'children'> {
  /** Optional title shown at the top */
  title?: React.ReactNode;
  /** The main large value to display */
  value: React.ReactNode;
  /** Optional icon to display on the right side */
  icon?: React.ReactNode;
  /** Optional footer text or node shown at the bottom */
  footer?: React.ReactNode;
  /** Custom color class for the value text (e.g. 'text-emerald-500') */
  valueColorClass?: string;
}

/**
 * MobiBentoIndicator
 * A specialized Bento component for dashboard indicators and metrics.
 * Easily replicate premium metrics cards with values, titles, and icons.
 */
export const MobiBentoIndicator: React.FC<MobiBentoIndicatorProps> = ({
  title,
  value,
  icon,
  footer,
  valueColorClass = 'text-mobi-text',
  className = '',
  ...props
}) => {
  return (
    <MobiBentoItem 
      className={`min-h-[100px] flex flex-col justify-between ${className}`} 
      {...props}
    >
      {/* Top Section: Title (if present) and optionally Icon if we want it top-right */}
      {(title || icon) && (
        <div className="flex justify-between items-start mb-2">
          {title ? (
            <div className="text-sm font-bold text-mobi-text tracking-tight">{title}</div>
          ) : (
            <div /> // Spacer if no title but icon exists
          )}
          {icon && (
            <div className="text-mobi-text-muted">
              {icon}
            </div>
          )}
        </div>
      )}

      {/* Middle Section: Main Value */}
      <div className={`text-3xl font-black font-mono tracking-tight my-auto ${valueColorClass}`}>
        {value}
      </div>

      {/* Bottom Section: Footer / Sublabel */}
      {footer && (
        <div className="mt-4 text-[10px] uppercase font-bold text-mobi-text-muted tracking-widest">
          {footer}
        </div>
      )}
    </MobiBentoItem>
  );
};

export default MobiBentoIndicator;
