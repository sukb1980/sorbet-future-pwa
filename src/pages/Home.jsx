/* Home Page — Sorbet Future Fit
   Personalized hero, quick actions, promos, personalized sections */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/Primitives';
import { getFeaturedPromotions, getPromotionsByTier } from '../data/promotions';
import { products } from '../data/products';
import { loyaltyTiers, getNextTier, getProgressToNextTier } from '../data/loyalty';
import { formatPrice } from '../data/i18n';
import { FiCalendar, FiShoppingBag, FiCamera, FiArrowRight, FiStar, FiGift, FiZap, FiAward } from 'react-icons/fi';

const isBirthdayMonth = (birthday) => {
  if (!birthday) return false;
  const bMonth = new Date(birthday).getMonth();
  return bMonth === new Date().getMonth();
};

export default function Home() {
  const { currentUser, isGuest, currency, t } = useAppContext();
  const { addItem, showToast } = useCart();
  const navigate = useNavigate();
  const promos = getFeaturedPromotions();
  const tierPromos = currentUser ? getPromotionsByTier(currentUser.tier) : [];
  const nextTier = currentUser ? getNextTier(currentUser.tier) : null;
  const progress = currentUser ? getProgressToNextTier(currentUser.points, currentUser.tier) : 0;
  const showBirthday = currentUser && isBirthdayMonth(currentUser.birthday);

  const trendingProducts = products.filter((p) => p.bestSeller).slice(0, 4);
  const newProducts = products.filter((p) => p.new).slice(0, 3);

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>

      {/* ---- Hero Welcome ---- */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        {currentUser ? (
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Good morning ✨</p>
            <h1 className="gradient-text" style={{ marginBottom: 'var(--space-md)' }}>Hello, {currentUser.firstName}!</h1>

            {/* Birthday Banner */}
            {showBirthday && (
              <Card variant="accent" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-lg)', border: '1px solid var(--color-blush)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <span style={{ fontSize: '2rem' }}>🎂</span>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--color-accent)', marginBottom: '4px' }}>Happy Birthday Month!</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Your 50% birthday reward is active. Book any service and apply it at checkout.</p>
                  </div>
                </div>
                <Button variant="primary" size="sm" onClick={() => navigate('/booking/services')} style={{ marginTop: 'var(--space-md)' }}>Redeem Birthday Reward</Button>
              </Card>
            )}

            {/* Loyalty Summary */}
            <Card variant="accent" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                <div>
                  <span className={`tier-badge ${currentUser.tier}`} style={{ marginBottom: '8px', display: 'inline-block' }}>{currentUser.tier} Member</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{currentUser.points.toLocaleString()}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>loyalty points</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/loyalty')}>View Rewards</Button>
              </div>
              {nextTier && (
                <div>
                  <ProgressBar value={progress} label={`${currentUser.points - loyaltyTiers.find(t => t.id === currentUser.tier)?.minPoints || 0} / ${nextTier.minPoints - (loyaltyTiers.find(t => t.id === currentUser.tier)?.minPoints || 0)} to ${nextTier.id}`} />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>Earn {nextTier.minPoints - currentUser.points} more points to reach {nextTier.id} ✨</p>
                </div>
              )}
              {!nextTier && <p style={{ fontSize: '0.8rem', color: 'var(--color-warning)', fontWeight: 600 }}>🥇 You're at Gold — our highest tier!</p>}
            </Card>
          </div>
        ) : (
          <div>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', minHeight: '240px', marginBottom: 'var(--space-lg)' }}>
              <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop" alt="Sorbet salon" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(200,144,122,0.75) 0%, rgba(44,44,44,0.5) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'var(--space-xl)', color: '#fff' }}>
                <h1 style={{ color: '#fff', marginBottom: '8px', fontSize: '2rem', fontWeight: 800 }}>Welcome to Sorbet Future</h1>
                <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 'var(--space-lg)' }}>Premium beauty & wellness, beautifully delivered.</p>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <Button variant="primary" onClick={() => navigate('/auth/sign-up')}>Get Started</Button>
                  <Button variant="outline" onClick={() => navigate('/auth/sign-in')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.7)' }}>Sign In</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---- Quick Actions ---- */}
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">Quick Actions</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
          <Card variant="default" onClick={() => navigate('/booking/services')} padding="var(--space-lg)" style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '50%', background: 'var(--color-rose-gold-light)', marginBottom: 'var(--space-md)' }}>
              <FiCalendar size={26} color="var(--color-accent)" />
            </div>
            <h4>Book a Treatment</h4>
            <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Reserve a service</p>
          </Card>
          <Card variant="default" onClick={() => navigate('/products')} padding="var(--space-lg)" style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '50%', background: 'var(--color-rose-gold-light)', marginBottom: 'var(--space-md)' }}>
              <FiShoppingBag size={26} color="var(--color-accent)" />
            </div>
            <h4>Shop Products</h4>
            <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Beauty essentials</p>
          </Card>
          <Card variant="blush" onClick={() => navigate('/vouchers')} padding="var(--space-lg)" style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '50%', background: 'rgba(200,144,122,0.15)', marginBottom: 'var(--space-md)' }}>
              <FiGift size={26} color="var(--color-accent)" />
            </div>
            <h4>Gift Cards</h4>
            <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Send beauty love</p>
          </Card>
          <Card variant="blush" onClick={() => navigate('/analysis')} padding="var(--space-lg)" style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '50%', background: 'rgba(200,144,122,0.15)', marginBottom: 'var(--space-md)' }}>
              <FiCamera size={26} color="var(--color-accent)" />
            </div>
            <h4>AI Analysis</h4>
            <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Skin insights</p>
          </Card>
        </div>
      </div>

      {/* ---- Featured Promotions ---- */}
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">✨ Exclusive Offers</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/promotions')}>View all <FiArrowRight size={14} /></Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {promos.slice(0, 2).map((promo) => (
            <div key={promo.id} style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <img src={promo.image} alt={promo.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(200,144,122,0.7) 0%, rgba(44,44,44,0.7) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'var(--space-lg)', color: '#fff' }}>
                {promo.badge && <span style={{ display: 'inline-block', background: 'var(--color-accent)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '8px', width: 'fit-content' }}>{promo.badge}</span>}
                <h3 style={{ color: '#fff', marginBottom: '4px', fontSize: '1.25rem' }}>{promo.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', marginBottom: 'var(--space-md)' }}>{promo.description}</p>
                <Button variant="primary" size="sm" onClick={() => navigate(promo.ctaRoute || '/promotions')} style={{ width: 'fit-content' }}>{promo.cta}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Trending Products ---- */}
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">🔥 Trending Now</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/products')}>See all <FiArrowRight size={14} /></Button>
        </div>
        <div className="scroll-row">
          {trendingProducts.map((product) => (
            <Card key={product.id} variant="default" onClick={() => navigate(`/products/${product.id}`)} padding="0" style={{ minWidth: '180px', overflow: 'hidden' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: 'var(--space-md)' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{product.brand}</p>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>{product.name}</h5>
                <p style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '0.95rem' }}>{formatPrice(product.price, currency)}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ---- New Launches ---- */}
      {newProducts.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h3 className="section-title">🆕 Just Arrived</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {newProducts.map((product) => (
              <Card key={product.id} variant="default" onClick={() => navigate(`/products/${product.id}`)} padding="var(--space-md)" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <img src={product.image} alt={product.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>New</span>
                  <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{product.name}</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.brand}</p>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{formatPrice(product.price, currency)}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ---- AI Analysis CTA ---- */}
      <div className="section">
        <Card variant="accent" padding="var(--space-xl)" onClick={() => navigate('/analysis')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🔬</div>
            <h3 style={{ marginBottom: '6px' }}>Try AI Skin Analysis</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Personalised recommendations from your skin's own data.</p>
          </div>
          <FiArrowRight size={24} color="var(--color-accent)" />
        </Card>
      </div>
    </div>
  );
}
