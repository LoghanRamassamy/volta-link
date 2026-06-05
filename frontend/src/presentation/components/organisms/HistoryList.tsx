import React from 'react';
import { ShortLink } from '../../../domain/entities/short-link.entity';
import { useTranslation } from '../../i18n/LanguageContext';
import { HistoryRow } from '../molecules/HistoryRow';

interface HistoryListProps {
  history: ReadonlyArray<ShortLink>;
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
      <h2 className="text-2xl font-bold text-text-main mb-5 flex items-center gap-2">{t.history.title}</h2>
      <div className="overflow-x-auto mt-2">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5">{t.history.originalUrl}</th>
              <th className="px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5">{t.history.shortCode}</th>
              <th className="px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5">{t.history.created}</th>
              <th className="px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5">{t.history.expiration}</th>
              <th className="px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider border-b border-white/5">{t.history.action}</th>
            </tr>
          </thead>
          <tbody>
            {[...history].reverse().map((link) => {
              const shortUrl = `${window.location.protocol}//${window.location.hostname}:3001/${link.code}`;
              return (
                <HistoryRow
                  key={link.id}
                  link={link}
                  shortUrl={shortUrl}
                  copiedCode={copiedCode}
                  onCopy={onCopy}
                  texts={{
                    expired: t.history.expired,
                    expPrefix: t.history.expPrefix,
                    never: t.history.never,
                    copied: t.history.copied,
                    copy: t.history.copy,
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
