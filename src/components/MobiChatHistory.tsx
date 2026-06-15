import React, { useRef, useEffect } from 'react';
import { cn } from '@wearemobi/ui';
import { MobiEdgeMessage } from '../hooks/useMobiEdge';
import { MobiChatMessage } from './MobiChatMessage';
import { MobiLoader } from './MobiLoader';

export interface MobiChatHistoryProps {
  messages: MobiEdgeMessage[];
  isProcessing?: boolean;
  className?: string;
}

export const MobiChatHistory: React.FC<MobiChatHistoryProps> = ({
  messages,
  isProcessing,
  className
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  return (
    <div className={cn("flex flex-col flex-1 overflow-y-auto w-full p-4 space-y-2", className)}>
      {messages.map((msg, i) => (
        <MobiChatMessage 
          key={msg.id || i} 
          message={msg} 
        />
      ))}
      
      {isProcessing && (
        <div className="flex justify-start mb-4">
          <div className="mr-3 flex-shrink-0 mt-1">
            <MobiLoader variant="pulse" size="sm" />
          </div>
          <div className="bg-transparent py-2 flex items-center">
            <span className="text-sm text-muted-foreground italic">Thinking...</span>
          </div>
        </div>
      )}
      <div ref={bottomRef} className="h-1" />
    </div>
  );
};
