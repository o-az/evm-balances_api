import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-gas-reporter'
import 'tsconfig-paths/register'
import 'solidity-coverage'
import { HardhatUserConfig } from 'hardhat/config'
import { NetworkUserConfig } from 'hardhat/types'

import { ENV_VARIABLES, chainIds } from './src/constants'
import { networkUrl } from './src/utilities'
import type { Chain } from './src/types'

const mnemonic: string | undefined = process.env.MNEMONIC
if (!mnemonic) {
  throw new Error('Please set your MNEMONIC in a .env file')
}

function getChainConfig(chain: Chain): NetworkUserConfig {
  return {
    accounts: [`${ENV_VARIABLES.PRIVATE_KEY}`],
    chainId: chainIds[chain],
    url: networkUrl({ chain, infuraKey: ENV_VARIABLES.INFURA_KEY, alchemyKey: ENV_VARIABLES.ALCHEMY_KEY }),
  }
}
const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      metadata: { bytecodeHash: 'none' },
      optimizer: { enabled: true, runs: 800 },
    },
  },
  etherscan: {
    apiKey: {
      bsc: ENV_VARIABLES.BSCSCAN_KEY,
      opera: ENV_VARIABLES.FTMSCAN_KEY,
      mainnet: ENV_VARIABLES.ETHERSCAN_KEY,
      ropsten: ENV_VARIABLES.ETHERSCAN_KEY,
      rinkeby: ENV_VARIABLES.ETHERSCAN_KEY,
      bscTestnet: ENV_VARIABLES.BSCSCAN_KEY,
      polygon: ENV_VARIABLES.POLYGONSCAN_KEY,
      avalanche: ENV_VARIABLES.SNOWTRACE_KEY,
      polygonMumbai: ENV_VARIABLES.POLYGONSCAN_KEY,
      avalancheFujiTestnet: ENV_VARIABLES.SNOWTRACE_KEY,
      optimisticEthereum: ENV_VARIABLES.OPTIMISM_KEY,
      arbitrumOne: ENV_VARIABLES.ARBISCAN_KEY,
    },
  },
  networks: {
    hardhat: { accounts: { mnemonic }, chainId: chainIds.hardhat },
    arbitrum: getChainConfig('arbitrum'),
    opera: getChainConfig('opera'),
    avalanche: getChainConfig('avalanche'),
    avalancheTest: getChainConfig('avalancheTest'),
    bsc: getChainConfig('bsc'),
    ethereum: getChainConfig('ethereum'),
    optimism: getChainConfig('optimism'),
    'polygon-mainnet': getChainConfig('polygon'),
    'polygon-mumbai': getChainConfig('polygonTestnet'),
    rinkeby: getChainConfig('rinkeby'),
    ropsten: getChainConfig('ropsten'),
    bsctestnet: getChainConfig('bsctestnet'),
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    tests: './tests',
    sources: './contracts',
  },
  gasReporter: {
    currency: 'USD',
    enabled: Boolean(ENV_VARIABLES.REPORT_GAS),
    excludeContracts: [],
    src: './contracts',
  },
  typechain: {
    outDir: './src/types/typechain',
    target: 'ethers-v5',
  },
}

export default config
