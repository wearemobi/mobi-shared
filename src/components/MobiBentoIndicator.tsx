import React from 'react';
import { MobiBentoItem } from './MobiBentoGrid';
import { cn } from '@wearemobi/ui';

export interface MobiBentoIndicatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  value: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  valueClassName?: string;
  clickable?: boolean;
}

export const MobiBentoIndicator: React.FC<MobiBentoIndicatorProps> = ({
  title,
  value,
  footer,
  icon,
  leading,
  trailing,
  className,
  valueClassName,
  ...props
}) => {
  return (
    <MobiBentoItem className={cn("justify-center flex flex-col gap-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {leading && <div className="text-muted-foreground flex items-center">{leading}</div>}
          <h3 className="text-sm font-bold tracking-tight text-muted-foreground">{title}</h3>
        </div>
        {(trailing || icon) && (
          <div className="text-muted-foreground flex items-center gap-2">
            {trailing || icon}
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1">
        <div className={cn("text-3xl font-black font-mono tracking-tighter text-foreground", valueClassName)}>
          {value}
        </div>
        
        {footer && (
          <div className="text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </MobiBentoItem>
  );
};
