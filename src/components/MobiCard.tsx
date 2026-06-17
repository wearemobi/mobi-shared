import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, cn } from '@wearemobi/ui';

export interface MobiCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional title rendered in the card header. */
  title?: React.ReactNode;
  /** Optional leading icon or element before the title. */
  leading?: React.ReactNode;
  /** Optional trailing actions or element after the title. */
  trailing?: React.ReactNode;
  /** The content to render inside the card. */
  children: React.ReactNode;
  /** Optional footer content. If omitted, the footer bar is not rendered. */
  footer?: React.ReactNode;
  /** Color variant of the card matching the M.O.B.I.™ palette. */
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'danger' | 'tactical';
}

const variantStyles = {
  default: '',
  primary: 'border-l-4 border-l-primary shadow-xl ring-0',
  accent: 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20',
  success: 'border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20',
  warning: 'border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20',
  error: 'border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20',
  danger: 'border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20',
  tactical: 'bg-slate-900 border-slate-800 text-slate-100 dark:bg-zinc-950 dark:border-zinc-800/80',
};

const MobiCardBase: React.FC<MobiCardProps> = ({ 
  title, 
  leading,
  trailing,
  children, 
  className, 
  footer, 
  variant = 'default',
  ...props 
}) => {
  return (
    <Card
      className={cn(
        "rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 transition-all duration-300",
        variantStyles[variant],
        className
      )}
      {...(props as any)}
    >
      {(title || leading || trailing) && (
        <MobiCardHeader className={cn("flex flex-row items-center justify-between space-y-0", variant === 'tactical' ? 'border-slate-800 bg-slate-950/30' : '')}>
          <div className="flex items-center gap-3">
            {leading}
            {title && (
              <h3 className={cn("text-sm font-bold tracking-tight", variant === 'tactical' ? 'text-slate-100' : 'text-foreground')}>
                {title}
              </h3>
            )}
          </div>
          {trailing && (
            <div className="flex items-center gap-2">
              {trailing}
            </div>
          )}
        </MobiCardHeader>
      )}
      <MobiCardContent>
        {children}
      </MobiCardContent>
      {footer && (
        <MobiCardFooter className={cn(variant === 'tactical' ? 'bg-slate-950/50 border-slate-800' : '')}>
          <div className={cn("text-[10px] font-bold uppercase tracking-widest font-sans", variant === 'tactical' ? 'text-slate-400' : 'text-muted-foreground')}>
            {footer}
          </div>
        </MobiCardFooter>
      )}
    </Card>
  );
};

export const MobiCardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <CardHeader className={cn("px-6 py-4 border-b border-border/50 bg-background/30", className)} {...(props as any)} />
);

export const MobiCardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <CardContent className={cn("p-6", className)} {...(props as any)} />
);

export const MobiCardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <CardFooter className={cn("px-6 py-3 border-t bg-background/50 border-border/50 flex justify-between items-center", className)} {...(props as any)} />
);

export const MobiCard = Object.assign(MobiCardBase, {
  Header: MobiCardHeader,
  Content: MobiCardContent,
  Footer: MobiCardFooter
});
