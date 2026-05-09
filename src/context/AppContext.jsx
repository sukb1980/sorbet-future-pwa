/* ============================================================
   AppContext — Global App State
   Sorbet Future Fit
   ============================================================ */
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { users, authenticateUser, guestUser } from '../data/users';
import { i18nDictionary, supportedLocales, supportedCurrencies } from '../data/i18n';
import { getStoreById } from '../data/stores';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  /* ---- Onboarding State ---- */
  const [onboardingStep, setOnboardingStep] = useState(() => {
    return localStorage.getItem('srb_onboarded') === 'true' ? 'done' : 'splash';
  });
  const [notificationPermission, setNotificationPermission] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  /* ---- Auth State ---- */
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('srb_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem('srb_guest') === 'true';
  });
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  /* ---- Locale State ---- */
  const [language, setLanguage] = useState(() => currentUser?.preferences?.language || 'en');
  const [currency, setCurrency] = useState(() => currentUser?.preferences?.currency || 'ZAR');
  const [region, setRegion] = useState(() => currentUser?.preferences?.region || 'South Africa');

  /* ---- Store State ---- */
  const [preferredStore, setPreferredStore] = useState(() => {
    const storeId = currentUser?.preferredStoreId;
    return storeId ? getStoreById(storeId) : null;
  });
  const [nearestStore, setNearestStore] = useState(null);

  /* ---- Toast Notifications ---- */
  const [toasts, setToasts] = useState([]);

  /* ---- Offline State ---- */
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); };
  }, []);

  /* ---- PWA Install Prompt ---- */
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); setShowInstallBanner(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  /* ---- Persist auth ---- */
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('srb_user', JSON.stringify(currentUser));
      localStorage.removeItem('srb_guest');
    } else if (isGuest) {
      localStorage.setItem('srb_guest', 'true');
      localStorage.removeItem('srb_user');
    } else {
      localStorage.removeItem('srb_user');
      localStorage.removeItem('srb_guest');
    }
  }, [currentUser, isGuest]);

  /* ---- Auth Actions ---- */
  const login = useCallback((mobile, password) => {
    if (isLocked) return { success: false, error: 'Account locked. Please try again in 15 minutes.' };
    const user = authenticateUser(mobile, password);
    if (user) {
      setCurrentUser(user);
      setIsGuest(false);
      setLoginAttempts(0);
      setPreferredStore(user.preferredStoreId ? getStoreById(user.preferredStoreId) : null);
      setLanguage(user.preferences?.language || 'en');
      setCurrency(user.preferences?.currency || 'ZAR');
      setRegion(user.preferences?.region || 'South Africa');
      return { success: true };
    } else {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);
      if (attempts >= 3) { setIsLocked(true); setTimeout(() => { setIsLocked(false); setLoginAttempts(0); }, 15 * 60 * 1000); }
      return { success: false, error: `Invalid credentials. ${3 - attempts > 0 ? `${3 - attempts} attempt(s) remaining.` : 'Account locked.'}` };
    }
  }, [isLocked, loginAttempts]);

  const register = useCallback((userData) => {
    // Simulate registration — add to users array in session and log in
    const newUser = { ...users[0], ...userData, id: `u${Date.now()}`, tier: 'Bronze', points: 0, loyaltyId: `L${Date.now()}` };
    setCurrentUser(newUser);
    setIsGuest(false);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsGuest(false);
    setPreferredStore(null);
    localStorage.removeItem('srb_user');
    localStorage.removeItem('srb_guest');
  }, []);

  const continueAsGuest = useCallback(() => {
    setIsGuest(true);
    setCurrentUser(null);
  }, []);

  /* ---- Onboarding ---- */
  const completeOnboarding = useCallback(() => {
    setOnboardingStep('done');
    localStorage.setItem('srb_onboarded', 'true');
  }, []);

  const grantNotifications = useCallback(() => {
    setNotificationPermission('granted');
    completeOnboarding();
  }, [completeOnboarding]);

  const denyNotifications = useCallback(() => {
    setNotificationPermission('denied');
    completeOnboarding();
  }, [completeOnboarding]);

  const grantLocation = useCallback(() => {
    setLocationPermission('granted');
    setNearestStore({ id: 'store-cpt-01', name: 'Sorbet Canal Walk', distanceKm: 2.1 });
    setOnboardingStep('auth');
  }, []);

  const denyLocation = useCallback(() => {
    setLocationPermission('denied');
    setOnboardingStep('auth');
  }, []);

  /* ---- Toast System ---- */
  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ---- i18n ---- */
  const t = useCallback((key) => {
    return i18nDictionary[language]?.[key] || i18nDictionary['en']?.[key] || key;
  }, [language]);

  /* ---- User points update (optimistic for demo) ---- */
  const addPoints = useCallback((points) => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({ ...prev, points: prev.points + points }));
  }, [currentUser]);

  /* ---- Install PWA ---- */
  const triggerInstall = useCallback(async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === 'accepted') setShowInstallBanner(false);
  }, [installPrompt]);

  const value = useMemo(() => ({
    /* Onboarding */
    onboardingStep, setOnboardingStep, completeOnboarding,
    notificationPermission, grantNotifications, denyNotifications,
    locationPermission, grantLocation, denyLocation,
    /* Auth */
    currentUser, isGuest, isLocked, loginAttempts,
    login, register, logout, continueAsGuest,
    /* Locale */
    language, setLanguage, currency, setCurrency, region, setRegion,
    locale: language, setLocale: setLanguage,
    /* Store */
    preferredStore, setPreferredStore, nearestStore, setNearestStore,
    /* Toast */
    toasts, showToast, dismissToast,
    /* Offline */
    isOffline,
    /* PWA */
    installPrompt, showInstallBanner, setShowInstallBanner, triggerInstall,
    /* i18n */
    t,
    /* Loyalty */
    addPoints,
  }), [
    onboardingStep, notificationPermission, locationPermission,
    currentUser, isGuest, isLocked, loginAttempts,
    language, currency, region,
    preferredStore, nearestStore,
    toasts, isOffline,
    installPrompt, showInstallBanner,
    login, register, logout, continueAsGuest,
    completeOnboarding, grantNotifications, denyNotifications, grantLocation, denyLocation,
    showToast, dismissToast, triggerInstall, t, addPoints,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};
