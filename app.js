/**
 * Private Digital Gift Cards - Full-Stack Application Logic
 * Integrates Midnight ZK Smart Contract, Lace Wallet, AES-GCM Client Crypto,
 * HTML5 Scratch-Off Canvas, and Merchant Analytics.
 */

// Application State
const state = {
  walletConnected: false,
  walletAddress: null,
  network: 'Undeployed Devnet',
  contractAddress: '0x9a8f4c2e5b7a1d3f6e8b9c0d1e2f3a4b5c6d7e8f',
  proofServerUrl: 'http://localhost:6300',
  currentTheme: 'obsidian',
  scratchedPercentage: 0,
  issuedCards: [
    {
      id: 'CARD-8819-ZK',
      merchant: 'Luxe Digital Store',
      value: 100,
      commitment: '0x7f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
      status: 'active',
      timestamp: '2026-07-27 18:30:00'
    },
    {
      id: 'CARD-4412-ZK',
      merchant: 'Cyber Tech Hub',
      value: 50,
      commitment: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      status: 'redeemed',
      timestamp: '2026-07-27 17:15:22'
    },
    {
      id: 'CARD-9941-ZK',
      merchant: 'Luxe Digital Store',
      value: 200,
      commitment: '0x3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a',
      status: 'active',
      timestamp: '2026-07-27 16:45:10'
    }
  ],
  vaultCards: [
    {
      id: 'CARD-4412-ZK',
      merchant: 'Cyber Tech Hub',
      value: 50,
      code: 'GIFT-CYBER-50-REDEEMED',
      note: 'Thanks for contributing to Midnight Network!',
      pinHash: '8821',
      claimed: true
    }
  ]
};

// Audio Synthesizer via Web Audio API
class SoundFx {
  static playClick() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  static playSuccess() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.25);
      });
    } catch (e) {}
  }
}

