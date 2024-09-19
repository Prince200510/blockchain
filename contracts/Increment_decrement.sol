// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint128 public count = 0;

    function getCount() public view returns (uint128) {
        return count;
    }

    function setCountIncrement() public {
        count += 1;
    }

    function setCountDecrement() public {
        require(count > 0, "Count cannot go below zero");
        count -= 1;
    }
}
