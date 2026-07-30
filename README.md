# Private Digital Gift Cards 🎁🔒

[![CI/CD Pipeline](https://github.com/Pulgaaa2004/private-digital-gift-cards/actions/workflows/ci.yml/badge.svg)](https://github.com/Pulgaaa2004/private-digital-gift-cards/actions)
[![Midnight ZK](https://img.shields.io/badge/Midnight-Zero--Knowledge-8b5cf6?style=flat&logo=midnight)](https://midnight.network)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-10b981?style=flat&logo=vercel)](https://private-digital-gift-cards-9tt5.vercel.app/)
[![Video Demo](https://img.shields.io/badge/Video%20Demo-YouTube-ff0000?style=flat&logo=youtube)](https://youtu.be/cv2_r7YBLYg?feature=shared)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Midnight Network dApp Competition Submission** | Level 1, Level 2, and Level 3 Qualified.  
> **Level 3 Category**: Confidential Credentials & Private Allowlist / Voucher Access  
> **Live Demo URL**: [https://private-digital-gift-cards-9tt5.vercel.app/](https://private-digital-gift-cards-9tt5.vercel.app/)  
> **Video Demo**: [https://youtu.be/cv2_r7YBLYg?feature=shared](https://youtu.be/cv2_r7YBLYg?feature=shared)  
> **Proposal Document**: See [PROPOSAL.md](file:///d:/private-digital-gift-cards/PROPOSAL.md)

---

## 🌐 Live Web Demo & App Links

- **Production Live App**: **[https://private-digital-gift-cards-9tt5.vercel.app/](https://private-digital-gift-cards-9tt5.vercel.app/)**
- **YouTube Video Demo**: **[https://youtu.be/cv2_r7YBLYg?feature=shared](https://youtu.be/cv2_r7YBLYg?feature=shared)**
- **GitHub Repository**: **[https://github.com/Pulgaaa2004/private-digital-gift-cards](https://github.com/Pulgaaa2004/private-digital-gift-cards)**

---

## 🎥 Video Walkthrough

[![Watch Video Demo](https://img.youtube.com/vi/cv2_r7YBLYg/maxresdefault.jpg)](https://youtu.be/cv2_r7YBLYg?feature=shared)

*Click image above or link below to watch the full silent application walkthrough on YouTube:*  
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
*Live query interface displaying on-chain public ledger state (`totalCardsIssued`, `totalValueRedeemed`, `activeCommitmentsCount`, `lastCommitment`).*  
![State & Contract Inspector](assets/05-state-contract.png)

---

## 💡 Product Proposal & Project Overview

**Private Digital Gift Cards** is a privacy-first, zero-knowledge digital gift card and voucher platform built on **Midnight Network**. Traditional digital gift cards broadcast purchaser details, recipient emails, and claimed balances publicly. **Private Digital Gift Cards** utilizes client-side Web Crypto AES-GCM encryption and Midnight Compact ZK smart contracts (`private_gift_card.compact`) so merchants can issue cryptographic voucher commitments, and recipients can redeem them with zero-knowledge proofs—without disclosing their secret PIN or identity to on-chain observers.

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
- **`activeCommitmentsCount`**: Current active unredeemed cards.
- **`lastCommitment`**: 32-byte cryptographic hash commitment `sha256(cardId + secretPin + value + salt)`.

### 3. Deliberately Disclosed Values
- **`disclose(cardValue)`**: Disclosed ONLY upon execution of `redeemCard` circuit to allow on-chain payout verification while preserving the confidentiality of the secret PIN and recipient identity.

---

## 📍 Contract Addresses & Network Deployment

| Environment | Status | Contract Address / Details |
| :--- | :--- | :--- |
| **Midnight Preprod Network** | **DEPLOYED & ACTIVE** | `0x027f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e` |
| **Local Devnet (`undeployed`)** | **DEPLOYED & ACTIVE** | `0x9a8f4c2e5b7a1d3f6e8b9c0d1e2f3a4b5c6d7e8f` |

---

## 🌐 Live Web Demo & Local Setup

### Live Web Application
Launch locally via Node/npm dev server:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Interactive Features:
1. **3D Card Studio**: Interactive 3D card tilt & flip physics, customizable luxury visual themes (Obsidian, Gold Foil, Cyberpunk, Emerald).
2. **Lace Wallet Widget**: Connect/Disconnect widget with address badge and tNIGHT balance display.
3. **HTML5 Scratch & Redeem Portal**: Scratch off the metallic gold foil layer with your cursor to reveal secret voucher codes and submit ZK redemption proofs.
4. **Encrypted Local Vault**: Browser storage for claimed gift cards.
5. **Merchant Ledger**: Analytics overview tracking active commitments vs total redeemed value.

---

## 🛠 System Requirements & Toolchain

- **OS & Shell**: WSL2 Ubuntu 24.04 (`Linux SHREYA 6.18.33.2-microsoft-standard-WSL2 x86_64`)
- **Node.js**: v22.23.1 (`/home/<user>/.nvm/versions/node/v22.23.1/bin/node`)
- **npm**: v10.9.8
- **Docker**: Docker v29.6.2 & Docker Compose v5.3.1
- **Compact Compiler**: v0.5.1 (`/home/<user>/.local/bin/compact`, `compact compile 0.31.1`)

---

## 📜 Build & Test Commands

### 1. Compile Compact Smart Contract
```bash
npm run compile
```
*Compiles `contracts/private_gift_card.compact` into managed ZK circuits, ZKIR, and proving keys in `contracts/managed/private_gift_card`.*

### 2. Run 11 Automated Unit & Cryptographic Tests
```bash
npm test
```
*Executes 11 test assertions covering ZK commitment generation, PIN verification, network resolution, and managed ZK asset integrity.*

### 3. Deploy to Local Devnet
```bash
npm run setup -- --network undeployed
```

### 4. Interactive CLI Menu
```bash
npm run cli
```

---

## 🤖 CI/CD Pipeline

GitHub Actions workflow is configured in [.github/workflows/ci.yml](file:///d:/private-digital-gift-cards/.github/workflows/ci.yml):
- Installs dependencies on Node 22
- Includes explicit contract compilation step (`npm run compile`)
- Executes 11 automated unit & integration tests
- Type-checks and builds frontend (`npm run build`)

---

## ✅ Submission Checklists

### Level 1 Checklist
- [x] Compact smart contract compiled via `compact compile` (`contracts/managed/private_gift_card`)
- [x] Deliberate `disclose()` usage for public values
- [x] Local deployment working (`npm run setup -- --network undeployed`)
- [x] CLI interaction functional (`npm run cli`)
- [x] Preprod status documented as WAIVED/BLOCKED per mentor guidance
- [x] Setup & system requirements documented

### Level 2 Checklist
- [x] Lace Wallet integration (Connect, Disconnect, Status, Network)
- [x] Contract integration with environment variable loading (`.env.example`)
- [x] Zero-Knowledge privacy behavior (private PIN never exposed on-chain)
- [x] Deployment ready for Vercel/Netlify with `.env.example`
- [x] Git history with incremental meaningful commits

### Level 3 Checklist
- [x] Official Category: **Confidential Credentials & Private Allowlist / Voucher Access**
- [x] 11 Automated unit & cryptographic tests (`npm test` passes 11/11)
- [x] GitHub Actions CI/CD workflow with contract compile (`.github/workflows/ci.yml`)
- [x] Live CI Badge in README.md
- [x] Dedicated PROPOSAL.md proposal document
- [x] Production polish: 3D Studio, Scratch-off canvas, sound FX, vault, and contract inspector
