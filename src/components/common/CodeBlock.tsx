import React, { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  downloadable?: boolean;
}

export function CodeBlock({
  code,
  language = 'swift',
  filename,
  showLineNumbers = true,
  copyable = true,
  downloadable = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const ext = language === 'swift' ? '.swift' : `.${language}`;
    const fname = filename || `code${ext}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fname;
    a.click();
    URL.revokeObjectURL(url);
  };

  const languageLabel: Record<string, string> = {
    swift: 'Swift',
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    bash: 'Shell',
    json: 'JSON',
    text: 'Text',
  };

  return (
    <div className="code-block-wrapper code-block">
      {/* Header */}
      <div className="code-block-header">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            {filename || languageLabel[language] || language}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {downloadable && (
            <button
              onClick={handleDownload}
              className="btn-ghost p-1.5 text-xs"
              title="Download code"
              aria-label="Download code"
            >
              <Download size={14} />
            </button>
          )}
          {copyable && (
            <button
              onClick={handleCopy}
              className="btn-ghost p-1.5 text-xs flex items-center gap-1"
              title={copied ? 'Copied!' : 'Copy code'}
              aria-label={copied ? 'Code copied' : 'Copy code'}
            >
              {copied ? (
                <>
                  <Check size={14} className="text-brand-success" />
                  <span className="text-brand-success text-xs hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span className="text-xs hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: '#0D1117',
            fontSize: '14px',
            lineHeight: '1.6',
            borderRadius: '0',
          }}
          lineNumberStyle={{
            color: '#4B5563',
            minWidth: '2.5em',
            paddingRight: '1em',
          }}
          wrapLines={false}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
