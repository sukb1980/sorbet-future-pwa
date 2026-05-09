/* ============================================================
   Mock AI Analysis Data — Sorbet Future Fit
   Simulated analysis results for skin, hair, nails
   ============================================================ */

export const analysisSamples = [
  {
    id: 'analysis-skin-1',
    type: 'skin',
    label: 'Skin Analysis',
    icon: '✨',
    concern: 'Dehydration',
    attributes: [
      { name: 'Hydration Level', score: 38, status: 'Low', icon: '💧' },
      { name: 'Oil Balance', score: 65, status: 'Normal', icon: '🌿' },
      { name: 'Skin Tone Evenness', score: 72, status: 'Good', icon: '🌟' },
      { name: 'Pore Visibility', score: 55, status: 'Moderate', icon: '🔬' },
      { name: 'Radiance', score: 48, status: 'Below Average', icon: '☀️' },
      { name: 'Fine Lines', score: 80, status: 'Minimal', icon: '🪞' },
    ],
    overallScore: 60,
    confidence: 0.91,
    summary: 'Your skin shows signs of dehydration and reduced radiance. Key concerns are low moisture levels and mild uneven tone. A targeted hydration treatment will significantly improve your skin\'s plumpness and glow.',
    recommendationServices: ['srv-facial-hydra', 'srv-facial-glow'],
    recommendationProducts: ['prd-serum-hydra', 'prd-face-mist', 'prd-spf-barrier'],
    disclaimer: 'This assessment is for guidance only and is non-diagnostic. Please consult a skincare professional for clinical advice.',
  },
  {
    id: 'analysis-skin-2',
    type: 'skin',
    label: 'Skin Analysis',
    icon: '✨',
    concern: 'Pigmentation',
    attributes: [
      { name: 'Hydration Level', score: 72, status: 'Good', icon: '💧' },
      { name: 'Oil Balance', score: 60, status: 'Normal', icon: '🌿' },
      { name: 'Skin Tone Evenness', score: 42, status: 'Low', icon: '🌟' },
      { name: 'Pore Visibility', score: 58, status: 'Moderate', icon: '🔬' },
      { name: 'Radiance', score: 55, status: 'Moderate', icon: '☀️' },
      { name: 'Fine Lines', score: 74, status: 'Minimal', icon: '🪞' },
    ],
    overallScore: 62,
    confidence: 0.88,
    summary: 'Your analysis indicates uneven skin tone and early pigmentation concerns. A brightening routine with targeted Vitamin C actives will help even your complexion and restore vibrancy.',
    recommendationServices: ['srv-facial-glow', 'srv-facial-peel'],
    recommendationProducts: ['prd-vit-c-serum', 'prd-spf-barrier'],
    disclaimer: 'This assessment is for guidance only and is non-diagnostic. Please consult a skincare professional for clinical advice.',
  },
  {
    id: 'analysis-nails-1',
    type: 'nails',
    label: 'Nail Analysis',
    icon: '💅',
    concern: 'Dry cuticles',
    attributes: [
      { name: 'Cuticle Condition', score: 35, status: 'Dry', icon: '🌿' },
      { name: 'Nail Strength', score: 58, status: 'Moderate', icon: '💪' },
      { name: 'Nail Hydration', score: 48, status: 'Below Average', icon: '💧' },
      { name: 'Surface Smoothness', score: 70, status: 'Good', icon: '🪞' },
      { name: 'Colour Vibrancy', score: 65, status: 'Good', icon: '🎨' },
    ],
    overallScore: 55,
    confidence: 0.86,
    summary: 'Your nails show dry, overgrown cuticles and moderate dehydration. Regular cuticle oil application and a nourishing gel service will restore health and shine.',
    recommendationServices: ['srv-nails-gel', 'srv-mani-classic'],
    recommendationProducts: ['prd-cuticle-oil', 'prd-nail-serum'],
    disclaimer: 'This assessment is for guidance only and is non-diagnostic.',
  },
  {
    id: 'analysis-hair-1',
    type: 'hair',
    label: 'Hair Analysis',
    icon: '💇',
    concern: 'Frizz & Dryness',
    attributes: [
      { name: 'Moisture Content', score: 40, status: 'Low', icon: '💧' },
      { name: 'Frizz Level', score: 30, status: 'High', icon: '🌀' },
      { name: 'Scalp Health', score: 68, status: 'Good', icon: '🌿' },
      { name: 'Shine', score: 45, status: 'Below Average', icon: '✨' },
      { name: 'Breakage', score: 62, status: 'Moderate', icon: '💪' },
    ],
    overallScore: 49,
    confidence: 0.84,
    summary: 'Your hair analysis reveals low moisture, high frizz, and reduced shine. A professional blowout and targeted serum treatment will dramatically improve manageability and gloss.',
    recommendationServices: ['srv-hair-blowout'],
    recommendationProducts: ['prd-hair-serum', 'prd-colour-protect'],
    disclaimer: 'This assessment is for guidance only and is non-diagnostic.',
  },
];

export const analysisTypes = [
  { id: 'skin', label: 'Skin', icon: '✨', description: 'Analyse hydration, tone, pores, radiance, and fine lines.' },
  { id: 'nails', label: 'Nails', icon: '💅', description: 'Assess cuticle health, nail strength, and hydration levels.' },
  { id: 'hair', label: 'Hair', icon: '💇', description: 'Evaluate moisture, frizz, scalp health, and shine.' },
];

export const cameraGuidance = [
  { step: 1, icon: '☀️', title: 'Good Lighting', tip: 'Sit in natural light or near a bright lamp. Avoid harsh shadows on your face.' },
  { step: 2, icon: '📐', title: 'Correct Distance', tip: 'Hold your phone 25–35 cm from your face — about one forearm\'s length away.' },
  { step: 3, icon: '🧴', title: 'Clean Skin', tip: 'For best results, remove makeup and ensure your skin is clean and product-free.' },
  { step: 4, icon: '😐', title: 'Neutral Expression', tip: 'Look straight at the camera with a relaxed, neutral expression.' },
];

export const fallbackQuestionnaire = [
  { id: 'q1', question: 'How does your skin feel by midday?', options: ['Very dry', 'Normal', 'Oily', 'Mixed — dry cheeks, oily T-zone'], maps: { 'Very dry': 'Dryness', 'Normal': 'Balanced', 'Oily': 'Oiliness', 'Mixed — dry cheeks, oily T-zone': 'Combination' } },
  { id: 'q2', question: 'What is your biggest skin concern?', options: ['Dehydration', 'Uneven tone', 'Breakouts', 'Fine lines', 'Sensitivity'] },
  { id: 'q3', question: 'How often do you wear sunscreen?', options: ['Every day', 'Sometimes', 'Rarely', 'Never'] },
  { id: 'q4', question: 'How would you describe your nail condition?', options: ['Healthy', 'Dry cuticles', 'Brittle and breaking', 'Peeling'] },
];

export const getAnalysisByType = (type) => analysisSamples.filter((a) => a.type === type);
export const getRandomAnalysis = (type) => {
  const samples = getAnalysisByType(type);
  return samples[Math.floor(Math.random() * samples.length)] || analysisSamples[0];
};
