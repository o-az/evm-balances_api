import { ethers } from 'hardhat'

const account = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
const tokenContract = '0xAE815fB0f7F34cB36dab0A3Bc5D2063b6F12536c'
const multiBalancesCheckerContract = '0xCf1Cc9Ebc1eAB209f42EEafD5ff9923065B2d022'

export async function main() {
  // Get the default Hardhat Runtime Environment
  const Token = await ethers.getContractFactory('BasicToken')
  const token = await Token.deploy(9999999999999)
  console.log('Token address:', token.address)
  const [address] = await ethers.getSigners()
  console.log('Address', address.address)

  const ethBalance = await address.getBalance()
  console.log('Balance', ethBalance.toString())

  await token.transfer(address.address, 500)

  const MultiBalancesChecker = await ethers.getContractFactory('MultiBalancesChecker')
  const multiBalancesChecker = await MultiBalancesChecker.deploy()

  const userBalance = await token.balanceOf(address.address)
  console.log('User balance', userBalance.toString())
  const balances = await multiBalancesChecker.tokenBalances(address.address, [token.address])
  console.log('Token balances', balances)
}

main().then(console.log).catch(console.error)
