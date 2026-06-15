import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Copies text to the clipboard using the Navigator API.
 * Provides a transient `isCopied` state that resets after 2 seconds —
 * useful for "Copied!" feedback in the UI.
 * Timer is properly cleaned up on component unmount to prevent state
 * updates on unmounted components.
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Clean up timer on unmount to prevent state update on unmounted component
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      // Cancel any existing timer before setting a new one
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsCopied(false), 2000);

      return true;
    } catch (err) {
      console.error('M.O.B.I. Clipboard Error:', err);
      setIsCopied(false);
      return false;
    }
  }, []);

  return { copy, isCopied };
};
