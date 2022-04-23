import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('Methods', function () {
  it('Should show show name, symbol and decimals from the MultiBalancesChecker contract', async function () {
    // Get the default Hardhat Runtime Environment
    const [address] = await ethers.getSigners()

    const Token = await ethers.getContractFactory('FakeTokenA')
    const token = await Token.deploy(9999999999999)
    const name = await token.name()
    const symbol = await token.symbol()
    const decimals = await token.decimals()
    await token.transfer(address.address, 1000)
    const userTokenBalance = await token.balanceOf(address.address)
    console.log('userTokenBalance', userTokenBalance)

    const Token2 = await ethers.getContractFactory('FakeTokenB')
    const token2 = await Token2.deploy(9999999999999)
    const name2 = await token2.name()
    const symbol2 = await token2.symbol()
    const decimals2 = await token2.decimals()
    await token2.transfer(address.address, 10000)
    const userToken2Balance = await token2.balanceOf(address.address)
    console.log('userToken2Balance', userToken2Balance)

    const MultiBalancesChecker = await ethers.getContractFactory('MultiCoinBalanceLookup')
    const multiBalancesChecker = await MultiBalancesChecker.deploy()

    const balances = await multiBalancesChecker.getBalances(address.address, [token.address, token2.address])

    console.log(JSON.stringify(balances, null, 2))

    expect(balances[0].balance.toString()).to.equal(userTokenBalance)
    expect(balances[0].name).to.equal(name)
    expect(balances[0].symbol).to.equal(symbol)
    expect(balances[0].decimals).to.equal(decimals)

    expect(balances[1].balance.toString()).to.equal(userToken2Balance)
    expect(balances[1].name).to.equal(name2)
    expect(balances[1].symbol).to.equal(symbol2)
    expect(balances[1].decimals).to.equal(decimals2)
  })
})
