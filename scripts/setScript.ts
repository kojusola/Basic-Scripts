// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { IGreeter } from "../typechain";

async function main() {
  const add: string = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  const deployedGreeter = (await ethers.getContractAt(
    "IGreeter",
    add
  )) as IGreeter;
  // callimg a function that is not a write function that returns a value, so you use a transaction receipt to see the events but you need to .wait to see the events;
 const receipt = await deployedGreeter.setGreeting("hELLO HELLO");
 const receiptResult = receipt.wait()
 console.log(receiptResult);

  console.log(await deployedGreeter.greet());
  // to get balance of signers
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address, await account.getBalance());
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
