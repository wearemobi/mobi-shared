import { useState, useCallback } from 'react';
import { getEnvApiKey, DEFAULT_SYSTEM_INSTRUCTION } from './useMobiGemini';

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
      const originError = err instanceof Error ? err : new Error(String(err));
      
      console.warn(
        "M.O.B.I.™ Sovereign Local Agentic connection failed. Attempting automatic recovery via Backup Cloud Core...",
        originError
      );

      try {
        const apiKey = getEnvApiKey();
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const payload = {
          contents: [
            {
              role: 'user',
              parts: [{ text: message }]
            }
          ],
          systemInstruction: {
            parts: [{ text: DEFAULT_SYSTEM_INSTRUCTION }]
          }
        };

        const geminiResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
          throw new Error(`Cloud Backup Error: ${geminiResponse.status} ${geminiResponse.statusText}`);
        }

        const geminiData = await geminiResponse.json();
        const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

        const backupData: ChatResponse = {
          instanceId: 'backup-cloud-core',
          agentName: 'MobiAI Support Agent',
          thread: 'cloud-backup-thread',
          response: responseText
        };

        setLastResponse(backupData);
        onSuccess?.(backupData);
        return backupData;
      } catch (backupErr) {
        const error = backupErr instanceof Error ? backupErr : new Error(String(backupErr));
        setLastError(error);
        onError?.(error);
        throw error;
      }
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
