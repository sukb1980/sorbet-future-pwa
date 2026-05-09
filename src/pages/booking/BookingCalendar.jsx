/* Booking Calendar Page — Citizen Selection, Date & Time
   Sorbet Future Fit */
import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar, StarRating, Skeleton, EmptyState } from '../../components/ui/Primitives';
import { Stepper } from '../../components/ui/Stepper';
import { Tabs } from '../../components/ui/Tabs';
import { citizens, getCitizensForService, getAvailabilityForBooking, getServiceById } from '../../data/services';
import { FiCalendar, FiClock, FiInfo } from 'react-icons/fi';

const steps = ['Service', 'Citizen', 'Date & Time', 'Confirm'];
const periods = ['Morning', 'Afternoon', 'Evening'];

const today = new Date();
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const fmtDate = (d) => d.toISOString().split('T')[0];
const fmtDisplay = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-ZA', { weekday: 'short', month: 'short', day: 'numeric' });
};

export default function BookingCalendar() {
  const { currentUser, preferredStore, showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId } = location.state || {};
  const service = serviceId ? getServiceById(serviceId) : null;
  const storeId = preferredStore?.id || 'store-cpt-01';

  const [selectedCitizen, setSelectedCitizen] = useState(currentUser?.preferredCitizenId || null);
  const [selectedDate, setSelectedDate] = useState(fmtDate(addDays(today, 1)));
  const [selectedPeriod, setSelectedPeriod] = useState('Morning');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState(2); // Already past service selection
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlisted, setWaitlisted] = useState(false);

  const availableCitizens = serviceId ? getCitizensForService(serviceId, storeId) : citizens.filter((c) => c.storeIds.includes(storeId));

  // Get next 7 days
  const next7Days = useMemo(() => Array.from({ length: 7 }, (_, i) => fmtDate(addDays(today, i + 1))), []);

  const availability = selectedCitizen
    ? getAvailabilityForBooking(storeId, selectedCitizen, serviceId)
    : null;

  const slotsForDate = useMemo(() => {
    if (!availability) return [];
    return availability.slots.filter((s) => s.date === selectedDate && s.period === selectedPeriod);
  }, [availability, selectedDate, selectedPeriod]);

  const allSlotsBooked = slotsForDate.length > 0 && slotsForDate.every((s) => !s.available);

  const handleConfirm = () => {
    if (!selectedSlot) { showToast('Please select a time slot.', 'warning'); return; }
    navigate('/booking/confirm', {
      state: { serviceId, citizenId: selectedCitizen, date: selectedDate, slot: selectedSlot, storeId },
    });
  };

  if (!service && serviceId) {
    return <div className="page-container"><EmptyState icon="😕" title="Service not found" description="Please go back and select a service." action={<Button onClick={() => navigate('/booking/services')}>Back to Services</Button>} /></div>;
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
      <Stepper steps={steps} currentStep={step} />

      {service && (
        <Card variant="blush" padding="var(--space-md)" style={{ marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <FiCalendar size={20} color="var(--color-accent)" />
          <div>
            <p style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{service.name}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{service.durationMin} min · {preferredStore?.name || 'Sorbet Canal Walk'}</p>
          </div>
        </Card>
      )}

      {/* ---- Citizen Selection ---- */}
      <h3 style={{ marginBottom: 'var(--space-md)' }}>Select Your Citizen</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        {/* Any Citizen option */}
        <Card variant={selectedCitizen === 'any' ? 'accent' : 'default'} onClick={() => { setSelectedCitizen('any'); setSelectedSlot(null); }} padding="var(--space-md)" style={{ border: selectedCitizen === 'any' ? '2px solid var(--color-accent)' : 'var(--glass-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-cream-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>✨</div>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Any Citizen</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>First available — most flexible</p>
          </div>
        </Card>

        {availableCitizens.map((cit) => {
          const isPreferred = cit.id === currentUser?.preferredCitizenId;
          const isSelected = selectedCitizen === cit.id;
          return (
            <Card key={cit.id} variant={isSelected ? 'accent' : 'default'} onClick={() => { setSelectedCitizen(cit.id); setSelectedSlot(null); }} padding="var(--space-md)"
              style={{ border: isSelected ? '2px solid var(--color-accent)' : 'var(--glass-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <div style={{ position: 'relative' }}>
                <Avatar src={cit.avatar} name={cit.name} size={48} />
                {isPreferred && <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--color-accent)', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>⭐</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '2px' }}>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cit.name}</p>
                  {isPreferred && <span style={{ fontSize: '0.7rem', background: 'var(--color-rose-gold-light)', color: 'var(--color-accent)', padding: '1px 6px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>Preferred</span>}
                </div>
                <StarRating rating={cit.rating} size={12} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{cit.experience} · {cit.specialties}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ---- Date Selection ---- */}
      <h3 style={{ marginBottom: 'var(--space-md)' }}>Select Date</h3>
      <div className="scroll-row" style={{ marginBottom: 'var(--space-xl)', paddingBottom: 'var(--space-sm)' }}>
        {next7Days.map((date) => {
          const isSelected = date === selectedDate;
          const d = new Date(date + 'T00:00:00');
          return (
            <button key={date} onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '64px', padding: '12px 10px', borderRadius: 'var(--radius-md)', border: `2px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`, background: isSelected ? 'var(--color-rose-gold-light)' : 'var(--color-surface)', cursor: 'pointer', fontFamily: 'var(--font-family)', transition: 'var(--transition-base)', flexShrink: 0 }}>
              <span style={{ fontSize: '0.7rem', color: isSelected ? 'var(--color-accent)' : 'var(--text-muted)', fontWeight: 600 }}>{d.toLocaleDateString('en-ZA', { weekday: 'short' }).toUpperCase()}</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: isSelected ? 'var(--color-accent)' : 'var(--text-primary)' }}>{d.getDate()}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{d.toLocaleDateString('en-ZA', { month: 'short' })}</span>
            </button>
          );
        })}
      </div>

      {/* ---- Period Tabs ---- */}
      <Tabs tabs={periods.map((p) => ({ label: p, value: p }))} activeTab={selectedPeriod} onChange={(p) => { setSelectedPeriod(p); setSelectedSlot(null); }} variant="pill" />

      {/* ---- Time Slots ---- */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        {slotsForDate.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--text-muted)', background: 'var(--color-cream-deep)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ marginBottom: '4px' }}>⏰ No slots in this period</p>
            <p style={{ fontSize: '0.8rem' }}>Try a different date or time of day</p>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            {slotsForDate.map((slot) => (
              <button key={slot.time} disabled={!slot.available} onClick={() => setSelectedSlot(slot.time)}
                style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: `2px solid ${selectedSlot === slot.time ? 'var(--color-accent)' : slot.available ? 'var(--color-border)' : 'transparent'}`, background: selectedSlot === slot.time ? 'var(--color-rose-gold-light)' : slot.available ? 'var(--color-surface)' : 'var(--color-cream-deep)', color: selectedSlot === slot.time ? 'var(--color-accent)' : slot.available ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: selectedSlot === slot.time ? 700 : 500, cursor: slot.available ? 'pointer' : 'not-allowed', fontFamily: 'var(--font-family)', fontSize: '0.9rem', textDecoration: !slot.available ? 'line-through' : 'none' }}>
                {slot.time}
              </button>
            ))}
          </div>
        )}

        {allSlotsBooked && !waitlisted && (
          <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)', background: 'var(--color-warning-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-warning)' }}>
            <p style={{ color: 'var(--color-warning)', fontWeight: 600, marginBottom: '8px' }}>⏰ All slots fully booked for this date</p>
            <Button variant="outline" size="sm" onClick={() => { setWaitlisted(true); showToast('You\'ve been added to the waitlist! We\'ll notify you instantly if a slot opens.', 'success'); }} style={{ color: 'var(--color-warning)', borderColor: 'var(--color-warning)' }}>
              Join Waitlist
            </Button>
          </div>
        )}
        {waitlisted && (
          <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)', background: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-success)' }}>
            <p style={{ color: 'var(--color-success)', fontWeight: 600 }}>✅ You're on the waitlist! We'll notify you the moment a slot opens.</p>
          </div>
        )}
      </div>

      {/* ---- Confirm Button ---- */}
      <div className="sticky-action-bar">
        <Button variant="primary" fullWidth size="lg" onClick={handleConfirm} disabled={!selectedSlot && !waitlisted}>
          {waitlisted ? 'Stay on Waitlist' : `Confirm — ${fmtDisplay(selectedDate)} at ${selectedSlot || '?'}`}
        </Button>
      </div>
    </div>
  );
}
