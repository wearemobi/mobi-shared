import { useState, useCallback } from 'react';

export interface FileMetadata {
  id: string;
  filename: string;
  contentType: string;
  fileSize: number;
  createdAt: string;
}

export interface UseMobiVaultOptions {
  /**
   * Base URL of the Mobi-Vault service.
   * Required for uploads. If omitted, calling `upload()` will throw.
   */
  baseUrl?: string;
  onSuccess?: (results: FileMetadata[]) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for interacting with the M.O.B.I.™ Vault microservice.
 * Provides a standardized way to ingest sensitive files and manage vault assets.
 *
 * @example
 * ```tsx
 * const { upload, isUploading, lastError } = useMobiVault({
 *   baseUrl: 'https://vault.wearemobi.com',
 *   onSuccess: (files) => console.log('Uploaded', files),
 * });
 * ```
 */
export const useMobiVault = (options: UseMobiVaultOptions = {}) => {
  const {
    baseUrl,
    onSuccess,
    onError
  } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const [results, setResults] = useState<FileMetadata[]>([]);

  /**
   * Ingest multiple files into the vault.
   * @param files - Array of File objects to be uploaded.
   * @throws if `baseUrl` is not configured.
   */
  const upload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    if (!baseUrl) {
      const err = new Error('[useMobiVault] baseUrl is required to upload files.');
      setLastError(err);
      onError?.(err);
      throw err;
    }

    setIsUploading(true);
    setLastError(null);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch(`${baseUrl}/v1/vault/files`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Vault Error: ${response.status} ${response.statusText}`);
      }

      const data: FileMetadata[] = await response.json();
      setResults(data);
      onSuccess?.(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setLastError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, [baseUrl, onSuccess, onError]);

  /** Manually override results (e.g., for optimistic UI). Use with caution. */
  const setResultsManually = useCallback((data: FileMetadata[]) => {
    setResults(data);
  }, []);

  return {
    upload,
    isUploading,
    lastError,
    results,
    setResults: setResultsManually
  };
};