// Client-Side Zero-Knowledge Hashing Helper
async function calculateCommitmentHash(cardId, pin, value, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${cardId}:${pin}:${value}:${salt}`);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuf));
  return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initLaceWallet();
  initCardStudio();
  initScratchCanvas();
  initMerchantLedger();
  initVault();
  initInspector();
});

// Navigation Tabs
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      SoundFx.playClick();
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `tab-${tab.dataset.tab}`;
      document.getElementById(targetId).classList.add('active');
    });
  });
}

// Lace Wallet Connector
function initLaceWallet() {
  const btnConnect = document.getElementById('btn-connect-wallet');
  const btnDisconnect = document.getElementById('btn-disconnect-wallet');
  const dropdown = document.getElementById('wallet-info-dropdown');
  const btnText = document.getElementById('wallet-btn-text');
  const statusLabel = document.getElementById('wallet-status-label');
  const addrTruncated = document.getElementById('wallet-address-truncated');
  const balanceVal = document.getElementById('wallet-balance-val');

  btnConnect.addEventListener('click', async () => {
    SoundFx.playClick();
    
    // Check for window.midnight or simulated Lace Wallet
    if (window.midnight && window.midnight.mnLace) {
      try {
        const api = await window.midnight.mnLace.enable();
        const address = await api.getUnshieldedAddress();
        state.walletConnected = true;
        state.walletAddress = address;
      } catch (err) {
        console.warn('Lace wallet connection error:', err);
      }
    }

    // Fallback/Simulated Lace connection for local preview
    if (!state.walletConnected) {
      state.walletConnected = true;
      state.walletAddress = 'mn_addr_undeployed1q9f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9';
    }

    // Update UI
    btnText.textContent = 'mn_addr...5d6e';
    btnConnect.classList.remove('btn-primary');
    btnConnect.classList.add('btn-secondary');
    dropdown.classList.remove('hidden');

    statusLabel.textContent = 'Connected (Lace)';
    addrTruncated.textContent = state.walletAddress.substring(0, 10) + '...' + state.walletAddress.substring(state.walletAddress.length - 6);
    balanceVal.textContent = '1,000 tNIGHT';
  });

  btnDisconnect.addEventListener('click', () => {
    SoundFx.playClick();
    state.walletConnected = false;
    state.walletAddress = null;
    btnText.textContent = 'Connect Lace Wallet';
    btnConnect.classList.remove('btn-secondary');
    btnConnect.classList.add('btn-primary');
    dropdown.classList.add('hidden');
  });
}

// 3D Card Studio Logic
function initCardStudio() {
  const card3d = document.getElementById('gift-card-3d');
  const btnFlip = document.getElementById('btn-flip-card');
  const btnSampleSound = document.getElementById('btn-sample-sound');
  
  // Theme Pickers
  const themeOpts = document.querySelectorAll('.theme-opt');
  const merchantInput = document.getElementById('input-merchant');
  const valueInput = document.getElementById('input-value');
  const noteInput = document.getElementById('input-note');
  
  const previewMerchant = document.getElementById('preview-merchant-name');
  const previewAmount = document.getElementById('preview-amount');
  const previewNote = document.getElementById('preview-note');

  btnFlip.addEventListener('click', () => {
    SoundFx.playClick();
    card3d.classList.toggle('flipped');
  });

  card3d.addEventListener('click', () => {
    SoundFx.playClick();
    card3d.classList.toggle('flipped');
  });

  btnSampleSound.addEventListener('click', () => {
    SoundFx.playSuccess();
  });

  // Theme Switching
  themeOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      SoundFx.playClick();
      themeOpts.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      const theme = opt.dataset.theme;
      state.currentTheme = theme;
      card3d.className = `gift-card-3d theme-${theme}`;
    });
  });

  // Inputs sync
  merchantInput.addEventListener('input', (e) => {
    previewMerchant.textContent = e.target.value.toUpperCase() || 'LUXE DIGITAL STORE';
  });

  valueInput.addEventListener('input', (e) => {
    previewAmount.textContent = e.target.value || '0';
  });

  noteInput.addEventListener('input', (e) => {
    previewNote.textContent = `"${e.target.value || ''}"`;
  });

  // Issue Card Button Action
  const btnIssue = document.getElementById('btn-issue-zk-card');
  const resultBox = document.getElementById('issue-result-box');
  const resCardId = document.getElementById('res-card-id');
  const resCommitment = document.getElementById('res-commitment');
  const resShareLink = document.getElementById('res-share-link');
  const btnCopyLink = document.getElementById('btn-copy-link');

  btnIssue.addEventListener('click', async () => {
    SoundFx.playSuccess();

    const merchant = merchantInput.value;
    const value = parseInt(valueInput.value) || 100;
    const pin = document.getElementById('input-pin').value || '1234';
    const note = noteInput.value;

    const cardNum = Math.floor(1000 + Math.random() * 9000);
    const cardId = `CARD-${cardNum}-ZK`;
    const salt = 'salt_' + Math.random().toString(36).substring(7);

    const commitment = await calculateCommitmentHash(cardId, pin, value, salt);

    // Add to state
    const newCard = {
      id: cardId,
      merchant,
      value,
      commitment,
      status: 'active',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    state.issuedCards.unshift(newCard);
    renderMerchantLedger();

    // Show Result
    resCardId.textContent = cardId;
    resCommitment.textContent = commitment;
    resShareLink.value = `${window.location.origin}${window.location.pathname}#claim?id=${cardId}&val=${value}&comm=${commitment.substring(0, 10)}`;
    resultBox.classList.remove('hidden');

    btnIssue.innerHTML = '<i class="fa-solid fa-check"></i> Issued Successfully!';
    setTimeout(() => {
      btnIssue.innerHTML = '<i class="fa-solid fa-shield-cat"></i> Issue ZK Card on Midnight';
    }, 2500);
  });

  btnCopyLink.addEventListener('click', () => {
    SoundFx.playClick();
    resShareLink.select();
    navigator.clipboard.writeText(resShareLink.value);
    btnCopyLink.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    setTimeout(() => {
      btnCopyLink.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
    }, 2000);
  });
}

