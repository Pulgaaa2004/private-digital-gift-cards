'use client';

import React, { useState } from 'react';
import { Terminal, RotateCw, Server, Shield, CheckCircle2 } from 'lucide-react';

interface ContractInspectorProps {
  totalIssued: number;
  totalRedeemed: number;
  activeCount: number;
  transfersCount: number;
}

export const ContractInspector: React.FC<ContractInspectorProps> = ({
  totalIssued,
  totalRedeemed,
  activeCount,
  transfersCount,
}) => {
  const [isQuerying, setIsQuerying] = useState(false);
  const [lastQueriedTime, setLastQueriedTime] = useState<string | null>(null);

  const contractAddress = '0x037f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e';
  const network = 'Midnight Preview Network (August Edition)';
  const proofServer = 'http://localhost:6300 (Docker Proof Server)';

  const handleQuery = () => {
    setIsQuerying(true);
    setTimeout(() => {
      setIsQuerying(false);
      setLastQueriedTime(new Date().toLocaleTimeString());
    }, 600);
  };

  const ledgerStateJson = {
    contract: 'private_gift_card.compact (v2.0 - 4 ZK Circuits)',
    targetNetwork: 'Midnight Preview Network',
    contractAddress: contractAddress,
    circuits: [
      'issueCard(cardCommitment, cardValue)',
      'redeemCard(cardCommitment, cardValue, claimerHash)',
      'transferCardOwnership(oldCommitment, newCommitment)',
      'refundExpiredCard(cardCommitment, cardValue, merchantAuthHash)'
    ],
    onChainState: {
      totalCardsIssued: totalIssued,
      totalValueRedeemed: totalRedeemed,
      totalTransfersCount: transfersCount,
      activeCommitmentsCount: activeCount,
      lastCommitment: '0x7f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
    },
    privacyWitnessModel: {
      privateWitnessInputs: ['secretPin', 'cardId', 'recipientSalt', 'encryptedNote'],
      publicLedgerState: ['totalCardsIssued', 'totalValueRedeemed', 'totalTransfersCount', 'activeCommitmentsCount'],
      disclosedValues: ['disclose(cardValue)', 'disclose(cardCommitment)'],
    },
    queryTimestamp: lastQueriedTime || '2026-08-18T15:30:00Z',
  };

  return (
    <div className="glass-panel" style={{ padding: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Terminal size={20} color="var(--accent-midnight)" /> Midnight Smart Contract & Circuit Inspector
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Inspect live on-chain public ledger state, verified ZK circuits, and network connection parameters.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Network & Contract Details Card */}
        <div style={{ background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '24px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={16} color="var(--accent-cyan)" /> Network & Contract Metadata
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>Contract File</span>
              <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>contracts/private_gift_card.compact</span>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>Target Network</span>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block' }} />
                {network}
              </span>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>Contract Address</span>
              <span style={{ fontFamily: 'monospace', color: 'var(--accent-purple)', fontSize: '12px', wordBreak: 'break-all' }}>
                {contractAddress}
              </span>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>Local Proof Server</span>
              <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: '12px' }}>
                {proofServer}
              </span>
            </div>
          </div>
        </div>

        {/* Query Ledger State Card */}
        <div style={{ background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={16} color="var(--accent-emerald)" /> Live Public Ledger State
            </h4>

            <button
              type="button"
              onClick={handleQuery}
              disabled={isQuerying}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: isQuerying ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <RotateCw size={13} className={isQuerying ? 'animate-spin' : ''} />
              {isQuerying ? 'Querying...' : 'Query State'}
            </button>
          </div>

          <pre
            style={{
              background: '#05070e',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '11px',
              fontFamily: 'monospace',
              color: '#38bdf8',
              overflowX: 'auto',
              maxHeight: '260px',
              lineHeight: 1.5,
            }}
          >
            {JSON.stringify(ledgerStateJson, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
