require('@nomiclabs/hardhat-solhint');
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-gas-reporter');
require('solidity-coverage');

module.exports = {
  solidity: "0.8.20",

  // 把 networks 保持纯粹，只放链配置
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },

  // 顶层的 gasReporter 配置 —— 一定不要缩进到 networks 里
  gasReporter: {
    enabled: true,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    // 如果不需要自动换算美元，可以删掉下一行
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || ''
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
