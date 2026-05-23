import React, { useState } from 'react';
import { MobiChatInput } from './MobiChatInput';
import { MobiChatFeed, MobiChatMessage } from './MobiChatFeed';
import { useMobiChat } from '../hooks/useMobiChat';
import { MobiButton } from './MobiButton';
import { MobiPlan } from './MobiPlanBadge';
import { MobiErrorBoundary } from './MobiErrorBoundary';
import { MobiSentinelMenu, MobiSentinelMenuItem } from './MobiSentinelMenu';
import { MobiIcon } from './MobiIcon';

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
  /** Callback to handle the actual sending of the message and returning the response text. */
  onSendMessage?: (message: string, model: string) => Promise<string>;
  /** Custom CSS classes for the fixed container (e.g. for positioning) */
  containerClassName?: string;
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
  onToggle,
  onSendMessage,
  containerClassName
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const [currentFontSize, setCurrentFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  
  const handleToggle = () => {
    const nextState = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(nextState);
    }
    onToggle?.(nextState);
    
    if (nextState) {
      onOpen?.();
    } else {
      setIsFullScreen(false);
      onClose?.();
    }
  };

  const { 
    messages, 
    isProcessing, 
    activeModelId, 
    energy, 
    sendMessage, 
    setActiveModelId
  } = useMobiChat({ initialEnergy, initialMessages, onSendMessage });

  const lastErrorIdRef = React.useRef<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const toastTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = React.useCallback((message: string, type: 'success' | 'info' = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 2000);
  }, []);

  // Monitor for errors to trigger analytics hook
  React.useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.isError) {
      if (lastMessage.id !== lastErrorIdRef.current) {
        lastErrorIdRef.current = lastMessage.id;
        onError?.(lastMessage.content);
      }
    }
  }, [messages, onError]);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
    onMessageSent?.(content);
  };

  const handleAttach = (source: 'computer' | 'vault') => {
    onAttach?.(source);
    onAction?.('attach', { source });
  };

  const handleCopy = React.useCallback((content: string) => {
    navigator.clipboard.writeText(content);
    showToast('Copied to Clipboard', 'success');
    onAction?.('copy', { contentLength: content.length });
  }, [showToast, onAction]);

  const handleShare = React.useCallback((content: string) => {
    if (navigator.share) {
      navigator.share({ text: content })
        .then(() => showToast('Shared successfully', 'success'))
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.error('Share error:', err);
            navigator.clipboard.writeText(content);
            showToast('Copied instead (Share failed)', 'info');
          }
        });
    } else {
      navigator.clipboard.writeText(content);
      showToast('Copied Link & Text', 'success');
    }
    onAction?.('share', { contentLength: content.length });
  }, [showToast, onAction]);

  const handleRetry = React.useCallback((msg: MobiChatMessage) => {
    const index = messages.findIndex(m => m.id === msg.id);
    if (index === -1) return;

    for (let i = index - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        const prompt = messages[i].content;
        sendMessage(prompt);
        onAction?.('retry', { messageId: msg.id, prompt });
        showToast('Retrying generation', 'info');
        return;
      }
    }
    showToast('No user prompt found to retry', 'info');
  }, [messages, sendMessage, onAction, showToast]);


  const calculatedContainerClassName = isOpen 
    ? (isFullScreen 
        ? "fixed inset-0 z-[9999] flex flex-col" 
        : (containerClassName || "fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[9999] flex flex-col sm:items-end sm:gap-4"))
    : (containerClassName || "fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4");

  const calculatedChatWindowClassName = isFullScreen
    ? "w-full h-full bg-mobi-surface border-0 flex flex-col"
    : "w-full h-full sm:w-[380px] sm:h-[550px] bg-mobi-surface border-0 sm:border border-mobi-border rounded-none sm:rounded-xl shadow-none sm:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300";

  return (
    <div className={calculatedContainerClassName}>
      {/* Chat Window */}
      {isOpen && (
        <div className={calculatedChatWindowClassName}>
          <MobiErrorBoundary>
            {/* Header (Condensed) */}
            <div className="px-5 py-3.5 bg-mobi-bg border-b border-mobi-border flex items-center justify-between rounded-t-none sm:rounded-t-xl relative overflow-hidden">
              {toast && (
                <div className="absolute inset-0 bg-mobi-bg/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300 px-5 z-20">
                  <div className="flex items-center gap-2">
                    <MobiIcon name={toast.type === 'success' ? 'check' : 'info'} size={14} className="text-mobi-primary animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-mobi-text uppercase">{toast.message}</span>
                  </div>
                </div>
              )}
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
              <div className="flex items-center gap-1.5">
                <MobiButton 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 min-w-0 rounded-sm opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setIsFullScreen(prev => !prev);
                    onAction?.('fullscreen_toggle', { isFullScreen: !isFullScreen });
                  }}
                  title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Mode"}
                  icon={<MobiIcon name={isFullScreen ? "monitor" : "external"} size={14} />}
                />
                <MobiButton 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 min-w-0 rounded-sm"
                  onClick={handleToggle}
                  icon={<MobiIcon name="close" size={16} />}
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
              onRetry={handleRetry}
              onCopy={handleCopy}
              onShare={handleShare}
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
            <div className="p-3 bg-mobi-bg border-t border-mobi-border rounded-b-none sm:rounded-b-2xl">
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
            ? 'bg-mobi-surface border-mobi-border rotate-90 hidden sm:flex' 
            : 'bg-mobi-text border-mobi-text shadow-black/20'}
        `}
      >
        {isOpen ? (
          <MobiIcon name="close" size={24} className="text-mobi-text" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Ambient Pulse */}
            <div className="absolute inset-0 h-6 w-6 bg-mobi-bg/20 rounded-full animate-ping group-hover:hidden" />
            
            {/* Robot Sentinel Icon */}
            <MobiIcon name="bot" size={24} className="text-mobi-bg group-hover:scale-110 transition-transform" />
          </div>
        )}
      </button>
    </div>
  );
};

export default MobiChatWidget;
