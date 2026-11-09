import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'fr' | 'en';

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  toggleLang: () => void;
  tr: (fr: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'writicart_lang_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as LanguageCode;
      return saved === 'en' ? 'en' : 'fr';
    } catch {
      return 'fr';
    }
  });

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: LanguageCode) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'fr' ? 'en' : 'fr'));
  };

  const tr = (fr: string, en: string): string => {
    return lang === 'en' ? en : fr;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
