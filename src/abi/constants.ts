export const FIG_CHAIN = {
  chainId: 9999,
  chainName: 'FIG Chain',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x989A8abf0393a63c29A5eA24e3Dc8278A95557D8',
  getExplorerAddressLink: (address: string) =>
    `https://agnek.fichain.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://agnek.fichain.org/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'https://rpc-agnek.figchain.org',
  blockExplorerUrl: 'https://agnek.fichain.org',
  nativeCurrency: {
    name: 'FIG',
    symbol: 'FIG',
    decimals: 18,
  },
};
