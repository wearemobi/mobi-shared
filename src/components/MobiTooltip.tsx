import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@wearemobi/ui';

export interface MobiTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
}

export const MobiTooltip: React.FC<MobiTooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 200,
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className="text-[11px] font-bold tracking-tight bg-foreground text-background rounded-md px-2.5 py-1.5">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
