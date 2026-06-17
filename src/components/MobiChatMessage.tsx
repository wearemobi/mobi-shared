import React, { useState, useEffect } from 'react';
import { MobiEdgeMessage } from '../hooks/useMobiEdge';
import { MobiMarkdown } from './MobiMarkdown';
import { MobiLogo } from './MobiLogo';
import { AlertCircle, Copy, Share, RotateCcw, Check } from 'lucide-react';

export interface MobiChatMessageProps {
  message: MobiEdgeMessage;
  showTimestamp?: boolean;
  isStreaming?: boolean;
  onCopy?: () => void;
  onRetry?: () => void;
  assistantAvatar?: React.ReactNode;
}

export const MobiChatMessage: React.FC<MobiChatMessageProps> = ({
  message,
  showTimestamp = true,
  isStreaming = false,
  onCopy,
  onRetry,
  assistantAvatar
}) => {
  const isUser = message.role === 'user';
  
  const [displayedContent, setDisplayedContent] = useState(isStreaming ? '' : message.content);
  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  
  useEffect(() => {
    if (isStreaming && !isUser) {
      let index = 0;
      setDisplayedContent('');
      const interval = setInterval(() => {
        setDisplayedContent(message.content.slice(0, index + 1));
        index += 2;
        if (index >= message.content.length) {
          setDisplayedContent(message.content);
          clearInterval(interval);
        }
      }, 15);
      return () => clearInterval(interval);
    } else {
      setDisplayedContent(message.content);
    }
  }, [message.content, isStreaming, isUser]);

  const handleCopy = async () => {
    if (onCopy) {
      onCopy();
    } else {
      await navigator.clipboard.writeText(message.content);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'M.O.B.I. Assistant',
          text: message.content,
        });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      handleCopy();
    }
  };

  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex w-full mb-2 gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 mt-0.5">
          {assistantAvatar || <MobiLogo size={24} className="mb-0 mx-0" />}
        </div>
      )}
      <div className={`max-w-[85%] flex flex-col group ${isUser ? 'items-end ml-auto' : 'items-start'}`}>
        <div className={`rounded-2xl ${
          isUser 
            ? 'bg-muted/60 text-foreground rounded-tr-sm px-5 py-3' 
            : 'bg-transparent text-foreground py-1'
        }`}>
          {message.isError ? (
            <div className="flex flex-col gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 w-full max-w-full mt-1">
              <div className="flex items-center text-destructive gap-2 font-semibold text-sm">
                <AlertCircle size={16} className="shrink-0" />
                <span>Request Failed</span>
              </div>
              <div className="text-sm overflow-hidden w-full [&_pre]:!bg-background/80 [&_pre]:!border-destructive/20">
                <MobiMarkdown content={displayedContent.replace(/^Error:\s*/, '')} />
              </div>
            </div>
          ) : (
             isUser ? (
               <div className="whitespace-pre-wrap text-sm">{displayedContent}</div>
             ) : (
               <MobiMarkdown content={displayedContent} />
             )
          )}
        </div>
        <div className="flex items-center gap-3 mt-1 px-1">
          {showTimestamp && (
            <div className="text-[10px] text-muted-foreground">
              {time}
            </div>
          )}

          {!isUser && !isStreaming && !message.isError && (
            <div className="flex items-center gap-1 transition-opacity">
              <button 
                onClick={handleCopy} 
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all active:scale-95" 
                aria-label="Copy"
              >
                {isCopied ? <Check size={13} className="text-green-500" strokeWidth={2.5} /> : <Copy size={13} strokeWidth={2.5} />}
              </button>
              <button 
                onClick={handleShare}
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all active:scale-95" 
                aria-label="Share"
              >
                {isShared ? <Check size={13} className="text-green-500" strokeWidth={2.5} /> : <Share size={13} strokeWidth={2.5} />}
              </button>
              <button 
                onClick={onRetry}
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all active:scale-95" 
                aria-label="Retry"
              >
                <RotateCcw size={13} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
