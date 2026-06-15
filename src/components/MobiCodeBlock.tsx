import React, { useEffect, useState } from 'react';
import { useMobiClipboard } from '../hooks/useMobiClipboard';
import { Check, Copy } from 'lucide-react';
import { cn } from '@wearemobi/ui';
import { codeToHtml } from 'shiki';

export interface MobiCodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  theme?: string;
}

export const MobiCodeBlock: React.FC<MobiCodeBlockProps> = ({
  code,
  language = 'text',
  className,
  theme = 'vitesse-dark'
}) => {
  const { copy, isCopied } = useMobiClipboard();
  const [html, setHtml] = useState<string>('');

  const actualCode = code.replace(/\\n/g, '\n');

  useEffect(() => {
    let isMounted = true;
    codeToHtml(actualCode, {
      lang: language,
      theme: theme,
    })
      .then((res) => {
        if (isMounted) setHtml(res);
      })
      .catch((err) => {
        console.error('Failed to highlight code with Shiki:', err);
        if (isMounted) setHtml(`<pre><code>${actualCode}</code></pre>`);
      });

    return () => {
      isMounted = false;
    };
  }, [actualCode, language, theme]);

  const handleCopy = () => {
    copy(actualCode);
  };

  return (
    <div className={cn("relative rounded-lg bg-zinc-950 dark:bg-zinc-900 border border-border overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-900 dark:bg-zinc-950 border-b border-white/10">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition-colors flex items-center justify-center p-1 rounded-md"
          title="Copy code"
          aria-label="Copy code"
        >
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div className="overflow-x-auto text-sm text-zinc-50 font-mono [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0">
        {html ? (
          <div className="p-4" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="p-4">
            <code>{actualCode}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
