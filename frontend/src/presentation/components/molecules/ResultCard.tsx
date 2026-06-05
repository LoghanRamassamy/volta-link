import React from 'react';
import { Button } from '../atoms/Button';

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
}) => {
  return (
    <div className="result-card">
      <label>{label}</label>
      <div className="result-row">
        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="result-url">
          {shortUrl}
        </a>
        <Button variant="secondary" onClick={() => onCopy(code, shortUrl)}>
          {copiedCode === code ? copiedText : copyText}
        </Button>
      </div>
    </div>
  );
};
