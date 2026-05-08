import React, { createContext, useContext, useState, useMemo } from 'react';
import { user as mockUser } from '../data/user';
import { i18nDictionary } from '../data/i18n';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('ZAR');
  const [region, setRegion] = useState('South Africa');
  
  // Simulate auth
  const login = (mobile, password) => {
    // Allow any demo credentials
    setCurrentUser(mockUser);
    setIsGuest(false);
    return true;
  };
  
  const logout = () => {
    setCurrentUser(null);
    setIsGuest(false);
  };
  
  const continueAsGuest = () => {
    setIsGuest(true);
    setCurrentUser(null);
  };

  const t = (key) => {
    return i18nDictionary[language]?.[key] || i18nDictionary['en']?.[key] || key;
  };

  const value = useMemo(() => ({
    currentUser,
    isGuest,
    language,
    currency,
    region,
    login,
    logout,
    continueAsGuest,
    setLanguage,
    setCurrency,
    setRegion,
    t
  }), [currentUser, isGuest, language, currency, region]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
