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

type Mode = 'development' | 'production'
const mode: Mode = 'development'

const envVariables = () => {
  return mode === 'development'
    ? {
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        API_KEY: process.env.ROPSTEN_ALCHEMY_KEY,
        URL: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ROPSTEN_ALCHEMY_KEY}`,
        reportGas: true,
      }
    : mode === 'production'
    ? {
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        API_KEY: process.env.ALCHEMY_KEY,
        URL: '',
        reportGas: true,
      }
    : {}
}

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
    default:
      jsonRpcUrl = `https://eth-${chain}.alchemyapi.io/v2/${envVariables().API_KEY}`
  }
  return {
    accounts: [`${process.env.PRIVATE_KEY}`],
    //  {
    //   count: 10,
    //   mnemonic,
    //   path: "m/44'/60'/0'/0",
    // },
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
    apiKey: process.env.ETHERSCAN_KEY,
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
    // {
    //   accounts: ['df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e'],
    // },
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    tests: './tests',
    sources: './contracts',
  },
  typechain: {
    target: 'ethers-v5',
    outDir: './src/typechain',
  },
  gasReporter: {
    currency: 'USD',
    enabled: envVariables().reportGas,
    excludeContracts: [],
    src: './contracts',
  },
}

export default config
