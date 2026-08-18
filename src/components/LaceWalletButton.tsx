'use client';

import React, { useState } from 'react';
import { Wallet, CheckCircle2, ChevronDown, LogOut, Copy, Check } from 'lucide-react';

interface LaceWalletButtonProps {
  onWalletChange?: (connected: boolean, address: string) => void;
}

export const LaceWalletButton: React.FC<LaceWalletButtonProps> = ({ onWalletChange }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const sampleAddress = 'mn_preview1qxyz8942klmno482390148194819481';
  const truncatedAddress = 'mn_preview1q...8481';
  const balance = '250.00 tNIGHT';

  const toggleConnect = () => {
    if (isConnected) {
      setIsConnected(false);
      setShowMenu(false);
      if (onWalletChange) onWalletChange(false, '');
      return;
    }

    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      if (onWalletChange) onWalletChange(true, sampleAddress);
    }, 800);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(sampleAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative' }}>
      {!isConnected ? (
        <button
          type="button"
          onClick={toggleConnect}
          disabled={isConnecting}
          style={{
            background: 'linear-gradient(135deg, var(--accent-midnight), var(--accent-purple))',
            border: 'none',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: isConnecting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--glow-purple)',
            transition: 'all 0.2s ease',
          }}
        >
          <Wallet size={16} />
          {isConnecting ? 'Connecting...' : 'Connect Lace Wallet'}
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            onClick={() => setShowMenu(!showMenu)}
            style={{
              background: 'rgba(25, 30, 55, 0.8)',
              border: '1px solid var(--border-glow)',
              padding: '6px 14px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block' }} />
                {balance}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontFamily: 'monospace', fontWeight: 600 }}>
                {truncatedAddress}
              </span>
            </div>
            <ChevronDown size={14} color="var(--text-secondary)" />
          </div>

          {showMenu && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '200px',
                padding: '8px',
                zIndex: 100,
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              }}
            >
              <button
                type="button"
                onClick={copyAddress}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                {copied ? 'Copied Address!' : 'Copy Full Address'}
              </button>

              <div style={{ height: '1px', background: 'var(--border-glass)', margin: '4px 0' }} />

              <button
                type="button"
                onClick={toggleConnect}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'var(--accent-rose)',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <LogOut size={14} /> Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
