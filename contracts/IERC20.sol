//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IERC20 {
    function balanceOf(address owner) external view returns (uint256);

    function transfer(address _to, uint256 _amount) external returns (bool);

    function approve(address _spender, uint256 _amount) external returns (bool);
}
