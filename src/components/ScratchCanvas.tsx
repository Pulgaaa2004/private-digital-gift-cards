'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Key, CheckCircle2, AlertCircle, RotateCw, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScratchCanvasProps {
  onCardRedeemed: (redemption: {
    cardId: string;
    value: number;
    merchant: string;
    redeemedAt: string;
  }) => void;
}

export const ScratchCanvas: React.FC<ScratchCanvasProps> = ({ onCardRedeemed }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [pinInput, setPinInput] = useState('8821');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const sampleCard = {
    id: 'CARD-8819-ZK',
    value: 100,
    merchant: 'Luxe Digital Store',
    validPin: '8821',
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw metallic gold foil layer
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#d97706');
    gradient.addColorStop(0.3, '#f59e0b');
    gradient.addColorStop(0.6, '#fbbf24');
    gradient.addColorStop(1, '#b45309');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative foil pattern & text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.font = 'bold 15px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH WITH CURSOR TO REVEAL ✨', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height),
      };
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const { x, y } = getPos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      calculateProgress();
    };

    const calculateProgress = () => {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      for (let i = 3; i < imgData.data.length; i += 4 * 16) {
        if (imgData.data[i] === 0) transparentPixels++;
      }
      const totalSampled = imgData.data.length / (4 * 16);
      const percent = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));
      setScratchPercent(percent);
    };

    const startDraw = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      scratch(e);
    };

    const stopDraw = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('touchstart', startDraw);
    canvas.addEventListener('touchmove', scratch);
    window.addEventListener('touchend', stopDraw);

    return () => {
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mousemove', scratch);
      window.removeEventListener('mouseup', stopDraw);
      canvas.removeEventListener('touchstart', startDraw);
      canvas.removeEventListener('touchmove', scratch);
      window.removeEventListener('touchend', stopDraw);
    };
  }, []);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsRedeeming(true);

    setTimeout(() => {
      if (pinInput === sampleCard.validPin) {
        setRedeemed(true);
        setIsRedeeming(false);
        onCardRedeemed({
          cardId: sampleCard.id,
          value: sampleCard.value,
          merchant: sampleCard.merchant,
          redeemedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });

        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.55 },
          colors: ['#10b981', '#06b6d4', '#f59e0b'],
        });
      } else {
        setIsRedeeming(false);
        setErrorMsg('Invalid ZK Witness PIN! Proof verification failed.');
      }
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Sparkles size={22} color="var(--accent-gold)" /> Interactive Scratch & Redeem Portal
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
          Scratch off the metallic gold foil layer with your cursor to reveal confidential voucher secrets.
        </p>

        {/* Scratch Card Container */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '420px', height: '230px', margin: '0 auto 20px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.18)' }}>
          {/* Underneath Card Content */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                {sampleCard.merchant}
              </span>
              <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                {sampleCard.id}
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '38px', fontWeight: 800 }}>${sampleCard.value}</div>
              <div style={{ fontSize: '12px', color: '#a5b4fc', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
                Claim Voucher Code: <strong>GIFT-LUXE-100-ZK</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#c7d2fe' }}>
              <span>Secret PIN Witness Required</span>
              <span>Midnight Network</span>
            </div>
          </div>

          {/* Canvas Scratch Overlay */}
          {!redeemed && (
            <canvas
              ref={canvasRef}
              width={420}
              height={230}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                cursor: 'crosshair',
                touchAction: 'none',
              }}
            />
          )}
        </div>

        {/* Progress Bar */}
        <div style={{ maxWidth: '420px', margin: '0 auto 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            <span>Foil Scratched Progress:</span>
            <span style={{ fontWeight: 700, color: scratchPercent > 50 ? 'var(--accent-emerald)' : 'var(--accent-gold)' }}>
              {scratchPercent}% Scratched
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${scratchPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-emerald))',
                transition: 'width 0.2s ease',
              }}
            />
          </div>
        </div>

        {/* Redemption Form */}
        {!redeemed ? (
          <form onSubmit={handleRedeem} style={{ maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Enter Secret PIN to Generate ZK Redemption Proof
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  maxLength={8}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
                    background: 'rgba(10, 12, 22, 0.7)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '14px',
                    letterSpacing: '2px',
                  }}
                />
                <Key size={16} color="var(--accent-emerald)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {errorMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-rose)', fontSize: '12px' }}>
                <AlertCircle size={14} /> {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isRedeeming}
              style={{
                padding: '14px 20px',
                background: 'linear-gradient(135deg, var(--accent-emerald), #059669)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: isRedeeming ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              {isRedeeming ? (
                <>
                  <RotateCw size={16} className="animate-spin" /> Verifying ZK Proof On-Chain...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} /> Submit ZK Proof & Claim Funds
                </>
              )}
            </button>
          </form>
        ) : (
          <div style={{ maxWidth: '420px', margin: '0 auto', padding: '20px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-emerald)', borderRadius: '12px' }}>
            <CheckCircle2 size={32} color="var(--accent-emerald)" style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '4px' }}>
              Gift Card Redeemed Confidentially!
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              ${sampleCard.value} claimed to your wallet on Midnight Preview Network without exposing your private PIN!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
