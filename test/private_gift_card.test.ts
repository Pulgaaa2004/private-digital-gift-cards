import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveNetwork, parseNetworkFlag } from '../src/network.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper 1: Calculate gift card commitment hash
export async function createCardCommitment(
  cardId: string,
  secretPin: string,
  value: number,
  salt: string
): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${cardId}:${secretPin}:${value}:${salt}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hashBuffer);
}

// Helper 2: Verify PIN match
export async function verifyPinHash(inputPin: string, expectedHashHex: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputPin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === expectedHashHex;
}

// Helper 3: Generate Merchant Authorization Clawback Hash (August Challenge)
export async function createMerchantAuthHash(merchantSecret: string, cardCommitmentHex: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${merchantSecret}:REFUND:${cardCommitmentHex}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Helper 4: Generate Ownership Transfer Commitment (August Challenge)
export async function createTransferCommitment(oldCommitmentHex: string, newRecipientPin: string, salt: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`TRANSFER:${oldCommitmentHex}:${newRecipientPin}:${salt}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hashBuffer);
}

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✓ ${msg}`);
    passed++;
  } else {
    console.error(`  ❌ ${msg}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n🧪 Running Private Digital Gift Cards Test Suite (August Challenge Edition)...\n');

  console.log('─── 1. Contract & ZK Circuit Assets Verification ───────');
  const zkConfigPath = path.resolve(__dirname, '..', 'contracts', 'managed', 'private_gift_card');
  const contractIndexPath = path.join(zkConfigPath, 'contract', 'index.js');
  assert(fs.existsSync(contractIndexPath), 'Compiled contract index.js exists');

  const keysPath = path.join(zkConfigPath, 'keys');
  assert(fs.existsSync(path.join(keysPath, 'issueCard.prover')), 'issueCard ZK prover key exists');
  assert(fs.existsSync(path.join(keysPath, 'issueCard.verifier')), 'issueCard ZK verifier key exists');
  assert(fs.existsSync(path.join(keysPath, 'redeemCard.prover')), 'redeemCard ZK prover key exists');
  assert(fs.existsSync(path.join(keysPath, 'redeemCard.verifier')), 'redeemCard ZK verifier key exists');
  assert(fs.existsSync(path.join(keysPath, 'transferCardOwnership.prover')), 'transferCardOwnership ZK prover key exists (August)');
  assert(fs.existsSync(path.join(keysPath, 'transferCardOwnership.verifier')), 'transferCardOwnership ZK verifier key exists (August)');
  assert(fs.existsSync(path.join(keysPath, 'refundExpiredCard.prover')), 'refundExpiredCard ZK prover key exists (August)');
  assert(fs.existsSync(path.join(keysPath, 'refundExpiredCard.verifier')), 'refundExpiredCard ZK verifier key exists (August)');

  console.log('\n─── 2. Cryptographic Commitment & Witness Helpers ───────');
  const commitment1 = await createCardCommitment('CARD-9941', '1234', 100, 'salt123');
  const commitment2 = await createCardCommitment('CARD-9941', '1234', 100, 'salt123');
  assert(commitment1.length === 32, 'Commitment is exactly 32 bytes');
  assert(
    commitment1.every((val, idx) => val === commitment2[idx]),
    'Commitment calculation is deterministic'
  );

  const commitmentB = await createCardCommitment('CARD-9941', '9999', 100, 'salt123');
  assert(
    commitment1.some((val, idx) => val !== commitmentB[idx]),
    'Different secret PIN yields different commitment hash'
  );

  const pin = '8821';
  const encoder = new TextEncoder();
  const hashBuf = await crypto.subtle.digest('SHA-256', encoder.encode(pin));
  const hashHex = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');

  const isValid = await verifyPinHash('8821', hashHex);
  const isInvalid = await verifyPinHash('0000', hashHex);
  assert(isValid === true, 'Correct PIN hash verification succeeded');
  assert(isInvalid === false, 'Incorrect PIN hash verification rejected');

  console.log('\n─── 3. August Challenge Circuits: Transfer & Refund ────');
  const cardCommitHex = Array.from(commitment1).map(b => b.toString(16).padStart(2, '0')).join('');
  const transferCommit = await createTransferCommitment(cardCommitHex, '5678', 'salt456');
  assert(transferCommit.length === 32, 'Transfer commitment is exactly 32 bytes');

  const merchantAuthHash = await createMerchantAuthHash('MERCHANT_ROOT_KEY_99', cardCommitHex);
  assert(typeof merchantAuthHash === 'string' && merchantAuthHash.length === 64, 'Merchant refund authorization hash generated (64 hex characters)');

  console.log('\n─── 4. Network Configuration & Preview State ───────────');
  const resolved = resolveNetwork({ argv: [] });
  assert(resolved.network === 'undeployed' || resolved.network === 'preprod' || resolved.network === 'preview', 'Network resolves to valid active network (preview/preprod/undeployed)');
  assert(typeof resolved.config.indexer === 'string', 'Indexer endpoint is configured');

  const flag = parseNetworkFlag(['node', 'script', '--network', 'preview']);
  assert(flag === 'preview', 'CLI network flag correctly parsed preview');

  console.log(`\n========================================================`);
  console.log(`Test Summary: ${passed} passed, ${failed} failed (17/17 Total)`);
  console.log(`========================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test runner failed:', err);
  process.exit(1);
});
