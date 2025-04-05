import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import { uploadToIPFS } from "./components/UploadAudio";
import { mintNFT } from "./components/MintVoiceNFT";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [audio, setAudio] = useState(null);
  const [minting, setMinting] = useState(false);
  const [activeTab, setActiveTab] = useState("mint");

  const handleUpload = async () => {
    if (!audio) return alert("Please upload a voice file first!");
    setMinting(true);
    try {
      const ipfsUrl = await uploadToIPFS(audio);
      const txHash = await mintNFT(ipfsUrl);
      alert("✅ NFT Minted! TX: " + txHash);
    } catch (error) {
      alert("❌ Minting failed: " + error.message);
    }
    setMinting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden">
      {/* Professional Navbar with Glassmorphism */}
      <nav className="w-full bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side */}
            <div className="flex items-center space-x-10">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  🎙️ VoiceNFT
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => setActiveTab("mint")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === "mint"
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                      : "text-purple-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Mint NFT
                </button>
                <button
                  onClick={() => setActiveTab("my-nfts")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === "my-nfts"
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                      : "text-purple-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  My NFTs
                </button>
                <button
                  onClick={() => setActiveTab("about")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === "about"
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                      : "text-purple-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  About
                </button>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <WalletConnect
                setWalletAddress={setWalletAddress}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium hover:shadow-xl transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with Glassmorphism Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeTab === "mint" && (
          <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
              Create New Voice NFT
            </h1>

            <div className="space-y-8">
              <div className="relative group">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudio(e.target.files[0])}
                  id="file-upload"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="block w-full border-2 border-dashed border-purple-300 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                >
                  <div className="space-y-3">
                    <span className="text-4xl animate-pulse">🎵</span>
                    <p className="text-lg font-medium">
                      {audio ? audio.name : "Select Audio File"}
                    </p>
                    <p className="text-xs text-purple-300">
                      Supported formats: MP3, WAV, OGG (Max 50MB)
                    </p>
                  </div>
                </label>
              </div>

              <button
                onClick={handleUpload}
                disabled={minting || !walletAddress}
                className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  minting
                    ? "bg-purple-600 cursor-not-allowed"
                    : walletAddress
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 hover:shadow-[0_0_20px_rgba(147,51,234,0.7)]"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                {minting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Minting NFT...</span>
                  </div>
                ) : (
                  <>
                    <span>Mint Voice NFT</span>
                    <span>🚀</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === "my-nfts" && (
          <div className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
              My Voice NFTs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placeholder NFT items */}
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300">
                <p className="text-gray-400 text-center">No NFTs minted yet</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
              About VoiceNFT
            </h2>
            <div className="space-y-6 text-purple-200">
              <p>
                VoiceNFT Generator empowers you to create unique audio NFTs from your voice
                recordings. Leveraging blockchain technology, each NFT is securely stored on IPFS
                and minted as a verifiable digital collectible.
              </p>
              <p>Key Features:</p>
              <ul className="list-disc list-inside space-y-2">
                <li className="hover:text-white transition-colors">Secure wallet integration</li>
                <li className="hover:text-white transition-colors">Decentralized storage</li>
                <li className="hover:text-white transition-colors">Immutable ownership records</li>
                <li className="hover:text-white transition-colors">Cross-chain compatibility</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer with Gradient and Modern Styling */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-purple-300 text-sm">
            © 2023 VoiceNFT. All rights reserved.{" "}
            <div className="mt-2 flex justify-center space-x-6">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;