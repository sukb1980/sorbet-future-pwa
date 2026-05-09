/* Onboarding Components — Splash, Permission Prompts, Guest Conversion Modal
   Sorbet Future Fit */
import React from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

/* ---- Splash Screen ---- */
export const SplashScreen = ({ onComplete }) => {
  React.useEffect(() => {
    const t = setTimeout(onComplete, 2200);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="fullscreen-overlay" style={{ background: 'linear-gradient(160deg, var(--color-cream) 0%, var(--color-blush-light) 60%, var(--color-blush) 100%)' }}>
      <div className="animate-scale-in" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
        {/* Logo mark */}
        <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-rose-gold), var(--color-blush-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-lg)', boxShadow: 'var(--shadow-glow)' }}>
          <span style={{ fontSize: '2.5rem', color: '#fff', fontWeight: 800 }}>S</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Sorbet Future</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontWeight: 400 }}>Premium Beauty & Wellness</p>

        {/* Animated dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '48px' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-rose-gold)', animation: `skeleton-pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---- Notification Permission Prompt ---- */
export const NotificationPermissionPrompt = ({ onAllow, onDeny }) => (
  <div className="fullscreen-overlay" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
    <div className="modal-content animate-slide-up" style={{ maxWidth: '420px', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-md)' }}>🔔</div>
      <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>Stay in the loop</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
        Allow <strong>Sorbet Future</strong> to send you booking reminders, loyalty updates, and exclusive offers?
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        <Button variant="primary" fullWidth onClick={onAllow}>Allow Notifications</Button>
        <Button variant="ghost" fullWidth onClick={onDeny} style={{ color: 'var(--text-muted)' }}>Don't Allow</Button>
      </div>
    </div>
  </div>
);

/* ---- Location Permission Prompt ---- */
export const LocationPermissionPrompt = ({ onAllow, onDeny }) => (
  <div className="fullscreen-overlay" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
    <div className="modal-content animate-slide-up" style={{ maxWidth: '420px', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-md)' }}>📍</div>
      <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>Find your nearest Sorbet</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
        Allow location access so we can automatically find your nearest store and personalise your experience.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        <Button variant="primary" fullWidth onClick={onAllow}>Allow Location Access</Button>
        <Button variant="ghost" fullWidth onClick={onDeny} style={{ color: 'var(--text-muted)' }}>Not Now</Button>
      </div>
    </div>
  </div>
);

/* ---- Guest Conversion Modal ---- */
export const GuestConversionModal = ({ isOpen, onClose, onSignIn, onSignUp }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Sign in to continue" size="sm">
    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', lineHeight: 1.6 }}>
      Create an account or sign in to complete your booking or purchase. It only takes a minute! 🌸
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
      <Button variant="primary" fullWidth onClick={onSignIn}>Sign In</Button>
      <Button variant="outline" fullWidth onClick={onSignUp}>Create Account</Button>
      <Button variant="ghost" fullWidth onClick={onClose} style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Return to Browsing</Button>
    </div>
  </Modal>
);
