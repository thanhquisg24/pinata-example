import '@nomicfoundation/hardhat-toolbox';
import 'tsconfig-paths/register';

import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  solidity: '0.8.1',

  defaultNetwork: 'figchain',
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    figchain: {
      url: 'https://rpc-agnek.figchain.org',
      // gasPrice: 1000000000,
      accounts: {
        mnemonic:
          'clap acid check various predict identify december extend program lend deposit name',
      },
    },
  },
};
export default config;
