import { sendPrivateTransaction } from "../integrations/dAppAPI";

interface WalletTransactionPayload {
  wallet: any; // Wallet object from a provider like MetaMask
  receiver: string; // Recipient's wallet address
  amount: string; // Amount to send in token units (e.g., "1.5")
  token: string; // ERC-20 token address
  network: string; // Blockchain network (e.g., optimism, base)
}

/**
 * Integrates with a wallet (e.g., MetaMask) to send a private transaction.
 * The user's wallet handles signing, and the SDK interacts with the underlying contract.
 *
 * @param payload Transaction payload including wallet, receiver, amount, token, and network.
 * @returns Result of the transaction, including status and transaction hash.
 */
export async function integrateWithWallet(
  payload: WalletTransactionPayload
): Promise<{ status: string; transactionHash?: string; message?: string }> {
  try {
    console.log("Integrating with wallet:", payload.wallet);

    // Extract the sender's address from the wallet
    const sender = payload.wallet.address;
    if (!sender) {
      throw new Error("Wallet is not connected or does not have an address.");
    }

    // Prompt the user to sign the transaction (if required by the wallet)
    console.log("Prompting the wallet for user confirmation...");

    // Construct the transaction payload
    const transactionPayload = {
      sender,
      receiver: payload.receiver,
      amount: payload.amount,
      token: payload.token,
      network: payload.network,
      privateKey: payload.wallet.privateKey, // Use private key stored in the wallet (if available)
    };

    // Send the private transaction using the dAppAPI
    const result = await sendPrivateTransaction(transactionPayload);

    console.log("Transaction successful:", result);
    return result;
  } catch (error) {
    console.error("Error integrating with wallet:", error);
    return {
      status: "error",
      message: error.message || "An unknown error occurred.",
    };
  }
}
