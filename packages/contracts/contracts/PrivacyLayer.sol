// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "fhevm/lib/TFHE.sol";
import "fhevm/config/ZamaFHEVMConfig.sol";
import "fhevm/gateway/GatewayCaller.sol";

/// @title PrivacyLayer
/// @notice A contract for securely encrypting and decrypting cross-chain transaction data using Fully Homomorphic Encryption (FHE)
contract PrivacyLayer is SepoliaZamaFHEVMConfig, GatewayCaller {
    // Encrypted state variable for storing sensitive transaction data
    ebytes public encryptedTransactionData;

    // Event emitted when transaction data is encrypted
    event TransactionDataEncrypted(ebytes encryptedData);

    // Event emitted when transaction data is decrypted
    event TransactionDataDecrypted(bytes decryptedData);

    /// @notice Encrypt transaction data
    /// @param data Encrypted data handle provided by the user
    /// @param inputProof Proof to validate the encrypted input
    function encryptTransactionData(
        einput data,
        bytes calldata inputProof
    ) external {
        // Convert the input to an encrypted bytes type
        encryptedTransactionData = TFHE.asEbytes(data, inputProof);

        // Allow the contract to use this encrypted data
        TFHE.allowThis(encryptedTransactionData);

        emit TransactionDataEncrypted(encryptedTransactionData);
    }

    /// @notice Request decryption of the transaction data
    /// @dev This would typically be used by the bridge or relay to process the transaction
    function requestTransactionDecryption() external {
        require(
            encryptedTransactionData.length > 0,
            "No encrypted data available"
        );

        // Create a decryption request using the Gateway
        uint256;
        ciphertexts[0] = TFHE.toUint256(encryptedTransactionData);

        uint256 requestID = Gateway.requestDecryption(
            ciphertexts,
            this.onDecryptedTransactionData.selector,
            0, // Priority fee for the request (can be adjusted)
            block.timestamp + 100, // Set a deadline of 100 seconds
            false // Non-trustless mode for simplicity
        );

        // Optionally store requestID for validation if needed
    }

    /// @notice Callback function to handle the decrypted transaction data
    /// @param requestID The ID of the decryption request
    /// @param decryptedData The decrypted plaintext transaction data
    function onDecryptedTransactionData(
        uint256 requestID,
        bytes memory decryptedData
    ) public onlyGateway {
        // Process the decrypted data (e.g., validate or execute the transaction)
        emit TransactionDataDecrypted(decryptedData);
    }

    /// @notice Retrieve the encrypted transaction data
    /// @return The encrypted transaction data stored in the contract
    function getEncryptedTransactionData() external view returns (ebytes) {
        return encryptedTransactionData;
    }
}
