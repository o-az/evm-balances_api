import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const Token = await ethers.getContractFactory('FakeTokenA')
  const token = await Token.deploy(9999999999999)
  const name = await token.name()

  console.log('Token address:', token.address)

  token.transfer(deployer.address, 50000)
  const userBalance = await token.balanceOf(deployer.address)
  console.log(`User balance for ${name}`, userBalance.toString())

  const Token2 = await ethers.getContractFactory('FakeTokenB')
  const token2 = await Token2.deploy(999999999)
  const name2 = await token2.name()

  console.log('Token2 address:', token2.address)

  token2.transfer(deployer.address, 500)
  const userBalance2 = await token2.balanceOf(deployer.address)
  console.log(`User balance for ${name2}`, userBalance2.toString())

  const MultiBalancesChecker = await ethers.getContractFactory('MultiCoinBalanceLookup')
  const multiBalancesChecker = await MultiBalancesChecker.deploy()

  console.log('MultiCoinBalanceLookup address:', multiBalancesChecker.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
