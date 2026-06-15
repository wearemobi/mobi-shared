import React from 'react';
import { Toaster } from '@wearemobi/ui';

export const MobiToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster position="bottom-right" theme="system" richColors closeButton />
    </>
  );
};


