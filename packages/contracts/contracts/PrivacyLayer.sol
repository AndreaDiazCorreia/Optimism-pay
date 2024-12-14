// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "fhevm/lib/TFHE.sol";
import "fhevm/config/ZamaFHEVMConfig.sol";
import "fhevm/gateway/GatewayCaller.sol";

/// @title PrivacyLayer
/// @notice A contract for securely encrypting and decrypting data using Fully Homomorphic Encryption (FHE)
contract PrivacyLayer is SepoliaZamaFHEVMConfig, GatewayCaller {
    // Encrypted state variable for storing sensitive data
    ebytes public encryptedData;

    // Event emitted when data is encrypted
    event DataEncrypted(ebytes encryptedData);

    // Event emitted when data is decrypted
    event DataDecrypted(bytes decryptedData);

    /// @notice Store encrypted data in the contract
    /// @param data Encrypted data handle provided by the user
    /// @param inputProof Proof to validate the encrypted input
    function storeEncryptedData(
        einput data,
        bytes calldata inputProof
    ) external {
        // Convert the input to an encrypted bytes type
        encryptedData = TFHE.asEbytes(data, inputProof);

        // Allow the contract to use this encrypted data
        TFHE.allowThis(encryptedData);

        emit DataEncrypted(encryptedData);
    }

    /// @notice Request decryption of the stored encrypted data
    function requestDecryption() external {
        // Create a decryption request using the Gateway
        uint256;
        ciphertexts[0] = TFHE.toUint256(encryptedData);

        uint256 requestID = Gateway.requestDecryption(
            ciphertexts,
            this.onDecryptedData.selector,
            0,
            block.timestamp + 100, // Set a deadline of 100 seconds
            false // Non-trustless mode for simplicity
        );

        // Optionally store requestID if needed for validation
    }

    /// @notice Callback function to handle the decrypted data
    /// @param requestID The ID of the decryption request
    /// @param decryptedData The decrypted plaintext data
    function onDecryptedData(
        uint256 requestID,
        bytes memory decryptedData
    ) public onlyGateway {
        emit DataDecrypted(decryptedData);
    }

    /// @notice Retrieve the encrypted data
    /// @return The encrypted data stored in the contract
    function getEncryptedData() external view returns (ebytes) {
        return encryptedData;
    }
}
