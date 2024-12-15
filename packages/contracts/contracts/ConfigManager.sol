// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ConfigManager {
    address public admin;
    mapping(address => bool) public allowedTokens;
    mapping(uint256 => uint256) public gasFeeByNetwork; // Mapping for gas fees by network ID

    event TokenAllowed(address indexed token, bool allowed);
    event GasFeeUpdated(uint256 indexed networkId, uint256 newFee);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    constructor() {
        admin = msg.sender;
    }

    /**
     * @notice Allows the admin to set a token as allowed or not allowed.
     * @param token The address of the token.
     * @param allowed Whether the token is allowed.
     */
    function setToken(address token, bool allowed) external {
        require(msg.sender == admin, "Only admin can set tokens");
        allowedTokens[token] = allowed;
        emit TokenAllowed(token, allowed);
    }

    /**
     * @notice Updates the gas fee percentage for a specific network.
     * @param networkId The ID of the network (e.g., 1 for Ethereum, 10 for Optimism).
     * @param newFee The new gas fee percentage.
     */
    function updateGasFee(uint256 networkId, uint256 newFee) external {
        require(msg.sender == admin, "Only admin can update gas fee");
        gasFeeByNetwork[networkId] = newFee;
        emit GasFeeUpdated(networkId, newFee);
    }

    /**
     * @notice Checks if a token is allowed for use.
     * @param token The address of the token.
     * @return True if the token is allowed, false otherwise.
     */
    function isTokenAllowed(address token) external view returns (bool) {
        return allowedTokens[token];
    }

    /**
     * @notice Retrieves the gas fee percentage for a specific network.
     * @param networkId The ID of the network.
     * @return The gas fee percentage for the specified network.
     */
    function getGasFee(uint256 networkId) external view returns (uint256) {
        return gasFeeByNetwork[networkId];
    }

    /**
     * @notice Changes the admin of the contract.
     * @param newAdmin The address of the new admin.
     */
    function changeAdmin(address newAdmin) external {
        require(msg.sender == admin, "Only admin can change admin");
        require(newAdmin != address(0), "New admin cannot be the zero address");

        emit AdminChanged(admin, newAdmin);
        admin = newAdmin;
    }
}
