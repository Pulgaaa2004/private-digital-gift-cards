# Private Digital Gift Cards 🎁🔒

> **Midnight Network dApp Submission** | Satisfying Level 1, Level 2, and Level 3 Requirements.  
> **Level 3 Category**: Confidential Credentials & Private Allowlist / Voucher Access

---

## 💡 Product Proposal & Project Overview

**Private Digital Gift Cards** is a privacy-first, zero-knowledge gift card and voucher platform built on **Midnight Network**. Traditional digital gift cards broadcast purchaser details, recipient emails, and claimed balances publicly. **Private Digital Gift Cards** utilizes client-side Web Crypto AES-GCM encryption and Midnight Compact ZK smart contracts so merchants can issue cryptographic voucher commitments, and recipients can redeem them with zero-knowledge proofs—without disclosing their secret PIN or identity to on-chain observers.

---

## 🔒 Privacy Model: Public State vs Private Witness

| Dimension | Details |
| :--- | :--- |
| **What Observers Can Learn** | Total number of cards issued, total monetary value redeemed, active commitment count, and on-chain commitment hashes. |
| **What Observers CANNOT Learn** | Secret card PIN / claim passcode, recipient identity/wallet, raw card code, and private gift note payload. |
| **What is Disclosed Deliberately** | Voucher face value upon redemption (for payout verification) and the card commitment hash transition from active to redeemed. |

---

## 🛠 System Requirements & Setup

### Environment Checks
- **OS & Shell**: WSL2 Ubuntu 24.04 (Linux kernel 6.18+)
- **Node.js**: v22.23.1 (`/home/<user>/.nvm/versions/node/v22.23.1/bin/node`)
- **npm**: v10.9.8
- **Docker**: Docker v29.6.2 & Docker Compose v5.3.1
- **Compact Compiler**: v0.5.1 (`/home/<user>/.local/bin/compact`)

### 1. Installation
```bash
npm install
```

### 2. Compile Compact Smart Contract
```bash
npm run compile
```
*Compiles `contracts/private_gift_card.compact` into managed ZK circuits, ZKIR, and proving keys in `contracts/managed/private_gift_card`.*

### 3. Run Unit & Cryptographic Test Suite
```bash
npm test
```
*Runs 11 automated test assertions verifying ZK assets, commitment hashing, PIN verification, and network configuration.*

---

## 🚀 Local Deployment (Level 1)

### Deploy to Local Devnet (`undeployed`)
```bash
npm run setup -- --network undeployed
```
*Starts local proof-server, indexer, and Midnight node containers via Docker Compose, compiles contract, and deploys to local network.*

### Interactive CLI Menu
```bash
npm run cli
```
Offers menu options:
1. Issue a Private Gift Card (Merchant)
2. Redeem a Gift Card (Recipient)
3. Read Ledger State (Public Stats)
4. Check Wallet Balance
5. Exit

---

## 🌐 Preview / Preprod Deployment Handling

To attempt deployment to Midnight Preprod network:
```bash
npm run setup -- --network preprod
```

### Preprod Status & Wallet Sync Blocker Documentation
- **Preprod RPC Endpoint**: `https://rpc.preprod.midnight.network`
- **Preprod Indexer Endpoint**: `https://indexer.preprod.midnight.network/api/v4/graphql`
- **Wallet Address**: Saved automatically in `.midnight-state.json` upon faucet funding.
- **Sync Note**: If Preprod wallet sync hangs during initial block indexing, state is preserved in `.midnight-wallet-state`. Mentor guidelines explicitly allow full-stack submission with verified local devnet deployment when Preprod indexer sync is rate-limited.

---

## 🎨 Web Frontend & Lace Wallet Integration (Level 2 & 3)

The application includes a luxury dark obsidian & glassmorphism web interface (`index.html`, `style.css`, `app.js`):

- **Lace Wallet Integration**: Connect / Disconnect button, live address display, balance tracking, and network indicator.
- **3D Card Studio**: Interactive 3D tilt & flip physics, customizable luxury visual themes (Obsidian, Gold Foil, Cyberpunk, Emerald), and live note preview.
- **HTML5 Scratch & Redeem Portal**: Interactive canvas scratch-off layer with dust particles, scratch percentage tracker, and ZK redemption trigger.
- **Encrypted Local Vault**: Persistent browser storage for claimed gift cards.
- **Merchant Ledger**: Real-time stats on total issued, active commitments, and redeemed values.
- **Contract Inspector**: Live JSON view of queryable on-chain ledger state.

### Deployment Environment Variables (`.env.example`)
```env
VITE_NETWORK=undeployed
VITE_CONTRACT_ADDRESS=0x9a8f4c2e5b7a1d3f6e8b9c0d1e2f3a4b5c6d7e8f
VITE_PROOF_SERVER_URL=http://localhost:6300
```

---

## 🤖 CI/CD Automation

GitHub Actions workflow is configured in `.github/workflows/ci.yml`:
- Installs dependencies on Node 22
- Verifies Compact compiler availability & compiles smart contract
- Executes 11 automated unit & integration tests
- Validates build and type safety

---

## ✅ Submission Checklists

### Level 1 Checklist
- [x] Compact smart contract compiled via `compact compile` (`contracts/managed/private_gift_card`)
- [x] Deliberate `disclose()` usage for public values
- [x] Local deployment working (`npm run setup -- --network undeployed`)
- [x] CLI interaction functional (`npm run cli`)
- [x] Preprod status documented in README
- [x] README with architecture, setup, and privacy model

### Level 2 Checklist
- [x] Lace Wallet integration (Connect, Disconnect, Status, Network)
- [x] Contract integration with environment variable loading
- [x] Zero-Knowledge privacy behavior (private PIN never exposed on-chain)
- [x] Deployment ready for Vercel/Netlify with `.env.example`
- [x] Git history with incremental meaningful commits

### Level 3 Checklist
- [x] 11 Automated unit tests covering ZK commitments, PIN hashes, and network setup (`npm test`)
- [x] GitHub Actions CI/CD workflow (`.github/workflows/ci.yml`)
- [x] Complete Privacy Model & Level 3 Category Proposal
- [x] Production polish: 3D Studio, Scratch-off canvas, sound FX, vault, and contract inspector
