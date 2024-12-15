import { ethers } from "ethers";

// ABI for interacting with the decryption functionality of the smart contract
const CONTRACT_ABI = [
  "function decryptTransactionData(bytes calldata encryptedData) external view returns (bytes)",
];

// Contract addresses for the smart contracts handling encryption/decryption on supported networks
const CONTRACT_ADDRESSES: Record<string, string> = {
  optimism: "0xPrivacyContractAddressOnOptimism",
  base: "0xPrivacyContractAddressOnBase",
};

/**
 * Interacts with the smart contract to decrypt encrypted data.
 *
 * @param encryptedData The encrypted data as a hexadecimal string or byte array.
 * @param network The target network (e.g., optimism, base).
 * @param privateKey The private key to sign the transaction.
 * @returns The decrypted data in its original form.
 */
export async function decryptDataOnChain(
  encryptedData: string,
  network: string,
  privateKey: string
): Promise<any> {
  try {
    // Connect to the specified network
    const provider = new ethers.providers.JsonRpcProvider(
      `https://${network}.infura.io/v3/YOUR_INFURA_PROJECT_ID`
    );
    const wallet = new ethers.Wallet(privateKey, provider);

    // Get the smart contract address
    const contractAddress = CONTRACT_ADDRESSES[network];
    if (!contractAddress) {
      throw new Error(`The network ${network} is not supported.`);
    }

    // Initialize the contract
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, wallet);

    // Call the smart contract's decryption function
    console.log("Decrypting data on-chain...");
    const decryptedBytes = await contract.decryptTransactionData(encryptedData);

    // Convert the decrypted bytes to a human-readable format
    const decryptedData = JSON.parse(ethers.utils.toUtf8String(decryptedBytes));

    console.log("Decrypted data:", decryptedData);
    return decryptedData;
  } catch (error) {
    console.error("Error decrypting data on-chain:", error);
    throw new Error("Failed to decrypt data on-chain.");
  }
}
