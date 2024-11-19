// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Apple {
    string city;
    function getCity() view public returns (string memory){return city;}
    function setCity(string memory _city) public{city=_city;}
}