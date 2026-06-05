import React from "react";
import type { Language } from "../../i18n/translations";

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => (
  <div className="absolute top-0 right-0 flex gap-1.5">
    <button
      onClick={() => onLanguageChange("en")}
      className={`border-none text-white cursor-pointer px-2.5 py-1.5 rounded text-sm transition-colors ${currentLanguage === "en" ? "bg-white/20" : "bg-transparent hover:bg-white/10"}`}
    >
      EN
    </button>
    <button
      onClick={() => onLanguageChange("fr")}
      className={`border-none text-white cursor-pointer px-2.5 py-1.5 rounded text-sm transition-colors ${currentLanguage === "fr" ? "bg-white/20" : "bg-transparent hover:bg-white/10"}`}
    >
      FR
    </button>
  </div>
);
