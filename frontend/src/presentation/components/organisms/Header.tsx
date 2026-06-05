import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0 10px 0', position: 'relative' }}>
      <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      <h1>{t.header.title}</h1>
      <p className="subtitle">{t.header.subtitle}</p>
    </header>
  );
};
