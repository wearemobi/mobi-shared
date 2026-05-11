import { useState, useCallback, useEffect } from 'react';

export interface UseMobiEnergyOptions {
  initialLevel?: number;
  autoRecharge?: boolean;
  rechargeRate?: number; // % per second
  drainRate?: number;    // % per call
}

/**
 * Hook for managing autonomous energy lifecycles.
 * `isLow` is derived inline (no extra state or effect).
 */
export const useMobiEnergy = (options: UseMobiEnergyOptions = {}) => {
  const [level, setLevel] = useState(options.initialLevel ?? 100);

  // Derived value — no separate state or useEffect needed
  const isLow = level < 20;

  // Auto-recharge logic
  useEffect(() => {
    if (!options.autoRecharge) return;

    const interval = setInterval(() => {
      setLevel(prev => {
        if (prev >= 100) return 100;
        return Math.min(100, prev + (options.rechargeRate ?? 1));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [options.autoRecharge, options.rechargeRate]);

  const drain = useCallback((amount?: number) => {
    setLevel(prev => Math.max(0, prev - (amount ?? options.drainRate ?? 10)));
  }, [options.drainRate]);

  const charge = useCallback((amount?: number) => {
    setLevel(prev => Math.min(100, prev + (amount ?? 20)));
  }, []);

  const reset = useCallback(() => {
    setLevel(100);
  }, []);

  return {
    level,
    isLow,
    drain,
    charge,
    reset,
    setLevel
  };
};
