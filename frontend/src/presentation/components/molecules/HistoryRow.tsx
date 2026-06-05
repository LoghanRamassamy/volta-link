import React from 'react';
import { ShortLink } from '../../../domain/entities/short-link.entity';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

interface HistoryRowProps {
  link: ShortLink;
  shortUrl: string;
  copiedCode: string | null;
  onCopy: (code: string, url: string) => void;
  texts: {
    expired: string;
    expPrefix: string;
    never: string;
    copied: string;
    copy: string;
  };
}

export const HistoryRow: React.FC<HistoryRowProps> = ({ link, shortUrl, copiedCode, onCopy, texts }) => {
  const isExpired = link.isExpired();

  return (
    <tr>
      <td>
        <div className="truncate" title={link.originalUrl.value}>
          {link.originalUrl.value}
        </div>
      </td>
      <td>
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="short-link-cell"
        >
          {link.code}
        </a>
      </td>
      <td style={{ color: 'var(--text-secondary)' }}>
        {new Date(link.createdAt).toLocaleDateString()}
      </td>
      <td>
        {link.expiresAt.value ? (
          <Badge status={isExpired ? 'expired' : 'active'}>
            {isExpired ? texts.expired : `${texts.expPrefix} ${new Date(link.expiresAt.value).toLocaleString()}`}
          </Badge>
        ) : (
          <Badge status="never">{texts.never}</Badge>
        )}
      </td>
      <td>
        <Button variant="secondary" onClick={() => onCopy(link.code, shortUrl)}>
          {copiedCode === link.code ? texts.copied : texts.copy}
        </Button>
      </td>
    </tr>
  );
};
