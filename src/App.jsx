import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { MainLayout } from './layouts/MainLayout';
// Lazy load pages for PWA performance (or just normal imports for prototype)
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Stores from './pages/Stores';
import Booking from './pages/Booking';
import Retail from './pages/Retail';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Loyalty from './pages/Loyalty';
import Notifications from './pages/Notifications';
import SkinAnalysis from './pages/SkinAnalysis';
import Admin from './pages/Admin';

function App() {
  const { currentUser, isGuest } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={(!currentUser && !isGuest) ? <Navigate to="/auth" replace /> : <MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stores" element={<Stores />} />
          <Route path="book" element={<Booking />} />
          <Route path="retail" element={<Retail />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="loyalty" element={<Loyalty />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="analysis-portal" element={<SkinAnalysis />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
