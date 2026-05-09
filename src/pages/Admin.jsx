/* Admin Dashboard — Sorbet Future Fit
   BI Overview with KPIs and mini charts */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { adminMetrics, adminCharts, adminStoreLeaderboard } from '../data/admin';

const kpiColor = (trend) => trend === 'up' ? 'var(--color-success)' : trend === 'down' ? 'var(--color-error)' : 'var(--color-warning)';
const kpiIcon = (trend) => trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

/* Simple inline bar chart */
const MiniBar = ({ data, color = 'var(--color-accent)', label }) => {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div>
      {label && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{label}</p>}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '60px' }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <div style={{ width: '100%', background: color, borderRadius: '3px 3px 0 0', height: `${Math.max(4, (d.value / max) * 52)}px`, transition: 'height 0.5s ease', opacity: 0.85 }} />
            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', writingMode: 'horizontal-tb' }}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Mini line sparkline */
const Sparkline = ({ data, color = 'var(--color-accent)' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40;
  const w = 100;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="80" height={h} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Revenue', value: 'revenue' },
    { label: 'Stores', value: 'stores' },
    { label: 'Loyalty', value: 'loyalty' },
  ];

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100dvh' }}>
      {/* Admin Top Bar */}
      <div style={{ background: 'var(--color-charcoal)', color: '#fff', padding: '16px var(--space-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '2px' }}>🌸 Sorbet Future — Admin</h2>
          <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>Business Intelligence Dashboard</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/reports')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Reports</Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/promotions')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Promotions</Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>← App</Button>
        </div>
      </div>

      <div style={{ padding: 'var(--space-lg)', maxWidth: '1200px', margin: '0 auto' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pill" />

        {activeTab === 'overview' && (
          <>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
              {adminMetrics.kpis.map((kpi) => (
                <Card key={kpi.id} variant="default" padding="var(--space-lg)">
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '4px' }}>{kpi.value}</div>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: kpiColor(kpi.trend) }}>{kpiIcon(kpi.trend)} {kpi.change}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>vs last period</span>
                      </div>
                    </div>
                    {kpi.sparkline && <Sparkline data={kpi.sparkline} color={kpiColor(kpi.trend)} />}
                  </div>
                </Card>
              ))}
            </div>

            {/* Revenue + Bookings Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
              <Card variant="default" padding="var(--space-lg)">
                <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '0.95rem' }}>Monthly Revenue (ZAR)</h3>
                <MiniBar data={adminCharts.monthlyRevenue.slice(-6).map((d) => ({ value: d.revenue, label: d.month.slice(0, 3) }))} color="var(--color-accent)" />
              </Card>
              <Card variant="default" padding="var(--space-lg)">
                <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '0.95rem' }}>Bookings per Week</h3>
                <MiniBar data={adminCharts.weeklyBookings.map((d) => ({ value: d.bookings, label: d.week }))} color="var(--color-info)" />
              </Card>
            </div>

            {/* Service Mix */}
            <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
              <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '0.95rem' }}>Service Category Mix</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {adminCharts.serviceMix.map((svc) => (
                  <div key={svc.category}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{svc.category}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{svc.bookings} bookings · {svc.percentage}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--color-cream-deep)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${svc.percentage}%`, background: `linear-gradient(90deg, var(--color-rose-gold), var(--color-blush-mid))`, borderRadius: 'var(--radius-full)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Store Leaderboard */}
            <Card variant="default" padding="var(--space-lg)">
              <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '0.95rem' }}>Store Performance</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {adminStoreLeaderboard.map((store, i) => (
                  <div key={store.storeId} style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', padding: '10px', background: i === 0 ? 'var(--color-rose-gold-light)' : 'transparent', borderRadius: 'var(--radius-sm)', border: i === 0 ? '1px solid var(--color-blush)' : 'none' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: i < 3 ? 'var(--color-accent)' : 'var(--text-muted)', minWidth: '24px' }}>#{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{store.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{store.city} · NPS {store.nps}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '0.9rem' }}>R{store.revenue.toLocaleString()}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{store.bookings} bookings</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {activeTab === 'revenue' && (
          <Card variant="default" padding="var(--space-xl)">
            <h3 style={{ marginBottom: 'var(--space-xl)' }}>Monthly Revenue Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {adminCharts.monthlyRevenue.map((m) => (
                <div key={m.month} style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                  <span style={{ minWidth: '70px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{m.month}</span>
                  <div style={{ flex: 1, height: '10px', background: 'var(--color-cream-deep)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(m.revenue / 280000) * 100}%`, background: 'linear-gradient(90deg, var(--color-rose-gold), var(--color-blush-mid))', borderRadius: 'var(--radius-full)' }} />
                  </div>
                  <span style={{ minWidth: '80px', textAlign: 'right', fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>R{m.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {(activeTab === 'stores' || activeTab === 'loyalty') && (
          <div style={{ textAlign: 'center', padding: 'var(--space-3xl)', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>📊</p>
            <p style={{ fontWeight: 600, marginBottom: 'var(--space-sm)' }}>Detailed reports for this section</p>
            <p style={{ marginBottom: 'var(--space-lg)' }}>Access the full {activeTab === 'stores' ? 'Store Analytics' : 'Loyalty Analytics'} report below.</p>
            <Button variant="primary" onClick={() => navigate('/admin/reports')}>Open Full Reports →</Button>
          </div>
        )}
      </div>
    </div>
  );
}
