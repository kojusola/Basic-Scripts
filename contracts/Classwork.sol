//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Classwork {
    uint256 ID = 1;
    mapping(uint256 => individualDetails) DetailsToName;

    struct individualDetails {
        string name;
        address individualAdress;
        string state_of_origin;
        string houseAddress;
    }
    event logStruct(individualDetails results, uint256 id);

    function addIndividualDetails(individualDetails memory details) public {
        DetailsToName[ID] = details;
        ID++;
        emit logStruct(DetailsToName[ID], ID);
    }

    function getIndividualDetails(uint256 id)
        public
        view
        returns (individualDetails memory results)
    {
        results = DetailsToName[id];
    }
}
