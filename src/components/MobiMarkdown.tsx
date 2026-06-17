import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@wearemobi/ui';
import { Copy, Check } from 'lucide-react';

export interface MobiMarkdownProps {
  content: string;
  className?: string;
}

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  const handleCopy = () => {
    const text = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (inline) {
    return (
      <code className={cn("bg-muted/50 rounded px-1.5 py-0.5 text-sm", className)} {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="relative group rounded-md overflow-hidden my-4 bg-[#1e1e1e] border border-border/10">
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#2d2d2d] text-xs text-zinc-400">
        <span className="font-mono lowercase">{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors"
          aria-label="Copy code"
        >
          {isCopied ? (
            <>
              <Check size={12} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4 text-sm text-zinc-100">
        <pre className="!m-0 !bg-transparent !p-0">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
};

export const MobiMarkdown: React.FC<MobiMarkdownProps> = ({ content, className }) => {
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight", className)}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
