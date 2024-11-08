require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/c1762497ab2147e1b4f60f74da1482ac", // Use the Sepolia RPC URL
      accounts: [
        "aafad24297b3e561e1102c7246db00578d27b8faed522fbd6bad2107e45cdf06",
      ], // Use your wallet's private key
    },
  },
};
