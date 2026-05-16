import React, { useState } from 'react';
import { MobiSidebar, MobiSidebarItem } from './MobiSidebar';
import { MobiLogo } from './MobiLogo';
import { MobiBadge } from './MobiBadge';
import { MobiIcon } from './MobiIcon';
import './MobiNav.css';

export interface NavModule {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  badge?: string | number;
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
  className = ""
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Tactical Trigger Bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b border-mobi-border bg-mobi-surface/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {title || <MobiLogo size={28} />}
          <span className="font-bold text-lg tracking-tight">M.O.B.I.™</span>
        </div>
        
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 -mr-2 text-mobi-text-muted hover:text-mobi-text focus:outline-none"
          aria-label="Open menu"
        >
          <MobiIcon name="burger" size={28} />
        </button>
      </div>

      {/* Unified Navigation Layer (Sidebar + Drawer) */}
      <MobiSidebar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        title={title}
        footer={footer}
        className={`mobi-nav-container ${className}`}
      >
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <MobiSidebarItem
              key={item.id}
              active={activeId === item.id}
              onClick={() => handleNavigate(item.id)}
              icon={item.icon}
            >
              <div className="flex items-center justify-between w-full">
                <span>{item.label}</span>
                {item.badge && (
                  <MobiBadge variant="info" size="sm">
                    {item.badge}
                  </MobiBadge>
                )}
              </div>
            </MobiSidebarItem>
          ))}
        </div>
      </MobiSidebar>
    </>
  );
};
