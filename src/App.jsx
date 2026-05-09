/* App.jsx — Full routing, onboarding, and PWA shell
   Sorbet Future Fit */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { MainLayout } from './layouts/MainLayout';
import {
  SplashScreen,
  POPIAPermissionPrompt,
  NotificationPermissionPrompt,
  LocationPermissionPrompt,
} from './components/onboarding/OnboardingScreens';

/* ---- Page Imports ---- */
import Home from './pages/Home';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import OtpVerify from './pages/auth/OtpVerify';
import Stores from './pages/Stores';
import StoreDetail from './pages/StoreDetail';
import BookingServices from './pages/booking/BookingServices';
import BookingCalendar from './pages/booking/BookingCalendar';
import BookingGroup from './pages/booking/BookingGroup';
import BookingConfirm from './pages/booking/BookingConfirm';
import BookingHistory from './pages/BookingHistory';
import Retail from './pages/Retail';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Loyalty from './pages/Loyalty';
import Vouchers from './pages/Vouchers';
import Promotions from './pages/Promotions';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';
import SkinAnalysis from './pages/SkinAnalysis';
import AnalysisResults from './pages/AnalysisResults';
import Forms from './pages/Forms';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AdminReports from './pages/admin/AdminReports';
import AdminPromotions from './pages/admin/AdminPromotions';
import AdminBranding from './pages/admin/AdminBranding';
import Offline from './pages/Offline';

/* ---- Loading Fallback ---- */
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
    <div className="spinner spinner-lg" />
  </div>
);

/* ---- Protected Route (requires login or guest) ---- */
const AuthRequired = ({ element, allowGuest = true }) => {
  const { currentUser, isGuest } = useAppContext();
  if (!currentUser && !isGuest) return <Navigate to="/auth/sign-in" replace />;
  return element;
};

/* ---- Auth Guard (redirect if already logged in) ---- */
const GuestOnly = ({ element }) => {
  const { currentUser } = useAppContext();
  if (currentUser) return <Navigate to="/" replace />;
  return element;
};

/* ---- Onboarding Guard ---- */
function OnboardingGate({ children }) {
  const { onboardingStep, grantPopia, denyPopia, grantNotifications, denyNotifications, grantLocation, denyLocation } = useAppContext();

  if (onboardingStep === 'splash') return <SplashScreen onComplete={() => {}} />;
  // Note: onboardingStep transitions are handled inside context via actions
  if (onboardingStep === 'popia') return (
    <POPIAPermissionPrompt onAllow={grantPopia} onDeny={denyPopia} />
  );
  if (onboardingStep === 'notifications') return (
    <NotificationPermissionPrompt onAllow={grantNotifications} onDeny={denyNotifications} />
  );
  if (onboardingStep === 'location') return (
    <LocationPermissionPrompt onAllow={grantLocation} onDeny={denyLocation} />
  );

  return children;
}

/* ---- Splash auto-advance ---- */
function SplashBridge() {
  const { onboardingStep, setOnboardingStep } = useAppContext();
  React.useEffect(() => {
    if (onboardingStep === 'splash') {
      const t = setTimeout(() => setOnboardingStep('popia'), 2200);
      return () => clearTimeout(t);
    }
  }, [onboardingStep, setOnboardingStep]);
  return null;
}

/* ---- App Inner (needs context) ---- */
function AppInner() {
  const { onboardingStep } = useAppContext();

  if (onboardingStep !== 'done' && onboardingStep !== 'auth') {
    return (
      <>
        <SplashBridge />
        <OnboardingGate>null</OnboardingGate>
      </>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/sign-in" element={<GuestOnly element={<SignIn />} />} />
        <Route path="/auth/sign-up" element={<GuestOnly element={<SignUp />} />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/otp-verify" element={<OtpVerify />} />
        <Route path="/auth" element={<Navigate to="/auth/sign-in" replace />} />

        {/* Admin Routes (no main layout) */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/promotions" element={<AdminPromotions />} />
        <Route path="/admin/branding" element={<AdminBranding />} />

        {/* Offline */}
        <Route path="/offline" element={<Offline />} />

        {/* Main App Routes */}
        <Route path="/" element={<AuthRequired element={<MainLayout />} />}>
          <Route index element={<Home />} />
          <Route path="stores" element={<Stores />} />
          <Route path="store/:id" element={<StoreDetail />} />
          <Route path="booking/services" element={<BookingServices />} />
          <Route path="booking/service/:id" element={<BookingServices />} />
          <Route path="booking/calendar" element={<BookingCalendar />} />
          <Route path="booking/group" element={<BookingGroup />} />
          <Route path="booking/confirm" element={<BookingConfirm />} />
          <Route path="bookings" element={<BookingHistory />} />
          <Route path="bookings/:id" element={<BookingHistory />} />
          <Route path="rebook" element={<BookingHistory />} />
          <Route path="products" element={<Retail />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="loyalty" element={<Loyalty />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="gift-card/:id" element={<Vouchers />} />
          <Route path="promotions" element={<Promotions />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="chat" element={<Chat />} />
          <Route path="analysis" element={<SkinAnalysis />} />
          <Route path="analysis/results" element={<AnalysisResults />} />
          <Route path="forms" element={<Forms />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/preferences" element={<Profile />} />
          <Route path="profile/clubcard" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AppProvider>
      <CartProvider>
        <Router>
          <AppInner />
        </Router>
      </CartProvider>
    </AppProvider>
  );
}

export default App;
