import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const Token = await ethers.getContractFactory('BasicToken')
  const token = await Token.deploy(9999999999999)

  console.log('Token address:', token.address)

  token.transfer(deployer.address, 50000)
  const userBalance = await token.balanceOf(deployer.address)
  console.log('User balance', userBalance.toString())

  const MultiBalancesChecker = await ethers.getContractFactory('MultiBalancesChecker')
  const multiBalancesChecker = await MultiBalancesChecker.deploy()

  console.log('MultiBalancesChecker address:', multiBalancesChecker.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
