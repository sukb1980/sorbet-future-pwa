/* TopNav — Desktop/Mobile Top Navigation Bar
   Sorbet Future Fit */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBell, FiShoppingBag, FiUser, FiGlobe } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import { Badge } from '../ui/Primitives';
import { getUnreadCount } from '../../data/notifications';
import { supportedLocales, supportedCurrencies } from '../../data/i18n';

export default function TopNav() {
  const { currentUser, isGuest, language, setLanguage, currency, setCurrency } = useAppContext();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const unread = getUnreadCount();

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 'var(--top-nav-height)',
      background: 'rgba(250, 248, 245, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
      zIndex: 'var(--z-nav)',
      display: 'flex', alignItems: 'center',
      padding: '0 var(--space-lg)',
      gap: 'var(--space-md)',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-rose-gold), var(--color-blush-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>S</div>
        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Sorbet Future</span>
      </Link>

      {/* Desktop Nav Links */}
      <nav style={{ display: 'flex', gap: 'var(--space-md)', marginLeft: 'var(--space-lg)', flex: 1 }} className="desktop-nav">
        {[
          { label: 'Home', to: '/' },
          { label: 'Book', to: '/booking/services' },
          { label: 'Shop', to: '/products' },
          { label: 'Stores', to: '/stores' },
          { label: 'Loyalty', to: '/loyalty' },
          { label: 'Promotions', to: '/promotions' },
        ].map((link) => (
          <Link key={link.to} to={link.to} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', padding: '4px 8px', borderRadius: 'var(--radius-xs)', transition: 'var(--transition-fast)' }}
            onMouseEnter={(e) => { e.target.style.color = 'var(--color-accent)'; e.target.style.background = 'var(--color-rose-gold-light)'; }}
            onMouseLeave={(e) => { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'transparent'; }}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginLeft: 'auto' }}>
        {/* Language / Currency */}
        <select value={language} onChange={(e) => setLanguage(e.target.value)}
          style={{ background: 'transparent', border: 'none', fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}>
          {supportedLocales.map((l) => <option key={l.code} value={l.code}>{l.flag} {l.code.toUpperCase()}</option>)}
        </select>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}
          style={{ background: 'transparent', border: 'none', fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}>
          {supportedCurrencies.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
        </select>

        {/* Notifications */}
        <button onClick={() => navigate('/notifications')} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-cream-deep)', border: '1px solid var(--color-border)', cursor: 'pointer' }} aria-label="Notifications">
          <FiBell size={18} color="var(--text-secondary)" />
          {unread > 0 && <span style={{ position: 'absolute', top: '4px', right: '4px' }}><Badge style={{ minWidth: '16px', height: '16px', fontSize: '0.625rem' }}>{unread > 9 ? '9+' : unread}</Badge></span>}
        </button>

        {/* Cart */}
        <button onClick={() => navigate('/cart')} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-cream-deep)', border: '1px solid var(--color-border)', cursor: 'pointer' }} aria-label="Cart">
          <FiShoppingBag size={18} color="var(--text-secondary)" />
          {itemCount > 0 && <span style={{ position: 'absolute', top: '4px', right: '4px' }}><Badge style={{ minWidth: '16px', height: '16px', fontSize: '0.625rem' }}>{itemCount}</Badge></span>}
        </button>

        {/* Profile */}
        <button onClick={() => navigate(currentUser || isGuest ? '/profile' : '/auth/sign-in')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'var(--color-accent)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-family)' }}>
          <FiUser size={15} />
          <span className="desktop-only">{currentUser ? currentUser.firstName : isGuest ? 'Guest' : 'Sign In'}</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
