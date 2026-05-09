/* Loyalty Page — Sorbet Future Fit */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { ProgressBar, EmptyState } from '../components/ui/Primitives';
import { loyaltyTiers, transactions, rewards, getNextTier, getProgressToNextTier, getTierById } from '../data/loyalty';
import { FiAward, FiStar, FiGift, FiUsers, FiArrowRight } from 'react-icons/fi';

const fmtDate = (d) => new Date(d).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' });
const tierColors = { Bronze: '#CD7F32', Silver: '#9E9E9E', Gold: '#B8860B' };

export default function Loyalty() {
  const { currentUser, showToast } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!currentUser) {
    return (
      <div className="page-container">
        <EmptyState icon="⭐" title="Sign in to access Loyalty" description="Join the Sorbet loyalty program and earn points on every visit." action={<Button onClick={() => navigate('/auth/sign-in')}>Sign In</Button>} />
      </div>
    );
  }

  const currentTier = getTierById(currentUser.tier);
  const nextTier = getNextTier(currentUser.tier);
  const progress = getProgressToNextTier(currentUser.points, currentUser.tier);
  const ptsToNext = nextTier ? nextTier.minPoints - currentUser.points : 0;

  const tabs = [
    { label: 'Overview', value: 'overview', icon: '⭐' },
    { label: 'Rewards', value: 'rewards', icon: '🎁' },
    { label: 'History', value: 'history', icon: '📋' },
    { label: 'Tiers', value: 'tiers', icon: '🏆' },
  ];

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '100px' }}>
      <h1 style={{ marginBottom: 'var(--space-xl)' }}>Loyalty</h1>

      {/* Points Hero */}
      <div style={{ background: `linear-gradient(135deg, ${tierColors[currentUser.tier]}, #C8907A)`, borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '40%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>{currentUser.tier} Member</span>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1, margin: 'var(--space-sm) 0' }}>{currentUser.points.toLocaleString()}</div>
        <span style={{ opacity: 0.85 }}>loyalty points</span>
        <p style={{ fontSize: '0.8rem', opacity: 0.75, marginTop: '4px' }}>≈ R{Math.floor(currentUser.points / 100) * 10} redeemable value</p>

        {nextTier && (
          <div style={{ marginTop: 'var(--space-lg)', background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px', opacity: 0.9 }}>
              <span>{currentUser.tier}</span><span>{nextTier.id}</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: '#fff', borderRadius: '3px', transition: 'width 0.6s ease' }} />
            </div>
            <p style={{ fontSize: '0.75rem', marginTop: '6px', opacity: 0.85 }}>{ptsToNext.toLocaleString()} more points to {nextTier.id}</p>
          </div>
        )}
        {!nextTier && <p style={{ marginTop: 'var(--space-md)', fontWeight: 600, opacity: 0.9 }}>🥇 You've reached our highest tier!</p>}
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pill" />

      {/* Overview */}
      {activeTab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
            <Card variant="blush" padding="var(--space-md)" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>{currentUser.tier}</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current Tier</p>
            </Card>
            <Card variant="blush" padding="var(--space-md)" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>{Math.floor(currentUser.points / 100) * 10}</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rand Value</p>
            </Card>
          </div>

          <h3 style={{ marginBottom: 'var(--space-md)' }}>Your Benefits</h3>
          <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
            {(currentTier?.benefits || []).map((benefit, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ color: 'var(--color-success)', marginTop: '2px' }}>✓</span>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{benefit}</p>
              </div>
            ))}
          </Card>

          <h3 style={{ marginBottom: 'var(--space-md)' }}>Earning Rates</h3>
          <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.875rem' }}>Services</span>
              <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{currentTier?.earningRate}pt per R10</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.875rem' }}>Retail Products</span>
              <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{currentTier?.earningRate}pt per R10</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
              <span style={{ fontSize: '0.875rem' }}>Referral Bonus</span>
              <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>500 pts per referral</span>
            </div>
          </Card>

          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
            <Button variant="primary" style={{ flex: 1 }} onClick={() => navigate('/booking/services')}>Earn Points</Button>
            <Button variant="outline" style={{ flex: 1 }} onClick={() => navigate('/cart')}>Redeem Points</Button>
          </div>

          <Card variant="blush" padding="var(--space-lg)" onClick={() => showToast?.('Referral link copied! Share with friends.', 'success')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                <FiUsers size={16} color="var(--color-accent)" />
                <h4>Refer a Friend</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>You get 500 pts when they book their first service!</p>
            </div>
            <FiArrowRight size={20} color="var(--color-accent)" />
          </Card>
        </div>
      )}

      {/* Rewards */}
      {activeTab === 'rewards' && (
        <div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>Redeem your points for exclusive rewards and services.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {rewards.map((reward) => {
              const canRedeem = currentUser.points >= reward.pointsCost;
              return (
                <Card key={reward.id} variant="default" padding="var(--space-lg)">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
                    <div>
                      <h4 style={{ marginBottom: '4px' }}>{reward.name}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{reward.description}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 'var(--space-md)' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: canRedeem ? 'var(--color-accent)' : 'var(--text-muted)' }}>{reward.pointsCost.toLocaleString()} pts</div>
                    </div>
                  </div>
                  <Button variant={canRedeem ? 'primary' : 'ghost'} size="sm" disabled={!canRedeem} onClick={() => canRedeem && showToast?.(`${reward.name} redeemed! 🎉`, 'success')}>
                    {canRedeem ? 'Redeem' : `Need ${(reward.pointsCost - currentUser.points).toLocaleString()} more pts`}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Transaction History */}
      {activeTab === 'history' && (
        <div>
          {transactions.length === 0 ? (
            <EmptyState icon="📋" title="No transactions yet" description="Your point earnings and redemptions will appear here." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {transactions.map((txn) => (
                <div key={txn.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md)', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{txn.description}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{fmtDate(txn.date)} · {txn.type}</p>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: txn.points > 0 ? 'var(--color-success)' : 'var(--color-error)', flexShrink: 0 }}>
                    {txn.points > 0 ? '+' : ''}{txn.points.toLocaleString()} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tier Comparison */}
      {activeTab === 'tiers' && (
        <div>
          {loyaltyTiers.map((tier) => {
            const isCurrent = tier.id === currentUser.tier;
            return (
              <Card key={tier.id} variant={isCurrent ? 'accent' : 'default'} padding="var(--space-lg)" style={{ marginBottom: 'var(--space-md)', border: isCurrent ? '2px solid var(--color-accent)' : 'var(--glass-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${tierColors[tier.id]}, rgba(200,144,122,0.5))`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FiAward size={18} color="#fff" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '2px' }}>{tier.id}</h3>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tier.minPoints.toLocaleString()} – {tier.maxPoints ? tier.maxPoints.toLocaleString() : '∞'} pts</p>
                    </div>
                  </div>
                  {isCurrent && <span style={{ background: 'var(--color-accent)', color: '#fff', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700 }}>Current</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {(tier.benefits || []).map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--color-success)', marginTop: '2px', flexShrink: 0 }}>✓</span>{benefit}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
