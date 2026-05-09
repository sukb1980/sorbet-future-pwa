/* BottomNav — Mobile Bottom Tab Navigation
   Sorbet Future Fit */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiCalendar, FiShoppingBag, FiAward, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { Badge } from '../ui/Primitives';

const tabs = [
  { label: 'Home', to: '/', icon: FiHome, exact: true },
  { label: 'Book', to: '/booking/services', icon: FiCalendar },
  { label: 'Shop', to: '/products', icon: FiShoppingBag, showCartBadge: true },
  { label: 'Loyalty', to: '/loyalty', icon: FiAward },
  { label: 'Profile', to: '/profile', icon: FiUser },
];

export default function BottomNav() {
  const { itemCount } = useCart();

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 'var(--bottom-nav-height)',
      background: 'rgba(250, 248, 245, 0.95)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--color-border)',
      display: 'flex', alignItems: 'stretch',
      zIndex: 'var(--z-nav)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const showBadge = tab.showCartBadge && itemCount > 0;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.exact}
            style={({ isActive }) => ({
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              textDecoration: 'none',
              color: isActive ? 'var(--color-accent)' : 'var(--text-muted)',
              fontSize: '0.6875rem',
              fontWeight: isActive ? 600 : 400,
              position: 'relative',
              transition: 'var(--transition-fast)',
              paddingTop: '4px',
            })}
          >
            {({ isActive }) => (
              <>
                <div style={{ position: 'relative' }}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                  {showBadge && (
                    <span style={{ position: 'absolute', top: '-6px', right: '-8px' }}>
                      <Badge style={{ minWidth: '16px', height: '16px', fontSize: '0.625rem' }}>
                        {itemCount > 9 ? '9+' : itemCount}
                      </Badge>
                    </span>
                  )}
                </div>
                <span>{tab.label}</span>
                {isActive && <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '20px', height: '3px', background: 'var(--color-accent)', borderRadius: 'var(--radius-full) var(--radius-full) 0 0' }} />}
              </>
            )}
          </NavLink>
        );
      })}

      <style>{`
        @media (min-width: 768px) {
          nav[data-bottom-nav] { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
