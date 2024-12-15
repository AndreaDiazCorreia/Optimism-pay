// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ConfigManager.sol";
import "@eth-optimism/contracts/libraries/bridge/IL2StandardBridge.sol";

contract OptimismPayBridge {
    address public admin;
    ConfigManager public configManager;
    address public l2StandardBridge;

    event TransferInitiated(
        address indexed sender,
        address indexed receiver,
        address token,
        uint256 amount,
        uint256 gasCost,
        uint256 destinationChainId
    );

    event CrossChainTransferInitiated(
        address indexed sender,
        address indexed receiver,
        address token,
        uint256 amount,
        uint256 destinationChainId
    );

    constructor(address _configManager, address _l2StandardBridge) {
        admin = msg.sender;
        configManager = ConfigManager(_configManager);
        l2StandardBridge = _l2StandardBridge;
    }

    function transfer(
        address token,
        uint256 amount,
        address receiver,
        uint256 destinationChainId
    ) external {
        require(amount > 0, "Amount must be greater than zero");
        require(receiver != address(0), "Invalid receiver address");
        require(
            configManager.isTokenAllowed(token),
            "Token not allowed for transfer"
        );

        uint256 gasCost = (configManager.gasFeePercentage() * amount) / 100;
        require(amount > gasCost, "Amount must cover gas cost");

        uint256 netAmount = amount - gasCost;

        // Transfer tokens to this contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Emit an event for local transfer
        emit TransferInitiated(
            msg.sender,
            receiver,
            token,
            netAmount,
            gasCost,
            destinationChainId
        );

        // Initiate cross-chain transfer
        _initiateCrossChainTransfer(
            token,
            netAmount,
            receiver,
            destinationChainId
        );
    }

    function _initiateCrossChainTransfer(
        address token,
        uint256 amount,
        address receiver,
        uint256 destinationChainId
    ) private {
        // Approve the bridge to spend tokens
        IERC20(token).approve(l2StandardBridge, amount);

        // Call the L2 Standard Bridge to initiate the transfer
        IL2StandardBridge(l2StandardBridge).depositERC20To(
            token,
            token,
            receiver,
            amount,
            destinationChainId,
            ""
        );

        emit CrossChainTransferInitiated(
            msg.sender,
            receiver,
            token,
            amount,
            destinationChainId
        );
    }

    function withdraw(address token, uint256 amount) external {
        require(msg.sender == admin, "Only admin can withdraw");
        IERC20(token).transfer(admin, amount);
    }
}
