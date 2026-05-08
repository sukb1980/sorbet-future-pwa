import React from 'react';
import { notifications } from '../data/notifications';
import { Card } from '../components/ui/Card';

export default function Notifications() {
  return (
    <div className="page-container">
      <h2 style={{ marginBottom: '24px' }}>Inbox</h2>

      {notifications.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No new notifications.</p>
      ) : (
        notifications.map(notif => (
          <Card key={notif.id} style={{ marginBottom: '16px', opacity: notif.read ? 0.7 : 1 }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: notif.read ? 'transparent' : 'var(--color-primary)',
                marginTop: '6px'
              }} />
              <div>
                <h4 style={{ margin: 0, marginBottom: '4px' }}>{notif.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '8px' }}>
                  {notif.body || notif.question}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#AAA' }}>{new Date(notif.date).toLocaleString()}</div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
