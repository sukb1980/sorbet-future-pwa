/* MainLayout — App Shell with Toast, Offline Banner, Install Banner
   Sorbet Future Fit */
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../components/navigation/TopNav';
import BottomNav from '../components/navigation/BottomNav';
import { ToastContainer } from '../components/ui/Toast';
import { useAppContext } from '../context/AppContext';
import { FiWifi } from 'react-icons/fi';
import { Button } from '../components/ui/Button';

export const MainLayout = () => {
  const { isOffline, showInstallBanner, setShowInstallBanner, triggerInstall } = useAppContext();

  return (
    <div className="app-shell">
      {/* Offline Banner */}
      {isOffline && (
        <div className="offline-banner">
          📴 You're offline — showing cached content
        </div>
      )}

      <TopNav />
      <ToastContainer />

      <main className="main-content">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <div style={{ display: 'block' }}>
        <BottomNav />
      </div>

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="install-banner animate-slide-up">
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px' }}>Add to Home Screen</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>Get the full Sorbet Future app experience</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Button variant="outline" size="sm" onClick={() => setShowInstallBanner(false)} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', padding: '6px 12px', height: 'auto' }}>Later</Button>
            <Button size="sm" onClick={triggerInstall} style={{ background: 'var(--color-accent)', padding: '6px 14px', height: 'auto' }}>Install</Button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .install-banner { bottom: var(--space-lg); }
        }
      `}</style>
    </div>
  );
};
