'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, EyeOff, Server, CheckCircle2, ArrowRight, Sparkles, Cpu, Database, Eye } from 'lucide-react';

export const ZKFlowchartVisualizer: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [simulatedPin, setSimulatedPin] = useState('8821');

  const steps = [
    {
      id: 1,
      title: '1. Private Witness Input',
      icon: Lock,
      badge: 'Client-Side Local Memory',
      color: 'var(--accent-purple)',
      desc: 'Secret PIN, voucher serial, and recipient salt are created in the user browser witness environment.',
      details: {
        inputPin: simulatedPin,
        cardId: 'CARD-8819-ZK',
        salt: 'salt_zk_8941',
        visibility: '🔒 NEVER leaves local client memory or sent across network.',
      },
    },
    {
      id: 2,
      title: '2. Cryptographic Commitment',
      icon: Cpu,
      badge: 'SHA-256 Witness Hash',
      color: 'var(--accent-cyan)',
      desc: 'The client computes a deterministic 32-byte commitment hash sha256(cardId + secretPin + value + salt).',
      details: {
        formula: 'sha256(CARD-8819-ZK:8821:100:salt_zk_8941)',
        commitmentHex: '0x7f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
        visibility: '🔑 Fixed 32-byte commitment hash disclosed to smart contract.',
      },
    },
    {
      id: 3,
      title: '3. Midnight Proof Generation',
      icon: Server,
      badge: 'Local Proof Server (Docker:6300)',
      color: 'var(--accent-gold)',
      desc: 'The Compact ZK runtime executes prover key (redeemCard.prover) to generate zero-knowledge proof.',
      details: {
        proverKey: 'contracts/managed/private_gift_card/keys/redeemCard.prover',
        proofSize: '287 KB ZK Proof Bundle',
        visibility: '⚡ Proves PIN knowledge without revealing the raw PIN.',
      },
    },
    {
      id: 4,
      title: '4. On-Chain Ledger Verification',
      icon: Database,
      badge: 'Midnight Blockchain Ledger',
      color: 'var(--accent-emerald)',
      desc: 'Compact verifier circuit validates proof on-chain and updates public ledger metrics.',
      details: {
        disclosedValue: 'disclose(cardValue) = $100',
        updatedLedger: 'totalValueRedeemed += $100, activeCommitmentsCount -= 1',
        visibility: '✅ On-chain observers verify payout validity while recipient identity & PIN remain 100% private!',
      },
    },
  ];

  return (
    <div className="glass-panel" style={{ padding: '36px' }}>
      <div style={{ marginBottom: '28px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid var(--border-glow)', color: 'var(--accent-purple)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
          <Sparkles size={14} /> Interactive ZK Architecture Visualizer
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
          How Midnight Zero-Knowledge Privacy Works Under the Hood
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto' }}>
          Click through each step below to inspect how private witness inputs are shielded while public ledger states are updated on-chain.
        </p>
      </div>

      {/* Interactive Flow Steps Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '32px' }}>
        {steps.map((s) => {
          const Icon = s.icon;
          const isSelected = selectedStep === s.id;
          return (
            <div
              key={s.id}
              onClick={() => setSelectedStep(s.id)}
              style={{
                background: isSelected ? 'rgba(25, 30, 55, 0.9)' : 'rgba(10, 12, 22, 0.6)',
                border: isSelected ? `2px solid ${s.color}` : '1px solid var(--border-glass)',
                boxShadow: isSelected ? `0 0 20px ${s.color}40` : 'none',
                borderRadius: '14px',
                padding: '18px',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={s.color} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {s.title}
                </span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Step Detailed Inspector Card */}
      {(() => {
        const step = steps.find(s => s.id === selectedStep)!;
        const StepIcon = step.icon;
        return (
          <div style={{ background: 'rgba(10, 12, 22, 0.85)', border: `1px solid ${step.color}60`, borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StepIcon size={22} color={step.color} />
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: step.color }}>
                  {step.title} Inspector
                </h4>
              </div>

              <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}40` }}>
                {step.badge}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <h5 style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                  Execution Details & Formula
                </h5>
                <pre style={{ background: '#05070e', border: '1px solid var(--border-glass)', padding: '14px', borderRadius: '10px', fontSize: '12px', fontFamily: 'monospace', color: '#38bdf8', overflowX: 'auto', lineHeight: 1.6 }}>
                  {JSON.stringify(step.details, null, 2)}
                </pre>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                <h5 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <EyeOff size={16} color="var(--accent-purple)" /> On-Chain Observer Visibility
                </h5>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {step.details.visibility}
                </p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
