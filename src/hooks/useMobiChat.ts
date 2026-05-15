import { useState, useCallback, useRef } from 'react';

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
 * Uses `crypto.randomUUID()` for collision-safe message IDs.
 * Destructures stable values from `options` to avoid unnecessary hook re-creations.
 */
export const useMobiChat = (options: UseMobiChatOptions = {}) => {
  // Destructure stable primitives to avoid object reference churn in useCallback deps
  const {
    initialMessages,
    initialModel = 'fast',
    initialEnergy = 100,
    requestTimeout = 25000,
    onSendMessage
  } = options;

  const [messages, setMessages] = useState<MobiMessage[]>(initialMessages ?? []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeModelId, setActiveModelId] = useState(initialModel);
  const [energy, setEnergy] = useState(initialEnergy);

  // Use refs for values consumed inside async callbacks to avoid stale closures
  const activeModelRef = useRef(activeModelId);
  activeModelRef.current = activeModelId;

  const addMessage = useCallback((message: Omit<MobiMessage, 'id' | 'timestamp'>) => {
    const newMessage: MobiMessage = {
      ...message,
      // Use crypto.randomUUID() for collision-safe IDs
      id: typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isProcessing) return;

    const currentModel = activeModelRef.current;

    // 1. Add User Message
    addMessage({ role: 'user', content, model: currentModel });

    // 2. Drain Energy (simulated)
    setEnergy(prev => Math.max(0, prev - 5));

    setIsProcessing(true);

    try {
      const responsePromise = onSendMessage
        ? onSendMessage(content, currentModel)
        : Promise.reject(new Error('No send handler configured'));

      // Timeout Race
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('MobiAI Request Timeout')), requestTimeout)
      );

      const responseContent = await Promise.race([responsePromise, timeoutPromise]);

      addMessage({
        role: 'assistant',
        content: responseContent,
        model: currentModel
      });
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: `Error: ${(error as Error).message}. Check your link connection.`,
        model: currentModel,
        isError: true
      });
    } finally {
      setIsProcessing(false);
    }
  }, [addMessage, isProcessing, onSendMessage, requestTimeout]);

  const clearHistory = useCallback(() => {
    setMessages([]);
  }, []);

  const rechargeEnergy = useCallback((amount = 100) => {
    setEnergy(prev => Math.min(100, prev + amount));
  }, []);

  const drainEnergy = useCallback((amount = 5) => {
    setEnergy(prev => Math.max(0, prev - amount));
  }, []);

  return {
    messages,
    isProcessing,
    activeModelId,
    energy,
    setActiveModelId,
    sendMessage,
    clearHistory,
    rechargeEnergy,
    drainEnergy
  };
};
