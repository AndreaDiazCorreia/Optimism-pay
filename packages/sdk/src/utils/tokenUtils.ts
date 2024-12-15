import axios from "axios";

// Mapping of supported networks to their respective token list APIs or contracts
const TOKEN_LIST_SOURCES: Record<string, string> = {
  optimism: "https://api.optimism.io/supported-tokens",
  base: "https://api.base.org/supported-tokens",
};

/**
 * Dynamically fetches the list of supported tokens for a given network.
 * If the API fails, it falls back to a predefined static list.
 *
 * @param network The target network (e.g., optimism, base).
 * @returns An array of supported token addresses.
 */
export async function fetchSupportedTokens(network: string): Promise<string[]> {
  console.log(`Fetching supported tokens for network: ${network}`);

  try {
    // Validate that the network is supported
    const apiUrl = TOKEN_LIST_SOURCES[network];
    if (!apiUrl) {
      throw new Error(`The network ${network} is not supported.`);
    }

    // Fetch the token list from the API
    const response = await axios.get(apiUrl);
    const tokenList = response.data.tokens; // Assume the API returns a "tokens" array

    if (!tokenList || !Array.isArray(tokenList)) {
      throw new Error("Invalid token list format in API response.");
    }

    console.log(`Supported tokens fetched for ${network}:`, tokenList);
    return tokenList;
  } catch (error) {
    console.error(`Error fetching supported tokens for ${network}:`, error);

    // Fallback to a predefined static list
    const fallbackTokens = ["0xUSDTAddress", "0xUSDCAddress", "0xDAIAddress"];
    console.warn(`Using fallback token list for ${network}:`, fallbackTokens);
    return fallbackTokens;
  }
}

/**
 * Validates whether a given token is supported on a specified network.
 *
 * @param token The token address to validate.
 * @param network The target network (e.g., optimism, base).
 * @returns True if the token is supported, otherwise false.
 */
export async function validateToken(
  token: string,
  network: string
): Promise<boolean> {
  try {
    const supportedTokens = await fetchSupportedTokens(network);
    const isValid = supportedTokens.includes(token);

    if (isValid) {
      console.log(`Token ${token} is supported on ${network}.`);
    } else {
      console.warn(`Token ${token} is not supported on ${network}.`);
    }

    return isValid;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
}
