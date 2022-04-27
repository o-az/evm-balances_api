// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FakeTokenM is ERC20 {
  constructor(uint256 _initialSupply) ERC20('FakeTokenM', 'FTNM') {
    _mint(msg.sender, _initialSupply);
  }
}
