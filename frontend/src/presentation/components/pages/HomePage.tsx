import React from 'react';
import { MainLayout } from '../templates/MainLayout';
import { ShortenerForm } from '../organisms/ShortenerForm';
import { HistoryList } from '../organisms/HistoryList';
import { useTranslation } from '../../i18n/LanguageContext';
import { useShortener } from '../../hooks/use-shortener';
import { ShortenUrlUseCase } from '../../../application/use-cases/shorten-url.use-case';
import { GetHistoryUseCase } from '../../../application/use-cases/get-history.use-case';

interface HomePageProps {
  shortenUrlUseCase: ShortenUrlUseCase;
  getHistoryUseCase: GetHistoryUseCase;
}

export const HomePage: React.FC<HomePageProps> = ({ shortenUrlUseCase, getHistoryUseCase }) => {
  const {
    loading,
    error,
    result,
    history,
    copiedCode,
    shortenUrl,
    copyToClipboard,
  } = useShortener(shortenUrlUseCase, getHistoryUseCase);

  const { t } = useTranslation();

  return (
    <MainLayout>
      <ShortenerForm
        loading={loading}
        error={error}
        result={result}
        copiedCode={copiedCode}
        onShorten={shortenUrl}
        onCopy={copyToClipboard}
      />
      <HistoryList
        history={history}
        copiedCode={copiedCode}
        onCopy={copyToClipboard}
      />

      {copiedCode && (
        <div className="copied-toast">
          <span>📋</span> {t.toast.success}
        </div>
      )}
    </MainLayout>
  );
};
