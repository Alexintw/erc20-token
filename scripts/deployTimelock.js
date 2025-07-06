// scripts/deployTimelock.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const proposers = [];              // e.g. multisig DAO
  const executors = [ethers.constants.AddressZero]; // anyone
  const timelock = await ethers.getContractFactory("TimelockController")
    .then(f => f.deploy(2*86400, proposers, executors));
  console.log("Timelock:", timelock.address);
}
main();
