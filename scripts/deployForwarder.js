const { ethers } = require("hardhat");
async function main() {
  const Forwarder = await ethers.getContractFactory("MinimalForwarder");
  const forwarder = await Forwarder.deploy();
  console.log("Forwarder at:", forwarder.address);
}
main();