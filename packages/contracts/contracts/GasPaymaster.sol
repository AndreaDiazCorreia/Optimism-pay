// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ConfigManager.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract GasPaymaster {
    address public admin;
    ConfigManager public configManager;
    AggregatorV3Interface public priceFeed; // Chainlink price feed for token to USD conversion
    uint256 public gasLimit; // Estimated gas limit for transactions

    event GasCostCalculated(address indexed token, uint256 gasCost);
    event GasDeducted(
        address indexed payer,
        address indexed token,
        uint256 gasCost
    );

    constructor(address _configManager, address _priceFeed, uint256 _gasLimit) {
        admin = msg.sender;
        configManager = ConfigManager(_configManager);
        priceFeed = AggregatorV3Interface(_priceFeed);
        gasLimit = _gasLimit;
    }

    /**
     * @notice Updates the estimated gas limit.
     * @param _gasLimit The new gas limit to be used.
     */
    function setGasLimit(uint256 _gasLimit) external {
        require(msg.sender == admin, "Only admin can update gas limit");
        gasLimit = _gasLimit;
    }

    /**
     * @notice Calculates the gas cost in terms of the token being transferred.
     * @param token The token used for gas payment.
     * @return gasCost The gas cost in the specified token.
     */
    function calculateGasCost(address token) public view returns (uint256) {
        require(
            configManager.isTokenAllowed(token),
            "Token not allowed for gas payment"
        );

        // Get the gas price from the network
        uint256 gasPrice = tx.gasprice; // This provides the current gas price (wei/gas)

        // Get the token price in USD from the Chainlink oracle
        (, int256 price, , , ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price feed data");

        uint256 tokenPriceInUSD = uint256(price); // Price in USD (e.g., 8 decimals precision)

        // Calculate the total gas cost in USD
        uint256 gasCostInUSD = (gasPrice * gasLimit) / 1e18; // Gas cost in ETH terms, scaled to 1 USD

        // Calculate the equivalent gas cost in the specified token
        uint256 tokenDecimals = IERC20(token).decimals();
        uint256 gasCost = (gasCostInUSD * (10 ** tokenDecimals)) /
            tokenPriceInUSD;

        require(gasCost > 0, "Calculated gas cost is too low");

        emit GasCostCalculated(token, gasCost);
        return gasCost;
    }

    /**
     * @notice Deducts gas from the payer's token balance.
     * @param token The token used for gas payment.
     * @param payer The address paying the gas fee.
     * @return netAmount The remaining amount after deducting gas cost.
     */
    function deductGas(
        address token,
        address payer,
        uint256 amount
    ) external returns (uint256 netAmount) {
        uint256 gasCost = calculateGasCost(token);
        require(amount > gasCost, "Amount must cover gas cost");

        // Deduct gas cost
        IERC20(token).transferFrom(payer, address(this), gasCost);

        netAmount = amount - gasCost;

        emit GasDeducted(payer, token, gasCost);
        return netAmount;
    }

    /**
     * @notice Allows the admin to withdraw tokens from the contract.
     * @param token The token to withdraw.
     * @param amount The amount to withdraw.
     */
    function withdraw(address token, uint256 amount) external {
        require(msg.sender == admin, "Only admin can withdraw");
        require(amount > 0, "Amount must be greater than zero");

        IERC20(token).transfer(admin, amount);
    }
}
