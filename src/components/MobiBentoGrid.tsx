import React from 'react';
import { cn } from '@wearemobi/ui';

export interface MobiBentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MobiBentoGrid: React.FC<MobiBentoGridProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface MobiBentoItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  clickable?: boolean;
}

export const MobiBentoItem: React.FC<MobiBentoItemProps> = ({
  className,
  title,
  description,
  children,
  icon,
  leading,
  trailing,
  footer,
  clickable,
  ...props
}) => {
  const isClickable = clickable ?? !!props.onClick;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      props.onClick?.(e as any);
    }
    props.onKeyDown?.(e);
  };

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative rounded-3xl group/bento transition-all duration-500 p-6 sm:p-8 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none",
        isClickable && "cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Subtle radial glow on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-200/50 to-transparent dark:from-white/[0.04] opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col flex-1 h-full">
        
        {/* Header */}
        {(title || leading || trailing || icon) && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {leading && <div className="text-muted-foreground flex items-center">{leading}</div>}
              {title && <h3 className="font-bold text-foreground tracking-tight">{title}</h3>}
            </div>
            {(trailing || icon) && (
              <div className="text-muted-foreground flex items-center gap-2">
                {trailing || icon}
              </div>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 flex flex-col">
          {description && (
            <div className="font-medium text-muted-foreground text-sm leading-relaxed mb-4">
              {description}
            </div>
          )}
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-6 pt-4 border-t border-border/50 text-xs font-medium text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
