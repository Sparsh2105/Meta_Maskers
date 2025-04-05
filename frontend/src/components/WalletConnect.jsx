import { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect({ setWalletAddress }) {
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setConnected(true);
      } catch (err) {
        console.error("User rejected:", err);
      }
    } else {
      alert("Please install MetaMask.");
    }
  };

  return (
    <button
      className="px-4 py-2 bg-indigo-600 text-white rounded"
      onClick={connectWallet}
    >
      {connected ? "Wallet Connected ✅" : "Connect Wallet 🔗"}
    </button>
  );
}
