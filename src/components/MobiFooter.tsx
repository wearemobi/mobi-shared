import React from 'react';

/**
 * Standard "Powered by M.O.B.I.™" footer branding element.
 * Theme-aware with automatic logo inversion. Zero configuration required.
 *
 * @example
 * ```tsx
 * <MobiFooter />
 * ```
 */
export const MobiFooter: React.FC = () => (
  <div className="pt-8 pb-4 flex flex-col items-center justify-center gap-2 opacity-60">
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-black text-mobi-text-muted uppercase tracking-[0.2em] font-sans">
        Powered by
      </span>
      <img 
        src="https://wearemobi.com/logo-light.svg" 
        alt="M.O.B.I.™" 
        className="h-4 w-auto object-contain light-invert"
        referrerPolicy="no-referrer"
      />
    </div>
    <p className="text-[10px] text-mobi-text-muted/40 font-bold uppercase tracking-tight font-sans">
      © 2026 Machine Oriented Brilliant Ideas™
    </p>
  </div>
);
