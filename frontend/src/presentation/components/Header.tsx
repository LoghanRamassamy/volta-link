import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0 10px 0', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: '5px' }}>
        <button 
          onClick={() => setLanguage('en')} 
          style={{ 
            background: language === 'en' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          EN
        </button>
        <button 
          onClick={() => setLanguage('fr')} 
          style={{ 
            background: language === 'fr' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          FR
        </button>
      </div>
      <h1>{t.header.title}</h1>
      <p className="subtitle">{t.header.subtitle}</p>
    </header>
  );
};
