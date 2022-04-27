// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FakeTokenG is ERC20 {
  constructor(uint256 _initialSupply) ERC20('FakeTokenG', 'FTNG') {
    _mint(msg.sender, _initialSupply);
  }
}
