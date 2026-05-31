import React from 'react';
import { MobiModal } from './MobiModal';
import { MobiButton } from './MobiButton';

export interface MobiConfirmProps {
  /** Controls visibility of the confirmation dialog. */
  isOpen: boolean;
  /** Called when the dialog is closed without confirming (e.g. Cancel clicked, Escape key, overlay click). */
  onClose: () => void;
  /** Called when the confirmation button is clicked. */
  onConfirm: () => void;
  /** The title of the dialog. */
  title?: React.ReactNode;
  /** The message/body of the dialog. */
  message?: React.ReactNode;
  /**
   * Text for the confirmation button.
   * @default "Yes"
   */
  confirmText?: string;
  /**
   * Text for the cancellation button.
   * @default "No"
   */
  cancelText?: string;
  /**
   * Intent of the confirmation action, affects the confirm button color.
   * 'danger' makes the button red (e.g. for delete actions).
   * @default "info"
   */
  intent?: 'danger' | 'warning' | 'info';
  /**
   * If true, shows a loading spinner on the confirm button.
   * @default false
   */
  isLoading?: boolean;
}

/**
 * M.O.B.I.™ Confirm Dialog Component.
 * A streamlined wrapper around `MobiModal` for simple Yes/No confirmation flows.
 *
 * @example
 * ```tsx
 * <MobiConfirm
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={handleDelete}
 *   title="Delete Item"
 *   message="Are you sure you want to delete this item? This action cannot be undone."
 *   confirmText="Delete"
 *   cancelText="Cancel"
 *   intent="danger"
 * />
 * ```
 */
export const MobiConfirm: React.FC<MobiConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Yes",
  cancelText = "No",
  intent = "info",
  isLoading = false,
}) => {
  const confirmVariant = intent === 'danger' ? 'danger' : 'solid';

  return (
    <MobiModal
      isOpen={isOpen}
      onClose={onClose}
      title={typeof title === 'string' ? title : undefined}
      size="sm"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <MobiButton
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </MobiButton>
          <MobiButton
            variant={confirmVariant}
            onClick={onConfirm}
            loading={isLoading}
          >
            {confirmText}
          </MobiButton>
        </div>
      }
    >
      {/* If title is not a string, we render it here since MobiModal only accepts string titles */}
      {title && typeof title !== 'string' && (
        <div className="mb-4 text-base font-black tracking-tight text-mobi-text uppercase font-sans">
          {title}
        </div>
      )}
      {message && (
        <div className="text-sm text-mobi-text font-sans leading-relaxed">
          {message}
        </div>
      )}
    </MobiModal>
  );
};
