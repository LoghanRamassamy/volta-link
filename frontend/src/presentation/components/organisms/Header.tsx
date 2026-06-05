import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <header className="flex flex-col items-center my-5 relative">
      <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      <h1 className="text-[3rem] font-extrabold text-center tracking-tight text-gradient mb-2">{t.header.title}</h1>
      <p className="text-[1.15rem] text-text-dim text-center mb-10">{t.header.subtitle}</p>
    </header>
  );
};
