/* ============================================================
   Mock Loyalty Data — Sorbet Future Fit
   Tiers, transactions, referrals, birthday rewards
   ============================================================ */

export const loyaltyTiers = [
  {
    id: 'Bronze',
    minPoints: 0,
    maxPoints: 999,
    color: '#CD7F32',
    gradient: 'linear-gradient(135deg, #CD7F32 0%, #E8A87C 100%)',
    earningRate: 1,
    benefits: [
      'Earn 1 point per R10 spent',
      'Birthday welcome gift',
      'Access to member-only promotions',
    ],
    icon: '🥉',
  },
  {
    id: 'Silver',
    minPoints: 1000,
    maxPoints: 2999,
    color: '#9E9E9E',
    gradient: 'linear-gradient(135deg, #9E9E9E 0%, #E0E0E0 100%)',
    earningRate: 1.5,
    benefits: [
      'Earn 1.5 points per R10 spent',
      'Priority booking slots',
      'Exclusive Silver offers',
      '10% off retail products quarterly',
    ],
    icon: '🥈',
  },
  {
    id: 'Gold',
    minPoints: 3000,
    maxPoints: null,
    color: '#B8860B',
    gradient: 'linear-gradient(135deg, #B8860B 0%, #FFD700 100%)',
    earningRate: 2,
    benefits: [
      'Earn 2 points per R10 spent',
      'Priority booking — first access',
      '50% off one birthday service',
      'Complimentary annual skin analysis',
      'Exclusive Gold concierge',
      'Tier-boost double points months',
    ],
    icon: '🥇',
  },
];

export const loyaltyTransactions = [
  { id: 'lt1', userId: 'u1', date: '2026-04-02', type: 'Service', description: 'Hydra Glow Facial', points: 150, balance: 2480 },
  { id: 'lt2', userId: 'u1', date: '2026-04-05', type: 'Retail', description: 'Hydra Renewal Serum', points: 45, balance: 2330 },
  { id: 'lt3', userId: 'u1', date: '2026-03-22', type: 'Service', description: 'Gel Polish — Hands', points: 35, balance: 2285 },
  { id: 'lt4', userId: 'u1', date: '2026-03-10', type: 'Referral', description: 'Referred Nomsa D.', points: 200, balance: 2250 },
  { id: 'lt5', userId: 'u1', date: '2026-02-28', type: 'Service', description: 'Blowout & Style', points: 40, balance: 2050 },
  { id: 'lt6', userId: 'u1', date: '2026-02-14', type: 'Redemption', description: 'Redeemed for Facial discount', points: -300, balance: 2010 },
  { id: 'lt7', userId: 'u1', date: '2026-02-01', type: 'Service', description: 'Brow Lamination', points: 60, balance: 2310 },
  { id: 'lt8', userId: 'u1', date: '2026-01-20', type: 'Birthday', description: 'Birthday Month Reward', points: 250, balance: 2250 },
];

export const referralRewards = {
  pointsPerReferral: 200,
  referralLimit: 10,
  friendBenefit: '10% off first booking',
};

export const birthdayReward = {
  discount: 50,
  applicableTo: 'one selected service',
  validDays: 30,
  description: '50% off one selected service during your birthday month',
};

export const tierBoostMonths = [
  { month: 'March', multiplier: 2, description: 'Double Points — Autumn Beauty Month' },
  { month: 'September', multiplier: 2, description: 'Double Points — Spring Glow Season' },
  { month: 'December', multiplier: 1.5, description: '1.5x Points — Festive Season' },
];

export const pointsExpiryPolicy = {
  validityMonths: 12,
  warningDaysBeforeExpiry: 60,
  description: 'Loyalty points expire 12 months after they are earned.',
};

export const getTierById = (tierId) => loyaltyTiers.find((t) => t.id === tierId) || loyaltyTiers[0];

export const getTierForPoints = (points) => {
  const sorted = [...loyaltyTiers].sort((a, b) => b.minPoints - a.minPoints);
  return sorted.find((t) => points >= t.minPoints) || loyaltyTiers[0];
};

export const getNextTier = (currentTierId) => {
  const idx = loyaltyTiers.findIndex((t) => t.id === currentTierId);
  return loyaltyTiers[idx + 1] || null;
};

export const getProgressToNextTier = (points, currentTierId) => {
  const current = loyaltyTiers.find((t) => t.id === currentTierId);
  const next = getNextTier(currentTierId);
  if (!next) return 100;
  const range = next.minPoints - current.minPoints;
  const earned = points - current.minPoints;
  return Math.min(100, Math.round((earned / range) * 100));
};

// Promotions linked to loyalty (used on home page and loyalty page)
export const promos = [
  {
    id: 'promo-tier-boost',
    title: 'Autumn Double Points',
    description: 'Earn double loyalty points on all services this March.',
    type: 'Loyalty Boost',
    validFrom: '2026-03-01',
    validTo: '2026-03-31',
    eligibleTiers: ['Bronze', 'Silver', 'Gold'],
    cta: 'Book Now',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
  },
  {
    id: 'promo-birthday',
    title: 'Birthday Beauty',
    description: '50% off one selected service during your birthday month.',
    type: 'Birthday',
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    eligibleTiers: ['Bronze', 'Silver', 'Gold'],
    cta: 'Redeem',
    image: 'https://images.unsplash.com/photo-1602192509154-0b900ee1f851?w=600&auto=format&fit=crop',
  },
];

/** Alias for compatibility with Loyalty page */
export const transactions = loyaltyTransactions;

/** Redeemable rewards catalog */
export const rewards = [
  { id: 'rwd-1', name: 'Free Blowout & Style', description: 'Redeem for a complimentary blowout at any Sorbet store.', pointsCost: 500 },
  { id: 'rwd-2', name: '20% Off Next Service', description: 'Apply a 20% discount to your next booked service.', pointsCost: 300 },
  { id: 'rwd-3', name: 'Free Cuticle Oil (30ml)', description: 'Redeem our bestselling Nourish Cuticle Oil, on us.', pointsCost: 150 },
  { id: 'rwd-4', name: 'R100 Retail Voucher', description: 'Spend R100 off any retail purchase in-store or online.', pointsCost: 1000 },
  { id: 'rwd-5', name: 'Complimentary Add-On', description: 'Free LED Light Therapy add-on on your next facial booking.', pointsCost: 250 },
  { id: 'rwd-6', name: 'Gold Concierge Upgrade', description: 'Enjoy Gold-tier concierge service for your next two bookings.', pointsCost: 2000 },
];
