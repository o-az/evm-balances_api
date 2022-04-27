import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  if(!deployer) return;

  const Token = await ethers.getContractFactory('FakeTokenA')
  const token = await Token.deploy(9999999999999)
  const name = await token.name()

  console.log('Token address:', token.address)

  token.transfer(deployer.address, 999)
  const userBalance = await token.balanceOf(deployer.address)
  console.log(`User balance for ${name}`, userBalance.toString())

  const Token2 = await ethers.getContractFactory('FakeTokenB')
  const token2 = await Token2.deploy(7777777777777)
  const name2 = await token2.name()

  console.log('Token2 address:', token2.address)

  token2.transfer(deployer.address, 777)
  const userBalance2 = await token2.balanceOf(deployer.address)
  console.log(`User balance for ${name2}`, userBalance2.toString())

  const Token3 = await ethers.getContractFactory('FakeTokenC')
  const token3 = await Token3.deploy(3333333333333)
  const name3 = await token3.name()

  console.log('Token3 address:', token3.address)

  token3.transfer(deployer.address, 333)
  const userBalance3 = await token3.balanceOf(deployer.address)
  console.log(`User balance for ${name3}`, userBalance3.toString())

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