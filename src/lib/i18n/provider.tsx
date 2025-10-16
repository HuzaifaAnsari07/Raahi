
'use client';

import { createContext, useState, useEffect, useContext } from 'react';
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
    const storedLang = localStorage.getItem('nmmt-lang') || 'en';
    if (translations[storedLang]) {
      setLanguage(storedLang);
      document.documentElement.lang = storedLang;
      document.documentElement.dir = storedLang === 'ur' ? 'rtl' : 'ltr';
    }
  }, []);

  const setAndStoreLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('nmmt-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    // Force a re-render to apply direction changes
    window.dispatchEvent(new Event('language-change'));
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
      {children}
    </LanguageContext.Provider>
  );
}

// Direction Provider
type DirectionContextType = {
  direction: 'ltr' | 'rtl';
};

const LanguageDirectionContext = createContext<DirectionContextType>({ direction: 'ltr' });

export const LanguageDirectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    const updateDirection = () => {
      const dir = document.documentElement.dir as 'ltr' | 'rtl' || 'ltr';
      setDirection(dir);
    };

    updateDirection(); // Set initial direction

    window.addEventListener('language-change', updateDirection);

    // Also use a mutation observer for more robust detection
    const observer = new MutationObserver(updateDirection);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });

    return () => {
      window.removeEventListener('language-change', updateDirection);
      observer.disconnect();
    };
  }, []);
  
  return (
    <LanguageDirectionContext.Provider value={{ direction }}>
      {children}
    </LanguageDirectionContext.Provider>
  );
};

export const useLanguageDirection = () => useContext(LanguageDirectionContext);
