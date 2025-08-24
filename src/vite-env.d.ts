/// <reference types="vite/client" />

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}

export {};
