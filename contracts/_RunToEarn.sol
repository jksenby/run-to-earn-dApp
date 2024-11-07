// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RunToEarnToken is ERC20, Ownable {
    mapping(address => bool) public registeredUsers;

    constructor() ERC20("RunToEarn", "RTE") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Register a new user
    function registerUser(address user) external onlyOwner {
        require(!registeredUsers[user], "User already registered");
        registeredUsers[user] = true;
    }

    // Check if a user is registered
    function isUserRegistered(address user) external view returns (bool) {
        return registeredUsers[user];
    }

    // Mint function for rewarding registered users
    function rewardUser(address user, uint256 amount) external onlyOwner {
        require(registeredUsers[user], "User not registered");
        _mint(user, amount);
    }
}
