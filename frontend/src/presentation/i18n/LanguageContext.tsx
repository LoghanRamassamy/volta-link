import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useEffect } from "react";
import type { Language } from "./translations";
import { translations } from "./translations";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const getInitialLanguage = (): Language => {
  const savedLang = localStorage.getItem("volta-lang") as Language;
  if (savedLang && (savedLang === "en" || savedLang === "fr")) {
    return savedLang;
  }

  const sysLang = navigator.language.toLowerCase();
  if (sysLang.startsWith("fr")) {
    return "fr";
  }

  return "en";
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    setLanguageState(getInitialLanguage());
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("volta-lang", lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
