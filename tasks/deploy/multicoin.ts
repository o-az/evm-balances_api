import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  if (!deployer) return;

  const MultiBalancesChecker = await ethers.getContractFactory(
    "MultiCoinBalanceLookup"
  );
  const multiBalancesChecker = await MultiBalancesChecker.deploy();

  console.log("MultiCoinBalanceLookup address:", multiBalancesChecker.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
