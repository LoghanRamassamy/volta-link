import React from 'react';
import './presentation/styles/index.css';
import { HomePage } from './presentation/components/pages/HomePage';

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
  return (
    <HomePage 
      shortenUrlUseCase={shortenUrlUseCase} 
      getHistoryUseCase={getHistoryUseCase} 
    />
  );
};

export default App;
