import { ENV_VARIABLES } from './dotenv'

export type Chain = MainnetChain | TestnetChain
export type TestnetChain = 'ropsten' | 'rinkeby' | 'polygon-mumbai' | 'hardhat'
export type MainnetChain = 'mainnet' | 'bsc' | 'avalanche' | 'polygon-mainnet' | 'optimism-mainnet' | 'arbitrum-mainnet'

export const chainIds: Record<Chain, number> = {
  bsc: 56,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  hardhat: 31337,
  avalanche: 43114,
  'optimism-mainnet': 10,
  'polygon-mainnet': 137,
  'polygon-mumbai': 80001,
  'arbitrum-mainnet': 42161,
}

export const networkUrl = (chain: Chain) =>
  chain === 'bsc'
    ? 'https://bsc-dataseed1.binance.org'
    : chain === 'avalanche'
    ? 'https://api.avax.network/ext/bc/C/rpc'
    : `https://eth-${chain}.alchemyapi.io/v2/${ENV_VARIABLES.ALCHEMY_KEY}`