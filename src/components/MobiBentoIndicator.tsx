import React from 'react';
import { MobiBentoItem } from './MobiBentoGrid';
import { cn } from '@wearemobi/ui';

export interface MobiBentoIndicatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  value: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  valueClassName?: string;
  clickable?: boolean;
}

export const MobiBentoIndicator: React.FC<MobiBentoIndicatorProps> = ({
  title,
  value,
  footer,
  icon,
  className,
  valueClassName,
  ...props
}) => {
  return (
    <MobiBentoItem className={cn("justify-center flex flex-col gap-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-tight">{title}</h3>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
      
      <div className={cn("text-4xl font-black font-mono tracking-tighter", valueClassName)}>
        {value}
      </div>
      
      {footer && (
        <>
          <div className="w-8 h-px bg-border my-2" />
          <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
            {footer}
          </div>
        </>
      )}
    </MobiBentoItem>
  );
};
