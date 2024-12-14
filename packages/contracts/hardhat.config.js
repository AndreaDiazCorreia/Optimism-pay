/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    optimismGoerli: {
      url: "https://goerli.optimism.io",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
