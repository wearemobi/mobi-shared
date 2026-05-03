import React, { useState } from 'react';
import { MobiChatInput } from './MobiChatInput';
import { MobiChatFeed, MobiChatMessage } from './MobiChatFeed';
import { useMobiChat } from '../hooks/useMobiChat';
import { MobiButton } from './MobiButton';
import { MobiPlan } from './MobiPlanBadge';
import { MobiErrorBoundary } from './MobiErrorBoundary';
import { MobiSentinelMenu, MobiSentinelMenuItem } from './MobiSentinelMenu';

export interface MobiChatWidgetProps {
  /** Initial messages to populate the feed. */
  initialMessages?: MobiChatMessage[];
  /**
   * Initial energy level for the widget.
   * @default 100
   */
  initialEnergy?: number;
  /**
   * Title of the chat window.
   * @default 'MobiAI Chat'
   */
  title?: string;
  /**
   * Placeholder for the input.
   */
  placeholder?: string;
  /**
   * Status message in the footer.
   */
  statusMessage?: string;
  /**
   * Text shown when processing.
   */
  processingText?: string;
  /**
   * Text for computer upload.
   */
  addFromComputerText?: string;
  /**
   * Text for vault upload.
   */
  addFromVaultText?: string;
  /**
   * Title for the empty state.
   */
  emptyStateTitle?: string;
  /**
   * Description for the empty state.
   */
  emptyStateDescription?: string;
  /** User initials for the header badge. */
  userInitials?: string;
  /** User email for the header badge. */
  userEmail?: string;
  /** User name for the header badge. */
  userName?: string;
  /** User plan for the header badge. */
  userPlan?: MobiPlan;
  /** Optional menu items for the user dropdown in the header. */
  userMenuItems?: MobiSentinelMenuItem[];
  /** Callback for language changes in the header menu. */
  onLangChange?: (lang: string) => void;
  /** Current language code for the header menu. */
  lang?: string;
  /** Analytics: Called when widget opens. */
  onOpen?: () => void;
  /** Analytics: Called when widget closes. */
  onClose?: () => void;
  /** Analytics: Called when a message is sent. */
  onMessageSent?: (content: string) => void;
  /** Analytics: Generic action tracker (copy, retry, font_scale, etc). */
  onAction?: (actionType: string, payload?: any) => void;
  /** Analytics: Called when an error occurs. */
  onError?: (error: string) => void;
  /** Analytics: Called when a file is attached. */
  onAttach?: (source: 'computer' | 'vault') => void;
  /** Suggested questions for empty state. */
  suggestions?: string[];
  /** 
   * Externally control if the widget is open. 
   * If provided, the widget operates in controlled mode.
   */
  isOpen?: boolean;
  /** Callback triggered when the widget wants to change its open state. */
  onToggle?: (isOpen: boolean) => void;
}

/**
 * M.O.B.I.™ Autonomous Chat Widget.
 * A floating, pop-up agentic interface that provides immediate access to MobiAI.
 */
