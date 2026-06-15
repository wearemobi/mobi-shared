import React from 'react';
import { Toaster } from '@wearemobi/ui';

export interface MobiToastItem {
  id?: string;
  message: string;
  title?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

export const MobiToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster position="bottom-right" theme="system" richColors closeButton />
    </>
  );
};


