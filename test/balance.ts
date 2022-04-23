import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('Balance', function () {
  it('Should show balance the same from the multiBalancesChecker and token balanceOf', async function () {
    // Get the default Hardhat Runtime Environment
    const Token = await ethers.getContractFactory('BasicToken')
    const token = await Token.deploy(9999999999999)
    const [address] = await ethers.getSigners()

    await token.transfer(address.address, 500)

    const MultiBalancesChecker = await ethers.getContractFactory('MultiBalancesChecker')
    const multiBalancesChecker = await MultiBalancesChecker.deploy()

    const userBalance = await token.balanceOf(address.address)
    const balances = await multiBalancesChecker.tokenBalances(address.address, [token.address])
    expect(balances[0].toString()).to.equal(userBalance)
  })
})
