/* ============================================================
   Mock Vouchers / Gift Cards Data — Sorbet Future Fit
   ============================================================ */

export const voucherAmounts = [
  { id: 'v250', value: 250, label: 'R250' },
  { id: 'v500', value: 500, label: 'R500' },
  { id: 'v750', value: 750, label: 'R750' },
  { id: 'v1000', value: 1000, label: 'R1000' },
  { id: 'v1500', value: 1500, label: 'R1500' },
  { id: 'v2000', value: 2000, label: 'R2000' },
  { id: 'custom', value: null, label: 'Custom Amount' },
];

export const voucherConfig = {
  minCustomAmount: 100,
  maxCustomAmount: 5000,
  expiryYears: 3,
  terms: [
    'Gift cards are valid for 3 years from date of purchase.',
    'Can be used for services, retail products, and add-ons.',
    'Cannot be exchanged for cash.',
    'Redeemable at all participating Sorbet Future stores.',
    'If the total purchase exceeds the gift card value, the balance must be paid separately.',
    'Lost or stolen gift cards cannot be replaced.',
  ],
};

export const deliveryMethods = [
  { id: 'email', label: 'Email', icon: '📧', description: 'Delivered instantly to recipient\'s email' },
  { id: 'sms', label: 'SMS', icon: '📱', description: 'Sent via SMS to recipient\'s mobile number' },
  { id: 'in-app', label: 'In App', icon: '📲', description: 'Delivered in-app if recipient is a registered user' },
];

export const myVouchers = [
  {
    id: 'gc-001',
    code: 'SRB-2026-XKTP-9820',
    qrData: 'SRB-2026-XKTP-9820',
    type: 'received',
    value: 500,
    currency: 'ZAR',
    balance: 500,
    from: 'Nomsa D.',
    message: 'Happy birthday! Enjoy a beautiful treatment. 🌸',
    expiryDate: '2029-04-15',
    status: 'active',
    deliveredVia: 'email',
  },
  {
    id: 'gc-002',
    code: 'SRB-2025-LFMQ-4411',
    qrData: 'SRB-2025-LFMQ-4411',
    type: 'sent',
    value: 750,
    currency: 'ZAR',
    balance: 0,
    recipient: 'Thandi K.',
    recipientEmail: 'thandi@example.com',
    message: 'Treat yourself!',
    expiryDate: '2028-11-20',
    status: 'redeemed',
    deliveredVia: 'email',
  },
];
