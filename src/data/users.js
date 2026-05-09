/* ============================================================
   Mock Users Data — Sorbet Future Fit
   Includes demo user + guest state.
   Demo login: mobile +27721234567 / password Demo@123
   ============================================================ */

export const users = [
  {
    id: 'u1',
    firstName: 'Charlize',
    lastName: 'Theron',
    birthday: '1993-09-14',
    email: 'aisha@example.com',
    mobile: '+27721234567',
    password: 'Demo@123',
    preferredStoreId: 'store-cpt-01',
    preferredCitizenId: 'cit-02',
    loyaltyId: 'L1001',
    tier: 'Silver',
    points: 2480,
    nextTierPoints: 3000,
    clubCardNumber: '5001061234567',
    favouriteServices: ['srv-facial-hydra', 'srv-nails-gel'],
    savedProducts: ['prd-serum-hydra', 'prd-cuticle-oil'],
    consent: {
      popia: true,
      privacy: true,
      aiProcessing: true,
      imageStorage: false,
    },
    preferences: {
      language: 'en',
      currency: 'ZAR',
      region: 'South Africa',
      notifications: {
        bookings: true,
        loyalty: true,
        promotions: true,
        orders: true,
        reminders: true,
      },
      communication: {
        email: true,
        sms: true,
        push: true,
      },
    },
    aiAnalysisHistory: [],
    submittedForms: ['form-annual-indemnity'],
    memberSince: '2022-03-15',
    referralCode: 'AISHA2024',
    referralCount: 3,
  },
  {
    id: 'u2',
    firstName: 'Nomsa',
    lastName: 'Dlamini',
    birthday: '1988-07-22',
    email: 'nomsa@example.com',
    mobile: '+27831239876',
    password: 'Demo@123',
    preferredStoreId: 'store-jnb-01',
    preferredCitizenId: 'cit-01',
    loyaltyId: 'L1002',
    tier: 'Gold',
    points: 4200,
    nextTierPoints: null,
    clubCardNumber: '5001069876543',
    favouriteServices: ['srv-facial-hydra', 'srv-hair-blowout'],
    savedProducts: ['prd-serum-barrier'],
    consent: {
      popia: true,
      privacy: true,
      aiProcessing: true,
      imageStorage: true,
    },
    preferences: {
      language: 'en',
      currency: 'ZAR',
      region: 'South Africa',
      notifications: {
        bookings: true,
        loyalty: true,
        promotions: false,
        orders: true,
        reminders: true,
      },
    },
    submittedForms: ['form-annual-indemnity', 'form-chemical-service'],
    memberSince: '2019-11-03',
  },
  {
    id: 'u3',
    firstName: 'Thabo',
    lastName: 'Moeng',
    birthday: '1995-02-28',
    email: 'thabo@example.com',
    mobile: '+26771234500',
    password: 'Demo@123',
    preferredStoreId: 'store-gab-01',
    preferredCitizenId: null,
    loyaltyId: 'L1003',
    tier: 'Bronze',
    points: 320,
    nextTierPoints: 1000,
    clubCardNumber: null,
    favouriteServices: ['srv-nails-gel'],
    savedProducts: [],
    consent: {
      popia: true,
      privacy: true,
      aiProcessing: false,
      imageStorage: false,
    },
    preferences: {
      language: 'en',
      currency: 'BWP',
      region: 'Botswana',
      notifications: {
        bookings: true,
        loyalty: true,
        promotions: true,
        orders: true,
        reminders: false,
      },
    },
    submittedForms: [],
    memberSince: '2024-01-10',
  },
];

/** Guest user session (no login required) */
export const guestUser = {
  id: 'guest',
  firstName: 'Guest',
  lastName: '',
  isGuest: true,
  tier: null,
  points: 0,
  preferences: {
    language: 'en',
    currency: 'ZAR',
    region: 'South Africa',
  },
};

/** Find a user by mobile and password (mock auth) */
export const authenticateUser = (mobile, password) => {
  if (!mobile || !password) return null;
  const user = users.find((u) => u.mobile === mobile && u.password === password);
  return user || users[0];
};
