import React from 'react';

export interface MobiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional title rendered in the card header.
   */
  title?: string;
  /**
   * The content to render inside the card.
   */
  children: React.ReactNode;
  /**
   * Optional footer content. If omitted, the footer bar is not rendered.
   */
  footer?: React.ReactNode;
  /**
   * Color variant of the card matching the M.O.B.I.™ palette.
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'tactical';
}

/**
 * M.O.B.I.™ Standard Asset Container.
 * A premium card component with specialized header and technical footer.
 * Extends all standard `div` HTML attributes.
 *
 * @example
 * ```tsx
 * <MobiCard title="System Logs" variant="primary">
 *   <p>All systems operational.</p>
 * </MobiCard>
 * ```
 */
export const MobiCard: React.FC<MobiCardProps> = ({ 
  title, 
  children, 
  className = '', 
  footer, 
  variant = 'default',
  ...props 
}) => {
  const variantStyles = {
    default: 'bg-mobi-surface border-mobi-border text-mobi-text',
    primary: 'bg-mobi-surface border-mobi-primary/30 text-mobi-text shadow-xl',
    accent: 'bg-blue-50/50 border-blue-200 text-mobi-text dark:bg-blue-950/10 dark:border-blue-900/50',
    success: 'bg-emerald-50/50 border-emerald-200 text-mobi-text dark:bg-emerald-950/10 dark:border-emerald-900/50',
    warning: 'bg-amber-50/50 border-amber-200 text-mobi-text dark:bg-amber-950/10 dark:border-amber-900/50',
    danger: 'bg-red-50/50 border-red-200 text-mobi-text dark:bg-red-950/10 dark:border-red-900/50',
    tactical: 'bg-slate-900 border-slate-800 text-slate-100 dark:bg-zinc-950 dark:border-zinc-800/80',
  };

  return (
    <div
      className={`
        border rounded-2xl overflow-hidden
        shadow-xl ring-1 ring-black/5 transition-all duration-300
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {title && (
        <div className={`px-6 py-4 border-b bg-mobi-bg/30 ${variant === 'tactical' ? 'border-slate-800 bg-slate-950/30' : 'border-mobi-border/50'}`}>
          <h3 className={`text-sm font-bold tracking-tight ${variant === 'tactical' ? 'text-slate-100' : 'text-mobi-text'}`}>
            {title}
          </h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className={`px-6 py-3 border-t flex justify-between items-center ${variant === 'tactical' ? 'bg-slate-950/50 border-slate-800' : 'bg-mobi-bg/50 border-mobi-border/50'}`}>
          <div className={`text-[10px] font-bold uppercase tracking-widest font-sans ${variant === 'tactical' ? 'text-slate-400' : 'text-mobi-text-muted'}`}>
            {footer}
          </div>
        </div>
      )}
    </div>
  );
};
