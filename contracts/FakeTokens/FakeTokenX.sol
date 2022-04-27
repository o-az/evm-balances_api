// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FakeTokenX is ERC20 {
  constructor(uint256 _initialSupply) ERC20('FakeTokenX', 'FTNX') {
    _mint(msg.sender, _initialSupply);
  }
}
