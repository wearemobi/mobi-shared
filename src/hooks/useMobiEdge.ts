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
}

/**
 * Hook for interacting with the MOBI Edge Reactor API.
 * Strictly follows the OpenAPI schema v2.0.8 (Radar).
 */
export const useMobiEdge = (options: UseMobiEdgeOptions) => {
  const {
    token,
    tenantId = 'MOBI',
    baseUrl = 'https://edge.sandbox.grandfleet.mobi',
    initialMessages = [],
    initialModelId
  } = options;

  const [messages, setMessages] = useState<MobiEdgeMessage[]>(initialMessages);
  const [models, setModels] = useState<MobiEdgeModel[]>([]);
  const [status, setStatus] = useState<MobiEdgeStatus | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeModelId, setActiveModelId] = useState<string | undefined>(initialModelId);
  const [error, setError] = useState<string | null>(null);

  // Memoize headers to avoid unnecessary effect triggers
  const headers = {
    'Content-Type': 'application/json',
    'X-Tenant-Id': tenantId,
    'Authorization': `Bearer ${token}`
  };

  const fetchCatalog = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${baseUrl}/api/reactor/catalog`, { headers });
      if (!res.ok) {
        console.error('[MobiEdge] Catalog Fetch Failed:', res.status);
        throw new Error('Failed to synchronize intelligence catalog.');
      }
      const data: MobiEdgeCatalogResponse = await res.json();
      
      const resources = data.intelligence_catalog || [];
      setModels(resources);
      
      // Auto-select model logic: Filter AI_MODELs first
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
      const res = await fetch(`${baseUrl}/api/reactor/status`, { headers });
      if (!res.ok) {
        console.error('[MobiEdge] Status Fetch Failed:', res.status);
        throw new Error('Failed to synchronize energy telemetry.');
      }
      const data: MobiEdgeStatus = await res.json();
      setStatus(data);
    } catch (err) {
      console.error('[MobiEdge] Status error:', err);
    }
  }, [baseUrl, token, tenantId]);

  // Initial load
  useEffect(() => {
    fetchCatalog();
    fetchStatus();
  }, [token, tenantId, baseUrl]); // Re-fetch if core config changes

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
    if (!prompt.trim() || !model || isProcessing) return;

    setError(null);
    addMessage({ role: 'user', content: prompt, model });
    setIsProcessing(true);

    try {
      const res = await fetch(`${baseUrl}/api/agentic/infer`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ prompt, model })
      });

      if (res.status === 403) {
        throw new Error('Insufficient Haki');
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('[MobiEdge] Inference Failure:', errorData);
        throw new Error('Tactical response failed. Please check your model selection or try again later.');
      }

      const data = await res.json();
      // Schema says response is in 'response' field
      addMessage({ role: 'assistant', content: data.response, model });
      
      // Refresh status after message to reflect new energy balance
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
  }, [baseUrl, token, tenantId, activeModelId, isProcessing, addMessage, fetchStatus]);

  const clearHistory = useCallback(() => {
    setMessages([]);
  }, []);

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
    refreshStatus: fetchStatus
  };
};
