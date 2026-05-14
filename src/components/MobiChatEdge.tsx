import React, { useState } from 'react';
import { MobiChatInput } from './MobiChatInput';
import { MobiChatFeed } from './MobiChatFeed';
import { useMobiEdge } from '../hooks/useMobiEdge';
import { MobiButton } from './MobiButton';
import { MobiErrorBoundary } from './MobiErrorBoundary';

export interface MobiChatEdgeProps {
  /** Bearer token for authorization */
  token: string;
  /** Tenant ID (defaults to 'MOBI') */
  tenantId?: string;
  /** Base URL for the Edge Reactor API */
  baseUrl?: string;
  /** Title of the chat window */
  title?: string;
  /** Placeholder for the input */
  placeholder?: string;
  /** 
   * Whether to show the Haki energy progress bar.
   * @default true
   */
   showEnergyBar?: boolean;
  /** Label for the energy bar. @default "HAKI ENERGY RESERVE" */
  energyLabel?: string;
  /** Status message shown in the input. @default "SENTINEL ACTIVE" */
  statusMessage?: string;
  /** Initial model ID to select */
  initialModelId?: string;
  /** 
   * Externally control if the widget is open. 
   */
  isOpen?: boolean;
  /** Callback triggered when the widget wants to change its open state. */
  onToggle?: (isOpen: boolean) => void;
}

/**
 * M.O.B.I.™ Edge Chat Widget.
 * A specialized interface for interacting with the Edge Reactor.
 * Strictly compliant with Radar schema (haki_limit, haki_used).
 */
export const MobiChatEdge: React.FC<MobiChatEdgeProps> = ({
  token,
  tenantId = 'MOBI',
  baseUrl,
  title = 'MobiEdge Agent',
  placeholder = 'Ask MobiAI...',
  energyLabel = 'Energy Meter',
  statusMessage = 'SENTINEL ACTIVE',
  initialModelId,
  isOpen: controlledIsOpen,
  onToggle
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const {
    messages,
    models,
    status,
    isProcessing,
    activeModelId,
    setActiveModelId,
    sendMessage
  } = useMobiEdge({ 
    token, 
    tenantId, 
    baseUrl,
    initialModelId,
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Welcome to MobiAI Chat - Support Assistant, powered by MobiEdge - what do you want do build today?',
        timestamp: Date.now()
      }
    ]
  });

  const handleToggle = () => {
    const nextState = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(nextState);
    }
    onToggle?.(nextState);
  };

  const modelOptions = models
    .filter(m => m.resource_kind === 'AI_MODEL')
    .map(m => ({ 
      id: m.slug, 
      label: `${m.engine_name} (${m.slug})`
    }));

  // Energy calculation based on Radar schema
  const hakiLimit = status?.haki_limit || 100;
  const hakiUsed = status?.haki_used || 0;
  const hakiBalance = Math.max(0, hakiLimit - hakiUsed);
  const energyPercent = (hakiBalance / hakiLimit) * 100;
  const isOutOfEnergy = hakiBalance <= 0;

  return (
    <div className={
      isOpen 
        ? "fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[9999] flex flex-col sm:items-end sm:gap-4" 
        : "fixed bottom-6 right-6 z-[9999]"
    }>
      {/* Chat Window */}
      {isOpen && (
        <div className="
          w-full h-full sm:w-[380px] sm:h-[550px] bg-mobi-surface border-0 sm:border border-mobi-border rounded-none sm:rounded-xl
          shadow-none sm:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col
          animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden
        ">
          <MobiErrorBoundary>
            {/* Header */}
            <div className="px-5 py-3.5 bg-mobi-bg border-b border-mobi-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                <h3 className="text-[14px] font-bold tracking-tight text-mobi-text">{title}</h3>
              </div>
              <MobiButton 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 min-w-0"
                onClick={handleToggle}
                icon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
              />
            </div>


            {/* Messages Feed */}
            <MobiChatFeed 
              messages={messages as any} 
              isProcessing={isProcessing} 
              className="flex-1 bg-mobi-bg/10"
            />

            {/* Input Area */}
            <div className="p-3 bg-mobi-bg border-t border-mobi-border">
              <MobiChatInput 
                onSend={sendMessage}
                isProcessing={isProcessing || isOutOfEnergy}
                activeModelId={activeModelId}
                onModelChange={setActiveModelId}
                models={modelOptions}
                energy={energyPercent}
                energyStats={{
                  label: energyLabel,
                  used: hakiUsed,
                  limit: hakiLimit,
                  percent: energyPercent
                }}
                placeholder={isOutOfEnergy ? "Insufficient Haki Energy..." : placeholder}
                statusMessage={isOutOfEnergy ? "RECHARGE REQUIRED" : statusMessage}
                className="border-none shadow-none bg-transparent"
              />
            </div>
          </MobiErrorBoundary>
        </div>
      )}

      {/* Trigger Button */}
      {!isOpen && (
        <button 
          onClick={handleToggle}
          className="
            w-14 h-14 rounded-sm bg-mobi-text border border-mobi-text
            flex items-center justify-center shadow-2xl group transition-all duration-300
            hover:scale-105 active:scale-95
          "
        >
          <div className="relative flex items-center justify-center">
            {/* Ambient Pulse */}
            <div className="absolute inset-0 h-6 w-6 bg-mobi-bg/20 rounded-full animate-ping group-hover:hidden" />
            
            {/* Robot Sentinel Icon */}
            <svg 
              className="h-6 w-6 text-mobi-bg group-hover:scale-110 transition-transform" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4" />
              <line x1="8" y1="16" x2="8" y2="16" />
              <line x1="16" y1="16" x2="16" y2="16" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};
