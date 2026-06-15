import React from 'react';
import { MobiHero, MobiButton, MobiLogo, MobiFooter, MobiThemeToggle } from '../src';
import { ArrowRight, Book } from 'lucide-react';
import { useLocation } from 'wouter';

export const LandingPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const onEnterDocs = () => setLocation('/docs');

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="h-[60px] border-b border-border px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-foreground rounded flex items-center justify-center p-1" style={{ width: 28, height: 28 }}>
            <MobiLogo size={24} />
          </div>
          <span className="font-black text-sm tracking-tight text-foreground">M.O.B.I.™ Shared</span>
        </div>
        <div className="flex items-center gap-3">
          <MobiThemeToggle />
          <MobiButton 
            variant="outline" 
            size="sm" 
            icon={<Book size={14} />} 
            onClick={onEnterDocs}
            className="text-[10px] tracking-[0.1em] uppercase font-bold"
          >
            DOCS
          </MobiButton>
          <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs shrink-0">
            C
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-between w-full min-h-[calc(100vh-60px)]">
        <div className="flex-1 flex flex-col items-center justify-center w-full pb-20 pt-10">
          <MobiHero
            align="center"
            size="lg"
            logo={<img src="https://wearemobi.com/logo-light.svg" alt="M.O.B.I.™" width={120} height={120} className="object-contain" />}
            title={
              <div className="flex flex-col gap-2 mt-4">
                <span>M.O.B.I.™ Shared</span>
                <span className="text-muted-foreground">Common UI</span>
              </div>
            }
            subtitle="Implementing the Core Blueprint v1.0.0. Using the official Chassis assets for seamless integration."
          >
            <div className="flex flex-col sm:flex-row gap-8 mt-12 justify-center items-center">
              <div className="p-8 rounded-2xl border border-border bg-card flex flex-col items-center justify-center gap-8 min-w-[240px] shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Official App Icon</span>
                <div className="bg-foreground p-1" style={{ borderRadius: 64 * 0.05 }}>
                   <MobiLogo size={64} />
                </div>
              </div>
              <div className="p-8 rounded-2xl border border-border bg-card flex flex-col items-center justify-center gap-8 min-w-[240px] shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Official Brand Icon</span>
                <img src="https://wearemobi.com/logo-light.svg" alt="M.O.B.I.™" width={64} height={64} className="object-contain" />
              </div>
            </div>
            
            <div className="mt-16 flex justify-center">
              <MobiButton 
                variant="ghost" 
                onClick={onEnterDocs} 
                suffixIcon={<ArrowRight size={14} strokeWidth={3} />}
                className="text-[10px] tracking-[0.2em] uppercase font-black text-foreground"
              >
                View Component Docs
              </MobiButton>
            </div>
          </MobiHero>
        </div>
        <MobiFooter />
      </main>
    </div>
  );
};
