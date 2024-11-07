require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // Use the Sepolia RPC URL
      accounts: [process.env.SEPOLIA_PRIVATE_KEY], // Use your wallet's private key
    },
  },
};
