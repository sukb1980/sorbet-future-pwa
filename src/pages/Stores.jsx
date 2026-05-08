import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stores as mockStores } from '../data/stores';
import { StoreCard } from '../components/stores/StoreCard';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [isLocating, setIsLocating] = useState(false);
  const { setStore } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Initial load
    setStores(mockStores);
  }, []);

  const simulateLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      // Mock sorting algorithm
      const sorted = [...stores].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      setStores(sorted);
      setIsLocating(false);
    }, 1200);
  };

  const handleSelectStore = (store) => {
    setStore(store.id);
    navigate('/book'); // automatically route to booking
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Find a Store</h2>
        <Button variant="outline" onClick={simulateLocation} disabled={isLocating}>
          {isLocating ? 'Locating...' : 'Use My Location'}
        </Button>
      </div>
      
      <div>
        {stores.map(store => (
          <StoreCard key={store.id} store={store} onSelect={handleSelectStore} />
        ))}
      </div>
    </div>
  );
}
