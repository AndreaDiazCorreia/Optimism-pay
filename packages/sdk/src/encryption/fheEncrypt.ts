import { ethers } from "ethers";

// ABI for interacting with the encryption functionality of the smart contract
const CONTRACT_ABI = [
  "function encryptTransactionData(bytes calldata data) external view returns (bytes)",
];

// Contract addresses for the smart contracts handling encryption on supported networks
const CONTRACT_ADDRESSES: Record<string, string> = {
  optimism: "0xPrivacyContractAddressOnOptimism",
  base: "0xPrivacyContractAddressOnBase",
};

/**
 * Interacts with the smart contract to encrypt data.
 *
 * @param data The data to be encrypted (e.g., receiver, amount, chainId).
 * @param network The target network (e.g., optimism, base).
 * @param privateKey The private key to sign the transaction.
 * @returns The encrypted data as bytes.
 */
export async function encryptDataOnChain(
  data: any,
  network: string,
  privateKey: string
): Promise<string> {
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

    // Convert the data to bytes for encryption
    const dataBytes = ethers.utils.toUtf8Bytes(JSON.stringify(data));

    // Call the smart contract's encryption function
    console.log("Encrypting data on-chain...");
    const encryptedData = await contract.encryptTransactionData(dataBytes);

    console.log("Encrypted data:", encryptedData);
    return encryptedData;
  } catch (error) {
    console.error("Error encrypting data on-chain:", error);
    throw new Error("Failed to encrypt data on-chain.");
  }
}
