import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export default function Auth() {
  const { login, continueAsGuest, t } = useAppContext();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(mobile, password)) {
      navigate('/');
    } else {
      setError('Invalid credentials. Use testing demo password.');
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/');
  };

  return (
    <div className="page-container" style={{ maxWidth: '400px', marginTop: '10vh' }}>
      <h2 style={{ marginBottom: '8px', textAlign: 'center' }}>Welcome to Sorbet</h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>
        Sign in or continue as guest to start your journey.
      </p>

      <Card>
        <form onSubmit={handleLogin}>
          <Input 
            label="Mobile Number" 
            placeholder="+27..." 
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            type="password"
            placeholder="Enter any password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginBottom: '16px' }}>{error}</p>}
          
          <Button type="submit" variant="solid" className="w-full" style={{ width: '100%', marginBottom: '16px' }}>
            {t('signIn')}
          </Button>
          
          <div style={{ textAlign: 'center', marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            or
          </div>
          
          <Button type="button" variant="outline" className="w-full" style={{ width: '100%' }} onClick={handleGuest}>
            {t('continueAsGuest')}
          </Button>
        </form>
      </Card>
      
      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem' }}>
        Don't have an account? <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', cursor: 'pointer' }}>{t('signUp')}</span>
      </p>
    </div>
  );
}
