import { useState, useEffect } from 'react';
import { ShortLink } from '../../domain/entities/short-link.entity';
import { ShortenUrlUseCase } from '../../application/use-cases/shorten-url.use-case';
import { GetHistoryUseCase } from '../../application/use-cases/get-history.use-case';

export function useShortener(
  shortenUrlUseCase: ShortenUrlUseCase,
  getHistoryUseCase: GetHistoryUseCase
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ShortLink | null>(null);
  const [history, setHistory] = useState<ReadonlyArray<ShortLink>>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    let active = true;
    getHistoryUseCase
      .execute()
      .then((data) => {
        if (active) setHistory(data);
      })
      .catch((err) => console.error('Failed to load history:', err));

    return () => {
      active = false;
    };
  }, [getHistoryUseCase]);

  const shortenUrl = async (originalUrl: string, customCode?: string, expiresAt?: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const link = await shortenUrlUseCase.execute({
        originalUrl,
        customCode: customCode || undefined,
        expiresAt: expiresAt || undefined,
      });
      setResult(link);

      // Refresh local history view
      const updatedHistory = await getHistoryUseCase.execute();
      setHistory(updatedHistory);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (code: string, shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return {
    loading,
    error,
    result,
    history,
    copiedCode,
    shortenUrl,
    copyToClipboard,
  };
}
