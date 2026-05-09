/* ============================================================
   Mock Admin / BI Data — Sorbet Future Fit
   KPI metrics, chart series, reporting data
   ============================================================ */

export const adminMetrics = {
  bookingsToday: 124,
  revenueToday: 58290,
  productsSoldToday: 213,
  vouchersSoldToday: 32,
  loyaltySignupsThisMonth: 842,
  aiAnalysesThisMonth: 415,
  aiConversionRate: 0.68,
  chatbotEscalationRate: 0.18,
  avgBookingValue: 780,
  customerSatisfaction: 4.7,
  repeatBookingRate: 0.63,
  clickAndCollectOrders: 44,
  kpis: [
    { id: 'revenue', label: 'Revenue (MTD)', value: 'R585K', change: '+27%', trend: 'up', sparkline: [380, 395, 410, 452, 440, 478, 520, 395, 420, 445, 460, 585] },
    { id: 'bookings', label: 'Bookings (MTD)', value: '1,580', change: '+31%', trend: 'up', sparkline: [1020, 1060, 1100, 1230, 1190, 1280, 1410, 1060, 1140, 1200, 1240, 1580] },
    { id: 'aov', label: 'Avg. Order Value', value: 'R780', change: '+4%', trend: 'up', sparkline: [720, 730, 745, 760, 755, 770, 785, 740, 755, 768, 772, 780] },
    { id: 'loyalty', label: 'New Members', value: '842', change: '+12%', trend: 'up', sparkline: [650, 680, 700, 760, 740, 790, 820, 700, 740, 780, 810, 842] },
    { id: 'nps', label: 'NPS Score', value: '74', change: '-2pts', trend: 'down', sparkline: [72, 75, 76, 74, 78, 76, 77, 75, 76, 75, 76, 74] },
    { id: 'conversion', label: 'AI Conversion', value: '68%', change: '+3%', trend: 'up', sparkline: [55, 58, 60, 63, 61, 65, 67, 62, 64, 66, 67, 68] },
  ],
};


export const bookingByCategory = [
  { name: 'Hair', value: 35, color: '#C8907A' },
  { name: 'Skin', value: 42, color: '#E8C4B8' },
  { name: 'Nails', value: 23, color: '#B57B67' },
];

export const revenueByRegion = [
  { region: 'South Africa', value: 420000, color: '#C8907A' },
  { region: 'Botswana', value: 55000, color: '#D4A896' },
  { region: 'Mauritius', value: 110000, color: '#B57B67' },
];

export const loyaltyTierDistribution = [
  { name: 'Bronze', value: 58, color: '#CD7F32' },
  { name: 'Silver', value: 31, color: '#9E9E9E' },
  { name: 'Gold', value: 11, color: '#B8860B' },
];

export const bookingsByStore = [
  { store: 'Canal Walk', bookings: 312 },
  { store: 'V&A Waterfront', bookings: 287 },
  { store: 'Sandton City', bookings: 241 },
  { store: 'Gateway', bookings: 143 },
  { store: 'Gaborone', bookings: 87 },
  { store: 'Grand Baie', bookings: 156 },
  { store: 'Port Louis', bookings: 92 },
];

export const topProducts = [
  { name: 'Invisible SPF 50+', sold: 412, revenue: 115360 },
  { name: 'Nourish Cuticle Oil', sold: 388, revenue: 46560 },
  { name: 'Silk Smooth Hair Serum', sold: 276, revenue: 67620 },
  { name: 'Hydra Renewal Serum', sold: 241, revenue: 101220 },
  { name: 'Vitamin C Serum', sold: 198, revenue: 110880 },
];

export const revenueOverTime = [
  { month: 'Jun 25', revenue: 380000, bookings: 1020, products: 4100 },
  { month: 'Jul 25', revenue: 395000, bookings: 1060, products: 4280 },
  { month: 'Aug 25', revenue: 410000, bookings: 1100, products: 4450 },
  { month: 'Sep 25', revenue: 452000, bookings: 1230, products: 4800 },
  { month: 'Oct 25', revenue: 440000, bookings: 1190, products: 4700 },
  { month: 'Nov 25', revenue: 478000, bookings: 1280, products: 5100 },
  { month: 'Dec 25', revenue: 520000, bookings: 1410, products: 5600 },
  { month: 'Jan 26', revenue: 395000, bookings: 1060, products: 4300 },
  { month: 'Feb 26', revenue: 420000, bookings: 1140, products: 4550 },
  { month: 'Mar 26', revenue: 445000, bookings: 1200, products: 4750 },
  { month: 'Apr 26', revenue: 460000, bookings: 1240, products: 4900 },
  { month: 'May 26', revenue: 585000, bookings: 1580, products: 6200 },
];

