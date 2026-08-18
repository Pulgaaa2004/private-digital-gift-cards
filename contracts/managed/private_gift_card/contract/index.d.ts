import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  issueCard(context: __compactRuntime.CircuitContext<PS>,
            cardCommitment_0: Uint8Array,
            cardValue_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  redeemCard(context: __compactRuntime.CircuitContext<PS>,
             cardCommitment_0: Uint8Array,
             cardValue_0: bigint,
             claimerHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferCardOwnership(context: __compactRuntime.CircuitContext<PS>,
                        oldCommitment_0: Uint8Array,
                        newCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  refundExpiredCard(context: __compactRuntime.CircuitContext<PS>,
                    cardCommitment_0: Uint8Array,
                    cardValue_0: bigint,
                    merchantAuthHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  issueCard(context: __compactRuntime.CircuitContext<PS>,
            cardCommitment_0: Uint8Array,
            cardValue_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  redeemCard(context: __compactRuntime.CircuitContext<PS>,
             cardCommitment_0: Uint8Array,
             cardValue_0: bigint,
             claimerHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferCardOwnership(context: __compactRuntime.CircuitContext<PS>,
                        oldCommitment_0: Uint8Array,
                        newCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  refundExpiredCard(context: __compactRuntime.CircuitContext<PS>,
                    cardCommitment_0: Uint8Array,
                    cardValue_0: bigint,
                    merchantAuthHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  issueCard(context: __compactRuntime.CircuitContext<PS>,
            cardCommitment_0: Uint8Array,
            cardValue_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  redeemCard(context: __compactRuntime.CircuitContext<PS>,
             cardCommitment_0: Uint8Array,
             cardValue_0: bigint,
             claimerHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferCardOwnership(context: __compactRuntime.CircuitContext<PS>,
                        oldCommitment_0: Uint8Array,
                        newCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  refundExpiredCard(context: __compactRuntime.CircuitContext<PS>,
                    cardCommitment_0: Uint8Array,
                    cardValue_0: bigint,
                    merchantAuthHash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly totalCardsIssued: bigint;
  readonly totalValueRedeemed: bigint;
  readonly totalValueRefunded: bigint;
  readonly totalTransfersCount: bigint;
  readonly activeCommitmentsCount: bigint;
  readonly lastCommitment: Uint8Array;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
