'use client';

import React, { useState } from 'react';
import { Send, Lock, RotateCw, CheckCircle2, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TransferModalProps {
  cardId: string;
  cardValue: number;
  onClose: () => void;
  onTransferSuccess: (transferred: { cardId: string; newRecipient: string; timestamp: string }) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  cardId,
  cardValue,
  onClose,
  onTransferSuccess,
}) => {
  const [recipient, setRecipient] = useState('mn_preview1qxyz89...recipient');
  const [newPin, setNewPin] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !newPin) return;

    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      setSuccess(true);
      onTransferSuccess({
        cardId,
        newRecipient: recipient,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#8b5cf6'],
      });
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
    >
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '32px', background: '#111425' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Send size={18} color="var(--accent-cyan)" /> Confidential Card Re-Gift / Transfer
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Transfer voucher <strong>{cardId}</strong> (${cardValue}) to another recipient on Midnight without revealing your identity on-chain.
        </p>

        {!success ? (
          <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Recipient Address / Public Key
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: '#fff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Assign New Secret Passcode (ZK Witness)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  maxLength={8}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="New 4-digit PIN for recipient"
                  required
                  style={{ width: '100%', padding: '10px 14px 10px 36px', background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: '#fff', fontSize: '13px', letterSpacing: '2px' }}
                />
                <Lock size={15} color="var(--accent-cyan)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isTransferring}
                style={{
                  flex: 1.5,
                  padding: '12px',
                  background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: isTransferring ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {isTransferring ? (
                  <>
                    <RotateCw size={14} className="animate-spin" /> Transferring...
                  </>
                ) : (
                  <>
                    <Shield size={15} /> Execute ZK Transfer
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <CheckCircle2 size={36} color="var(--accent-emerald)" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '6px' }}>
              Voucher Transferred Successfully!
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '18px' }}>
              New zero-knowledge commitment generated on Midnight Preview Network.
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
