import React, { useRef, useEffect } from 'react';
import { MobiLogoHero } from './MobiLogoHero';

export interface MobiChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  model?: string;
  timestamp?: string;
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
   * Label shown for user messages.
   * @default 'COMMAND • SYNC'
   */
  userLabel?: string;
  /**
   * Label shown for assistant messages.
   * @default 'AGENT • PROCESSED'
   */
  assistantLabel?: string;
  /**
   * Empty state configuration.
   */
  emptyState?: {
    title?: string;
    description?: string;
  };
  /**
   * Font size scale for messages.
   * @default 'md'
   */
  fontSize?: 'sm' | 'md' | 'lg';
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
  userLabel = 'COMMAND • SYNC',
  assistantLabel = 'AGENT • PROCESSED',
  emptyState = {
    title: "MobiAi Interface",
    description: "Agentic Link established. System is ready for tactical deployment."
  },
  fontSize = 'md'
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
          <div className="mb-6 animate-pulse">
            <MobiLogoHero className="h-12" />
          </div>
          <div className="space-y-2">
            <h4 className="text-[15px] font-black tracking-tight text-mobi-text">{emptyState.title}</h4>
            <p className="text-[11px] font-sans text-mobi-text-muted leading-relaxed max-w-[220px] mx-auto opacity-80">
              {emptyState.description}
            </p>
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
              {m.content}
              
              {/* Message Actions (Visible on Hover) */}
              <div className={`
                absolute top-1/2 -translate-y-1/2 flex gap-1 px-2 py-1 bg-mobi-surface border border-mobi-border rounded-lg shadow-xl opacity-0 group-hover/msg:opacity-100 transition-opacity duration-200 z-10
                ${m.role === 'user' ? 'right-full mr-2' : 'left-full ml-2'}
              `}>
                <button 
                  title="Copy"
                  aria-label="Copy message content"
                  className="p-1 hover:bg-mobi-primary/10 rounded text-mobi-text-muted hover:text-mobi-primary transition-colors"
                  onClick={() => navigator.clipboard.writeText(m.content)}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                </button>
                {m.role === 'assistant' && (
                  <button 
                    title="Retry"
                    aria-label="Retry message generation"
                    className="p-1 hover:bg-mobi-primary/10 rounded text-mobi-text-muted hover:text-mobi-primary transition-colors"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  </button>
                )}
              </div>
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
