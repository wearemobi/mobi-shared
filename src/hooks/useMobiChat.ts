import { useState, useCallback } from 'react';

export interface MobiMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  model?: string;
  isError?: boolean;
}

export interface UseMobiChatOptions {
  initialMessages?: MobiMessage[];
  initialModel?: string;
  initialEnergy?: number;
  requestTimeout?: number;
  onSendMessage?: (message: string, model: string) => Promise<string>;
}

/**
 * Hook for managing M.O.B.I.™ Chat state and interactions.
 */
export const useMobiChat = (options: UseMobiChatOptions = {}) => {
  const [messages, setMessages] = useState<MobiMessage[]>(options.initialMessages || []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeModelId, setActiveModelId] = useState(options.initialModel || 'fast');
  const [energy, setEnergy] = useState(options.initialEnergy ?? 100);
  const { requestTimeout = 15000 } = options;

  const addMessage = useCallback((message: Omit<MobiMessage, 'id' | 'timestamp'>) => {
    const newMessage: MobiMessage = {
      ...message,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isProcessing) return;

    // 1. Add User Message
    addMessage({ role: 'user', content, model: activeModelId });
    
    // 2. Drain Energy (Simulated)
    setEnergy(prev => Math.max(0, prev - 5));
    
    setIsProcessing(true);

    try {
      const responsePromise = options.onSendMessage 
        ? options.onSendMessage(content, activeModelId)
        : (async () => {
            // Simulated delay for mock
            await new Promise(resolve => setTimeout(resolve, 2000));
            return `I am processing your request using the ${activeModelId} engine. Data sync complete.`;
          })();

      // Timeout Race
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('MobiAI Request Timeout')), requestTimeout)
      );

      const responseContent = await Promise.race([responsePromise, timeoutPromise]);

      addMessage({ 
        role: 'assistant', 
        content: responseContent, 
        model: activeModelId 
      });
    } catch (error) {
      addMessage({ 
        role: 'assistant', 
        content: `Error: ${(error as Error).message}. Check your link connection.`, 
        model: activeModelId,
        isError: true
      });
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, isProcessing, activeModelId, options, requestTimeout]);

  const clearHistory = useCallback(() => {
    setMessages([]);
  }, []);

  const rechargeEnergy = useCallback((amount: number = 100) => {
    setEnergy(prev => Math.min(100, prev + amount));
  }, []);

  return {
    messages,
    isProcessing,
    activeModelId,
    energy,
    setActiveModelId,
    setEnergy,
    sendMessage,
    clearHistory,
    rechargeEnergy
  };
};
