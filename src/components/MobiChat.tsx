import React, { useState } from 'react';
import { cn } from '@wearemobi/ui';
import { MobiChatHistory } from './MobiChatHistory';
import { MobiChatInput } from './MobiChatInput';
import { MobiChatWelcome } from './MobiChatWelcome';
import { MobiChatModelSelector } from './MobiChatModelSelector';
import { MobiChatMenu } from './MobiChatMenu';
import { MobiEdgeMessage, MobiEdgeModel } from '../hooks/useMobiEdge';
import { X, MessageSquare, Maximize2, Minimize2, Image, FileText } from 'lucide-react';
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
  
  // Customization
  title?: string;
  greeting?: string;
  userName?: string;
  suggestions?: string[];
  placeholder?: string;
  
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
  title = 'M.O.B.I. Assistant',
  greeting = 'What\'s the vibe',
  userName,
  suggestions = [],
  placeholder = 'Ask anything...',
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

  // Chat Menu Items
  const menuItems = [
    { id: 'file', label: 'Upload file', icon: <FileText size={16} />, onClick: () => console.log('file') },
    { id: 'image', label: 'Upload image', icon: <Image size={16} />, onClick: () => console.log('image') },
  ];

  const modelSelector = models.length > 0 && onSelectModel ? (
    <MobiChatModelSelector 
      models={models} 
      activeModelId={activeModelId} 
      onSelect={onSelectModel} 
    />
  ) : null;

  const innerContent = (
    <>
      <div className="flex-1 overflow-hidden relative">
        {messages.length === 0 ? (
          <MobiChatWelcome 
            greeting={greeting} 
            userName={userName} 
            suggestions={suggestions} 
            onSuggestionClick={handleSuggestion} 
          />
        ) : (
          <MobiChatHistory 
            messages={messages} 
            isProcessing={isProcessing} 
            className="h-full"
          />
        )}
      </div>
      <div className="p-4 pt-2">
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
          <div className="text-center mt-2 text-[10px] text-muted-foreground/60">
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
      <div className={cn('fixed z-50', isActualFullscreen ? 'inset-0' : 'bottom-6 right-6 flex flex-col items-end', className)}>
        {isOpen && (
          <div className={cn(
            'bg-background border border-border shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out',
            isActualFullscreen 
              ? 'w-full h-full rounded-none' 
              : 'w-[400px] h-[600px] max-h-[calc(100vh-100px)] mb-4 rounded-2xl'
          )}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2 font-semibold">
                <MobiLogo size={18} />
                <span>{title}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-muted rounded-md transition-colors">
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
            className="h-14 w-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          >
            {isOpen ? <X size={24} /> : (triggerIcon || <MessageSquare size={24} />)}
          </button>
        )}
      </div>
    );
  }

  // 2. FULLSCREEN VARIANT
  if (variant === 'fullscreen') {
    return (
      <div className={cn('fixed inset-0 flex bg-background', className)}>
        {/* Sidebar (Placeholder for conversations) */}
        <div className="w-64 border-r border-border bg-muted/10 hidden md:flex flex-col">
          <div className="p-4 border-b border-border">
            <MobiButton variant="outline" fullWidth icon={<MessageSquare size={16} />}>
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
        <div className="flex-1 flex flex-col h-full relative">
          <div className="md:hidden flex items-center p-4 border-b border-border">
            <MobiLogo size={20} className="mr-2" />
            <span className="font-semibold">{title}</span>
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
