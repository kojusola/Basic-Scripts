// //SPDX-License-Identifier: Unlicense
// pragma solidity ^0.8.0;

// import {IN, fillInData} from "./libraries/appendData.sol";

// contract testII {
//     struct INNN {
//         string name;
//         uint256 age;
//     }
//     // INNN ij;
//     using fillInData for IN;
//     mapping(uint256 => IN) insss;

//     function fillIn(IN calldata _in) external {
//         //   _in.reg(insss[1]);

//         IN storage in_ = insss[1];
//         in_.name = _in.name;
//         in_.age = _in.age;
//         // _in.reg(in);
//         fillInData.reg(in_);
//         // in_.reg();
//     }

//     function check() public view returns (IN memory i) {
//         i = insss[1];
//     }
// }
