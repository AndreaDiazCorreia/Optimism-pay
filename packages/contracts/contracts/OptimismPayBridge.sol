// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OptimismPayBridge {
    address public admin;

    event TransferInitiated(
        address indexed sender,
        address indexed receiver,
        address token,
        uint256 amount,
        uint256 gasCost,
        uint256 destinationChainId
    );

    constructor() {
        admin = msg.sender;
    }

    function transfer(
        address token,
        uint256 amount,
        address receiver,
        uint256 destinationChainId
    ) external {
        require(amount > 0, "Amount must be greater than zero");
        require(receiver != address(0), "Invalid receiver address");

        // Calculate gas cost
        uint256 gasCost = calculateGasCost(token);
        require(amount > gasCost, "Amount must cover gas cost");

        uint256 netAmount = amount - gasCost;

        // Transfer token from sender to this contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Emit event to simulate cross-chain messaging
        emit TransferInitiated(
            msg.sender,
            receiver,
            token,
            netAmount,
            gasCost,
            destinationChainId
        );
    }

    function calculateGasCost(address token) public view returns (uint256) {
        // Simulate gas calculation logic, configurable by the admin
        // Example: fixed 1% fee
        return IERC20(token).balanceOf(address(this)) / 100;
    }

    function withdraw(address token, uint256 amount) external {
        require(msg.sender == admin, "Only admin can withdraw");
        IERC20(token).transfer(admin, amount);
    }
}
