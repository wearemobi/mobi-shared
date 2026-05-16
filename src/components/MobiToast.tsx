import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { MobiIcon } from './MobiIcon';
import type { AlertType } from './MobiAlert';

// ─── Toast Data Model ─────────────────────────────────────────────────────────

export interface MobiToastItem {
  id: string;
  message: string;
  title?: string;
  type?: AlertType;
  /** Duration in ms. 0 = persistent. @default 4500 */
  duration?: number;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface MobiToastContextValue {
  addToast: (toast: Omit<MobiToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const MobiToastContext = createContext<MobiToastContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * Wrap your app root (or layout) with `<MobiToastProvider>` to enable
 * toast notifications throughout your component tree.
 *
 * @example
 * ```tsx
 * // App.tsx
 * export default function App() {
 *   return (
 *     <MobiToastProvider>
 *       <Router>...</Router>
 *     </MobiToastProvider>
 *   );
 * }
 * ```
 */
export const MobiToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<MobiToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    clearTimeout(timersRef.current.get(id));
    timersRef.current.delete(id);
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<MobiToastItem, 'id'>): string => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const duration = toast.duration ?? 4500;
    setToasts(prev => [...prev, { ...toast, id }]);

    if (duration > 0) {
      const timer = setTimeout(() => removeToast(id), duration);
      timersRef.current.set(id, timer);
    }
    return id;
  }, [removeToast]);

  const clearAll = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  return (
    <MobiToastContext.Provider value={{ addToast, removeToast, clearAll }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <MobiToastContainer toasts={toasts} onDismiss={removeToast} />,
        document.body
      )}
    </MobiToastContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * M.O.B.I.™ Toast Hook.
 * Provides semantic helpers to dispatch notifications from anywhere in the app.
 * Requires `<MobiToastProvider>` to be mounted above in the tree.
 *
 * @returns `{ toast, dismiss, clearAll }` — dispatch object and controls.
 *
 * @example
 * ```tsx
 * const { toast } = useMobiToast();
 *
 * toast.success('Fleet registered successfully!', 'Operation Complete');
 * toast.error('Connection failed.', 'Network Error');
 * toast.warning('Low energy detected.', 'Warning');
 * toast.info('Sync in progress...', 'Notice');
 * toast.custom({ message: 'Custom', type: 'info', duration: 0 }); // persistent
 * ```
 */
export const useMobiToast = () => {
  const ctx = useContext(MobiToastContext);
  if (!ctx) {
    throw new Error('[useMobiToast] Must be used inside <MobiToastProvider>.');
  }

  const { addToast, removeToast, clearAll } = ctx;

  const toast = {
    success: (message: string, title?: string, duration?: number) =>
      addToast({ message, title, type: 'success', duration }),
    error: (message: string, title?: string, duration?: number) =>
      addToast({ message, title, type: 'error', duration }),
    warning: (message: string, title?: string, duration?: number) =>
      addToast({ message, title, type: 'warning', duration }),
    info: (message: string, title?: string, duration?: number) =>
      addToast({ message, title, type: 'info', duration }),
    custom: (options: Omit<MobiToastItem, 'id'>) =>
      addToast(options),
  };

  return { toast, dismiss: removeToast, clearAll };
};

// ─── Container ───────────────────────────────────────────────────────────────

interface MobiToastContainerProps {
  toasts: MobiToastItem[];
  onDismiss: (id: string) => void;
}

const TYPE_ICON: Record<AlertType, React.ReactNode> = {
  success: <MobiIcon name="success" size={20} strokeWidth={2.5} className="text-emerald-500 shrink-0" />,
  error: <MobiIcon name="error" size={20} strokeWidth={2.5} className="text-rose-500 shrink-0" />,
  warning: <MobiIcon name="alert" size={20} strokeWidth={2.5} className="text-amber-500 shrink-0" />,
  info: <MobiIcon name="info" size={20} strokeWidth={2.5} className="text-blue-400 shrink-0" />,
};

const TYPE_BAR: Record<AlertType, string> = {
  success: 'bg-emerald-500',
  error: 'bg-rose-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-400',
};

const MobiToastContainer: React.FC<MobiToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-4 right-4 z-[10000] flex flex-col gap-3 pointer-events-none"
    >
      {toasts.map(t => (
        <div
          key={t.id}
          role="alert"
          className="pointer-events-auto relative flex items-start gap-3 w-80 bg-mobi-surface border border-mobi-border rounded-xl shadow-2xl p-4 pr-10 overflow-hidden animate-in slide-in-from-right-4 fade-in duration-300"
        >
          {/* Type icon */}
          <div className="pt-0.5">{TYPE_ICON[t.type ?? 'info']}</div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {t.title && (
              <p className="text-[10px] font-black uppercase tracking-widest text-mobi-text-muted font-sans mb-0.5">
                {t.title}
              </p>
            )}
            <p className="text-sm font-bold text-mobi-text font-sans leading-snug">
              {t.message}
            </p>
          </div>

          {/* Dismiss */}
          <button
            onClick={() => onDismiss(t.id)}
            className="absolute top-3 right-3 text-mobi-text-muted/50 hover:text-mobi-text transition-colors rounded"
            aria-label="Dismiss notification"
          >
            <MobiIcon name="close" size={14} strokeWidth={2.5} />
          </button>

          {/* Color accent bar */}
          <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${TYPE_BAR[t.type ?? 'info']}`} />
        </div>
      ))}
    </div>
  );
};
