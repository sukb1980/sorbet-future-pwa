/* Skin/Hair/Nail Analysis Page — Sorbet Future Fit
   Analysis type selection, camera guidance, questionnaire fallback */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { analysisTypes, cameraGuidance, fallbackQuestionnaire } from '../data/analysis';
import { aiSubmitImage, aiGetResults } from '../services/mockApi';
import { FiCamera, FiEdit, FiArrowRight } from 'react-icons/fi';

export default function SkinAnalysis() {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [mode, setMode] = useState('select'); // select | guidance | processing | questionnaire
  const [answers, setAnswers] = useState({});
  const [processing, setProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState('Initialising AI...');

  const handleStartCamera = async () => {
    setMode('processing');
    setProcessing(true);
    const msgs = ['Initialising AI...', 'Analysing your skin...', 'Processing results...', 'Almost done...'];
    for (let i = 0; i < msgs.length; i++) {
      setProcessingMsg(msgs[i]);
      await new Promise((r) => setTimeout(r, 900));
    }
    try {
      await aiSubmitImage(selectedType.id);
      await aiGetResults(selectedType.id);
      navigate('/analysis/results', { state: { analysisType: selectedType.id } });
    } catch {
      showToast('AI analysis unavailable — try the questionnaire instead.', 'warning');
      setMode('questionnaire');
    }
    setProcessing(false);
  };

  const handleAnswer = (qId, val) => setAnswers((a) => ({ ...a, [qId]: val }));

  const handleSubmitQuestionnaire = () => {
    navigate('/analysis/results', { state: { analysisType: selectedType.id, fromQuestionnaire: true, answers } });
  };

  if (mode === 'processing') {
    return (
      <div className="page-container" style={{ textAlign: 'center', paddingTop: 'var(--space-3xl)' }}>
        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-xl)' }}>🔬</div>
        <h2 style={{ marginBottom: 'var(--space-md)' }}>Analysing Your {selectedType?.label}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>{processingMsg}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-accent)', animation: `skeleton-pulse 1.2s ease-in-out ${i * 0.25}s infinite` }} />
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-2xl)', background: 'var(--color-cream-deep)', borderRadius: 'var(--radius-md)', padding: 'var(--space-lg)' }}>
          <div style={{ height: '8px', borderRadius: 'var(--radius-full)', background: 'var(--color-border)', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--color-rose-gold), var(--color-blush-mid))', borderRadius: 'var(--radius-full)', width: '60%', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'questionnaire') {
    return (
      <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
        <button onClick={() => setMode('guidance')} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-family)', fontSize: '0.875rem' }}>← Back</button>
        <h2 style={{ marginBottom: 'var(--space-sm)' }}>Quick Questionnaire</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>Answer a few questions and we'll tailor recommendations to your needs.</p>
        {fallbackQuestionnaire.map((q) => (
          <Card key={q.id} variant="default" padding="var(--space-lg)" style={{ marginBottom: 'var(--space-md)' }}>
            <p style={{ fontWeight: 600, marginBottom: 'var(--space-md)', color: 'var(--text-primary)' }}>{q.question}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {q.options.map((opt) => (
                <button key={opt} onClick={() => handleAnswer(q.id, opt)}
                  style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: `2px solid ${answers[q.id] === opt ? 'var(--color-accent)' : 'var(--color-border)'}`, background: answers[q.id] === opt ? 'var(--color-rose-gold-light)' : 'transparent', color: answers[q.id] === opt ? 'var(--color-accent)' : 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-family)', fontSize: '0.9rem', fontWeight: answers[q.id] === opt ? 600 : 400, transition: 'var(--transition-fast)' }}>
                  {opt}
                </button>
              ))}
            </div>
          </Card>
        ))}
        <div className="sticky-action-bar">
          <Button variant="primary" fullWidth size="lg" onClick={handleSubmitQuestionnaire} disabled={Object.keys(answers).length < fallbackQuestionnaire.length}>
            Get My Recommendations →
          </Button>
        </div>
      </div>
    );
  }

  if (mode === 'guidance' && selectedType) {
    return (
      <div className="page-container animate-fade-in" style={{ paddingBottom: '120px' }}>
        <button onClick={() => setMode('select')} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-family)', fontSize: '0.875rem' }}>← Back</button>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>{selectedType.icon}</div>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>{selectedType.label} Analysis</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{selectedType.description}</p>
        </div>

        <h3 style={{ marginBottom: 'var(--space-md)' }}>For best results:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
          {cameraGuidance.map((guide) => (
            <Card key={guide.step} variant="blush" padding="var(--space-md)" style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-rose-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{guide.icon}</div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: '4px' }}>{guide.title}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{guide.tip}</p>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ background: 'var(--color-info-bg)', border: '1px solid var(--color-info)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginBottom: 'var(--space-xl)', fontSize: '0.8rem', color: 'var(--color-info)' }}>
          🔒 <strong>Privacy:</strong> Your image is processed in real-time and is not stored by default. This analysis is for guidance only and is non-diagnostic.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <Button variant="primary" fullWidth size="lg" icon={<FiCamera size={18} />} onClick={handleStartCamera}>Start Camera Analysis</Button>
          <Button variant="outline" fullWidth onClick={() => setMode('questionnaire')} icon={<FiEdit size={16} />}>Use Questionnaire Instead</Button>
        </div>
      </div>
    );
  }

  // Select analysis type
  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🔬</div>
        <h1 style={{ marginBottom: 'var(--space-sm)' }}>AI Beauty Analysis</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Personalised recommendations based on your unique needs</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
        {analysisTypes.map((type) => (
          <Card key={type.id} variant={selectedType?.id === type.id ? 'accent' : 'default'}
            onClick={() => setSelectedType(type)} padding="var(--space-lg)"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: selectedType?.id === type.id ? '2px solid var(--color-accent)' : 'var(--glass-border)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem', width: '56px', height: '56px', borderRadius: '50%', background: selectedType?.id === type.id ? 'rgba(200,144,122,0.2)' : 'var(--color-cream-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{type.icon}</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{type.label} Analysis</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{type.description}</p>
              </div>
            </div>
            <FiArrowRight size={20} color={selectedType?.id === type.id ? 'var(--color-accent)' : 'var(--text-muted)'} />
          </Card>
        ))}
      </div>

      <Button variant="primary" fullWidth size="lg" disabled={!selectedType} onClick={() => setMode('guidance')}>
        {selectedType ? `Start ${selectedType.label} Analysis →` : 'Select an Analysis Type'}
      </Button>

      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'var(--space-lg)' }}>
        Analysis is for guidance only. Not a medical diagnosis.
      </p>
    </div>
  );
}
