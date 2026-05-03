import React, { useState } from 'react';
import { MobiChatInput } from './MobiChatInput';
import { MobiChatFeed, MobiChatMessage } from './MobiChatFeed';
import { MobiLogo } from './MobiLogo';
import { MobiLogoHero } from './MobiLogoHero';
import { useMobiChat } from '../hooks/useMobiChat';
import { MobiButton } from './MobiButton';
import { MobiUserBadge } from './MobiUserBadge';
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
   * Label for user messages.
   * @default 'COMMAND • SYNC'
   */
  userLabel?: string;
  /**
   * Label for assistant messages.
   * @default 'AGENT • PROCESSED'
   */
  assistantLabel?: string;
  /**
   * Title of the chat window.
   * @default 'MobiAi Chat'
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
}

/**
 * M.O.B.I.™ Autonomous Chat Widget.
 * A floating, pop-up agentic interface that provides immediate access to MobiAI.
 */
export const MobiChatWidget: React.FC<MobiChatWidgetProps> = ({
  initialMessages,
  initialEnergy = 100,
  userLabel,
  assistantLabel,
  title = 'MobiAi Chat',
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
  lang
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const { 
    messages, 
    isProcessing, 
    activeModelId, 
    energy, 
    sendMessage, 
    setActiveModelId 
  } = useMobiChat({ initialEnergy, initialMessages });

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
          shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col
          animate-in fade-in slide-in-from-bottom-4 duration-300
        ">
          <MobiErrorBoundary>
            {/* Header (Condensed) */}
            <div className="px-5 py-3.5 bg-mobi-bg border-b border-mobi-border flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-mobi-text p-1 rounded-sm">
                  <MobiLogo size={20} className="text-mobi-bg" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold tracking-tight text-mobi-text">{title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {userInitials && (
                  <>
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
                      onFontSizeChange={setCurrentFontSize}
                    />
                    <div className="h-4 w-[1px] bg-mobi-border mx-1" />
                  </>
                )}
                <MobiButton 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 min-w-0 rounded-sm"
                  onClick={() => setIsOpen(false)}
                  icon={<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                />
              </div>
            </div>

            {/* Messages Area (Now extracted) */}
            <MobiChatFeed 
              messages={messages} 
              isProcessing={isProcessing} 
              className="bg-mobi-bg/10"
              userLabel={userLabel}
              assistantLabel={assistantLabel}
              processingText={processingText}
              fontSize={currentFontSize}
              emptyState={{
                title: emptyStateTitle,
                description: emptyStateDescription
              }}
            />

            {/* Input Area */}
            <div className="p-3 bg-mobi-bg border-t border-mobi-border rounded-b-2xl">
              <MobiChatInput 
                onSend={sendMessage}
                isProcessing={isProcessing}
                activeModelId={activeModelId}
                onModelChange={setActiveModelId}
                energy={energy}
                placeholder={placeholder}
                statusMessage={statusMessage}
                processingText={processingText}
                addFromComputerText={addFromComputerText}
                addFromVaultText={addFromVaultText}
                className="border-none shadow-none bg-transparent"
              />
            </div>
          </MobiErrorBoundary>
        </div>
      )}

      {/* Trigger Button (Strictly Square & Black) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-none flex items-center justify-center
          transition-all duration-500 shadow-2xl group border
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
          <div className="relative">
            <MobiLogo className="h-8 w-8 text-mobi-bg group-hover:scale-110 transition-transform" />
          </div>
        )}
      </button>
    </div>
  );
};
