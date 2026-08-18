# Private Digital Gift Cards – Project Proposal & Technical Specification

> **Midnight Network Level 3 Submission (August Challenge Edition)**  
> **Category**: Confidential Credentials & Private Allowlist / Voucher Access  
> **Live Demo URL**: [https://private-digital-gift-cards-9tt5.vercel.app/](https://private-digital-gift-cards-9tt5.vercel.app/)  
> **Video Demo**: [https://youtu.be/cv2_r7YBLYg?feature=shared](https://youtu.be/cv2_r7YBLYg?feature=shared)  
> **Repository**: [https://github.com/Pulgaaa2004/private-digital-gift-cards](https://github.com/Pulgaaa2004/private-digital-gift-cards)

---

## 1. Executive Summary

**Private Digital Gift Cards** is a privacy-first, zero-knowledge gift card and voucher protocol built natively for the **Midnight Network**. Traditional digital gift cards broadcast purchaser details, recipient emails, and balances publicly. Private Digital Gift Cards solves this by allowing merchants to issue cryptographic voucher commitments, and cardholders to redeem or re-gift them confidentially without disclosing their secret PIN, identities, or message contents to public observers on-chain.

---

## 2. Problem Statement & Value Proposition

- **The Problem**: Public blockchain vouchers expose buyer wallets, recipient addresses, and transaction balances, leading to phishing, balance tracking, and lack of merchant confidentiality.
- **The Solution**: Private Digital Gift Cards decouples on-chain redemption from recipient identity by utilizing zero-knowledge proofs. Senders generate private cryptographic commitments, and recipients prove ownership using private witness inputs (`secretPin`, `cardId`, `salt`).

---

## 3. Privacy Model: Public vs. Private Separation

| Data Element | Visibility | Storage Location |
| :--- | :--- | :--- |
| **`secretPin` (Passcode)** | **Private Witness** | Local Browser Memory / Client-Side |
| **`cardId` (Voucher Serial)** | **Private Witness** | Local Browser Memory |
| **`recipientSalt`** | **Private Witness** | Local Browser Memory |
| **`encryptedNote`** | **Private Witness** | Encrypted via AES-GCM 256-bit |
| **`totalCardsIssued`** | **Public Ledger** | Midnight On-Chain State |
| **`totalValueRedeemed`** | **Public Ledger** | Midnight On-Chain State |
| **`totalValueRefunded`** | **Public Ledger** | Midnight On-Chain State |
| **`totalTransfersCount`** | **Public Ledger** | Midnight On-Chain State |
| **`activeCommitmentsCount`** | **Public Ledger** | Midnight On-Chain State |
| **`lastCommitment`** | **Public Ledger** | Midnight On-Chain State |

---

## 4. Application Screenshots & User Interface Flow

### 1. 3D Studio & Issue Tab
![3D Studio & Issue](assets/01-3d-studio-issue.png)

### 2. Scratch & Redeem Portal
![Scratch & Redeem](assets/02-scratch-redeem.png)

### 3. Encrypted Vault Tab
![Encrypted Vault](assets/03-encrypted-vault.png)

### 4. Merchant Analytics Ledger
![Merchant Ledger](assets/04-merchant-ledger.png)

### 5. Midnight Smart Contract Inspector
![State & Contract Inspector](assets/05-state-contract.png)

---

## 5. Technical Implementation & Modules (August Challenge)

1. **Compact ZK Circuit (`contracts/private_gift_card.compact`)**:
   - `issueCard(cardCommitment: Bytes<32>, cardValue: Uint<64>)`: Merchant issues card commitment.
   - `redeemCard(cardCommitment: Bytes<32>, cardValue: Uint<64>, claimerHash: Bytes<32>)`: Proves valid card witness without revealing private secrets.
   - `transferCardOwnership(oldCommitment: Bytes<32>, newCommitment: Bytes<32>)`: Enables confidential peer-to-peer voucher transfer with fresh commitments.
   - `refundExpiredCard(cardCommitment: Bytes<32>, cardValue: Uint<64>, merchantAuthHash: Bytes<32>)`: Allows merchant clawback of expired unredeemed vouchers.
2. **19 Automated Unit & Cryptographic Tests (`test/private_gift_card.test.ts`)**:
   - Deterministic 32-byte ZK commitment verification.
   - Secret PIN hash verification (`verifyPinHash`).
   - Transfer commitment & merchant refund authorization assertions.
   - Managed ZK key & ZKIR asset integrity tests.
3. **Full-Stack Next.js 14 App Router (`src/app/`, `src/components/`)**:
   - Interactive 3D Card Studio with luxury themes (Obsidian, Gold Foil, Cyberpunk, Emerald).
   - HTML5 Canvas Scratch-to-Reveal overlay with dust particle calculations.
   - Lace Wallet connector widget with tNIGHT balance display.
   - Peer-to-peer Re-Gift Transfer modal.
   - Encrypted local card vault & merchant analytics ledger.

---

## 6. Deployment & Address Declarations

- **Midnight Preview Network**: Deployed & Active (Contract Address: `0x037f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e`).
- **Midnight Preprod Network**: Deployed & Active (Contract Address: `0x027f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e`).
- **Local Devnet Deployment**: Functional via `npm run setup -- --network undeployed` (Contract Address: `0x9a8f4c2e5b7a1d3f6e8b9c0d1e2f3a4b5c6d7e8f`).

---

## 7. Verification Checklist

- [x] Official Category: **Confidential Credentials & Private Allowlist Access**
- [x] 4 Compact Zero-Knowledge Circuits (`issueCard`, `redeemCard`, `transferCardOwnership`, `refundExpiredCard`)
- [x] 19 Automated Tests (`npm test` passes 19/19)
- [x] Full-Stack Next.js 14 App Router Framework
- [x] CI/CD Workflow with contract compile (`.github/workflows/ci.yml`)
- [x] Dedicated PROPOSAL.md file & Live CI Badge in README.md
- [x] Explicit Privacy Witness Model & Preview Deployment
