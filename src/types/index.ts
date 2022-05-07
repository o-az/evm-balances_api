export type Chain = MainnetChain | TestnetChain

export type TestnetChain = 'ropsten' | 'rinkeby' | 'polygonTestnet' | 'bsctestnet' | 'avalancheTest' | 'hardhat'

export type MainnetChain = 'bsc' | 'opera' | 'ethereum' | 'avalanche' | 'polygon' | 'optimism' | 'arbitrum'

export interface Balance {
  balance: string
  address: string
  symbol: string
  name: string
  decimals: number
}
