/* ============================================================
   Mock Services Data — Sorbet Future Fit
   Service categories, citizens (therapists), availability
   ============================================================ */

export const addOns = [
  { id: 'srv-led-addon', name: 'LED Light Therapy', durationMin: 20, price: { ZAR: 180, BWP: 130, MUR: 510 }, description: 'Rejuvenating LED panel for enhanced glow post-facial.' },
  { id: 'srv-feet-polish', name: 'Feet Polish Add-on', durationMin: 30, price: { ZAR: 150, BWP: 110, MUR: 430 }, description: 'Matching gel polish on toes to complete the look.' },
  { id: 'srv-scalp-treat', name: 'Scalp Treatment', durationMin: 15, price: { ZAR: 120, BWP: 88, MUR: 340 }, description: 'Nourishing scalp massage with treatment serum.' },
  { id: 'srv-brow-shape', name: 'Brow Shaping', durationMin: 20, price: { ZAR: 130, BWP: 95, MUR: 370 }, description: 'Precision brow shaping and tinting.' },
  { id: 'srv-hand-mask', name: 'Hydrating Hand Mask', durationMin: 15, price: { ZAR: 95, BWP: 70, MUR: 270 }, description: 'Deep conditioning mask for soft, smooth hands.' },
];

export const serviceCategories = [
  {
    id: 'cat-skin', name: 'Skin', icon: '✨',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
    subcategories: [
      {
        id: 'sub-facials', name: 'Facials',
        services: [
          {
            id: 'srv-facial-hydra', name: 'Hydra Glow Facial',
            description: 'A luxurious deep-hydration facial that restores radiance and plumps dehydrated skin. Includes cleanse, exfoliation, mask, and massage.',
            durationMin: 60, price: { ZAR: 850, BWP: 620, MUR: 2450 },
            addOnIds: ['srv-led-addon', 'srv-brow-shape'],
            aftercareProductIds: ['prd-serum-hydra', 'prd-face-mist'],
            recommendedCadenceDays: 14, seasonal: false, popular: true,
            availableAt: ['store-cpt-01', 'store-cpt-02', 'store-jnb-01', 'store-mru-01'],
          },
          {
            id: 'srv-facial-glow', name: 'Vitamin C Brightening Facial',
            description: 'Targets uneven tone and dullness with high-potency vitamin C actives.',
            durationMin: 75, price: { ZAR: 980, BWP: 715, MUR: 2800 },
            addOnIds: ['srv-led-addon'], aftercareProductIds: ['prd-vit-c-serum'],
            recommendedCadenceDays: 21, seasonal: true, popular: true,
            availableAt: ['store-cpt-01', 'store-jnb-01', 'store-mru-01'],
          },
          {
            id: 'srv-facial-peel', name: 'Chemical Peel (Light)',
            description: 'Gentle alpha-hydroxy acid peel for resurfacing and pore refinement.',
            durationMin: 45, price: { ZAR: 720, BWP: 525, MUR: 2050 },
            addOnIds: ['srv-led-addon'], aftercareProductIds: ['prd-spf-barrier'],
            recommendedCadenceDays: 28, seasonal: false, popular: false,
            requiresForm: 'form-chemical-service',
            availableAt: ['store-cpt-01', 'store-cpt-02', 'store-jnb-01'],
          },
        ],
      },
      {
        id: 'sub-body', name: 'Body',
        services: [
          {
            id: 'srv-body-wrap', name: 'Detox Body Wrap',
            description: 'Mineral-rich seaweed wrap to detoxify, firm and soften skin from neck to toe.',
            durationMin: 90, price: { ZAR: 1150, BWP: 840, MUR: 3300 },
            addOnIds: ['srv-scalp-treat'], aftercareProductIds: ['prd-body-oil'],
            recommendedCadenceDays: 30, seasonal: true, popular: false,
            availableAt: ['store-cpt-01', 'store-jnb-01', 'store-mru-01'],
          },
        ],
      },
    ],
  },
  {
    id: 'cat-nails', name: 'Nails', icon: '💅',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
    subcategories: [
      {
        id: 'sub-gel', name: 'Gel Nails',
        services: [
          {
            id: 'srv-nails-gel', name: 'Gel Polish — Hands',
            description: 'Long-lasting high-gloss gel polish in your choice of colour. Includes nail prep, cuticle care, and UV cure.',
            durationMin: 45, price: { ZAR: 320, BWP: 235, MUR: 910 },
            addOnIds: ['srv-feet-polish', 'srv-hand-mask'], aftercareProductIds: ['prd-cuticle-oil'],
            recommendedCadenceDays: 21, seasonal: false, popular: true,
            availableAt: ['store-cpt-01', 'store-cpt-02', 'store-jnb-01', 'store-gab-01', 'store-mru-01'],
          },
          {
            id: 'srv-nails-gel-full', name: 'Full Set Gel Extensions',
            description: 'Custom length gel extensions with colour of choice. Sculpted and filed to your preferred shape.',
            durationMin: 90, price: { ZAR: 650, BWP: 475, MUR: 1850 },
            addOnIds: ['srv-feet-polish', 'srv-hand-mask'], aftercareProductIds: ['prd-cuticle-oil', 'prd-nail-serum'],
            recommendedCadenceDays: 21, seasonal: false, popular: true,
            availableAt: ['store-cpt-01', 'store-jnb-01', 'store-gab-01', 'store-mru-01'],
          },
        ],
      },
      {
        id: 'sub-manicure', name: 'Manicure',
        services: [
          {
            id: 'srv-mani-classic', name: 'Classic Manicure',
            description: 'Traditional manicure with nail shaping, cuticle treatment, and regular polish.',
            durationMin: 40, price: { ZAR: 220, BWP: 160, MUR: 630 },
            addOnIds: ['srv-hand-mask'], aftercareProductIds: ['prd-cuticle-oil'],
            recommendedCadenceDays: 14, seasonal: false, popular: false,
            availableAt: ['store-cpt-01', 'store-cpt-02', 'store-jnb-01', 'store-gab-01', 'store-fra-01', 'store-mru-01', 'store-mru-02'],
          },
        ],
      },
    ],
  },
  {
    id: 'cat-hair', name: 'Hair', icon: '💇',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop',
    subcategories: [
      {
        id: 'sub-styling', name: 'Styling',
        services: [
          {
            id: 'srv-hair-blowout', name: 'Blowout & Style',
            description: 'Professional blow-dry and styling for silky, smooth results. Ideal for any occasion.',
            durationMin: 45, price: { ZAR: 380, BWP: 278, MUR: 1080 },
            addOnIds: ['srv-scalp-treat'], aftercareProductIds: ['prd-hair-serum'],
            recommendedCadenceDays: 7, seasonal: false, popular: true,
            availableAt: ['store-cpt-01', 'store-cpt-02', 'store-jnb-01', 'store-mru-01'],
          },
          {
            id: 'srv-hair-colour', name: 'Full Hair Colour',
            description: 'Full head colour application with premium, ammonia-free formulas.',
            durationMin: 120, price: { ZAR: 1400, BWP: 1020, MUR: 3990 },
            addOnIds: ['srv-scalp-treat'], aftercareProductIds: ['prd-colour-protect'],
            recommendedCadenceDays: 42, seasonal: false, popular: false,
            requiresForm: 'form-chemical-service',
            availableAt: ['store-cpt-01', 'store-jnb-01', 'store-mru-01'],
          },
        ],
      },
    ],
  },
  {
    id: 'cat-brows', name: 'Brows & Lashes', icon: '👁',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&auto=format&fit=crop',
    subcategories: [
      {
        id: 'sub-brows', name: 'Brows',
        services: [
          {
            id: 'srv-brow-laminate', name: 'Brow Lamination',
            description: 'Fuller, defined brows without micro-blading. Includes shaping and tinting.',
            durationMin: 60, price: { ZAR: 550, BWP: 400, MUR: 1560 },
            addOnIds: ['srv-brow-shape'], aftercareProductIds: ['prd-brow-gel'],
            recommendedCadenceDays: 42, seasonal: false, popular: true,
            availableAt: ['store-cpt-01', 'store-cpt-02', 'store-jnb-01', 'store-mru-01'],
          },
        ],
      },
    ],
  },
];

