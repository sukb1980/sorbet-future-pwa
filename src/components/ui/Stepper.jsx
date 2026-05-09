/* Stepper Component — Multi-step progress indicator
   Sorbet Future Fit Design System */
import React from 'react';
import { FiCheck } from 'react-icons/fi';

export const Stepper = ({ steps, currentStep }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-xl)', padding: '0 var(--space-sm)' }}>
      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        const isPending = stepNum > currentStep;

        return (
          <React.Fragment key={step}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '36px', height: '36px',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isCompleted ? 'var(--color-success)' : isActive ? 'var(--color-accent)' : 'var(--color-cream-deep)',
                border: `2px solid ${isCompleted ? 'var(--color-success)' : isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                color: isCompleted || isActive ? '#fff' : 'var(--text-muted)',
                fontSize: '0.875rem',
                fontWeight: 700,
                transition: 'var(--transition-base)',
              }}>
                {isCompleted ? <FiCheck size={16} /> : stepNum}
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--color-accent)' : isPending ? 'var(--text-muted)' : 'var(--color-success)', whiteSpace: 'nowrap', textAlign: 'center', maxWidth: '64px' }}>
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ flex: 1, height: '2px', margin: '0 4px 18px', background: stepNum < currentStep ? 'var(--color-success)' : 'var(--color-border)', transition: 'var(--transition-base)' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
