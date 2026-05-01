import React from 'react';

export const MobiFooter: React.FC = () => (
  <div className="pt-8 pb-4 flex flex-col items-center justify-center gap-1.5 opacity-60" style={{ paddingTop: '2rem', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', opacity: 0.6 }}>
    <div className="flex items-center gap-1.5" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
      <span className="text-[10px] font-bold text-mobi-text-muted uppercase tracking-[0.2em]" style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
        Powered by
      </span>
      <img 
        src="https://wearemobi.com/logo-light.svg" 
        alt="M.O.B.I.™" 
        className="h-4 w-auto object-contain light-invert"
        style={{ height: '16px', width: 'auto', display: 'block' }}
        referrerPolicy="no-referrer"
      />
    </div>
    <p className="text-[10px] text-mobi-text-muted/50 font-medium" style={{ fontSize: '10px', color: 'var(--mobi-text-muted)', opacity: 0.5 }}>
      © 2026 Machine Oriented Brilliant Ideas™
    </p>
  </div>
);
