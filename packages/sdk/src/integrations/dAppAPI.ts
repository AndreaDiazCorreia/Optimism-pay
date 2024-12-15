import { encryptDataOnChain } from "../encryption/fheEncrypt";
import { decryptDataOnChain } from "../encryption/fheDecrypt";
import { sendTransaction } from "../core/bridge";

interface TransactionPayload {
  sender: string; // User's wallet address
  receiver: string; // Recipient's wallet address
  amount: string; // Amount to transfer (e.g., "1.5")
  token: string; // ERC-20 token address
  network: string; // Blockchain network (e.g., optimism, base)
  privateKey: string; // User's private key
}

/**
 * Encrypts data for use in private transactions.
 * @param data Data to be encrypted (e.g., transaction details).
 * @param network Blockchain network (e.g., optimism, base).
 * @param privateKey User's private key for signing encryption requests.
 * @returns Encrypted data as a hexadecimal string.
 */
export async function encryptTransactionData(
  data: any,
  network: string,
  privateKey: string
): Promise<string> {
  try {
    const encryptedData = await encryptDataOnChain(data, network, privateKey);
    console.log("Transaction data encrypted successfully:", encryptedData);
    return encryptedData;
  } catch (error) {
    console.error("Error encrypting transaction data:", error);
    throw error;
  }
}

/**
 * Decrypts data received from a private transaction.
 * @param encryptedData Encrypted transaction data.
 * @param network Blockchain network (e.g., optimism, base).
 * @param privateKey User's private key for signing decryption requests.
 * @returns Original data in its decrypted form.
 */
export async function decryptTransactionData(
  encryptedData: string,
  network: string,
  privateKey: string
): Promise<any> {
  try {
    const decryptedData = await decryptDataOnChain(
      encryptedData,
      network,
      privateKey
    );
    console.log("Transaction data decrypted successfully:", decryptedData);
    return decryptedData;
  } catch (error) {
    console.error("Error decrypting transaction data:", error);
    throw error;
  }
}

/**
 * Sends a private transaction on-chain with encrypted details.
 * @param payload Transaction payload including sender, receiver, amount, token, network, and privateKey.
 * @returns Transaction result, including status and transaction hash.
 */
export async function sendPrivateTransaction(
  payload: TransactionPayload
): Promise<{ status: string; transactionHash?: string; message?: string }> {
  try {
    // Encrypt transaction details
    const encryptedData = await encryptTransactionData(
      {
        receiver: payload.receiver,
        amount: payload.amount,
      },
      payload.network,
      payload.privateKey
    );

    console.log("Encrypted transaction data:", encryptedData);

    // Send the transaction
    const result = await sendTransaction({
      sender: payload.sender,
      receiver: payload.receiver,
      amount: payload.amount,
      token: payload.token,
      network: payload.network,
      privateKey: payload.privateKey,
    });

    console.log("Transaction sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending private transaction:", error);
    return {
      status: "error",
      message: error.message || "Unknown error occurred.",
    };
  }
}
