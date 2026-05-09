/* Retail / Products Page — Sorbet Future Fit */
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { Pill, EmptyState, StarRating, Skeleton } from '../components/ui/Primitives';
import { products, productCategories, brands, concerns, skinTypes } from '../data/products';
import { formatPrice } from '../data/i18n';
import { FiSearch, FiFilter, FiShoppingBag, FiHeart } from 'react-icons/fi';

const stockColors = { 'in-stock': 'var(--color-success)', 'low-stock': 'var(--color-warning)', 'out-of-stock': 'var(--color-error)' };
const stockBgs = { 'in-stock': 'var(--color-success-bg)', 'low-stock': 'var(--color-warning-bg)', 'out-of-stock': 'var(--color-error-bg)' };

const getStock = (product, storeId = 'store-cpt-01') => {
  const qty = product.stockByStore[storeId] ?? 0;
  if (qty === 0) return 'out-of-stock';
  if (qty <= 3) return 'low-stock';
  return 'in-stock';
};

export default function Retail() {
  const { currency, preferredStore } = useAppContext();
  const { addItem, showToast } = useCart();
  const navigate = useNavigate();
  const storeId = preferredStore?.id || 'store-cpt-01';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedConcern, setSelectedConcern] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [addedIds, setAddedIds] = useState([]);

  const categoryTabs = [{ label: 'All', value: 'all' }, ...productCategories.map((c) => ({ label: c.name, value: c.id, icon: c.icon }))];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (selectedConcern && p.concern !== selectedConcern) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, selectedBrand, selectedConcern, search]);

  const handleAdd = (product) => {
    const stock = getStock(product, storeId);
    if (stock === 'out-of-stock') { showToast?.('Sorry, this item is out of stock at your store.', 'error'); return; }
    addItem({ id: product.id, type: 'product', name: product.name, price: product.price[currency] || product.price.ZAR, image: product.image, quantity: 1 });
    setAddedIds((prev) => [...prev, product.id]);
    if (typeof showToast === 'function') showToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
        <h1>Shop Beauty</h1>
        <Button variant="outline" size="sm" icon={<FiFilter size={14} />} onClick={() => setShowFilter((s) => !s)}>Filter</Button>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>{products.length} premium products</p>

      {/* Search */}
      <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<FiSearch size={16} />} containerStyle={{ marginBottom: 'var(--space-md)' }} />

      {/* Filter Panel */}
      {showFilter && (
        <Card variant="blush" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-lg)' }}>
          <h4 style={{ marginBottom: 'var(--space-md)' }}>Filters</h4>
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Brand</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Pill active={!selectedBrand} onClick={() => setSelectedBrand('')}>All</Pill>
              {brands.map((b) => <Pill key={b} active={selectedBrand === b} onClick={() => setSelectedBrand(b)}>{b}</Pill>)}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Concern</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Pill active={!selectedConcern} onClick={() => setSelectedConcern('')}>All</Pill>
              {concerns.map((c) => <Pill key={c} active={selectedConcern === c} onClick={() => setSelectedConcern(c)}>{c}</Pill>)}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { setSelectedBrand(''); setSelectedConcern(''); }} style={{ marginTop: 'var(--space-md)' }}>Clear Filters</Button>
        </Card>
      )}

      {/* Category Tabs */}
      <Tabs tabs={categoryTabs} activeTab={activeCategory} onChange={setActiveCategory} variant="pill" />

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="No products found" description="Try adjusting your search or filters." action={<Button variant="outline" onClick={() => { setSearch(''); setSelectedBrand(''); setSelectedConcern(''); setActiveCategory('all'); }}>Clear Search</Button>} />
      ) : (
        <div className="grid-2" style={{ gap: 'var(--space-md)' }}>
          {filtered.map((product) => {
            const stock = getStock(product, storeId);
            const added = addedIds.includes(product.id);
            return (
              <Card key={product.id} variant="default" padding="0" style={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative' }} onClick={() => navigate(`/products/${product.id}`)}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {product.new && <span style={{ background: 'var(--color-accent)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>NEW</span>}
                    {product.bestSeller && <span style={{ background: 'var(--color-charcoal)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>BESTSELLER</span>}
                  </div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', background: stockBgs[stock], borderRadius: 'var(--radius-full)', padding: '2px 8px', fontSize: '0.65rem', fontWeight: 700, color: stockColors[stock] }}>
                    {stock === 'in-stock' ? 'In Stock' : stock === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                  </div>
                </div>
                <div style={{ padding: 'var(--space-md)' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{product.brand}</p>
                  <h5 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)', lineHeight: 1.3, cursor: 'pointer' }} onClick={() => navigate(`/products/${product.id}`)}>{product.name}</h5>
                  {product.rating && (
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '8px' }}>
                      <StarRating rating={product.rating} size={12} />
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({product.reviewCount})</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '0.95rem' }}>{formatPrice(product.price, currency)}</span>
                    <Button variant={added ? 'ghost' : 'primary'} size="sm" onClick={() => handleAdd(product)} disabled={stock === 'out-of-stock'} style={{ padding: '6px 12px', height: 'auto' }}>
                      {added ? '✓' : <FiShoppingBag size={14} />}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
