import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Pill } from '../ui/Pill';
import { Button } from '../ui/Button';

export const StoreCard = ({ store, onSelect }) => {
  return (
    <Card className="mb-4" style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ marginBottom: '4px' }}>{store.name}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{store.address}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{store.distance} away</p>
        </div>
        {store.preferred && <Pill colorMode="gold">Preferred</Pill>}
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '16px 0' }}>
        {store.services.map(s => (
           <Pill key={s}>{s}</Pill>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <Button variant="outline" style={{ flex: 1 }}>Details</Button>
        <Button variant="solid" style={{ flex: 1 }} onClick={() => onSelect(store)}>
          Select Store
        </Button>
      </div>
    </Card>
  );
};
