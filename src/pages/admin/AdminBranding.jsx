/* AdminBranding — Brand Config Stub
   Sorbet Future Fit */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export default function AdminBranding() {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100dvh' }}>
      <div style={{ background: 'var(--color-charcoal)', color: '#fff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '1.1rem' }}>🎨 Branding & Config</h2>
        <Button variant="outline" size="sm" onClick={() => navigate('/admin')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>← Dashboard</Button>
      </div>
      <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage brand colours, fonts, and in-app content.</p>
        {['Primary Colour', 'Accent Colour', 'Logo Upload', 'App Banner Image', 'Onboarding Copy', 'Footer Links'].map((item) => (
          <Card key={item} variant="default" padding="16px" style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item}</p>
            <Button variant="outline" size="sm" onClick={() => alert(`Demo: Edit ${item}`)}>Edit</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
