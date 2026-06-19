import React, { useState } from 'react';
import { cn } from '@wearemobi/ui';
import { MobiChatHistory } from './MobiChatHistory';
import { MobiChatInput } from './MobiChatInput';
import { MobiChatWelcome } from './MobiChatWelcome';
import { MobiChatModelSelector } from './MobiChatModelSelector';
import { MobiChatMenu } from './MobiChatMenu';
import { MobiEdgeMessage, MobiEdgeModel } from '../hooks/useMobiEdge';
import { X, MessageSquare, Maximize2, Minimize2, Image, FileText, Bot } from 'lucide-react';
import { MobiLogo } from './MobiLogo';
import { MobiButton } from './MobiButton';

export interface MobiChatProps {
  variant?: 'embedded' | 'fullscreen' | 'floating';
  messages: MobiEdgeMessage[];
  models?: MobiEdgeModel[];
  activeModelId?: string;
  isProcessing?: boolean;
  onSendMessage: (content: string, modelId?: string) => void;
  onSelectModel?: (id: string) => void;
  onClose?: () => void;
  onRetry?: (messageId: string) => void;
  
  // Customization
  title?: string;
  greeting?: string;
  userName?: string;
  suggestions?: string[];
  placeholder?: string;
  headerLogo?: React.ReactNode;
  welcomeLogo?: React.ReactNode;
  assistantAvatar?: React.ReactNode;
  
  // Floating only
  triggerIcon?: React.ReactNode;
  defaultOpen?: boolean;
  
  className?: string;
}

export const MobiChat: React.FC<MobiChatProps> = ({
  variant = 'embedded',
  messages,
  models = [],
  activeModelId,
  isProcessing,
  onSendMessage,
  onSelectModel,
  onClose,
  onRetry,
  title = 'M.O.B.I. Assistant',
  greeting = 'What\'s the vibe',
  userName,
  suggestions = [],
  placeholder = 'Ask anything...',
  headerLogo,
  welcomeLogo,
  assistantAvatar,
  triggerIcon,
  defaultOpen = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // For floating -> fullscreen toggle

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue, activeModelId);
    setInputValue('');
  };

  const handleSuggestion = (suggestion: string) => {
    onSendMessage(suggestion, activeModelId);
  };

  const handleRetry = (msgId: string) => {
    if (onRetry) {
      onRetry(msgId);
      return;
    }
    // Default logic: find the closest previous user message and send it again
    const idx = messages.findIndex(m => m.id === msgId);
    if (idx > 0) {
      for (let i = idx - 1; i >= 0; i--) {
        if (messages[i].role === 'user') {
          onSendMessage(messages[i].content, activeModelId);
          break;
        }
      }
    }
  };

  // Chat Menu Items
  const menuItems = [
    { id: 'file', label: 'Upload file', icon: <FileText size={16} />, onClick: () => console.log('file') },
    { id: 'image', label: 'Upload image', icon: <Image size={16} />, onClick: () => console.log('image') },
  ];

  const aiModels = models.filter(m => m.resource_kind === 'AI_MODEL');

  const modelSelector = aiModels.length > 0 && onSelectModel ? (
    <MobiChatModelSelector 
      models={aiModels} 
      activeModelId={activeModelId} 
      onSelect={onSelectModel} 
    />
  ) : null;

  const innerContent = (
    <>
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {messages.length === 0 ? (
          <MobiChatWelcome 
            greeting={greeting} 
            userName={userName} 
            suggestions={suggestions} 
            onSuggestionClick={handleSuggestion} 
            logo={welcomeLogo}
          />
        ) : (
          <MobiChatHistory 
            messages={messages} 
            isProcessing={isProcessing} 
            onRetryMessage={handleRetry}
            assistantAvatar={assistantAvatar}
            className="h-full pb-4"
          />
        )}
      </div>
      <div className="p-4 pt-2 shrink-0 bg-background z-10">
        <div className="max-w-3xl mx-auto">
          <MobiChatMenu items={menuItems} open={false} onOpenChange={() => {}}>
            <MobiChatInput 
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              placeholder={placeholder}
              modelSelector={modelSelector}
              disabled={isProcessing}
            />
          </MobiChatMenu>
          <div className="text-center mt-2 pb-1 text-[10px] text-muted-foreground/60">
            Powered by M.O.B.I.™ Edge
          </div>
        </div>
      </div>
    </>
  );

  // 1. FLOATING VARIANT
  if (variant === 'floating') {
    const isActualFullscreen = isExpanded;
    return (
      <>
        {isOpen && (
          <div className={cn(
            'fixed z-50 bg-background sm:border border-border shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out',
            isActualFullscreen 
              ? 'inset-0 w-full h-full rounded-none' 
              : 'inset-0 w-full h-[100dvh] rounded-none sm:top-auto! sm:left-auto! sm:w-[400px]! sm:h-[600px]! sm:max-h-[calc(100vh-120px)]! sm:rounded-2xl!',
            className
          )}
          style={!isActualFullscreen ? { bottom: '96px', right: '24px' } : {}}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30 shrink-0">
              <div className="flex items-center gap-2 font-semibold">
                {headerLogo || <MobiLogo size={18} />}
                <span>{title}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-muted rounded-md transition-colors hidden sm:block">
                  {isActualFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-muted rounded-md transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>
            {innerContent}
          </div>
        )}
        
        {!isActualFullscreen && (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "fixed z-50 bg-primary text-primary-foreground rounded-full shadow-lg items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0",
              isOpen ? "hidden sm:flex" : "flex"
            )}
            style={{ width: '56px', height: '56px', padding: '16px', bottom: '24px', right: '24px' }}
          >
            {isOpen ? <X size={24} /> : (triggerIcon || <Bot size={24} />)}
          </button>
        )}
      </>
    );
  }

  // 2. FULLSCREEN VARIANT
  if (variant === 'fullscreen') {
    return (
      <div className={cn('flex bg-background w-full h-full', className)}>
        {/* Sidebar (Placeholder for conversations) */}
        <div className="w-64 border-r border-border bg-muted/10 hidden md:flex flex-col">
          <div className="px-4 border-b border-border shrink-0 h-14 flex items-center justify-center">
            <MobiButton variant="outline" size="sm" fullWidth icon={<MessageSquare size={14} />}>
              New Chat
            </MobiButton>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <div className="text-xs font-medium text-muted-foreground px-2 py-2 mb-1">Recent</div>
            <button className="w-full text-left px-3 py-2 text-sm rounded-md bg-muted font-medium truncate">
              Current Conversation
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full relative overflow-hidden">
          <div className="flex items-center justify-between px-4 border-b border-border shrink-0 h-14">
            <div className="flex items-center">
              {headerLogo ? (
                <div className="mr-2">{headerLogo}</div>
              ) : (
                <MobiLogo size={18} className="mr-2" />
              )}
              <span className="font-semibold text-sm">{title}</span>
            </div>
            <div className="hidden md:block flex-1" />
            {onClose && (
              <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-md text-muted-foreground ml-auto transition-colors">
                <X size={16} />
              </button>
            )}
          </div>
          {innerContent}
        </div>
      </div>
    );
  }

  // 3. EMBEDDED VARIANT
  return (
    <div className={cn('flex flex-col bg-background border border-border rounded-xl overflow-hidden h-[600px]', className)}>
      {innerContent}
    </div>
  );
};