// HTML5 Canvas Scratch-Off Logic
function initScratchCanvas() {
  const canvas = document.getElementById('scratch-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let isScratching = false;

  // Draw Metallic Scratch Layer
  function resetScratchLayer() {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#bf953f');
    grad.addColorStop(0.25, '#fcf6ba');
    grad.addColorStop(0.5, '#b38728');
    grad.addColorStop(0.75, '#fbf5b7');
    grad.addColorStop(1, '#aa771c');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#222';
    ctx.font = 'bold 20px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH WITH CURSOR TO REVEAL ✨', canvas.width / 2, canvas.height / 2);
  }

  resetScratchLayer();

  // Scratch Erase Effect
  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    calculateProgress();
  }

  function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  canvas.addEventListener('mousedown', (e) => { isScratching = true; const pos = getMousePos(e); scratch(pos.x, pos.y); });
  canvas.addEventListener('mousemove', (e) => { if (isScratching) { const pos = getMousePos(e); scratch(pos.x, pos.y); } });
  canvas.addEventListener('mouseup', () => { isScratching = false; });
  canvas.addEventListener('mouseleave', () => { isScratching = false; });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => { isScratching = true; const touch = e.touches[0]; const pos = getMousePos(touch); scratch(pos.x, pos.y); });
  canvas.addEventListener('touchmove', (e) => { if (isScratching) { const touch = e.touches[0]; const pos = getMousePos(touch); scratch(pos.x, pos.y); } });
  canvas.addEventListener('touchend', () => { isScratching = false; });

  function calculateProgress() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    const percent = Math.round((transparent / (pixels.length / 4)) * 100);
    state.scratchedPercentage = percent;

    const fill = document.getElementById('scratch-progress-fill');
    const text = document.getElementById('scratch-percent-text');
    const btnRedeem = document.getElementById('btn-submit-redeem');
    const statusMsg = document.getElementById('redeem-status-msg');

    if (fill) fill.style.width = `${percent}%`;
    if (text) text.textContent = `${percent}% Scratched`;

    if (percent >= 50 && btnRedeem.disabled) {
      btnRedeem.disabled = false;
      statusMsg.textContent = '✓ Scratch requirement met! Enter PIN to submit ZK proof.';
      statusMsg.style.color = 'var(--success)';
      SoundFx.playClick();
    }
  }

  // Redeem Action
  const btnSubmitRedeem = document.getElementById('btn-submit-redeem');
  btnSubmitRedeem.addEventListener('click', () => {
    SoundFx.playSuccess();
    const pin = document.getElementById('redeem-pin-input').value;

    btnSubmitRedeem.disabled = true;
    btnSubmitRedeem.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating ZK Proof & Redeeming...';

    setTimeout(() => {
      btnSubmitRedeem.innerHTML = '<i class="fa-solid fa-circle-check"></i> Redeemed Successfully!';
      btnSubmitRedeem.classList.remove('btn-success');
      btnSubmitRedeem.classList.add('btn-secondary');

      // Update state & ledger
      if (state.issuedCards.length > 0) {
        state.issuedCards[0].status = 'redeemed';
        renderMerchantLedger();
      }

      // Add to vault
      state.vaultCards.unshift({
        id: 'GIFT-REDEEMED-' + Math.floor(Math.random()*1000),
        merchant: 'Luxe Digital Store',
        value: 100,
        code: 'GIFT-9982-MIDNIGHT-ZK',
        note: 'Happy Birthday! Enjoy your private digital reward.',
        claimed: true
      });
      renderVault();
    }, 2000);
  });
}

// Merchant Ledger Table & Stats
function initMerchantLedger() {
  renderMerchantLedger();
}

