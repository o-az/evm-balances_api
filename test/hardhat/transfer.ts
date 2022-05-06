import { ethers } from "hardhat";
import { expect } from "chai";

describe("Transactions", function () {
  it("Should transfer tokens between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    if (!owner || !addr1 || !addr2) return;

    const Token = await ethers.getContractFactory("FakeTokenA");

    const hardhatToken = await Token.deploy(999999999);

    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    // Transfer to owner
    await hardhatToken.transfer(owner.address, 500);
    console.log(ownerBalance);

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
  });
});
