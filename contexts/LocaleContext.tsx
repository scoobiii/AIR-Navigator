import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '../lib/translations';

type Locale = 'en' | 'pt' | 'es';

interface LocaleContextType {
  locale: Locale;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const supportedLocales: Locale[] = ['en', 'pt', 'es'];
    const browserLang = navigator.language.split('-')[0];

    if (supportedLocales.includes(browserLang as Locale)) {
      setLocale(browserLang as Locale);
    } else {
      setLocale('en'); // Default to English
    }
  }, []);

  const t = (key: TranslationKey, vars?: Record<string, string | number>): string => {
    let text = translations[locale]?.[key] || translations['en'][key];
    if (vars) {
        Object.entries(vars).forEach(([varKey, value]) => {
            text = text.replace(`{{${varKey}}}`, String(value));
        })
    }
    return text;
  };

  return (
    <LocaleContext.Provider value={{ locale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
