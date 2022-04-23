// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract MultiCoinBalanceLookup {
  fallback() external payable {
    revert('MultiCoinBalanceLookup is not payable');
  }

  receive() external payable {
    revert('MultiCoinBalanceLookup is not payable');
  }

  struct Balance {
    uint256 balance;
    string name;
    string symbol;
    uint8 decimals;
  }

  string private _name = 'name()';
  string private _symbol = 'symbol()';
  string private _decimals = 'decimals()';
  string private _balance = 'balanceOf(address)';

  function getBalances(address user, address[] calldata tokens) public view returns (Balance[] memory balances) {
    balances = new Balance[](tokens.length);
    for (uint256 idx = 0; idx < tokens.length; idx++) {
      if (!isAContract(tokens[idx])) continue;
      if (tokens[idx] != address(0x0)) {
        balances[idx].balance = tokenBalance(user, tokens[idx]);
        balances[idx].name = contractName(tokens[idx]);
        balances[idx].symbol = contractSymbol(tokens[idx]);
        balances[idx].decimals = contractDecimals(tokens[idx]);
      } else {
        balances[idx].balance = user.balance;
        balances[idx].name = 'Ether';
        balances[idx].symbol = 'ETH';
        balances[idx].decimals = 18;
      }
    }
    return balances;
  }

  /* Private functions */
  function execTokenMethod(string storage method, address contractAddress)
    internal
    view
    returns (bool success, bytes memory result)
  {
    bytes memory call = abi.encodeWithSignature(method, contractAddress);
    return contractAddress.staticcall(call);
  }

  function contractName(address contractAddress) internal view returns (string memory name) {
    (bool success, bytes memory result) = execTokenMethod(_name, contractAddress);
    return success ? abi.decode(result, (string)) : '';
  }

  function contractSymbol(address contractAddress) internal view returns (string memory symbol) {
    (bool success, bytes memory result) = execTokenMethod(_symbol, contractAddress);
    return success ? abi.decode(result, (string)) : '';
  }

  function contractDecimals(address contractAddress) internal view returns (uint8 decimals) {
    (bool success, bytes memory result) = execTokenMethod(_decimals, contractAddress);
    return success ? abi.decode(result, (uint8)) : 0;
  }

  function tokenBalance(address user, address contractAddress) internal view returns (uint256 balance) {
    bytes memory call = abi.encodeWithSignature(_balance, user);
    (bool success, bytes memory result) = contractAddress.staticcall(call);
    return success && result.length == 32 ? abi.decode(result, (uint256)) : 0;
  }

  /**
  CREDIT: https://github.com/DeltaBalances/DeltaBalances.github.io/blob/
  77aafff42139d00d68c528180358d5990f6eac2d/smart_contract/contracts/deltabalances.sol#L219
   */
  function isAContract(address contractAddr) internal view returns (bool) {
    uint256 codeSize;
    assembly {
      codeSize := extcodesize(contractAddr)
    }
    return codeSize > 0;
  }
}
