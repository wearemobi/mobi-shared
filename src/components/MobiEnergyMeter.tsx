import React from 'react';

export interface MobiEnergyMeterProps {
  /**
   * Current energy/battery level (0-100).
   */
  value: number;
  /**
   * If true, shows the percentage text next to the meter.
   * @default true
   */
  showPercentage?: boolean;
  /**
   * Additional CSS classes for the container.
   */
  className?: string;
  /**
   * Size variant of the meter.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * M.O.B.I.™ Standard Energy Meter.
 * A high-visibility battery indicator for monitoring system power and resource consumption.
 * 
 * @example
 * ```tsx
 * <MobiEnergyMeter value={45} size="lg" />
 * ```
 */
export const MobiEnergyMeter: React.FC<MobiEnergyMeterProps> = ({
  value,
  showPercentage = true,
  className = "",
  size = 'md'
}) => {
  const level = Math.min(Math.max(value, 0), 100);

  const getLevelColor = () => {
    if (level > 50) return 'bg-emerald-500';
    if (level > 20) return 'bg-amber-500';
    return 'bg-rose-500 animate-pulse';
  };

  const sizeClasses = {
    sm: { container: 'w-5 h-2.5', pin: '-right-[2px] w-[1px] h-1', text: 'text-[7px]' },
    md: { container: 'w-6 h-3', pin: '-right-[3px] w-[2px] h-1.5', text: 'text-[8px]' },
    lg: { container: 'w-10 h-5 border-2', pin: '-right-[5px] w-[3px] h-2.5', text: 'text-[10px]' }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showPercentage && (
        <span className={`font-black font-mono text-mobi-text-muted opacity-60 ${currentSize.text}`}>
          {level}%
        </span>
      )}
      <div className={`
        relative border border-mobi-text-muted/30 rounded-[2px] p-[1px]
        ${currentSize.container}
      `}>
        <div 
          className={`h-full rounded-[1px] transition-all duration-1000 ${getLevelColor()}`}
          style={{ width: `${level}%` }}
        />
        {/* Battery Pin */}
        <div className={`
          absolute top-1/2 -translate-y-1/2 bg-mobi-text-muted/30 rounded-r-[1px]
          ${currentSize.pin}
        `} />
      </div>
    </div>
  );
};
