/* Stores Page — Sorbet Future Fit */
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { stores, countries, cities } from '../data/stores';
import { FiSearch, FiMapPin, FiPhone, FiClock, FiStar, FiNavigation } from 'react-icons/fi';

export default function Stores() {
  const { preferredStore, setPreferredStore, nearestStore, showToast } = useAppContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const countryList = ['All', ...countries];

  const filtered = useMemo(() => {
    return stores.filter((s) => {
      if (selectedCountry !== 'All' && s.country !== selectedCountry) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.city.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, selectedCountry]);

  const handleSetPreferred = (store) => {
    setPreferredStore(store);
    showToast?.(`${store.name} set as your preferred store ✓`, 'success');
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '100px' }}>
      <h1 style={{ marginBottom: 'var(--space-sm)' }}>Find a Store</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>{stores.length} stores across South Africa, Botswana & Mauritius</p>

      {/* Nearest Store Banner */}
      {nearestStore && (
        <Card variant="accent" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-rose-gold-light)' }}>
              <FiNavigation size={20} color="var(--color-accent)" />
            </div>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>📍 Nearest Store</p>
              <p style={{ fontWeight: 600, fontSize: '1rem' }}>{nearestStore.name}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{nearestStore.distanceKm} km away</p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate(`/store/${nearestStore.id}`)}>View</Button>
        </Card>
      )}

      {/* Search & Filter */}
      <Input placeholder="Search by store name or city..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<FiSearch size={16} />} containerStyle={{ marginBottom: 'var(--space-md)' }} />
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
        {countryList.map((c) => (
          <button key={c} onClick={() => setSelectedCountry(c)}
            style={{ padding: '6px 16px', borderRadius: 'var(--radius-full)', border: `1px solid ${selectedCountry === c ? 'var(--color-accent)' : 'var(--color-border)'}`, background: selectedCountry === c ? 'var(--color-rose-gold-light)' : 'var(--color-surface)', color: selectedCountry === c ? 'var(--color-accent)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: selectedCountry === c ? 600 : 400, fontFamily: 'var(--font-family)', transition: 'var(--transition-fast)' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Store Cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>🔍</p>
          <p>No stores found matching your search.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {filtered.map((store) => {
            const isPreferred = preferredStore?.id === store.id;
            return (
              <Card key={store.id} variant="default" padding="0" style={{ overflow: 'hidden', border: isPreferred ? '2px solid var(--color-accent)' : 'var(--glass-border)' }}>
                <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/store/${store.id}`)}>
                  {store.image && <img src={store.image} alt={store.name} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />}
                  {isPreferred && (
                    <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--color-accent)', color: '#fff', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700 }}>⭐ Preferred</span>
                  )}
                </div>
                <div style={{ padding: 'var(--space-lg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
                    <div>
                      <h4 style={{ marginBottom: '4px', cursor: 'pointer' }} onClick={() => navigate(`/store/${store.id}`)}>{store.name}</h4>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <FiMapPin size={13} color="var(--color-accent)" />
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{store.address}, {store.city}, {store.country}</p>
                      </div>
                    </div>
                    {store.rating && (
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexShrink: 0, marginLeft: 'var(--space-sm)' }}>
                        <FiStar size={13} color="#F5A623" fill="#F5A623" />
                        <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{store.rating}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginBottom: 'var(--space-md)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><FiPhone size={12} />{store.phone}</span>
                    <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><FiClock size={12} />{store.hours?.weekdays || 'Mon–Fri 9–18'}</span>
                  </div>

                  {/* Services */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
                    {(store.services || []).slice(0, 5).map((svc) => (
                      <span key={svc} style={{ background: 'var(--color-blush-light)', color: 'var(--color-accent)', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 500, border: '1px solid var(--color-blush)' }}>{svc}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                    <Button variant={isPreferred ? 'ghost' : 'outline'} size="sm" onClick={() => handleSetPreferred(store)}>
                      {isPreferred ? '✓ Preferred' : 'Set as Preferred'}
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => navigate('/booking/services')}>Book Here</Button>
                    <Button variant="ghost" size="sm" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${store.address}`, '_blank')}>
                      <FiNavigation size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
