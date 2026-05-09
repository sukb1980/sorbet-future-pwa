/* AdminPromotions — Promotion Management
   Sorbet Future Fit */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { promotions } from '../../data/promotions';

export default function AdminPromotions() {
  const navigate = useNavigate();
  const [promos, setPromos] = useState(promotions.map((p) => ({ ...p, active: true })));

  const toggle = (id) => setPromos((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100dvh' }}>
      <div style={{ background: 'var(--color-charcoal)', color: '#fff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '1.1rem' }}>🎯 Promotions Management</h2>
        <Button variant="outline" size="sm" onClick={() => navigate('/admin')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>← Dashboard</Button>
      </div>
      <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Manage active promotions across all stores.</p>
          <Button variant="primary" size="sm" onClick={() => alert('Demo: Create promotion form')}>+ New Promotion</Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {promos.map((promo) => (
            <Card key={promo.id} variant="default" padding="16px" style={{ display: 'flex', gap: '16px', alignItems: 'center', opacity: promo.active ? 1 : 0.55 }}>
              <img src={promo.image} alt={promo.title} style={{ width: '72px', height: '56px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{promo.title}</p>
                  {promo.badge && <span style={{ background: 'var(--color-rose-gold-light)', color: 'var(--color-accent)', padding: '1px 8px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700 }}>{promo.badge}</span>}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{promo.endDate ? `Valid until ${promo.endDate}` : 'Ongoing'}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <div style={{ width: '40px', height: '22px', borderRadius: '11px', background: promo.active ? 'var(--color-success)' : 'var(--color-border)', cursor: 'pointer', position: 'relative' }} onClick={() => toggle(promo.id)}>
                  <div style={{ position: 'absolute', top: '3px', left: promo.active ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'all 0.2s ease' }} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
