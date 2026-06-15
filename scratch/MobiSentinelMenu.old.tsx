import React, { useState, useCallback, useEffect, useRef } from 'react';
import { MobiUserBadge } from './MobiUserBadge';
import { MobiSwitcher } from './MobiSwitcher';
import { MobiThemeSwitcher } from './MobiThemeSwitcher';
import { MobiLangSwitcher } from './MobiLangSwitcher';
import type { MobiPlan } from './MobiPlanBadge';

/** User identity data consumed by MobiSentinelMenu. */
export interface MobiSentinelMenuUser {
  /** 1-2 character initials for the avatar circle. */
  initials: string;
  /** User email address. */
  email: string;
  /** Full name of the user. */
  name?: string;
  /** Current subscription plan. */
  plan: MobiPlan;
  /** Organization name. */
  org?: string;
}

/** A single action item in the sentinel menu. */
export interface MobiSentinelMenuItem {
  /** Unique identifier. */
  id: string;
  /** Display text. */
  label: string;
  /** Optional icon (React node) rendered to the left of the label. */
  icon?: React.ReactNode;
  /** When true, renders in the danger zone (red text, separated at the bottom). @default false */
  danger?: boolean;
  /** Called when the item is clicked. Menu closes automatically. */
  onClick?: () => void;
}

export interface MobiSentinelMenuProps {
  /** User identity data — drives the badge and header */
  user: MobiSentinelMenuUser;
  /** Menu action items */
  items?: MobiSentinelMenuItem[];
  /** Show theme switcher in config section */
  showThemeSwitcher?: boolean;
  /** Show language switcher in config section */
  showLangSwitcher?: boolean;
  /** Show font size switcher in config section */
  showFontSizeSwitcher?: boolean;
  /** Current font size code (controlled mode) */
  fontSize?: 'sm' | 'md' | 'lg';
  /** Callback when font size changes */
  onFontSizeChange?: (size: 'sm' | 'md' | 'lg') => void;
  /** Current language code (controlled mode) */
  lang?: string;
  /** Callback when language changes */
  onLangChange?: (lang: string) => void;
  /** Language options — defaults to ES/EN */
  langOptions?: { id: string; label: string; icon?: React.ReactNode }[];
  /** Variant of the trigger badge. @default 'condensed' */
  variant?: 'condensed' | 'micro';
  /** Additional class name */
  className?: string;
}

/**
 * Data-driven user dropdown menu with identity header, action items,
 * language selector, and theme switcher.
 *
 * Regular items render in the main section. Items with `danger: true`
 * are automatically separated into a red-tinted footer zone.
 *
 * Language state supports both controlled (`lang` + `onLangChange`) and
 * uncontrolled (internal state) modes.
 *
 * Keyboard accessible: Escape closes the menu.
 *
 * @example
 * ```tsx
 * <MobiSentinelMenu
 *   user={{ initials: 'CA', email: 'dev@mobi.com', plan: 'PRO', org: 'Fleet HQ' }}
 *   items={[
 *     { id: 'settings', label: 'Settings', onClick: openSettings },
 *     { id: 'logout', label: 'Logout', danger: true, onClick: handleLogout }
 *   ]}
 * />
 * ```
 */
export const MobiSentinelMenu: React.FC<MobiSentinelMenuProps> = ({
  user,
  items = [],
  variant = 'condensed',
  showThemeSwitcher = true,
  showLangSwitcher = true,
  showFontSizeSwitcher = false,
  fontSize = 'md',
  onFontSizeChange,
  lang: externalLang,
  onLangChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Split items into regular and danger items
  const regularItems = items.filter(i => !i.danger);
  const dangerItems = items.filter(i => i.danger);

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

  return (
    <div ref={menuRef} className={`relative inline-block text-left ${className}`}>
      <MobiUserBadge
        variant={variant}
        initials={user.initials}
        plan={user.plan}
        email={user.email}
        name={user.name}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      />

      {isOpen && (
        <>
          <div
            role="presentation"
            className="fixed inset-0 z-40"
            onClick={close}
          />
          <div
            role="menu"
            aria-label="User menu"
            className="absolute right-0 z-50 mt-3 w-80 origin-top-right overflow-hidden rounded-2xl border border-mobi-border bg-mobi-surface shadow-2xl ring-1 ring-black/5 backdrop-blur-xl"
          >
            {/* Header / User Info */}
            <MobiUserBadge
              variant="expanded"
              initials={user.initials}
              plan={user.plan}
              email={user.email}
              name={user.name}
              org={user.org}
              className="border-b border-mobi-border/50"
            />

            {/* Menu Options */}
            {regularItems.length > 0 && (
              <div className="p-2 space-y-1">
                {regularItems.map((item) => (
                  <button
                    key={item.id}
                    role="menuitem"
                    onClick={() => { item.onClick?.(); close(); }}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-mobi-text transition-all hover:bg-mobi-surface-hover active:scale-[0.98] font-sans tracking-tight"
                  >
                    {item.icon && (
                      <div className="flex h-8 w-8 items-center justify-center text-mobi-text-muted group-hover:text-mobi-text transition-colors" aria-hidden="true">
                        {item.icon}
                      </div>
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Settings & Config */}
            {(showThemeSwitcher || showLangSwitcher || showFontSizeSwitcher) && (
              <div className="p-3 border-t border-mobi-border/50 space-y-3 bg-mobi-bg/10">
                {showFontSizeSwitcher && (
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] font-sans">Texto</span>
                    <MobiSwitcher
                      options={[
                        { id: 'sm', label: 'A-', icon: <span className="text-[10px] font-bold">A</span> },
                        { id: 'md', label: 'A', icon: <span className="text-[12px] font-bold">A</span> },
                        { id: 'lg', label: 'A+', icon: <span className="text-[14px] font-bold">A</span> }
                      ]}
                      activeId={fontSize}
                      onChange={(id) => onFontSizeChange?.(id as 'sm' | 'md' | 'lg')}
                    />
                  </div>
                )}

                {variant !== 'micro' && (
                  <div className="space-y-3">
                    {showThemeSwitcher && (
                      <div className="flex items-center justify-between px-2">
                        <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] font-sans">Tema</span>
                        <MobiThemeSwitcher />
                      </div>
                    )}
                    {showLangSwitcher && (
                      <div className="flex items-center justify-between px-2">
                        <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] font-sans">Idioma</span>
                        <MobiLangSwitcher
                          lang={externalLang as 'en' | 'es' | undefined}
                          onChange={onLangChange}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Danger Actions */}
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
                      <div className="flex h-8 w-8 items-center justify-center" aria-hidden="true">
                        {item.icon}
                      </div>
                    )}
                    {item.label}
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
