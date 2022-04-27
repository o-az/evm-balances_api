import type { Chain, TestnetChain } from './chains'

export const DEPLOYED_CONTRACTS: Record<Chain, string> = {
  bsc: '',
  ropsten: '0x7810c5Fb8917086a47DF8F941733dF5F59577bCc',
  mainnet: '',
  rinkeby: '',
  hardhat: '',
  avalanche: '',
  'polygon-mumbai': '',
  'polygon-mainnet': '',
  'optimism-mainnet': '',
  'arbitrum-mainnet': '',
}

export const DEPLOYED_TOKENS: {
  [chain in TestnetChain]: [string, ...string[]]
} = {
  ropsten: [
    '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
    '0xE052Ef907f09c0053B237647aD7387D4BDF11A5A',
    '0xd2c55a4bBaF9f068a7281ba3204B52ED37fE992a',
  ],
  rinkeby: [''],
  hardhat: [''],
  'polygon-mumbai': [''],
}
