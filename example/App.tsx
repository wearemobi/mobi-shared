import React, { useState } from 'react';
import { MobiLogo, MobiLogoHero, MobiFooter, MobiSentinelMenu, MobiNavbar, MobiHero, MobiButton, useMobiAuth, MobiAlert, useMobiClipboard, MobiChatWidget } from '../src';
import { DocsPage } from './DocsPage';
import pkg from '../package.json';
import '../src/styles.css';

type AppView = 'home' | 'docs';

const App: React.FC = () => {
  const { login } = useMobiAuth('MOBI-PLAYGROUND');
  const [alert, setAlert] = useState<{ message: string; type: any } | null>(null);
  const { copy } = useMobiClipboard();
  const [view, setView] = useState<AppView>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showAlert = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'warning') => {
    setAlert({ message, type });
  };

  return (
    <div className="min-h-screen flex flex-col bg-mobi-bg text-mobi-text font-sans transition-colors duration-300">
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

      <MobiNavbar 
        title="M.O.B.I.™ Shared"
        onLogoClick={() => setView('home')}
        rightContent={
          <>
            {view === 'docs' && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-mobi-text-muted hover:text-mobi-text"
                aria-label="Open documentation menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            )}
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
                name: 'Carlos Quijano',
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
          </>
        }
      />

      {/* View Routing */}
      {view === 'docs' ? (
        <DocsPage 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
        />
      ) : (
        <main className="flex-1 px-6">
          <MobiHero
            logo={<MobiLogoHero size={160} />}
            title="M.O.B.I.™ Shared"
            subtitle="Common UI"
            description={
              <>
                Implementing the <strong>Core Blueprint v1.0.0</strong>. 
                Using the official Chassis assets for seamless integration.
              </>
            }
          >
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
                    <MobiLogoHero size={64} className="mb-0" />
                 </div>
              </div>
            </div>

            <MobiButton 
              variant="outline"
              technical
              onClick={() => setView('docs')}
              className="mt-12"
            >
              View Component Docs →
            </MobiButton>
          </MobiHero>
        </main>
      )}

      <MobiFooter appName="M.O.B.I.™ Shared" version={`v${pkg.version}`} />

      {/* GLOBAL TACTICAL INTERFACE */}
      <MobiChatWidget 
        title="MobiAI Chat"
        userInitials="CQ"
        userPlan="ULTRA"
        userEmail="carlos@wearemobi.com"
        userName="Carlos Quijano"
        initialMessages={[
          { id: 'welcome-1', role: 'assistant', content: 'Enlace táctico establecido. Bienvenido al núcleo de M.O.B.I. v1.2.6.', timestamp: new Date().toISOString(), model: 'expert' },
          { id: 'welcome-2', role: 'assistant', content: '¿Qué vectores de datos deseas procesar hoy?', timestamp: new Date().toISOString(), model: 'expert' }
        ]}
        userMenuItems={[
          { id: 'settings', label: 'Chat Settings', icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
          { id: 'logout', label: 'Logout', danger: true, icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg> }
        ]}
      />
    </div>
  );
}

export default App;
