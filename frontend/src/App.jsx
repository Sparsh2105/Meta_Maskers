import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import { uploadToIPFS } from "./components/UploadAudio";
import { mintNFT } from "./components/MintVoiceNFT";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [audio, setAudio] = useState(null);
  const [minting, setMinting] = useState(false);

  const handleUpload = async () => {
    if (!audio) return alert("Please upload a voice file first!");
    setMinting(true);
    const ipfsUrl = await uploadToIPFS(audio);
    const txHash = await mintNFT(ipfsUrl);
    alert("✅ NFT Minted! TX: " + txHash);
    setMinting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🎤 VoiceNFT Generator</h1>
      <WalletConnect setWalletAddress={setWalletAddress} />

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudio(e.target.files[0])}
        className="my-4 block"
      />

      <button
        className="bg-green-600 px-4 py-2 rounded"
        onClick={handleUpload}
        disabled={minting}
      >
        {minting ? "Minting..." : "Mint Voice NFT 🚀"}
      </button>
    </div>
  );
}

export default App;
