require('dotenv').config();

// 1. Solhint for linting
require('@nomiclabs/hardhat-solhint');
// 2. Ethers v6 support
require('@nomicfoundation/hardhat-ethers');
// 3. Chai matchers
require('@nomicfoundation/hardhat-chai-matchers');
// 4. Etherscan verify
require('@nomicfoundation/hardhat-verify');
// 5. Gas reporter & coverage (optional)
require('hardhat-gas-reporter');
require('solidity-coverage');

module.exports = {
  solidity: '0.8.20',
  networks: {
    hardhat: {},
    localhost: { url: 'http://127.0.0.1:8545' },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || ''
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
