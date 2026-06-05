import React from "react";
import type { ShortLink } from "@/domain/entities/short-link.entity";
import { Badge } from "@/presentation/components/atoms/Badge";
import { Button } from "@/presentation/components/atoms/Button";

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

export const HistoryRow: React.FC<HistoryRowProps> = ({
  link,
  shortUrl,
  copiedCode,
  onCopy,
  texts,
}) => {
  const isExpired = link.isExpired();

  return (
    <tr className="last:border-none">
      <td className="p-4 border-b border-white/5 align-middle text-[0.95rem]">
        <div
          className="max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis text-text-dim"
          title={link.originalUrl.value}
        >
          {link.originalUrl.value}
        </div>
      </td>
      <td className="p-4 border-b border-white/5 align-middle text-[0.95rem]">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent no-underline hover:underline"
        >
          {link.code}
        </a>
      </td>
      <td className="p-4 border-b border-white/5 align-middle text-[0.95rem] text-text-dim">
        {new Date(link.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4 border-b border-white/5 align-middle text-[0.95rem]">
        {link.expiresAt.value ? (
          <Badge status={isExpired ? "expired" : "active"}>
            {isExpired
              ? texts.expired
              : `${texts.expPrefix} ${new Date(link.expiresAt.value).toLocaleString()}`}
          </Badge>
        ) : (
          <Badge status="never">{texts.never}</Badge>
        )}
      </td>
      <td className="p-4 border-b border-white/5 align-middle text-[0.95rem]">
        <Button variant="secondary" onClick={() => onCopy(link.code, shortUrl)}>
          {copiedCode === link.code ? texts.copied : texts.copy}
        </Button>
      </td>
    </tr>
  );
};
