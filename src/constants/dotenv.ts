import "dotenv/config";

export const ENV_VARIABLES = {
  REPORT_GAS: process.env.REPORT_GAS,
  ALCHEMY_KEY: process.env.ALCHEMY_KEY,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  ETHERSCAN_KEY: process.env.ETHERSCAN_KEY,
  TESTNET_WALLET_ADDR: process.env.TESTNET_WALLET_ADDR,
  ROPSTEN_ALCHEMY_KEY: process.env.ROPSTEN_ALCHEMY_KEY,
  INFURA_KEY: process.env.INFURA_KEY,
};
