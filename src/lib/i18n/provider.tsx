
'use client';

import { createContext, useState, useEffect } from 'react';
import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';
import ur from './locales/ur.json';

const translations: Record<string, any> = { en, hi, mr, ur };

type TranslationContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};

export const LanguageContext = createContext<TranslationContextType>({
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
  
  const t = (key: string, values?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            // Fallback to English if translation is missing
            let fallbackResult = translations['en'];
            for (const fk of keys) {
                fallbackResult = fallbackResult?.[fk];
                if(fallbackResult === undefined) break;
            }
            result = fallbackResult;
            break;
        }
    }
    
    let resultString = result || key;

    if (values && typeof resultString === 'string') {
        Object.keys(values).forEach(valueKey => {
            const regex = new RegExp(`{${valueKey}}`, 'g');
            resultString = resultString.replace(regex, String(values[valueKey]));
        });
    }

    return resultString;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setAndStoreLanguage, t }}>
      <div lang={language} dir={language === 'ur' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
