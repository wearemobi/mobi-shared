import { useState, useCallback } from 'react';

export interface ChatResponse {
  instanceId: string;
  agentName: string;
  thread: string;
  response: string;
}

export interface UseMobiAgenticOptions {
  baseUrl?: string;
  onSuccess?: (data: ChatResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for interacting with the M.O.B.I.™ Agentic microservice.
 * Provides a standardized way to chat with the sovereign AI engine.
 */
export const useMobiAgentic = (options: UseMobiAgenticOptions = {}) => {
  const { 
    baseUrl = 'http://agentic.engine.sandbox.grandfleet.local',
    onSuccess,
    onError
  } = options;

  const [isProcessing, setIsProcessing] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const [lastResponse, setLastResponse] = useState<ChatResponse | null>(null);

  /**
   * Send a chat message to the Agentic engine.
   * @param message - The raw string message/prompt to send.
   */
  const chat = useCallback(async (message: string) => {
    setIsProcessing(true);
    setLastError(null);

    try {
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: message,
      });

      if (!response.ok) {
        throw new Error(`Agentic Error: ${response.status} ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();
      setLastResponse(data);
      onSuccess?.(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setLastError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [baseUrl, onSuccess, onError]);

  return {
    chat,
    isProcessing,
    lastError,
    lastResponse
  };
};
