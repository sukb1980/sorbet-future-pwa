/* Offline Page — Sorbet Future Fit */
import React from 'react';
import { Button } from '../components/ui/Button';

export default function Offline() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', padding: '32px', textAlign: 'center', background: 'var(--color-bg)' }}>
      <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📴</div>
      <h1 style={{ marginBottom: '12px' }}>You're Offline</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '320px', lineHeight: 1.7, marginBottom: '32px' }}>
        No internet connection detected. Some content may be available from cache. Connect to continue your Sorbet experience.
      </p>
      <Button variant="primary" onClick={() => window.location.reload()}>Retry Connection</Button>
    </div>
  );
}
