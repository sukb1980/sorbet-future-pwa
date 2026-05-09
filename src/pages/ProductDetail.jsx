/* Product Detail Page — Sorbet Future Fit */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { StarRating, EmptyState } from '../components/ui/Primitives';
import { getProductById, products } from '../data/products';
import { formatPrice } from '../data/i18n';
import { FiArrowLeft, FiShoppingBag, FiHeart } from 'react-icons/fi';

const getStock = (product, storeId = 'store-cpt-01') => {
  const qty = product.stockByStore[storeId] ?? 0;
  if (qty === 0) return 'out-of-stock';
  if (qty <= 3) return 'low-stock';
  return 'in-stock';
};

const stockLabels = { 'in-stock': '✅ In Stock', 'low-stock': '⚠️ Low Stock', 'out-of-stock': '❌ Out of Stock' };
const stockColors = { 'in-stock': 'var(--color-success)', 'low-stock': 'var(--color-warning)', 'out-of-stock': 'var(--color-error)' };

export default function ProductDetail() {
  const { id } = useParams();
  const { currency, preferredStore, showToast } = useAppContext();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const storeId = preferredStore?.id || 'store-cpt-01';

  const product = getProductById(id);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <div className="page-container"><EmptyState icon="😕" title="Product not found" action={<Button onClick={() => navigate('/products')}>← Back to Shop</Button>} /></div>;
  }

  const stock = getStock(product, storeId);
  const alternatives = (product.alternativeIds || []).map(getProductById).filter(Boolean);
  const complementary = products.filter((p) => p.category === product.category && p.id !== product.id && !product.alternativeIds?.includes(p.id)).slice(0, 3);

  const handleAdd = () => {
    if (stock === 'out-of-stock') return;
    addItem({ id: product.id, type: 'product', name: product.name, price: product.price[currency] || product.price.ZAR, image: product.image, quantity });
    setAdded(true);
    showToast?.(`${product.name} added to cart!`, 'success');
  };

  const tabs = [
    { label: 'Description', value: 'description' },
    { label: 'Ingredients', value: 'ingredients' },
    { label: 'How to Use', value: 'how-to-use' },
  ];

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
      {/* Back Button */}
      <button onClick={() => navigate('/products')} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-family)' }}>
        <FiArrowLeft size={16} /> Back to Shop
      </button>

      {/* Product Image */}
      <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 'var(--space-xl)', background: 'var(--color-cream-deep)' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', top: 'var(--space-md)', left: 'var(--space-md)', display: 'flex', gap: '8px' }}>
          {product.new && <span style={{ background: 'var(--color-accent)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>NEW</span>}
          {product.bestSeller && <span style={{ background: 'var(--color-charcoal)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>BESTSELLER</span>}
        </div>
      </div>

      {/* Product Header */}
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.brand}</p>
      <h1 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-sm)' }}>{product.name}</h1>

      {product.rating && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
          <StarRating rating={product.rating} size={16} />
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{product.rating} ({product.reviewCount} reviews)</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-accent)' }}>{formatPrice(product.price, currency)}</span>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: stockColors[stock] }}>{stockLabels[stock]}</span>
      </div>

      {/* Benefits */}
      {product.benefits && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
          {product.benefits.map((b) => (
            <span key={b} style={{ background: 'var(--color-blush-light)', color: 'var(--color-accent)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 500, border: '1px solid var(--color-blush)' }}>{b}</span>
          ))}
        </div>
      )}

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div style={{ marginBottom: 'var(--space-xl)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
        {activeTab === 'description' && <p>{product.description}</p>}
        {activeTab === 'ingredients' && <p style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>{product.ingredients}</p>}
        {activeTab === 'how-to-use' && <p>{product.usage}</p>}
      </div>

      {/* Out of stock alternatives */}
      {stock === 'out-of-stock' && alternatives.length > 0 && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Similar Products</h3>
          {alternatives.map((alt) => (
            <Card key={alt.id} variant="blush" padding="var(--space-md)" onClick={() => navigate(`/products/${alt.id}`)} style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
              <img src={alt.image} alt={alt.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
              <div style={{ flex: 1 }}>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{alt.name}</h5>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 700 }}>{formatPrice(alt.price, currency)}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Complementary products */}
      {complementary.length > 0 && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>You May Also Like</h3>
          <div className="scroll-row">
            {complementary.map((p) => (
              <Card key={p.id} variant="default" padding="0" onClick={() => navigate(`/products/${p.id}`)} style={{ minWidth: '160px', overflow: 'hidden' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                <div style={{ padding: 'var(--space-sm)' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 700 }}>{formatPrice(p.price, currency)}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart Bar */}
      <div className="sticky-action-bar">
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--color-cream-deep)', borderRadius: 'var(--radius-full)', padding: '8px 16px', border: '1px solid var(--color-border)' }}>
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-primary)', fontFamily: 'var(--font-family)' }}>−</button>
            <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-primary)', fontFamily: 'var(--font-family)' }}>+</button>
          </div>
          <Button variant={added ? 'ghost' : 'primary'} size="lg" onClick={handleAdd} disabled={stock === 'out-of-stock'} style={{ flex: 1 }} icon={<FiShoppingBag size={16} />}>
            {stock === 'out-of-stock' ? 'Out of Stock' : added ? '✓ Added to Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}
