import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  cn
} from '@wearemobi/ui';

export type MobiModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface MobiModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: MobiModalSize;
  closeOnOverlay?: boolean;
  className?: string;
}

const SIZE_MAP: Record<MobiModalSize, string> = {
  sm: 'sm:!max-w-sm',
  md: 'sm:!max-w-lg',
  lg: 'sm:!max-w-2xl',
  xl: 'sm:!max-w-4xl',
  full: 'w-screen h-screen !max-w-none m-0 rounded-none'
};

export const MobiModal: React.FC<MobiModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  className,
}) => {
  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent 
        className={cn(
          SIZE_MAP[size],
          size === 'full' ? 'border-none flex flex-col' : '',
          className
        )}
        onInteractOutside={(e) => {
          if (!closeOnOverlay) {
            e.preventDefault();
          }
        }}
      >
        {title || description ? (
          <DialogHeader className={size === 'full' ? 'px-6 py-4 border-b' : ''}>
            {title ? (
              <DialogTitle className="text-base font-black tracking-tight uppercase">
                {title}
              </DialogTitle>
            ) : (
              <DialogTitle className="sr-only">Modal</DialogTitle>
            )}
            {description && (
              <DialogDescription className="font-medium mt-1">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        ) : (
          <DialogTitle className="sr-only">Modal</DialogTitle>
        )}
        
        {children && (
          <div className={cn(
            "text-sm leading-relaxed", 
            size === 'full' ? 'px-6 py-5 overflow-y-auto flex-1' : ''
          )}>
            {children}
          </div>
        )}

        {footer && (
          <DialogFooter className={size === 'full' ? 'px-6 py-4 border-t bg-muted/30 mt-auto' : 'mt-4 sm:justify-start'}>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
