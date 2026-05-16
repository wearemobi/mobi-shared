import React, { useState, useCallback, useEffect } from 'react';
import { MobiIcon } from './MobiIcon';

/** Visual severity of the alert notification. */
export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface MobiAlertProps {
  /** Optional micro-label displayed above the message. */
  title?: string;
  /** Main notification text. */
  message: string;
  /** Visual severity — controls icon color and progress bar tint. @default 'info' */
  type?: AlertType;
  /** Called when the alert is dismissed (after exit animation). */
  onClose?: () => void;
  /** If provided, renders a copy-to-clipboard action button. */
  onCopy?: () => void;
  /** Additional CSS classes. */
  className?: string;
  /** Auto-close duration in ms. Set to 0 to disable. @default 5000 */
  duration?: number;
}

/**
 * Animated toast notification with auto-dismiss, type-based icons, and a progress bar.
 * Supports close and copy-to-clipboard actions.
 * Announces itself to screen readers via `role="alert"`.
 *
 * @example
 * ```tsx
 * <MobiAlert
 *   title="Notice"
 *   message="Operation completed."
 *   type="success"
 *   onClose={() => setAlert(null)}
 * />
 * ```
 */
export const MobiAlert: React.FC<MobiAlertProps> = ({
  title,
  message,
  type = 'info',
  onClose,
  onCopy,
  className = '',
  duration = 5000
}) => {
  const [isShowing, setIsShowing] = useState(false);

  // handleClose declared before useEffect to avoid stale-closure risk
  const handleClose = useCallback(() => {
    setIsShowing(false);
    setTimeout(() => onClose?.(), 300); // wait for exit transition
  }, [onClose]);

  useEffect(() => {
    // Trigger entry animation
    const timer = setTimeout(() => setIsShowing(true), 10);

    // Auto close after duration
    let closeTimer: ReturnType<typeof setTimeout>;
    if (duration > 0) {
      closeTimer = setTimeout(handleClose, duration);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [duration, handleClose]);

  const typeColors = {
    info: 'text-blue-500',
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    error: 'text-rose-500',
  };

  const icons = {
    info: <MobiIcon name="info" size={24} strokeWidth={2.5} className={typeColors[type]} />,
    success: <MobiIcon name="success" size={24} strokeWidth={2.5} className={typeColors[type]} />,
    warning: <MobiIcon name="alert" size={24} strokeWidth={2.5} className={typeColors[type]} />,
    error: <MobiIcon name="error" size={24} strokeWidth={2.5} className={typeColors[type]} />,
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`relative flex items-start gap-6 rounded-2xl border border-mobi-border bg-mobi-surface p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out ${isShowing ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'} ${className}`}
    >
      <div className="flex-shrink-0 pt-1.5">
        {icons[type]}
      </div>

      <div className="flex-1 pt-1.5">
        {title && <h4 className="text-[10px] font-black uppercase tracking-widest text-mobi-text-muted mb-2 font-sans">{title}</h4>}
        <p className="text-sm font-bold leading-relaxed text-mobi-text font-sans tracking-tight">{message}</p>
      </div>

      <div className="flex flex-col gap-1">
        {onClose && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 opacity-30 hover:opacity-100 hover:bg-mobi-bg rounded-lg p-2 transition-all active:scale-90"
            aria-label="Dismiss notification"
          >
            <MobiIcon name="close" size={16} strokeWidth={2.5} />
          </button>
        )}
        {onCopy && (
          <button
            onClick={onCopy}
            className="flex-shrink-0 opacity-30 hover:opacity-100 hover:bg-mobi-bg rounded-lg p-2 transition-all active:scale-90"
            aria-label="Copy message to clipboard"
          >
            <MobiIcon name="copy" size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Progress bar for auto-close — requires @keyframes mobi-progress defined in global CSS */}
      {duration > 0 && isShowing && (
        <div className="absolute bottom-0 left-6 right-6 h-[1.5px] overflow-hidden rounded-full bg-mobi-border/10">
          <div
            className={`h-full ${typeColors[type]} bg-current transition-all linear opacity-25`}
            style={{
              animation: `mobi-progress ${duration}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  );
};
