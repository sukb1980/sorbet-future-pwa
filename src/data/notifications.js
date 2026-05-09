/* ============================================================
   Mock Notifications Data — Sorbet Future Fit
   All notification types: bookings, loyalty, promotions, orders, reminders
   ============================================================ */

export const notifications = [
  {
    id: 'n1',
    type: 'booking',
    icon: '📅',
    title: 'Booking Confirmed',
    body: 'Your Gel Polish — Hands appointment is confirmed for tomorrow at 09:30 with Mia B. at Sorbet Canal Walk.',
    read: false,
    date: '2026-05-08T09:15:00',
    actionLabel: 'View Booking',
    actionRoute: '/bookings/bk-001',
  },
  {
    id: 'n2',
    type: 'loyalty',
    icon: '⭐',
    title: 'You Earned Points',
    body: 'You earned 150 points after your Hydra Glow Facial. Your balance is now 2,480 points.',
    read: true,
    date: '2026-05-06T18:10:00',
    actionLabel: 'View Loyalty',
    actionRoute: '/loyalty',
  },
  {
    id: 'n3',
    type: 'promotion',
    icon: '🎉',
    title: 'Seasonal Colours Now Live',
    body: "Discover this season's nail colour collection — fresh Autumn tones are in.",
    read: false,
    date: '2026-05-05T12:00:00',
    actionLabel: 'Shop Now',
    actionRoute: '/products',
  },
  {
    id: 'n4',
    type: 'reminder',
    icon: '⏰',
    title: '24-Hour Reminder',
    body: "Reminder: Your Gel Polish — Hands appointment is tomorrow at 09:30. Need to reschedule?",
    read: false,
    date: '2026-05-07T09:30:00',
    actionLabel: 'Reschedule',
    actionRoute: '/bookings/bk-001',
  },
  {
    id: 'n5',
    type: 'loyalty',
    icon: '🏆',
    title: 'You\'re Close to Gold!',
    body: 'You need only 520 more points to reach Gold tier and unlock exclusive benefits.',
    read: false,
    date: '2026-05-04T14:00:00',
    actionLabel: 'Upgrade Now',
    actionRoute: '/loyalty',
  },
  {
    id: 'n6',
    type: 'order',
    icon: '📦',
    title: 'Order Confirmed',
    body: 'Your order #ORD-2026-0041 (Hydra Renewal Serum) is confirmed and ready for collection at Sorbet Canal Walk.',
    read: true,
    date: '2026-05-03T11:30:00',
    actionLabel: 'View Order',
    actionRoute: '/profile',
  },
  {
    id: 'n7',
    type: 'reminder',
    icon: '💅',
    title: 'Time for Your Next Gel Nails',
    body: "It's been 3 weeks since your last Gel Polish service. Ready to book your next appointment?",
    read: true,
    date: '2026-04-30T10:00:00',
    actionLabel: 'Book Now',
    actionRoute: '/booking/services',
  },
  {
    id: 'n8',
    type: 'promotion',
    icon: '🎂',
    title: 'Birthday Reward Ready',
    body: 'Your 50% birthday reward is active for September! Book any service and apply your reward at checkout.',
    read: false,
    date: '2026-04-28T08:00:00',
    actionLabel: 'Book Now',
    actionRoute: '/booking/services',
  },
  {
    id: 'n9',
    type: 'loyalty',
    icon: '⏳',
    title: 'Points Expiring Soon',
    body: '350 of your loyalty points will expire on 15 June 2026. Use them before they disappear!',
    read: true,
    date: '2026-04-25T16:00:00',
    actionLabel: 'Redeem',
    actionRoute: '/loyalty',
  },
  {
    id: 'n10',
    type: 'promotion',
    icon: '✨',
    title: 'New: Golden Glow Body Oil',
    body: 'Our new Golden Glow Body Oil with subtle shimmer is now in stock. Try it today!',
    read: false,
    date: '2026-04-22T09:00:00',
    actionLabel: 'Shop Now',
    actionRoute: '/products/prd-body-oil',
  },
  {
    id: 'n11',
    type: 'booking',
    icon: '🔔',
    title: 'Waitlist Slot Available',
    body: 'A slot has opened for your waitlisted Hydra Glow Facial with Lerato M. on 10 May at 11:00. Claim it now!',
    read: false,
    date: '2026-05-08T07:45:00',
    actionLabel: 'Claim Slot',
    actionRoute: '/booking/confirm',
  },
  {
    id: 'n12',
    type: 'order',
    icon: '🎁',
    title: 'Gift Card Delivered',
    body: 'Your R500 gift card for Nomsa D. has been sent successfully via email.',
    read: true,
    date: '2026-04-20T15:30:00',
    actionLabel: 'View Gift Card',
    actionRoute: '/vouchers',
  },
];

export const notificationTypes = ['all', 'bookings', 'loyalty', 'promotions', 'orders', 'reminders'];

export const getUnreadCount = () => notifications.filter((n) => !n.read).length;

export const getNotificationsByType = (type) => {
  if (type === 'all') return notifications;
  const map = { bookings: 'booking', loyalty: 'loyalty', promotions: 'promotion', orders: 'order', reminders: 'reminder' };
  return notifications.filter((n) => n.type === map[type]);
};
