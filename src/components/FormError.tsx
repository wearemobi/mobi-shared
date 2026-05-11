import React from 'react';

/**
 * Shared internal error message display used by MobiInput and MobiDropdown.
 * Renders a red warning icon and message with a smooth fade-in animation.
 */
export const FormError: React.FC<{ message: string; id?: string }> = ({ message, id }) => (
  <span
    id={id}
    role="alert"
    className="text-red-500 font-bold font-sans text-[10px] mt-1.5 animate-in fade-in slide-in-from-top-1 flex items-center gap-1.5"
  >
    <svg className="h-3.5 w-3.5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    {message}
  </span>
);
export default FormError;
