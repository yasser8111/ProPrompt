import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('pro_prompt_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('pro_prompt_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (newLang) => {
    setLang(newLang);
  };

  // Helper function to get translation based on dot notation
  const t = (path) => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path; // fallback to path itself if not found
      }
    }
    return result;
  };

  const value = {
    lang,
    toggleLanguage,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className={lang === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
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
