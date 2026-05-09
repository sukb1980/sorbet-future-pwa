/* ============================================================
   Mock API / Integration Simulation Layer — Sorbet Future Fit
   Simulates: Zenoti, Payment Gateway, Voucher Service,
   Google Maps, Chatbot, BI Reporting, AI Vendor
   All functions return Promises with artificial delays.
   ============================================================ */

/** Simulated delay helper */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Random failure simulation (fail rate 0-1) */
const maybeFail = (failRate = 0.05) => {
  if (Math.random() < failRate) throw new Error('Simulated service unavailable');
};

/* ============================================================
   ZENOTI INTEGRATION SIMULATION
   ============================================================ */

/**
 * [Zenoti] Retrieve guest profile by loyaltyId
 */
export const zenotiGetGuestProfile = async (loyaltyId) => {
  await delay(800);
  maybeFail(0.03);
  return {
    source: 'Zenoti',
    loyaltyId,
    pointsBalance: 2480,
    tier: 'Silver',
    preferredStore: 'store-cpt-01',
    lastVisit: '2026-05-02',
  };
};

/**
 * [Zenoti] Retrieve booking availability
 */
export const zenotiGetAvailability = async (storeId, serviceId, date) => {
  await delay(1200);
  maybeFail(0.05);
  // Returns simulated availability from mock data
  return {
    source: 'Zenoti',
    storeId,
    serviceId,
    date,
    slots: [
      { time: '09:00', available: true },
      { time: '10:00', available: false },
      { time: '11:00', available: true },
      { time: '14:00', available: true },
      { time: '15:30', available: true },
      { time: '17:00', available: false },
    ],
  };
};

/**
 * [Zenoti] Push new booking
 */
export const zenotiCreateBooking = async (bookingPayload) => {
  await delay(1500);
  maybeFail(0.05);
  return {
    source: 'Zenoti',
    success: true,
    confirmationNumber: `SRB-${Date.now()}`,
    message: 'Booking created successfully in Zenoti.',
  };
};

/**
 * [Zenoti] Cancel booking
 */
export const zenotiCancelBooking = async (bookingId) => {
  await delay(1000);
  maybeFail(0.03);
  return { source: 'Zenoti', success: true, bookingId, message: 'Booking cancelled.' };
};

/**
 * [Zenoti] Push loyalty earnings
 */
export const zenotiEarnPoints = async (userId, serviceId, points) => {
  await delay(600);
  maybeFail(0.02);
  return { source: 'Zenoti', success: true, userId, points, message: `${points} points credited.` };
};

/**
 * [Zenoti] Push consultation form submission
 */
export const zenotiSubmitForm = async (formId, userId, answers) => {
  await delay(800);
  maybeFail(0.02);
  return { source: 'Zenoti', success: true, formId, userId, message: 'Form submitted to Zenoti.' };
};

/* ============================================================
   PAYMENT GATEWAY SIMULATION
   ============================================================ */

/**
 * [Payment] Authorize payment
 * @param {Object} payload - { amount, currency, method, cardLast4 }
 * Simulates: success (80%), pending (10%), decline (10%)
 */
export const paymentAuthorize = async (payload) => {
  await delay(2000);
  const rand = Math.random();
  if (rand < 0.80) {
    return {
      source: 'PaymentGateway',
      status: 'success',
      transactionId: `TXN-${Date.now()}`,
      amount: payload.amount,
      currency: payload.currency,
      message: 'Payment authorised successfully.',
    };
  } else if (rand < 0.90) {
    return {
      source: 'PaymentGateway',
      status: 'pending',
      transactionId: `TXN-${Date.now()}`,
      amount: payload.amount,
      message: 'Payment is pending bank confirmation. Please wait.',
    };
  } else {
    return {
      source: 'PaymentGateway',
      status: 'declined',
      transactionId: null,
      amount: payload.amount,
      message: 'Payment declined. Please check your card details or try another payment method.',
    };
  }
};

/**
 * [Payment] Process reversal/refund
 */
export const paymentRefund = async (transactionId, amount) => {
  await delay(1500);
  maybeFail(0.03);
  return {
    source: 'PaymentGateway',
    status: 'refunded',
    transactionId,
    refundId: `REF-${Date.now()}`,
    amount,
    message: 'Refund processed successfully.',
  };
};

/* ============================================================
   VOUCHER SERVICE SIMULATION
   ============================================================ */

/**
 * [Voucher] Generate voucher code and QR
 */
