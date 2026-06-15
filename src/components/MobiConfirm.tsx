import React from 'react';
import { MobiModal } from './MobiModal';
import { MobiButton } from './MobiButton';

export interface MobiConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: React.ReactNode;
  message?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  intent?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

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
      open={isOpen}
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
      {title && typeof title !== 'string' && (
        <div className="mb-4 text-base font-black tracking-tight uppercase">
          {title}
        </div>
      )}
      {message && (
        <div className="text-sm leading-relaxed text-muted-foreground">
          {message}
        </div>
      )}
    </MobiModal>
  );
};
