import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  cn
} from '@wearemobi/ui';

export type MobiDrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export interface MobiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: MobiDrawerPosition;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: string;
  className?: string;
}

export const MobiDrawer: React.FC<MobiDrawerProps> = ({
  isOpen,
  onClose,
  position = 'right',
  title,
  children,
  footer,
  size,
  className,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side={position}
        className={cn(className)}
        style={{
          ...(size && (position === 'left' || position === 'right') ? { maxWidth: size, width: '100%' } : {}),
          ...(size && (position === 'top' || position === 'bottom') ? { maxHeight: size, height: '100%' } : {})
        }}
      >
        {title && (
          <SheetHeader className="border-b pb-4 mb-4">
            <SheetTitle className="text-base font-black uppercase tracking-tight">
              {title}
            </SheetTitle>
          </SheetHeader>
        )}
        
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {footer && (
          <SheetFooter className="mt-4 pt-4 border-t border-border">
            {footer}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
