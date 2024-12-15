/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    optimismGoerli: {
      url: process.env.OPTIMISM_GOERLI_URL || "https://goerli.optimism.io",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    sepolia: {
      url:
        process.env.SEPOLIA_URL ||
        "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    baseGoerli: {
      url: process.env.BASE_GOERLI_URL || "https://goerli.base.org",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // Opcional, si deseas verificar contratos automáticamente
  },
};
