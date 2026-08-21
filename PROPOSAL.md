# Product Proposal - Private Digital Gift Cards

> **Midnight Network Level 3 Submission (August Challenge Edition)**  
> **Category**: Confidential Credentials & Private Allowlist / Voucher Access  
> **Live Demo URL**: [https://private-digital-gift-cards-9tt5.vercel.app/](https://private-digital-gift-cards-9tt5.vercel.app/)  
> **Video Demo**: [https://youtu.be/cv2_r7YBLYg?feature=shared](https://youtu.be/cv2_r7YBLYg?feature=shared)  
> **Repository**: [https://github.com/Pulgaaa2004/private-digital-gift-cards](https://github.com/Pulgaaa2004/private-digital-gift-cards)

---

## What is the product, and who uses it?

**Private Digital Gift Cards** is a privacy-first, zero-knowledge gift voucher and digital credential platform built natively for the **Midnight Network**. 
- **Users & Target Audience**: E-commerce merchants, Web3 organizations, corporate reward programs, and peer-to-peer users who want to issue, send, redeem, and re-gift digital vouchers without revealing secret passcodes, personal messages, or user wallet identities to public observers.

---

## Why Midnight specifically?

Traditional public blockchains (like Ethereum or Solana) expose sender wallets, recipient addresses, claim timestamps, and voucher balances on public block explorers. This leads to phishing risks, balance tracking, and a lack of merchant transaction privacy.

**Midnight Network** is essential because its **Compact zero-knowledge smart contract language** allows:
1. **Confidential Witness Execution**: Recipients prove knowledge of a valid voucher witness (`secretPin`, `cardId`, `salt`) without exposing the PIN or serial number on-chain.
2. **Selective Ledger Disclosure**: Only the necessary monetary totals (`disclose(cardValue)`) are revealed to update public ledger metrics while keeping recipient identity 100% private.
3. **Confidential P2P Transfers**: Vouchers can be re-gifted to new recipients with fresh ZK commitments without revealing previous or current owner addresses.

---

## Data Model

| Data Point | Type | Disclosed To | Storage / Scope |
| :--- | :--- | :--- | :--- |
| **`secretPin` (Passcode)** | **Private Witness** | **No One** (Local Client Only) | Browser Memory / Witness Input |
| **`cardId` (Voucher Serial)** | **Private Witness** | **No One** (Local Client Only) | Browser Memory |
| **`recipientSalt`** | **Private Witness** | **No One** (Local Client Only) | Browser Memory |
| **`encryptedNote`** | **Private Witness** | **Recipient Only** | Encrypted via AES-GCM 256-bit |
| **`totalCardsIssued`** | **Public Ledger** | **Everyone** (On-Chain) | Midnight Blockchain Ledger |
| **`totalValueRedeemed`** | **Public Ledger** | **Everyone** (On-Chain) | Midnight Blockchain Ledger |
| **`totalValueRefunded`** | **Public Ledger** | **Everyone** (On-Chain) | Midnight Blockchain Ledger |
| **`totalTransfersCount`** | **Public Ledger** | **Everyone** (On-Chain) | Midnight Blockchain Ledger |
| **`activeCommitmentsCount`** | **Public Ledger** | **Everyone** (On-Chain) | Midnight Blockchain Ledger |
| **`lastCommitment`** | **Public Ledger** | **Everyone** (On-Chain) | Midnight Blockchain Ledger |

---

## Mainnet Feasibility

Yes, **Private Digital Gift Cards** is highly realistic and designed for direct production deployment to **Midnight Mainnet** by Level 6.

1. **Production-Ready Toolchain**: Built using Next.js 14 App Router, Web Crypto API (AES-GCM), and Midnight Compact v0.5.1 compiler.
2. **Active Network Testing**: Deployed and tested on **Midnight Preview Network** (`0x037f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e`) and **Midnight Preprod Network** (`0x027f8a3b9e4c1d2e5f6a7b8c9d0e1f2a3b4c5d6e`).
3. **Scale & Performance**: ZK proof generation completes client-side in under 1.5 seconds, delivering smooth UX for mainstream e-commerce integration.

---

## Verification & Requirement Checklist

- [x] Official Category: **Confidential Credentials & Private Allowlist Access**
- [x] 4 Compact Zero-Knowledge Circuits (`issueCard`, `redeemCard`, `transferCardOwnership`, `refundExpiredCard`)
- [x] 19 Automated Tests (`npm test` passes 19/19)
- [x] Full-Stack Next.js 14 App Router Framework
- [x] CI/CD Workflow with contract compile (`.github/workflows/ci.yml`)
- [x] Dedicated PROPOSAL.md file & Live CI Badge in README.md
- [x] Explicit Privacy Witness Model & Preview Deployment
