/* Analysis Results Page — Sorbet Future Fit */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/Primitives';
import { getRandomAnalysis } from '../data/analysis';
import { products, getProductById } from '../data/products';
import { getServiceById } from '../data/services';
import { formatPrice } from '../data/i18n';
import { FiArrowLeft, FiShoppingBag, FiCalendar } from 'react-icons/fi';

const scoreColor = (score) => {
  if (score >= 70) return 'var(--color-success)';
  if (score >= 45) return 'var(--color-warning)';
  return 'var(--color-error)';
};

export default function AnalysisResults() {
  const { currency, showToast } = useAppContext();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { analysisType = 'skin', fromQuestionnaire = false } = location.state || {};

  const result = getRandomAnalysis(analysisType);

  const recProducts = (result.recommendationProducts || []).map(getProductById).filter(Boolean);
  const recServices = (result.recommendationServices || []).map(getServiceById).filter(Boolean);

  const handleAddProduct = (product) => {
    addItem({ id: product.id, type: 'product', name: product.name, price: product.price[currency] || product.price.ZAR, image: product.image, quantity: 1 });
    showToast?.(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
      <button onClick={() => navigate('/analysis')} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-family)', fontSize: '0.875rem' }}>
        <FiArrowLeft size={16} /> New Analysis
      </button>

      {/* Score Hero */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px', borderRadius: '50%', background: `conic-gradient(${scoreColor(result.overallScore)} ${result.overallScore * 3.6}deg, var(--color-cream-deep) 0deg)`, boxShadow: 'var(--shadow-glow)', marginBottom: 'var(--space-lg)', position: 'relative' }}>
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 900, color: scoreColor(result.overallScore), lineHeight: 1 }}>{result.overallScore}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>/100</span>
          </div>
        </div>
        <h2 style={{ marginBottom: 'var(--space-sm)' }}>{result.label} Results</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)', lineHeight: 1.6 }}>{result.summary}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Confidence: {Math.round(result.confidence * 100)}% · {fromQuestionnaire ? 'Questionnaire-based' : 'Camera-based'}</p>
      </div>

      {/* Attributes */}
      <h3 style={{ marginBottom: 'var(--space-lg)' }}>Detailed Analysis</h3>
      <Card variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
        {result.attributes.map((attr, i) => (
          <div key={attr.name} style={{ marginBottom: i < result.attributes.length - 1 ? 'var(--space-lg)' : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>{attr.icon} {attr.name}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: scoreColor(attr.score) }}>{attr.status}</span>
            </div>
            <div style={{ height: '6px', background: 'var(--color-cream-deep)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${attr.score}%`, background: `linear-gradient(90deg, ${scoreColor(attr.score)}, ${scoreColor(Math.min(100, attr.score + 20))})`, borderRadius: 'var(--radius-full)', transition: 'width 0.8s ease' }} />
            </div>
          </div>
        ))}
      </Card>

      {/* Primary Concern */}
      <Card variant="blush" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-xl)' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Primary Concern Identified</p>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{result.concern}</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Our recommendations below are targeted at addressing this concern.</p>
      </Card>

      {/* Recommended Services */}
      {recServices.length > 0 && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Recommended Treatments</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {recServices.map((svc) => (
              <Card key={svc.id} variant="default" padding="var(--space-md)" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>{svc.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{svc.durationMin} min · {formatPrice(svc.price, currency)}</p>
                </div>
                <Button variant="primary" size="sm" icon={<FiCalendar size={13} />} onClick={() => navigate('/booking/calendar', { state: { serviceId: svc.id } })}>Book</Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Products */}
      {recProducts.length > 0 && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Recommended Products</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {recProducts.map((product) => (
              <Card key={product.id} variant="default" padding="var(--space-md)" style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{product.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatPrice(product.price, currency)}</p>
                </div>
                <Button variant="outline" size="sm" icon={<FiShoppingBag size={13} />} onClick={() => handleAddProduct(product)}>Add</Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{ background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', fontSize: '0.8rem', color: 'var(--color-warning)' }}>
        ⚠️ {result.disclaimer}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-xl)' }}>
        <Button variant="primary" fullWidth onClick={() => navigate('/booking/services')}>Book a Treatment</Button>
        <Button variant="outline" fullWidth onClick={() => navigate('/analysis')}>Analyse Again</Button>
      </div>
    </div>
  );
}
