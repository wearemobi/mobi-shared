import React, { useRef, useEffect } from 'react';
import { cn } from '@wearemobi/ui';
import { MobiEdgeMessage } from '../hooks/useMobiEdge';
import { MobiChatMessage } from './MobiChatMessage';
import { MobiLoader } from './MobiLoader';
import { MobiLogo } from './MobiLogo';

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
    <div className={cn("flex flex-col flex-1 overflow-y-auto w-full", className)}>
      <div className="w-full max-w-3xl mx-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, i) => (
          <MobiChatMessage 
            key={msg.id || i} 
            message={msg} 
          />
        ))}
        
        {isProcessing && (
          <div className="flex w-full mb-2 gap-4 justify-start">
            <div className="flex-shrink-0 mt-0.5">
              <MobiLogo size={24} className="mb-0 mx-0 opacity-50 animate-pulse" />
            </div>
            <div className="max-w-[85%] flex flex-col items-start justify-center">
              <div className="py-1">
                <MobiLoader variant="bars" size="sm" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
};
