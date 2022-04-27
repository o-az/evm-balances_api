import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { networkUrl } from './constants'
import type { Chain } from './constants'

export function getProvider({ chain, write = false }: { chain: Chain; write?: boolean }) {
  const url = networkUrl(chain)
  return write ? new JsonRpcProvider(url) : new StaticJsonRpcProvider(url)
}

export const hexToString = (hex: string) => {
  const hexString = hex.slice(2)
  const hexArray = hexString.match(/.{1,2}/g)
  const stringArray = hexArray?.map(hex => String.fromCharCode(parseInt(hex, 16)))
  return stringArray?.join('')
}
