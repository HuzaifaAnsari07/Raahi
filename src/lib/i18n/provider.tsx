
'use client';

import { createContext, useState, useEffect } from 'react';
import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';
import ur from './locales/ur.json';

const translations: Record<string, any> = { en, hi, mr, ur };

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: (lang: string) => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('nmmt-lang');
    if (storedLang && translations[storedLang]) {
      setLanguage(storedLang);
    }
  }, []);

  const setAndStoreLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('nmmt-lang', lang);
  };
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
        result = result?.[k];
        if (!result) {
            // Fallback to English if translation is missing
            let fallbackResult = translations['en'];
            for (const fk of keys) {
                fallbackResult = fallbackResult?.[fk];
            }
            return fallbackResult || key;
        }
    }
    return result || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setAndStoreLanguage, t }}>
      <div lang={language} dir={language === 'ur' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
