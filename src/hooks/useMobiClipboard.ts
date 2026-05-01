import { useState, useCallback } from 'react';

/**
 * useMobiClipboard
 * Standardized logic for copying text to the clipboard within the MOBI ecosystem.
 */
export const useMobiClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    if (!text) return false;
    
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      
      // Reset copied state after 2 seconds
      const timer = setTimeout(() => setIsCopied(false), 2000);
      
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('M.O.B.I. Clipboard Error:', err);
      setIsCopied(false);
      return false;
    }
  }, []);

  return { copy, isCopied };
};
