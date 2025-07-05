const { expect } = require("chai");
const { ethers } = require("hardhat");
const chai = require('chai');
const { solidity } = require('ethereum-waffle');
chai.use(solidity);

describe("MyToken", function () {
  let Token, token, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    Token = await ethers.getContractFactory("MyToken");
    // Deploy with initialSupply of 1000 tokens (scaled by decimals)
    token = await Token.deploy(ethers.utils.parseUnits("1000", 18));
    await token.deployed();
  });

  it("should have initial supply for owner", async () => {
    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(ethers.utils.parseUnits("1000", 18));
  });

  it("owner can mint and non-owner cannot", async () => {
    // owner mints 100 tokens to addr1
    await expect(token.connect(owner).mint(addr1.address, 100))
      .to.emit(token, 'Transfer')
      .withArgs(ethers.constants.AddressZero, addr1.address, ethers.utils.parseUnits("100", 18));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.utils.parseUnits("100", 18));
    // non-owner mint should revert
    await expect(
      token.connect(addr1).mint(addr1.address, 1)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("burn: holder can burn, cannot burn more than balance", async () => {
    // owner mints then holder burns
    await token.connect(owner).mint(addr1.address, 200);
    await expect(
      token.connect(addr1).burn(300)
    ).to.be.revertedWith("ERC20: burn amount exceeds balance");
    await expect(
      token.connect(addr1).burn(50)
    ).to.emit(token, 'Transfer')
      .withArgs(addr1.address, ethers.constants.AddressZero, ethers.utils.parseUnits("50", 18));
    const total = await token.totalSupply();
    expect(total).to.equal(ethers.utils.parseUnits("1150", 18));
  });

  it("transfer emits event and updates balances", async () => {
    await expect(
      token.transfer(addr1.address, ethers.utils.parseUnits("50", 18))
    )
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, ethers.utils.parseUnits("50", 18));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.utils.parseUnits("50", 18));
  });

  it("zero-transfer still emits Transfer(0)", async () => {
    await expect(token.transfer(addr1.address, 0))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, 0);
  });
});
