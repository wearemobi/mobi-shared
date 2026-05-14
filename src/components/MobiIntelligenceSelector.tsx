import React, { useState } from 'react';
import { MobiButton } from './MobiButton';

export interface IntelligenceOption {
  id: string;
  label: string;
}

export interface MobiIntelligenceSelectorProps {
  /** Currently selected model ID */
  activeId?: string;
  /** List of available models */
  options: IntelligenceOption[];
  /** Callback triggered when a new model is selected */
  onChange: (id: string) => void;
  /** If true, disables interaction */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * M.O.B.I.™ Intelligence Selector.
 * A premium dropdown for selecting AI models and tactical engines.
 */
export const MobiIntelligenceSelector: React.FC<MobiIntelligenceSelectorProps> = ({
  activeId,
  options,
  onChange,
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeOption = options.find(o => o.id === activeId);

  return (
    <div className={`relative ${className}`}>
      <MobiButton 
        variant="ghost" 
        size="sm" 
        className="px-2 text-[10px] font-bold tracking-widest text-mobi-text-muted hover:text-mobi-primary uppercase flex items-center gap-2 whitespace-nowrap min-w-0 max-w-[220px]"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        suffixIcon={<svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
      >
        <span className="truncate">{activeOption?.label || 'SELECT MODEL'}</span>
      </MobiButton>

      {isOpen && (
        <>
          {/* Backdrop to close on click outside */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute bottom-full left-0 mb-2 w-72 bg-mobi-surface border border-mobi-border rounded-sm shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
            <div className="px-3 py-2 bg-mobi-bg/50 border-b border-mobi-border/50 flex items-center justify-between">
              <p className="text-[8px] font-black text-mobi-text-muted uppercase tracking-[0.2em]">Available Intelligence</p>
              <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {options.length === 0 ? (
                <div className="px-4 py-3 text-[10px] text-mobi-text-muted font-mono uppercase italic">No tactical models found</div>
              ) : (
                options.map(option => (
                  <button 
                    key={option.id}
                    className={`
                      w-full px-4 py-3 text-left text-[10px] font-sans font-bold transition-all flex items-center justify-between border-b border-mobi-border/30 last:border-0
                      ${activeId === option.id ? 'bg-mobi-primary text-mobi-bg' : 'text-mobi-text hover:bg-mobi-primary/10'}
                    `}
                    onClick={() => {
                      onChange(option.id);
                      setIsOpen(false);
                    }}
                  >
                    <span className="truncate pr-2">{option.label}</span>
                    {activeId === option.id && (
                      <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
