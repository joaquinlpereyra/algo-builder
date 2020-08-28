declare module 'algosdk' {
  /** Declaration file generated by dts-gen */

  class Algod {
    constructor (token: string, baseServer: string, port: number, headers?: object);

    status (): Promise<NodeStatus>;
  }

  export class Algodv2 {
    // https://github.com/algorand/js-algorand-sdk/blob/develop/src/client/v2/algod/algod.js#L19
    constructor(token: string, baseServer: string, port: number, headers?: object);

    compile (source: string): Action<CompileOut>;
    status(): Action<any>;

    sendRawTransaction(rawSignedTxn: TxnBytes): Action<TxResult>
    getTransactionParams(): Action<SuggestedParams>
    pendingTransactionInformation(txId: string): Action<PendingTransactionInformation>
    statusAfterBlock(lastround: number): Action<any>
  }

  interface Account {
    addr: string
    sk: Uint8Array
  }

  interface CompileOut {
    hash: string
    result: string
  }

  // https://github.com/algorand/js-algorand-sdk/blob/develop/src/transaction.js
  interface Transaction {
    // fields copied from
    // https://github.com/algorand/js-algorand-sdk/blob/develop/src/transaction.js#L117
    from: ParsedAddress
    to: ParsedAddress
    fee: number
    amount: number
    firstRound: number
    lastRound: number
    note: string
    genesisID: string
    genesisHash: string
    lease: number

    closeRemainderTo: ParsedAddress
    voteKey: string
    selectionKey: string
    voteFirst: any
    voteLast: any
    voteKeyDilution: any

    assetIndex: number
    assetTotal: number
    assetDecimals: number
    assetDefaultFrozen: any
    assetManager: ParsedAddress
    assetReserve: ParsedAddress

    assetFreeze: ParsedAddress
    assetClawback: ParsedAddress
    assetUnitName: string
    assetName: string
    assetURL: string
    assetMetadataHash: string

    freezeAccount: string
    freezeState: any
    assetRevocationTarget: any

    appIndex: any
    appOnComplete: any
    appLocalInts: any
    appLocalByteSlices: any
    appGlobalInts: any
    appGlobalByteSlices: any

    appApprovalProgram: any
    appClearProgram: any
    appArgs: any
    appAccounts: any
    appForeignApps: any
    appForeignAssets: any
    type: any
    reKeyTo: string

    signTxn(sk: Uint8Array): TxnBytes
  }

  export function Indexer (...args: any[]): any;

  export function Kmd(token: any, baseServer: any, port: any): any;

  export function algosToMicroalgos (algos: any): any;

  export function appendSignMultisigTransaction (multisigTxnBlob: any, { version, threshold, addrs }: any, sk: any): any;

  export function assignGroupID (txns: any, from: any): any;

  export function computeGroupID (txns: any): any;

  export function decodeObj (o: any): any;

  export function encodeObj (o: any): any;

  export function generateAccount (): Account;

  export function isValidAddress (addr: any): any;

  export function logicSigFromByte (encoded: any): any;

  export function makeAssetConfigTxn (from: any, fee: any, firstRound: any, lastRound: any, note: any, genesisHash: any, genesisID: any, assetIndex: any, manager: any, reserve: any, freeze: any, clawback: any, strictEmptyAddressChecking: any): any;

  export function makeAssetConfigTxnWithSuggestedParams (from: any, note: any, assetIndex: any, manager: any, reserve: any, freeze: any, clawback: any, suggestedParams: any, strictEmptyAddressChecking: any): any;

  export function makeAssetCreateTxn (from: any, fee: any, firstRound: any, lastRound: any, note: any, genesisHash: any, genesisID: any, total: any, decimals: any, defaultFrozen: any, manager: any, reserve: any, freeze: any, clawback: any, unitName: any, assetName: any, assetURL: any, assetMetadataHash: any): any;

  export function makeAssetCreateTxnWithSuggestedParams(from: any, note: any, total: any, decimals: any, defaultFrozen: any, manager: any, reserve: any, freeze: any, clawback: any, unitName: any, assetName: any, assetURL: any, assetMetadataHash: any, suggestedParams: any): Transaction;

  export function makeAssetDestroyTxn (from: any, fee: any, firstRound: any, lastRound: any, note: any, genesisHash: any, genesisID: any, assetIndex: any): any;

  export function makeAssetDestroyTxnWithSuggestedParams (from: any, note: any, assetIndex: any, suggestedParams: any): any;

  export function makeAssetFreezeTxn (from: any, fee: any, firstRound: any, lastRound: any, note: any, genesisHash: any, genesisID: any, assetIndex: any, freezeTarget: any, freezeState: any): any;

  export function makeAssetFreezeTxnWithSuggestedParams (from: any, note: any, assetIndex: any, freezeTarget: any, freezeState: any, suggestedParams: any): any;

  export function makeAssetTransferTxn (from: any, to: any, closeRemainderTo: any, revocationTarget: any, fee: any, amount: any, firstRound: any, lastRound: any, note: any, genesisHash: any, genesisID: any, assetIndex: any): any;

  export function makeAssetTransferTxnWithSuggestedParams (from: any, to: any, closeRemainderTo: any, revocationTarget: any, amount: any, note: any, assetIndex: any, suggestedParams: any): any;

  export function makeKeyRegistrationTxn (from: any, fee: any, firstRound: any, lastRound: any, note: any, genesisHash: any, genesisID: any, voteKey: any, selectionKey: any, voteFirst: any, voteLast: any, voteKeyDilution: any): any;

  export function makeKeyRegistrationTxnWithSuggestedParams (from: any, note: any, voteKey: any, selectionKey: any, voteFirst: any, voteLast: any, voteKeyDilution: any, suggestedParams: any): any;

  export function makeLogicSig (program: any, args: any): any;

  export function makePaymentTxn (from: any, to: any, fee: any, amount: any, closeRemainderTo: any, firstRound: any, lastRound: any, note: any, genesisHash: any, genesisID: any): any;

  export function makePaymentTxnWithSuggestedParams (from: any, to: any, amount: any, closeRemainderTo: any, note: any, suggestedParams: any): any;

  export function masterDerivationKeyToMnemonic (mdk: any): string;

  export function mergeMultisigTransactions (multisigTxnBlobs: any): any;

  export function microalgosToAlgos (microalgos: any): any;

  export function mnemonicToMasterDerivationKey (mn: string): any;

  export function mnemonicToSecretKey (mn: string): Account;

  export function multisigAddress ({ version, threshold, addrs }: any): any;

  export function secretKeyToMnemonic (sk: Uint8Array): string;

  export function signBid (bid: any, sk: any): any;

  export function signBytes (bytes: any, sk: any): any;

  export function signLogicSigTransaction (txn: any, lsig: any): any;

  export function signLogicSigTransactionObject (txn: any, lsig: any): any;

  export function signMultisigTransaction (txn: any, { version, threshold, addrs }: any, sk: any): any;

  export function signTransaction (txn: any, sk: any): any;

  export function verifyBytes (bytes: any, signature: any, addr: any): any;

  export namespace ERROR_INVALID_MICROALGOS {
    const message: string;
    const name: string;
    const stack: string;

    function toString (): any;
  }

  export namespace ERROR_MULTISIG_BAD_SENDER {
    const message: string;
    const name: string;
    const stack: string;

    function toString (): any;
  }

  // *************************
  //     Support types

  class Action<T> {
    do (headers?: Record<string, unknown>): Promise<T>;
  }

  interface RequestError extends Error {
    statusCode?: number,
    text: string,
    body?: {
      message?: string
    }
    error?: Error
  }

  interface NodeStatus {
    catchpoint: string
    'catchpoint-acquired-blocks': number
    'catchpoint-processed-accounts': number
    'catchpoint-total-accounts': number
    'catchpoint-total-blocks': number
    'catchup-time': number
    'last-catchpoint': string
    'last-round': number
    'last-version': string
    'next-version': string
    'next-version-round': number
    'next-version-supported': boolean
    'stopped-at-unsupported-round': boolean
    'time-since-last-round': number
  }

  interface TxResult {
    txId: string
  }

  interface PendingTransactionInformation {
    'confirmed-round': number
    "asset-index": number
  }

  interface SuggestedParams {
    flatFee: boolean
    fee: number
    firstRound: number
    lastRound: number
    genesisID: string
    genesisHash: string
  }

  interface ParsedAddress {
    publicKey: string;
  }

  type TxnBytes = Uint8Array

}
