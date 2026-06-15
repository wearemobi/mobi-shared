import { useState, useCallback, useEffect } from 'react';

export function useAutoDismiss(duration: number, onClose?: () => void) {
  const [isShowing, setIsShowing] = useState(false);

  const handleClose = useCallback(() => {
    setIsShowing(false);
    setTimeout(() => onClose?.(), 300);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => setIsShowing(true), 10);
    let closeTimer: ReturnType<typeof setTimeout>;
    if (duration > 0) {
      closeTimer = setTimeout(handleClose, duration);
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [duration, handleClose]);

  return { isShowing, handleClose };
}