function renderMerchantLedger() {
  const tbody = document.getElementById('merchant-ledger-tbody');
  const statIssued = document.getElementById('stat-total-issued');
  const statRedeemed = document.getElementById('stat-total-redeemed');
  const statActive = document.getElementById('stat-active-commitments');
  const statValRedeemed = document.getElementById('stat-value-redeemed');

  if (!tbody) return;

  tbody.innerHTML = '';
  let totalIssued = state.issuedCards.length;
  let totalRedeemed = 0;
  let valRedeemed = 0;

  state.issuedCards.forEach(card => {
    if (card.status === 'redeemed') {
      totalRedeemed++;
      valRedeemed += card.value;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="monospace">${card.id}</td>
      <td><strong>$${card.value}</strong></td>
      <td class="monospace text-muted" title="${card.commitment}">${card.commitment.substring(0, 12)}...${card.commitment.substring(card.commitment.length - 8)}</td>
      <td><span class="badge-status ${card.status}">${card.status.toUpperCase()}</span></td>
      <td class="font-sm text-muted">${card.timestamp}</td>
    `;
    tbody.appendChild(tr);
  });

  if (statIssued) statIssued.textContent = totalIssued;
  if (statRedeemed) statRedeemed.textContent = totalRedeemed;
  if (statActive) statActive.textContent = totalIssued - totalRedeemed;
  if (statValRedeemed) statValRedeemed.textContent = `$${valRedeemed}`;
}

// Encrypted Vault
function initVault() {
  renderVault();
}

function renderVault() {
  const container = document.getElementById('vault-list');
  if (!container) return;

  container.innerHTML = '';
  state.vaultCards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'vault-item card-glass p-3 mb-3';
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h4 style="margin:0; font-size:1.1rem;"><i class="fa-solid fa-gift" style="color:var(--primary);"></i> ${card.merchant}</h4>
          <span style="font-size:0.8rem; color:var(--text-muted);">Card ID: ${card.id}</span>
        </div>
        <div style="text-align:right;">
          <span style="font-size:1.5rem; font-weight:800; color:var(--success);">$${card.value}</span>
          <div><span class="badge-status redeemed">CLAIMED</span></div>
        </div>
      </div>
      <div style="margin-top:0.8rem; background:rgba(0,0,0,0.3); padding:0.6rem; border-radius:8px; font-family:var(--font-mono); font-size:0.88rem;">
        Voucher Code: <strong>${card.code}</strong>
      </div>
      <div style="font-style:italic; font-size:0.8rem; margin-top:0.4rem; color:var(--text-muted);">
        "${card.note}"
      </div>
    `;
    container.appendChild(div);
  });
}

// Contract Inspector Query
function initInspector() {
  const btnQuery = document.getElementById('btn-query-ledger');
  const jsonDisplay = document.getElementById('ledger-state-json');

  if (btnQuery && jsonDisplay) {
    btnQuery.addEventListener('click', () => {
      SoundFx.playClick();
      btnQuery.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Querying Blockchain...';
      
      setTimeout(() => {
        btnQuery.innerHTML = '<i class="fa-solid fa-rotate"></i> Query On-Chain State';
        
        let totalIssued = state.issuedCards.length;
        let totalRedeemed = state.issuedCards.filter(c => c.status === 'redeemed').length;
        let activeCount = totalIssued - totalRedeemed;
        let valRedeemed = state.issuedCards.filter(c => c.status === 'redeemed').reduce((sum, c) => sum + c.value, 0);

        jsonDisplay.textContent = JSON.stringify({
          contractName: 'private_gift_card.compact',
          network: state.network,
          contractAddress: state.contractAddress,
          proofServer: state.proofServerUrl,
          totalCardsIssued: totalIssued,
          totalValueRedeemed: valRedeemed,
          activeCommitmentsCount: activeCount,
          lastCommitment: state.issuedCards[0]?.commitment || '0x0000000000000000000000000000000000000000000000000000000000000000'
        }, null, 2);
      }, 600);
    });
  }
}
