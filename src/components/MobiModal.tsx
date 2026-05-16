import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MobiIcon } from './MobiIcon';

export type MobiModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface MobiModalProps {
  /** Controls visibility. */
  isOpen: boolean;
  /** Called when the modal should close (Escape key, overlay click, or close button). */
  onClose: () => void;
  /** Optional header title. */
  title?: string;
  /** Optional subtitle shown below the title. */
  description?: string;
  /** Modal body content. */
  children?: React.ReactNode;
  /** Footer content — typically action buttons. */
  footer?: React.ReactNode;
  /**
   * Width preset.
   * @default 'md'
   */
  size?: MobiModalSize;
  /**
   * If true, clicking the overlay backdrop closes the modal.
   * @default true
   */
  closeOnOverlay?: boolean;
  /** Additional CSS classes for the modal panel. */
  className?: string;
}

const SIZE_MAP: Record<MobiModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
};

/**
 * M.O.B.I.™ Modal / Dialog.
 * Renders via a React portal at the document root to escape z-index stacking.
 * Accessible: traps focus within the modal, closes on Escape key,
 * locks body scroll, and announces itself via `role="dialog"`.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <MobiButton onClick={() => setOpen(true)}>Open</MobiButton>
 *
 * <MobiModal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm Action"
 *   description="This action cannot be undone."
 *   footer={
 *     <div className="flex justify-end gap-3">
 *       <MobiButton variant="ghost" onClick={() => setOpen(false)}>Cancel</MobiButton>
 *       <MobiButton variant="danger" onClick={handleConfirm}>Delete</MobiButton>
 *     </div>
 *   }
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </MobiModal>
 * ```
 */
export const MobiModal: React.FC<MobiModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  className = ''
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Lock body scroll and capture previous focus
  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    // Auto-focus the panel
    const frame = requestAnimationFrame(() => {
      panelRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
      previousFocus.current?.focus();
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Basic focus trap: keep Tab/Shift+Tab inside the modal
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === e.currentTarget) onClose();
  }, [closeOnOverlay, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleOverlayClick}
      role="presentation"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'mobi-modal-title' : undefined}
        aria-describedby={description ? 'mobi-modal-description' : undefined}
        tabIndex={-1}
        className={`
          relative z-10 w-full ${SIZE_MAP[size]} bg-mobi-surface border border-mobi-border
          rounded-2xl shadow-2xl ring-1 ring-black/10 flex flex-col
          animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] outline-none
          ${className}
        `}
      >
        {/* Header */}
        {(title || description) && (
          <div className="px-6 py-5 border-b border-mobi-border/50 flex items-start justify-between gap-4">
            <div>
              {title && (
                <h2
                  id="mobi-modal-title"
                  className="text-base font-black tracking-tight text-mobi-text uppercase font-sans"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="mobi-modal-description"
                  className="text-xs text-mobi-text-muted font-medium mt-1 font-sans"
                >
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-2 rounded-lg text-mobi-text-muted hover:text-mobi-text hover:bg-mobi-surface-hover transition-colors"
              aria-label="Close dialog"
            >
              <MobiIcon name="close" size={16} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Body */}
        {children && (
          <div className="px-6 py-5 overflow-y-auto flex-1 text-sm text-mobi-text font-sans leading-relaxed">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-mobi-border/50 bg-mobi-bg/30 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
export default MobiModal;
