export type Chain = MainnetChain | TestnetChain
export type TestnetChain = 'ropsten' | 'rinkeby' | 'polygon-mumbai' | 'hardhat' | 'bsctestnet'

// both ethereum and mainnet refer to the same chain
// adding both for convenience
export type MainnetChain =
  | 'bsc'
  | 'ethereum'
  | 'avalanche'
  | 'polygon-mainnet'
  | 'optimism-mainnet'
  | 'arbitrum-mainnet'

export const chainIds: Record<Chain, number> = {
  bsc: 56,
  ethereum: 1,
  rinkeby: 4,
  ropsten: 3,
  hardhat: 31337,
  avalanche: 43114,
  'optimism-mainnet': 10,
  'polygon-mainnet': 137,
  'polygon-mumbai': 80001,
  'arbitrum-mainnet': 42161,
  bsctestnet: 97,
}

export const networkUrl = ({ chain, key }: { chain: Chain; key: string }) =>
  chain === 'bsc'
    ? 'https://bsc-dataseed1.binance.org'
    : chain === 'avalanche'
    ? 'https://api.avax.network/ext/bc/C/rpc'
    : // : chain === 'polygon-mainnet' || chain === 'polygon-mumbai'
      // ? `https://polygon-mainnet.g.alchemy.com/v2/${key}`
      `https://${chain}.infura.io/v3/${key}`
