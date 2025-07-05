const { ethers } = require("ethers");
require('dotenv').config();

async function main() {
  const [,, tokenAddress, account] = process.argv;
  if (!tokenAddress || !account) {
    console.error("Usage: node balance.js <tokenContractAddress> <accountAddress>");
    process.exit(1);
  }

  // Connect to Goerli via environment variable GOERLI_RPC_URL
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);

  // Minimal ERC20 ABI: balanceOf and decimals
  const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];

  const token = new ethers.Contract(tokenAddress, abi, provider);

  // Fetch balance and decimals
  const [rawBalance, decimals] = await Promise.all([
    token.balanceOf(account),
    token.decimals()
  ]);

  // Format balance
  const formatted = ethers.utils.formatUnits(rawBalance, decimals);

  console.log(`Balance of ${account} is ${formatted} tokens`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});