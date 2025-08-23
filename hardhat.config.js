import "@nomicfoundation/hardhat-toolbox";
import { config } from 'dotenv';

// Load environment variables
config();

export default {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    blockdag_testnet: {
      url: process.env.BLOCKDAG_RPC_URL || "https://rpc-stage.devdomian123.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 24171,  // Updated to correct BlockDAG testnet Chain ID
      gasPrice: 20000000000,
      gas: 6000000,
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // Default Hardhat network
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
