import React from 'react';
import { useAutoDismiss } from '../hooks/useAutoDismiss';
import { cn } from '@wearemobi/ui';
import { cva } from 'class-variance-authority';
import { Info, CheckCircle2, AlertTriangle, XCircle, X, Copy } from 'lucide-react';

const alertVariants = cva(
  "relative flex items-start gap-4 rounded-2xl border p-4 shadow-sm transition-all duration-300 ease-out",
  {
    variants: {
      type: {
        info: "text-info bg-info/10 border-info/20",
        success: "text-success bg-success/10 border-success/20",
        warning: "text-warning bg-warning/10 border-warning/20",
        error: "text-error bg-error/10 border-error/20",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface MobiAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'type' | 'title'> {
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
  className,
  duration = 0,
  ...props
}) => {
  const { isShowing, handleClose } = useAutoDismiss(duration, onClose);

  const icons = {
    info: <Info className="h-6 w-6 text-info" />,
    success: <CheckCircle2 className="h-6 w-6 text-success" />,
    warning: <AlertTriangle className="h-6 w-6 text-warning" />,
    error: <XCircle className="h-6 w-6 text-error" />,
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        alertVariants({ type }),
        isShowing ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95',
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0 pt-0.5">
        {icons[type ?? 'info']}
      </div>

      <div className="flex-1 pt-0.5 min-w-0">
        {title && <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">{title}</h4>}
        <p className="text-sm font-medium leading-relaxed tracking-tight">{message}</p>
      </div>

      <div className="flex flex-col gap-1">
        {onClose && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg p-1.5 transition-all"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {onCopy && (
          <button
            onClick={onCopy}
            className="flex-shrink-0 opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg p-1.5 transition-all"
            aria-label="Copy"
          >
            <Copy className="h-4 w-4" />
          </button>
        )}
      </div>

      {duration > 0 && isShowing && (
        <div className="absolute bottom-0 left-4 right-4 h-[2px] overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
          <div
            className="h-full bg-current transition-all linear opacity-50"
            style={{
              animation: `mobi-progress ${duration}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  );
};
