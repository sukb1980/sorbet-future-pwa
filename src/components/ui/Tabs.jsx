/* Tabs Component — Sorbet Future Fit Design System */
import React from 'react';

export const Tabs = ({ tabs, activeTab, onChange, variant = 'underline' }) => {
  if (variant === 'pill') {
    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
        {tabs.map((tab) => (
          <button key={tab.value ?? tab} onClick={() => onChange(tab.value ?? tab)}
            style={{ padding: '8px 18px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-family)', transition: 'var(--transition-base)',
              background: activeTab === (tab.value ?? tab) ? 'var(--color-accent)' : 'var(--color-cream-deep)',
              color: activeTab === (tab.value ?? tab) ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeTab === (tab.value ?? tab) ? 'var(--shadow-glow)' : 'none',
            }}>
            {tab.icon && <span style={{ marginRight: '4px' }}>{tab.icon}</span>}
            {tab.label ?? tab}
            {tab.count !== undefined && (
              <span style={{ marginLeft: '6px', background: activeTab === (tab.value ?? tab) ? 'rgba(255,255,255,0.2)' : 'var(--color-blush)', borderRadius: 'var(--radius-full)', padding: '1px 7px', fontSize: '0.75rem' }}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Underline variant (default)
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '0', marginBottom: 'var(--space-lg)', overflowX: 'auto', scrollbarWidth: 'none' }}>
      {tabs.map((tab) => {
        const isActive = activeTab === (tab.value ?? tab);
        return (
          <button key={tab.value ?? tab} onClick={() => onChange(tab.value ?? tab)}
            style={{ padding: '12px 20px', border: 'none', borderBottom: `2px solid ${isActive ? 'var(--color-accent)' : 'transparent'}`, background: 'transparent', cursor: 'pointer', fontSize: '0.9rem', fontWeight: isActive ? 600 : 400, fontFamily: 'var(--font-family)', color: isActive ? 'var(--color-accent)' : 'var(--text-secondary)', whiteSpace: 'nowrap', transition: 'var(--transition-base)', marginBottom: '-1px' }}>
            {tab.icon && <span style={{ marginRight: '6px' }}>{tab.icon}</span>}
            {tab.label ?? tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
