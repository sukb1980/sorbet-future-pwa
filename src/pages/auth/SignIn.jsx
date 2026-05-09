/* SignIn Page — Sorbet Future Fit */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { FiPhone, FiLock } from 'react-icons/fi';

export default function SignIn() {
  const { login, continueAsGuest, isLocked, showToast } = useAppContext();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!mobile || !password) { setError('Please enter your mobile number and password.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = login(mobile, password);
    setLoading(false);
    if (result.success) {
      showToast('Welcome back! 🌸', 'success');
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-rose-gold), var(--color-blush-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-md)', boxShadow: 'var(--shadow-glow)' }}>
            <span style={{ fontSize: '1.75rem', color: '#fff', fontWeight: 800 }}>S</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '4px' }}>Welcome back</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to your Sorbet account</p>
        </div>


        {isLocked && (
          <div style={{ background: 'var(--color-error-bg)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-lg)', fontSize: '0.8125rem', color: 'var(--color-error)' }}>
            🔒 Account temporarily locked after 3 failed attempts. Try again in 15 minutes.
          </div>
        )}

        <Card variant="elevated" padding="var(--space-xl)">
          <form onSubmit={handleLogin}>
            <Input label="Mobile Number" placeholder="+27 72 123 4567" value={mobile} onChange={(e) => { setMobile(e.target.value); setError(''); }} icon={<FiPhone size={16} />} required type="tel" error={error && !password ? error : ''} />
            <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} icon={<FiLock size={16} />} required />
            {error && (
              <div style={{ background: 'var(--color-error-bg)', color: 'var(--color-error)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', marginBottom: 'var(--space-md)', border: '1px solid var(--color-error)' }}>
                ⚠️ {error}
              </div>
            )}
            <div style={{ textAlign: 'right', marginBottom: 'var(--space-md)', marginTop: '-8px' }}>
              <Link to="/auth/forgot-password" style={{ fontSize: '0.8125rem', color: 'var(--color-accent)' }}>Forgot Password?</Link>
            </div>
            <Button type="submit" variant="primary" fullWidth loading={loading} disabled={isLocked}>Sign In</Button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', margin: 'var(--space-lg) 0' }}>
            <div className="divider" style={{ flex: 1, margin: 0 }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>or</span>
            <div className="divider" style={{ flex: 1, margin: 0 }} />
          </div>

          <Button variant="outline" fullWidth onClick={handleGuest}>Continue as Guest</Button>
        </Card>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-lg)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/auth/sign-up" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
