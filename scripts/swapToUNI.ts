import { ethers, network } from "hardhat";

const UNIROUTER = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDTHOLDER = "0x61f2f664fec20a2fc1d55409cfc85e1baeb943e2";
const UNITOKEN = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
const ammountIn = 10000e6;
async function swap() {
  const provider = 1649347976;
  // const provider2 = new Date().getTime();
  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [USDTHOLDER],
  });
  const usdtSigner = await ethers.getSigner(USDTHOLDER);
  const router = await ethers.getContractAt("IRouter", UNIROUTER, usdtSigner);
  const usdtContract = await ethers.getContractAt("IERC20", USDT, usdtSigner);
  const uniContract = await ethers.getContractAt("IERC20", UNITOKEN);
  console.log(`balance before ${await uniContract.balanceOf(USDTHOLDER)}`);
  console.log("setting Balance to 1000 ether");
  await network.provider.send("hardhat_setBalance", [
    USDTHOLDER,
    "0x1000000000000000000000",
  ]);
  console.log(`approving ${UNIROUTER} to spend ${ammountIn}`);
  await usdtContract.approve(UNIROUTER, ammountIn);

  console.log(`swapping ${ammountIn} USDT`);
  await router.swapExactTokensForTokens(
    ammountIn,
    0,
    [USDT, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", UNITOKEN],
    USDTHOLDER,
    16466093203
  );

  console.log(`Balance now is ${await uniContract.balanceOf(USDTHOLDER)}`);
  //   const receipt = await router.swapExactTokensForTokens(
  //     ammountIn,
  //     0,
  //     [USDTHOLDER, UNITOKEN],
  //     USDTHOLDER,
  //     provider
  //   );
  //   const receiptResult = await receipt.wait();
  //   let evnt = receiptResult.events;
  //   console.log(evnt);
  //   console.log(`balance after ${await uniContract.balanceOf(USDTHOLDER)}`);
}

swap().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
