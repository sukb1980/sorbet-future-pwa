import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiCalendar, FiShoppingBag, FiGift } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';
import './Navigation.css';

export default function BottomNav() {
  const { t } = useAppContext();

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <FiHome size={24} />
        <span>{t('home')}</span>
      </NavLink>
      <NavLink to="/book" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <FiCalendar size={24} />
        <span>Book</span>
      </NavLink>
      <NavLink to="/retail" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <FiShoppingBag size={24} />
        <span>Shop</span>
      </NavLink>
      <NavLink to="/loyalty" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
        <FiGift size={24} />
        <span>{t('loyalty')}</span>
      </NavLink>
    </nav>
  );
}
