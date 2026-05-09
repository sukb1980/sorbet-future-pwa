/* Cart & Checkout — Sorbet Future Fit */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { EmptyState } from '../components/ui/Primitives';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';

const formatCurrency = (amt, currency = 'ZAR') => {
  const symbols = { ZAR: 'R', BWP: 'P', MUR: 'Rs' };
  return `${symbols[currency] || 'R'}${amt.toLocaleString()}`;
};

export default function Cart() {
  const { currency, currentUser, showToast } = useAppContext();
  const { items, updateQuantity, removeItem, promoCode, promoDiscount, applyPromoCode, removePromoCode, loyaltyPointsToRedeem, applyLoyaltyPoints, deliveryMethod, setDeliveryMethod, subtotal, discountAmount, loyaltyDiscount, deliveryFee, total, itemCount } = useCart();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [loyaltyInput, setLoyaltyInput] = useState(currentUser?.points || 0);

  const handlePromo = () => {
    const result = applyPromoCode(promoInput.trim());
    if (!result.success) setPromoError(result.message);
    else { setPromoError(''); showToast?.(result.message, 'success'); }
  };

  const handleLoyaltyApply = () => {
    const pts = Math.min(parseInt(loyaltyInput) || 0, currentUser?.points || 0);
    applyLoyaltyPoints(pts);
    showToast?.(`${pts} points applied — ${formatCurrency(Math.floor(pts / 100) * 10, currency)} discount`, 'success');
  };

  if (itemCount === 0) {
    return (
      <div className="page-container">
        <EmptyState icon="🛍️" title="Your cart is empty" description="Add a service or product to get started." action={
          <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center' }}>
            <Button onClick={() => navigate('/booking/services')}>Book a Treatment</Button>
            <Button variant="outline" onClick={() => navigate('/products')}>Shop Products</Button>
          </div>
        } />
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
      <h1 style={{ marginBottom: 'var(--space-xl)' }}>Your Cart ({itemCount})</h1>

      {/* Cart Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        {items.map((item) => (
          <Card key={`${item.id}-${item.type}`} variant="default" padding="var(--space-md)" style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
            {item.image && <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} />}
            {!item.image && <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', background: 'var(--color-blush-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎁</div>}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize', marginBottom: '2px' }}>{item.type}</p>
              <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-cream-deep)', borderRadius: 'var(--radius-full)', padding: '4px 12px', border: '1px solid var(--color-border)' }}>
                  <button onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-family)', lineHeight: 1 }}>−</button>
                  <span style={{ fontWeight: 700, minWidth: '16px', textAlign: 'center', fontSize: '0.9rem' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-family)', lineHeight: 1 }}>+</button>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '0.95rem' }}>{formatCurrency(item.price * item.quantity, currency)}</span>
              </div>
            </div>
            <button onClick={() => removeItem(item.id, item.type)} style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexShrink: 0 }} aria-label="Remove item">
              <FiTrash2 size={18} />
            </button>
          </Card>
        ))}
      </div>

      {/* Delivery Method (for products) */}
      <h3 style={{ marginBottom: 'var(--space-md)' }}>Delivery Method</h3>
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
        {[
          { id: 'pickup', label: 'In-Store Pickup', fee: 'Free', icon: '🏪' },
          { id: 'click-collect', label: 'Click & Collect', fee: 'Free', icon: '🛒' },
          { id: 'same-day', label: 'Same-Day Delivery', fee: '+R59', icon: '⚡' },
          { id: 'shipping', label: 'Shipping (1-3 days)', fee: '+R99', icon: '📦' },
        ].map((d) => (
          <button key={d.id} onClick={() => setDeliveryMethod(d.id)}
            style={{ flex: '1 1 calc(50% - 8px)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: `2px solid ${deliveryMethod === d.id ? 'var(--color-accent)' : 'var(--color-border)'}`, background: deliveryMethod === d.id ? 'var(--color-rose-gold-light)' : 'var(--color-surface)', cursor: 'pointer', fontFamily: 'var(--font-family)', textAlign: 'center', transition: 'var(--transition-fast)' }}>
            <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>{d.icon}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: deliveryMethod === d.id ? 'var(--color-accent)' : 'var(--text-primary)' }}>{d.label}</div>
            <div style={{ fontSize: '0.75rem', color: d.fee === 'Free' ? 'var(--color-success)' : 'var(--text-muted)', fontWeight: 600 }}>{d.fee}</div>
          </button>
        ))}
      </div>

      {/* Promo Code */}
      <h3 style={{ marginBottom: 'var(--space-md)' }}>Promo Code</h3>
      {promoCode ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)', background: 'var(--color-success-bg)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-success)' }}>
          <span style={{ flex: 1, fontWeight: 700, color: 'var(--color-success)' }}>✓ {promoCode} applied — {promoDiscount * 100}% off</span>
          <Button variant="ghost" size="sm" onClick={removePromoCode} style={{ color: 'var(--color-error)' }}>Remove</Button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
          <Input placeholder="Enter promo code (e.g. SORBET10)" value={promoInput} onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }} error={promoError} containerStyle={{ flex: 1, marginBottom: 0 }} />
          <Button variant="outline" size="md" onClick={handlePromo} style={{ flexShrink: 0 }}>Apply</Button>
        </div>
      )}

      {/* Loyalty Redemption */}
      {currentUser && currentUser.points > 0 && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-sm)' }}>Redeem Loyalty Points</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>You have <strong>{currentUser.points.toLocaleString()}</strong> points (100 pts = R10). Max redeemable: {currentUser.points}.</p>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <Input type="number" placeholder="Points to redeem" value={loyaltyInput} onChange={(e) => setLoyaltyInput(e.target.value)} containerStyle={{ flex: 1, marginBottom: 0 }} />
            <Button variant="outline" size="md" onClick={handleLoyaltyApply} style={{ flexShrink: 0 }}>Apply</Button>
          </div>
          {loyaltyPointsToRedeem > 0 && <p style={{ fontSize: '0.8rem', color: 'var(--color-success)', marginTop: '6px', fontWeight: 600 }}>✓ {loyaltyPointsToRedeem} points redeemed — {formatCurrency(loyaltyDiscount, currency)} off</p>}
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>💡 Demo codes: SORBET10 · GLOW20 · BIRTHDAY50 · AUTUMN15</p>
        </div>
      )}

      {/* Order Summary */}
      <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Order Summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: 'var(--space-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span>Subtotal</span><span>{formatCurrency(subtotal, currency)}</span></div>
          {discountAmount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-success)' }}><span>Promo Discount</span><span>−{formatCurrency(discountAmount, currency)}</span></div>}
          {loyaltyDiscount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-success)' }}><span>Loyalty Redemption</span><span>−{formatCurrency(loyaltyDiscount, currency)}</span></div>}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span>Delivery</span><span style={{ color: deliveryFee === 0 ? 'var(--color-success)' : undefined }}>{deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee, currency)}</span></div>
        </div>
        <div className="divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.25rem' }}>
          <span>Total</span>
          <span style={{ color: 'var(--color-accent)' }}>{formatCurrency(total, currency)}</span>
        </div>
      </Card>

      <div className="sticky-action-bar">
        <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/checkout')}>Proceed to Checkout → {formatCurrency(total, currency)}</Button>
      </div>
    </div>
  );
}
