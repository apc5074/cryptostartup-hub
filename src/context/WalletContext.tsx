
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { useToast } from "@/components/ui/use-toast";

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if wallet was previously connected
    const checkConnection = async () => {
      const savedAddress = localStorage.getItem('walletAddress');
      if (savedAddress && window.ethereum) {
        try {
          // Get connected accounts
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0 && accounts[0].toLowerCase() === savedAddress.toLowerCase()) {
            setAddress(accounts[0]);
            setIsConnected(true);
          } else {
            localStorage.removeItem('walletAddress');
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error);
          localStorage.removeItem('walletAddress');
        }
      }
    };
    
    checkConnection();
  }, []);

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setAddress(null);
          setIsConnected(false);
          localStorage.removeItem('walletAddress');
        } else if (accounts[0] !== address) {
          // Account changed
          setAddress(accounts[0]);
          setIsConnected(true);
          localStorage.setItem('walletAddress', accounts[0]);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        if (window.ethereum && window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [address]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not detected",
        description: "Please install MetaMask browser extension to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        localStorage.setItem('walletAddress', accounts[0]);
        
        toast({
          title: "Wallet Connected",
          description: "Successfully connected to your wallet.",
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to your wallet.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem('walletAddress');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return (
    <WalletContext.Provider value={{ 
      address, 
      isConnecting, 
      isConnected, 
      connectWallet, 
      disconnectWallet 
    }}>
      {children}
    </WalletContext.Provider>
  );
};
