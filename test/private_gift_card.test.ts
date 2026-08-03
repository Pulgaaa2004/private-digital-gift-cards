import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveNetwork, parseNetworkFlag } from '../src/network.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper: Calculate gift card commitment hash
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

// Helper: Verify PIN match
export async function verifyPinHash(inputPin: string, expectedHashHex: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputPin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === expectedHashHex;
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
  console.log('\n🧪 Running Private Digital Gift Cards Test Suite...\n');

  console.log('─── 1. Contract & ZK Assets Verification ────────────────');
  const zkConfigPath = path.resolve(__dirname, '..', 'contracts', 'managed', 'private_gift_card');
  const contractIndexPath = path.join(zkConfigPath, 'contract', 'index.js');
  assert(fs.existsSync(contractIndexPath), 'Compiled contract index.js exists');

  const zkirPath = path.resolve(__dirname, '..', 'contracts', 'managed', 'private_gift_card', 'zkir');
  const keysPath = path.resolve(__dirname, '..', 'contracts', 'managed', 'private_gift_card', 'keys');
  assert(fs.existsSync(zkirPath), 'ZKIR directory exists');
  assert(fs.existsSync(keysPath), 'ZK keys directory exists');

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

  console.log('\n─── 3. Network Configuration & State ───────────────────');
  const resolved = resolveNetwork({ argv: [] });
  assert(resolved.network === 'undeployed' || resolved.network === 'preprod' || resolved.network === 'preview', 'Network resolves to valid active network (preview/preprod/undeployed)');
  assert(typeof resolved.config.indexer === 'string', 'Indexer endpoint is configured');

  const flag = parseNetworkFlag(['node', 'script', '--network', 'preview']);
  assert(flag === 'preview', 'CLI network flag correctly parsed preview');

  console.log(`\n========================================`);
  console.log(`Test Summary: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test runner failed:', err);
  process.exit(1);
});
