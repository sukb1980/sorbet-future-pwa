/* ============================================================
   Mock Forms Data — Consultation / Indemnity / Legal forms
   Sorbet Future Fit
   ============================================================ */

export const formDefinitions = [
  {
    id: 'form-annual-indemnity',
    title: 'Annual Indemnity Form',
    icon: '📋',
    description: 'Required once per year before receiving any treatments. Covers general medical history and consent.',
    category: 'indemnity',
    mandatory: true,
    requiredFor: ['All Services'],
    timing: 'before-booking',
    renewalMonths: 12,
    fields: [
      { id: 'f1-1', label: 'Do you have any known allergies?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }], required: true },
      { id: 'f1-2', label: 'Please list allergies (if applicable)', type: 'textarea', required: false, placeholder: 'e.g. latex, nuts, fragrances...' },
      { id: 'f1-3', label: 'Are you currently pregnant?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: 'Prefer not to say', label: 'Prefer not to say' }], required: true },
      { id: 'f1-5', label: 'Are you on any medications that affect skin or circulation?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }], required: true },
      { id: 'f1-6', label: 'I confirm that the information provided is accurate and complete.', type: 'checkbox', required: true },
      { id: 'f1-7', label: 'I consent to Sorbet Future Group processing this health data for treatment purposes (POPIA compliant).', type: 'checkbox', required: true },
    ],
  },
  {
    id: 'form-chemical-service',
    title: 'Chemical Service Consultation',
    icon: '🧪',
    description: 'Required before chemical peels, hair colouring, and other chemical-based treatments.',
    category: 'consultation',
    mandatory: true,
    requiredFor: ['Chemical Peel', 'Hair Colour', 'AHA/BHA Treatments'],
    timing: 'before-service',
    renewalMonths: 6,
    fields: [
      { id: 'f2-1', label: 'Have you had a chemical treatment in the past 2 weeks?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }], required: true },
      { id: 'f2-2', label: 'Are you using Retin-A, AHAs, BHAs, or Accutane?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: 'Not sure', label: 'Not sure' }], required: true },
      { id: 'f2-3', label: 'Do you have open wounds or active breakouts in the treatment area?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }], required: true },
      { id: 'f2-4', label: 'Have you had a patch test for this treatment?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: 'Yes - no reaction', label: 'Yes — no reaction' }, { value: 'Yes - minor reaction', label: 'Yes — minor reaction' }, { value: 'No', label: 'No' }], required: true },
      { id: 'f2-5', label: 'I understand and accept the aftercare requirements for this chemical service.', type: 'checkbox', required: true },
    ],
  },
  {
    id: 'form-lash-consent',
    title: 'Lash & Brow Tinting Consent',
    icon: '👁',
    description: 'Short consent form for lash and brow tinting procedures.',
    category: 'consent',
    mandatory: true,
    requiredFor: ['Lash Tinting', 'Brow Tinting', 'Brow Lamination'],
    timing: 'before-service',
    renewalMonths: 12,
    fields: [
      { id: 'f3-1', label: 'Do you wear contact lenses?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }], required: true },
      { id: 'f3-2', label: 'Have you had an allergic reaction to tinting products before?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }], required: true },
      { id: 'f3-3', label: 'I consent to the lash/brow tinting procedure and understand potential risks.', type: 'checkbox', required: true },
    ],
  },
  {
    id: 'form-privacy-notice',
    title: 'Privacy Notice & Data Processing',
    icon: '🔒',
    description: 'Our commitment to protecting your personal data under POPIA.',
    category: 'legal',
    mandatory: false,
    requiredFor: [],
    timing: 'informational',
    renewalMonths: null,
    fields: [
      { id: 'fp-1', label: 'I have read and understood the Privacy Notice from Sorbet Future Group (POPIA compliant).', type: 'checkbox', required: true },
    ],
    content: 'Sorbet Future Group collects and processes your personal data to provide beauty services, manage bookings, run our loyalty programme, and personalise your experience. Your data is stored securely and is never sold to third parties. You have the right to access, correct, or delete your data at any time. For queries, contact privacy@sorbetfuture.co.za.',
  },
];

export const userFormSubmissions = [
  {
    id: 'sub-001',
    userId: 'u1',
    formId: 'form-annual-indemnity',
    formTitle: 'Annual Indemnity Form',
    submittedAt: '2026-04-10T11:30:00',
    expiresAt: '2027-04-10',
    status: 'submitted',
    linkedBookingId: 'bk-002',
  },
];

export const getFormById = (id) => formDefinitions.find((f) => f.id === id) || null;
export const getSubmissionByForm = (userId, formId) =>
  userFormSubmissions.find((s) => s.userId === userId && s.formId === formId) || null;
export const isFormExpired = (submission) => {
  if (!submission?.expiresAt) return false;
  return new Date(submission.expiresAt) < new Date();
};
