'use client';

import React from 'react';
import { PieChart, TrendingUp, ShieldCheck, CheckCircle2, RotateCcw, Send } from 'lucide-react';

export interface LedgerTransaction {
  cardId: string;
  value: number;
  commitment: string;
  status: 'ACTIVE' | 'REDEEMED' | 'TRANSFERRED' | 'REFUNDED';
  timestamp: string;
}

interface MerchantLedgerProps {
  transactions: LedgerTransaction[];
}

export const MerchantLedger: React.FC<MerchantLedgerProps> = ({ transactions }) => {
  const totalIssued = transactions.length;
  const totalRedeemed = transactions.filter(t => t.status === 'REDEEMED').reduce((sum, t) => sum + t.value, 0);
  const activeCount = transactions.filter(t => t.status === 'ACTIVE').length;
  const totalTransfers = transactions.filter(t => t.status === 'TRANSFERRED').length;

  return (
    <div className="glass-panel" style={{ padding: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PieChart size={20} color="var(--accent-midnight)" /> Merchant Analytics & Voucher Ledger
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Zero-knowledge campaign tracking and voucher ledger without disclosing recipient identities.
        </p>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Cards Issued</span>
            <ShieldCheck size={18} color="var(--accent-midnight)" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800 }}>{totalIssued}</div>
          <div style={{ fontSize: '11px', color: 'var(--accent-purple)', marginTop: '4px' }}>On-Chain Compact Circuits</div>
        </div>

        <div style={{ background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Value Claimed</span>
            <TrendingUp size={18} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-emerald)' }}>${totalRedeemed}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Confidential ZK Proofs</div>
        </div>

        <div style={{ background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Commitments</span>
            <CheckCircle2 size={18} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-cyan)' }}>{activeCount}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Unredeemed in Circulation</div>
        </div>

        <div style={{ background: 'rgba(10, 12, 22, 0.7)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>P2P Transfers (August)</span>
            <Send size={18} color="var(--accent-gold)" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-gold)' }}>{totalTransfers}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Re-Gifted Ownerships</div>
        </div>
      </div>

      {/* Ledger Table */}
      <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '14px' }}>
        Live Voucher Commitments Ledger
      </h4>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>Card ID</th>
              <th style={{ padding: '12px 16px' }}>Value</th>
              <th style={{ padding: '12px 16px' }}>ZK Commitment Hash</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.cardId} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {tx.cardId}
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  ${tx.value}
                </td>
                <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                  {tx.commitment.length > 20 ? `${tx.commitment.substring(0, 10)}...${tx.commitment.substring(tx.commitment.length - 8)}` : tx.commitment}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: tx.status === 'ACTIVE' ? 'rgba(6, 182, 212, 0.15)' : tx.status === 'REDEEMED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: tx.status === 'ACTIVE' ? 'var(--accent-cyan)' : tx.status === 'REDEEMED' ? 'var(--accent-emerald)' : 'var(--accent-gold)',
                    }}
                  >
                    {tx.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                  {tx.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
