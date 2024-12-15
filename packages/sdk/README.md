# Optimism Pay SDK

The **Optimism Pay SDK** simplifies cross-chain token transfers within the Optimism Superchain ecosystem. This SDK provides developers with tools to interact securely with smart contracts, handle gasless transactions, and ensure privacy using **Fully Homomorphic Encryption (FHE)**.

Whether you’re building a dApp, wallet integration, or other blockchain-related applications, this SDK provides all the necessary utilities for seamless integration.

---

## **Features**

- 🚀 **Gasless Transfers**: Deduct gas fees directly from the transferred tokens, removing the need for native chain tokens.
- 🔒 **Privacy-Enhanced Transactions**: Secure data encryption using Zama’s Fully Homomorphic Encryption (FHE).
- 🔗 **Cross-Chain Compatibility**: Supports networks like **Optimism**, **Base**, and other Superchain chains.
- ⚙️ **Modular Design**: Easily integrate components like gas management, encryption, and token validation into any application.

---

## **Installation**

To add the SDK to your project, use npm, yarn, or pnpm:

```bash
# Using npm
npm install optimism-pay-sdk

# Using yarn
yarn add optimism-pay-sdk

# Using pnpm
pnpm add optimism-pay-sdk
```

---

## **Usage**

The following examples demonstrate key functionalities of the SDK.

### **1. Sending Private Transactions**

The SDK handles transaction encryption and submission to the blockchain:

```typescript
import { sendPrivateTransaction } from "optimism-pay-sdk/integrations/dAppAPI";

async function main() {
  const payload = {
    sender: "0xYourSenderAddress",
    receiver: "0xReceiverAddress",
    amount: "1.5", // Amount in token units
    token: "0xUSDCContractAddress", // Token contract address
    network: "optimism", // Target network
    privateKey: "0xYourPrivateKey", // User's private key
  };

  const result = await sendPrivateTransaction(payload);
  console.log("Transaction result:", result);
}

main();
```

---

### **2. Encrypting Data On-Chain**

Use the SDK to encrypt transaction data securely:

```typescript
import { encryptDataOnChain } from "optimism-pay-sdk/encryption/fheEncrypt";

async function main() {
  const data = { receiver: "0xReceiverAddress", amount: "100" };
  const encryptedData = await encryptDataOnChain(
    data,
    "optimism",
    "0xYourPrivateKey"
  );

  console.log("Encrypted Data:", encryptedData);
}

main();
```

---

### **3. Decrypting Encrypted Data**

Decrypt encrypted data using the SDK:

```typescript
import { decryptDataOnChain } from "optimism-pay-sdk/encryption/fheDecrypt";

async function main() {
  const encryptedData = "0xEncryptedHexData";
  const decryptedData = await decryptDataOnChain(
    encryptedData,
    "optimism",
    "0xYourPrivateKey"
  );

  console.log("Decrypted Data:", decryptedData);
}

main();
```

---

### **4. Validating Tokens**

Validate whether a token is supported on a given network:

```typescript
import { validateToken } from "optimism-pay-sdk/utils/tokenUtils";

async function main() {
  const token = "0xUSDCContractAddress";
  const network = "optimism";

  const isValid = await validateToken(token, network);
  console.log(`Is the token valid? ${isValid}`);
}

main();
```

---

## **API Reference**

### **Core Modules**

| Module                        | Description                                              |
|-------------------------------|----------------------------------------------------------|
| `bridge.ts`                   | Handles interactions with smart contracts for transfers. |
| `gasManager.ts`               | Fetches gas prices and prepares gas-related data.        |
| `privacyLayer.ts`             | Orchestrates data encryption and privacy functions.      |

### **Encryption Modules**

| Module                        | Description                                              |
|-------------------------------|----------------------------------------------------------|
| `fheEncrypt.ts`               | Encrypts transaction data using on-chain FHE.            |
| `fheDecrypt.ts`               | Decrypts on-chain encrypted data.                        |

### **Integration Modules**

| Module                        | Description                                              |
|-------------------------------|----------------------------------------------------------|
| `dAppAPI.ts`                  | High-level APIs for dApps to interact with the SDK.      |
| `walletAPI.ts`                | Simplifies wallet integrations like MetaMask.            |

### **Utilities**

| Module                        | Description                                              |
|-------------------------------|----------------------------------------------------------|
| `networkUtils.ts`             | Fetches gas prices dynamically from supported networks. |
| `tokenUtils.ts`               | Validates tokens against dynamic or static token lists.  |

---

## **Supported Networks**

| Network       | Status       | Gas API Source                       |
|---------------|--------------|--------------------------------------|
| **Optimism**  | Supported    | `https://api.optimism.io/gas-price`  |
| **Base**      | Supported    | `https://api.base.org/gas-price`     |

More networks can be added as needed.

---

## **Dependencies**

The SDK relies on the following dependencies:

- **`ethers`**: For interaction with smart contracts.
- **`axios`**: For real-time API calls (e.g., gas prices, token lists).
- **`typescript`**: For type-safe development.

---

## **Building the SDK**

To compile the SDK, run the following commands:

```bash
# Transpile TypeScript to JavaScript
npx tsc

# Run in watch mode
npx tsc --watch
```

The compiled files will be located in the `dist/` folder.

---

## **Testing**

Run unit tests using Jest:

```bash
npm run test
```

---

## **Contributing**

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Clone your fork and create a new branch.
3. Make your changes and ensure the code builds without errors.
4. Submit a pull request.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Contact**

For questions, issues, or contributions, reach out via:

- GitHub Issues: [Open an Issue](https://github.com/AndreaDiazCorreia/Optimism-pay/issues)


---

**Happy Building 🚀!**
