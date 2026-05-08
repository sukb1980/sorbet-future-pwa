import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Profile() {
  const { currentUser, isGuest, logout, setLanguage } = useAppContext();

  if (!currentUser && !isGuest) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="page-container">
      <h2 style={{ marginBottom: '24px' }}>Profile Settings</h2>

      {isGuest ? (
        <Card>
          <h3>Guest Mode Active</h3>
          <p style={{ margin: '16px 0', color: 'var(--text-secondary)' }}>You are browsing as a guest. Create an account to save bookings and earn points.</p>
          <Button onClick={logout} variant="solid">Create Account</Button>
        </Card>
      ) : (
        <>
          <Card className="mb-4" style={{ marginBottom: '24px' }}>
            <h3>{currentUser.firstName} {currentUser.lastName}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Tier: {currentUser.tier} • {currentUser.points} Pts</p>
            <p style={{ marginTop: '8px' }}>Club Card: {currentUser.clubCardNumber}</p>
          </Card>
          
          <Card style={{ marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '16px' }}>App Settings</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label>Language</label>
              <select 
                onChange={(e) => setLanguage(e.target.value)} 
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
              >
                <option value="en">English</option>
                <option value="fr-MU">French (Mauritius)</option>
                <option value="fr-RE">French (Reunion)</option>
                <option value="sets-BW">Setswana (Botswana)</option>
              </select>
            </div>
            
            <Button onClick={logout} variant="outline" style={{ marginTop: '24px', width: '100%' }}>Logout</Button>
          </Card>
        </>
      )}
    </div>
  );
}
