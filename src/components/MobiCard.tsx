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
}

/**
 * M.O.B.I.™ Standard Asset Container.
 * A premium card component with specialized header and technical footer.
 * Extends all standard `div` HTML attributes.
 *
 * @example
 * ```tsx
 * <MobiCard title="System Logs">
 *   <p>All systems operational.</p>
 * </MobiCard>
 * ```
 */
export const MobiCard: React.FC<MobiCardProps> = ({ title, children, className = '', footer, ...props }) => {
  return (
    <div
      className={`
        bg-mobi-surface border border-mobi-border rounded-2xl overflow-hidden
        shadow-xl ring-1 ring-black/5 transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-mobi-border/50 bg-mobi-bg/30">
          <h3 className="text-sm font-bold tracking-tight text-mobi-text">
            {title}
          </h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-3 bg-mobi-bg/50 border-t border-mobi-border/50 flex justify-between items-center">
          <div className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-widest font-sans">
            {footer}
          </div>
        </div>
      )}
    </div>
  );
};
