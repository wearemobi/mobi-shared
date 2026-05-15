import React, { useState } from 'react';
import { MobiChatInput } from './MobiChatInput';
import { MobiChatFeed } from './MobiChatFeed';
import { useMobiEdge, MobiEdgeMessage } from '../hooks/useMobiEdge';
import { MobiButton } from './MobiButton';
import { MobiErrorBoundary } from './MobiErrorBoundary';

export interface MobiChatEdgeProps {
  /** Bearer token for authorization */
  token: string;
  /** Tenant ID (defaults to 'MOBI') */
  tenantId?: string;
  /** Base URL for the Edge Reactor API */
  baseUrl?: string;
  /** Target Agent ID (defaults to 'mobi-core') */
  agentId?: string;
  /** Whether to persist session in local storage. @default true */
  persistSession?: boolean;
  /** Title of the chat window */
  title?: string;
  /** Placeholder for the input */
  placeholder?: string;
  /** Label for the energy bar. @default "Energy Meter" */
  energyLabel?: string;
  /** Status message shown in the input. @default "SENTINEL ACTIVE" */
  statusMessage?: string;
  /** Initial model ID to select */
  initialModelId?: string;
  /** 
   * Initial messages to populate the feed. 
   * If not provided, a default welcome message is used.
   */
  initialMessages?: MobiEdgeMessage[];
  /** 
   * Optional shortcut to override the default welcome message text.
   */
  customWelcome?: string;
  /**
   * List of suggested questions shown as interactive pills.
   */
  suggestions?: string[];
  /** 
   * If true, the widget starts in expanded mode.
   * @default false
   */
  isInitiallyOpen?: boolean;
  /**
   * If true, hides the robot icon on the trigger button.
   * @default false
   */
  hideRobotIcon?: boolean;
  /** 
   * Externally control if the widget is open. 
   */
  isOpen?: boolean;
  /** Callback triggered when the widget wants to change its open state. */
  onToggle?: (isOpen: boolean) => void;
  /** Callback triggered when a message is sent. */
  onSendMessage?: (message: string) => void;
}

/**
 * M.O.B.I.™ Edge Chat Widget.
 * Updated to support Specification v2.1.0 (API v1).
 * Strictly compliant with Radar schema (haki_limit, haki_used).
 */
export const MobiChatEdge: React.FC<MobiChatEdgeProps> = ({
  token,
  tenantId = 'MOBI',
  baseUrl,
  agentId,
  persistSession = true,
  title = 'MobiEdge Agent',
  placeholder = 'Ask MobiAI...',
  energyLabel = 'Energy Meter',
  statusMessage = 'CONNECTED',
  initialModelId,
  initialMessages,
  customWelcome,
  suggestions: propSuggestions = [],
  isInitiallyOpen = false,
  hideRobotIcon = false,
  isOpen: controlledIsOpen,
  onToggle,
  onSendMessage
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isInitiallyOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // Default welcome if no initial messages provided
  const defaultMessages: MobiEdgeMessage[] = [
    {
      id: 'welcome',
      role: 'assistant',
      content: customWelcome || 'Welcome to MobiAI Chat - Support Assistant, powered by MobiEdge - what do you want do build today?',
      timestamp: Date.now()
    }
  ];

  const {
    messages,
    models,
    status,
    isProcessing,
    activeModelId,
    setActiveModelId,
    sendMessage,
    suggestions: apiSuggestions,
    isMemoryActive,
    clearHistory
  } = useMobiEdge({
    token,
    tenantId,
    baseUrl,
    agentId,
    persistSession,
    initialModelId,
    initialMessages: initialMessages || defaultMessages
  });

  const handleToggle = () => {
    const nextState = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(nextState);
    }
    onToggle?.(nextState);
  };

  const handleSend = (msg: string) => {
    sendMessage(msg);
    onSendMessage?.(msg);
  };

  const modelOptions = models
    .filter(m => m.resource_kind === 'AI_MODEL')
    .map(m => ({
      id: m.slug,
      label: `${m.engine_name} (${m.slug})`
    }));

  // Merge suggestions: API suggestions take precedence, fall back to props
  const displaySuggestions = apiSuggestions.length > 0 ? apiSuggestions : propSuggestions;

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
          w-full h-full sm:w-[380px] sm:h-[600px] bg-mobi-surface border-0 sm:border border-mobi-border rounded-none sm:rounded-xl
          shadow-none sm:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col
          animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden
        ">
          <MobiErrorBoundary>
            {/* Header */}
            <div className="px-5 py-3.5 bg-mobi-bg border-b border-mobi-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                <div className="flex flex-col">
                  <h3 className="text-[14px] font-bold tracking-tight text-mobi-text leading-none">{title}</h3>
                  {isMemoryActive && (
                    <span className="text-[9px] text-emerald-500 font-bold tracking-widest mt-1 opacity-80 uppercase">Memory Active</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <MobiButton
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 min-w-0 opacity-40 hover:opacity-100 transition-opacity"
                  onClick={clearHistory}
                  title="Clear Session"
                  suffixIcon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                />
                <MobiButton
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 min-w-0"
                  onClick={handleToggle}
                  suffixIcon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                />
              </div>
            </div>


            {/* Messages Feed */}
            <MobiChatFeed
              messages={messages as any}
              isProcessing={isProcessing}
              className="flex-1 bg-mobi-bg/10"
            />

            {/* Suggestions Area */}
            {displaySuggestions.length > 0 && (
              <div className="px-3 py-2 bg-mobi-bg/50 flex gap-2 overflow-x-auto no-scrollbar border-t border-mobi-border/50">
                {displaySuggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion)}
                    className="
                      whitespace-nowrap px-3 py-1.5 rounded-full bg-mobi-surface border border-mobi-border 
                      text-[11px] text-mobi-text-muted hover:text-mobi-primary hover:border-mobi-primary 
                      transition-colors flex-shrink-0
                    "
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-mobi-bg border-t border-mobi-border">
              <MobiChatInput
                onSend={handleSend}
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
                isCompact={true}
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
            {!hideRobotIcon && (
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
            )}
            {hideRobotIcon && (
              <svg className="h-6 w-6 text-mobi-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            )}
          </div>
        </button>
      )}
    </div>
  );
};

