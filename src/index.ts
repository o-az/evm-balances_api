export * from './get-balance'
export * from './constants'
export * from './utilities'
export * from './data'

import { ethers } from 'hardhat'
import web3 from 'web3'
const x = async () => {
  const contract = await ethers.getContractFactory('MultiCoinBalanceLookup')
  contract.interface
}
