// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FakeTokenO is ERC20 {
  constructor(uint256 _initialSupply) ERC20('FakeTokenO', 'FTNO') {
    _mint(msg.sender, _initialSupply);
  }
}
