import { providers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

import { networkUrl } from './constants'
import type { Chain } from './constants'

export function getProvider({ chain, key, write = false }: { chain: Chain; key: string; write?: boolean }) {
  const url = networkUrl({ chain, key })
  return new providers.JsonRpcProvider(url)
}

export const hexToString = (hex: string) => {
  const hexString = hex.slice(2)
  const hexArray = hexString.match(/.{1,2}/g)
  const stringArray = hexArray?.map(hex => String.fromCharCode(parseInt(hex, 16)))
  return stringArray?.join('')
}

// TODO
export function parsedResult(result: any) {
  const [balances] = result

  return balances.filter(Boolean).map(item => {
    const [contractAddress, balance, name, symbol, decimals] = item
    if (item[0] === null) return
    const parsedDecimals = parseInt(decimals.toString())
    return {
      contractAddress,
      balance: formatUnits(balance, parsedDecimals),
      name,
      symbol,
      decimals: parsedDecimals,
    }
  })
}
