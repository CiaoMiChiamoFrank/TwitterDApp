// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Twitter{
    
    mapping(address => string[]) posts;
    mapping(address => bool) accounts;

    modifier existAccountTwitt(address _my) {
        require(accounts[_my], "Accounts, don't exist");
        _;
    }

    modifier existAccount(address _my) {
        require(!accounts[_my], "Account already exist");
        _;
    }

    function createAccount() public existAccount(msg.sender) {
        accounts[msg.sender] = true;
    }

    function createPost(string memory _post) public existAccountTwitt(msg.sender) {
        posts[msg.sender].push(_post);
    }

    function getPost() public view returns (string [] memory) {
        return posts[msg.sender];
    }

    function existAccoutF () public view returns (bool){
        if(accounts[msg.sender] == true){
            return true;
        }
        return false;
    }

}