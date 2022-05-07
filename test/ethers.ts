import { expect } from 'chai'
import { getTokensBalances } from '@/get-balance'
import { ENV_VARIABLES } from '@/constants'
import { getProvider } from '@/utilities'
import type { Chain } from '@/types'

const address = ENV_VARIABLES.TESTNET_WALLET_ADDR
const tokens = [
  '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  '0xE052Ef907f09c0053B237647aD7387D4BDF11A5A',
  '0xd2c55a4bBaF9f068a7281ba3204B52ED37fE992a',
]
const chain: Chain = 'ropsten'
const provider = getProvider({ chain, key: ENV_VARIABLES.INFURA_KEY })

describe('getTokensBalances', () => {
  const repeatCount = 2000
  const tokensRepeated = Array(repeatCount).fill(tokens).flat()
  const expected = [
    {
      contractAddress: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
      balance: '0.000009999999999999',
      name: 'FakeTokenA',
      symbol: 'FTNA',
      decimals: 18,
    },
    {
      contractAddress: '0xE052Ef907f09c0053B237647aD7387D4BDF11A5A',
      balance: '0.000007777777777777',
      name: 'FakeTokenB',
      symbol: 'FTNB',
      decimals: 18,
    },
    {
      contractAddress: '0xd2c55a4bBaF9f068a7281ba3204B52ED37fE992a',
      balance: '0.000003333333333333',
      name: 'FakeTokenC',
      symbol: 'FTNC',
      decimals: 18,
    },
  ]
  const expectedRepeated = Array(repeatCount).fill(expected).flat()
  it('Should show balances the same from the multiBalancesChecker and token balanceOf', async () => {
    let counter = 0
    const balances = await getTokensBalances({
      address,
      tokens: tokensRepeated,
      chain,
      provider,
    })
    balances.forEach(({ address, balance, name, symbol, decimals }, index) => {
      if (counter === 3) counter = 0
      expect(address).to.equal(expectedRepeated[index]?.contractAddress)
      expect(balance).to.equal(expectedRepeated[index]?.balance)
      expect(name).to.equal(expectedRepeated[index]?.name)
      expect(symbol).to.equal(expectedRepeated[index]?.symbol)
      expect(decimals).to.equal(expectedRepeated[index]?.decimals)
      counter++
      console.log({
        counter,
        address,
        balance,
        name,
        symbol,
        decimals,
      })
    })
  })
})
