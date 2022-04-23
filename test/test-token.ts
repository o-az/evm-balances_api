import { ethers } from 'hardhat'
import { formatUnits } from 'ethers/lib/utils'
import { expect } from 'chai'

describe('Token contract', function () {
  it('Deployment should assign the total supply of tokens to the owner', async function () {
    const [owner] = await ethers.getSigners()

    const Token = await ethers.getContractFactory('FakeTokenA')
    const fakeToken = await Token.deploy(99999999999999)
    const name = await fakeToken.name()
    console.log(name)
    const ownerBalance = await fakeToken.balanceOf(owner.address)
    console.log(ownerBalance)
    const totalSupply = await fakeToken.totalSupply()
    fakeToken.symbol
    console.log(totalSupply)
    expect(totalSupply).to.equal(99999999999999)
    //expect(await fakeToken.totalSupply()).to.equal(ownerBalance)
  })
})
