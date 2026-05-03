import React, { useState, useRef, useEffect } from 'react';
import { MobiButton } from './MobiButton';
import { MobiSwitcher } from './MobiSwitcher';

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
  onAttachClick
}) => {
  const [value, setValue] = useState('');
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

  const getBatteryColor = () => {
    if (energy > 50) return 'bg-emerald-500';
    if (energy > 20) return 'bg-amber-500';
    return 'bg-rose-500 animate-pulse';
  };

  return (
    <div className={`
      w-full bg-mobi-surface border border-mobi-border rounded-2xl overflow-hidden
      shadow-2xl transition-all duration-300 focus-within:border-mobi-primary focus-within:ring-1 focus-within:ring-mobi-primary/20
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
        <div className="flex items-center gap-2">
          <MobiButton 
            variant="ghost" 
            size="sm" 
            onClick={onAttachClick}
            disabled={isProcessing}
            icon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
          />
          
          <div className="h-4 w-[1px] bg-mobi-border mx-1" />
          
          <MobiSwitcher 
            options={DEFAULT_MODELS}
            activeId={activeModelId}
            onChange={onModelChange || (() => {})}
            className="border-none bg-transparent p-0 gap-0.5"
          />
        </div>

        <MobiButton 
          variant="solid" 
          onClick={handleSend}
          disabled={isProcessing || !value.trim()}
          className="h-8 w-8 min-w-0 p-0 flex items-center justify-center rounded-xl"
          icon={isProcessing ? (
            <div className="h-3 w-3 border-2 border-mobi-bg/30 border-t-mobi-bg rounded-full animate-spin" />
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          )}
        />
      </div>

      {/* Footer Status */}
      <div className="px-4 py-1.5 bg-mobi-bg border-t border-mobi-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="text-[9px] font-bold text-mobi-text-muted uppercase tracking-[0.15em] font-mono">
            {isProcessing ? 'Processing Request...' : statusMessage}
          </span>
        </div>

        {/* Battery Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-black font-mono text-mobi-text-muted opacity-60">
            {energy}%
          </span>
          <div className="relative w-6 h-3 border border-mobi-text-muted/30 rounded-[2px] p-[1px]">
            <div 
              className={`h-full rounded-[1px] transition-all duration-1000 ${getBatteryColor()}`}
              style={{ width: `${energy}%` }}
            />
            {/* Battery Pin */}
            <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-mobi-text-muted/30 rounded-r-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
