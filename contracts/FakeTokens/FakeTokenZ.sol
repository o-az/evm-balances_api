// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FakeTokenZ is ERC20 {
  constructor(uint256 _initialSupply) ERC20('FakeTokenZ', 'FTNZ') {
    _mint(msg.sender, _initialSupply);
  }
}
