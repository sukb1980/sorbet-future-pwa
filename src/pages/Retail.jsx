import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, productCategories } from '../data/products';
import { Card } from '../components/ui/Card';
import { Pill } from '../components/ui/Pill';
import { Input } from '../components/ui/Input';

export default function Retail() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="page-container">
      <h2 style={{ marginBottom: '24px' }}>Shop Products</h2>

      <Input 
        placeholder="Search for serums, creams..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
        <div onClick={() => setActiveCategory('all')}>
          <Pill active={activeCategory === 'all'}>All</Pill>
        </div>
        {productCategories.map(cat => (
          <div key={cat.id} onClick={() => setActiveCategory(cat.id)}>
            <Pill active={activeCategory === cat.id}>{cat.name}</Pill>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '24px' }}>
        {filteredProducts.map(prod => (
          <Card key={prod.id} onClick={() => navigate(`/product/${prod.id}`)}>
            <div style={{ background: 'linear-gradient(135deg, rgba(226,155,127,0.2) 0%, transparent 100%)', height: '140px', borderRadius: '12px', marginBottom: '16px', border: '1px solid rgba(226,155,127,0.1)' }}>
            </div>
            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{prod.name}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '12px' }}>{prod.brand}</p>
            <div style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--color-accent)' }}>ZAR {prod.price.ZAR}</div>
          </Card>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '32px' }}>No products found.</p>
      )}
    </div>
  );
}
