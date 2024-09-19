// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleAdder {
    uint256 public total;  
    constructor() {
        total = 0;
    }
    function addNumber(uint256 _number) public {
        total = 5 + _number; 
    }
    function getTotal() public view returns (uint256) {
        return total;
    }
}
