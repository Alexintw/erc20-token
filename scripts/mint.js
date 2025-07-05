const { ethers } = require("ethers");
require('dotenv').config();

async function main() {
  const [,, tokenAddress, recipient, amount] = process.argv;
  if (!tokenAddress || !recipient || !amount) {
    console.error("Usage: node mint.js <tokenContractAddress> <recipientAddress> <amount>");
    process.exit(1);
  }

  // Connect to Goerli via environment variable GOERLI_RPC_URL
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);

  // Create signer from private key
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Minimal ERC20 ABI with mint
  const abi = [
    "function mint(address to, uint256 amount) external",
    "function decimals() view returns (uint8)"
  ];

  const token = new ethers.Contract(tokenAddress, abi, wallet);

  // Convert amount to token units
  const decimals = await token.decimals();
  const mintAmount = ethers.utils.parseUnits(amount, decimals);

  console.log(`Minting ${amount} tokens to ${recipient}...`);

  // Send mint transaction
  const tx = await token.mint(recipient, mintAmount);
  console.log(`Transaction sent. Hash: ${tx.hash}`);

  // Wait for confirmation
  await tx.wait();
  console.log(`Mint successful! Transaction confirmed in block ${tx.blockNumber}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});