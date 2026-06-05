import React from 'react';
import { ShortLink } from '../../domain/entities/short-link.entity';

interface HistoryListProps {
  history: ReadonlyArray<ShortLink>;
  copiedCode: string | null;
  onCopy: (code: string, url: string) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, copiedCode, onCopy }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="glass-panel">
      <h2>📋 Recent Links</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short Code</th>
              <th>Created</th>
              <th>Expiration</th>
              <th>Action</th>
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
                        {isExpired ? 'Expired' : `Exp: ${new Date(link.expiresAt.value).toLocaleString()}`}
                      </span>
                    ) : (
                      <span className="badge badge-never">Never</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-secondary"
                      onClick={() => onCopy(link.code, shortUrl)}
                    >
                      {copiedCode === link.code ? 'Copied!' : 'Copy'}
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
