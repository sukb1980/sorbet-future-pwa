import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/ui/Button';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, cartState } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) return <div className="page-container">Product not found.</div>;

  const currentStoreId = cartState.storeId || 'store-01'; // Default store
  const stock = product.stockByStore[currentStoreId] || 0;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      type: 'product',
      name: product.name,
      price: product.price.ZAR,
      quantity
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-container animate-fade-in">
      <Button variant="outline" onClick={() => navigate(-1)}>← Back</Button>
      
      <div style={{ background: 'linear-gradient(135deg, rgba(226,155,127,0.3) 0%, transparent 100%)', height: '350px', borderRadius: '24px', margin: '24px 0', border: '1px solid rgba(226,155,127,0.2)' }}></div>
      
      <h2 style={{ marginBottom: '8px', fontSize: '2rem' }}>{product.name}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '1.1rem' }}>{product.brand}</p>
      
      <div style={{ fontWeight: '700', fontSize: '1.5rem', marginBottom: '24px', color: 'var(--color-accent)' }}>
        ZAR {product.price.ZAR}
      </div>

      <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>{product.description}</p>
      
      {stock > 0 ? (
        <p style={{ color: 'var(--color-success)', marginBottom: '16px', fontWeight: '500' }}>In stock at selected store ({stock})</p>
      ) : (
        <p style={{ color: 'var(--color-error)', marginBottom: '16px', fontWeight: '500' }}>Out of stock at selected store</p>
      )}

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
        <Button 
          variant="outline" 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >-</Button>
        <span style={{ fontWeight: '600' }}>{quantity}</span>
        <Button 
           variant="outline" 
           onClick={() => setQuantity(quantity + 1)}
           disabled={quantity >= stock}
        >+</Button>
      </div>

      <Button 
        variant={added ? "accent" : "solid"} 
        className="w-full" 
        style={{ width: '100%' }}
        disabled={stock === 0}
        onClick={handleAdd}
      >
        {added ? 'Added to Cart ✓' : 'Add to Cart'}
      </Button>
    </div>
  );
}
