/* Group Booking Page — Sorbet Future Fit */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { serviceCategories } from '../../data/services';
import { FiPlus, FiTrash2, FiUsers } from 'react-icons/fi';

const allServices = serviceCategories.flatMap((c) => c.subcategories.flatMap((s) => s.services));
const serviceOptions = [{ value: '', label: 'Select a service' }, ...allServices.map((s) => ({ value: s.id, label: s.name }))];
const drinkOptions = ['Non-alcoholic', 'Alcoholic', 'No preference'];
const occasionOptions = ['', 'Birthday', 'Bachelorette / Hen', 'Anniversary', 'Girls\' Day', 'Corporate', 'Other'];

export default function BookingGroup() {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const [members, setMembers] = useState([
    { name: currentUser?.firstName + ' ' + (currentUser?.lastName || ''), mobile: currentUser?.mobile || '', serviceId: '' },
  ]);
  const [preferences, setPreferences] = useState({ seats: 'together', drinks: 'Non-alcoholic', occasion: '', notes: '' });

  const addMember = () => {
    if (members.length < 6) setMembers((m) => [...m, { name: '', mobile: '', serviceId: '' }]);
  };

  const removeMember = (idx) => setMembers((m) => m.filter((_, i) => i !== idx));

  const setMember = (idx, key, val) => {
    setMembers((m) => m.map((mem, i) => i === idx ? { ...mem, [key]: val } : mem));
  };

  const handleContinue = () => {
    const valid = members.every((m) => m.name && m.serviceId);
    if (!valid) { alert('Please fill in all member names and select a service for each person.'); return; }
    navigate('/booking/calendar', { state: { isGroup: true, members, preferences, storeId: 'store-cpt-01' } });
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-rose-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiUsers size={24} color="var(--color-accent)" /></div>
        <div>
          <h1>Group Booking</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Up to 6 people — perfect for celebrations</p>
        </div>
      </div>

      {/* Group Members */}
      <h3 style={{ marginBottom: 'var(--space-md)' }}>Group Members ({members.length}/6)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
        {members.map((member, idx) => (
          <Card key={idx} variant="default" padding="var(--space-lg)">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
              <h4 style={{ fontSize: '0.95rem' }}>{idx === 0 ? '🌸 You (Main Guest)' : `Guest ${idx + 1}`}</h4>
              {idx > 0 && <button onClick={() => removeMember(idx)} style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}><FiTrash2 size={14} /> Remove</button>}
            </div>
            <Input label="Name" value={member.name} onChange={(e) => setMember(idx, 'name', e.target.value)} placeholder="First & last name" required />
            <Input label="Mobile Number" type="tel" value={member.mobile} onChange={(e) => setMember(idx, 'mobile', e.target.value)} placeholder="+27..." required={idx === 0} helper={idx > 0 ? 'Optional — needed to send booking details' : undefined} />
            <Select label="Treatment" value={member.serviceId} onChange={(e) => setMember(idx, 'serviceId', e.target.value)} options={serviceOptions} required />
            {idx > 0 && (
              <div style={{ background: 'var(--color-info-bg)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', fontSize: '0.8rem', color: 'var(--color-info)', border: '1px solid var(--color-info)' }}>
                💡 Consultation forms can be completed in-store for additional guests.
              </div>
            )}
          </Card>
        ))}
      </div>

      {members.length < 6 && (
        <Button variant="outline" fullWidth onClick={addMember} icon={<FiPlus size={16} />} style={{ marginBottom: 'var(--space-xl)' }}>
          Add Another Guest
        </Button>
      )}

      {/* Group Preferences */}
      <h3 style={{ marginBottom: 'var(--space-md)' }}>Group Preferences</h3>
      <Card variant="blush" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
        <Select label="Seating Preference" value={preferences.seats} onChange={(e) => setPreferences((p) => ({ ...p, seats: e.target.value }))} options={[{ value: 'together', label: 'Seated together' }, { value: 'flexible', label: 'Flexible' }]} />
        <Select label="Drinks" value={preferences.drinks} onChange={(e) => setPreferences((p) => ({ ...p, drinks: e.target.value }))} options={drinkOptions} />
        <Select label="Occasion (Optional)" value={preferences.occasion} onChange={(e) => setPreferences((p) => ({ ...p, occasion: e.target.value }))} options={occasionOptions} />
        <Textarea label="Special Notes (Optional)" value={preferences.notes} onChange={(e) => setPreferences((p) => ({ ...p, notes: e.target.value }))} placeholder="e.g. Birthday setup, dietary requirements, accessibility needs..." rows={3} />
      </Card>

      {/* Deposit Info */}
      <div style={{ background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-xl)', fontSize: '0.875rem', color: 'var(--color-warning)' }}>
        💳 A 30% deposit is required to confirm group bookings. This will be applied to the final bill.
      </div>

      <div className="sticky-action-bar">
        <Button variant="primary" fullWidth size="lg" onClick={handleContinue}>Select Date & Time →</Button>
      </div>
    </div>
  );
}
