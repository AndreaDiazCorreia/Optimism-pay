# OptimismPay: Crypto Pay Master

## Introduction

**OptimismPay** is a revolutionary SDK that enables seamless cross-chain transactions by deducting gas fees directly from the token being transferred. This eliminates the need for users to hold native tokens for gas, simplifying the blockchain experience while ensuring privacy and interoperability across Optimism’s Superchain ecosystem.

---

## Key Features

1. **Gasless Experience:** Gas fees are dynamically calculated and deducted from the token being transferred, eliminating the need to hold multiple tokens for gas.
2. **Cross-Chain Interoperability:** Built on the **OP Stack**, enabling seamless token transfers across Optimism-compatible chains.
3. **Enhanced Privacy:** Utilizes Fully Homomorphic Encryption (FHE) to encrypt sensitive transaction data, such as amounts and addresses.
4. **Developer-Friendly SDK:** Modular design ensures easy integration with wallets, dApps, and exchanges.
5. **Demo Wallet:** Showcases SDK functionality through a decentralized wallet interface similar to MetaMask.

---

## Problem Statement

Transacting on multiple blockchain networks often requires native tokens to pay for gas, creating barriers for:

- **New Users:** Confusion and frustration due to insufficient gas tokens.
- **Accessibility:** Limited on-ramps for acquiring native tokens in certain regions.
- **Fragmentation:** Unused native tokens accumulating across different networks.

**OptimismPay** solves this by enabling frictionless transactions using a single token.

---

## How It Works

1. **Gas Calculation and Deduction:**
   - The SDK calculates the required gas in the origin network.
   - Deducts the gas fee directly from the token being sent.

2. **Cross-Chain Transfers:**
   - Utilizes the **L2StandardBridgeInterop** to facilitate smooth cross-chain token transfers.

3. **Privacy Layer:**
   - FHE ensures that transaction details are encrypted and visible only to the parties involved.

4. **Modular Integration:**
   - SDK designed to integrate seamlessly with existing wallets and dApps.

---

## Project Structure

```plaintext
📦 optimismpay-monorepo
├── 📁 apps
│   ├── 📁 frontend       # Frontend demo application (Next.js)
│   ├── 📁 backend        # Backend service (Node.js with Express)
├── 📁 packages
│   ├── 📁 contracts      # Smart contracts (Hardhat)
│   ├── 📁 shared         # Shared utilities and modules
├── turbo.json            # TurboRepo configuration
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── package.json          # Global dependencies and scripts
```

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repo/optimismpay.git
   cd optimismpay
   ```

2. **Install Dependencies:**

   ```bash
   pnpm install
   ```

3. **Run Development Environment:**

   ```bash
   pnpm dev
   ```

---

## Demo Features

1. **Frontend:**
   - Built with Next.js, showcasing how users can perform cross-chain transfers using the SDK.

2. **Backend:**
   - Node.js service managing requests, encryption, and transaction handling.

3. **Smart Contracts:**
   - Written in Solidity, deployed on Optimism Goerli testnet.

---

## Scripts

- **Development:**
  ```bash
  pnpm dev
  ```
  Runs all applications and services in development mode.

- **Build:**
  ```bash
  pnpm build
  ```
  Builds all applications and packages.

- **Test:**
  ```bash
  pnpm test
  ```
  Runs test cases for all packages.

---

## Deployment

1. **Frontend:**
   Deploy using platforms like Vercel or Netlify.

2. **Backend:**
   Deploy on Heroku, AWS, or any Node.js-compatible service.

3. **Smart Contracts:**
   Deploy to Optimism-compatible networks using Hardhat:

   ```bash
   npx hardhat run scripts/deploy.js --network optimismGoerli
   ```

---

## Contribution

We welcome contributions from the community! Feel free to:

- Open issues for bugs or feature requests.
- Submit pull requests to enhance the project.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch for your feature:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes and push:

   ```bash
   git commit -m "Add feature-name"
   git push origin feature-name
   ```

4. Open a pull request on GitHub.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgments

This project was developed for the **Aleph de Verano Hackathon 2024** and aligns with the principles of the **Optimism Superchain** to improve blockchain usability and accessibility.
