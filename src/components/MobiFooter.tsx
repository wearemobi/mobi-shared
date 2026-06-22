import React from 'react';
import { MobiLogo } from './MobiLogo';

export interface MobiFooterProps {
  appName?: string;
  version?: string;
}

export const MobiFooter: React.FC<MobiFooterProps> = ({ appName, version }) => (
  <div className="pt-10 pb-8 flex flex-col items-center justify-center text-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-500">
    <a href="https://wearemobi.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
      <MobiLogo size={40} className="mb-0 mx-0" />
    </a>
    
    <div className="flex flex-col gap-0">
      <p className="font-medium text-foreground font-sans text-[10px] leading-tight">
        Copyright © {new Date().getFullYear()} M.O.B.I.™
      </p>
      <p className="text-muted-foreground font-sans text-[10px] leading-tight">
        (Machine Oriented Brilliant Ideas™)
      </p>
      <p className="text-muted-foreground/50 font-sans text-[10px] leading-tight mt-0.5">
        Costa Rica, Centro America.
      </p>
      {(appName || version) && (
        <p className="font-normal uppercase tracking-wider text-muted-foreground/20 font-sans mt-2 text-[10px]">
          {appName}{appName && version && ' · '}{version}
        </p>
      )}
    </div>
  </div>
);
