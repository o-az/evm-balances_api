import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'hardhat'
import { MultiCoinBalanceLookup__factory } from './typechain/factories/contracts/MultiCoinBalanceLookup.sol'
import { MultiCoinBalanceLookup } from '@/typechain'

export const address = '0xb3224026E2AE0A8F9215cecAA4b522eF1bFb474A'

export function parsedResult(result: any) {
  const [balances] = result

  return balances.filter(Boolean).map(item => {
    const [contractAddress, balance, name, symbol, decimals] = item
    if (item[0] === null) return
    const parsedDecimals = parseInt(decimals.toString())
    return {
      contractAddress,
      balance: ethers.utils.formatUnits(balance, parsedDecimals),
      name,
      symbol,
      decimals: parsedDecimals,
    }
  })
}

export function getSC({
  contractAddress,
  provider,
}: {
  contractAddress: string
  provider: JsonRpcProvider
}): MultiCoinBalanceLookup {
  return MultiCoinBalanceLookup__factory.connect(contractAddress, provider)
}