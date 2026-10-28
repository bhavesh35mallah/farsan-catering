import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, productNamesGu, categoryNamesGu } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default to Gujarati as requested by user
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('farsan_language') || 'gu';
  });

  useEffect(() => {
    localStorage.setItem('farsan_language', language);
    if (language === 'gu') {
      document.documentElement.lang = 'gu';
      document.body.classList.add('font-gujarati');
    } else {
      document.documentElement.lang = 'en';
      document.body.classList.remove('font-gujarati');
    }
  }, [language]);

  const setLanguage = (lang) => {
    if (lang === 'gu' || lang === 'en') {
      setLanguageState(lang);
    }
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'gu' ? 'en' : 'gu'));
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const getProductName = (englishName) => {
    if (language === 'gu' && productNamesGu[englishName]) {
      return productNamesGu[englishName];
    }
    return englishName;
  };

  const getCategoryName = (categoryName) => {
    if (language === 'gu' && categoryNamesGu[categoryName]) {
      return categoryNamesGu[categoryName];
    }
    return categoryName;
  };

  const isGujarati = language === 'gu';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        getProductName,
        getCategoryName,
        isGujarati,
      }}
    >
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
