import React from "react";
import { Button } from "@/presentation/components/atoms/Button";

interface ResultCardProps {
  label: string;
  shortUrl: string;
  code: string;
  copiedCode: string | null;
  onCopy: (code: string, url: string) => void;
  copyText: string;
  copiedText: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  label,
  shortUrl,
  code,
  copiedCode,
  onCopy,
  copyText,
  copiedText,
}) => (
  <div className="mt-6 bg-brand/5 border border-dashed border-brand/30 rounded-2xl p-5 flex flex-col gap-3 animate-[slideIn_0.4s_ease-out]">
    <label className="text-[0.85rem] font-semibold text-text-dim uppercase tracking-[0.05em]">
      {label}
    </label>
    <div className="flex items-center justify-between gap-4">
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-bold text-accent no-underline break-all hover:underline"
      >
        {shortUrl}
      </a>
      <Button variant="secondary" onClick={() => onCopy(code, shortUrl)}>
        {copiedCode === code ? copiedText : copyText}
      </Button>
    </div>
  </div>
);
