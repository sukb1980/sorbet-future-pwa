/* ============================================================
   Mock Chatbot Data — Sorbet Future Fit
   FAQ rules, suggestive chips, escalation state
   ============================================================ */

export const chatbotFaq = [
  { id: 'faq-book-1', category: 'booking', question: 'How do I reschedule my appointment?', answer: 'Open the Bookings tab, select your appointment, and tap **Reschedule**. You can change the date, time, or citizen up to 4 hours before your appointment.' },
  { id: 'faq-book-2', category: 'booking', question: 'Can I cancel my booking?', answer: 'Yes! Go to Bookings, select the booking, and tap **Cancel**. Please note our 24-hour cancellation policy — late cancellations may incur a fee.' },
  { id: 'faq-book-3', category: 'booking', question: 'How do I book for a group?', answer: 'On the booking screen, select **Group Booking**, then add each member\'s name and their chosen service. The main guest handles payment and consultation.' },
  { id: 'faq-book-4', category: 'booking', question: 'What is the waitlist?', answer: 'When preferred slots are full, you can join the waitlist. We\'ll notify you instantly if a slot opens up, and you\'ll have 30 minutes to confirm.' },
  { id: 'faq-loyalty-1', category: 'loyalty', question: 'How do I earn loyalty points?', answer: 'Earn points on every service and retail purchase. Bronze earns 1pt/R10, Silver 1.5pt/R10, and Gold earns 2pt/R10.' },
  { id: 'faq-loyalty-2', category: 'loyalty', question: 'How do I redeem loyalty points?', answer: 'At checkout, toggle **Redeem Points** and enter how many points you\'d like to apply. 100 points = R10 discount.' },
  { id: 'faq-loyalty-3', category: 'loyalty', question: 'When do my points expire?', answer: 'Points are valid for 12 months from the date they are earned. We\'ll remind you 60 days before expiry.' },
  { id: 'faq-loyalty-4', category: 'loyalty', question: 'What are the tier benefits?', answer: 'Bronze gets base rewards. Silver unlocks priority booking and exclusive offers. Gold gets first-access booking, birthday 50% off, and dedicated concierge.' },
  { id: 'faq-gift-1', category: 'gift-cards', question: 'How do I buy a gift card?', answer: 'Go to **Vouchers & Gift Cards**, choose a value, add the recipient\'s details, and select email, SMS, or in-app delivery.' },
  { id: 'faq-gift-2', category: 'gift-cards', question: 'When does a gift card expire?', answer: 'Gift cards are valid for 3 years from the date of purchase. The expiry date is always shown on the card.' },
  { id: 'faq-gift-3', category: 'gift-cards', question: 'Can I use a gift card for any service?', answer: 'Yes, gift cards can be used for any service, retail product, or add-on at any Sorbet Future store.' },
  { id: 'faq-store-1', category: 'store-info', question: 'How do I find my nearest store?', answer: 'On the **Stores** tab, allow location access and we\'ll automatically highlight your nearest store. You can also search by city or region.' },
  { id: 'faq-store-2', category: 'store-info', question: 'What is Click & Collect?', answer: 'Click & Collect lets you buy products online and pick them up at your preferred store — usually ready within 2 hours of ordering.' },
  { id: 'faq-skin-1', category: 'skin-advice', question: 'What is the AI skin analysis?', answer: 'Our AI Skin Analysis uses your camera to assess skin concerns like dehydration, uneven tone, and more. It then recommends tailored services and products. Results are for guidance only — not a medical diagnosis.' },
  { id: 'faq-skin-2', category: 'skin-advice', question: 'Is my image stored?', answer: 'By default, we do not store your analysis image. You can opt-in to save your history in your profile settings for tracking progress over time.' },
  { id: 'faq-product-1', category: 'product-advice', question: 'Which serum is right for dry skin?', answer: 'We recommend our **Hydra Renewal Serum** — it\'s packed with hyaluronic acid and ceramides to deeply plump and restore moisture. Pair it with the Rose Petal Hydration Mist for extra hydration.' },
  { id: 'faq-product-2', category: 'product-advice', question: 'Do you have SPF products?', answer: 'Yes! Our **Invisible Sunscreen SPF 50+** is a bestseller — it\'s lightweight, leaves no white cast, and works under makeup. Highly recommended after any chemical peel or brightening treatment.' },
];

export const suggestiveChips = [
  { label: 'Booking help', icon: '📅', category: 'booking' },
  { label: 'Loyalty help', icon: '⭐', category: 'loyalty' },
  { label: 'Gift cards', icon: '🎁', category: 'gift-cards' },
  { label: 'Store info', icon: '📍', category: 'store-info' },
  { label: 'Skin advice', icon: '✨', category: 'skin-advice' },
  { label: 'Product advice', icon: '🧴', category: 'product-advice' },
  { label: 'Chat with therapist', icon: '💬', category: 'escalate' },
];

export const botGreeting = "Hi there! 👋 I'm Sage, your Sorbet beauty assistant. How can I help you today?";

export const escalationMessage = "I'm connecting you with one of our Sorbet beauty therapists. Please hold — typical wait time is 2–5 minutes. ✨";

export const fallbackMessage = "I'm not sure about that one, but I'd love to connect you with a therapist who can help! Shall I escalate this chat?";

export const chatDisclaimer = "Sage provides general beauty guidance only. For medical or clinical concerns, please consult a qualified professional.";

export const getBotResponse = (message) => {
  const lower = message.toLowerCase();
  for (const faq of chatbotFaq) {
    const keywords = faq.question.toLowerCase().split(' ');
    const matchCount = keywords.filter((w) => lower.includes(w) && w.length > 3).length;
    if (matchCount >= 2) return faq.answer;
  }
  if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) {
    return chatbotFaq.find((f) => f.id === 'faq-book-1')?.answer || fallbackMessage;
  }
  if (lower.includes('point') || lower.includes('loyalty') || lower.includes('redeem')) {
    return chatbotFaq.find((f) => f.id === 'faq-loyalty-2')?.answer || fallbackMessage;
  }
  if (lower.includes('gift') || lower.includes('voucher')) {
    return chatbotFaq.find((f) => f.id === 'faq-gift-1')?.answer || fallbackMessage;
  }
  if (lower.includes('store') || lower.includes('location') || lower.includes('nearest')) {
    return chatbotFaq.find((f) => f.id === 'faq-store-1')?.answer || fallbackMessage;
  }
  if (lower.includes('skin') || lower.includes('serum') || lower.includes('dry')) {
    return chatbotFaq.find((f) => f.id === 'faq-product-1')?.answer || fallbackMessage;
  }
  return fallbackMessage;
};
