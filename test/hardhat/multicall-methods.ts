import { ethers } from "hardhat";
import { expect } from "chai";

describe("Methods", function () {
  it("Should show show name, symbol and decimals from the MultiBalancesChecker contract", async function () {
    // Get the default Hardhat Runtime Environment
    const [address] = await ethers.getSigners();

    if (!address) return;

    console.log("Deploying contracts with the account:", address.address);

    console.log("Account balance:", (await address.getBalance()).toString());

    const Token = await ethers.getContractFactory("FakeTokenA");
    const token = await Token.deploy(9999999999999);
    const name = await token.name();

    console.log("Token address:", token.address);

    token.transfer(address.address, 999);
    const userBalance = await token.balanceOf(address.address);
    console.log(`User balance for ${name}`, userBalance.toString());

    const Token2 = await ethers.getContractFactory("FakeTokenB");
    const token2 = await Token2.deploy(7777777777777);
    const name2 = await token2.name();

    console.log("Token2 address:", token2.address);

    token2.transfer(address.address, 777);
    const userBalance2 = await token2.balanceOf(address.address);
    console.log(`User balance for ${name2}`, userBalance2.toString());

    const Token3 = await ethers.getContractFactory("FakeTokenC");
    const token3 = await Token3.deploy(3333333333333);
    const name3 = await token3.name();

    console.log("Token3 address:", token3.address);

    token3.transfer(address.address, 333);
    const userBalance3 = await token3.balanceOf(address.address);
    console.log(`User balance for ${name3}`, userBalance3.toString());

    const MultiBalancesChecker = await ethers.getContractFactory(
      "MultiCoinBalanceLookup"
    );
    const multiBalancesChecker = await MultiBalancesChecker.deploy();

    console.log(
      "MultiCoinBalanceLookup address:",
      multiBalancesChecker.address
    );

    const balances = await multiBalancesChecker.getBalances(address.address, [
      token.address,
      token2.address,
      token3.address,
    ]);

    expect(balances[0]?.toString()).to.equal(userBalance.toString());

    expect(balances[1]?.toString()).to.equal(userBalance2.toString());

    expect(balances[2]?.toString()).to.equal(userBalance3.toString());
  });
});
