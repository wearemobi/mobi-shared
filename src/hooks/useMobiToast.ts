import { useMemo } from 'react';
import { toast as sonnerToast } from '@wearemobi/ui';

export interface MobiToastItem {
  id?: string;
  message: string;
  title?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

export const useMobiToast = () => {
  const toast = useMemo(() => ({
    success: (message: string, title?: string, duration?: number) => {
      sonnerToast.success(title || message, {
        description: title ? message : undefined,
        duration: duration !== undefined && duration <= 0 ? Number.POSITIVE_INFINITY : duration,
      });
    },
    error: (message: string, title?: string, duration?: number) => {
      sonnerToast.error(title || message, {
        description: title ? message : undefined,
        duration: duration !== undefined && duration <= 0 ? Number.POSITIVE_INFINITY : duration,
      });
    },
    warning: (message: string, title?: string, duration?: number) => {
      sonnerToast.warning(title || message, {
        description: title ? message : undefined,
        duration: duration !== undefined && duration <= 0 ? Number.POSITIVE_INFINITY : duration,
      });
    },
    info: (message: string, title?: string, duration?: number) => {
      sonnerToast.info(title || message, {
        description: title ? message : undefined,
        duration: duration !== undefined && duration <= 0 ? Number.POSITIVE_INFINITY : duration,
      });
    },
    custom: (options: MobiToastItem) => {
      if (options.type === 'success') {
        toast.success(options.message, options.title, options.duration);
      } else if (options.type === 'error') {
        toast.error(options.message, options.title, options.duration);
      } else if (options.type === 'warning') {
        toast.warning(options.message, options.title, options.duration);
      } else {
        toast.info(options.message, options.title, options.duration);
      }
    }
  }), []);

  return { toast, dismiss: sonnerToast.dismiss, clearAll: sonnerToast.dismiss };
};
