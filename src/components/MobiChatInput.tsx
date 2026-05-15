import React, { useState, useRef, useEffect } from 'react';
import { MobiButton } from './MobiButton';
import { MobiEnergyMeter } from './MobiEnergyMeter';
import { MobiIntelligenceSelector } from './MobiIntelligenceSelector';

export interface MobiChatInputProps {
  /**
   * Callback triggered when the send button is clicked or Enter is pressed.
   */
  onSend?: (message: string) => void;
  /**
   * Placeholder text for the input area.
   * @default 'Ask M.O.B.I...'
   */
  placeholder?: string;
  /**
   * If true, disables the input and shows a processing state.
   * @default false
   */
  isProcessing?: boolean;
  /**
   * Optional status message shown in the footer.
   * @default 'Powered by MobiAI'
   */
  statusMessage?: string;
  /**
   * Energy/Battery level (0-100).
   * @default 100
   */
  energy?: number;
  /**
   * Currently selected model ID.
   */
  activeModelId?: string;
  /**
   * Callback triggered when a new model is selected.
   */
  onModelChange?: (id: string) => void;
  /**
   * Additional CSS classes for the container.
   */
  className?: string;
  /**
   * Callback for the attachment button click.
   */
  onAttachClick?: () => void;
  /**
   * Text for the computer upload option.
   * @default 'ADD FROM COMPUTER'
   */
  addFromComputerText?: string;
  /**
   * Text for the vault upload option.
   * @default 'ADD FROM MOBIVAULT'
   */
  addFromVaultText?: string;
  /**
   * Text shown when processing.
   * @default 'Processing Request...'
   */
  processingText?: string;
  /**
   * Callback for attachment actions.
   */
  onAttach?: (source: 'computer' | 'vault') => void;
  /**
   * Detailed energy stats for the toggleable footer row.
   */
  energyStats?: {
    label: string;
    used: number;
    limit: number;
    percent: number;
  };
  /**
   * List of available models for the switcher.
   */
  models?: { id: string; label: string }[];
  /**
   * If true, uses a more compact layout for the input tools.
   */
  isCompact?: boolean;
}

const DEFAULT_MODELS = [
  { id: 'fast', label: 'Fast' },
  { id: 'pro', label: 'Pro' },
  { id: 'expert', label: 'Expert' }
];

/**
 * M.O.B.I.™ Command Input.
 * A premium, technical chat input for agentic interactions.
 * 
 * @example
 * ```tsx
 * <MobiChatInput onSend={(msg) => console.log(msg)} energy={85} />
 * ```
 */
export const MobiChatInput: React.FC<MobiChatInputProps> = ({
  onSend,
  placeholder = 'Ask M.O.B.I...',
  isProcessing = false,
  statusMessage = 'Powered by MobiAI',
  energy = 100,
  activeModelId = 'fast',
  onModelChange,
  className = "",
  onAttachClick,
  addFromComputerText = 'Attach Files',
  addFromVaultText = 'Add from MobiVault',
  processingText = 'Processing Request...',
  onAttach,
  models = DEFAULT_MODELS,
  energyStats,
  isCompact = false
}) => {
  const [value, setValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDetailedEnergy, setShowDetailedEnergy] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (value.trim() && onSend && !isProcessing) {
      onSend(value.trim());
      setValue('');
    }
  };

  return (
    <div className={`
      w-full transition-all duration-300 focus-within:ring-1 focus-within:ring-mobi-primary/20
      ${className}
    `}>
      {/* Input Area */}
      <div className="p-4">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          placeholder={placeholder}
          className="
            w-full bg-transparent border-none outline-none resize-none
            text-mobi-text placeholder:text-mobi-text-muted
            text-sm font-medium leading-relaxed font-sans
            disabled:opacity-50
          "
        />
      </div>

      {/* Toolbar */}
      <div className="px-3 py-2 bg-mobi-bg/30 border-t border-mobi-border/50 flex items-center justify-between">
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <MobiButton 
            variant="ghost" 
            size="sm" 
            className="flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            disabled={isProcessing}
            icon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
          />
          
          <MobiIntelligenceSelector 
            options={models}
            activeId={activeModelId}
            onChange={onModelChange || (() => {})}
            disabled={isProcessing}
            variant={isCompact ? 'compact' : 'default'}
            className={isCompact ? 'flex-shrink-0' : 'min-w-0 flex-1'}
          />

          {isCompact && (
            <span className="text-[9px] font-black font-mono text-mobi-text-muted tracking-tighter uppercase truncate max-w-[120px] ml-1 opacity-60">
              {models.find(m => m.id === activeModelId)?.label || 'FAST'}
            </span>
          )}
        </div>

        <MobiButton 
          variant="solid" 
          onClick={handleSend}
          disabled={isProcessing || !value.trim()}
          className="h-8 w-8 min-w-0 p-0 flex items-center justify-center rounded-sm flex-shrink-0 ml-2"
          icon={isProcessing ? (
            <div className="h-3 w-3 border-2 border-mobi-bg/30 border-t-mobi-bg rounded-full animate-spin" />
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          )}
        />
      </div>

      {/* Footer Status */}
      <div className="px-4 py-1.5 bg-mobi-bg border-t border-mobi-border/50 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-[9px] font-bold text-mobi-text-muted tracking-[0.15em] font-mono">
              {isProcessing ? processingText : statusMessage}
            </span>
          </div>

          <MobiEnergyMeter 
            value={energy} 
            size="md" 
            onClick={() => setShowDetailedEnergy(!showDetailedEnergy)}
          />
        </div>

        {/* Detailed Energy Expansion */}
        {showDetailedEnergy && energyStats && (
          <div className="pt-2 pb-1 border-t border-mobi-border/30 flex flex-col gap-1.5 animate-in slide-in-from-top-1 duration-200">
            <div className="flex justify-between items-center text-[8px] font-black text-mobi-text-muted uppercase tracking-[0.2em] font-mono">
                <span>{energyStats.label}</span>
                <span className={energyStats.percent <= 0 ? "text-rose-500" : ""}>
                  {energyStats.used.toLocaleString()} / {energyStats.limit.toLocaleString()}
                </span>
            </div>
            <div className="w-full h-1 bg-mobi-border/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${energyStats.percent <= 0 ? 'bg-rose-500' : 'bg-mobi-primary shadow-[0_0_8px_rgba(var(--mobi-primary-rgb),0.5)]'}`}
                  style={{ width: `${Math.max(2, energyStats.percent)}%` }}
                />
            </div>
          </div>
        )}
      </div>

      {/* Plus Menu Dropdown (Moved outside to be z-index safe) */}
      {isMenuOpen && (
        <div 
          className="absolute bottom-20 left-4 w-56 bg-mobi-surface border border-mobi-border rounded-sm shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2"
        >
          <button 
            className="w-full px-4 py-3 text-left text-[11px] font-sans font-semibold text-mobi-text hover:bg-mobi-primary hover:text-mobi-bg transition-colors flex items-center gap-3"
            onClick={() => { setIsMenuOpen(false); onAttachClick?.(); onAttach?.('computer'); }}
          >
            <svg className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
            <span>{addFromComputerText}</span>
          </button>
          <button 
            className="w-full px-4 py-3 text-left text-[11px] font-sans font-semibold text-mobi-text hover:bg-mobi-primary hover:text-mobi-bg transition-colors border-t border-mobi-border flex items-center gap-3"
            onClick={() => { setIsMenuOpen(false); onAttach?.('vault'); }}
          >
            <svg className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
            <span>{addFromVaultText}</span>
          </button>
        </div>
      )}
    </div>
  );
};
