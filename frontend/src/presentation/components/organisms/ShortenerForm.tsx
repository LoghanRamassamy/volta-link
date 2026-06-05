import React, { useState } from 'react';
import { ShortLink } from '../../../domain/entities/short-link.entity';
import { useTranslation } from '../../i18n/LanguageContext';
import { FormGroup } from '../molecules/FormGroup';
import { ResultCard } from '../molecules/ResultCard';
import { Button } from '../atoms/Button';

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
        <FormGroup
          id="url-input"
          label={t.form.urlLabel}
          type="text"
          placeholder={t.form.urlPlaceholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          disabled={loading}
        />

        <div className="form-row">
          <FormGroup
            id="custom-code-input"
            label={t.form.customCodeLabel}
            type="text"
            placeholder={t.form.customCodePlaceholder}
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            disabled={loading}
          />

          <FormGroup
            id="expires-input"
            label={t.form.expiresLabel}
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? t.form.submitLoading : t.form.submit}
        </Button>
      </form>

      {result && (
        <ResultCard
          label={t.form.resultLabel}
          shortUrl={shortUrl}
          code={result.code}
          copiedCode={copiedCode}
          onCopy={onCopy}
          copyText={t.form.copy}
          copiedText={t.form.copied}
        />
      )}
    </div>
  );
};
