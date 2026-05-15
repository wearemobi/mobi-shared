import { useState, useCallback, useEffect } from 'react';

export interface MobiEdgeMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  model?: string;
  isError?: boolean;
}

export interface MobiEdgeModel {
  slug: string;
  resource_kind: string;
  haki_cost: number;
  engine_name: string;
  provider: string;
  capabilities?: any;
}

export interface MobiEdgeStatus {
  tenant_name: string;
  tier: string;
  haki_limit: number;
  haki_used: number;
  reset_period: string;
}

export interface MobiEdgeCatalogResponse {
  tenant_id: string;
  intelligence_catalog: MobiEdgeModel[];
}

export interface UseMobiEdgeOptions {
  /** Bearer token for authorization */
  token: string;
  /** Tenant ID (defaults to 'MOBI') */
  tenantId?: string;
  /** Base URL for the Edge Reactor API */
  baseUrl?: string;
  /** Initial messages to populate the feed */
  initialMessages?: MobiEdgeMessage[];
  /** Initially selected model slug */
  initialModelId?: string;
  /** Target Agent ID (defaults to 'mobi-core') */
  agentId?: string;
  /** Whether to persist session in local storage */
  persistSession?: boolean;
  /** 
   * Whether to use agentic memory for this session. 
   * If not provided, it defaults to true for non-BASIC tiers.
   */
  useMemory?: boolean;
}

/**
 * Hook for interacting with the MOBI Edge Reactor API.
 * Updated to support Specification v2.1.0 (API v1).
 */
export const useMobiEdge = (options: UseMobiEdgeOptions) => {
  const {
    token,
    tenantId = 'MOBI',
    baseUrl = 'https://edge.sandbox.grandfleet.mobi',
    initialMessages = [],
    initialModelId,
    agentId: initialAgentId = 'mobi-core',
    persistSession = true,
    useMemory: useMemoryOverride
  } = options;

  const sessionKey = `mobi_edge_session_${tenantId}_${initialAgentId}`;

  const [messages, setMessages] = useState<MobiEdgeMessage[]>(initialMessages);
  const [models, setModels] = useState<MobiEdgeModel[]>([]);
  const [status, setStatus] = useState<MobiEdgeStatus | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeModelId, setActiveModelId] = useState<string | undefined>(initialModelId);
  const [conversationId, setConversationId] = useState<string | null>(() => {
    return persistSession ? localStorage.getItem(sessionKey) : null;
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Memoize headers
  const headers = {
    'Content-Type': 'application/json',
    'X-Tenant-Id': tenantId,
    'Authorization': `Bearer ${token}`
  };

  const fetchCatalog = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${baseUrl}/api/v1/reactor/catalog`, { headers });
      if (!res.ok) throw new Error('Catalog Fetch Failed');
      const data: MobiEdgeCatalogResponse = await res.json();
      
      const resources = data.intelligence_catalog || [];
      setModels(resources);
      setIsConnected(true);
      
      const aiModels = resources.filter(r => r.resource_kind === 'AI_MODEL');
      if (aiModels.length > 0 && !activeModelId) {
        const basicModel = aiModels.find(r => r.engine_name === 'BASIC');
        setActiveModelId(basicModel?.slug || aiModels[0].slug);
      }
    } catch (err) {
      console.error('[MobiEdge] Catalog error:', err);
    }
  }, [baseUrl, token, tenantId, activeModelId]);

  const fetchStatus = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${baseUrl}/api/v1/reactor/status`, { headers });
      if (!res.ok) throw new Error('Status Fetch Failed');
      const data: MobiEdgeStatus = await res.json();
      setStatus(data);
      setIsConnected(true);
    } catch (err) {
      console.error('[MobiEdge] Status error:', err);
      setIsConnected(false);
    }
  }, [baseUrl, token, tenantId]);

  const fetchHistory = useCallback(async (id: string) => {
    if (!token || !id) return;
    try {
      const res = await fetch(`${baseUrl}/api/v1/agentic/history/${id}`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          const mappedMessages = data.messages.map((m: any) => ({
            id: m.id || String(Math.random()),
            role: m.role,
            content: m.content,
            timestamp: m.timestamp || Date.now(),
            model: m.model_used
          }));
          setMessages(mappedMessages);
        }
      }
    } catch (err) {
      console.error('[MobiEdge] History error:', err);
    }
  }, [baseUrl, token, tenantId]);

  // Initial load
  useEffect(() => {
    fetchCatalog();
    fetchStatus();
    if (conversationId) {
      fetchHistory(conversationId);
    }
  }, [token, tenantId, baseUrl]);

  const addMessage = useCallback((message: Omit<MobiEdgeMessage, 'id' | 'timestamp'>) => {
    const newMessage: MobiEdgeMessage = {
      ...message,
      id: typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (prompt: string, modelOverride?: string) => {
    const model = modelOverride || activeModelId;
    if (!prompt.trim() || isProcessing) return;

    setError(null);
    addMessage({ role: 'user', content: prompt, model });
    setIsProcessing(true);

    try {
      const useMemory = useMemoryOverride !== undefined 
        ? useMemoryOverride 
        : (status?.tier !== 'BASIC');
      
      const res = await fetch(`${baseUrl}/api/v1/agentic/infer`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          prompt, 
          model: model || undefined, 
          agentId: initialAgentId || undefined,
          conversationId: conversationId || undefined,
          useMemory
        })
      });

      if (res.status === 403) throw new Error('Insufficient Haki');
      if (!res.ok) throw new Error('Inference Failure');

      const data = await res.json();
      
      // Update session if it's new
      if (data.conversation_id && data.conversation_id !== conversationId) {
        setConversationId(data.conversation_id);
        if (persistSession) {
          localStorage.setItem(sessionKey, data.conversation_id);
        }
      }

      // Update suggestions from Agent
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }

      addMessage({ 
        role: 'assistant', 
        content: data.response, 
        model: data.model_used || model 
      });
      
      fetchStatus();
    } catch (err) {
      const msg = (err as Error).message;
      const isHakiError = msg === 'Insufficient Haki';
      
      addMessage({ 
        role: 'assistant', 
        content: isHakiError 
          ? '⚡️ INSUFFICIENT HAKI. Sentinel energy depleted. System recharge required.' 
          : `Error: ${msg}`, 
        isError: true,
        model 
      });
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  }, [baseUrl, token, tenantId, activeModelId, isProcessing, addMessage, fetchStatus, conversationId, status, initialAgentId, sessionKey, persistSession]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    if (persistSession) {
      localStorage.removeItem(sessionKey);
    }
  }, [sessionKey, persistSession]);

  return {
    messages,
    models,
    status,
    isProcessing,
    activeModelId,
    setActiveModelId,
    sendMessage,
    clearHistory,
    error,
    refreshStatus: fetchStatus,
    suggestions,
    isMemoryActive: useMemoryOverride !== undefined 
      ? useMemoryOverride 
      : (status?.tier ? status.tier !== 'BASIC' : false),
    isConnected
  };
};

