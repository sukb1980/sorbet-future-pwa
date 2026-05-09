/* Promotions Page — Sorbet Future Fit */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { promotions, getPromotionsByTier } from '../data/promotions';

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

export default function Promotions() {
  const { currentUser, showToast, currency } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const tierPromos = currentUser ? getPromotionsByTier(currentUser.tier) : [];
  const tabs = [
    { label: 'All Offers', value: 'all' },
    { label: 'For You', value: 'personalized', count: tierPromos.length },
    { label: 'Seasonal', value: 'seasonal' },
    { label: 'Products', value: 'products' },
  ];

  const displayed = (() => {
    if (activeTab === 'personalized') return tierPromos;
    if (activeTab === 'seasonal') return promotions.filter((p) => p.type === 'seasonal');
    if (activeTab === 'products') return promotions.filter((p) => p.type === 'product');
    return promotions;
  })();

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '100px' }}>
      <h1 style={{ marginBottom: 'var(--space-sm)' }}>Promotions</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Exclusive offers curated for you</p>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pill" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        {displayed.map((promo) => (
          <div key={promo.id} style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <img src={promo.image} alt={promo.title} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(200,144,122,0.6) 0%, rgba(44,44,44,0.75) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'var(--space-xl)', color: '#fff' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                {promo.badge && <span style={{ background: 'var(--color-accent)', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700 }}>{promo.badge}</span>}
                {promo.tag && <span style={{ background: 'rgba(255,255,255,0.25)', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600 }}>{promo.tag}</span>}
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '6px' }}>{promo.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', marginBottom: 'var(--space-md)', lineHeight: 1.5 }}>{promo.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <Button variant="primary" size="sm" onClick={() => navigate(promo.ctaRoute || '/booking/services')}>{promo.cta}</Button>
                  {promo.termsId && <Button variant="ghost" size="sm" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>T&Cs</Button>}
                </div>
                {promo.endDate && <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Valid until {fmtDate(promo.endDate)}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>✨</p>
          <p>No promotions in this category right now. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
