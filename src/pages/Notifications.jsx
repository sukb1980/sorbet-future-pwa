/* Notifications Page — Sorbet Future Fit */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/Primitives';
import { notifications as allNotifications, getNotificationsByType, notificationTypes } from '../data/notifications';

const fmtDate = (d) => {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
};

export default function Notifications() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState('all');
  const [read, setRead] = useState(new Set(allNotifications.filter((n) => n.read).map((n) => n.id)));

  const tabs = notificationTypes.map((t) => ({ label: t.charAt(0).toUpperCase() + t.slice(1), value: t }));
  const displayed = getNotificationsByType(activeType);
  const unreadCount = allNotifications.filter((n) => !read.has(n.id)).length;

  const markRead = (id) => setRead((prev) => new Set([...prev, id]));
  const markAllRead = () => setRead(new Set(allNotifications.map((n) => n.id)));

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <div>
          <h1>Notifications</h1>
          {unreadCount > 0 && <p style={{ fontSize: '0.875rem', color: 'var(--color-accent)', fontWeight: 600 }}>{unreadCount} unread</p>}
        </div>
        {unreadCount > 0 && <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all read</Button>}
      </div>

      <Tabs tabs={tabs} activeTab={activeType} onChange={setActiveType} variant="pill" />

      {displayed.length === 0 ? (
        <EmptyState icon="🔔" title="No notifications" description="You're all caught up! Notifications will appear here." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          {displayed.map((notif) => {
            const isRead = read.has(notif.id);
            return (
              <div key={notif.id} onClick={() => { markRead(notif.id); if (notif.actionRoute) navigate(notif.actionRoute); }}
                style={{ display: 'flex', gap: 'var(--space-md)', padding: 'var(--space-md)', background: isRead ? 'var(--color-surface)' : 'var(--color-blush-light)', borderRadius: 'var(--radius-md)', border: `1px solid ${isRead ? 'var(--color-border)' : 'var(--color-blush)'}`, cursor: 'pointer', transition: 'var(--transition-fast)', position: 'relative' }}>
                {/* Unread dot */}
                {!isRead && <div style={{ position: 'absolute', top: '14px', right: '14px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />}

                <div style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: '2px' }}>{notif.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-sm)', marginBottom: '4px' }}>
                    <p style={{ fontWeight: isRead ? 500 : 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{notif.title}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', flexShrink: 0 }}>{fmtDate(notif.date)}</span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: notif.actionLabel ? '8px' : 0 }}>{notif.body}</p>
                  {notif.actionLabel && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600 }}>{notif.actionLabel} →</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
