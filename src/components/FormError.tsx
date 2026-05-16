import React from 'react';
import { MobiIcon } from './MobiIcon';

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
    <MobiIcon name="alert" size={14} strokeWidth={2.5} className="text-red-500 shrink-0" />
    {message}
  </span>
);
export default FormError;
