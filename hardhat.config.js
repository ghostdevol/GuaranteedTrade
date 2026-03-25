require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    tests: "./test",
  },
  networks: {
    hardhat: {},
    testnet: {
      url: process.env.RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
