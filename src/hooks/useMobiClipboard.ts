import { useState, useCallback } from 'react';

/**
 * Copies text to the clipboard using the Navigator API.
 * Provides a transient `isCopied` state that resets after 2 seconds —
 * useful for "Copied!" feedback in the UI.
 *
 * @returns `{ copy, isCopied }` — async copy function and success state.
 *
 * @example
 * ```tsx
 * const { copy, isCopied } = useMobiClipboard();
 * <button onClick={() => copy('Hello')}>
 *   {isCopied ? 'Copied!' : 'Copy'}
 * </button>
 * ```
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
