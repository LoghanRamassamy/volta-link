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
        <div className="fixed bottom-6 right-6 bg-[#18181b] border border-card-hover text-text-main py-3 px-6 rounded-xl font-semibold shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] flex items-center gap-2 animate-[toastIn_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards] z-[100]">
          <span>📋</span> {t.toast.success}
        </div>
      )}
    </MainLayout>
  );
};
