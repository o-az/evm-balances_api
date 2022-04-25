import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-gas-reporter'
import 'tsconfig-paths/register'
import 'solidity-coverage'
import { HardhatUserConfig } from 'hardhat/types'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

type Mode = 'development' | 'production'

const mode: Mode = 'development'

dotenvConfig({ path: resolve(__dirname, './.env') })

const envVariables = () => {
  return mode === 'development'
    ? {
        PRIVATE_KEY: process.env.ROPSTEN_PRIVATE_KEY,
        API_KEY: process.env.ROPSTEN_ALCHEMY_KEY,
        URL: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ROPSTEN_ALCHEMY_KEY}`,
      }
    : mode === 'production'
    ? {
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        API_KEY: process.env.ALCHEMY_KEY,
        URL: '',
      }
    : {}
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
  networks: {
    ropsten: {
      url: envVariables().URL,
      accounts: [`${envVariables().PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: './contracts',
  },
}

export default config
