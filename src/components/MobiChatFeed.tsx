import React, { useRef, useEffect } from 'react';
import { MobiLogoHero } from './MobiLogoHero';
import { MobiMarkdown } from './MobiMarkdown';
import { MobiIcon } from './MobiIcon';

export interface MobiChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  model?: string;
  isError?: boolean;
}

export interface MobiChatFeedProps {
  /**
   * Array of chat messages to display.
   */
  messages: MobiChatMessage[];
  /**
   * If true, shows a processing indicator at the end.
   */
  isProcessing?: boolean;
  /**
   * Additional CSS classes for the container.
   */
  className?: string;
  /**
   * Text shown when processing.
   * @default 'Processing...'
   */
  processingText?: string;
  /**
   * Empty state configuration.
   */
  emptyState?: {
    title?: string;
    description?: string;
    hideLogo?: boolean;
  };
  /**
   * Font size scale for messages.
   * @default 'md'
   */
  fontSize?: 'sm' | 'md' | 'lg';
  /** Callback for retrying a message. */
  onRetry?: (message: MobiChatMessage) => void;
  /** Callback for copying message content. */
  onCopy?: (content: string) => void;
  /** Callback for sharing message content. */
  onShare?: (content: string) => void;
  /** Suggested questions for empty state. */
  suggestions?: string[];
  /** Callback when a suggestion is clicked. */
  onSuggestionClick?: (suggestion: string) => void;
}

/**
 * M.O.B.I.™ Chat Feed Component.
 * A high-performance, scrollable message list with MOBI branding.
 */
export const MobiChatFeed: React.FC<MobiChatFeedProps> = ({
  messages,
  isProcessing = false,
  className = "",
  processingText = "Processing...",
  emptyState = {
    title: "MobiAI Chat",
    description: "Agentic Link established. System is ready for tactical deployment."
  },
  fontSize = 'md',
  onRetry,
  onCopy,
  onShare,
  suggestions = [],
  onSuggestionClick
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  return (
    <div 
      ref={scrollRef}
      className={`flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 scrollbar-thin scrollbar-thumb-mobi-border scrollbar-track-transparent ${className}`}
    >
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          {!emptyState?.hideLogo && (
            <div className="mb-6 animate-pulse">
              <MobiLogoHero className="h-12" />
            </div>
          )}
          <div className="space-y-2">
            <h4 className="text-[15px] font-black tracking-tight text-mobi-text">{emptyState.title}</h4>
            <p className="text-[11px] font-sans text-mobi-text-muted leading-relaxed max-w-[220px] mx-auto opacity-80 mb-8">
              {emptyState.description}
            </p>
            
            {/* Canned Questions / Suggestions */}
            {suggestions.length > 0 && (
              <div className="grid grid-cols-1 gap-2 w-full max-w-[280px]">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => onSuggestionClick?.(s)}
                    className="
                      w-full px-4 py-2.5 text-left text-[11px] font-bold text-mobi-text-muted
                      bg-mobi-surface border border-mobi-border rounded-sm
                      hover:bg-mobi-primary hover:text-mobi-bg hover:border-mobi-primary
                      transition-all duration-200 group flex items-center justify-between
                    "
                  >
                    <span>{s}</span>
                    <MobiIcon name="chevron-right" size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`
              max-w-[90%] px-4 py-2.5 rounded-sm leading-relaxed relative group/msg font-sans
              ${fontSize === 'sm' ? 'text-[13px]' : fontSize === 'lg' ? 'text-[17px]' : 'text-[15px]'}
              ${m.isError 
                ? 'bg-rose-500/10 border border-rose-500/50 text-rose-200' 
                : m.role === 'user' 
                  ? 'bg-mobi-primary text-mobi-bg shadow-lg shadow-mobi-primary/10' 
                  : 'bg-mobi-surface border border-mobi-border text-mobi-text shadow-sm'}
            `}>
              <MobiMarkdown>
                {m.content}
              </MobiMarkdown>
              
              {/* Message Actions (Visible on Hover) */}
              <div className={`
                absolute top-full mt-1 flex gap-1 px-1 py-0.5 bg-mobi-bg border border-mobi-border rounded-sm shadow-sm opacity-0 group-hover/msg:opacity-100 transition-opacity duration-200 z-10
                ${m.role === 'user' ? 'right-0' : 'left-0'}
              `}>
                <button 
                  title="Copy"
                  aria-label="Copy message content"
                  className="p-1 hover:bg-mobi-primary/10 rounded-sm text-mobi-text-muted hover:text-mobi-primary transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(m.content);
                    onCopy?.(m.content);
                  }}
                >
                  <MobiIcon name="copy" size={14} />
                </button>
                <button 
                  title="Share"
                  aria-label="Share message content"
                  className="p-1 hover:bg-mobi-primary/10 rounded-sm text-mobi-text-muted hover:text-mobi-primary transition-colors"
                  onClick={() => onShare?.(m.content)}
                >
                  <MobiIcon name="external" size={14} />
                </button>
                {(m.role === 'assistant' || m.isError) && (
                  <button 
                    title="Retry"
                    aria-label="Retry message generation"
                    className="p-1 hover:bg-mobi-primary/10 rounded-sm text-mobi-text-muted hover:text-mobi-primary transition-colors"
                    onClick={() => onRetry?.(m)}
                  >
                    <MobiIcon name="sync" size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      {isProcessing && (
        <div className="flex flex-col items-start animate-in fade-in slide-in-from-bottom-2">
          <div className="bg-mobi-surface border border-mobi-border px-4 py-2.5 rounded-sm shadow-sm flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-mobi-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-1 bg-mobi-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-mobi-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[9px] font-mono text-mobi-text-muted uppercase tracking-widest ml-2 animate-pulse">{processingText}</span>
          </div>
        </div>
      )}
    </div>
  );
};
