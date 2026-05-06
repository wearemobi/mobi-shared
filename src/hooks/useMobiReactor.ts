import { useState, useCallback } from 'react';

export interface ConsumeRequest {
  entityId: string;
  entityType: string;
  hakiAmount: number;
  description?: string;
}

export interface ConsumeResponse {
  consumptionId: string;
  timestamp: string;
}

export interface EnergyConsumption {
  id: string;
  entityId: string;
  entityType: string;
  hakiAmount: number;
  description?: string;
  createdAt: string;
}

export interface QueryParams {
  entityId?: string;
  entityType?: string;
  from?: string;
  to?: string;
  page?: number;
  size?: number;
}

export interface QueryResponse {
  totalConsumed: number;
  records: EnergyConsumption[];
  page: number;
  size: number;
  totalElements: number;
}

export interface UseMobiReactorOptions {
  baseUrl?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for interacting with the M.O.B.I.™ Energy Reactor microservice.
 * Manages energy consumption transactions and history queries.
 */
export const useMobiReactor = (options: UseMobiReactorOptions = {}) => {
  const { 
    baseUrl = 'http://reactor.engine.sandbox.grandfleet.local',
    onSuccess,
    onError
  } = options;

  const [isProcessing, setIsProcessing] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const [history, setHistory] = useState<QueryResponse | null>(null);

  /**
   * Report energy consumption to the reactor.
   */
  const consume = useCallback(async (request: ConsumeRequest) => {
    setIsProcessing(true);
    setLastError(null);

    try {
      const response = await fetch(`${baseUrl}/api/v1/energy/consume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Reactor Error: ${response.status} ${response.statusText}`);
      }

      const data: ConsumeResponse = await response.json();
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

  /**
   * Query consumption history from the reactor.
   */
  const query = useCallback(async (params: QueryParams = {}) => {
    setIsProcessing(true);
    setLastError(null);

    try {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });

      const response = await fetch(`${baseUrl}/api/v1/energy/query?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error(`Reactor Error: ${response.status} ${response.statusText}`);
      }

      const data: QueryResponse = await response.json();
      setHistory(data);
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
    consume,
    query,
    isProcessing,
    lastError,
    history
  };
};
