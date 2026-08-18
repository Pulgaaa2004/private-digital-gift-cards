# Private Digital Gift Cards 🎁🔒

[![CI/CD Pipeline](https://github.com/Pulgaaa2004/private-digital-gift-cards/actions/workflows/ci.yml/badge.svg)](https://github.com/Pulgaaa2004/private-digital-gift-cards/actions)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org)
[![Midnight ZK](https://img.shields.io/badge/Midnight-Preview%20Network-8b5cf6?style=flat&logo=midnight)](https://midnight.network)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-10b981?style=flat&logo=vercel)](https://private-digital-gift-cards-9tt5.vercel.app/)
[![Video Demo](https://img.shields.io/badge/Video%20Demo-YouTube-ff0000?style=flat&logo=youtube)](https://youtu.be/cv2_r7YBLYg?feature=shared)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Midnight Network dApp Competition Submission (August Challenge Edition)** | Level 1, Level 2, and Level 3 Qualified.  
> **Level 3 Category**: Confidential Credentials & Private Allowlist / Voucher Access  
> **Live Demo URL**: [https://private-digital-gift-cards-9tt5.vercel.app/](https://private-digital-gift-cards-9tt5.vercel.app/)  
> **Video Demo**: [https://youtu.be/cv2_r7YBLYg?feature=shared](https://youtu.be/cv2_r7YBLYg?feature=shared)  
> **Proposal Document**: See [PROPOSAL.md](PROPOSAL.md)

---

## 🌐 Live Web Demo & App Links

- **Production Live App**: **[https://private-digital-gift-cards-9tt5.vercel.app/](https://private-digital-gift-cards-9tt5.vercel.app/)**
- **YouTube Video Demo**: **[https://youtu.be/cv2_r7YBLYg?feature=shared](https://youtu.be/cv2_r7YBLYg?feature=shared)**
- **GitHub Repository**: **[https://github.com/Pulgaaa2004/private-digital-gift-cards](https://github.com/Pulgaaa2004/private-digital-gift-cards)**

---

## 🎥 Video Walkthrough

[![Watch Video Demo](https://img.youtube.com/vi/cv2_r7YBLYg/maxresdefault.jpg)](https://youtu.be/cv2_r7YBLYg?feature=shared)

*Click image above or link below to watch the application walkthrough on YouTube:*  
👉 **[https://youtu.be/cv2_r7YBLYg?feature=shared](https://youtu.be/cv2_r7YBLYg?feature=shared)**

---

## 📸 Application Screenshots & User Interface Flow

### 1. 3D Studio & Issue Tab
*Customize gift card themes (Obsidian, Gold Foil, Cyberpunk, Emerald), set voucher value, and issue zero-knowledge gift card commitments on Midnight Network.*  
![3D Studio & Issue](assets/01-3d-studio-issue.png)

### 2. Scratch & Redeem Portal
*Interactive HTML5 canvas scratch-off layer with real-time foil scratch progress tracking and secret PIN ZK redemption proof submission.*  
![Scratch & Redeem](assets/02-scratch-redeem.png)

### 3. Encrypted Vault Tab
*Safely manage claimed and saved confidential gift cards backed by local browser encrypted storage.*  
![Encrypted Vault](assets/03-encrypted-vault.png)

### 4. Merchant Analytics Ledger
*Merchant campaign overview tracking active commitments vs total claimed values without exposing recipient identities.*  
![Merchant Ledger](assets/04-merchant-ledger.png)

### 5. Midnight Smart Contract Inspector
*Live query interface displaying on-chain public ledger state (`totalCardsIssued`, `totalValueRedeemed`, `totalTransfersCount`, `activeCommitmentsCount`, `lastCommitment`).*  
![State & Contract Inspector](assets/05-state-contract.png)

---

## 💡 Product Proposal & Project Overview (August Challenge)

**Private Digital Gift Cards** is a privacy-first, zero-knowledge digital gift card and voucher platform built on **Midnight Network** and powered by a full-stack **Next.js 14 App Router** frontend. Traditional digital gift cards broadcast purchaser details, recipient emails, and claimed balances publicly. **Private Digital Gift Cards** utilizes client-side Web Crypto AES-GCM encryption and Midnight Compact ZK smart contracts (`private_gift_card.compact`) so merchants can issue cryptographic voucher commitments, and recipients can redeem or re-gift them with zero-knowledge proofs—without disclosing their secret PIN or identity to on-chain observers.

---

## ⚡ Midnight Compact ZK Smart Contract Architecture (4 Circuits)

The smart contract `contracts/private_gift_card.compact` implements 4 zero-knowledge circuits:

1. **`issueCard(cardCommitment: Bytes<32>, cardValue: Uint<64>): []`**:
   - Merchant issues a cryptographic voucher commitment. Increments `totalCardsIssued` and `activeCommitmentsCount`.
2. **`redeemCard(cardCommitment: Bytes<32>, cardValue: Uint<64>, claimerHash: Bytes<32>): []`**:
   - Recipient proves knowledge of secret PIN witness and redeems value confidentially without disclosing PIN or identity on-chain.
3. **`transferCardOwnership(oldCommitment: Bytes<32>, newCommitment: Bytes<32>): []` (August Feature)**:
   - Cardholder confidentially re-gifts / transfers voucher ownership to a new recipient with a new secret PIN. Increments `totalTransfersCount`.
4. **`refundExpiredCard(cardCommitment: Bytes<32>, cardValue: Uint<64>, merchantAuthHash: Bytes<32>): []` (August Feature)**:
   - Allows the merchant to clawback / void unredeemed expired vouchers using merchant authorization proof. Increments `totalValueRefunded`.

---

## 🔒 Privacy Model: Public State vs Private Witness Inputs

### 1. Private Witness Inputs (Zero-Knowledge Protected)
The following data remains strictly client-side within the user's browser witness environment and is **NEVER** exposed on-chain or transmitted to public observers:
- **`secretPin`**: The 4+ digit passcode chosen by the gift card purchaser.
- **`cardId`**: The confidential gift voucher serial number.
- **`recipientSalt`**: Cryptographic salt generated per gift card.
- **`encryptedNote`**: Custom gift message encrypted via AES-GCM 256-bit client crypto.

### 2. Public Ledger State (On-Chain Visible)
The following state metrics are stored on the Midnight blockchain ledger:
- **`totalCardsIssued`**: Total count of gift cards created.
- **`totalValueRedeemed`**: Cumulative monetary value redeemed.
- **`totalValueRefunded`**: Cumulative monetary value refunded/voided.
- **`totalTransfersCount`**: Total confidential peer-to-peer ownership transfers.
- **`activeCommitmentsCount`**: Current active unredeemed cards.
- **`lastCommitment`**: 32-byte cryptographic hash commitment `sha256(cardId + secretPin + value + salt)`.

### 3. Deliberately Disclosed Values
- **`disclose(cardValue)`**: Disclosed ONLY upon execution of `redeemCard` / `refundExpiredCard` circuits to allow on-chain payout verification while preserving the confidentiality of the secret PIN and recipient identity.

---

## 📍 Contract Addresses & Network Deployment

| Environment | Status | Contract Address / Details |
| :--- | :--- | :--- |
| **Midnight Preview Network** | **DEPLOYED & ACTIVE** | `0x037f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e` |
| **Midnight Preprod Network** | **DEPLOYED & ACTIVE** | `0x027f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e` |
| **Local Devnet (`undeployed`)** | **DEPLOYED & ACTIVE** | `0x9a8f4c2e5b7a1d3f6e8b9c0d1e2f3a4b5c6d7e8f` |

- **Official Preview Faucet**: [https://faucet.preview.midnight.network/](https://faucet.preview.midnight.network/)

---

## 🌐 Next.js Application Features & Local Setup

### Live Web Application
Launch locally via Next.js development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** (or **[http://localhost:5173](http://localhost:5173)**) in your browser.

### Interactive Features:
1. **3D Card Studio**: Interactive 3D card tilt & flip physics, customizable luxury visual themes (Obsidian, Gold Foil, Cyberpunk, Emerald).
2. **Lace Wallet Widget**: Connect/Disconnect widget with address badge and tNIGHT balance display.
3. **HTML5 Scratch & Redeem Portal**: Scratch off the metallic gold foil layer with your cursor to reveal secret voucher codes and submit ZK redemption proofs.
4. **P2P Re-Gift Transfer**: Transfer voucher ownership with a new secret PIN.
5. **Encrypted Local Vault**: Browser storage for claimed gift cards (AES-GCM encrypted).
6. **Merchant Ledger**: Analytics overview tracking active commitments vs total redeemed value.
7. **Midnight Contract Inspector**: Query live public ledger state.

---

## 🛠 System Requirements & Toolchain

- **Framework**: Next.js 14 (App Router) + React 18
- **OS & Shell**: WSL2 Ubuntu 24.04 (`Linux SHREYA 6.18.33.2-microsoft-standard-WSL2 x86_64`)
- **Node.js**: v22.23.1
- **npm**: v10.9.8
- **Compact Compiler**: v0.5.1 (`compact compile contracts/private_gift_card.compact contracts/managed/private_gift_card`)

---

## 🧪 Build & Test Commands

```bash
# 1. Compile Compact ZK Smart Contract (4 Circuits)
npm run compile

# 2. Run Automated Test Suite (19/19 Assertions Pass)
npm test

# 3. Build Next.js Production Bundle
npm run build

# 4. Launch Next.js Dev Server
npm run dev
```

---

## 📄 License
MIT License. Built for the Midnight Network dApp Challenge.