export const citizens = [
  { id: 'cit-01', name: 'Lerato M.', avatar: 'https://i.pravatar.cc/100?img=47', skills: ['srv-facial-hydra', 'srv-facial-glow', 'srv-facial-peel', 'srv-led-addon', 'srv-brow-shape', 'srv-brow-laminate', 'srv-body-wrap'], storeIds: ['store-cpt-01', 'store-cpt-02'], rating: 4.8, reviewCount: 204, experience: '6 years', specialties: 'Advanced Facials, Chemical Peels, Brow Artistry' },
  { id: 'cit-02', name: 'Mia B.', avatar: 'https://i.pravatar.cc/100?img=9', skills: ['srv-nails-gel', 'srv-nails-gel-full', 'srv-mani-classic', 'srv-feet-polish', 'srv-hand-mask'], storeIds: ['store-cpt-01'], rating: 4.9, reviewCount: 318, experience: '8 years', specialties: 'Nail Art, Gel Extensions, Nail Health' },
  { id: 'cit-03', name: 'Thandeka K.', avatar: 'https://i.pravatar.cc/100?img=32', skills: ['srv-hair-blowout', 'srv-hair-colour', 'srv-scalp-treat'], storeIds: ['store-cpt-01', 'store-jnb-01'], rating: 4.7, reviewCount: 156, experience: '5 years', specialties: 'Colour Transformation, Scalp Health, Natural Hair' },
  { id: 'cit-04', name: 'Priya S.', avatar: 'https://i.pravatar.cc/100?img=55', skills: ['srv-facial-hydra', 'srv-facial-glow', 'srv-body-wrap', 'srv-led-addon'], storeIds: ['store-jnb-01'], rating: 4.8, reviewCount: 279, experience: '7 years', specialties: 'Brightening Treatments, Body Therapies' },
  { id: 'cit-05', name: 'Amara D.', avatar: 'https://i.pravatar.cc/100?img=23', skills: ['srv-nails-gel', 'srv-mani-classic', 'srv-feet-polish'], storeIds: ['store-gab-01', 'store-fra-01'], rating: 4.6, reviewCount: 88, experience: '3 years', specialties: 'Gel Art, Classic Manicure' },
  { id: 'cit-06', name: 'Sophie L.', avatar: 'https://i.pravatar.cc/100?img=41', skills: ['srv-facial-hydra', 'srv-facial-glow', 'srv-brow-laminate', 'srv-hair-blowout'], storeIds: ['store-mru-01', 'store-mru-02'], rating: 4.9, reviewCount: 143, experience: '9 years', specialties: 'Tropical Skin Rituals, Brow Design, Hair Styling' },
];