export const notificationEngagement = [
  { type: 'Booking Reminder', sent: 4200, opened: 3150, ctr: 0.75 },
  { type: 'Loyalty Update', sent: 3800, opened: 2660, ctr: 0.70 },
  { type: 'Promotion', sent: 6200, opened: 2790, ctr: 0.45 },
  { type: 'Post-Service', sent: 2100, opened: 1680, ctr: 0.80 },
  { type: 'Cycle Reminder', sent: 3400, opened: 2380, ctr: 0.70 },
];

export const chatbotStats = [
  { month: 'Feb 26', sessions: 1840, resolved: 1490, escalated: 350 },
  { month: 'Mar 26', sessions: 2010, resolved: 1680, escalated: 330 },
  { month: 'Apr 26', sessions: 2200, resolved: 1804, escalated: 396 },
  { month: 'May 26', sessions: 2450, resolved: 2009, escalated: 441 },
];

export const aiConversionStats = [
  { month: 'Feb 26', analyses: 280, toBooking: 168, toCart: 112 },
  { month: 'Mar 26', analyses: 320, toBooking: 208, toCart: 128 },
  { month: 'Apr 26', analyses: 380, toBooking: 250, toCart: 152 },
  { month: 'May 26', analyses: 415, toBooking: 282, toCart: 166 },
];

export const activePromotions = [
  { id: 'promo1', title: 'Birthday Beauty Month', status: 'Active', redemptions: 312, revenue: 0 },
  { id: 'promo2', title: 'Autumn Glow Bundle', status: 'Active', redemptions: 87, revenue: 74310 },
  { id: 'promo4', title: 'Gel Nails + Feet Combo', status: 'Active', redemptions: 144, revenue: 57600 },
  { id: 'promo5', title: 'Silver Upgrade Boost', status: 'Active', redemptions: 58, revenue: 0 },
  { id: 'promo6', title: 'New: Golden Glow Body Oil', status: 'Active', redemptions: 103, revenue: 32960 },
  { id: 'promo7', title: 'Autumn Hair Edit', status: 'Active', redemptions: 29, revenue: 40600 },
];

export const countries = ['All', 'South Africa', 'Botswana', 'Mauritius'];
export const storeOptions = ['All Stores', 'Canal Walk', 'V&A Waterfront', 'Sandton City', 'Gateway', 'Gaborone CBD', 'Grand Baie', 'Port Louis'];
export const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last 12 months', 'Last 36 months'];
export const categoryOptions = ['All Categories', 'Hair', 'Skin', 'Nails', 'Brows & Lashes', 'Body'];
export const adminRoles = ['Admin', 'Marketing', 'Store Manager'];

/** Composite charts object for Admin dashboard */
export const adminCharts = {
  monthlyRevenue: revenueOverTime.map((m) => ({ month: m.month, revenue: m.revenue })),
  weeklyBookings: [
    { week: 'W1', bookings: 360 },
    { week: 'W2', bookings: 395 },
    { week: 'W3', bookings: 410 },
    { week: 'W4', bookings: 415 },
  ],
  serviceMix: [
    { category: 'Skin', bookings: 642, percentage: 42 },
    { category: 'Hair', bookings: 535, percentage: 35 },
    { category: 'Nails', bookings: 352, percentage: 23 },
  ],
};

/** Store leaderboard for Admin dashboard */
export const adminStoreLeaderboard = [
  { storeId: 'store-mru-01', name: 'Sorbet Grand Baie', city: 'Grand Baie', revenue: 210000, bookings: 680, nps: 81 },
  { storeId: 'store-cpt-02', name: 'Sorbet V&A Waterfront', city: 'Cape Town', revenue: 195000, bookings: 612, nps: 79 },
  { storeId: 'store-cpt-01', name: 'Sorbet Canal Walk', city: 'Cape Town', revenue: 180000, bookings: 573, nps: 77 },
  { storeId: 'store-jnb-01', name: 'Sorbet Sandton City', city: 'Johannesburg', revenue: 165000, bookings: 524, nps: 74 },
  { storeId: 'store-gab-01', name: 'Sorbet Gaborone CBD', city: 'Gaborone', revenue: 88000, bookings: 278, nps: 72 },
  { storeId: 'store-dbn-01', name: 'Sorbet Gateway', city: 'Durban', revenue: 72000, bookings: 228, nps: 70 },
  { storeId: 'store-mru-02', name: 'Sorbet Port Louis', city: 'Port Louis', revenue: 68000, bookings: 215, nps: 69 },
  { storeId: 'store-fra-01', name: 'Sorbet Francistown', city: 'Francistown', revenue: 41000, bookings: 129, nps: 67 },
];
