import React from 'react';
import { useCart } from '../context/CartContext';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Cart() {
  const { cartState, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isGuest, currentUser } = useAppContext();

  const total = cartState.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (isGuest || !currentUser) {
      alert("Please sign in or create an account to checkout securely.");
      // In a real app this would trigger a conversion modal before checkout
    } else {
      alert("Simulating checkout... Payment Successful!");
      clearCart();
    }
  };

  return (
    <div className="page-container">
      <h2 style={{ marginBottom: '24px' }}>Your Cart</h2>

      {cartState.items.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: 'var(--text-secondary)' }}>
          Your cart is empty.
        </div>
      ) : (
        <>
          {cartState.items.map(item => (
            <Card key={`${item.type}-${item.id}`} className="mb-4" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{item.type}</p>
                  {item.type === 'service' && <p style={{ fontSize: '0.75rem' }}>Date: {item.slot?.date} • {item.slot?.time}</p>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600' }}>ZAR {item.price * item.quantity}</div>
                  {item.type === 'product' && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                       <Button variant="outline" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
                       <span>{item.quantity}</span>
                       <Button variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                    </div>
                  )}
                  <Button variant="text" onClick={() => removeFromCart(item.id)} style={{ color: 'var(--color-error)' }}>Remove</Button>
                </div>
              </div>
            </Card>
          ))}

          <div style={{ borderTop: '1px solid #EEE', paddingTop: '16px', marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span>ZAR {total}</span>
            </div>
          </div>

          <Button variant="solid" style={{ width: '100%', marginTop: '24px' }} onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  );
}
