import React, { useState } from 'react';
import { MobiSwitcher } from './MobiSwitcher';

/** Props for the MobiLangSwitcher component. */
export interface MobiLangSwitcherProps {
  /** 
   * Selected language code (e.g. 'en', 'es').
   * If omitted, the component falls back to internal uncontrolled state.
   */
  lang?: 'en' | 'es';
  /** Callback triggered when the selected language is changed. */
  onChange?: (lang: 'en' | 'es') => void;
  /** Custom CSS classes. */
  className?: string;
}

/**
 * Reusable, premium language switcher component to toggle between
 * English (EN) and Spanish (ES). Identical in style and structure
 * to MobiThemeSwitcher.
 */
export const MobiLangSwitcher: React.FC<MobiLangSwitcherProps> = ({
  lang: externalLang,
  onChange,
  className = ''
}) => {
  const [internalLang, setInternalLang] = useState<'en' | 'es'>('en');

  const activeLang = externalLang ?? internalLang;

  const handleChange = (id: string) => {
    const nextLang = id as 'en' | 'es';
    if (!externalLang) {
      setInternalLang(nextLang);
    }
    onChange?.(nextLang);
  };

  return (
    <MobiSwitcher
      hideLabel
      className={className}
      options={[
        {
          id: 'en',
          label: 'English',
          icon: (
            <span className="text-[11px] font-black tracking-tight font-sans">EN</span>
          )
        },
        {
          id: 'es',
          label: 'Español',
          icon: (
            <span className="text-[11px] font-black tracking-tight font-sans">ES</span>
          )
        }
      ]}
      activeId={activeLang}
      onChange={handleChange}
    />
  );
};
