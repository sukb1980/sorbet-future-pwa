/* Chat (Chatbot) Page — Sorbet Future Fit
   Rule-based chatbot with suggestive chips and human escalation */
import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Avatar } from '../components/ui/Primitives';
import {
  chatbotFaq, suggestiveChips, botGreeting, escalationMessage, fallbackMessage,
  getBotResponse, chatDisclaimer
} from '../data/chatbot';
import { chatbotSendMessage, chatbotEscalate } from '../services/mockApi';
import { FiSend, FiUser } from 'react-icons/fi';

const BotMsg = ({ text, time }) => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', maxWidth: '85%' }}>
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-rose-gold), var(--color-blush-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🌸</div>
    <div>
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px var(--radius-md) var(--radius-md) var(--radius-md)', padding: '12px 16px', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      {time && <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', paddingLeft: '4px' }}>{time}</p>}
    </div>
  </div>
);

const UserMsg = ({ text, time }) => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', maxWidth: '85%', alignSelf: 'flex-end', flexDirection: 'row-reverse' }}>
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiUser size={15} color="#fff" /></div>
    <div>
      <div style={{ background: 'var(--color-accent)', borderRadius: 'var(--radius-md) 4px var(--radius-md) var(--radius-md)', padding: '12px 16px', fontSize: '0.9rem', color: '#fff', lineHeight: 1.6 }}>{text}</div>
      {time && <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right', paddingRight: '4px' }}>{time}</p>}
    </div>
  </div>
);

const fmtTime = () => new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });

export default function Chat() {
  const { currentUser } = useAppContext();
  const [messages, setMessages] = useState([{ id: 'm0', from: 'bot', text: botGreeting, time: fmtTime() }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [escalating, setEscalating] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const addMessage = (from, text) => {
    setMessages((prev) => [...prev, { id: `m${Date.now()}`, from, text, time: fmtTime() }]);
  };

  const send = async (text = input.trim()) => {
    if (!text) return;
    setInput('');
    addMessage('user', text);

    if (text.toLowerCase().includes('human') || text.toLowerCase().includes('therapist') || text.toLowerCase().includes('agent')) {
      handleEscalate();
      return;
    }

    setTyping(true);
    await chatbotSendMessage(text);
    setTyping(false);
    const response = getBotResponse(text);
    addMessage('bot', response || fallbackMessage);
  };

  const handleChip = (chip) => {
    if (chip.category === 'escalate') { handleEscalate(); return; }
    const faq = chatbotFaq.find((f) => f.category === chip.category);
    if (faq) { send(faq.question); }
  };

  const handleEscalate = async () => {
    if (escalated) return;
    setEscalating(true);
    addMessage('bot', escalationMessage);
    const result = await chatbotEscalate(currentUser?.id);
    setEscalating(false);
    setEscalated(true);
    addMessage('bot', `You're #${result.queuePosition} in the queue. Estimated wait: ${result.estimatedWaitMin} minutes. A therapist will be with you shortly. 💅`);
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100dvh - var(--top-nav-height) - var(--bottom-nav-height))', background: 'var(--color-bg)' }}>
      {/* Header */}
      <div style={{ padding: '16px var(--space-lg)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-rose-gold), var(--color-blush-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🌸</div>
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '1px' }}>Sage — Beauty Assistant</h3>
          <p style={{ fontSize: '0.75rem', color: escalated ? 'var(--color-warning)' : 'var(--color-success)' }}>
            {escalating ? '⏳ Connecting to therapist...' : escalated ? '💬 Connected to therapist' : '🟢 Online'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {messages.map((msg) => (
          msg.from === 'bot'
            ? <BotMsg key={msg.id} text={msg.text} time={msg.time} />
            : <UserMsg key={msg.id} text={msg.text} time={msg.time} />
        ))}
        {typing && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-rose-gold), var(--color-blush-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🌸</div>
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '12px 16px', display: 'flex', gap: '6px', alignItems: 'center' }}>
              {[0, 1, 2].map((i) => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)', animation: `skeleton-pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestive Chips (shown before user sends) */}
      {messages.length <= 1 && (
        <div style={{ padding: '0 var(--space-lg) var(--space-sm)', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '8px', paddingBottom: '4px' }}>
            {suggestiveChips.map((chip) => (
              <button key={chip.label} onClick={() => handleChip(chip)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: '0.8125rem', fontWeight: 500, whiteSpace: 'nowrap', color: 'var(--text-secondary)', transition: 'var(--transition-fast)' }}>
                {chip.icon} {chip.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{ padding: '4px var(--space-lg)', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>{chatDisclaimer}</div>

      {/* Input */}
      <div style={{ padding: 'var(--space-md) var(--space-lg)', borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)', display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
        <input
          value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
          placeholder={escalated ? 'Chat with your therapist...' : 'Ask Sage anything...'}
          style={{ flex: 1, padding: '12px 16px', background: 'var(--color-cream-deep)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', fontSize: '0.9rem', color: 'var(--text-primary)', outline: 'none', fontFamily: 'var(--font-family)' }}
        />
        <button onClick={() => send()} disabled={!input.trim() || typing}
          style={{ width: '44px', height: '44px', borderRadius: '50%', background: input.trim() ? 'var(--color-accent)' : 'var(--color-border)', border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-fast)', flexShrink: 0 }}>
          <FiSend size={18} color={input.trim() ? '#fff' : 'var(--text-muted)'} />
        </button>
        {!escalated && (
          <button onClick={handleEscalate} title="Connect to therapist"
            style={{ height: '44px', padding: '0 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-family)', whiteSpace: 'nowrap' }}>
            👩 Connect
          </button>
        )}
      </div>
    </div>
  );
}
