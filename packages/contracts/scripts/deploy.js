const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ConfigManager
  const ConfigManager = await hre.ethers.getContractFactory("ConfigManager");
  const configManager = await ConfigManager.deploy();
  await configManager.deployed();
  console.log(`ConfigManager deployed to: ${configManager.address}`);

  // Deploy GasPaymaster
  const GasPaymaster = await hre.ethers.getContractFactory("GasPaymaster");
  const gasPaymaster = await GasPaymaster.deploy(configManager.address);
  await gasPaymaster.deployed();
  console.log(`GasPaymaster deployed to: ${gasPaymaster.address}`);

  // Deploy PrivacyLayer
  const PrivacyLayer = await hre.ethers.getContractFactory("PrivacyLayer");
  const privacyLayer = await PrivacyLayer.deploy();
  await privacyLayer.deployed();
  console.log(`PrivacyLayer deployed to: ${privacyLayer.address}`);

  // Deploy OptimismPayBridge
  const OptimismPayBridge =
    await hre.ethers.getContractFactory("OptimismPayBridge");
  const optimismPayBridge = await OptimismPayBridge.deploy(
    configManager.address,
    gasPaymaster.address,
    privacyLayer.address,
    "0x4200000000000000000000000000000000000010", // L2StandardBridge address (Sepolia or other network)
  );
  await optimismPayBridge.deployed();
  console.log(`OptimismPayBridge deployed to: ${optimismPayBridge.address}`);

  // Additional configuration (example: allow tokens, set gas fees)
  console.log("Configuring contracts...");

  // Example: Set a token as allowed in ConfigManager
  const tokenAddress = "0xYourTokenAddressHere"; // Replace with your token address
  await configManager.setToken(tokenAddress, true);
  console.log(`Token ${tokenAddress} allowed in ConfigManager`);

  // Example: Set gas fee for a network (Optimism network ID = 10)
  await configManager.updateGasFee(10, 1); // 1% fee
  console.log("Gas fee for network ID 10 set to 1%");

  console.log("All contracts deployed and configured successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
