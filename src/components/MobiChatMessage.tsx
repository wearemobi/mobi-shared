import React, { useState, useEffect } from 'react';
import { MobiEdgeMessage } from '../hooks/useMobiEdge';
import { MobiMarkdown } from './MobiMarkdown';
import { MobiLogo } from './MobiLogo';
import { AlertCircle, Copy } from 'lucide-react';
import { cn } from '@wearemobi/ui';

export interface MobiChatMessageProps {
  message: MobiEdgeMessage;
  showTimestamp?: boolean;
  isStreaming?: boolean;
  onCopy?: () => void;
}

export const MobiChatMessage: React.FC<MobiChatMessageProps> = ({
  message,
  showTimestamp = true,
  isStreaming = false,
  onCopy
}) => {
  const isUser = message.role === 'user';
  
  const [displayedContent, setDisplayedContent] = useState(isStreaming ? '' : message.content);
  
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

  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex w-full mb-2 gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 mt-0.5">
          <MobiLogo size={24} className="mb-0 mx-0" />
        </div>
      )}
      <div className={`max-w-[85%] flex flex-col ${isUser ? 'items-end ml-auto' : 'items-start'}`}>
        <div className={`rounded-2xl ${
          isUser 
            ? 'bg-muted/60 text-foreground rounded-tr-sm px-5 py-3' 
            : 'bg-transparent text-foreground py-1'
        }`}>
          {message.isError ? (
            <div className="flex items-center text-red-500 gap-2">
              <AlertCircle size={16} />
              <span className="text-sm font-semibold whitespace-pre-wrap">{displayedContent}</span>
            </div>
          ) : (
             isUser ? (
               <div className="whitespace-pre-wrap text-sm">{displayedContent}</div>
             ) : (
               <MobiMarkdown content={displayedContent} />
             )
          )}
        </div>
        {showTimestamp && (
          <div className="text-[10px] text-muted-foreground mt-1 px-1 flex items-center gap-2">
            {time}
            {onCopy && !isUser && !isStreaming && (
              <button onClick={onCopy} className="hover:text-foreground transition-colors" aria-label="Copy message">
                <Copy size={12} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
