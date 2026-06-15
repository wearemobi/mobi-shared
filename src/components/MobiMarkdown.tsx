import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@wearemobi/ui';

export interface MobiMarkdownProps {
  content: string;
  className?: string;
}

export const MobiMarkdown: React.FC<MobiMarkdownProps> = ({ content, className }) => {
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
