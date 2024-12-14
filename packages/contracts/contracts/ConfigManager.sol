// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ConfigManager {
    address public admin;
    mapping(address => bool) public allowedTokens;

    event TokenAllowed(address token, bool allowed);
    event GasFeeUpdated(uint256 newFee);

    uint256 public gasFeePercentage = 1; // Default 1%

    constructor() {
        admin = msg.sender;
    }

    function setToken(address token, bool allowed) external {
        require(msg.sender == admin, "Only admin can set tokens");
        allowedTokens[token] = allowed;
        emit TokenAllowed(token, allowed);
    }

    function updateGasFee(uint256 newFee) external {
        require(msg.sender == admin, "Only admin can update gas fee");
        gasFeePercentage = newFee;
        emit GasFeeUpdated(newFee);
    }

    function isTokenAllowed(address token) external view returns (bool) {
        return allowedTokens[token];
    }
}
