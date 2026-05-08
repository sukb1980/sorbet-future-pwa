import React from 'react';
import { useAppContext } from '../context/AppContext';
import { loyaltyTiers, loyaltyTransactions } from '../data/loyalty';
import { Card } from '../components/ui/Card';

export default function Loyalty() {
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return (
      <div className="page-container" style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2>Sorbet Society</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '16px 0' }}>Join our loyalty program to earn points and exclusive privileges.</p>
        <Card>
          <h3>Benefits</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px', textAlign: 'left' }}>
            {loyaltyTiers[1].benefits.map((b, i) => <li key={i} style={{ marginBottom: '8px' }}>✓ {b}</li>)}
          </ul>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 style={{ marginBottom: '24px' }}>Sorbet Society</h2>

      <Card style={{ background: 'var(--tier-silver)', color: '#1A1A1A', marginBottom: '24px' }}>
        <h3>{currentUser.tier} Member</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: '16px' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{currentUser.points}</div>
            <div style={{ fontSize: '0.875rem' }}>Available Points</div>
          </div>
          <div>{currentUser.clubCardNumber}</div>
        </div>
      </Card>

      <h3 style={{ marginBottom: '16px' }}>Recent Transactions</h3>
      {loyaltyTransactions.map(t => (
        <Card key={t.id} style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontWeight: '600' }}>{t.description}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{t.date}</p>
            </div>
            <div style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>+{t.points}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
