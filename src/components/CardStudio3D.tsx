'use client';

import React, { useState } from 'react';
import { Sparkles, RotateCw, ShieldCheck, Lock, Gift, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export type CardTheme = 'obsidian' | 'gold' | 'cyberpunk' | 'emerald';

interface CardStudio3DProps {
  onCardIssued: (card: {
    id: string;
    merchant: string;
    value: number;
    secretPin: string;
    note: string;
    theme: CardTheme;
    commitment: string;
    timestamp: string;
  }) => void;
}

export const CardStudio3D: React.FC<CardStudio3DProps> = ({ onCardIssued }) => {
  const [theme, setTheme] = useState<CardTheme>('obsidian');
  const [isFlipped, setIsFlipped] = useState(false);
  const [merchant, setMerchant] = useState('Luxe Digital Store');
  const [value, setValue] = useState(100);
  const [secretPin, setSecretPin] = useState('8821');
  const [note, setNote] = useState('Happy Birthday! Enjoy your private digital reward.');
  const [isIssuing, setIsIssuing] = useState(false);
  const [issuedResult, setIssuedResult] = useState<{ id: string; commitment: string } | null>(null);

  // Compute deterministic SHA-256 commitment hash
  const generateCommitment = async (cardId: string, pin: string, val: number, salt: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(`${cardId}:${pin}:${val}:${salt}`);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchant || !value || !secretPin) return;

    setIsIssuing(true);
    const cardId = `CARD-${Math.floor(1000 + Math.random() * 9000)}-ZK`;
    const salt = Math.random().toString(36).substring(2, 10);
    
    // Simulate ZK circuit computation and proof generation
    setTimeout(async () => {
      const commitment = await generateCommitment(cardId, secretPin, value, salt);
      const newCard = {
        id: cardId,
        merchant,
        value: Number(value),
        secretPin,
        note,
        theme,
        commitment: `0x${commitment}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      onCardIssued(newCard);
      setIssuedResult({ id: cardId, commitment: `0x${commitment}` });
      setIsIssuing(false);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#f59e0b', '#06b6d4', '#10b981'],
      });
    }, 1200);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'start' }}>
      {/* 3D Card Preview Panel */}
      <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--accent-gold)" /> Live 3D Gift Card Visualizer
        </h3>

        <div className="card-container-3d" style={{ width: '100%', maxWidth: '360px', height: '220px', marginBottom: '24px' }}>
          <div className={`card-3d theme-${theme} ${isFlipped ? 'flipped' : ''} shimmer`}>
            {/* Front of Card */}
            <div className={`card-face theme-${theme}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.9 }}>
                  {merchant || 'MERCHANT STORE'}
                </span>
                <Gift size={22} style={{ opacity: 0.8 }} />
              </div>

              <div style={{ textAlign: 'center', margin: 'auto 0' }}>
                <div style={{ fontSize: '38px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                  ${value || 0}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, opacity: 0.8, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Confidential Gift Voucher
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', opacity: 0.75 }}>
                <span>•••• •••• •••• 9941</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={13} /> Midnight ZK Enforced
                </span>
              </div>
            </div>

            {/* Back of Card */}
            <div className={`card-face card-back theme-${theme}`}>
              <div>
                <div style={{ background: 'rgba(0,0,0,0.35)', height: '36px', width: 'calc(100% + 48px)', margin: '-24px -24px 16px -24px' }} />
                <p style={{ fontSize: '11px', fontStyle: 'italic', opacity: 0.85, lineHeight: 1.4 }}>
                  "{note || 'Confidential gift card message'}"
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600 }}>Secret PIN:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '3px' }}>
                  {secretPin ? '••••' : 'NONE'}
                </span>
              </div>

              <div style={{ fontSize: '9px', opacity: 0.6, textAlign: 'center' }}>
                Zero-knowledge proof required to redeem. Valid on Midnight Preview.
              </div>
            </div>
          </div>
        </div>

        {/* 3D Action Controls */}
        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-primary)',
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          <RotateCw size={14} /> Flip Card 3D
        </button>
      </div>

      {/* Issuance Form Panel */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={20} color="var(--accent-midnight)" /> Customize & Issue ZK Gift Card
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Issue zero-knowledge vouchers backed by Midnight smart contract circuit.
        </p>

        {/* Theme Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Card Visual Theme
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {(['obsidian', 'gold', 'cyberpunk', 'emerald'] as CardTheme[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                style={{
                  padding: '8px 4px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  border: theme === t ? '2px solid var(--accent-midnight)' : '1px solid var(--border-glass)',
                  background: t === 'obsidian' ? '#1e1e24' : t === 'gold' ? '#f59e0b' : t === 'cyberpunk' ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : '#059669',
                  color: t === 'gold' ? '#000' : '#fff',
                  boxShadow: theme === t ? '0 0 12px rgba(139, 92, 246, 0.5)' : 'none',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleIssue} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Merchant / Store Name
              </label>
              <input
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Voucher Value ($)
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                required
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Personal Secret Message (Client-Side Encrypted)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Claim Passcode / PIN (Zero-Knowledge Private Witness)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                maxLength={8}
                value={secretPin}
                onChange={(e) => setSecretPin(e.target.value)}
                placeholder="4+ digit secret passcode"
                required
                style={{ width: '100%', padding: '10px 14px 10px 38px', background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: '#fff', fontSize: '13px', letterSpacing: '2px' }}
              />
              <Lock size={16} color="var(--accent-midnight)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Observers cannot see this PIN. It is hashed into the card's ZK commitment.
            </p>
          </div>

          <button
            type="submit"
            disabled={isIssuing}
            style={{
              marginTop: '8px',
              padding: '14px 20px',
              background: 'linear-gradient(135deg, var(--accent-midnight), var(--accent-purple))',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isIssuing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: 'var(--glow-purple)',
              transition: 'all 0.2s ease',
            }}
          >
            {isIssuing ? (
              <>
                <RotateCw size={16} className="animate-spin" /> Computing ZK Proof & Issuing...
              </>
            ) : (
              <>
                <ShieldCheck size={18} /> Issue ZK Card on Midnight
              </>
            )}
          </button>
        </form>

        {/* Issued Success Feedback */}
        {issuedResult && (
          <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
              <CheckCircle2 size={16} /> Card Issued Successfully on Midnight!
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              <strong>Card ID:</strong> {issuedResult.id}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', wordBreak: 'break-all', marginTop: '4px', fontFamily: 'monospace' }}>
              <strong>Commitment:</strong> {issuedResult.commitment}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
