/* Profile Page — Sorbet Future Fit */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select, Checkbox } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { Avatar, ProgressBar } from '../components/ui/Primitives';
import { getNextTier, getProgressToNextTier, getTierById } from '../data/loyalty';
import { FiEdit, FiLogOut, FiStar, FiAward, FiSettings, FiGlobe, FiBell, FiUser, FiShoppingBag, FiCalendar } from 'react-icons/fi';
import { formatPrice } from '../data/i18n';
import BookingHistory from './BookingHistory';

const tierColors = { Bronze: '#CD7F32', Silver: '#9E9E9E', Gold: '#B8860B' };

export default function Profile() {
  const { currentUser, logout, currency, setCurrency, locale, setLocale, showToast } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ firstName: currentUser?.firstName || '', lastName: currentUser?.lastName || '', email: currentUser?.email || '', mobile: currentUser?.mobile || '', birthday: currentUser?.birthday || '' });
  const [saving, setSaving] = useState(false);

  if (!currentUser) {
    return (
      <div className="page-container" style={{ textAlign: 'center', paddingTop: 'var(--space-3xl)' }}>
        <h2 style={{ marginBottom: 'var(--space-md)' }}>Sign In to View Profile</h2>
        <Button onClick={() => navigate('/auth/sign-in')}>Sign In</Button>
      </div>
    );
  }

  const currentTier = getTierById(currentUser.tier);
  const nextTier = getNextTier(currentUser.tier);
  const progress = getProgressToNextTier(currentUser.points, currentUser.tier);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setEditMode(false);
    showToast?.('Profile updated!', 'success');
  };

  const handleLogout = () => { logout(); navigate('/auth/sign-in'); };

  const tabs = [
    { label: 'My Profile', value: 'profile', icon: <FiUser size={14} /> },
    { label: 'Bookings', value: 'bookings', icon: <FiCalendar size={14} /> },
    { label: 'Order History', value: 'orders', icon: <FiShoppingBag size={14} /> },
    { label: 'Preferences', value: 'preferences', icon: <FiSettings size={14} /> },
    { label: 'Loyalty Card', value: 'clubcard', icon: <FiStar size={14} /> },
  ];

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
      {/* Profile Hero */}
      <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center', marginBottom: 'var(--space-xl)', padding: 'var(--space-lg)', background: `linear-gradient(135deg, ${tierColors[currentUser.tier]}22, var(--color-blush-light))`, borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-blush)' }}>
        <div style={{ position: 'relative' }}>
          <Avatar name={`${currentUser.firstName} ${currentUser.lastName}`} size={72} />
          <span style={{ position: 'absolute', bottom: -2, right: -2, background: tierColors[currentUser.tier], color: '#fff', fontSize: '0.6rem', fontWeight: 800, padding: '2px 6px', borderRadius: 'var(--radius-full)' }}>{currentUser.tier}</span>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: '4px' }}>{currentUser.firstName} {currentUser.lastName}</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{currentUser.mobile}</p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '1.1rem' }}>{currentUser.points.toLocaleString()} pts</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Loyalty Points</span>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div>
          <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <h3 style={{ fontSize: '1rem' }}>Personal Information</h3>
              <Button variant="ghost" size="sm" icon={<FiEdit size={14} />} onClick={() => setEditMode((e) => !e)}>
                {editMode ? 'Cancel' : 'Edit'}
              </Button>
            </div>
            {editMode ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
                  <Input label="First Name" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
                  <Input label="Last Name" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
                </div>
                <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                <Input label="Mobile" value={form.mobile} onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))} disabled helper="Mobile number cannot be changed here. Contact support." />
                <Input label="Date of Birth" type="date" value={form.birthday} onChange={(e) => setForm((f) => ({ ...f, birthday: e.target.value }))} />
                <Button variant="primary" fullWidth loading={saving} onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Name', value: `${currentUser.firstName} ${currentUser.lastName}` },
                  { label: 'Email', value: currentUser.email },
                  { label: 'Mobile', value: currentUser.mobile },
                  { label: 'Birthday', value: currentUser.birthday ? new Date(currentUser.birthday + 'T00:00:00').toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '8px 0', borderBottom: '1px solid var(--color-border-light)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Button variant="ghost" fullWidth icon={<FiLogOut size={16} />} onClick={handleLogout} style={{ color: 'var(--color-error)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
            Sign Out
          </Button>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <BookingHistory embedded={true} />
      )}

      {/* Order History Tab */}
      {activeTab === 'orders' && (
        <OrderHistoryList currency={currency} />
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div>
          <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-lg)' }}>
              <FiGlobe size={18} color="var(--color-accent)" />
              <h3 style={{ fontSize: '1rem' }}>Language & Currency</h3>
            </div>
            <Select label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)} options={[{ value: 'ZAR', label: 'South African Rand (ZAR)' }, { value: 'BWP', label: 'Botswana Pula (BWP)' }, { value: 'MUR', label: 'Mauritian Rupee (MUR)' }]} />
            <Select label="Language" value={locale} onChange={(e) => setLocale(e.target.value)} options={[{ value: 'en', label: 'English' }, { value: 'af', label: 'Afrikaans' }, { value: 'zu', label: 'isiZulu' }]} />
          </Card>
          <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-lg)' }}>
              <FiBell size={18} color="var(--color-accent)" />
              <h3 style={{ fontSize: '1rem' }}>Notifications</h3>
            </div>
            {['Booking reminders', 'Loyalty updates', 'Exclusive promotions', 'Product launches', 'Weekly beauty tips'].map((pref, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--color-border-light)' : 'none' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{pref}</span>
                <div style={{ width: '40px', height: '22px', borderRadius: '11px', background: i < 3 ? 'var(--color-accent)' : 'var(--color-border)', cursor: 'pointer', position: 'relative', flexShrink: 0 }} onClick={() => showToast?.('Preference updated', 'success')}>
                  <div style={{ position: 'absolute', top: '3px', left: i < 3 ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'var(--transition-fast)' }} />
                </div>
              </div>
            ))}
          </Card>
          <Card variant="default" padding="var(--space-lg)">
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-lg)' }}>Beauty Preferences</h3>
            {['Skin concerns', 'Preferred services', 'Preferred Citizen'].map((p) => (
              <div key={p} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--color-border-light)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{p}</span>
                <Button variant="ghost" size="sm" onClick={() => showToast?.(`Update ${p} (coming soon)`, 'info')}>Edit</Button>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Digital Loyalty Card */}
      {activeTab === 'clubcard' && (
        <div>
          <div style={{ background: `linear-gradient(135deg, ${tierColors[currentUser.tier] || '#C8907A'} 0%, #C8907A 100%)`, borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '200px' }}>
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '20%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-xl)' }}>
              <div>
                <p style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sorbet Future</p>
                <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '4px' }}>{currentUser.firstName} {currentUser.lastName}</h2>
                <p style={{ opacity: 0.8, fontSize: '0.875rem' }}>{currentUser.tier} Member</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{currentUser.points.toLocaleString()}</div>
                <p style={{ opacity: 0.8, fontSize: '0.75rem' }}>points</p>
              </div>
            </div>
            {/* Card number */}
            <p style={{ fontFamily: 'monospace', fontSize: '1rem', letterSpacing: '0.15em', opacity: 0.9 }}>
              {currentUser.id?.toUpperCase().replace('u', 'SRB-00').padEnd(16, '0') || 'SRB-00000000'}
            </p>
          </div>

          {nextTier && (
            <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Progress to {nextTier.id}</h3>
              <ProgressBar value={progress} label={`${nextTier.minPoints - currentUser.points} more points needed`} />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>You're {progress}% of the way there!</p>
            </Card>
          )}

          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <Button variant="primary" style={{ flex: 1 }} onClick={() => navigate('/loyalty')}>View Loyalty Details</Button>
            <Button variant="outline" style={{ flex: 1 }} onClick={() => showToast?.('Sharing card (demo)', 'info')}>Share Card</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponent for Order History
function OrderHistoryList({ currency }) {
  const [orders, setOrders] = useState([]);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('srb_orders') || '[]');
    setOrders(saved);
  }, []);

  if (orders.length === 0) {
    return (
      <Card variant="default" padding="var(--space-xl)" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🛍️</div>
        <h3 style={{ marginBottom: '8px' }}>No orders yet</h3>
        <p style={{ color: 'var(--text-secondary)' }}>When you make a purchase, it will appear here.</p>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {orders.map((order) => (
        <Card key={order.orderId} variant="default" padding="var(--space-lg)">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                {new Date(order.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <h4 style={{ fontSize: '1.1rem' }}>Order {order.orderId}</h4>
            </div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              {formatPrice(order.total, currency)}
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: 'var(--space-sm)', marginTop: 'var(--space-sm)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span>{item.quantity}x {item.name}</span>
                <span>{formatPrice(item.price * item.quantity, currency)}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-md)' }}>
            <span style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--color-success-bg)', color: 'var(--color-success)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} /> Completed
            </span>
            <Button variant="outline" size="sm">View Receipt</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
