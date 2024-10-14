import { useCallback } from 'react';
import { useConnectProvider } from '../context';

export const useBTCProvider = () => {
  const {
    connector,
    provider,
    accounts,
    getPublicKey,
    signMessage,
    getNetwork,
    switchNetwork,
    getChain,
    switchChain,
    sendBitcoin,
    signPsbt,
  } = useConnectProvider();

  const sendInscription = useCallback(
    async (address: string, inscriptionId: string, options?: { feeRate: number }) => {
      if (!connector) {
        throw new Error('Wallet not connected!');
      }
      return await connector.sendInscription(address, inscriptionId, options);
    },
    [connector]
  );

  return {
    provider,
    accounts,
    getPublicKey,
    signMessage,
    getNetwork,
    switchNetwork,
    getChain,
    switchChain,
    sendBitcoin,
    sendInscription,
    signPsbt,
  };
};
