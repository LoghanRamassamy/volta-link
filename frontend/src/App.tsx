import React from 'react';
import './presentation/styles/index.css';
import { Header } from './presentation/components/Header';
import { ShortenerForm } from './presentation/components/ShortenerForm';
import { HistoryList } from './presentation/components/HistoryList';
import { useShortener } from './presentation/hooks/use-shortener';

// Infrastructure Adapters
import { HttpShortLinkGateway } from './infrastructure/api/http-short-link-gateway';
import { LocalStorageHistoryRepository } from './infrastructure/storage/local-storage-history-repository';

// Application Use Cases
import { ShortenUrlUseCase } from './application/use-cases/shorten-url.use-case';
import { GetHistoryUseCase } from './application/use-cases/get-history.use-case';

// Wire up dependencies outside the React lifecycle
const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const gateway = new HttpShortLinkGateway(apiBaseUrl);
const historyRepo = new LocalStorageHistoryRepository();

const shortenUrlUseCase = new ShortenUrlUseCase(gateway, historyRepo);
const getHistoryUseCase = new GetHistoryUseCase(historyRepo);

export const App: React.FC = () => {
  const {
    loading,
    error,
    result,
    history,
    copiedCode,
    shortenUrl,
    copyToClipboard,
  } = useShortener(shortenUrlUseCase, getHistoryUseCase);

  return (
    <>
      <Header />
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
          <span>📋</span> Lien copié avec succès !
        </div>
      )}
    </>
  );
};

export default App;
