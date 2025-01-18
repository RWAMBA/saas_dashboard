"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className={cn("bg-muted p-4 rounded-lg overflow-x-auto", className)}>
        {language && (
          <div className="absolute top-2 right-12 px-2 py-1 text-xs text-muted-foreground rounded-md bg-background/80">
            {language}
          </div>
        )}
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 hover:bg-background/80 rounded-md transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        <code>{code}</code>
      </pre>
    </div>
  );
} 