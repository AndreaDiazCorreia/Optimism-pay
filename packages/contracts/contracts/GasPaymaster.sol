// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GasPaymaster {
    address public admin;

    event GasCostCalculated(address indexed token, uint256 gasCost);

    constructor() {
        admin = msg.sender;
    }

    function calculateGasCost(
        address token,
        uint256 amount
    ) external pure returns (uint256) {
        // Example: Deduct 0.5% of the transfer amount as gas
        return (amount * 5) / 1000;
    }

    function deductGas(address token, address payer, uint256 gasCost) external {
        require(gasCost > 0, "Gas cost must be greater than zero");

        // Deduct gas from the payer's token balance
        IERC20(token).transferFrom(payer, address(this), gasCost);

        emit GasCostCalculated(token, gasCost);
    }

    function withdraw(address token, uint256 amount) external {
        require(msg.sender == admin, "Only admin can withdraw");
        IERC20(token).transfer(admin, amount);
    }
}
