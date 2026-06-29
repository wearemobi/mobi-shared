import React from 'react';
import { cn } from '@wearemobi/ui';

export interface MobiSectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  size?: 'sm' | 'default' | 'lg';
}

export const MobiSectionHeader = React.forwardRef<HTMLDivElement, MobiSectionHeaderProps>(
  ({ title, description, action, size = 'default', className, ...props }, ref) => {
    
    const sizeClasses = {
      sm: 'text-lg',
      default: 'text-2xl',
      lg: 'text-3xl sm:text-4xl',
    };

    return (
      <div 
        ref={ref} 
        className={cn("flex flex-row items-start sm:items-center justify-between gap-4 w-full mb-6", className)}
        {...props}
      >
        <div className="space-y-1.5 flex-1 min-w-0">
          <h2 className={cn(
            "font-black tracking-tight text-foreground leading-tight", 
            sizeClasses[size]
          )}>
            {title}
          </h2>
          {description && (
            <div className="text-sm text-muted-foreground font-medium max-w-2xl">
              {description}
            </div>
          )}
        </div>
        {action && (
          <div className="flex items-center gap-3 shrink-0">
            {action}
          </div>
        )}
      </div>
    );
  }
);

MobiSectionHeader.displayName = 'MobiSectionHeader';
