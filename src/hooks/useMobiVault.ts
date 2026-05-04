import { useState, useCallback } from 'react';

export interface FileMetadata {
  id: string;
  filename: string;
  contentType: string;
  fileSize: number;
  createdAt: string;
}

export interface UseMobiVaultOptions {
  baseUrl?: string;
  onSuccess?: (results: FileMetadata[]) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for interacting with the M.O.B.I.™ Vault microservice.
 * Provides a standardized way to ingest sensitive files and manage vault assets.
 */
export const useMobiVault = (options: UseMobiVaultOptions = {}) => {
  const { 
    baseUrl = 'http://localhost:8081',
    onSuccess,
    onError
  } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const [results, setResults] = useState<FileMetadata[]>([]);

  /**
   * Ingest multiple files into the vault.
   * @param files - Array of File objects to be uploaded.
   */
  const upload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);
    setLastError(null);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch(`${baseUrl}/api/v1/vault/files`, {
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

  return {
    upload,
    isUploading,
    lastError,
    results,
    setResults
  };
};
