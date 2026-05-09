/* Booking Confirm Page — Sorbet Future Fit
   Summary + confirmation number + add to calendar + aftercare */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Stepper } from '../../components/ui/Stepper';
import { getServiceById, getCitizenById, getAddOnById } from '../../data/services';
import { getStoreById } from '../../data/stores';
import { products } from '../../data/products';
import { formatPrice } from '../../data/i18n';
import { zenotiCreateBooking, zenotiEarnPoints } from '../../services/mockApi';
import { FiCalendar, FiMapPin, FiUser, FiClock, FiCheckCircle, FiPlus } from 'react-icons/fi';

const steps = ['Service', 'Citizen', 'Date & Time', 'Confirm'];

const fmtDisplay = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

export default function BookingConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId, citizenId, date, slot, storeId, addOnIds: preSelectedAddOns = [] } = location.state || {};
  const { currentUser, currency, showToast, addPoints } = useAppContext();
  const { addItem } = useCart();

  const service = serviceId ? getServiceById(serviceId) : null;
  const citizen = citizenId && citizenId !== 'any' ? getCitizenById(citizenId) : null;
  const store = getStoreById(storeId || 'store-cpt-01');

  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [addedAftercareIds, setAddedAftercareIds] = useState([]);

  const aftercareProducts = (service?.aftercareProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const availableAddOns = (service?.addOnIds || []).map(getAddOnById).filter(Boolean);
  const pointsToEarn = service ? Math.floor((service.price[currency] || service.price.ZAR) / 10 * (currentUser?.tier === 'Gold' ? 2 : currentUser?.tier === 'Silver' ? 1.5 : 1)) : 0;

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  };

  const totalPrice = service ? (
    (service.price[currency] || service.price.ZAR) +
    selectedAddOns.reduce((sum, id) => {
      const ao = getAddOnById(id);
      return sum + (ao?.price[currency] || ao?.price.ZAR || 0);
    }, 0)
  ) : 0;

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const result = await zenotiCreateBooking({ serviceId, citizenId, date, slot, storeId, addOns: selectedAddOns });
      
      const newBooking = {
        id: result.confirmationNumber,
        serviceId: service.id,
        serviceName: service.name,
        citizenName: citizen?.name || 'Any Available Citizen',
        storeName: store?.name || 'Sorbet Clinic',
        date: date,
        time: slot,
        totalPrice: totalPrice,
        status: 'upcoming',
        confirmationNumber: result.confirmationNumber,
        pointsEarned: pointsToEarn,
        createdAt: new Date().toISOString()
      };
      
      const existingBookings = JSON.parse(localStorage.getItem('srb_my_bookings') || '[]');
      localStorage.setItem('srb_my_bookings', JSON.stringify([newBooking, ...existingBookings]));

      setConfirmationNumber(result.confirmationNumber);
      setConfirmed(true);
      addPoints(pointsToEarn);
      showToast(`Booking confirmed! You earned ${pointsToEarn} loyalty points. 🌸`, 'success');
    } catch (e) {
      showToast('Something went wrong. Please try again.', 'error');
    }
    setConfirming(false);
  };

  const handleAddAftercare = (product) => {
    addItem({ id: product.id, type: 'product', name: product.name, price: product.price[currency] || product.price.ZAR, image: product.image, quantity: 1 });
    setAddedAftercareIds((prev) => [...prev, product.id]);
    showToast(`${product.name} added to cart`, 'success');
  };

  if (!service) {
    return <div className="page-container"><Button onClick={() => navigate('/booking/services')}>← Back to Services</Button></div>;
  }

  if (confirmed) {
    return (
      <div className="page-container animate-fade-in" style={{ textAlign: 'center', paddingTop: 'var(--space-2xl)' }}>
        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>✅</div>
        <h1 style={{ marginBottom: 'var(--space-sm)' }}>Booking Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Your appointment has been successfully booked.</p>

        <Card variant="accent" padding="var(--space-xl)" style={{ marginBottom: 'var(--space-xl)', textAlign: 'left' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-sm)' }}>Confirmation Number</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace', marginBottom: 'var(--space-lg)' }}>{confirmationNumber}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><FiCalendar size={16} color="var(--color-accent)" /><span style={{ fontSize: '0.9rem' }}>{fmtDisplay(date)} at {slot}</span></div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><FiUser size={16} color="var(--color-accent)" /><span style={{ fontSize: '0.9rem' }}>{citizen?.name || 'Any Available Citizen'}</span></div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><FiMapPin size={16} color="var(--color-accent)" /><span style={{ fontSize: '0.9rem' }}>{store?.name}</span></div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><FiCheckCircle size={16} color="var(--color-success)" /><span style={{ fontSize: '0.9rem', color: 'var(--color-success)', fontWeight: 600 }}>+{pointsToEarn} loyalty points earned</span></div>
          </div>
        </Card>

        <div style={{ display: 'flex', gap: 'var(--space-sm)', flexDirection: 'column', marginBottom: 'var(--space-xl)' }}>
          <Button variant="outline" fullWidth onClick={() => showToast('Calendar event created! (Demo)', 'success')}>📅 Add to Calendar</Button>
          <Button variant="ghost" fullWidth onClick={() => navigate('/bookings')}>View My Bookings</Button>
        </div>

        {aftercareProducts.length > 0 && (
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ marginBottom: 'var(--space-md)' }}>Recommended Aftercare</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {aftercareProducts.map((product) => (
                <Card key={product.id} variant="default" padding="var(--space-md)" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <img src={product.image} alt={product.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{product.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatPrice(product.price, currency)}</p>
                  </div>
                  <Button variant={addedAftercareIds.includes(product.id) ? 'ghost' : 'outline'} size="sm" onClick={() => !addedAftercareIds.includes(product.id) && handleAddAftercare(product)}>
                    {addedAftercareIds.includes(product.id) ? '✓ Added' : 'Add to Cart'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/')} style={{ marginTop: 'var(--space-xl)' }}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
      <Stepper steps={steps} currentStep={4} />
      <h2 style={{ marginBottom: 'var(--space-xl)' }}>Booking Summary</h2>

      <Card variant="accent" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
        <h4 style={{ marginBottom: 'var(--space-md)' }}>{service.name}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><FiCalendar size={15} color="var(--color-accent)" /><span style={{ fontSize: '0.875rem' }}>{fmtDisplay(date)} at {slot}</span></div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><FiUser size={15} color="var(--color-accent)" /><span style={{ fontSize: '0.875rem' }}>{citizen?.name || 'Any Available Citizen'}</span></div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><FiMapPin size={15} color="var(--color-accent)" /><span style={{ fontSize: '0.875rem' }}>{store?.name}</span></div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><FiClock size={15} color="var(--color-accent)" /><span style={{ fontSize: '0.875rem' }}>{service.durationMin} min</span></div>
        </div>
      </Card>

      {/* Add-ons */}
      {availableAddOns.length > 0 && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Enhance Your Experience</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {availableAddOns.map((ao) => (
              <Card key={ao.id} variant={selectedAddOns.includes(ao.id) ? 'accent' : 'default'} padding="var(--space-md)"
                onClick={() => toggleAddOn(ao.id)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: selectedAddOns.includes(ao.id) ? '2px solid var(--color-accent)' : 'var(--glass-border)' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{ao.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+{ao.durationMin} min</p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>+{formatPrice(ao.price, currency)}</span>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${selectedAddOns.includes(ao.id) ? 'var(--color-accent)' : 'var(--color-border)'}`, background: selectedAddOns.includes(ao.id) ? 'var(--color-accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {selectedAddOns.includes(ao.id) && <span style={{ color: '#fff', fontSize: '0.75rem' }}>✓</span>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Summary */}
      <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>{service.name}</span>
          <span>{formatPrice(service.price, currency)}</span>
        </div>
        {selectedAddOns.map((id) => {
          const ao = getAddOnById(id);
          return ao ? (
            <div key={id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{ao.name}</span>
              <span>+{formatPrice(ao.price, currency)}</span>
            </div>
          ) : null;
        })}
        <div className="divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
          <span>Total</span>
          <span style={{ color: 'var(--color-accent)' }}>{formatPrice({ ZAR: totalPrice, BWP: Math.round(totalPrice * 0.73), MUR: Math.round(totalPrice * 2.84) }, currency)}</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '8px' }}>✨ You'll earn ~{pointsToEarn} loyalty points for this booking</p>
      </Card>

      <div className="sticky-action-bar">
        <Button variant="primary" fullWidth size="lg" loading={confirming} onClick={handleConfirm}>Confirm & Book</Button>
      </div>
    </div>
  );
}