const today = new Date();
const fmtDate = (d) => d.toISOString().split('T')[0];
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

export const availability = [
  {
    storeId: 'store-cpt-01', citizenId: 'cit-01', serviceId: 'srv-facial-hydra',
    slots: [
      { date: fmtDate(addDays(today, 1)), period: 'Morning', time: '09:00', available: true },
      { date: fmtDate(addDays(today, 1)), period: 'Morning', time: '10:00', available: false },
      { date: fmtDate(addDays(today, 1)), period: 'Afternoon', time: '14:00', available: true },
      { date: fmtDate(addDays(today, 2)), period: 'Morning', time: '09:30', available: true },
      { date: fmtDate(addDays(today, 2)), period: 'Afternoon', time: '13:30', available: true },
      { date: fmtDate(addDays(today, 3)), period: 'Morning', time: '10:00', available: true },
      { date: fmtDate(addDays(today, 4)), period: 'Morning', time: '09:00', available: true },
      { date: fmtDate(addDays(today, 5)), period: 'Afternoon', time: '14:30', available: true },
      { date: fmtDate(addDays(today, 6)), period: 'Evening', time: '17:30', available: true },
    ],
  },
  {
    storeId: 'store-cpt-01', citizenId: 'cit-02', serviceId: 'srv-nails-gel',
    slots: [
      { date: fmtDate(addDays(today, 1)), period: 'Morning', time: '09:30', available: true },
      { date: fmtDate(addDays(today, 1)), period: 'Afternoon', time: '14:00', available: false },
      { date: fmtDate(addDays(today, 2)), period: 'Morning', time: '09:00', available: true },
      { date: fmtDate(addDays(today, 2)), period: 'Afternoon', time: '13:00', available: true },
      { date: fmtDate(addDays(today, 3)), period: 'Afternoon', time: '15:00', available: true },
      { date: fmtDate(addDays(today, 4)), period: 'Morning', time: '09:30', available: true },
      { date: fmtDate(addDays(today, 5)), period: 'Evening', time: '17:30', available: true },
    ],
  },
  {
    storeId: 'store-cpt-01', citizenId: 'cit-03', serviceId: 'srv-hair-blowout',
    slots: [
      { date: fmtDate(addDays(today, 1)), period: 'Afternoon', time: '13:00', available: true },
      { date: fmtDate(addDays(today, 2)), period: 'Morning', time: '09:00', available: true },
      { date: fmtDate(addDays(today, 3)), period: 'Afternoon', time: '14:30', available: true },
      { date: fmtDate(addDays(today, 5)), period: 'Evening', time: '18:00', available: true },
    ],
  },
  {
    storeId: 'store-gab-01', citizenId: 'cit-05', serviceId: 'srv-nails-gel',
    slots: [
      { date: fmtDate(addDays(today, 1)), period: 'Morning', time: '09:30', available: true },
      { date: fmtDate(addDays(today, 2)), period: 'Morning', time: '10:30', available: true },
      { date: fmtDate(addDays(today, 3)), period: 'Afternoon', time: '14:00', available: false },
    ],
  },
];

export const getServiceById = (id) => {
  for (const cat of serviceCategories) {
    for (const sub of cat.subcategories) {
      const svc = sub.services.find((s) => s.id === id);
      if (svc) return { ...svc, category: cat.name, subcategory: sub.name };
    }
  }
  return null;
};
export const getAddOnById = (id) => addOns.find((a) => a.id === id) || null;
export const getCitizenById = (id) => citizens.find((c) => c.id === id) || null;
export const getCitizensForService = (serviceId, storeId) =>
  citizens.filter((c) => c.skills.includes(serviceId) && c.storeIds.includes(storeId));
export const getAvailabilityForBooking = (storeId, citizenId, serviceId) =>
  availability.find((a) => a.storeId === storeId && a.citizenId === citizenId && a.serviceId === serviceId) || null;
