import { providers } from 'ethers'

import type { Balance } from './types'
import { Chain } from '../constants'
import { DEPLOYED_CONTRACTS } from '../constants'
import type { MultiCoinBalanceLookup } from '../typechain'
import { formatTokenBalance, formatTokensBalances } from './format'
import { MultiCoinBalanceLookup__factory } from '../typechain/factories/contracts/MultiCoinBalanceLookup.sol'

type Provider = providers.Provider

export async function getTokenBalance({
  address,
  token,
  chain,
  provider,
}: {
  address: string
  chain: Chain
  provider: Provider
  token: string
}): Promise<Balance> {
  try {
    const contract = getContract({ contractAddress: DEPLOYED_CONTRACTS[chain], provider })
    const result = await contract.getBalance(address, token)
    return formatTokenBalance(result)
  } catch (error) {
    console.trace(error)
    throw new Error(`Error getting token balance for ${address} on ${chain}`)
  }
}

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
  try {
    const contract = getContract({ contractAddress: DEPLOYED_CONTRACTS[chain], provider })
    const balances = await contract.getBalances(address, tokens)
    return formatTokensBalances(balances)
  } catch (error) {
    console.trace(error)
    throw new Error(`Could not get balances for ${address} on chain ${chain}`)
  }
}

function getContract({
  contractAddress,
  provider,
}: {
  contractAddress: string
  provider: Provider
}): MultiCoinBalanceLookup {
  return MultiCoinBalanceLookup__factory.connect(contractAddress, provider)
}
