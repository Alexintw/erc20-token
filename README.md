# ERC20 Token Hardhat

A minimal Hardhat boilerplate for an ERC20 token contract, featuring compilation, testing, gas reporting, coverage, and Etherscan verification.

---

## Features

1. **ERC20 Contract**
   - MyToken.sol extends OpenZeppelin’s ERC20 & Ownable
   - Constructor mints initial supply (scaled by decimals)
   - Owner-only `mint`
   - Public `burn`
2. **Local Testing**
   - Hardhat + Mocha/Chai + Waffle matchers
   - Automated tests for mint, burn, transfer, edge cases
3. **Gas Reporting**
   - hardhat-gas-reporter integration
   - Generates `gas-report.txt`
4. **Coverage**
   - solidity-coverage plugin
   - Generates `coverage/` HTML report
5. **Lint & Format**
   - solhint static analysis & auto-fix
   - Prettier with prettier-plugin-solidity support
6. **Deployment & Verification**
   - Hardhat scripts for Local, Goerli, Sepolia
   - Etherscan source verification
7. **CI**
   - GitHub Actions for lint, test, coverage

---

## Prerequisites

- Node.js v16+ & npm  
- Git  
- An Ethereum wallet private key (testnets)  
- Infura/Alchemy project ID or equivalent RPC endpoint  
- Etherscan API key  

---

## Getting Started

1. **Clone & Install**
   ```bash
   git clone https://github.com/Alexintw/erc20-token.git
   cd erc20-token
   npm install
   ```

2. **Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Fill in `.env`:
   ```ini
   GOERLI_RPC_URL=https://goerli.infura.io/v3/YOUR_PROJECT_ID
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
   PRIVATE_KEY=0xYOUR_PRIVATE_KEY
   ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY
   COINMARKETCAP_API_KEY=YOUR_COINMARKETCAP_KEY  # optional
   ```

3. **Usage**
   ```bash
   # Compile
   npm run compile

   # Run Tests
   npm run test

   # Gas Report
   npm run gas

   # Coverage Report
   npm run coverage

   # Lint
   npm run lint

   # Format
   npm run format

   # Deploy Local
   npm run deploy:localhost

   # Deploy Goerli
   npm run deploy:goerli

   # Verify on Etherscan
   npm run verify:goerli -- <DEPLOYED_ADDRESS> <INITIAL_SUPPLY>
   ```

---

## Project Structure

```
erc20-token/
├── contracts/        # Solidity contracts
│   └── MyToken.sol
├── scripts/          # Deployment scripts
│   └── deploy.js
├── test/             # Automated tests
│   └── MyToken.test.js
├── coverage/         # Coverage report output
├── gas-report.txt    # Gas usage report
├── hardhat.config.js
├── .solhint.json     # Lint rules
├── .prettierrc.js    # Prettier config
├── .env.example      # Environment variables template
├── package.json
└── README.md
```

---

## ERC20 Operation Flow

```text
1. Deploy Contract
   └─> Constructor: mint initialSupply to deployer (scaled by decimals)

2. User Interactions:
   a) mint(to, amount)
      ├─ Check onlyOwner
      │   ├─ Yes: _mint(to, amount * 10^decimals()) → Transfer(address(0) → to, scaledAmount)
      │   └─ No: revert "Ownable: caller is not the owner"

   b) transfer(to, amount)
      ├─ Check balance >= amount
      │   ├─ Yes: _transfer(from, to, amount) → Transfer(from → to, amount)
      │   └─ No: revert "ERC20: transfer amount exceeds balance"

   c) burn(amount)
      ├─ Check balance >= amount * decimals
      │   ├─ Yes: _burn(from, amount * 10^decimals()) → Transfer(from → address(0), scaledAmount)
      │   └─ No: revert "ERC20: burn amount exceeds balance"
```

---

## Troubleshooting

- **Network Unreachable**: Verify RPC URL and DNS resolution.  
- **Invalid Private Key**: Must be `0x` + 64 hex characters.  
- **Version Mismatch**: Align Solidity version in `hardhat.config.js` with contracts.

---

## Contributing

1. Fork it  
2. Create your feature branch  
3. Commit your changes  
4. Open a Pull Request  
5. Ensure CI passes

---

## License

MIT © Alex Ko
