import React, { useState } from 'react';
import { MobiLogo, MobiFooter, MobiSentinelMenu, useMobiAuth, MobiAlert, useMobiClipboard } from '../src';
import { DocsPage } from './DocsPage';
import '../src/styles.css';

type AppView = 'home' | 'docs';

const App: React.FC = () => {
  const { login } = useMobiAuth('MOBI-PLAYGROUND');
  const [alert, setAlert] = useState<{ message: string; type: any } | null>(null);
  const { copy } = useMobiClipboard();
  const [view, setView] = useState<AppView>('home');

  const showAlert = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'warning') => {
    setAlert({ message, type });
  };

  return (
    <div className="min-h-screen flex flex-col bg-mobi-bg text-mobi-text transition-colors duration-300">
      {/* Alert Overlay */}
      {alert && (
        <div className="fixed top-24 left-1/2 z-[100] w-full max-w-sm -translate-x-1/2 px-4">
          <MobiAlert 
            title="Sentinel Notice"
            message={alert.message} 
            type={alert.type} 
            onClose={() => setAlert(null)}
            onCopy={() => {
              copy(alert.message);
              showAlert('Message copied to clipboard!', 'success');
            }}
          />
        </div>
      )}

      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-mobi-border bg-mobi-surface/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button onClick={() => setView('home')} className="flex items-center gap-3 transition-opacity hover:opacity-70">
            <MobiLogo size={32} />
            <h1 className="text-xl font-bold tracking-tight">M.O.B.I.™ Shared</h1>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Switcher */}
          <button 
            onClick={() => setView(view === 'home' ? 'docs' : 'home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] font-sans transition-all active:scale-95 ${
              view === 'docs'
                ? 'bg-mobi-primary text-mobi-bg'
                : 'border border-mobi-border bg-mobi-surface text-mobi-text hover:bg-mobi-surface-hover'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Docs
          </button>

          <MobiSentinelMenu 
            user={{
              initials: 'CA',
              email: 'carlos@wearemobi.com',
              plan: 'ULTRA',
              org: 'M.O.B.I. HQ'
            }}
            items={[
              {
                id: 'login',
                label: 'Login',
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                ),
                onClick: () => {
                  showAlert('Login mechanism is being initialized in the Bridge.', 'info');
                }
              },
              {
                id: 'register',
                label: 'Register',
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                ),
                onClick: () => showAlert('Registration is restricted to authorized agents.', 'warning')
              },
              {
                id: 'logout',
                label: 'Logout',
                danger: true,
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                ),
                onClick: () => showAlert('Logout sequence initiated. Session clearing...', 'error')
              }
            ]}
          />
        </div>
      </header>

      {/* View Routing */}
      {view === 'docs' ? (
        <DocsPage />
      ) : (
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
          <div className="max-w-2xl text-center">
            <h2 className="mb-6 text-5xl font-black tracking-tighter sm:text-7xl">
              M.O.B.I.™ Shared <span className="text-mobi-text-muted">Common UI</span>
            </h2>
            <p className="mb-12 text-lg leading-relaxed text-mobi-text-muted">
              Implementing the <strong>Core Blueprint v1.0.0</strong>. 
              Using the official Chassis assets for seamless integration.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="rounded-2xl border border-mobi-border bg-mobi-surface p-8 shadow-sm">
                 <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-mobi-text-muted">Official App Icon</p>
                 <div className="flex items-center justify-center">
                    <MobiLogo size={64} />
                 </div>
              </div>
              <div className="rounded-2xl border border-mobi-border bg-mobi-surface p-8 shadow-sm">
                 <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-mobi-text-muted">Official Brand Icon</p>
                 <div className="flex items-center justify-center">
                    <img src="https://wearemobi.com/logo-light.svg" alt="MOBI Brand Icon" className="h-16 w-16" />
                 </div>
              </div>
            </div>

            <button 
              onClick={() => setView('docs')}
              className="mt-12 px-6 py-3 rounded-2xl bg-mobi-primary text-mobi-bg text-sm font-black uppercase tracking-[0.2em] font-sans transition-all hover:opacity-90 active:scale-95"
            >
              View Component Docs →
            </button>
          </div>
        </main>
      )}

      <MobiFooter />
    </div>
  );
}

export default App;
