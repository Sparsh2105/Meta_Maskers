import { NFTStorage, File } from "nft.storage";

const apiKey = import.meta.env.VITE_NFT_STORAGE_KEY;
const client = new NFTStorage({ token: apiKey });

export async function uploadToIPFS(audioBlob) {
  const file = new File([audioBlob], "voice.mp3", { type: "audio/mpeg" });
  const metadata = await client.store({
    name: "Voice NFT",
    description: "A voice recording NFT",
    image: file, // this will be stored as 'image'
  });
  return metadata.url;
}