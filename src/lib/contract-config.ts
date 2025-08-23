// Smart Contract Configuration for SanaTrack
export const CONTRACT_CONFIG = {
  // Replace with your deployed contract address from Hardhat deployment
  address: process.env.VITE_CONTRACT_ADDRESS || "0xYOUR_DEPLOYED_CONTRACT_ADDRESS_HERE",
  
  // BlockDAG Testnet Configuration
  rpcUrl: process.env.VITE_BLOCKCHAIN_RPC_URL || "https://testnet-rpc.blockdag.network",
  chainId: parseInt(process.env.VITE_CHAIN_ID || "12345"),
  chainIdHex: process.env.VITE_CHAIN_ID_HEX || "0x3039",
  chainName: "BlockDAG Testnet",
  nativeCurrency: {
    name: "BDAG",
    symbol: "BDAG", 
    decimals: 18
  }
};

// Smart Contract ABI - This comes from your compiled Hardhat contract
export const CONTRACT_ABI = [
  // Register Child Function
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "uint256", "name": "_age", "type": "uint256"},
      {"internalType": "string", "name": "_emergencyContact", "type": "string"}
    ],
    "name": "registerChild",
    "outputs": [{"internalType": "uint256", "name": "childId", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  
  // Update Location Function
  {
    "inputs": [
      {"internalType": "uint256", "name": "_childId", "type": "uint256"},
      {"internalType": "int256", "name": "_latitude", "type": "int256"},
      {"internalType": "int256", "name": "_longitude", "type": "int256"},
      {"internalType": "string", "name": "_zone", "type": "string"}
    ],
    "name": "updateLocation",
    "outputs": [],
    "stateMutability": "nonpayable", 
    "type": "function"
  },
  
  // Get Child Function
  {
    "inputs": [{"internalType": "uint256", "name": "_childId", "type": "uint256"}],
    "name": "getChild",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "uint256", "name": "age", "type": "uint256"},
      {"internalType": "string", "name": "emergencyContact", "type": "string"},
      {"internalType": "address", "name": "primaryParent", "type": "address"},
      {"internalType": "uint256", "name": "registeredAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  
  // Get Children for Parent Function
  {
    "inputs": [{"internalType": "address", "name": "_parent", "type": "address"}],
    "name": "getChildrenForParent", 
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  
  // Get Latest Location Function
  {
    "inputs": [{"internalType": "uint256", "name": "_childId", "type": "uint256"}],
    "name": "getLatestLocation",
    "outputs": [
      {"internalType": "int256", "name": "latitude", "type": "int256"},
      {"internalType": "int256", "name": "longitude", "type": "int256"},
      {"internalType": "string", "name": "zone", "type": "string"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "bool", "name": "isEmergency", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  
  // Events
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "childId", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"},
      {"indexed": true, "internalType": "address", "name": "parent", "type": "address"}
    ],
    "name": "ChildRegistered",
    "type": "event"
  },
  
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "childId", "type": "uint256"},
      {"indexed": false, "internalType": "int256", "name": "latitude", "type": "int256"},
      {"indexed": false, "internalType": "int256", "name": "longitude", "type": "int256"},
      {"indexed": false, "internalType": "string", "name": "zone", "type": "string"}
    ],
    "name": "LocationUpdated",
    "type": "event"
  }
];