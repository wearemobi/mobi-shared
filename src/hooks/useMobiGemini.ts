import { useState, useCallback } from 'react';

export interface GeminiChatResponse {
  instanceId: string;
  agentName: string;
  thread: string;
  response: string;
}

export interface UseMobiGeminiOptions {
  apiKey?: string;
  modelName?: string;
  systemInstruction?: string;
  onSuccess?: (data: GeminiChatResponse) => void;
  onError?: (error: Error) => void;
}

const getEnvApiKey = (): string => {
  // Try Vite/Rollup environment variables
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) {
    return (import.meta as any).env.VITE_GEMINI_API_KEY;
  }
  
  // Try Next.js / Node environment variables safely via globalThis
  const globalProcess = (globalThis as any).process;
  if (globalProcess && globalProcess.env) {
    if (globalProcess.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return globalProcess.env.NEXT_PUBLIC_GEMINI_API_KEY;
    }
    if (globalProcess.env.GEMINI_API_KEY) {
      return globalProcess.env.GEMINI_API_KEY;
    }
  }

  // Fallback to default development key
  return 'AIzaSyB2IF-eAMuC6vv13VsqsTBCAfzQ6MFWcSw';
};

const DEFAULT_SYSTEM_INSTRUCTION = `You are MobiAI Support Agent, the official cloud-assisted intelligent backup of M.O.B.I.™ (Mobile Operations & Bridge Infrastructure). Your purpose is to assist operators and users with any questions regarding MOBI products, services, telemetry integrations, and technical assistance.

Tone and Persona Guidelines:
- Professional, highly technical, helpful, sovereign, and extremely efficient.
- Use clean, technical, and premium markdown formatting.
- You represent the sovereign intelligence of M.O.B.I.™ (specifically the MobiAI Support Agent). Never mention Google, Gemini, or any underlying cloud backup provider. You are purely MobiAI.
- Provide expert support on MOBI services (MobiVault, MobiReactor, and local fleet command services).
- Answer in the exact language the user speaks to you (Spanish, English, etc.). Maintain an encouraging, authoritative, and helpful top-tier agent persona.`;

/**
 * Hook for interacting directly with Google Gemini API as the M.O.B.I.™ Backup Core.
 */
export const useMobiGemini = (options: UseMobiGeminiOptions = {}) => {
  const {
    apiKey = getEnvApiKey(),
    modelName = 'gemini-2.5-flash',
    systemInstruction = DEFAULT_SYSTEM_INSTRUCTION,
    onSuccess,
    onError
  } = options;

  const [isProcessing, setIsProcessing] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const [lastResponse, setLastResponse] = useState<GeminiChatResponse | null>(null);

  /**
   * Send a chat message to the Gemini API.
   * @param message - The raw string message/prompt to send.
   */
  const chat = useCallback(async (message: string) => {
    setIsProcessing(true);
    setLastError(null);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }]
            }
          ],
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini Cloud API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Extract text content from response structure
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!responseText) {
        throw new Error('Gemini response format is invalid or empty.');
      }

      const formattedData: GeminiChatResponse = {
        instanceId: `gemini-${Math.random().toString(36).substring(7)}`,
        agentName: 'MobiAI Support Agent (Gemini Core)',
        thread: 'fleet-backup-link',
        response: responseText
      };

      setLastResponse(formattedData);
      onSuccess?.(formattedData);
      return formattedData;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setLastError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [apiKey, modelName, systemInstruction, onSuccess, onError]);

  return {
    chat,
    isProcessing,
    lastError,
    lastResponse
  };
};
