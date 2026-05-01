import React, { useState, useEffect } from 'react';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface MobiAlertProps {
  title?: string;
  message: string;
  type?: AlertType;
  onClose?: () => void;
  onCopy?: () => void;
  className?: string;
  duration?: number;
}

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

  useEffect(() => {
    // Trigger entry animation
    const timer = setTimeout(() => setIsShowing(true), 10);
    
    // Auto close after duration
    let closeTimer: ReturnType<typeof setTimeout>;
    if (duration > 0) {
      closeTimer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      clearTimeout(timer);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, []);

  const handleClose = () => {
    setIsShowing(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // Wait for transition
  };

  const typeColors = {
    info: 'text-blue-500',
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    error: 'text-rose-500',
  };

  const icons = {
    info: (
      <svg className={`h-6 w-6 ${typeColors[type]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg className={`h-6 w-6 ${typeColors[type]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className={`h-6 w-6 ${typeColors[type]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    error: (
      <svg className={`h-6 w-6 ${typeColors[type]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className={`relative flex items-start gap-6 rounded-2xl border border-mobi-border bg-mobi-surface p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out ${isShowing ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'} ${className}`}>
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
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {onCopy && (
          <button 
            onClick={onCopy}
            className="flex-shrink-0 opacity-30 hover:opacity-100 hover:bg-mobi-bg rounded-lg p-2 transition-all active:scale-90"
            aria-label="Copy message"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        )}
      </div>

      {/* Progress bar for auto-close */}
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
