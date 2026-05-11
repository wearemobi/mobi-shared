import { useState, useCallback } from 'react';

/** Minimal authenticated user shape. Extend as needed for your application. */
export interface MobiUser {
  id: string;
  email: string;
  name?: string;
  [key: string]: unknown;
}

/** Authentication state exposed by the useMobiAuth hook. */
export interface MobiAuthStatus {
  /** Whether the user is currently authenticated. */
  isAuthenticated: boolean;
  /** Authenticated user object, or null. */
  user: MobiUser | null;
  /** Whether an auth operation is in progress. */
  loading: boolean;
}

/**
 * Authentication hook for the M.O.B.I.™ JS Bridge.
 * Currently a stub — will integrate with JS Bridge v1.19.
 *
 * @param appId - Optional application identifier for multi-app auth scoping.
 * @returns Auth state (`isAuthenticated`, `user`, `loading`) plus `login()` and `logout()` actions.
 *
 * @example
 * ```tsx
 * const { isAuthenticated, login, logout } = useMobiAuth('my-app');
 * ```
 */
export const useMobiAuth = (appId?: string) => {
  const [status, setStatus] = useState<MobiAuthStatus>({
    isAuthenticated: false,
    user: null,
    loading: false
  });

  const login = useCallback((credentials?: unknown) => {
    console.log(`[MOBI-SHARED] Initiating login for App: ${appId}`, credentials);
    // Future implementation of JS Bridge v1.19
  }, [appId]);

  const logout = useCallback(() => {
    console.log('[MOBI-SHARED] Logging out');
    setStatus({ isAuthenticated: false, user: null, loading: false });
  }, []);

  return {
    ...status,
    login,
    logout
  };
};
