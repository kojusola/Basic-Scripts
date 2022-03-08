import { BigNumber, BigNumberish, Bytes, BytesLike, Signer } from "ethers";
import { ethers } from "hardhat";
import { IERC20 } from "../typechain";

async function MaticBalance() {
  const provider = await ethers.getDefaultProvider;
  const address = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
  const maticBalances = (await ethers.getContractAt(
    `IERC20`,
    "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
  )) as IERC20;
  console.log(await maticBalances.balanceOf(address));
  // console.log(
  //   await maticBalances.transfer(
  //     "0x14c28e33e16819fae400bcb370fa78f94203aac6",
  //     1
  //   )
  // );

  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });
  const signer: Signer = await ethers.getSigner(address);
  console.log(
    await maticBalances
      .connect(signer)
      .transfer("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", 1)
  );

  console.log(
    await maticBalances.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266")
  );
  console.log(
    await maticBalances.transfer(
      "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      1
    )
  );
  console.log(await maticBalances.balanceOf(address));
  console.log(
    await maticBalances.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266")
  );

  const together: BytesLike = new ethers.utils.AbiCoder().encode(
    ["address", "uint256"],
    [address, 2]
  );
  const position: BytesLike = ethers.utils.solidityKeccak256(
    ["bytes"],
    [together]
  );

  const dec: BigNumberish = BigNumber.from(position);
  console.log(dec);
  const balance = await ethers.provider.getStorageAt(
    maticBalances.address,
    dec
  );
  console.log(`balance is ${balance.toString()}`);
  await ethers.provider.send("hardhat_setStorageAt", [
    maticBalances.address,
    position,
    "0x00000000000000000000000000000000000000000000000000000000000f4240",
  ]);

  const balAfter = await maticBalances.balanceOf(address);
  console.log(`balance after rigging is ${balAfter}`);

  //await DAI.connect(signer).transfer(randAddress, '6229250710691401220343')
  //await  provider.getStorageAt()
}

MaticBalance().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
