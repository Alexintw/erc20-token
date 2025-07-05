async function main() {
  // We get the contract to deploy
  const initialSupply = process.env.INITIAL_SUPPLY || '1000000'; // default 1,000,000
  const MyToken = await ethers.getContractFactory('MyToken');
  console.log(`Deploying MyToken with initial supply ${initialSupply}...`);

  // Deploy contract
  const token = await MyToken.deploy(
    ethers.utils.parseUnits(initialSupply, 18)
  );

  await token.deployed();

  console.log('MyToken deployed to:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });