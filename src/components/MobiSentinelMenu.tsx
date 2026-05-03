import React, { useState } from 'react';
import { useMobiTheme } from '../hooks/useMobiTheme';
import { MobiUserBadge } from './MobiUserBadge';
import { MobiSwitcher } from './MobiSwitcher';
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

const defaultLangOptions = [
  { id: 'ES', label: 'ES', icon: <span className="text-base leading-none">🇸🇻</span> },
  { id: 'EN', label: 'EN', icon: <span className="text-base leading-none">🇺🇸</span> }
];

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
  langOptions = defaultLangOptions,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalLang, setInternalLang] = useState('ES');
  const { theme, setTheme } = useMobiTheme();

  // Support both controlled and uncontrolled language state
  const activeLang = externalLang ?? internalLang;
  const handleLangChange = (id: string) => {
    setInternalLang(id);
    onLangChange?.(id);
  };

  // Split items into regular and danger items
  const regularItems = items.filter(i => !i.danger);
  const dangerItems = items.filter(i => i.danger);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <MobiUserBadge 
        variant={variant}
        initials={user.initials}
        plan={user.plan}
        email={user.email}
        name={user.name}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div 
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
                    onClick={() => { item.onClick?.(); setIsOpen(false); }}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-mobi-text transition-all hover:bg-mobi-surface-hover active:scale-[0.98] font-sans tracking-tight"
                  >
                    {item.icon && (
                      <div className="flex h-8 w-8 items-center justify-center text-mobi-text-muted group-hover:text-mobi-text transition-colors">
                        {item.icon}
                      </div>
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Config Section (Hidden in micro) */}
            {variant !== 'micro' && (showLangSwitcher || showThemeSwitcher) && (
              <div className="p-3 border-t border-mobi-border/50 space-y-3 bg-mobi-bg/10">
                {/* Language */}
                {showLangSwitcher && (
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] font-sans">Idioma</span>
                    <MobiSwitcher 
                      options={langOptions}
                      activeId={activeLang}
                      onChange={handleLangChange}
                    />
                  </div>
                )}

                {/* Theme */}
                {showThemeSwitcher && (
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em] font-sans">Interfaz</span>
                    <MobiSwitcher 
                      hideLabel
                      options={[
                        { 
                          id: 'light', 
                          label: 'Light', 
                          icon: (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <circle cx="12" cy="12" r="5" strokeWidth={2}/><path strokeWidth={2} strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                            </svg>
                          ) 
                        },
                        { 
                          id: 'system', 
                          label: 'Auto', 
                          icon: (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          ) 
                        },
                        { 
                          id: 'dark', 
                          label: 'Dark', 
                          icon: (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                          ) 
                        }
                      ]}
                      activeId={theme}
                      onChange={(id) => setTheme(id as any)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Danger Actions (Logout, etc.) */}
            {dangerItems.length > 0 && (
              <div className="p-2 border-t border-mobi-border/50 bg-mobi-bg/30">
                {dangerItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { item.onClick?.(); setIsOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-rose-500 transition-all hover:bg-rose-500/5 active:scale-[0.98] font-sans tracking-tight"
                  >
                    {item.icon && (
                      <div className="flex h-8 w-8 items-center justify-center">
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
