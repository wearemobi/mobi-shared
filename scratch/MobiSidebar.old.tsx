import React, { useEffect } from 'react';
import { MobiLogo } from './MobiLogo';
import { MobiIcon } from './MobiIcon';

export interface MobiSidebarProps {
  /**
   * Whether the sidebar is visible (mainly for mobile).
   * @default false
   */
  isOpen: boolean;
  /**
   * Callback to close the sidebar.
   */
  onClose: () => void;
  /**
   * Optional title or branding to show at the top.
   * @default <MobiLogo size={32} />
   */
  title?: React.ReactNode;
  /**
   * Navigation items or main content.
   */
  children: React.ReactNode;
  /**
   * Optional footer content (e.g., version info, logout).
   */
  footer?: React.ReactNode;
  /**
   * Optional action elements inside the footer.
   */
  footerActions?: React.ReactNode;
  /**
   * Whether the sidebar can be collapsed on all viewports.
   * @default false
   */
  collapsible?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * M.O.B.I.™ Sidebar Component.
 * Responsive navigation drawer that is permanent on desktop (lg+) 
 * and an overlay drawer on mobile/tablet.
 */
export const MobiSidebar: React.FC<MobiSidebarProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  footerActions,
  collapsible = false,
  className = ""
}) => {
  // Prevent scrolling when mobile/collapsible sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Mobile/Collapsible Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          collapsible ? "" : "lg:hidden"
        } ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-mobi-border bg-mobi-surface transition-transform duration-300 ease-in-out ${
          collapsible ? "" : "lg:translate-x-0"
        } ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${className}`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-mobi-border/50">
          <div className="flex items-center gap-3">
            {title || <MobiLogo size={28} />}
          </div>
          <button 
            onClick={onClose}
            className={`h-10 w-10 flex items-center justify-center text-mobi-text-muted hover:text-mobi-text hover:bg-mobi-surface rounded-xl transition-all ${
              collapsible ? "" : "lg:hidden"
            }`}
            aria-label="Close sidebar"
          >
            <MobiIcon name="close" size={24} />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {children}
        </nav>

        {/* Footer */}
        {(footer || footerActions) && (
          <div className="border-t border-mobi-border/50 p-4 space-y-4">
            {footerActions && (
              <div className="flex flex-col gap-2">
                {footerActions}
              </div>
            )}
            {footer && (
              <div>
                {footer}
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

/**
 * Helper component for sidebar links/items.
 */
export const MobiSidebarItem: React.FC<{
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}> = ({ active, onClick, icon, trailing, children }) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all outline-none ${
        active 
          ? "bg-mobi-primary text-mobi-bg shadow-sm" 
          : "text-mobi-text-muted hover:bg-mobi-surface-hover hover:text-mobi-text"
      }`}
    >
      {icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>}
      <span className="flex-1 truncate text-left">{children}</span>
      {trailing && <span className="shrink-0 flex items-center justify-end">{trailing}</span>}
    </button>
  );
};
