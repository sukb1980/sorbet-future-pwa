/* Booking Services Page — Sorbet Future Fit
   Service category browser with filter and search */
import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { EmptyState } from '../../components/ui/Primitives';
import { serviceCategories, getServiceById } from '../../data/services';
import { formatPrice } from '../../data/i18n';
import { FiSearch, FiClock, FiArrowRight, FiHeart, FiStar } from 'react-icons/fi';
import { GuestConversionModal } from '../../components/onboarding/OnboardingScreens';

export default function BookingServices() {
  const { id: serviceIdParam } = useParams();
  const { currentUser, isGuest, currency } = useAppContext();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);
  const [search, setSearch] = useState('');
  const [showGuestModal, setShowGuestModal] = useState(false);

  const categoryTabs = serviceCategories.map((c) => ({ label: c.name, value: c.id, icon: c.icon }));

  const currentCategory = serviceCategories.find((c) => c.id === activeCategory);

  const filteredServices = useMemo(() => {
    const services = [];
    (currentCategory?.subcategories || []).forEach((sub) => {
      sub.services.forEach((svc) => {
        if (!search || svc.name.toLowerCase().includes(search.toLowerCase()) || svc.description.toLowerCase().includes(search.toLowerCase())) {
          services.push({ ...svc, subcategoryName: sub.name });
        }
      });
    });
    return services;
  }, [currentCategory, search]);

  const handleBook = (serviceId) => {
    if (!currentUser && !isGuest) { setShowGuestModal(true); return; }
    if (isGuest) { setShowGuestModal(true); return; }
    navigate('/booking/calendar', { state: { serviceId } });
  };

  const handleServiceDetail = (serviceId) => {
    navigate(`/booking/service/${serviceId}`);
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '100px' }}>
      <h1 style={{ marginBottom: 'var(--space-sm)' }}>Book a Treatment</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Choose from our premium service menu</p>

      {/* Search */}
      <Input placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<FiSearch size={16} />} containerStyle={{ marginBottom: 'var(--space-lg)' }} />

      {/* Category Tabs */}
      <Tabs tabs={categoryTabs} activeTab={activeCategory} onChange={setActiveCategory} variant="pill" />

      {/* Hero image for category */}
      {currentCategory?.image && !search && (
        <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 'var(--space-xl)', height: '140px' }}>
          <img src={currentCategory.image} alt={currentCategory.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(200,144,122,0.5) 0%, rgba(44,44,44,0.4) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 'var(--space-md)', left: 'var(--space-lg)', color: '#fff' }}>
            <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>{currentCategory.icon} {currentCategory.name}</h2>
          </div>
        </div>
      )}

      {/* Services List */}
      {filteredServices.length === 0 ? (
        <EmptyState icon="🔍" title="No services found" description="Try a different search term or category." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {filteredServices.map((svc) => (
            <Card key={svc.id} variant="default" padding="var(--space-lg)">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)', gap: 'var(--space-md)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', background: 'var(--color-blush-light)', color: 'var(--color-accent)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>{svc.subcategoryName}</span>
                    {svc.popular && <span style={{ fontSize: '0.7rem', background: 'var(--color-rose-gold-light)', color: 'var(--color-rose-gold)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>⭐ Popular</span>}
                    {svc.seasonal && <span style={{ fontSize: '0.7rem', background: 'var(--color-warning-bg)', color: 'var(--color-warning)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>🍂 Seasonal</span>}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>{svc.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)', lineHeight: 1.5 }}>{svc.description}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      <FiClock size={13} /> {svc.durationMin} min
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-accent)' }}>{formatPrice(svc.price, currency)}</span>
                  </div>
                  {svc.addOnIds?.length > 0 && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>✨ {svc.addOnIds.length} add-on{svc.addOnIds.length > 1 ? 's' : ''} available</p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
                <Button variant="outline" size="sm" onClick={() => handleServiceDetail(svc.id)} style={{ flex: 1 }}>Details</Button>
                <Button variant="primary" size="sm" onClick={() => handleBook(svc.id)} style={{ flex: 2 }}>Book Now</Button>
              </div>
              {svc.requiresForm && (
                <p style={{ fontSize: '0.75rem', color: 'var(--color-warning)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>⚠️ Consultation form required before service</p>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Group Booking CTA */}
      <Card variant="blush" padding="var(--space-lg)" style={{ marginTop: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ marginBottom: '4px' }}>Group Booking</h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Book for up to 6 people — perfect for celebrations!</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => isGuest ? setShowGuestModal(true) : navigate('/booking/group')}>Book Group</Button>
      </Card>

      <GuestConversionModal isOpen={showGuestModal} onClose={() => setShowGuestModal(false)} onSignIn={() => navigate('/auth/sign-in')} onSignUp={() => navigate('/auth/sign-up')} />
    </div>
  );
}
