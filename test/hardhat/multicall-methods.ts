import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('Methods', function () {
  it('Should show show name, symbol and decimals from the MultiBalancesChecker contract', async function () {
    // Get the default Hardhat Runtime Environment
    const [address] = await ethers.getSigners()

    if (!address) return

    console.log('Deploying contracts with the account:', address.address)

    console.log('Account balance:', (await address.getBalance()).toString())

    const Token = await ethers.getContractFactory('FakeTokenA')
    const token = await Token.deploy(9999999999999)
    const name = await token.name()
    const symbol = await token.symbol()
    const decimals = await token.decimals()

    console.log('Token address:', token.address)

    token.transfer(address.address, 999)
    const userBalance = await token.balanceOf(address.address)
    console.log(`User balance for ${name}`, userBalance.toString())

    const Token2 = await ethers.getContractFactory('FakeTokenB')
    const token2 = await Token2.deploy(7777777777777)
    const name2 = await token2.name()
    const symbol2 = await token2.symbol()
    const decimals2 = await token2.decimals()

    console.log('Token2 address:', token2.address)

    token2.transfer(address.address, 777)
    const userBalance2 = await token2.balanceOf(address.address)
    console.log(`User balance for ${name2}`, userBalance2.toString())

    const Token3 = await ethers.getContractFactory('FakeTokenC')
    const token3 = await Token3.deploy(3333333333333)
    const name3 = await token3.name()
    const symbol3 = await token3.symbol()
    const decimals3 = await token3.decimals()

    console.log('Token3 address:', token3.address)

    token3.transfer(address.address, 333)
    const userBalance3 = await token3.balanceOf(address.address)
    console.log(`User balance for ${name3}`, userBalance3.toString())

    const MultiBalancesChecker = await ethers.getContractFactory('MultiCoinBalanceLookup')
    const multiBalancesChecker = await MultiBalancesChecker.deploy()

    console.log('MultiCoinBalanceLookup address:', multiBalancesChecker.address)

    const balances = await multiBalancesChecker.getBalances(address.address, [
      token.address,
      token2.address,
      token3.address,
    ])

    console.log(balances)
    console.log(balances[2])

    expect(balances[0]?.balance.toString()).to.equal(userBalance.toString())
    expect(balances[0]?.name).to.equal(name)
    expect(balances[0]?.symbol).to.equal(symbol)
    expect(balances[0]?.decimals).to.equal(decimals)

    expect(balances[1]?.balance.toString()).to.equal(userBalance2.toString())
    expect(balances[1]?.name).to.equal(name2)
    expect(balances[1]?.symbol).to.equal(symbol2)
    expect(balances[1]?.decimals).to.equal(decimals2)

    expect(balances[2]?.balance.toString()).to.equal(userBalance3.toString())
    expect(balances[2]?.name).to.equal(name3)
    expect(balances[2]?.symbol).to.equal(symbol3)
    expect(balances[2]?.decimals).to.equal(decimals3)
  })
})
