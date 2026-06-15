import { MobiLogoHero } from './MobiLogoHero';

export interface MobiFooterProps {
  /** Name of the application (e.g. 'Chassis Vite') */
  appName?: string;
  /** Optional version number (e.g. 'v1.2.1') to display in the footer. */
  version?: string;
}

export const MobiFooter: React.FC<MobiFooterProps> = ({ appName, version }) => (
  <div className="pt-10 pb-8 flex flex-col items-center justify-center text-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-500">
    {/* Compact Central Logo with Link */}
    <a href="https://wearemobi.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
      <MobiLogoHero size={40} className="mb-0 mx-0" />
    </a>
    
    <div className="flex flex-col gap-0.5">
      <p className="text-[11px] font-bold text-mobi-text font-sans tracking-tight">
        Copyright © 2026 M.O.B.I.™
      </p>
      <p className="text-[10px] font-medium text-mobi-text-muted font-sans tracking-tight">
        (Machine Oriented Brilliant Ideas™)
      </p>
      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-mobi-text-muted font-sans">
        Costa Rica, Centro America.
      </p>
      {(appName || version) && (
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-mobi-text-muted/30 font-sans mt-1">
          {appName}{appName && version && ' · '}{version}
        </p>
      )}
    </div>
  </div>
);
