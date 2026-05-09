/* Forms Page — Consultation & Indemnity Forms
   Sorbet Future Fit */
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Checkbox, Textarea, Select } from '../components/ui/Input';
import { Stepper } from '../components/ui/Stepper';
import { formDefinitions } from '../data/forms';
import { formSubmit } from '../services/mockApi';

const steps = ['Select', 'Complete', 'Confirm'];

export default function Forms() {
  const { currentUser, showToast } = useAppContext();
  const [step, setStep] = useState(1);
  const [selectedForm, setSelectedForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (fieldId, val) => setAnswers((a) => ({ ...a, [fieldId]: val }));

  const handleStart = (form) => { setSelectedForm(form); setStep(2); setAnswers({}); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await formSubmit(selectedForm.id, answers);
    setSubmitting(false);
    setSubmitted(true);
    setStep(3);
    showToast?.('Form submitted successfully!', 'success');
  };

  if (submitted) {
    return (
      <div className="page-container animate-fade-in" style={{ textAlign: 'center', paddingTop: 'var(--space-2xl)' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-md)' }}>✅</div>
        <h2 style={{ marginBottom: 'var(--space-sm)' }}>Form Submitted!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Your {selectedForm.title} has been received. Our team will review it before your appointment.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <Button variant="primary" fullWidth onClick={() => { setSubmitted(false); setStep(1); setSelectedForm(null); }}>Complete Another Form</Button>
          <Button variant="outline" fullWidth onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
      <Stepper steps={steps} currentStep={step} />
      <h1 style={{ marginBottom: 'var(--space-sm)' }}>Consultation Forms</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
        Some services require a consultation or indemnity form before your appointment. Please complete the relevant form below.
      </p>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {formDefinitions.map((form) => (
            <Card key={form.id} variant="default" padding="var(--space-lg)">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{form.icon}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{form.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{form.description}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(form.requiredFor || []).map((svc) => (
                      <span key={svc} style={{ background: 'var(--color-blush-light)', color: 'var(--color-accent)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 500 }}>{svc}</span>
                    ))}
                  </div>
                </div>
                {form.mandatory && <span style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, marginLeft: 'var(--space-sm)' }}>Required</span>}
              </div>
              <Button variant="primary" size="sm" onClick={() => handleStart(form)}>Complete Form</Button>
            </Card>
          ))}
        </div>
      )}

      {step === 2 && selectedForm && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-xl)' }}>
            <button onClick={() => setStep(1)} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: '0.875rem' }}>← Back</button>
          </div>
          <Card variant="blush" padding="var(--space-md)" style={{ marginBottom: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>{selectedForm.icon}</span>
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '2px' }}>{selectedForm.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{selectedForm.description}</p>
            </div>
          </Card>

          <form onSubmit={handleSubmit}>
            {(selectedForm.fields || []).map((field) => {
              const value = answers[field.id] ?? (field.type === 'checkbox' ? false : '');
              switch (field.type) {
                case 'text':
                case 'email':
                case 'tel':
                case 'date':
                  return <Input key={field.id} label={field.label} type={field.type} value={value} onChange={(e) => setAnswer(field.id, e.target.value)} required={field.required} placeholder={field.placeholder} helper={field.helper} />;
                case 'textarea':
                  return <Textarea key={field.id} label={field.label} value={value} onChange={(e) => setAnswer(field.id, e.target.value)} required={field.required} placeholder={field.placeholder} rows={3} />;
                case 'select':
                  return <Select key={field.id} label={field.label} value={value} onChange={(e) => setAnswer(field.id, e.target.value)} options={field.options} required={field.required} />;
                case 'checkbox':
                  return (
                    <Checkbox key={field.id} id={field.id} checked={!!value} onChange={(e) => setAnswer(field.id, e.target.checked)} required={field.required}
                      label={<span style={{ fontSize: '0.875rem' }}>{field.label}</span>}
                    />
                  );
                default:
                  return null;
              }
            })}

            {/* Health declaration */}
            <div style={{ background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-xl)', fontSize: '0.8rem', color: 'var(--color-warning)' }}>
              ⚠️ By submitting this form, you confirm that all information provided is accurate and complete. This form is for professional service delivery only.
            </div>

            <div className="sticky-action-bar">
              <Button type="submit" variant="primary" fullWidth size="lg" loading={submitting}>Submit Form</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
