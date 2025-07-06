# ERC20 Token Hardhat

A minimal Hardhat boilerplate for an ERC20 token project featuring:

* EIP‑2612 permit (gasless approvals)
* Meta‑transactions via Biconomy (pay gas in MTK or USD)
* On‑chain snapshot & governor module
* Token vesting & timelocks
* Deflationary burn on transfer
* Testing, gas reporting, coverage, linting, and Etherscan verification

---

## 📋 Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Environment Variables](#environment-variables)
* [Project Structure](#project-structure)
* [Operation Flow](#operation-flow)
* [Troubleshooting](#troubleshooting)
* [Contributing](#contributing)
* [License](#license)

---

## 🔥 Features

1. **ERC20 Core**

   * OpenZeppelin ERC20 + Ownable + EIP‑2612 Permit extension
   * Payable `permit()` signatures instead of on‑chain `approve()` (gasless UX)
2. **Meta‑Transactions**

   * Integrates Biconomy SDK and Forwarder for gasless transfers
   * Users can pay gas in MTK or USD, no ETH required
3. **Snapshot & Governance**

   * Optional snapshot module (ERC20Snapshot)
   * Governor contract for on‑chain proposals and voting
   * TimelockController for secure, delayed execution
4. **Vesting & Timelocks**

   * TokenVesting contracts for team/investor schedules
   * TimelockController to enforce minimum delay on governance actions
5. **Burn on Transfer**

   * Deflationary hook burns a basis‑point fee on each transfer
   * Owner can adjust burn rate (up to 5%)
6. **Local Testing & CI**

   * Hardhat + Mocha/Chai + Foundation matchers
   * Unit tests cover permit, meta‑tx, vesting, governance, and burn
7. **Gas Reporting & Coverage**

   * `hardhat-gas-reporter` outputs `gas-report.txt`
   * `solidity-coverage` generates HTML coverage report
8. **Lint & Format**

   * `solhint` + `prettier-plugin-solidity`
9. **Deployment & Verification**

   * Scripts for Local, Goerli, and Sepolia networks
   * Etherscan source verification
10. **CI**

    * GitHub Actions for compile, test, lint, and coverage

---

## ⚙️ Prerequisites

* Node.js v16+ & npm
* Git
* An Ethereum wallet private key (testnets)
* RPC endpoint (Infura/Alchemy/other)
* Etherscan API key
* Biconomy API key (for meta‑transactions)
* (Optional) CoinMarketCap API key for gas price reporting

---

## 🚀 Getting Started

1. **Clone & Install**

   ```bash
   git clone https://github.com/<your‑username>/erc20-token.git
   cd erc20-token
   npm install
   ```

2. **Configure `.env`**

   ```bash
   cp .env.example .env
   ```

   Fill in your keys:

   ```ini
   GOERLI_RPC_URL=...
   SEPOLIA_RPC_URL=...
   PRIVATE_KEY=0x...
   ETHERSCAN_API_KEY=...
   BICONOMY_API_KEY=...
   COINMARKETCAP_API_KEY=...  # optional
   ```

---

## 💻 Usage

```bash
# Compile
npm run compile

# Run unit tests
npm run test

# Gas report
npm run gas

# Coverage report
npm run coverage

# Lint
npm run lint

# Format
npm run format

# Deploy to local Hardhat node\ npm run deploy:localhost

# Deploy to Goerli\ npm run deploy:goerli

# Verify on Goerli\ npm run verify:goerli -- <tokenAddress> <initialSupply> <forwarderAddress>
```

---

## 🛠️ Environment Variables

| Key                     | Description                        |
| ----------------------- | ---------------------------------- |
| `GOERLI_RPC_URL`        | RPC endpoint for Goerli testnet    |
| `SEPOLIA_RPC_URL`       | RPC endpoint for Sepolia testnet   |
| `PRIVATE_KEY`           | Deployer private key               |
| `ETHERSCAN_API_KEY`     | Etherscan API key for verification |
| `BICONOMY_API_KEY`      | Biconomy SDK key for meta‑tx       |
| `COINMARKETCAP_API_KEY` | (Optional) for gas price USD rate  |

---

## 🗂️ Project Structure

```text
erc20-token/
├─ contracts/
│   ├ MyToken.sol         # ERC20 + Permit + Meta‑tx + Burn
│   ├ MyGovernor.sol      # Basic Governor module
│   └ TokenVesting.sol    # Vesting schedules
│   └ TimelockController.sol # OpenZeppelin timelock
├─ scripts/
│   ├ deploy.js           # token & forwarder
│   ├ deployVesting.js    # vesting contract + fund
│   ├ deployTimelock.js   # timelock controller
│   └ deployGovernor.js   # governor contract
├─ test/
│   ├ vesting.test.js
│   ├ governance.test.js
│   └ burn.test.js
├─ cache/
├─ artifacts/
├─ coverage/
├─ gas-report.txt
├─ hardhat.config.js
├─ .solhint.json
├─ .prettierrc.js
├─ .env.example
└─ package.json
```

---

## 🔄 Architecture
![System Interaction Flow](docs/architecture.svg)
---

## ❓ Troubleshooting

* **Plugin/Compiler errors**: Align Solidity pragma (contracts) with version in `hardhat.config.js`
* **Meta‑tx fails**: Check `BICONOMY_API_KEY` & forwarder address in deployment
* **Vesting issues**: Ensure `TokenVesting` is funded before cliff

---

## 🤝 Contributing

1. Fork & branch
2. Commit changes
3. Open a PR and ensure CI passes

---

## 📄 License

MIT © `Alex Ko`
