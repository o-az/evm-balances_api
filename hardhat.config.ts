import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-gas-reporter'
import 'tsconfig-paths/register'
import 'solidity-coverage'
import { HardhatUserConfig } from 'hardhat/config'
import { NetworkUserConfig } from 'hardhat/types'

import { resolve } from 'path'
import { config as dotenvConfig } from 'dotenv'
dotenvConfig({ path: resolve(__dirname, './.env') })

const mnemonic: string | undefined = process.env.MNEMONIC
if (!mnemonic) {
  throw new Error('Please set your MNEMONIC in a .env file')
}

const chainIds = {
  'arbitrum-mainnet': 42161,
  avalanche: 43114,
  bsc: 56,
  hardhat: 31337,
  mainnet: 1,
  'optimism-mainnet': 10,
  'polygon-mainnet': 137,
  'polygon-mumbai': 80001,
  rinkeby: 4,
  ropsten: 3,
  bsctestnet: 97,
}

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
  let jsonRpcUrl: string
  switch (chain) {
    case 'avalanche':
      jsonRpcUrl = 'https://api.avax.network/ext/bc/C/rpc'
      break
    case 'bsc':
      jsonRpcUrl = 'https://bsc-dataseed1.binance.org'
      break
    case 'bsctestnet':
      jsonRpcUrl = 'https://data-seed-prebsc-2-s3.binance.org:8545/'
      break
    case 'polygon-mainnet':
    case 'polygon-mumbai':
      jsonRpcUrl = `https://${chain}.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
      break
    default:
      jsonRpcUrl = `https://${chain}.infura.io/v3/${process.env.INFURA_KEY}`
  }
  return {
    accounts: [`${process.env.PRIVATE_KEY}`],
    chainId: chainIds[chain],
    url: jsonRpcUrl,
  }
}
const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      metadata: {
        bytecodeHash: 'none',
      },
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_KEY,
      ropsten: process.env.ETHERSCAN_KEY,
      rinkeby: process.env.ETHERSCAN_KEY,
      bscTestnet: process.env.BSCSCAN_KEY,
      polygon: process.env.POLYGON_ETHERSCAN_KEY,
      polygonMumbai: process.env.POLYGON_ETHERSCAN_KEY,
    },
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
      },
      chainId: chainIds.hardhat,
    },
    arbitrum: getChainConfig('arbitrum-mainnet'),
    avalanche: getChainConfig('avalanche'),
    bsc: getChainConfig('bsc'),
    mainnet: getChainConfig('mainnet'),
    optimism: getChainConfig('optimism-mainnet'),
    'polygon-mainnet': getChainConfig('polygon-mainnet'),
    'polygon-mumbai': getChainConfig('polygon-mumbai'),
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
    enabled: Boolean(process.env.REPORT_GAS),
    excludeContracts: [],
    src: './contracts',
  },
}

export default config
