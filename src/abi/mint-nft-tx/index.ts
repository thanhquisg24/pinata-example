import { nft_contract_abi, nft_contract_address } from './nft-contract-info';

import { FIG_CHAIN } from '../constants';
import Web3 from 'web3';

const infuraUrl = FIG_CHAIN.rpcUrl;
export const sendTxMintNft = async (
  fromWallet: {
    address: string;
    privateKey: string;
  },
  tokenURI: string,
) => {
  const web3 = new Web3(infuraUrl);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    nft_contract_abi,
    nft_contract_address,
  );
  web3.eth.accounts.wallet.add({
    address: fromWallet.address,
    privateKey: fromWallet.privateKey,
  });

  const tx = myContract.methods.mintNFT(fromWallet.address, tokenURI);
  const gas = await tx.estimateGas({ from: fromWallet.address });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(fromWallet.address);
  const txData = {
    from: fromWallet.address,
    to: myContract.options.address,
    data: data,
    gas,
    gasPrice,
    nonce,
    chainId: networkId,
  };
  const signedTx = await web3.eth.accounts.signTransaction(
    txData,
    fromWallet.privateKey,
  );
  //   signedTx.transactionHash
  console.log(`Prepare Transaction hash: ${signedTx.transactionHash}`);
  if (signedTx.rawTransaction) {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );
    console.log(`Post Transaction hash: ${receipt.transactionHash}`);
    return receipt.transactionHash;
  } else {
    throw new Error('sendTxMintNft() rawTransaction is undefined');
  }
};

// export const postMintNft = async (
//   web3: Web3,
//   signedTx: any,
// ): Promise<string> => {
//   const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//   console.log(`Post Transaction hash: ${receipt.transactionHash}`);
//   return receipt.transactionHash;
// };

function main() {
  const _tokenUriMetadata =
    'ipfs://QmbYgzAyV7tuJh3YjBkWWUsyQZDV3XkYc2EDSspvR3kykm';
  const fromWallet = {
    address: '0x72f79E934676626d0394BC6C5ADCBF2fD914Fd79',
    privateKey:
      '7d3a8035600fee073efb239c252152cb949606e3bc276bb913e2b16e63d4a0a0',
  };
  sendTxMintNft(fromWallet, _tokenUriMetadata).then((result) => {
    console.log('🚀 ~ file: index.ts:76 ~ sendTxMintNft ~ result', result);
  });
}

main();
