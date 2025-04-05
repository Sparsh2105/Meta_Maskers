import { ethers } from "ethers";
import VoiceNFT from "../contract/VoiceNFT.json";

const CONTRACT_ADDRESS = "0x977c6144eC5Ae0a920a4eA60D40D602b57a5331e";

export async function mintNFT(ipfsUrl) {
  if (!window.ethereum) return alert("Install MetaMask first!");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, VoiceNFT.abi, signer);

  const tx = await contract.mintVoiceNFT(ipfsUrl);
  await tx.wait();

  return tx.hash;
}