export const voucherGenerate = async (amount, currency, recipientName) => {
  await delay(1000);
  maybeFail(0.02);
  const code = `SRB-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
  return {
    source: 'VoucherService',
    code,
    qrData: code,
    amount,
    currency,
    recipientName,
    expiryDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    message: 'Gift card generated successfully.',
  };
};

/* ============================================================
   GOOGLE MAPS SIMULATION
   ============================================================ */

/**
 * [Maps] Get nearest store based on simulated device location
 */
export const mapsGetNearestStore = async () => {
  await delay(800);
  // Simulates Cape Town location
  return {
    source: 'GoogleMaps',
    userLat: -33.891,
    userLng: 18.507,
    nearestStoreId: 'store-cpt-01',
    nearestStoreName: 'Sorbet Canal Walk',
    distanceKm: 2.1,
    message: 'Location resolved. Nearest store identified.',
  };
};

/**
 * [Maps] Get directions to a store
 */
export const mapsGetDirections = async (storeId) => {
  await delay(600);
  return {
    source: 'GoogleMaps',
    storeId,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${storeId}`,
    message: 'Directions link generated.',
  };
};

/* ============================================================
   CHATBOT SERVICE SIMULATION
   ============================================================ */

/**
 * [Chatbot] Send message and receive response
 */
export const chatbotSendMessage = async (message) => {
  await delay(700 + Math.random() * 600);
  maybeFail(0.04);
  // Actual logic handled in chatbot.js getBotResponse — this wraps it in async
  return { source: 'ChatbotService', received: true };
};

/**
 * [Chatbot] Escalate to human therapist
 */
export const chatbotEscalate = async (userId) => {
  await delay(1200);
  return {
    source: 'ChatbotService',
    escalated: true,
    queuePosition: Math.floor(Math.random() * 3) + 1,
    estimatedWaitMin: Math.floor(Math.random() * 5) + 2,
    agentName: 'Sorbet Beauty Therapist',
    message: "You've been connected to a therapist. Please hold.",
  };
};

/* ============================================================
   BI REPORTING SIMULATION
   ============================================================ */

/**
 * [BI] Push event data (booking created, purchase made, etc.)
 */
export const biPushEvent = async (eventType, payload) => {
  await delay(200);
  // Silent fail — non-blocking
  return { source: 'BIEngine', eventType, pushed: true };
};

/* ============================================================
   AI VENDOR SIMULATION
   ============================================================ */

/**
 * [AI] Submit image for analysis
 * Simulates processing delay + returns mock analysis
 */
export const aiSubmitImage = async (analysisType) => {
  await delay(2500 + Math.random() * 1500);
  maybeFail(0.08); // 8% chance of AI vendor timeout
  return {
    source: 'AIVendor',
    analysisType,
    processed: true,
    message: 'Analysis complete.',
  };
};

/**
 * [AI] Retrieve analysis results (called after aiSubmitImage)
 */
export const aiGetResults = async (analysisType) => {
  await delay(1000);
  return {
    source: 'AIVendor',
    analysisType,
    resultsReady: true,
    message: 'Results ready.',
  };
};

/* ============================================================
   INVENTORY SIMULATION
   ============================================================ */

/**
 * [Inventory] Get stock level for product at store
 */
export const inventoryGetStock = async (productId, storeId) => {
  await delay(500);
  return {
    source: 'InventoryService',
    productId,
    storeId,
    quantity: Math.floor(Math.random() * 20),
    lastUpdated: new Date().toISOString(),
  };
};

/* ============================================================
   OTP SIMULATION
   ============================================================ */

/**
 * Simulate sending OTP via SMS/email
 */
export const otpSend = async (contact, method = 'sms') => {
  await delay(1000);
  return {
    source: 'OTPService',
    sent: true,
    method,
    maskedContact: method === 'sms' ? contact.replace(/.(?=.{4})/g, '*') : contact.replace(/(.{2})(.*)(@.*)/, '$1****$3'),
    message: `OTP sent via ${method}.`,
    // In demo mode, the mock OTP is always 123456
    mockOtp: '123456',
  };
};

/**
 * Simulate verifying OTP
 */
export const otpVerify = async (otp) => {
  await delay(800);
  // Accept '123456' as the valid demo OTP
  const isValid = otp === '123456';
  return {
    source: 'OTPService',
    valid: isValid,
    message: isValid ? 'OTP verified successfully.' : 'Invalid OTP. Please try again.',
  };
};

/* ============================================================
   FORM SUBMISSION SIMULATION
   ============================================================ */

/**
 * [Forms] Submit consultation or indemnity form
 */
export const formSubmit = async (formId, answers) => {
  await delay(900);
  maybeFail(0.02);
  return {
    source: 'FormService',
    formId,
    submitted: true,
    submittedAt: new Date().toISOString(),
    message: 'Form submitted successfully.',
  };
};
