import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAppContext } from '../../context/AppContext';
import { FiShoppingBag, FiBell, FiUser } from 'react-icons/fi';
import './Navigation.css';

export default function TopNav() {
  const { totalItems } = useCart();
  const { t } = useAppContext();

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <div className="brand">
          <Link to="/">Sorbet Future</Link>
        </div>
        
        <div className="desktop-links">
          <Link to="/stores">Stores</Link>
          <Link to="/book">Book</Link>
          <Link to="/retail">Shop</Link>
        </div>

        <div className="nav-actions">
          <Link to="/notifications" className="icon-btn">
            <FiBell size={20} />
          </Link>
          <Link to="/profile" className="icon-btn">
            <FiUser size={20} />
          </Link>
          <Link to="/cart" className="icon-btn cart-btn">
            <FiShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
