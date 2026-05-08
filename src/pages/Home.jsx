import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { promos } from '../data/loyalty';
import { FiCalendar, FiGift, FiCamera, FiArrowRight } from 'react-icons/fi';

export default function Home() {
  const { currentUser, isGuest, t } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '100px' }}>
      
      {/* Hero Welcome Section */}
      <div style={{ marginBottom: '32px', position: 'relative' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', background: 'linear-gradient(135deg, #fff 0%, #E29B7F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {currentUser ? `Hello, ${currentUser.firstName}` : 'Welcome to Sorbet'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Your premium gateway to beauty & wellness.
        </p>

        {currentUser && (
          <Card className="mt-4" style={{ marginTop: '24px', background: 'linear-gradient(135deg, rgba(226,155,127,0.15) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(226,155,127,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  {currentUser.tier} Status
                </p>
                <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{currentUser.points} Pts</div>
              </div>
              <Button variant="outline" onClick={() => navigate('/loyalty')}>View Rewards</Button>
            </div>
          </Card>
        )}
      </div>

      {/* Quick Actions Grid */}
      <h3 style={{ marginBottom: '16px' }}>Quick Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
        <Card onClick={() => navigate('/book')} style={{ textAlign: 'center', padding: '24px 16px' }}>
          <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', marginBottom: '16px' }}>
            <FiCalendar size={32} color="var(--color-accent)" />
          </div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Bookings</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Reserve a service</p>
        </Card>

        <Card onClick={() => navigate('/retail')} style={{ textAlign: 'center', padding: '24px 16px' }}>
          <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', marginBottom: '16px' }}>
            <FiGift size={32} color="var(--color-accent)" />
          </div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Shop Retail</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Explore products</p>
        </Card>

        <Card onClick={() => navigate('/analysis-portal')} style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ padding: '12px', borderRadius: '50%', background: 'var(--color-accent)', color: '#000' }}>
              <FiCamera size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>AI Skin Analysis</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Get professional skin insights via camera</p>
            </div>
          </div>
          <FiArrowRight size={24} color="var(--text-secondary)" />
        </Card>
      </div>

      {/* Promos Section */}
      <h3 style={{ marginBottom: '16px' }}>Exclusive Offers</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {promos.map(promo => (
          <div key={promo.id} style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(226,155,127,0.4) 0%, rgba(0,0,0,0.8) 100%)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}></div>
            <div style={{ 
              background: 'url("https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop") center/cover', 
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, filter: 'blur(2px) grayscale(50%)', opacity: 0.6 
            }} />
            
            <div style={{ position: 'relative', zIndex: 2, padding: '32px 24px' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', display: 'inline-block', padding: '4px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                {promo.type}
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{promo.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '24px', maxWidth: '80%' }}>
                {promo.description}
              </p>
              <Button variant="solid" style={{ background: '#fff', color: '#000', boxShadow: '0 4px 14px rgba(0,0,0,0.5)' }}>
                Claim Offer
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
