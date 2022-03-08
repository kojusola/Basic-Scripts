import { ethers } from "hardhat";

const value = {
  name: "adeola",
  individualAdress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  state_of_origin: "lagos",
  houseAddress: "lagos",
};

async function main() {
  const ClassWork = await ethers.getContractFactory("Classwork");
  const classWork = await ClassWork.deploy();

  await await classWork.deployed();

  //   console.log("Classwork deployed to:", classWork.address);
  const receipt = await await classWork.addIndividualDetails(value);
  const receiptResult = await receipt.wait();
  let evnt = receiptResult.events;
  // console.log(evnt[0]?.args[0]);
  //   const individualDetails = await classWork.getIndividualDetails(1);
  //   console.log(individualDetails);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
