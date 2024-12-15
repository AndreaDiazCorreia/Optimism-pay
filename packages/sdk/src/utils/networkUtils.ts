import axios from "axios";

// Mapping of supported networks to their respective gas price APIs
const GAS_PRICE_APIS: Record<string, string> = {
  optimism: "https://api.optimism.io/gas-price",
  base: "https://api.base.org/gas-price",
};

/**
 * Fetches the current gas price for a given network using an external API.
 * If the API fails, it returns a default gas price as a fallback.
 *
 * @param network The target network (e.g., optimism, base).
 * @returns The gas price in Wei as a string.
 */
export async function getGasPrice(network: string): Promise<string> {
  console.log(`Fetching gas price for network: ${network}`);

  try {
    // Validate that the network is supported
    const apiUrl = GAS_PRICE_APIS[network];
    if (!apiUrl) {
      throw new Error(`The network ${network} is not supported.`);
    }

    // Fetch the gas price from the API
    const response = await axios.get(apiUrl);
    const gasPrice = response.data.gasPrice; // Assume API returns gas price in Wei

    if (!gasPrice) {
      throw new Error("Gas price not found in API response.");
    }

    console.log(`Gas price fetched for ${network}: ${gasPrice} Wei`);
    return gasPrice.toString();
  } catch (error) {
    console.error(`Error fetching gas price for ${network}:`, error);

    // Fallback to a default gas price if API call fails
    const defaultGasPrice = "1000000000"; // 1 GWei in Wei
    console.warn(
      `Using fallback gas price for ${network}: ${defaultGasPrice} Wei`
    );
    return defaultGasPrice;
  }
}
