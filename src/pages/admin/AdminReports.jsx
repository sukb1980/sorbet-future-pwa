/* AdminReports — Full Report Stub
   Sorbet Future Fit */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { adminMetrics } from '../../data/admin';

export default function AdminReports() {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100dvh' }}>
      <div style={{ background: 'var(--color-charcoal)', color: '#fff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '1.1rem' }}>📊 Reports & Analytics</h2>
        <Button variant="outline" size="sm" onClick={() => navigate('/admin')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>← Dashboard</Button>
      </div>
      <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Export detailed reports for bookings, revenue, loyalty, and retail sales.</p>
        {[
          { label: 'Revenue Report', period: 'Last 6 months', size: '42KB', icon: '💰' },
          { label: 'Booking Analytics', period: 'Year to date', size: '88KB', icon: '📅' },
          { label: 'Loyalty & Retention', period: 'Q1 2026', size: '31KB', icon: '⭐' },
          { label: 'Retail Sales', period: 'Last 3 months', size: '55KB', icon: '🛍️' },
          { label: 'Therapist Performance', period: 'Last 6 months', size: '26KB', icon: '👩' },
          { label: 'NPS & Satisfaction', period: 'Last 12 months', size: '19KB', icon: '😊' },
        ].map((r) => (
          <Card key={r.label} variant="default" padding="16px" style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{r.label}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.period} · CSV {r.size}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => alert('Demo: Downloading report...')}>Export CSV</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
