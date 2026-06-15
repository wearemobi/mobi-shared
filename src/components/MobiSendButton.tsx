import React from 'react';
import { MobiButton, MobiButtonProps } from './MobiButton';
import { ArrowUp } from 'lucide-react';
import { cn } from '@wearemobi/ui';

export interface MobiSendButtonProps extends Omit<MobiButtonProps, 'variant' | 'size' | 'children'> {
  isActive?: boolean;
}

export const MobiSendButton = React.forwardRef<HTMLButtonElement, MobiSendButtonProps>(
  ({ isActive, className, ...props }, ref) => {
    return (
      <MobiButton
        ref={ref}
        variant={isActive ? "solid" : "secondary"}
        size="icon"
        className={cn(
          "rounded-full w-8 h-8 transition-all duration-200",
          isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "opacity-50",
          className
        )}
        {...props}
      >
        <ArrowUp className="w-4 h-4" />
      </MobiButton>
    );
  }
);
MobiSendButton.displayName = 'MobiSendButton';
