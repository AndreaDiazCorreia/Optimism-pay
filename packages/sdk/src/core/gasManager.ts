import { getGasPrice } from "../utils/networkUtils";

/**
 * Fetches and returns the current gas price for the specified network.
 * While the smart contract handles detailed fee calculations,
 * this function provides gas price data for transparency or debugging purposes.
 *
 * @param network The target network (e.g., optimism, base).
 * @returns The current gas price in Wei.
 */
export async function fetchGasPrice(network: string): Promise<string> {
  try {
    const gasPrice = await getGasPrice(network);
    console.log(`Gas price for ${network}: ${gasPrice} Wei`);
    return gasPrice;
  } catch (error) {
    console.error(`Error fetching gas price for ${network}:`, error);
    throw new Error("Unable to fetch gas price.");
  }
}

/**
 * Prepares gas-related information to include in a transaction.
 * Delegates detailed fee calculation and deductions to the smart contract.
 *
 * @param network The target network (e.g., optimism, base).
 * @returns An object containing gasPrice and an optional gasLimit.
 */
export async function prepareGasData(network: string): Promise<{
  gasPrice: string;
  gasLimit?: number;
}> {
  try {
    const gasPrice = await fetchGasPrice(network);

    // Define a default gas limit (can be overridden by the contract logic)
    const defaultGasLimit = 100000;

    return {
      gasPrice,
      gasLimit: defaultGasLimit, // Optional: adjust based on specific needs
    };
  } catch (error) {
    console.error(`Error preparing gas data for ${network}:`, error);
    throw new Error("Unable to prepare gas data.");
  }
}
