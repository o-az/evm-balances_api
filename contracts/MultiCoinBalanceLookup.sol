// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

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

  bytes4 private constant _balanceOf = bytes4(0x70a08231);
  bytes4 private constant _name = bytes4(0x06fdde03);
  bytes4 private constant _symbol = bytes4(0x95d89b41);
  bytes4 private constant _decimals = bytes4(0x313ce567);

  // Multiple coins balance lookup
  function getBalances(address user, address[] calldata tokens) public view returns (Balance[] memory balances) {
    balances = new Balance[](tokens.length);
    for (uint256 idx = 0; idx < tokens.length; idx++) {
      if (!isContract(tokens[idx])) continue;
      balances[idx] = getBalance(user, tokens[idx]);
    }
    return balances;
  }

  // Single coin balance lookup
  function getBalance(address user, address token) public view returns (Balance memory balance) {
    if (token != address(0x0)) {
      return
        Balance({
          balance: tokenBalance(user, token),
          name: contractName(token),
          symbol: contractSymbol(token),
          decimals: contractDecimals(token)
        });
    } else {
      return Balance({ balance: user.balance, name: 'Ether', symbol: 'ETH', decimals: 18 });
    }
  }

  /* Private functions */
  function execTokenMethod(bytes4 method, address contractAddress)
    internal
    view
    returns (bool success, bytes memory result)
  {
    return contractAddress.staticcall(abi.encodeWithSelector(method, contractAddress));
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
    (bool success, bytes memory result) = contractAddress.staticcall(abi.encodeWithSelector(_balanceOf, user));
    return success && result.length == 32 ? abi.decode(result, (uint256)) : 0;
  }

  function isContract(address contractAddress) internal view returns (bool) {
    uint256 codeSize;
    assembly {
      codeSize := extcodesize(contractAddress)
    }
    return codeSize > 0;
  }
}
