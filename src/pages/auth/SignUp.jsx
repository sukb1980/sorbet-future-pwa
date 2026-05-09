/* SignUp Page — Sorbet Future Fit */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Input, Checkbox } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Stepper } from '../../components/ui/Stepper';

const steps = ['Details', 'Account', 'Consent'];

export default function SignUp() {
  const { register, showToast } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', birthday: '', email: '',
    mobile: '', password: '', confirmPassword: '',
    popia: false, privacy: false,
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.firstName) e.firstName = 'Required';
      if (!form.lastName) e.lastName = 'Required';
      if (!form.birthday) e.birthday = 'Required';
      else {
        const age = (new Date() - new Date(form.birthday)) / (365.25 * 24 * 60 * 60 * 1000);
        if (age < 18) e.birthday = 'You must be 18 or older.';
      }
    }
    if (step === 2) {
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
      if (!form.mobile || !/^\+?[0-9]{9,15}$/.test(form.mobile.replace(/\s/g, ''))) e.mobile = 'Valid mobile number required';
      if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    }
    if (step === 3) {
      if (!form.popia) e.popia = 'POPIA consent is required';
      if (!form.privacy) e.privacy = 'Privacy policy acceptance is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) setStep((s) => s + 1); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    // Simulate OTP — navigate to OTP verify
    navigate('/auth/otp-verify', { state: { mobile: form.mobile, isRegistration: true, userData: form } });
  };

  return (
    <div className="auth-page" style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '4px' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Join Sorbet Future — your beauty journey starts here</p>
        </div>

        <Stepper steps={steps} currentStep={step} />

        <Card variant="elevated" padding="var(--space-xl)">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
                  <Input label="First Name" value={form.firstName} onChange={set('firstName')} error={errors.firstName} required placeholder="Aisha" />
                  <Input label="Last Name" value={form.lastName} onChange={set('lastName')} error={errors.lastName} required placeholder="Naidoo" />
                </div>
                <Input label="Date of Birth" type="date" value={form.birthday} onChange={set('birthday')} error={errors.birthday} required />
                <Button type="button" variant="primary" fullWidth onClick={handleNext}>Continue</Button>
              </>
            )}

            {step === 2 && (
              <>
                <Input label="Email Address" type="email" value={form.email} onChange={set('email')} error={errors.email} required placeholder="aisha@example.com" />
                <Input label="Mobile Number" type="tel" value={form.mobile} onChange={set('mobile')} error={errors.mobile} required placeholder="+27 72 123 4567" />
                <Input label="Password" type="password" value={form.password} onChange={set('password')} error={errors.password} required placeholder="At least 6 characters" />
                <Input label="Confirm Password" type="password" value={form.confirmPassword} onChange={set('confirmPassword')} error={errors.confirmPassword} required placeholder="Repeat your password" />
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <Button type="button" variant="ghost" onClick={() => setStep(1)} style={{ flex: 1 }}>Back</Button>
                  <Button type="button" variant="primary" onClick={handleNext} style={{ flex: 2 }}>Continue</Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div style={{ background: 'var(--color-blush-light)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-lg)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <p>Please review and accept our data processing terms before creating your account.</p>
                </div>
                <Checkbox
                  id="popia"
                  checked={form.popia}
                  onChange={set('popia')}
                  error={errors.popia}
                  required
                  label={<>I consent to Sorbet Future processing my personal data for beauty services and loyalty under <strong>POPIA</strong>.</>}
                />
                <Checkbox
                  id="privacy"
                  checked={form.privacy}
                  onChange={set('privacy')}
                  error={errors.privacy}
                  required
                  label={<>I have read and accept the <Link to="/forms" style={{ color: 'var(--color-accent)' }}>Privacy Policy</Link> and <Link to="/forms" style={{ color: 'var(--color-accent)' }}>Terms & Conditions</Link>.</>}
                />
                <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
                  <Button type="button" variant="ghost" onClick={() => setStep(2)} style={{ flex: 1 }}>Back</Button>
                  <Button type="submit" variant="primary" loading={loading} style={{ flex: 2 }}>Create Account</Button>
                </div>
              </>
            )}
          </form>
        </Card>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-lg)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/auth/sign-in" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
