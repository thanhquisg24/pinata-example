import { deployContract } from './deploy';
import hardhat from 'hardhat';

async function mainTest() {
  // deploy a lock contract where funds can be withdrawn
  // one year in the future
  //   const { deployer } = await getNamedAccounts();
  const deploymentInfo = await deployContract('Fig Nft', 'FFT');
  console.log(
    '🚀 ~ file: test.ts:9 ~ mainTest ~ deploymentInfo',
    deploymentInfo,
  );
  // assert that the value is correct
}
mainTest().then();
