import { ethers } from "ethers";

// Define the transaction type to validate input parameters
interface Transaction {
  sender: string; // Sender's address
  receiver: string; // Receiver's address
  amount: string; // Amount to transfer (as string for BigNumber compatibility)
  token: string; // ERC-20 token address
  network: string; // Target network (e.g., optimism, base)
  privateKey: string; // Sender's private key for signing the transaction
}

// Contract addresses for OptimismPayBridge on supported networks
const CONTRACT_ADDRESSES: Record<string, string> = {
  optimism: "0xContractAddressOnOptimism",
  base: "0xContractAddressOnBase",
};

// Minimal ABI required to interact with the contract
const CONTRACT_ABI = [
  "function transferWithGas(address receiver, uint256 amount, address token) external",
];

/**
 * Sends a transaction using the OptimismPayBridge contract.
 * @param tx Transaction details including sender, receiver, amount, token, network, and private key.
 * @returns A success or error response including the transaction hash.
 */
export async function sendTransaction(tx: Transaction) {
  try {
    // Basic input validation
    if (!tx.sender || !tx.receiver || !tx.amount || !tx.token || !tx.network) {
      throw new Error("Insufficient parameters to execute the transaction.");
    }

    // Retrieve the contract address for the specified network
    const contractAddress = CONTRACT_ADDRESSES[tx.network];
    if (!contractAddress) {
      throw new Error(`The network ${tx.network} is not supported.`);
    }

    // Connect to the network's RPC node
    const provider = new ethers.providers.JsonRpcProvider(
      `https://${tx.network}.infura.io/v3/YOUR_INFURA_PROJECT_ID`
    );
    const wallet = new ethers.Wallet(tx.privateKey, provider);

    // Create an instance of the OptimismPayBridge contract
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, wallet);

    // Convert the amount to a BigNumber format compatible with the contract
    const amountInWei = ethers.utils.parseUnits(tx.amount, 18);

    // Execute the `transferWithGas` function on the contract
    console.log("Executing the transfer...");
    const transaction = await contract.transferWithGas(
      tx.receiver,
      amountInWei,
      tx.token
    );

    // Wait for the transaction confirmation
    console.log("Waiting for confirmation...");
    const receipt = await transaction.wait();

    // Return the transaction hash and success status
    return {
      status: "success",
      transactionHash: receipt.transactionHash,
    };
  } catch (error) {
    console.error("Error while sending the transaction:", error);
    return {
      status: "error",
      message: error.message || "Unknown error",
    };
  }
}
