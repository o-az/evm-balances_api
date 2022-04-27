import { expect } from 'chai'
import { getTokenBalance, getTokensBalances } from '@/get-balance'
import { Chain, DEPLOYED_TOKENS, ENV_VARIABLES } from '@/constants'
import { getProvider } from '@/utilities'

const address = ENV_VARIABLES.TESTNET_WALLET_ADDR
const tokens = DEPLOYED_TOKENS['ropsten']
const chain: Chain = 'ropsten'
const provider = getProvider({ chain })

describe('getTokenBalance', () => {
  const expected = {
    contractAddress: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
    balance: '0.000009999999999999',
    name: 'FakeTokenA',
    symbol: 'FTNA',
    decimals: 18,
  }
  it('Should show balance the same from the multiBalancesChecker and token balanceOf', async () => {
    const balance = await getTokenBalance({ address, token: tokens[0], chain, provider })
    const { contractAddress, balance: balanceOf, name, symbol, decimals } = balance
    expect(contractAddress).to.equal(expected.contractAddress)
    expect(balanceOf).to.equal(expected.balance)
    expect(name).to.equal(expected.name)
    expect(symbol).to.equal(expected.symbol)
    expect(decimals).to.equal(expected.decimals)
  })
})

describe('getTokensBalances', () => {
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
  it('Should show balances the same from the multiBalancesChecker and token balanceOf', async () => {
    const balances = await getTokensBalances({ address, tokens, chain, provider })
    balances.forEach(({ contractAddress, balance, name, symbol, decimals }, index) => {
      expect(contractAddress).to.equal(expected[index]?.contractAddress)
      expect(balance).to.equal(expected[index]?.balance)
      expect(name).to.equal(expected[index]?.name)
      expect(symbol).to.equal(expected[index]?.symbol)
      expect(decimals).to.equal(expected[index]?.decimals)
    })
  })
})
