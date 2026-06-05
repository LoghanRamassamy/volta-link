import React from "react";
import type { ShortLink } from "../../../domain/entities/short-link.entity";
import { useTranslation } from "../../i18n/LanguageContext";
import { HistoryRow } from "../molecules/HistoryRow";

interface HistoryListProps {
  history: readonly ShortLink[];
  copiedCode: string | null;
  onCopy: (code: string, url: string) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, copiedCode, onCopy }) => {
  const { t } = useTranslation();

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="glass-panel">
      <h2 className="text-2xl font-bold text-text-main mb-5 flex items-center gap-2">
        {t.history.title}
      </h2>
      <div className="overflow-x-auto mt-2">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5">
                {t.history.originalUrl}
              </th>
              <th className="px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5">
                {t.history.shortCode}
              </th>
              <th className="px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5">
                {t.history.created}
              </th>
              <th className="px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5">
                {t.history.expiration}
              </th>
              <th className="px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5">
                {t.history.action}
              </th>
            </tr>
          </thead>
          <tbody>
            {[...history].toReversed().map((link) => {
              const shortUrl = `${window.location.protocol}//${window.location.hostname}:3001/${link.code}`;
              return (
                <HistoryRow
                  key={link.id}
                  link={link}
                  shortUrl={shortUrl}
                  copiedCode={copiedCode}
                  onCopy={onCopy}
                  texts={{
                    copied: t.history.copied,
                    copy: t.history.copy,
                    expPrefix: t.history.expPrefix,
                    expired: t.history.expired,
                    never: t.history.never,
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
