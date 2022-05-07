import { Contract } from 'ethers'
import { providers } from 'ethers'
import { getProvider } from '..'

import { DEPLOYED_CONTRACTS } from '@/constants'
import MULTI_COIN_BALANCE_LOOKUP_ABI from '../data/abi/MultiCoinBalanceLookup.abi.json'

import { formatTokensBalances } from './format'

import type { Balance,Chain } from '@/types'

type Provider = providers.Provider

// TODO: support passing a default list of tokens
export async function getTokensBalances({
  address,
  tokens,
  chain,
  provider,
}: {
  address: string
  chain: Chain
  provider: Provider
  tokens: string[]
}): Promise<Balance[]> {
  if (!DEPLOYED_CONTRACTS[chain]) throw new Error(`Chain ${chain} not supported yet`)
  try {
    const contract = getContract({
      contractAddress: DEPLOYED_CONTRACTS[chain],
      provider,
    })
    const balances = await contract.getBalances(address, tokens)
    console.log(balances)
    const formatted = await formatTokensBalances({
      balances,
      contractAddresses: tokens,
      chain,
    })
    return formatted as Balance[]
  } catch (error) {
    console.trace(error)
    throw new Error(`Could not get balances for ${address} on chain ${chain}`)
  }
}

function getContract({ contractAddress, provider }: { contractAddress: string; provider: Provider }) {
  return new Contract(contractAddress, MULTI_COIN_BALANCE_LOOKUP_ABI, provider)
}

// import POLYGON_CONTRACTS from '@/data/tokens/polygon-contracts.json'

// getTokensBalances({
//   provider: getProvider({ chain: 'polygon-mainnet', key: ENV_VARIABLES.INFURA_KEY }),
//   tokens: POLYGON_CONTRACTS,
//   address: '0x52a258ed593c793251a89bfd36cae158ee9fc4f8',
//   chain: 'polygon-mainnet',
// })
