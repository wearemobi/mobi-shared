import React, { useState } from 'react';
import { MobiChatInput } from './MobiChatInput';
import { MobiChatFeed } from './MobiChatFeed';
import { useMobiEdge, MobiEdgeMessage } from '../hooks/useMobiEdge';
import { MobiButton } from './MobiButton';
import { MobiErrorBoundary } from './MobiErrorBoundary';
import { MobiIcon } from './MobiIcon';

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
   * Custom title for the welcome screen (when no messages)
   */
  welcomeTitle?: string;
  /**
   * Custom description for the welcome screen
   */
  welcomeDescription?: string;
  /**
   * If true, hides the MOBI logo on the welcome screen
   * @default false
   */
  hideWelcomeLogo?: boolean;
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
  /** Custom CSS classes for the fixed container (e.g. for positioning) */
  containerClassName?: string;
  /** 
   * Explicitly enable/disable agentic memory. 
   * If not provided, it is automatically determined by tenant tier.
   */
  useMemory?: boolean;
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
  onSendMessage,
  containerClassName,
  welcomeTitle,
  welcomeDescription,
  hideWelcomeLogo,
  useMemory
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isInitiallyOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const defaultMessages: MobiEdgeMessage[] = [];

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
    clearHistory,
    isConnected
  } = useMobiEdge({
    token,
    tenantId,
    baseUrl,
    agentId,
    persistSession,
    initialModelId,
    useMemory,
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
      containerClassName || (isOpen
        ? "fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[9999] flex flex-col sm:items-end sm:gap-4"
        : "fixed bottom-6 right-6 z-[9999]")
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
                <div className={`h-2 w-2 rounded-full ${!isConnected ? 'bg-rose-500' : (isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500')}`} />
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
                  suffixIcon={<MobiIcon name="trash" size={16} />}
                />
                <MobiButton
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 min-w-0"
                  onClick={handleToggle}
                  suffixIcon={<MobiIcon name="close" size={16} />}
                />
              </div>
            </div>


            {/* Messages Feed */}
            <MobiChatFeed
              messages={messages as any}
              isProcessing={isProcessing}
              className="flex-1 bg-mobi-bg/10"
              emptyState={{
                title: welcomeTitle || 'MobiAI Chat',
                description: welcomeDescription || customWelcome || 'Agentic Link established. System is ready for tactical deployment.',
                hideLogo: hideWelcomeLogo
              }}
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
                statusMessage={!isConnected ? "OFFLINE" : (isOutOfEnergy ? "RECHARGE REQUIRED" : statusMessage)}
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
              <MobiIcon name="bot" size={24} className="text-mobi-bg group-hover:scale-110 transition-transform" />
            )}
            {hideRobotIcon && (
              <MobiIcon name="chat" size={24} className="text-mobi-bg" />
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default MobiChatEdge;

