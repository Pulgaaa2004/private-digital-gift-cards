'use client';

import React, { useState } from 'react';
import { Lock, Shield, Send, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';

interface VaultCard {
  id: string;
  merchant: string;
  value: number;
  status: 'ACTIVE' | 'CLAIMED' | 'TRANSFERRED';
  code: string;
  note: string;
  timestamp: string;
}

interface EncryptedVaultProps {
  cards: VaultCard[];
  onOpenTransfer: (card: VaultCard) => void;
}

export const EncryptedVault: React.FC<EncryptedVaultProps> = ({ cards, onOpenTransfer }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={20} color="var(--accent-midnight)" /> Encrypted Gift Card Vault
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Your claimed and saved gift cards are safely stored in your browser's encrypted local storage.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '6px 12px', borderRadius: '8px', color: 'var(--accent-purple)' }}>
          <Shield size={14} /> AES-GCM 256-Bit Encrypted
        </div>
      </div>

      {cards.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
          <Sparkles size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
          <p style={{ fontSize: '14px' }}>No gift cards in vault yet. Issue or redeem a voucher to see it here!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                background: 'rgba(10, 12, 22, 0.7)',
                border: '1px solid var(--border-glass)',
                borderRadius: '12px',
                padding: '18px 22px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {card.merchant}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: card.status === 'ACTIVE' ? 'rgba(6, 182, 212, 0.15)' : card.status === 'CLAIMED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                      color: card.status === 'ACTIVE' ? 'var(--accent-cyan)' : card.status === 'CLAIMED' ? 'var(--accent-emerald)' : 'var(--text-muted)',
                    }}
                  >
                    {card.status}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  Card ID: {card.id} • {card.timestamp}
                </div>

                {card.note && (
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '2px' }}>
                    "{card.note}"
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    ${card.value}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    {card.code}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(card.id, card.code)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid var(--border-glass)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {copiedId === card.id ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
                    {copiedId === card.id ? 'Copied' : 'Copy'}
                  </button>

                  {card.status === 'ACTIVE' && (
                    <button
                      type="button"
                      onClick={() => onOpenTransfer(card)}
                      style={{
                        background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Send size={13} /> Re-Gift
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
