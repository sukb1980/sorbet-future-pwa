/* ForgotPassword Page — Sorbet Future Fit */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { FiPhone, FiMail } from 'react-icons/fi';

export default function ForgotPassword() {
  const [method, setMethod] = useState('sms');
  const [contact, setContact] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="auth-page">
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🔑</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '4px' }}>Reset Password</h1>
          <p style={{ color: 'var(--text-secondary)' }}>We'll send you a one-time code to reset your password</p>
        </div>

        <Card variant="elevated" padding="var(--space-xl)">
          {!sent ? (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                {[{ id: 'sms', label: 'SMS', icon: <FiPhone size={14} /> }, { id: 'email', label: 'Email', icon: <FiMail size={14} /> }].map((m) => (
                  <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                    style={{ flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)', border: `2px solid ${method === m.id ? 'var(--color-accent)' : 'var(--color-border)'}`, background: method === m.id ? 'var(--color-rose-gold-light)' : 'transparent', color: method === m.id ? 'var(--color-accent)' : 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 600, fontFamily: 'var(--font-family)', fontSize: '0.9rem' }}>
                    {m.icon} {m.label}
                  </button>
                ))}
              </div>
              <Input
                label={method === 'sms' ? 'Mobile Number' : 'Email Address'}
                type={method === 'sms' ? 'tel' : 'email'}
                placeholder={method === 'sms' ? '+27 72 123 4567' : 'aisha@example.com'}
                value={contact} onChange={(e) => setContact(e.target.value)} required
                icon={method === 'sms' ? <FiPhone size={16} /> : <FiMail size={16} />}
              />
              <Button type="submit" variant="primary" fullWidth loading={loading}>Send Reset Code</Button>
            </form>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>✅</div>
              <h3 style={{ marginBottom: 'var(--space-sm)' }}>Code Sent!</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
                A one-time reset code has been sent to your {method === 'sms' ? 'mobile number' : 'email address'}. Enter it on the next screen.
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--color-info-bg)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-info)', color: 'var(--color-info)' }}>
                🎯 Demo OTP: <strong>123456</strong>
              </p>
              <Button variant="primary" fullWidth style={{ marginTop: 'var(--space-lg)' }} onClick={() => {}}>Enter OTP Code</Button>
            </div>
          )}
        </Card>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-lg)', fontSize: '0.875rem' }}>
          <Link to="/auth/sign-in" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>← Back to Sign In</Link>
        </p>
      </div>
    </div>
  );
}
