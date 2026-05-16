import React, { useState, useCallback, useEffect, useRef } from 'react';
import './MobiHamburgerMenu.css';

export interface MobiMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

export interface MobiHamburgerMenuProps {
  /** Menu action items */
  items: MobiMenuItem[];
  /** Optional header title */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Variant for the trigger button. @default 'default' */
  variant?: 'default' | 'ghost' | 'primary';
}

/**
 * MobiHamburgerMenu
 * A tactical action dropdown triggered by a hamburger icon.
 * Designed for modular actions and contextual menus across the Grand Fleet.
 */
export const MobiHamburgerMenu: React.FC<MobiHamburgerMenuProps> = ({
  items,
  title,
  className = '',
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  // Keyboard: close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  const regularItems = items.filter(i => !i.danger);
  const dangerItems = items.filter(i => i.danger);

  return (
    <div ref={menuRef} className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`p-2 rounded-xl transition-all active:scale-95 flex items-center justify-center
          ${variant === 'ghost' ? 'text-mobi-text-muted hover:text-mobi-text hover:bg-mobi-surface-hover' : 
            variant === 'primary' ? 'bg-mobi-primary text-mobi-bg shadow-lg shadow-mobi-primary/20' : 
            'bg-mobi-surface border border-mobi-border text-mobi-text hover:bg-mobi-surface-hover'}
        `}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Toggle actions"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
            onClick={close}
          />
          
          <div
            role="menu"
            className="mobi-hamburger-dropdown absolute right-0 z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-mobi-border bg-mobi-surface shadow-2xl ring-1 ring-black/5 backdrop-blur-xl animate-in fade-in zoom-in duration-200"
          >
            {title && (
              <div className="px-4 py-3 border-b border-mobi-border/50 bg-mobi-bg/10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-mobi-text-muted font-sans">
                  {title}
                </span>
              </div>
            )}

            <div className="p-2 space-y-1">
              {regularItems.map((item) => (
                <button
                  key={item.id}
                  role="menuitem"
                  onClick={() => { item.onClick?.(); close(); }}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-mobi-text transition-all hover:bg-mobi-surface-hover active:scale-[0.98] font-sans tracking-tight"
                >
                  {item.icon && (
                    <div className="flex h-5 w-5 items-center justify-center text-mobi-text-muted group-hover:text-mobi-text transition-colors" aria-hidden="true">
                      {item.icon}
                    </div>
                  )}
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>

            {dangerItems.length > 0 && (
              <div className="p-2 border-t border-mobi-border/50 bg-mobi-bg/30">
                {dangerItems.map((item) => (
                  <button
                    key={item.id}
                    role="menuitem"
                    onClick={() => { item.onClick?.(); close(); }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-rose-500 transition-all hover:bg-rose-500/5 active:scale-[0.98] font-sans tracking-tight"
                  >
                    {item.icon && (
                      <div className="flex h-5 w-5 items-center justify-center" aria-hidden="true">
                        {item.icon}
                      </div>
                    )}
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
