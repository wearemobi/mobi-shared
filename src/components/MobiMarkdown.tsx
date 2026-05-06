import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface MobiMarkdownProps {
  /** The markdown string to render */
  children: string;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * M.O.B.I.™ Markdown Component.
 * Standardized markdown rendering using GitHub Flavored Markdown (GFM).
 */
export const MobiMarkdown: React.FC<MobiMarkdownProps> = ({ children, className = '' }) => {
  return (
    <div className={`mobi-markdown ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  );
};
