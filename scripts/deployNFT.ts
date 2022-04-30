import { BigNumber, BigNumberish, Bytes, BytesLike, Signer } from "ethers";
import { ethers } from "hardhat";

const main = async () => {
  const nftContractFactory = await ethers.getContractFactory("MyEpicNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  const txn = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();

  //   // Mint another NFT for fun.
  //   txn = await nftContract.makeAnEpicNFT();
  //   // Wait for it to be mined.
  //   await txn.wait();
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
