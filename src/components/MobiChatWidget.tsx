import React, { useState } from 'react';
import { MobiChatInput } from './MobiChatInput';
import { MobiLogo } from './MobiLogo';
import { useMobiChat } from '../hooks/useMobiChat';
import { MobiButton } from './MobiButton';

export interface MobiChatWidgetProps {
  /**
   * Title shown in the widget header.
   * @default 'M.O.B.I. Agentic Link'
   */
  title?: string;
  /**
   * Initial energy level for the widget.
   * @default 100
   */
  initialEnergy?: number;
}

/**
 * M.O.B.I.™ Autonomous Chat Widget.
 * A floating, pop-up agentic interface that provides immediate access to MobiAI.
 */
export const MobiChatWidget: React.FC<MobiChatWidgetProps> = ({
  initialEnergy = 100
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    messages, 
    isProcessing, 
    activeModelId, 
    energy, 
    sendMessage, 
    setActiveModelId 
  } = useMobiChat({ initialEnergy });

  const getModelStatus = () => {
    switch (activeModelId) {
      case 'fast': return 'Fast • Answers Quickly';
      case 'pro': return 'Pro • Solves Complex Problems';
      case 'expert': return 'Expert • Deep Agentic Reasoning';
      default: return 'Online • Secure Connection';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="
          w-[380px] h-[550px] bg-mobi-surface border border-mobi-border rounded-2xl
          shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden
          animate-in fade-in slide-in-from-bottom-4 duration-300
        ">
          {/* Header */}
          <div className="px-4 py-4 bg-mobi-bg border-b border-mobi-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MobiLogo className="h-5 w-5" />
              <div>
                <h3 className="text-[12px] font-black uppercase tracking-widest text-mobi-text leading-none">MobiAI Chat</h3>
                <div className="mt-1.5">
                  <span className="text-[8px] font-mono text-mobi-text-muted uppercase tracking-wider font-bold">
                    {getModelStatus()}
                  </span>
                </div>
              </div>
            </div>
            <MobiButton 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 min-w-0 rounded-xl"
              onClick={() => setIsOpen(false)}
              icon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
            />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-mobi-bg/20">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="mb-6 animate-pulse">
                  <MobiLogo className="h-10 w-10 opacity-40" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-mobi-text">MobiAI Interface</h4>
                  <p className="text-[9px] font-mono text-mobi-text-muted leading-relaxed uppercase tracking-widest max-w-[200px] mx-auto opacity-60">
                    Agentic Link established. System ready for tactical deployment.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}
                >
                  <div className={`
                    max-w-[85%] px-3 py-2 rounded-xl text-[11px] font-sans leading-relaxed
                    ${m.role === 'user' 
                      ? 'bg-mobi-primary text-mobi-bg rounded-tr-none shadow-lg shadow-mobi-primary/10' 
                      : 'bg-mobi-surface border border-mobi-border text-mobi-text rounded-tl-none'}
                  `}>
                    {m.content}
                  </div>
                  <span className="text-[8px] font-mono text-mobi-text-muted mt-1 uppercase tracking-tighter">
                    {m.role === 'user' ? 'Command' : 'Response'} • {m.model}
                  </span>
                </div>
              ))
            )}
            {isProcessing && (
              <div className="flex flex-col items-start animate-pulse">
                <div className="bg-mobi-surface border border-mobi-border px-3 py-2 rounded-xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-mobi-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-1 bg-mobi-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-1 bg-mobi-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-mobi-bg border-t border-mobi-border">
            <MobiChatInput 
              onSend={sendMessage}
              isProcessing={isProcessing}
              activeModelId={activeModelId}
              onModelChange={setActiveModelId}
              energy={energy}
              className="border-none shadow-none bg-transparent"
            />
          </div>
        </div>
      )}

      {/* Trigger Button (Square Aesthetic) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-2xl flex items-center justify-center
          transition-all duration-500 shadow-2xl group border
          ${isOpen 
            ? 'bg-mobi-surface border-mobi-border rotate-90' 
            : 'bg-mobi-primary border-mobi-primary shadow-mobi-primary/20'}
        `}
      >
        {isOpen ? (
          <svg className="h-6 w-6 text-mobi-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <MobiLogo className="h-7 w-7 text-mobi-bg group-hover:scale-110 transition-transform" />
          </div>
        )}
      </button>
    </div>
  );
};
