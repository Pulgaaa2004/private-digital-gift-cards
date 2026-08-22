'use client';

import React, { useState } from 'react';
import { Gift, Layers, Sparkles, Lock, PieChart, Terminal, Shield, Send, Cpu } from 'lucide-react';
import { CardStudio3D } from '../components/CardStudio3D';
import { ScratchCanvas } from '../components/ScratchCanvas';
import { ZKFlowchartVisualizer } from '../components/ZKFlowchartVisualizer';
import { LaceWalletButton } from '../components/LaceWalletButton';
import { EncryptedVault } from '../components/EncryptedVault';
import { MerchantLedger, LedgerTransaction } from '../components/MerchantLedger';
import { ContractInspector } from '../components/ContractInspector';
import { TransferModal } from '../components/TransferModal';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'studio' | 'scratch' | 'flowchart' | 'vault' | 'ledger' | 'inspector'>('studio');
  const [transferringCard, setTransferringCard] = useState<{ id: string; value: number } | null>(null);

  // Initial dummy state synced across tabs
  const [vaultCards, setVaultCards] = useState<any[]>([
    {
      id: 'CARD-4412-ZK',
      merchant: 'Cyber Tech Hub',
      value: 50,
      status: 'CLAIMED',
      code: 'GIFT-CYBER-50-REDEEMED',
      note: 'Thanks for contributing to Midnight Network!',
      timestamp: '2026-08-22 14:15:22',
    },
    {
      id: 'CARD-8819-ZK',
      merchant: 'Luxe Digital Store',
      value: 100,
      status: 'ACTIVE',
      code: 'GIFT-LUXE-100-ZK',
      note: 'Happy Birthday! Enjoy your private digital reward.',
      timestamp: '2026-08-22 15:30:00',
    },
  ]);

  const [transactions, setTransactions] = useState<LedgerTransaction[]>([
    {
      cardId: 'CARD-8819-ZK',
      value: 100,
      commitment: '0x7f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
      status: 'ACTIVE',
      timestamp: '2026-08-22 15:30:00',
    },
    {
      cardId: 'CARD-4412-ZK',
      value: 50,
      commitment: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      status: 'REDEEMED',
      timestamp: '2026-08-22 14:15:22',
    },
    {
      cardId: 'CARD-9941-ZK',
      value: 200,
      commitment: '0x3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a',
      status: 'ACTIVE',
      timestamp: '2026-08-22 13:45:10',
    },
  ]);

  const handleCardIssued = (newCard: any) => {
    setVaultCards((prev) => [
      {
        id: newCard.id,
        merchant: newCard.merchant,
        value: newCard.value,
        status: 'ACTIVE',
        code: `GIFT-${newCard.merchant.toUpperCase().replace(/\s+/g, '')}-${newCard.value}-ZK`,
        note: newCard.note,
        timestamp: 'Just now',
      },
      ...prev,
    ]);

    setTransactions((prev) => [
      {
        cardId: newCard.id,
        value: newCard.value,
        commitment: newCard.commitment,
        status: 'ACTIVE',
        timestamp: 'Just now',
      },
      ...prev,
    ]);
  };

  const handleCardRedeemed = (redemption: any) => {
    setVaultCards((prev) =>
      prev.map((c) => (c.id === redemption.cardId ? { ...c, status: 'CLAIMED' } : c))
    );

    setTransactions((prev) =>
      prev.map((t) => (t.cardId === redemption.cardId ? { ...t, status: 'REDEEMED' } : t))
    );
  };

  const handleTransferSuccess = ({ cardId, newRecipient, timestamp }: any) => {
    setVaultCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, status: 'TRANSFERRED', note: `Transferred to ${newRecipient}` } : c))
    );

    setTransactions((prev) =>
      prev.map((t) => (t.cardId === cardId ? { ...t, status: 'TRANSFERRED' } : t))
    );
    setTransferringCard(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation Bar */}
      <header
        style={{
          borderBottom: '1px solid var(--border-glass)',
          background: 'rgba(5, 7, 17, 0.85)',
          backdropFilter: 'blur(18px)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Logo & Title Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--glow-purple)',
              }}
            >
              <Gift size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Private Digital Gift Cards
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '20px',
                    background: 'rgba(245, 158, 11, 0.2)',
                    color: 'var(--accent-gold)',
                    border: '1px solid var(--border-glow)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  August Ultra 2.0
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Midnight Network ZK dApp • Next.js 14 App Router
              </div>
            </div>
          </div>

          {/* Right Header: Preview Network Badge & Lace Wallet */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '6px 14px',
                borderRadius: '20px',
                color: 'var(--accent-emerald)',
                fontWeight: 600,
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block' }} />
              Preview Network
            </div>

            <LaceWalletButton />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '32px 24px' }}>
        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'studio', label: '3D Holographic Studio', icon: Sparkles },
            { id: 'scratch', label: 'Scratch & Redeem', icon: Layers },
            { id: 'flowchart', label: 'ZK Privacy Visualizer', icon: Cpu },
            { id: 'vault', label: 'Encrypted Vault', icon: Lock },
            { id: 'ledger', label: 'Merchant Analytics', icon: PieChart },
            { id: 'inspector', label: 'State Inspector', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-glass)',
                  background: isActive ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(139, 92, 246, 0.2))' : 'rgba(15, 20, 38, 0.6)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 0 18px rgba(245, 158, 11, 0.35)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={16} color={isActive ? 'var(--accent-gold)' : 'var(--text-muted)'} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Tab Views */}
        {activeTab === 'studio' && <CardStudio3D onCardIssued={handleCardIssued} />}
        {activeTab === 'scratch' && <ScratchCanvas onCardRedeemed={handleCardRedeemed} />}
        {activeTab === 'flowchart' && <ZKFlowchartVisualizer />}
        {activeTab === 'vault' && (
          <EncryptedVault
            cards={vaultCards}
            onOpenTransfer={(card) => setTransferringCard({ id: card.id, value: card.value })}
          />
        )}
        {activeTab === 'ledger' && <MerchantLedger transactions={transactions} />}
        {activeTab === 'inspector' && (
          <ContractInspector
            totalIssued={transactions.length}
            totalRedeemed={transactions.filter(t => t.status === 'REDEEMED').reduce((sum, t) => sum + t.value, 0)}
            activeCount={transactions.filter(t => t.status === 'ACTIVE').length}
            transfersCount={transactions.filter(t => t.status === 'TRANSFERRED').length}
          />
        )}
      </main>

      {/* P2P Transfer Modal */}
      {transferringCard && (
        <TransferModal
          cardId={transferringCard.id}
          cardValue={transferringCard.value}
          onClose={() => setTransferringCard(null)}
          onTransferSuccess={handleTransferSuccess}
        />
      )}

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-glass)',
          background: 'rgba(5, 7, 17, 0.95)',
          padding: '24px',
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--text-secondary)',
        }}
      >
        <p>
          Built with 💜 for <strong>Midnight Network dApp Competition</strong> | Level 1, 2 & 3 Full-Stack Submission (August Ultra Edition)
        </p>
      </footer>
    </div>
  );
}
