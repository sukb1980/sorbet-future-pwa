/* Vouchers / Gift Cards Page — Sorbet Future Fit */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/Primitives';
import { voucherAmounts, voucherConfig, deliveryMethods, myVouchers } from '../data/vouchers';
import { voucherGenerate } from '../services/mockApi';
import { FiGift, FiSend, FiCopy } from 'react-icons/fi';

const fmt = (amt) => `R${amt?.toLocaleString()}`;

export default function Vouchers() {
  const { currentUser, showToast } = useAppContext();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [recipient, setRecipient] = useState({ name: '', email: '', mobile: '', message: '' });
  const [delivery, setDelivery] = useState('email');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);

  const tabs = [
    { label: 'Buy a Gift Card', value: 'buy', icon: '🎁' },
    { label: 'My Vouchers', value: 'mine', icon: '💳', count: myVouchers.filter((v) => v.status === 'active').length },
  ];

  const finalAmount = selectedAmount === 'custom' ? parseInt(customAmount) || 0 : selectedAmount;

  const handleGenerate = async () => {
    if (!finalAmount || finalAmount < voucherConfig.minCustomAmount) {
      showToast?.(`Minimum amount is ${fmt(voucherConfig.minCustomAmount)}`, 'warning');
      return;
    }
    if (!recipient.name) { showToast?.('Please enter the recipient\'s name.', 'warning'); return; }
    if (delivery === 'email' && !recipient.email) { showToast?.('Please enter the recipient\'s email.', 'warning'); return; }
    setGenerating(true);
    const result = await voucherGenerate(finalAmount, 'ZAR', recipient.name);
    setGenerating(false);
    setGenerated(result);
    addItem({ id: `gc-${Date.now()}`, type: 'voucher', name: `Gift Card — ${fmt(finalAmount)}`, price: finalAmount, quantity: 1 });
    showToast?.('Gift card created! Added to cart.', 'success');
  };

  if (generated) {
    return (
      <div className="page-container animate-fade-in" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-md)' }}>🎁</div>
        <h1 style={{ marginBottom: 'var(--space-sm)' }}>Gift Card Ready!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Your {fmt(finalAmount)} gift card for {recipient.name} has been created.</p>
        <Card variant="accent" padding="var(--space-xl)" style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '0.08em', fontFamily: 'monospace', color: 'var(--text-primary)', marginBottom: 'var(--space-md)' }}>{generated.code}</div>
          <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>🎁</div>
          <p style={{ fontWeight: 800, fontSize: '1.75rem', color: 'var(--color-accent)', marginBottom: '8px' }}>{fmt(finalAmount)}</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>For: {recipient.name}</p>
          {recipient.message && <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{recipient.message}"</p>}
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'var(--space-md)' }}>Valid until: {generated.expiryDate}</p>
        </Card>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <Button variant="outline" fullWidth icon={<FiCopy size={15} />} onClick={() => { navigator.clipboard?.writeText(generated.code); showToast?.('Code copied!', 'success'); }}>Copy Code</Button>
          <Button variant="primary" fullWidth onClick={() => navigate('/cart')}>Proceed to Checkout</Button>
        </div>
        <Button variant="ghost" fullWidth style={{ marginTop: 'var(--space-sm)' }} onClick={() => { setGenerated(null); setRecipient({ name: '', email: '', mobile: '', message: '' }); }}>Buy Another</Button>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
      <h1 style={{ marginBottom: 'var(--space-sm)' }}>Gift Cards & Vouchers</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Give the gift of beauty</p>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pill" />

      {/* Buy Tab */}
      {activeTab === 'buy' && (
        <>
          {/* Amount Selection */}
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Select Amount</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
            {voucherAmounts.map((v) => (
              <button key={v.id} onClick={() => setSelectedAmount(v.value || 'custom')}
                style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: `2px solid ${selectedAmount === (v.value || 'custom') ? 'var(--color-accent)' : 'var(--color-border)'}`, background: selectedAmount === (v.value || 'custom') ? 'var(--color-rose-gold-light)' : 'var(--color-surface)', color: selectedAmount === (v.value || 'custom') ? 'var(--color-accent)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--font-family)', fontSize: '0.9rem', transition: 'var(--transition-fast)' }}>
                {v.label}
              </button>
            ))}
          </div>
          {selectedAmount === 'custom' && (
            <Input label="Custom Amount" type="number" placeholder="Min R100, Max R5000" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} helper={`Min: R${voucherConfig.minCustomAmount} · Max: R${voucherConfig.maxCustomAmount}`} />
          )}

          {/* Delivery Method */}
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Delivery Method</h3>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
            {deliveryMethods.map((d) => (
              <button key={d.id} onClick={() => setDelivery(d.id)}
                style={{ flex: '1 1 30%', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: `2px solid ${delivery === d.id ? 'var(--color-accent)' : 'var(--color-border)'}`, background: delivery === d.id ? 'var(--color-rose-gold-light)' : 'var(--color-surface)', cursor: 'pointer', textAlign: 'center', fontFamily: 'var(--font-family)', transition: 'var(--transition-fast)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{d.icon}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: delivery === d.id ? 'var(--color-accent)' : 'var(--text-primary)' }}>{d.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{d.description}</div>
              </button>
            ))}
          </div>

          {/* Recipient Details */}
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Recipient Details</h3>
          <Input label="Recipient Name" placeholder="e.g. Nomsa Dlamini" value={recipient.name} onChange={(e) => setRecipient((r) => ({ ...r, name: e.target.value }))} required />
          {delivery === 'email' && <Input label="Email Address" type="email" placeholder="recipient@example.com" value={recipient.email} onChange={(e) => setRecipient((r) => ({ ...r, email: e.target.value }))} required />}
          {delivery === 'sms' && <Input label="Mobile Number" type="tel" placeholder="+27..." value={recipient.mobile} onChange={(e) => setRecipient((r) => ({ ...r, mobile: e.target.value }))} required />}
          <Input label="Personal Message (Optional)" placeholder="e.g. Happy birthday! Enjoy a beautiful treatment 🌸" value={recipient.message} onChange={(e) => setRecipient((r) => ({ ...r, message: e.target.value }))} />

          {/* Terms */}
          <div style={{ background: 'var(--color-cream-deep)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-xl)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {voucherConfig.terms.map((t, i) => <p key={i} style={{ marginBottom: '4px' }}>• {t}</p>)}
          </div>

          <div className="sticky-action-bar">
            <Button variant="primary" fullWidth size="lg" loading={generating} onClick={handleGenerate} icon={<FiGift size={18} />}>
              Create Gift Card {finalAmount > 0 ? `— ${fmt(finalAmount)}` : ''}
            </Button>
          </div>
        </>
      )}

      {/* My Vouchers Tab */}
      {activeTab === 'mine' && (
        <>
          {myVouchers.length === 0 ? (
            <EmptyState icon="🎁" title="No vouchers yet" description="Vouchers you receive or send will appear here." action={<Button onClick={() => setActiveTab('buy')}>Buy a Gift Card</Button>} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {myVouchers.map((v) => (
                <Card key={v.id} variant={v.status === 'active' ? 'accent' : 'default'} padding="var(--space-lg)" style={{ opacity: v.status === 'redeemed' ? 0.65 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: v.type === 'received' ? 'var(--color-accent)' : 'var(--text-muted)' }}>{v.type === 'received' ? '📥 Received' : '📤 Sent'}</span>
                      <p style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-accent)', lineHeight: 1, marginTop: '4px' }}>R{v.value}</p>
                    </div>
                    <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, background: v.status === 'active' ? 'var(--color-success-bg)' : 'var(--color-cream-deep)', color: v.status === 'active' ? 'var(--color-success)' : 'var(--text-muted)', border: `1px solid ${v.status === 'active' ? 'var(--color-success)' : 'var(--color-border)'}` }}>
                      {v.status === 'active' ? 'Active' : 'Redeemed'}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)', letterSpacing: '0.04em' }}>{v.code}</p>
                  {v.from && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>From: {v.from}</p>}
                  {v.recipient && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>To: {v.recipient}</p>}
                  {v.message && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: 'var(--space-md)' }}>"{v.message}"</p>}
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expires: {v.expiryDate}</p>
                  {v.status === 'active' && (
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
                      <Button variant="primary" size="sm" onClick={() => navigate('/checkout')}>Use at Checkout</Button>
                      <Button variant="ghost" size="sm" icon={<FiCopy size={13} />} onClick={() => { navigator.clipboard?.writeText(v.code); showToast?.('Code copied!', 'success'); }}>Copy Code</Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
