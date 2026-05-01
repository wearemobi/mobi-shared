import React from 'react';
import { MobiLogo, MobiFooter, MobiSentinelMenu, MobiThemeSwitcher, useMobiAuth } from '../src';
import '../src/styles.css';

function App() {
  const { login } = useMobiAuth('MOBI-PLAYGROUND');

  return (
    <div className="min-h-screen flex flex-col bg-mobi-bg text-mobi-text transition-colors duration-300">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-mobi-border bg-mobi-surface/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <MobiLogo size={32} />
          <h1 className="text-xl font-bold tracking-tight">M.O.B.I.™ Shared</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <MobiThemeSwitcher />
          <MobiSentinelMenu 
            onLogin={() => {
              console.log('Login triggered');
              login();
            }} 
            onRegister={() => console.log('Register triggered')} 
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <h2 className="mb-6 text-5xl font-black tracking-tighter sm:text-7xl">
            M.O.B.I.™ Shared <span className="text-mobi-text-muted">Common UI</span>
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-mobi-text-muted">
            Implementando el <strong>Core Blueprint v1.0.0</strong>. 
            Usando los assets oficiales del Chassis para una integración perfecta.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="rounded-2xl border border-mobi-border bg-mobi-surface p-8 shadow-sm">
               <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-mobi-text-muted">Official App Icon</p>
               <div className="flex items-center justify-center">
                  <MobiLogo size={64} />
               </div>
            </div>
            
            <div className="rounded-2xl border border-mobi-border bg-mobi-surface p-8 shadow-sm flex flex-col justify-center">
               <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-mobi-text-muted">Status</p>
               <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-mono font-bold uppercase tracking-tighter">Sentinel Active</span>
               </div>
            </div>
          </div>
        </div>
      </main>

      <MobiFooter />
    </div>
  );
}

export default App;
