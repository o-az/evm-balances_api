import { providers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

import type { Chain } from '@/types'

export const networkUrl = ({
  chain,
  infuraKey,
  alchemyKey,
}: {
  chain: Chain
  infuraKey?: string
  alchemyKey?: string
}) => {
  let jsonRpcUrl: string
  switch (chain) {
    case 'opera':
      jsonRpcUrl = 'https://rpcapi.fantom.network'
      break
    case 'avalanche':
      jsonRpcUrl = 'https://api.avax.network/ext/bc/C/rpc'
      break
    case 'avalancheTest':
      jsonRpcUrl = 'https://api.avax-test.network/ext/bc/C/rpc'
      break
    case 'bsc':
      jsonRpcUrl = 'https://bsc-dataseed1.binance.org'
      break
    case 'bsctestnet':
      jsonRpcUrl = 'https://data-seed-prebsc-2-s3.binance.org:8545/'
      break
    case 'polygon':
    case 'polygonTestnet':
      jsonRpcUrl = `https://${chain}.g.alchemy.com/v2/${alchemyKey}`
      break
    case 'ethereum':
      jsonRpcUrl = 'https://mainnet.infura.io/v3/' + infuraKey
      break
    default:
      jsonRpcUrl = `https://${chain}.infura.io/v3/${infuraKey}`
  }
  return jsonRpcUrl
}

export function getProvider({
  chain,
  infuraKey,
  alchemyKey,
  write = false,
}: {
  chain: Chain
  key: string
  write?: boolean
  infuraKey?: string
  alchemyKey?: string
}) {
  const url = networkUrl({ chain, infuraKey, alchemyKey })
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
