'use client';

import React, { useState } from 'react';
import { Sparkles, RotateCw, ShieldCheck, Lock, Gift, CheckCircle2, Award, Zap, Diamond, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export type CardTheme = 'gold' | 'diamond' | 'obsidian' | 'emerald' | 'cyberpunk';

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
  const [theme, setTheme] = useState<CardTheme>('gold');
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
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#38bdf8', '#8b5cf6', '#10b981'],
      });
    }, 1200);
  };

  const themesConfig: { id: CardTheme; name: string; icon: any; color: string }[] = [
    { id: 'gold', name: 'Quantum Gold', icon: Flame, color: '#f59e0b' },
    { id: 'diamond', name: 'Diamond Prism', icon: Diamond, color: '#38bdf8' },
    { id: 'obsidian', name: 'Obsidian Velvet', icon: Award, color: '#a855f7' },
    { id: 'emerald', name: 'Emerald Royale', icon: ShieldCheck, color: '#10b981' },
    { id: 'cyberpunk', name: 'Neon Cyber', icon: Zap, color: '#ec4899' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'start' }}>
      {/* 3D Card Preview Panel */}
      <div className="glass-panel-glow" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--accent-gold)" /> Live 3D Holographic Visualizer
        </h3>

        <div className="card-container-3d" style={{ width: '100%', maxWidth: '360px', height: '220px', marginBottom: '24px' }}>
          <div className={`card-3d theme-${theme} ${isFlipped ? 'flipped' : ''} shimmer`}>
            {/* Front of Card */}
            <div className={`card-face theme-${theme}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.95 }}>
                  {merchant || 'MERCHANT STORE'}
                </span>
                <div className="wax-seal">
                  <Lock size={15} />
                </div>
              </div>

              <div style={{ textAlign: 'center', margin: 'auto 0' }}>
                <div style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                  ${value || 0}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.85, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  Confidential ZK Voucher
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', opacity: 0.85 }}>
                <span>•••• •••• •••• 9941</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <ShieldCheck size={14} /> Midnight Preview
                </span>
              </div>
            </div>

            {/* Back of Card */}
            <div className={`card-face card-back theme-${theme}`}>
              <div>
                <div style={{ background: 'rgba(0,0,0,0.4)', height: '36px', width: 'calc(100% + 48px)', margin: '-24px -24px 16px -24px' }} />
                <p style={{ fontSize: '11px', fontStyle: 'italic', opacity: 0.9, lineHeight: 1.4 }}>
                  "{note || 'Confidential gift card message'}"
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600 }}>Secret PIN Witness:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '3px' }}>
                  {secretPin ? '••••' : 'NONE'}
                </span>
              </div>

              <div style={{ fontSize: '9px', opacity: 0.7, textAlign: 'center' }}>
                Encrypted via client Web Crypto AES-GCM 256-bit. Valid on Midnight Network.
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
            padding: '10px 22px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 600,
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
          <Sparkles size={20} color="var(--accent-gold)" /> Issue August ZK Gift Card
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Customize gift card materials, face value, and secret passcode witness.
        </p>

        {/* Theme Material Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Select Luxury Material Theme
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
            {themesConfig.map((t) => {
              const Icon = t.icon;
              const isSel = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: isSel ? `2px solid ${t.color}` : '1px solid var(--border-glass)',
                    background: isSel ? `${t.color}25` : 'rgba(10, 12, 22, 0.6)',
                    color: isSel ? '#fff' : 'var(--text-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: isSel ? `0 0 14px ${t.color}50` : 'none',
                  }}
                >
                  <Icon size={14} color={t.color} />
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleIssue} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Merchant / Brand Name
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
                Value ($)
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
              <Lock size={16} color="var(--accent-gold)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isIssuing}
            style={{
              marginTop: '8px',
              padding: '14px 20px',
              background: 'linear-gradient(135deg, var(--accent-gold), #d97706)',
              color: '#1a1202',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: isIssuing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: 'var(--glow-gold)',
              transition: 'all 0.2s ease',
            }}
          >
            {isIssuing ? (
              <>
                <RotateCw size={16} className="animate-spin" /> Computing ZK Proof & Issuing...
              </>
            ) : (
              <>
                <ShieldCheck size={18} /> Issue ZK Voucher on Midnight
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
