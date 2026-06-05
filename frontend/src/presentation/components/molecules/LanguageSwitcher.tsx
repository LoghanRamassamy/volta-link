import React from 'react';
import { Language } from '../../i18n/translations';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: '5px' }}>
      <button 
        onClick={() => onLanguageChange('en')} 
        style={{ 
          background: currentLanguage === 'en' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
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
        onClick={() => onLanguageChange('fr')} 
        style={{ 
          background: currentLanguage === 'fr' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
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
  );
};
