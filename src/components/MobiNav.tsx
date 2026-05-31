import React, { useState } from 'react';
import { MobiSidebar, MobiSidebarItem } from './MobiSidebar';
import { MobiLogo } from './MobiLogo';
import { MobiBadge } from './MobiBadge';
import { MobiIcon } from './MobiIcon';
import './MobiNav.css';

export interface NavModule {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Alternative to icon for flexible leading content */
  leading?: React.ReactNode;
  path?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
  isExternal?: boolean;
}

export interface MobiNavProps {
  /**
   * Array of navigation module objects.
   */
  items: NavModule[];
  /**
   * ID of the currently active module for highlighting.
   */
  activeId: string;
  /**
   * Callback triggered upon module selection.
   */
  onNavigate: (id: string) => void;
  /**
   * Whether to show the Island/Sector metadata (Default: true).
   */
  showDNA?: boolean;
  /**
   * Branding title or logo for the mobile trigger bar.
   * @default <MobiLogo size={28} />
   */
  title?: React.ReactNode;
  /**
   * Optional footer content.
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
   * Callback triggered when the sidebar open state changes.
   */
  onToggle?: (isOpen: boolean) => void;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * MobiNav Component
 * Tactical navigation orchestration for M.O.B.I.™ Grand Fleet.
 * Adaptive sidebar (desktop) and hamburger drawer (mobile).
 */
export const MobiNav: React.FC<MobiNavProps> = ({
  items,
  activeId,
  onNavigate,
  title,
  footer,
  footerActions,
  collapsible = false,
  onToggle,
  className = ""
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setIsMobileOpen(open);
    if (onToggle) {
      onToggle(open);
    }
  };

  const handleNavigate = (id: string) => {
    onNavigate(id);
    handleToggle(false);
  };

  return (
    <>
      {/* Mobile/Collapsible Tactical Trigger Bar */}
      <div className={`sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b border-mobi-border bg-mobi-surface/80 backdrop-blur-md ${
        collapsible ? "" : "lg:hidden"
      }`}>
        <button
          onClick={() => handleToggle(true)}
          className="flex items-center gap-3 focus:outline-none hover:opacity-80 transition-opacity active:scale-[0.98] select-none"
          aria-label="Open menu"
        >
          {title || <MobiLogo size={28} />}
          <span className="font-bold text-lg tracking-tight">M.O.B.I.™</span>
        </button>
        
        <button
          onClick={() => handleToggle(true)}
          className="p-2 -mr-2 text-mobi-text-muted hover:text-mobi-text focus:outline-none"
          aria-label="Open menu"
        >
          <MobiIcon name="burger" size={28} />
        </button>
      </div>

      {/* Unified Navigation Layer (Sidebar + Drawer) */}
      <MobiSidebar
        isOpen={isMobileOpen}
        onClose={() => handleToggle(false)}
        title={title}
        footer={footer}
        footerActions={footerActions}
        collapsible={collapsible}
        className={`mobi-nav-container ${className}`}
      >
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <MobiSidebarItem
              key={item.id}
              active={activeId === item.id}
              onClick={() => handleNavigate(item.id)}
              icon={item.icon || item.leading}
              trailing={
                item.badge ? (
                  typeof item.badge === 'string' || typeof item.badge === 'number' ? (
                    <MobiBadge variant="info" size="sm">
                      {item.badge}
                    </MobiBadge>
                  ) : (
                    item.badge
                  )
                ) : null
              }
            >
              {item.label}
            </MobiSidebarItem>
          ))}
        </div>
      </MobiSidebar>
    </>
  );
};
