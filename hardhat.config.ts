import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import { extendEnvironment, HardhatUserConfig, task } from 'hardhat/config'

import 'tsconfig-paths/register'
import { ethers } from 'ethers'

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task('accounts', 'Prints the list of accounts', async (args, hre) => {
//   const accounts = await hre.ethers.getSigners()

//   for await (const account of accounts) {
//     console.log(account.address, await account.getBalance())
//   }
// })

extendEnvironment(hre => {
  return {
    ethers,
  }
})

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const URL = `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`

const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: URL,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    },
  },
}

export default config
