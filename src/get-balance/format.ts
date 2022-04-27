import { utils } from 'ethers'
import type { MultiCoinBalanceLookup } from '@/typechain'
import type { Balance } from './types'

type StructBalance = MultiCoinBalanceLookup.BalanceStructOutput

export function formatTokenBalance(structBalance: StructBalance): Balance {
  const { contractAddress, balance, name, symbol, decimals } = structBalance
  const _decimals = parseInt(decimals.toString(), 10)
  const _balance = utils.formatUnits(balance, _decimals)
  return {
    contractAddress,
    balance: _balance,
    name,
    symbol,
    decimals: _decimals,
  }
}

export function formatTokensBalances(structBalances: StructBalance[]): Balance[] {
  return structBalances.map(formatTokenBalance)
}
