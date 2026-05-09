/* Booking History Page — Sorbet Future Fit */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState, StarRating } from '../components/ui/Primitives';
import { bookings, groupBookings } from '../data/bookings';
import { FiCalendar, FiMapPin, FiUser, FiRefreshCw, FiStar } from 'react-icons/fi';

const statusColors = { upcoming: 'var(--color-info)', completed: 'var(--color-success)', cancelled: 'var(--color-error)' };
const statusBgs = { upcoming: 'var(--color-info-bg)', completed: 'var(--color-success-bg)', cancelled: 'var(--color-error-bg)' };

const fmtDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-ZA', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

export default function BookingHistory({ embedded = false }) {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [ratingModal, setRatingModal] = useState(null);

  const [localBookings, setLocalBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('srb_my_bookings') || '[]');
    setLocalBookings(saved);
  }, []);

  const allBookings = [...localBookings, ...bookings];

  const tabs = [
    { label: 'Upcoming', value: 'upcoming', count: allBookings.filter((b) => b.status === 'upcoming').length },
    { label: 'Past', value: 'past' },
    { label: 'Group', value: 'group' },
  ];

  const displayed = activeTab === 'upcoming'
    ? allBookings.filter((b) => b.status === 'upcoming')
    : activeTab === 'past'
    ? allBookings.filter((b) => b.status !== 'upcoming')
    : groupBookings;

  return (
    <div className={embedded ? "animate-fade-in" : "page-container animate-fade-in"} style={{ paddingBottom: embedded ? '0' : '100px' }}>
      {!embedded && <h1 style={{ marginBottom: 'var(--space-xl)' }}>My Bookings</h1>}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pill" />

      {displayed.length === 0 ? (
        <EmptyState icon="📅" title="No bookings yet" description="Your bookings will appear here once you've made a reservation." action={<Button onClick={() => navigate('/booking/services')}>Book Now</Button>} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {displayed.map((booking) => (
            <Card key={booking.id} variant="default" padding="var(--space-lg)">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{booking.serviceName || 'Group Booking'}</h4>
                <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, background: statusBgs[booking.status], color: statusColors[booking.status], textTransform: 'capitalize', flexShrink: 0 }}>
                  {booking.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-md)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><FiCalendar size={14} color="var(--color-accent)" />{fmtDate(booking.date)} {booking.time && `at ${booking.time}`}</div>
                {booking.citizenName && <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><FiUser size={14} color="var(--color-accent)" />{booking.citizenName}</div>}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><FiMapPin size={14} color="var(--color-accent)" />{booking.storeName}</div>
                {booking.confirmationNumber && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>#{booking.confirmationNumber}</div>}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                {booking.status === 'upcoming' && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => navigate('/booking/calendar', { state: { serviceId: booking.serviceId } })}>Reschedule</Button>
                    <Button variant="ghost" size="sm" style={{ color: 'var(--color-error)' }}>Cancel</Button>
                  </>
                )}
                {booking.status === 'completed' && !booking.ratingGiven && (
                  <Button variant="outline" size="sm" icon={<FiStar size={13} />} onClick={() => setRatingModal(booking.id)}>Rate Service</Button>
                )}
                {booking.status === 'completed' && booking.ratingGiven && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <StarRating rating={booking.rating || 5} size={14} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rated</span>
                  </div>
                )}
                {(booking.rebookRoute || booking.status !== 'upcoming') && (
                  <Button variant="primary" size="sm" icon={<FiRefreshCw size={13} />} onClick={() => navigate('/booking/calendar', { state: { serviceId: booking.serviceId } })}>Rebook</Button>
                )}
                {booking.pointsEarned && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>⭐ +{booking.pointsEarned} pts earned</span>
                )}
              </div>

              {/* Post-service suggestion */}
              {booking.postServiceSuggestion && (
                <div style={{ marginTop: 'var(--space-md)', padding: '8px 12px', background: 'var(--color-blush-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--color-blush)' }}>
                  💆 {booking.postServiceSuggestion}
                </div>
              )}

              {/* Group Members */}
              {booking.members && (
                <div style={{ marginTop: 'var(--space-md)' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>Group Members:</p>
                  {booking.members.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '4px 0', borderBottom: '1px solid var(--color-border-light)' }}>
                      <span>{m.name} — {m.serviceName}</span>
                      <span style={{ fontSize: '0.75rem', color: m.formStatus === 'complete' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                        {m.formStatus === 'complete' ? '✓ Form done' : '⚠️ In-store'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
