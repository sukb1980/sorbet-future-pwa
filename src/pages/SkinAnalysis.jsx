import React, { useState } from 'react';
import { analysisSamples } from '../data/skin-analysis';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function SkinAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const simulateUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult(analysisSamples[0]);
      setAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="page-container">
      <h2 style={{ marginBottom: '16px' }}>AI Skin Analysis</h2>
      
      {!result ? (
        <Card style={{ textAlign: 'center', padding: '40px 16px' }}>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Upload a clear, well-lit photo of your face for an AI-powered assessment of your skin health.
          </p>
          
          <Button 
            variant="solid" 
            onClick={simulateUpload} 
            disabled={analyzing}
          >
            {analyzing ? 'Processing...' : 'Upload Image'}
          </Button>

          {analyzing && (
             <div style={{ marginTop: '24px', fontStyle: 'italic', color: '#888' }}>
               Analyzing hydration levels...
             </div>
          )}
        </Card>
      ) : (
        <div className="animate-fade-in">
          <Card style={{ marginBottom: '16px', background: '#F9FFF9', border: '1px solid #E2F0E2' }}>
            <h3 style={{ marginBottom: '8px' }}>Analysis Complete</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{result.disclaimer}</p>
          </Card>

          <Card style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h4 style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Primary Concern</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{result.concern}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h4 style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Score</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{result.score}/100</div>
              </div>
            </div>
            
            <p style={{ fontSize: '0.875rem' }}>Confidence: {Math.round(result.confidence * 100)}%</p>
          </Card>

          <Card>
            <h4 style={{ marginBottom: '8px' }}>Recommended for you</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>
              Based on your hydration levels, we suggest these products and services:
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="outline" style={{ flex: 1 }}>View Services</Button>
              <Button variant="outline" style={{ flex: 1 }}>View Products</Button>
            </div>
          </Card>

          <Button variant="text" onClick={() => setResult(null)} style={{ marginTop: '24px', width: '100%' }}>
            Retake Analysis
          </Button>
        </div>
      )}
    </div>
  );
}
