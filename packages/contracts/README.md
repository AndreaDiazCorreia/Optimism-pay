## **Overview**

This system of contracts is designed to enable secure, private, and seamless cross-chain token transfers within the Optimism Superchain ecosystem. It integrates cutting-edge technologies like **Fully Homomorphic Encryption (FHE)** via Zama and leverages Optimism's **L2StandardBridge** for interoperability.

Key features include:
- **Cross-chain compatibility** across networks like Optimism Goerli, Sepolia, and Base Goerli.
- **Privacy** via Zama's Fully Homomorphic Encryption (FHEVM).
- **Gasless experience** for users by deducting gas fees from the transferred token.
- **Modular and scalable architecture** for ease of integration and extensibility.

---

## **Contracts and Integrations**

### 1. **OptimismPayBridge.sol**
This is the primary contract for managing cross-chain transfers. It serves as the orchestrator, interacting with other contracts and tools to execute secure and private transactions.

**Key Features:**
- **Cross-Chain Transfers:** Uses Optimism's `L2StandardBridge` to initiate token transfers across networks.
- **Integrated Gas Management:** Leverages `GasPaymaster` to calculate and deduct gas fees from the user's token balance.
- **Privacy-Preserving Transactions:** Encrypts transaction details using the `PrivacyLayer`.

**Integration Highlights:**
- **L2StandardBridge:** A standard bridge interface for transferring ERC-20 tokens across chains.
- **PrivacyLayer:** Handles encryption and decryption of transaction data, ensuring sensitive information is protected during transfers.

---

### 2. **GasPaymaster.sol**
This contract is responsible for calculating and deducting gas fees in terms of the token being transferred. It eliminates the need for users to hold native chain tokens to pay gas fees.

**Key Features:**
- Calculates gas fees dynamically based on network conditions.
- Deducts fees directly from the sender's token balance.
- Configured to work seamlessly with multiple networks.

**Integration Highlights:**
- Uses data from `ConfigManager` for token validation and network-specific gas fee percentages.

---

### 3. **ConfigManager.sol**
Acts as the configuration hub for the system, managing allowed tokens and network-specific gas fees.

**Key Features:**
- Maintains a whitelist of tokens allowed for transfers.
- Sets and updates gas fee percentages for different networks.
- Provides global configurations accessible to other contracts.

**Integration Highlights:**
- Directly referenced by `GasPaymaster` and `OptimismPayBridge` for configuration data.

---

### 4. **PrivacyLayer.sol**
This contract integrates Zama's Fully Homomorphic Encryption (FHE) technology to provide privacy for cross-chain transactions.

**Key Features:**
- Encrypts sensitive transaction data (e.g., receiver address, amount, destination chain ID) before initiating a transfer.
- Decrypts the data on the destination chain to execute the transaction securely.
- Emits events for encrypted and decrypted data for auditability.

**Integration Highlights:**
- **Zama FHEVM:** Uses Zama's library to manage encrypted data securely.
- **GatewayCaller:** Handles decryption requests via Zama's gateway.

**Why Zama?**
Zama's FHEVM enables computations on encrypted data without needing to decrypt it, ensuring sensitive information is never exposed, even during processing. This is crucial for maintaining privacy in cross-chain operations.

---

## **How the System Works**

1. **Initiating a Transfer:**
   - A user calls `transferWithPrivacy` on `OptimismPayBridge`.
   - `PrivacyLayer` encrypts the transaction details (receiver, amount, destination chain).
   - `GasPaymaster` calculates and deducts the gas fee from the transferred token balance.

2. **Cross-Chain Messaging:**
   - The `OptimismPayBridge` sends the encrypted transaction data to the destination chain using `L2StandardBridge`.

3. **Decryption and Finalization:**
   - On the destination chain, `PrivacyLayer` decrypts the transaction data.
   - The tokens are released to the receiver, ensuring privacy throughout the process.

---

## **Integration with Zama FHEVM**

The `PrivacyLayer` contract directly integrates Zama's libraries to handle encrypted data:

- **Encryption:**
  - Converts transaction data into an encrypted format (`ebytes`) using `TFHE.asEbytes`.
  - Stores the encrypted data securely on-chain.

- **Decryption:**
  - Sends decryption requests to Zama's `Gateway` via `requestTransactionDecryption`.
  - Processes the decrypted data in the destination chain for finalization.

**Key Functions:**
- `encryptTransactionData`: Encrypts and stores sensitive data on-chain.
- `requestTransactionDecryption`: Requests decryption of stored encrypted data.
- `onDecryptedTransactionData`: Callback function to process decrypted data securely.

**Why FHE?**
FHE ensures that all computations are performed on encrypted data, preventing any potential exposure of sensitive information at any point.

---

## **System Dependencies**

- **Zama FHEVM:** For encryption and decryption of transaction data.
- **L2StandardBridge:** For cross-chain ERC-20 token transfers within the Optimism ecosystem.
- **Chainlink Oracles (Optional):** To fetch real-time gas prices for dynamic fee calculations.

---

## **Contract Deployment Instructions**

### Prerequisites
- A funded wallet with testnet tokens for gas fees.
- RPC URLs for Sepolia, Optimism Goerli, and Base Goerli.
- Access to the Zama FHEVM and Gateway.

### Steps
1. Deploy `ConfigManager`:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

2. Deploy `GasPaymaster`:
   ```bash
   npx hardhat run scripts/deploy.js --network optimismGoerli
   ```

3. Deploy `PrivacyLayer`:
   ```bash
   npx hardhat run scripts/deploy.js --network baseGoerli
   ```

4. Deploy `OptimismPayBridge`:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

### Post-Deployment Configuration
- **Allow tokens in ConfigManager**:
   ```javascript
   await configManager.setToken("0xYourTokenAddress", true);
   ```

- **Set gas fee percentages**:
   ```javascript
   await configManager.updateGasFee(10, 1); // 1% for Optimism Goerli
   ```

---

## **Security Considerations**

1. **Private Key Management:**
   - Store private keys securely and use environment variables (`.env`) to handle them.

2. **Audits:**
   - Regularly audit contracts for vulnerabilities, especially those interacting with Zama FHEVM and L2StandardBridge.

3. **Testnets Only:**
   - Deploy on testnets like Sepolia or Optimism Goerli before moving to mainnet.

---

## **Future Enhancements**
- Extend privacy features with zk-SNARKs for more complex use cases.
- Add support for additional chains in the Superchain ecosystem.
- Introduce modular SDKs for easy frontend integration.

---

For further questions or contributions, feel free to open an issue or contact the development team. 🚀
