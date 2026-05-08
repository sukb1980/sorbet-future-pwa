import React from 'react';
import { Card } from '../components/ui/Card';

export default function Admin() {
  return (
    <div className="page-container" style={{ maxWidth: '1200px' }}>
      <h2 style={{ marginBottom: '24px' }}>BI Dashboard (Simulated)</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <Card>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Bookings</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1,245</div>
        </Card>
        <Card>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Revenue (ZAR)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>450,200</div>
        </Card>
        <Card>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Products Sold</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>820</div>
        </Card>
        <Card>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>AI Scans Completed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>340</div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
         <Card>
           <h3>Bookings by Category</h3>
           <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '16px', marginTop: '16px' }}>
             <div style={{ flex: 1, background: 'var(--color-primary)', height: '80%', borderRadius: '4px 4px 0 0' }}></div>
             <div style={{ flex: 1, background: 'var(--color-accent)', height: '40%', borderRadius: '4px 4px 0 0' }}></div>
             <div style={{ flex: 1, background: '#CCC', height: '60%', borderRadius: '4px 4px 0 0' }}></div>
             <div style={{ flex: 1, background: '#999', height: '20%', borderRadius: '4px 4px 0 0' }}></div>
           </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
             <span>Skin</span>
             <span>Nails</span>
             <span>Hair</span>
             <span>Massage</span>
           </div>
         </Card>
         <Card>
           <h3>Revenue by Region</h3>
           <div style={{ marginTop: '16px' }}>
             <div style={{ marginBottom: '16px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                 <span>South Africa</span>
                 <span>70%</span>
               </div>
               <div style={{ background: '#EEE', height: '8px', borderRadius: '4px' }}>
                 <div style={{ background: 'var(--color-primary)', width: '70%', height: '100%', borderRadius: '4px' }}></div>
               </div>
             </div>
             <div style={{ marginBottom: '16px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                 <span>Botswana</span>
                 <span>20%</span>
               </div>
               <div style={{ background: '#EEE', height: '8px', borderRadius: '4px' }}>
                 <div style={{ background: 'var(--color-accent)', width: '20%', height: '100%', borderRadius: '4px' }}></div>
               </div>
             </div>
             <div style={{ marginBottom: '16px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                 <span>Mauritius</span>
                 <span>10%</span>
               </div>
               <div style={{ background: '#EEE', height: '8px', borderRadius: '4px' }}>
                 <div style={{ background: '#CCC', width: '10%', height: '100%', borderRadius: '4px' }}></div>
               </div>
             </div>
           </div>
         </Card>
      </div>
    </div>
  );
}
