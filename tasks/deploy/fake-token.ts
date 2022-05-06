import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  if (!deployer) return;

  const Token = await ethers.getContractFactory("FakeTokenXXX");
  const initialSupply = 5555555555555555;
  const token = await Token.deploy(initialSupply);
  const transferAmount = 77777;
  const transferTo = "0x0000000000000000000000000000000000000000";
  const transfer = await token.transfer(transferTo, transferAmount);
  console.log({
    token: token.address,
    transfer: transfer.hash,
    transferAmount: transferAmount.toString(),
    receiver: deployer.address,
    initialSupply: initialSupply.toString(),
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
