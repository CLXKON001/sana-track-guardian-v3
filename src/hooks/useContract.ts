import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG, CONTRACT_ABI } from '../lib/contract-config';
import { useWallet } from './useWallet';

export interface Child {
  id: number;
  name: string;
  age: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'safe' | 'warning' | 'danger';
  lastSeen: string;
  battery: number;
  isOnline: boolean;
}

export function useContract() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize contract connection
  useEffect(() => {
    const initContract = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_CONFIG.address, CONTRACT_ABI, signer);
          
          setProvider(provider);
          setSigner(signer);
          setContract(contract);
          
          console.log('✅ Contract initialized:', CONTRACT_CONFIG.address);
        } catch (err) {
          console.error('❌ Failed to initialize contract:', err);
          setError('Failed to connect to blockchain');
        }
      } else {
        setError('MetaMask not detected');
      }
    };

    initContract();
  }, []);

  // Register a new child on the blockchain
  const registerChild = async (name: string, age: number, emergencyContact: string) => {
    if (!contract) throw new Error('Contract not initialized');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('📝 Registering child:', { name, age, emergencyContact });
      
      const tx = await contract.registerChild(name, age, emergencyContact);
      console.log('⏳ Transaction sent:', tx.hash);
      
      const receipt = await tx.wait();
      console.log('✅ Transaction confirmed:', receipt.hash);
      
      // Get the child ID from the event logs
      const event = receipt.logs.find((log: any) => {
        try {
          const parsedLog = contract.interface.parseLog(log);
          return parsedLog?.name === 'ChildRegistered';
        } catch {
          return false;
        }
      });
      
      let childId = null;
      if (event) {
        const parsedLog = contract.interface.parseLog(event);
        childId = parsedLog?.args[0];
      }
      
      setIsLoading(false);
      return { success: true, childId, transactionHash: receipt.hash };
    } catch (err: any) {
      console.error('❌ Failed to register child:', err);
      setIsLoading(false);
      setError(err.message || 'Failed to register child');
      return { success: false, error: err.message };
    }
  };

  // Update child location on blockchain
  const updateLocation = async (childId: number, latitude: number, longitude: number, zone: string) => {
    if (!contract) throw new Error('Contract not initialized');
    
    setIsLoading(true);
    setError(null);

    try {
      // Convert to blockchain format (multiply by 1e6 for precision)
      const lat = Math.round(latitude * 1e6);
      const lng = Math.round(longitude * 1e6);
      
      console.log('📍 Updating location:', { childId, lat, lng, zone });
      
      const tx = await contract.updateLocation(childId, lat, lng, zone);
      console.log('⏳ Location update transaction:', tx.hash);
      
      const receipt = await tx.wait();
      console.log('✅ Location updated:', receipt.hash);
      
      setIsLoading(false);
      return { success: true, transactionHash: receipt.hash };
    } catch (err: any) {
      console.error('❌ Failed to update location:', err);
      setIsLoading(false);
      setError(err.message || 'Failed to update location');
      return { success: false, error: err.message };
    }
  };

  // Get all children for the connected wallet
  const getChildrenForParent = async (parentAddress: string): Promise<Child[]> => {
    if (!contract) {
      console.log('⚠️ Contract not initialized');
      return [];
    }
    
    try {
      console.log('👨‍👩‍👧‍👦 Getting children for parent:', parentAddress);
      
      const childIds = await contract.getChildrenForParent(parentAddress);
      console.log('📋 Child IDs found:', childIds);
      
      const children: Child[] = [];
      
      for (const childId of childIds) {
        try {
          const childData = await contract.getChild(childId);
          console.log(`👧 Child ${childId} data:`, childData);
          
          // Try to get latest location
          let location = {
            lat: -33.918861, // Default Cape Town coordinates
            lng: 18.423300,
            address: "Location not updated"
          };
          
          try {
            const locationData = await contract.getLatestLocation(childId);
            location = {
              lat: Number(locationData.latitude) / 1e6, // Convert back from blockchain format
              lng: Number(locationData.longitude) / 1e6,
              address: locationData.zone || "Unknown location"
            };
            console.log(`📍 Location for child ${childId}:`, location);
          } catch (locErr) {
            console.log(`📍 No location data for child ${childId}`);
          }
          
          const child: Child = {
            id: Number(childData.id),
            name: childData.name,
            age: Number(childData.age),
            location,
            status: 'safe', // You can add logic to determine status based on location/time
            lastSeen: new Date().toLocaleTimeString(), // This would come from your IoT devices
            battery: Math.floor(Math.random() * 100), // This would come from your IoT devices
            isOnline: Math.random() > 0.3 // This would come from your IoT devices
          };
          
          children.push(child);
        } catch (err) {
          console.error(`❌ Failed to get child ${childId}:`, err);
        }
      }
      
      console.log('✅ All children loaded:', children);
      return children;
    } catch (err) {
      console.error('❌ Failed to get children:', err);
      return [];
    }
  };

  return {
    contract,
    provider,
    signer,
    isLoading,
    error,
    registerChild,
    updateLocation,
    getChildrenForParent,
    isConnected: !!contract,
    contractAddress: CONTRACT_CONFIG.address
  };
}