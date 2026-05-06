import { useState, useCallback } from 'react';
import { useMobiAgentic } from './useMobiAgentic';
import { useMobiGemini } from './useMobiGemini';

export interface MobiMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  model?: string;
  engine?: 'mobi' | 'gemini';
  isError?: boolean;
}

export interface UseMobiChatOptions {
  initialMessages?: MobiMessage[];
  initialModel?: string;
  initialEngine?: 'mobi' | 'gemini';
  initialEnergy?: number;
  requestTimeout?: number;
  onSendMessage?: (message: string, model: string, engine: 'mobi' | 'gemini') => Promise<string>;
}

/**
 * Hook for managing M.O.B.I.™ Chat state and interactions.
 */
export const useMobiChat = (options: UseMobiChatOptions = {}) => {
  const [messages, setMessages] = useState<MobiMessage[]>(options.initialMessages || []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeModelId, setActiveModelId] = useState(options.initialModel || 'fast');
  const [activeEngine, setActiveEngine] = useState<'mobi' | 'gemini'>(options.initialEngine || 'gemini');
  const [energy, setEnergy] = useState(options.initialEnergy ?? 100);
  const { requestTimeout = 25000 } = options; // Increased timeout for cloud/LLM requests

  // Instantiate default fallback clients
  const { chat: chatAgentic } = useMobiAgentic();
  const { chat: chatGemini } = useMobiGemini();

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
    addMessage({ role: 'user', content, model: activeModelId, engine: activeEngine });
    
    // 2. Drain Energy (Simulated)
    setEnergy(prev => Math.max(0, prev - 5));
    
    setIsProcessing(true);

    try {
      const responsePromise = options.onSendMessage 
        ? options.onSendMessage(content, activeModelId, activeEngine)
        : (async () => {
            if (activeEngine === 'gemini') {
              const res = await chatGemini(content);
              return res.response;
            } else {
              const res = await chatAgentic(content);
              return res.response;
            }
          })();

      // Timeout Race
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('MobiAI Request Timeout')), requestTimeout)
      );

      const responseContent = await Promise.race([responsePromise, timeoutPromise]);

      addMessage({ 
        role: 'assistant', 
        content: responseContent, 
        model: activeModelId,
        engine: activeEngine
      });
    } catch (error) {
      addMessage({ 
        role: 'assistant', 
        content: `Error: ${(error as Error).message}. Check your link connection.`, 
        model: activeModelId,
        engine: activeEngine,
        isError: true
      });
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, isProcessing, activeModelId, activeEngine, options, requestTimeout, chatGemini, chatAgentic]);

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
    activeEngine,
    energy,
    setActiveModelId,
    setActiveEngine,
    setEnergy,
    sendMessage,
    clearHistory,
    rechargeEnergy
  };
};
