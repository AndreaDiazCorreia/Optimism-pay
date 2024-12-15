// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IL2StandardBridge {
    function finalizeERC20Deposit(
        address l1Token,
        address l2Token,
        address from,
        address to,
        uint256 amount,
        bytes calldata data
    ) external;
}

contract OptimismPayReceiver is Ownable {
    address public l2StandardBridge;

    event TokensReceived(
        address indexed sender,
        address indexed receiver,
        address token,
        uint256 amount
    );

    constructor(address _l2StandardBridge) {
        l2StandardBridge = _l2StandardBridge;
    }

    function finalizeDeposit(
        address l1Token,
        address l2Token,
        address from,
        address to,
        uint256 amount,
        bytes calldata data
    ) external {
        require(msg.sender == l2StandardBridge, "Only bridge can call");
        require(amount > 0, "Amount must be greater than zero");
        require(to != address(0), "Invalid receiver address");

        // Mint or transfer tokens on the destination chain
        IERC20(l2Token).transfer(to, amount);

        emit TokensReceived(from, to, l2Token, amount);
    }

    // Withdraw tokens from the contract (for admin only)
    function withdraw(address token, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero");
        IERC20(token).transfer(owner(), amount);
    }
}
