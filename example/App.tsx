import React, { useState } from 'react';
import { MobiLogo, MobiFooter, MobiSentinelMenu, useMobiAuth, MobiAlert, useMobiClipboard } from '../src';
import '../src/styles.css';

const App: React.FC = () => {
  const { login } = useMobiAuth('MOBI-PLAYGROUND');
  const [alert, setAlert] = useState<{ message: string; type: any } | null>(null);
  const { copy } = useMobiClipboard();

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
          <MobiLogo size={32} />
          <h1 className="text-xl font-bold tracking-tight">M.O.B.I.™ Shared</h1>
        </div>
        
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
              label: 'Registro',
              icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              ),
              onClick: () => showAlert('Registration is restricted to authorized agents.', 'warning')
            },
            {
              id: 'logout',
              label: 'Cerrar Sesión',
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
            <div className="rounded-2xl border border-mobi-border bg-mobi-surface p-8 shadow-sm">
               <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-mobi-text-muted">Official Brand Icon</p>
               <div className="flex items-center justify-center">
                  <img src="https://wearemobi.com/logo-light.svg" alt="MOBI Brand Icon" className="h-16 w-16" />
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
