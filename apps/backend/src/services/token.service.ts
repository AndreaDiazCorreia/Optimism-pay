export interface Token {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
}

class TokenService {
  private supportedTokens: Token[] = [
    {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000000",
    },
    {
      symbol: "OP",
      name: "Optimism",
      decimals: 18,
      address: "0x4200000000000000000000000000000000000042",
    },
  ];

  getSupportedTokens(): Token[] {
    return this.supportedTokens;
  }
}

export const tokenService = new TokenService();
