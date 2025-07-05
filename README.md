# ERC20 Token Hardhat

A minimal Hardhat boilerplate for an ERC20 token contract, featuring compilation, testing, gas reporting, coverage, and Etherscan verification.

## Features

- **ERC20 Contract**  
  - `MyToken.sol` extends OpenZeppelin’s `ERC20` & `Ownable`  
  - Constructor mints initial supply (scaled by decimals)  
  - Owner-only `mint`  
  - Public `burn`  
- **Local Testing**  
  - Hardhat + Mocha/Chai + Waffle matchers  
  - Automated tests for mint, burn, transfer, edge cases  
- **Gas Reporting**  
  - `hardhat-gas-reporter` integration  
  - Generates `gas-report.txt`  
- **Coverage**  
  - `solidity-coverage` plugin  
  - Generates `coverage/` HTML report  
- **Lint & Format**  
  - `solhint` static analysis & auto-fix  
  - Prettier with `prettier-plugin-solidity` support  
- **Deployment & Verification**  
  - Hardhat scripts for Local, Goerli, Sepolia  
  - Etherscan source verification  
- **CI**  
  - GitHub Actions for lint, test, coverage   

## Prerequisites

- Node.js v16+ & npm  
- Git  
- An Ethereum wallet private key (for testnets)  
- Infura/Alchemy project ID or equivalent RPC endpoint  
- Etherscan API key  

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/erc20-token.git
cd erc20-token
npm install

### 2. Environment Variables
Copy and edit the example:
cp .env.example .env
Fill in your values in .env:
GOERLI_RPC_URL=https://goerli.infura.io/v3/YOUR_PROJECT_ID
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY
Note: Do not commit .env to version control. Add it to .gitignore.
### 3. Usage
Compile Contracts
npx hardhat compile
Run Tests
npx hardhat test
# Expected output:
#   ✔ should transfer tokens between accounts
Local Deployment
npx hardhat node
# In a new terminal:
npx hardhat run scripts/deploy.js --network localhost
Testnet Deployment
npx hardhat run scripts/deploy.js --network goerli
# or
npx hardhat run scripts/deploy.js --network sepolia
Etherscan Verification
After deployment, verify on Etherscan:
npx hardhat verify --network goerli <DEPLOYED_ADDRESS> 1000000
Replace <DEPLOYED_ADDRESS> and 1000000 (initial supply in whole tokens) accordingly.

### 4. Project Structure
erc20-token/
├── contracts/
│   └── MyToken.sol         # ERC20 implementation
├── scripts/
│   └── deploy.js           # Deploy script (local & testnets)
├── test/
│   └── transfer-test.js    # Mocha/Chai transfer test
├── hardhat.config.js       # Solidity compiler & network settings
├── .env.example            # Sample environment variables
├── package.json            # Dependencies & npm scripts
└── README.md               # This file

# ERC20 Token Hardhat

[![Build Status](https://github.com/Alexintw/erc20-token/actions/workflows/ci.yml/badge.svg)](https://github.com/Alexintw/erc20-token/actions)
[![Coverage Status](https://coveralls.io/repos/github/Alexintw/erc20-token/badge.svg)](https://coveralls.io/github/Alexintw/erc20-token) 

## ERC20 Token Operation Flowchart

```mermaid
flowchart TD
  A[Deploy Contract] --> B[Constructor: mint initialSupply to deployer]
  B --> C{User calls function}
  C -->|mint(to, amount)| D[onlyOwner?]
  D -->|Yes| E[_mint(to, amount * 10^decimals())]
  D -->|No| F[Revert: Ownable: caller is not the owner]
  C -->|transfer(to, amount)| G[has balance ≥ amount?]
  G -->|Yes| H[_transfer(from, to, amount)]
  G -->|No| I[Revert: ERC20: transfer amount exceeds balance]
  C -->|burn(amount)| J[has balance ≥ amount?]
  J -->|Yes| K[_burn(from, amount * 10^decimals())]
  J -->|No| L[Revert: ERC20: burn amount exceeds balance]
  E --> M[Emit Transfer(address(0), to, scaledAmount)]
  H --> N[Emit Transfer(from, to, amount)]
  K --> O[Emit Transfer(from, address(0), scaledAmount)]


### 5. Troubleshooting

Network Unreachable
Ensure your RPC URL is correct and your network allows DNS resolution of *.infura.io.
Invalid Private Key
Must be 0x + 64 hex characters.
Version Mismatch
Adjust Solidity version in hardhat.config.js to match OpenZeppelin’s pragma.
### 6. Contributing

Fork the project
Create your feature branch (git checkout -b feature/foo)
Commit your changes (git commit -am 'Add some feature')
Push to the branch (git push origin feature/foo)
Open a Pull Request
Run npm test before submitting
### 7. License

MIT © Alex Ko