import React, { useState } from 'react';
import { ShortLink } from '../../domain/entities/short-link.entity';
import { useTranslation } from '../i18n/LanguageContext';

interface ShortenerFormProps {
  loading: boolean;
  error: string | null;
  result: ShortLink | null;
  copiedCode: string | null;
  onShorten: (url: string, customCode: string, expiresAt: string) => void;
  onCopy: (code: string, url: string) => void;
}

export const ShortenerForm: React.FC<ShortenerFormProps> = ({
  loading,
  error,
  result,
  copiedCode,
  onShorten,
  onCopy,
}) => {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShorten(url, customCode, expiresAt);
  };

  // Determine short URL endpoint targeting backend container port (3001)
  const shortUrl = result
    ? `${window.location.protocol}//${window.location.hostname}:3001/${result.code}`
    : '';

  return (
    <div className="glass-panel">
      {error && (
        <div className="alert-error">
          <span>⚠️</span> {error === 'DEFAULT_GATEWAY_ERROR' ? t.errors.defaultGatewayError : error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url-input">{t.form.urlLabel}</label>
          <input
            id="url-input"
            type="text"
            placeholder={t.form.urlPlaceholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="custom-code-input">{t.form.customCodeLabel}</label>
            <input
              id="custom-code-input"
              type="text"
              placeholder={t.form.customCodePlaceholder}
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="expires-input">{t.form.expiresLabel}</label>
            <input
              id="expires-input"
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? t.form.submitLoading : t.form.submit}
        </button>
      </form>

      {result && (
        <div className="result-card">
          <label>{t.form.resultLabel}</label>
          <div className="result-row">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="result-url">
              {shortUrl}
            </a>
            <button className="btn-secondary" onClick={() => onCopy(result.code, shortUrl)}>
              {copiedCode === result.code ? t.form.copied : t.form.copy}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
