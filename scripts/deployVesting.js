// scripts/deployVesting.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const tokenAddress = "0xYourMyTokenAddress";
  const beneficiary  = "0xBeneficiaryAddress";
  const start        = Math.floor(Date.now() / 1000); // now
  const cliff        = 60 * 24 * 60 * 60;             // 60 days
  const duration     = 360 * 24 * 60 * 60;            // 360 days
  const revocable    = true;

  // 1. Attach to your deployed token
  const MyToken = await ethers.getContractFactory("MyToken");
  const token   = MyToken.attach(tokenAddress);

  // 2. Deploy TokenVesting
  const Vesting = await ethers.getContractFactory("TokenVesting");
  const vesting = await Vesting.deploy(
    beneficiary,
    start,
    cliff,
    duration,
    revocable
  );
  await vesting.deployed();
  console.log("Vesting at:", vesting.address);

  // 3. Fund vesting contract
  const amount = ethers.utils.parseUnits("1000000", 18); // 1 M MTK
  await (await token.transfer(vesting.address, amount)).wait();
  console.log(`Funded ${amount} MTK to vesting`);
}

main().catch(console.error);
