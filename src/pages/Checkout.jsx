/* Checkout Page — Payment + Order Confirmation
   Sorbet Future Fit */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Stepper } from '../components/ui/Stepper';
import { paymentAuthorize } from '../services/mockApi';

const steps = ['Cart', 'Details', 'Payment', 'Done'];
const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'eft', label: 'Instant EFT', icon: '🏦' },
  { id: 'gift-card', label: 'Gift Card', icon: '🎁' },
  { id: 'loyalty', label: 'Loyalty Points', icon: '⭐' },
  { id: 'apple-pay', label: 'Apple Pay', icon: '🍎' },
  { id: 'google-pay', label: 'Google Pay', icon: '🔵' },
];

const fmt = (amt, currency = 'ZAR') => {
  const symbols = { ZAR: 'R', BWP: 'P', MUR: 'Rs' };
  return `${symbols[currency] || 'R'}${amt.toLocaleString()}`;
};

export default function Checkout() {
  const { currentUser, currency, showToast, addPoints } = useAppContext();
  const { items, total, subtotal, discountAmount, loyaltyDiscount, deliveryFee, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [giftCode, setGiftCode] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [orderId] = useState(`ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`);

  const handlePay = async () => {
    if (paymentMethod === 'loyalty') {
      const pointsNeeded = total * 10;
      if ((currentUser?.points || 0) < pointsNeeded) {
        showToast?.(`Insufficient points. You need ${pointsNeeded} points.`, 'error');
        return;
      }
    }

    setProcessing(true);
    try {
      const response = await paymentAuthorize({ amount: total, currency, method: paymentMethod, cardLast4: cardDetails.number.slice(-4) || '****' });
      setResult(response);
      if (response.status === 'success') {
        const newOrder = {
          orderId,
          items: [...items],
          total,
          subtotal,
          discountAmount,
          loyaltyDiscount,
          deliveryFee,
          paymentMethod,
          date: new Date().toISOString(),
          status: 'completed'
        };
        const existingOrders = JSON.parse(localStorage.getItem('srb_orders') || '[]');
        localStorage.setItem('srb_orders', JSON.stringify([newOrder, ...existingOrders]));

        if (paymentMethod === 'loyalty') {
          addPoints(-(total * 10));
        }

        clearCart();
        setStep(4);
        showToast?.('Payment successful! 🎉', 'success');
      } else if (response.status === 'pending') {
        showToast?.('Payment pending — check your bank app.', 'warning');
      } else {
        showToast?.('Payment declined. Please try another method.', 'error');
      }
    } catch (e) {
      showToast?.('Payment failed. Please try again.', 'error');
      setResult({ status: 'error', message: 'Network error. Please try again.' });
    }
    setProcessing(false);
  };

  if (step === 4 && result?.status === 'success') {
    return (
      <div className="page-container animate-fade-in" style={{ textAlign: 'center', paddingTop: 'var(--space-2xl)' }}>
        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>🎉</div>
        <h1 style={{ marginBottom: 'var(--space-sm)' }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Thank you for your purchase. Your order is being prepared.</p>
        <Card variant="accent" padding="var(--space-xl)" style={{ marginBottom: 'var(--space-xl)', textAlign: 'left' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-sm)' }}>Order Reference</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace', marginBottom: 'var(--space-md)' }}>{orderId}</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Paid: <strong>{fmt(total, currency)}</strong> via {paymentMethods.find((m) => m.id === paymentMethod)?.label}</p>
          {result.transactionId && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'monospace' }}>Txn: {result.transactionId}</p>}
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <Button variant="primary" fullWidth onClick={() => navigate('/')}>Back to Home</Button>
          <Button variant="outline" fullWidth onClick={() => navigate('/products')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
      <Stepper steps={steps} currentStep={step} />
      <h2 style={{ marginBottom: 'var(--space-xl)' }}>Checkout</h2>

      {/* Delivery Details */}
      {step === 2 && (
        <>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Delivery Details</h3>
          <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
            <Input label="Full Name" value={currentUser?.firstName + ' ' + (currentUser?.lastName || '')} onChange={() => {}} disabled />
            <Input label="Email" value={currentUser?.email || ''} onChange={() => {}} disabled />
            <Input label="Mobile" value={currentUser?.mobile || ''} onChange={() => {}} disabled />
            <Input label="Delivery Address" placeholder="Enter delivery address (if shipping)" />
            <Input label="Special Instructions (Optional)" placeholder="Any notes for delivery..." />
          </Card>
          <div className="sticky-action-bar">
            <Button variant="primary" fullWidth size="lg" onClick={() => setStep(3)}>Continue to Payment →</Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {/* Order Summary */}
          <Card variant="blush" padding="var(--space-md)" style={{ marginBottom: 'var(--space-xl)' }}>
            {items.map((item) => (
              <div key={`${item.id}-${item.type}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span>{item.name} × {item.quantity}</span>
                <span style={{ fontWeight: 600 }}>{fmt(item.price * item.quantity, currency)}</span>
              </div>
            ))}
            {discountAmount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '6px 0', color: 'var(--color-success)' }}><span>Promo discount</span><span>−{fmt(discountAmount, currency)}</span></div>}
            {loyaltyDiscount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '6px 0', color: 'var(--color-success)' }}><span>Loyalty discount</span><span>−{fmt(loyaltyDiscount, currency)}</span></div>}
            {deliveryFee > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '6px 0' }}><span>Delivery</span><span>{fmt(deliveryFee, currency)}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', marginTop: '8px', paddingTop: '8px' }}>
              <span>Total</span><span style={{ color: 'var(--color-accent)' }}>{fmt(total, currency)}</span>
            </div>
          </Card>

          {/* Payment Methods */}
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Payment Method</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
            {paymentMethods.map((m) => (
              <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: `2px solid ${paymentMethod === m.id ? 'var(--color-accent)' : 'var(--color-border)'}`, background: paymentMethod === m.id ? 'var(--color-rose-gold-light)' : 'var(--color-surface)', cursor: 'pointer', fontFamily: 'var(--font-family)', textAlign: 'left', transition: 'var(--transition-fast)' }}>
                <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: paymentMethod === m.id ? 'var(--color-accent)' : 'var(--text-primary)' }}>{m.label}</span>
                <div style={{ marginLeft: 'auto', width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${paymentMethod === m.id ? 'var(--color-accent)' : 'var(--color-border)'}`, background: paymentMethod === m.id ? 'var(--color-accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {paymentMethod === m.id && <span style={{ color: '#fff', fontSize: '0.6rem' }}>✓</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
              <Input label="Cardholder Name" placeholder="As it appears on your card" value={cardDetails.name} onChange={(e) => setCardDetails((d) => ({ ...d, name: e.target.value }))} />
              <Input label="Card Number" placeholder="**** **** **** ****" value={cardDetails.number} onChange={(e) => setCardDetails((d) => ({ ...d, number: e.target.value }))} helper="Demo: any card number works" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
                <Input label="Expiry" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails((d) => ({ ...d, expiry: e.target.value }))} />
                <Input label="CVV" placeholder="***" type="password" value={cardDetails.cvv} onChange={(e) => setCardDetails((d) => ({ ...d, cvv: e.target.value }))} />
              </div>
            </Card>
          )}

          {paymentMethod === 'gift-card' && (
            <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
              <Input label="Gift Card Code" placeholder="SRB-XXXX-XXXX-XXXX" value={giftCode} onChange={(e) => setGiftCode(e.target.value)} helper="Enter your gift card code (found in your email or Vouchers tab)" />
            </Card>
          )}

          {paymentMethod === 'loyalty' && (
            <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Available Points</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-accent)' }}>{currentUser?.points || 0} pts</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Points Required</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{total * 10} pts</p>
                </div>
              </div>
              {(currentUser?.points || 0) < total * 10 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--color-error)', marginTop: 'var(--space-sm)' }}>
                  You don't have enough points to cover this purchase.
                </p>
              )}
            </Card>
          )}

          {/* Payment Simulation Note */}
          <div style={{ background: 'var(--color-info-bg)', border: '1px solid var(--color-info)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-xl)', fontSize: '0.8rem', color: 'var(--color-info)' }}>
            🎯 <strong>Demo Mode:</strong> Payment result is simulated — 80% success, 10% pending, 10% decline.
          </div>

          {result?.status === 'declined' && (
            <div style={{ background: 'var(--color-error-bg)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-xl)', color: 'var(--color-error)', fontSize: '0.875rem' }}>
              ❌ {result.message}
            </div>
          )}

          <div className="sticky-action-bar">
            <Button variant="primary" fullWidth size="lg" loading={processing} onClick={handlePay}>Pay {fmt(total, currency)}</Button>
          </div>
        </>
      )}
    </div>
  );
}
