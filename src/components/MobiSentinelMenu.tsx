import React, { useState } from 'react';
import { MobiLogo } from './MobiLogo';

export const MobiSentinelMenu: React.FC<{ onLogin?: () => void; onRegister?: () => void }> = ({ 
  onLogin, 
  onRegister 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left" style={{ position: 'relative', display: 'inline-block', textAlign: 'left' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:opacity-80 active:scale-95"
        style={{
          display: 'flex',
          height: '2.5rem',
          width: '2.5rem',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer'
        }}
        aria-label="User menu"
      >
        <MobiLogo size={36} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
            onClick={() => setIsOpen(false)} 
          />
          <div 
            className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-mobi-border bg-mobi-surface p-1 shadow-xl ring-1 ring-black/5 backdrop-blur-xl"
            style={{
              position: 'absolute',
              right: 0,
              zIndex: 50,
              marginTop: '0.5rem',
              width: '12rem',
              borderRadius: '0.75rem',
              backgroundColor: 'var(--mobi-surface)',
              border: '1px solid var(--mobi-border)',
              padding: '0.25rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="py-1">
              <button
                onClick={() => { onLogin?.(); setIsOpen(false); }}
                className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-mobi-text transition-colors hover:bg-mobi-surface-hover rounded-lg"
                style={{
                   display: 'flex',
                   width: '100%',
                   alignItems: 'center',
                   padding: '0.625rem 1rem',
                   fontSize: '0.875rem',
                   fontWeight: '500',
                   color: 'var(--mobi-text)',
                   backgroundColor: 'transparent',
                   border: 'none',
                   cursor: 'pointer',
                   textAlign: 'left'
                }}
              >
                Login
              </button>
              <button
                onClick={() => { onRegister?.(); setIsOpen(false); }}
                className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-mobi-text transition-colors hover:bg-mobi-surface-hover rounded-lg"
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  padding: '0.625rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--mobi-text)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
               }}
              >
                Registro
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