export const MobiChatWidget: React.FC<MobiChatWidgetProps> = ({
  initialMessages,
  initialEnergy = 100,
  title = 'MobiAI Chat',
  placeholder,
  statusMessage,
  processingText,
  addFromComputerText,
  addFromVaultText,
  emptyStateTitle,
  emptyStateDescription,
  userInitials,
  userEmail,
  userName,
  userPlan,
  userMenuItems = [],
  onLangChange,
  lang,
  onOpen,
  onClose,
  onMessageSent,
  onAction,
  onError,
  onAttach,
  suggestions = [],
  isOpen: controlledIsOpen,
  onToggle
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const [currentFontSize, setCurrentFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  
  const handleToggle = () => {
    const nextState = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(nextState);
    }
    onToggle?.(nextState);
    
    if (nextState) onOpen?.();
    else onClose?.();
  };

  const { 
    messages, 
    isProcessing, 
    activeModelId, 
    energy, 
    sendMessage, 
    setActiveModelId 
  } = useMobiChat({ initialEnergy, initialMessages });

  // Monitor for errors to trigger analytics hook
  React.useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.isError) {
      onError?.(lastMessage.content);
    }
  }, [messages, onError]);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
    onMessageSent?.(content);
    
    // Check for error state in messages (after next render or via hook)
    // For now, trigger generic send event. Error tracking would usually
    // happen in the hook, but we expose it here.
  };

  const handleAttach = (source: 'computer' | 'vault') => {
    onAttach?.(source);
    onAction?.('attach', { source });
  };


  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="
          w-[380px] h-[550px] bg-mobi-surface border border-mobi-border rounded-xl
          shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col
          animate-in fade-in slide-in-from-bottom-4 duration-300
        ">
          <MobiErrorBoundary>
            {/* Header (Condensed) */}
            <div className="px-5 py-3.5 bg-mobi-bg border-b border-mobi-border flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-3">
                {userInitials && (
                  <MobiSentinelMenu 
                    variant="micro" 
                    user={{
                      initials: userInitials,
                      email: userEmail || '',
                      name: userName,
                      plan: userPlan || 'FREE'
                    }}
                    items={userMenuItems}
                    onLangChange={onLangChange}
                    lang={lang}
                    showThemeSwitcher={false} 
                    showFontSizeSwitcher={true}
                    fontSize={currentFontSize}
                    onFontSizeChange={(size) => {
                      setCurrentFontSize(size);
                      onAction?.('font_scale', { size });
                    }}
                  />
                )}
                <div>
                  <h3 className="text-[14px] font-bold tracking-tight text-mobi-text">{title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MobiButton 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 min-w-0 rounded-sm"
                  onClick={handleToggle}
                  icon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                />
              </div>
            </div>

            {/* Messages Area */}
            <MobiChatFeed 
              messages={messages} 
              isProcessing={isProcessing} 
              className="bg-mobi-bg/10"
              processingText={processingText}
              fontSize={currentFontSize}
              onRetry={(msg) => {
                sendMessage(msg.content);
                onAction?.('retry', { messageId: msg.id });
              }}
              onCopy={(content) => {
                onAction?.('copy', { contentLength: content.length });
              }}
              onShare={(content) => {
                onAction?.('share', { contentLength: content.length });
              }}
              emptyState={{
                title: emptyStateTitle,
                description: emptyStateDescription
              }}
              suggestions={suggestions}
              onSuggestionClick={(s) => {
                handleSendMessage(s);
                onAction?.('suggestion_click', { suggestion: s });
              }}
            />

            {/* Input Area */}
            <div className="p-3 bg-mobi-bg border-t border-mobi-border rounded-b-2xl">
              <MobiChatInput 
                onSend={handleSendMessage}
                isProcessing={isProcessing}
                activeModelId={activeModelId}
                onModelChange={(modelId) => {
                  setActiveModelId(modelId as any);
                  onAction?.('model_change', { modelId });
                }}
                energy={energy}
                placeholder={placeholder}
                statusMessage={statusMessage}
                processingText={processingText}
                addFromComputerText={addFromComputerText}
                addFromVaultText={addFromVaultText}
                onAttach={handleAttach}
                className="border-none shadow-none bg-transparent"
              />
            </div>
          </MobiErrorBoundary>
        </div>
      )}

      {/* Trigger Button (Robot Sentinel) */}
      <button 
        onClick={handleToggle}
        className={`
          w-14 h-14 rounded-sm flex items-center justify-center
          transition-all duration-500 shadow-2xl group border relative
          ${isOpen 
            ? 'bg-mobi-surface border-mobi-border rotate-90' 
            : 'bg-mobi-text border-mobi-text shadow-black/20'}
        `}
      >
        {isOpen ? (
          <svg className="h-6 w-6 text-mobi-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
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
        )}
      </button>
    </div>
  );
};
