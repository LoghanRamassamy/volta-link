import React from 'react';
import { ShortLink } from '../../domain/entities/short-link.entity';
import { useTranslation } from '../i18n/LanguageContext';

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
      <h2>{t.history.title}</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>{t.history.originalUrl}</th>
              <th>{t.history.shortCode}</th>
              <th>{t.history.created}</th>
              <th>{t.history.expiration}</th>
              <th>{t.history.action}</th>
            </tr>
          </thead>
          <tbody>
            {[...history].reverse().map((link) => {
              const shortUrl = `${window.location.protocol}//${window.location.hostname}:3001/${link.code}`;
              const isExpired = link.isExpired();

              return (
                <tr key={link.id}>
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
                      <span className={isExpired ? 'badge badge-expired' : 'badge badge-active'}>
                        {isExpired ? t.history.expired : `${t.history.expPrefix} ${new Date(link.expiresAt.value).toLocaleString()}`}
                      </span>
                    ) : (
                      <span className="badge badge-never">{t.history.never}</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-secondary"
                      onClick={() => onCopy(link.code, shortUrl)}
                    >
                      {copiedCode === link.code ? t.history.copied : t.history.copy}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
