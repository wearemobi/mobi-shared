import React from 'react';

export interface MobiProgressProps {
  /**
   * Current progress percentage (0-100).
   */
  value: number;
  /**
   * Optional label shown above the bar.
   */
  label?: string;
  /**
   * Optional sub-label or status text shown below the bar.
   */
  status?: string;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * If true, uses a thinner, more technical appearance.
   * @default false
   */
  technical?: boolean;
}

/**
 * M.O.B.I.™ Standard Progress Indicator.
 * High-precision progress bar for monitoring ingestion and processing tasks.
 * Fully accessible via `role="progressbar"` and ARIA value attributes.
 *
 * @example
 * ```tsx
 * <MobiProgress value={45} label="Uploading..." status="4.2MB / 10MB" />
 * ```
 */
export const MobiProgress: React.FC<MobiProgressProps> = ({
  value,
  label,
  status,
  className = "",
  technical = false
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || status) && (
        <div className="flex justify-between items-end mb-2 px-1">
          {label && (
            <span className="text-[10px] font-black uppercase tracking-widest text-mobi-text">
              {label}
            </span>
          )}
          {status && (
            <span className="text-[10px] font-bold font-mono text-mobi-text-muted">
              {status}
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
        className={`
          relative w-full overflow-hidden bg-mobi-bg border border-mobi-border
          ${technical ? 'h-1.5 rounded-sm' : 'h-3 rounded-lg'}
        `}
      >
        <div
          className="h-full bg-mobi-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle stripe pattern for movement feeling */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[mobi-progress_2s_linear_infinite]" />
        </div>
      </div>

      <div className="flex justify-end mt-1 px-1">
        <span className="text-[10px] font-black font-mono text-mobi-text" aria-hidden="true">
          {percentage}%
        </span>
      </div>
    </div>
  );
};
