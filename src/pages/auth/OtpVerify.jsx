/* OTP Verify Page — Sorbet Future Fit */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { otpVerify } from '../../services/mockApi';

export default function OtpVerify() {
  const { register, login, showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { mobile, isRegistration, userData } = location.state || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const inputs = useRef([]);

  useEffect(() => { inputs.current[0]?.focus(); }, []);

  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) inputs.current[idx - 1]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter all 6 digits.'); return; }
    setLoading(true);
    const result = await otpVerify(code);
    setLoading(false);
    if (result.valid) {
      if (isRegistration && userData) {
        register(userData);
        showToast('Account created! Welcome to Sorbet Future 🌸', 'success');
        navigate('/');
      } else {
        showToast('Verified successfully!', 'success');
        navigate('/');
      }
    } else {
      setError('Invalid OTP. Please check and try again.');
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    setResending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setResending(false);
    setResendCount((c) => c + 1);
    showToast('OTP resent!', 'info');
  };

  return (
    <div className="auth-page">
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>📱</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '4px' }}>Verify Your Number</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Enter the 6-digit code sent to {mobile || 'your mobile number'}</p>
        </div>

        <div style={{ background: 'var(--color-info-bg)', border: '1px solid var(--color-info)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-lg)', fontSize: '0.8125rem', color: 'var(--color-info)', textAlign: 'center' }}>
          🎯 Demo OTP: <strong>123456</strong>
        </div>

        <Card variant="elevated" padding="var(--space-xl)">
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: 'var(--space-lg)' }}>
            {otp.map((digit, idx) => (
              <input key={idx} ref={(el) => (inputs.current[idx] = el)} type="text" inputMode="numeric" maxLength={1} value={digit}
                onChange={(e) => handleChange(idx, e.target.value)} onKeyDown={(e) => handleKeyDown(idx, e)}
                style={{ width: '48px', height: '56px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, border: `2px solid ${digit ? 'var(--color-accent)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'var(--font-family)', transition: 'var(--transition-fast)' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = digit ? 'var(--color-accent)' : 'var(--color-border)'}
              />
            ))}
          </div>

          {error && <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', textAlign: 'center', marginBottom: 'var(--space-md)' }}>⚠️ {error}</p>}

          <Button variant="primary" fullWidth loading={loading} onClick={handleVerify}>Verify Code</Button>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Didn't receive a code?{' '}
              <button onClick={handleResend} disabled={resending} style={{ color: 'var(--color-accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: '0.875rem' }}>
                {resending ? 'Sending...' : 'Resend OTP'}
              </button>
            </p>
            {resendCount > 0 && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>OTP resent {resendCount} time{resendCount > 1 ? 's' : ''}.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
