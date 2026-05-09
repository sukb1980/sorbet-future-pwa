/* StoreDetail Page — Sorbet Future Fit */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StarRating } from '../components/ui/Primitives';
import { getStoreById } from '../data/stores';
import { citizens } from '../data/services';
import { FiArrowLeft, FiMapPin, FiPhone, FiClock, FiNavigation, FiInstagram } from 'react-icons/fi';

export default function StoreDetail() {
  const { id } = useParams();
  const { setPreferredStore, preferredStore, showToast } = useAppContext();
  const navigate = useNavigate();
  const store = getStoreById(id);
  const storeCitizens = store ? citizens.filter((c) => c.storeIds.includes(store.id)) : [];

  if (!store) {
    return <div className="page-container"><p>Store not found.</p><Button onClick={() => navigate('/stores')}>Back to Stores</Button></div>;
  }

  const isPreferred = preferredStore?.id === store.id;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
      {/* Hero Image */}
      <div style={{ position: 'relative' }}>
        <img src={store.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800'} alt={store.name} style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)' }} />
        <button onClick={() => navigate('/stores')} style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 'var(--radius-full)', padding: '8px 14px', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'var(--font-family)' }}>
          <FiArrowLeft size={16} /> Stores
        </button>
        {isPreferred && (
          <span style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--color-accent)', color: '#fff', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>⭐ Your Preferred Store</span>
        )}
      </div>

      <div className="page-container">
        {/* Store Name & Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
          <div>
            <h1 style={{ marginBottom: '4px' }}>{store.name}</h1>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <FiMapPin size={13} color="var(--color-accent)" />
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{store.address}, {store.city}</p>
            </div>
          </div>
          {store.rating && (
            <div style={{ textAlign: 'right' }}>
              <StarRating rating={store.rating} size={14} />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{store.reviewCount} reviews</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => navigate('/booking/services')}>Book Treatment</Button>
          <Button variant={isPreferred ? 'ghost' : 'outline'} onClick={() => { setPreferredStore(store); showToast?.(`${store.name} set as preferred ✓`, 'success'); }}>
            {isPreferred ? '✓ Preferred' : 'Set as Preferred'}
          </Button>
          <Button variant="ghost" icon={<FiNavigation size={16} />} onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${store.address}`, '_blank')}>
            Directions
          </Button>
        </div>

        {/* Contact & Hours */}
        <Card variant="blush" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><FiPhone size={15} color="var(--color-accent)" /><a href={`tel:${store.phone}`} style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{store.phone}</a></div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <FiClock size={15} color="var(--color-accent)" style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '0.9rem' }}>Mon–Fri: {store.hours?.weekdays || '09:00 – 19:00'}</p>
                <p style={{ fontSize: '0.9rem' }}>Sat: {store.hours?.saturday || '09:00 – 17:00'}</p>
                <p style={{ fontSize: '0.9rem' }}>Sun: {store.hours?.sunday || '10:00 – 15:00'}</p>
              </div>
            </div>
            {store.instagram && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <FiInstagram size={15} color="var(--color-accent)" />
                <a href={`https://instagram.com/${store.instagram}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontSize: '0.9rem' }}>@{store.instagram}</a>
              </div>
            )}
          </div>
        </Card>

        {/* Services */}
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Available Services</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
          {(store.services || []).map((svc) => (
            <span key={svc} style={{ background: 'var(--color-blush-light)', color: 'var(--color-accent)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 500, border: '1px solid var(--color-blush)' }}>{svc}</span>
          ))}
        </div>

        {/* Citizens */}
        {storeCitizens.length > 0 && (
          <>
            <h3 style={{ marginBottom: 'var(--space-md)' }}>Our Citizens</h3>
            <div className="scroll-row" style={{ marginBottom: 'var(--space-xl)' }}>
              {storeCitizens.map((cit) => (
                <div key={cit.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '90px', textAlign: 'center' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-rose-gold), var(--color-blush-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.1rem', border: '3px solid var(--color-blush)' }}>
                    {cit.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{cit.name}</p>
                    <StarRating rating={cit.rating} size={11} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Amenities */}
        {store.amenities && (
          <>
            <h3 style={{ marginBottom: 'var(--space-md)' }}>Amenities</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
              {store.amenities.map((a) => (
                <span key={a} style={{ background: 'var(--color-cream-deep)', color: 'var(--text-secondary)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', border: '1px solid var(--color-border)' }}>✓ {a}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
