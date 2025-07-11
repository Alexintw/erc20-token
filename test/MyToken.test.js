const { expect } = require("chai");
const { ethers } = require("hardhat");

// sanity‐check your zero‐address constant
console.log("ethers.ZeroAddress:", ethers.ZeroAddress);

describe("MyToken", function () {
  let owner, addr1, token;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy();
    await token.waitForDeployment();
  });

  it("should have initial supply for owner", async () => {
    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(ethers.parseEther("1000"));
  });

  it("owner can mint and non-owner cannot", async () => {
    // Emit Transfer(zero → addr1, 100)
    await expect(token.connect(owner).mint(addr1.address, 100))
      .to.emit(token, "Transfer")
      .withArgs(
        ethers.ZeroAddress,          // from = zero address
        addr1.address,               // to   = addr1
        ethers.parseEther("100")     // value = 100 * 10^18
      );

    // Balance updated?
    expect(await token.balanceOf(addr1.address))
      .to.equal(ethers.parseEther("100"));

    // Non-owner mint should revert with custom OZ error
    await expect(
      token.connect(addr1).mint(addr1.address, 1)
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount")
     .withArgs(addr1.address);
  });

  it("burn: holder can burn, cannot burn more than balance", async () => {
    // Give addr1 200 tokens
    await token.connect(owner).mint(addr1.address, 200);

    // Over-burn must revert with OZ custom error
    await expect(
      token.connect(addr1).burn(300)
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");

    // Valid burn emits Transfer(addr1 → zero, 50)
    await expect(token.connect(addr1).burn(50))
      .to.emit(token, "Transfer")
      .withArgs(
        addr1.address,               // from = addr1
        ethers.ZeroAddress,          // to   = zero address
        ethers.parseEther("50")      // value = 50 * 10^18
      );

    // New total supply: 1000 + 200 – 50 = 1150
    expect(await token.totalSupply())
      .to.equal(ethers.parseEther("1150"));
  });

  it("transfer emits event and updates balances", async () => {
    await expect(
      token.transfer(addr1.address, ethers.parseEther("50"))
    ).to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, ethers.parseEther("50"));

    expect(await token.balanceOf(addr1.address))
      .to.equal(ethers.parseEther("50"));
  });

  it("zero-transfer still emits Transfer(0)", async () => {
    await expect(token.transfer(addr1.address, 0))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, 0);
  });
});  // <-- This closing brace/paren was probably missing
