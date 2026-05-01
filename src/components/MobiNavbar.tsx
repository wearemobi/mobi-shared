import React from 'react';
import { MobiLogo } from './MobiLogo';

export interface MobiNavbarProps {
  /**
   * Title text to display next to the logo on tablet and desktop views.
   * On mobile, only the logo is shown.
   * @default "M.O.B.I.™"
   */
  title?: string;
  /**
   * Optional callback triggered when the logo or title is clicked.
   */
  onLogoClick?: () => void;
  /**
   * Content to render on the right side of the navbar (e.g., buttons, menus).
   */
  rightContent?: React.ReactNode;
  /**
   * Additional CSS classes for the container.
   */
  className?: string;
}

/**
 * Standard M.O.B.I.™ Top Navigation Bar.
 * Implements the official design system with a sticky, blurred background.
 * Automatically hides text on mobile (below md breakpoint) to prioritize space.
 *
 * @example
 * ```tsx
 * <MobiNavbar 
 *   title="Shared Library" 
 *   onLogoClick={() => navigate('/')} 
 *   rightContent={<MobiSentinelMenu ... />}
 * />
 * ```
 */
export const MobiNavbar: React.FC<MobiNavbarProps> = ({
  title = "M.O.B.I.™",
  onLogoClick,
  rightContent,
  className = ""
}) => {
  return (
    <header className={`sticky top-0 z-10 flex items-center justify-between border-b border-mobi-border bg-mobi-surface/80 px-6 py-4 backdrop-blur-md ${className}`}>
      <div className="flex items-center gap-3">
        <button 
          onClick={onLogoClick} 
          className="group flex items-center gap-3 transition-opacity hover:opacity-70 outline-none cursor-pointer"
          aria-label="Go home"
        >
          <MobiLogo size={32} />
          {/* Title is hidden on mobile (below 768px) and shown on md+ screens */}
          <span className="max-md:hidden md:inline-block text-xl font-bold tracking-tight font-sans whitespace-nowrap">
            {title}
          </span>
        </button>
      </div>
      
      {rightContent && (
        <div className="flex items-center gap-2">
          {rightContent}
        </div>
      )}
    </header>
  );
};
