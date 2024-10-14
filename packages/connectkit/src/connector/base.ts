export interface WalletMetadata {
  id: string;
  name: string;
  icon: string;
  downloadUrl: string;
}

export interface Chain {
  enum: string;
  name: string;
  network: string;
}

export abstract class BaseConnector {
  abstract readonly metadata: WalletMetadata;

  abstract isReady(): boolean;

  abstract requestAccounts(): Promise<string[]>;

  abstract getAccounts(): Promise<string[]>;

  abstract getPublicKey(): Promise<string>;

  abstract signMessage(signStr: string, type?: 'ecdsa' | 'bip322-simple'): Promise<string>;

  abstract on(event: string, handler: (data?: unknown) => void): void;

  abstract removeListener(event: string, handler: (data?: unknown) => void): void;

  [key: string]: any;

  abstract getProvider(): any;

  abstract getNetwork(): Promise<'livenet' | 'testnet'>;

  abstract switchNetwork(network: 'livenet' | 'testnet'): Promise<void>;

  abstract getChain(): Promise<Chain>;

  abstract switchChain(chain: string): Promise<void>;

  abstract sendBitcoin(toAddress: string, satoshis: number, options?: { feeRate: number }): Promise<string>;

  abstract sendInscription(
    address: string,
    inscriptionId: string,
    options?: { feeRate: number }
  ): Promise<{ txid: string }>;

  abstract disconnect(): void;

  abstract signPsbt(
    psbtB64: string,
    signingIndexes: any,
    succFunc: (txid: string, psbt: string) => void,
    failFunc: (err: Error) => void
  ): Promise<void>;
}
