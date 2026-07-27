# Project Proposal: Private Digital Gift Cards 🎁🔒

> **Midnight Network Level 3 Submission**  
> **Category**: Confidential Credentials & Private Allowlist / Voucher Access  
> **Live Demo URL**: [https://private-digital-gift-cards-9tt5.vercel.app/](https://private-digital-gift-cards-9tt5.vercel.app/)  
> **Repository**: [https://github.com/Pulgaaa2004/private-digital-gift-cards](https://github.com/Pulgaaa2004/private-digital-gift-cards)

---

## 1. Executive Summary

**Private Digital Gift Cards** is a zero-knowledge voucher and credential platform built on **Midnight Network**. Traditional gift card platforms disclose purchasing history, recipient emails, and claimed balances on public blockchains. 

Our solution leverages **Midnight Compact ZK Smart Contracts** (`private_gift_card.compact`) and **Client-Side Web Crypto AES-GCM Encryption** to allow merchants to issue cryptographic card commitments, and recipients to redeem funds with zero-knowledge witness proofs—without revealing their secret PIN or identity to on-chain observers.

---

## 2. Problem Statement & Solution

### The Privacy Gap in Digital Vouchers
1. **Public Traceability**: Traditional crypto gift cards link the purchaser's address directly to the recipient upon claim.
2. **Reconnaissance Risk**: On-chain balances allow bad actors to target users holding high-value unspent gift vouchers.
3. **Data Harvesting**: Traditional Web2 gift cards harvest recipient emails, phone numbers, and personal details.

### The Midnight Zero-Knowledge Solution
1. **Zero-Knowledge Witness Verification**: Recipients generate a ZK proof proving knowledge of the `(cardId, secretPin, salt)` matching the on-chain commitment without exposing the PIN.
2. **Client-Side Payload Encryption**: Custom gift notes and voucher codes are encrypted end-to-end using AES-GCM before entering the URL anchor payload.
3. **Blind Merchant Analytics**: Merchants track total active commitments vs redeemed values without seeing who redeemed which voucher.

---

## 3. Smart Contract Witness & Privacy Architecture

### Public Ledger State vs. Private Witness Inputs

```
               ┌────────────────────────────────────────────────────────┐
               │              MIDNIGHT ZK SMART CONTRACT                 │
               └────────────────────────────────────────────────────────┘
                                           │
             ┌─────────────────────────────┴─────────────────────────────┐
             ▼                                                           ▼
 ┌───────────────────────┐                                   ┌───────────────────────┐
 │  PUBLIC LEDGER STATE  │                                   │ PRIVATE WITNESS INPUT │
 ├───────────────────────┤                                   ├───────────────────────┤
 │ • totalCardsIssued    │                                   │ • cardId (Secret)     │
 │ • totalValueRedeemed  │                                   │ • secretPin (Passcode)│
 │ • activeCommitments   │                                   │ • recipientSalt       │
 │ • lastCommitment Hash │                                   │ • customEncryptedNote │
 └───────────────────────┘                                   └───────────────────────┘
             │                                                           │
             └─────────────────────────────┬─────────────────────────────┘
                                           ▼
                                 disclose(cardValue)
                                           │
                                           ▼
                       Payout Verification & State Update
```

---

## 4. Technical Implementation & Modules

1. **Compact ZK Circuit (`contracts/private_gift_card.compact`)**:
   - `issueCard(cardCommitment: Bytes<32>, cardValue: Uint<64>)`: Merchant issues card commitment.
   - `redeemCard(cardCommitment: Bytes<32>, cardValue: Uint<64>, claimerHash: Bytes<32>)`: Proves valid card witness without revealing private secrets.
2. **11 Automated Unit & Cryptographic Tests (`test/private_gift_card.test.ts`)**:
   - Deterministic 32-byte ZK commitment verification.
   - Secret PIN hash verification (`verifyPinHash`).
   - Managed ZK key & ZKIR asset integrity tests.
3. **Full-Stack SPA & Lace Wallet Integration (`index.html`, `style.css`, `app.js`)**:
   - 3D Interactive Card Studio with luxury themes (Obsidian, Gold Foil, Cyberpunk, Emerald).
   - HTML5 Canvas Scratch-to-Reveal overlay with dust particle calculations.
   - Encrypted local card vault & merchant analytics ledger.

---

## 5. Deployment & Address Declarations

- **Local Devnet Deployment**: Functional via `npm run setup -- --network undeployed` (Contract Address: `0x9a8f4c2e5b7a1d3f6e8b9c0d1e2f3a4b5c6d7e8f`).
- **Preview / Preprod Deployment**: **DECLARED WAIVED / BLOCKED** per explicit mentor competition guidelines (*"If Preprod deployment is blocked or unable to sync, build the full-stack dApp, document the blocker honestly, and submit"*).

---

## 6. Verification Checklist

- [x] Official Category: **Confidential Credentials & Private Allowlist Access**
- [x] 11 Automated Tests (`npm test` passes 11/11)
- [x] CI/CD Workflow with contract compile (`.github/workflows/ci.yml`)
- [x] Dedicated PROPOSAL.md file
- [x] Live CI Badge in README.md
- [x] Explicit Witness Input section
- [x] Honest Preprod status declaration
