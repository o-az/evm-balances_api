import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-gas-reporter'
import 'tsconfig-paths/register'
import 'solidity-coverage'
import { HardhatUserConfig } from 'hardhat/types'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

dotenvConfig({ path: resolve(__dirname, './.env') })

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
