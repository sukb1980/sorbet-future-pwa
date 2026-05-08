import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceCategories, citizens, availability } from '../data/services';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { addToCart, cartState } = useCart();
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleCitizenSelect = (citizenId) => {
    setSelectedCitizen(citizenId);
    setStep(3);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep(4);
  };

  const handleConfirm = () => {
    addToCart({ 
      id: selectedService.id, 
      type: 'service', 
      name: selectedService.name,
      price: selectedService.price.ZAR,
      citizen: selectedCitizen,
      slot: selectedSlot
    });
    navigate('/cart');
  };

  return (
    <div className="page-container">
      <h2 style={{ marginBottom: '24px' }}>Book an Appointment</h2>
      
      {/* Basic Stepper UI */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[1, 2, 3, 4].map(s => (
          <div 
            key={s} 
            style={{ 
              flex: 1, 
              height: '4px', 
              background: step >= s ? 'var(--color-primary)' : '#EEE',
              borderRadius: '2px'
            }} 
          />
        ))}
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <h3 style={{ marginBottom: '16px' }}>Select Service</h3>
          {serviceCategories.map(cat => (
            <div key={cat.id} style={{ marginBottom: '24px' }}>
              <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>{cat.name}</h4>
              {cat.subcategories[0].services.map(srv => (
                <Card key={srv.id} onClick={() => handleServiceSelect(srv)} className="mb-4">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>{srv.name}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{srv.durationMin} Min</p>
                    </div>
                    <div style={{ fontWeight: '600' }}>ZAR {srv.price.ZAR}</div>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <Button variant="text" onClick={() => setStep(1)}>← Back</Button>
          <h3 style={{ marginTop: '16px', marginBottom: '16px' }}>Select Professional</h3>
          
          <Card onClick={() => handleCitizenSelect('any')} className="mb-4">
            <h4 style={{ margin: 0 }}>Any Professional</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Maximum availability</p>
          </Card>

          {citizens.map(cit => (
            <Card key={cit.id} onClick={() => handleCitizenSelect(cit.id)} className="mb-4">
              <h4 style={{ margin: 0 }}>{cit.name}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>★ {cit.rating}</p>
            </Card>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <Button variant="text" onClick={() => setStep(2)}>← Back</Button>
          <h3 style={{ marginTop: '16px', marginBottom: '16px' }}>Select Time</h3>
          
          {availability[0].slots.map((slot, idx) => (
             <Card 
               key={idx} 
               onClick={() => slot.available && handleSlotSelect(slot)} 
               style={{ opacity: slot.available ? 1 : 0.5, marginBottom: '16px' }}
             >
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{slot.date} • {slot.time} ({slot.period})</span>
                  <span>{slot.available ? 'Available' : 'Waitlist'}</span>
               </div>
             </Card>
          ))}
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in">
          <Button variant="text" onClick={() => setStep(3)}>← Back</Button>
          <h3 style={{ marginTop: '16px', marginBottom: '16px' }}>Summary</h3>
          
          <Card style={{ marginBottom: '24px' }}>
            <p><strong>Service:</strong> {selectedService?.name}</p>
            <p><strong>Time:</strong> {selectedSlot?.date} at {selectedSlot?.time}</p>
            <p><strong>Price:</strong> ZAR {selectedService?.price.ZAR}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '16px' }}>
              We will require a safety consent form upon arrival.
            </p>
          </Card>

          <Button variant="solid" style={{ width: '100%' }} onClick={handleConfirm}>
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
}
