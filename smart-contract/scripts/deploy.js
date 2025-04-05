const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const VoiceNFT = await hre.ethers.getContractFactory("VoiceNFT");
  const [deployer] = await hre.ethers.getSigners();
  
  const contract = await VoiceNFT.deploy(deployer.address);
  await contract.waitForDeployment(); // ✅ use this instead of deployed()

  console.log("✅ Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
