type Method = { string: string; bytes: string }

type ERC20MethodKey = 'name' | 'symbol' | 'decimals' | 'underlying' | 'totalSupply' | 'balanceOf'
export const ERC20_METHODS = new Map<ERC20MethodKey, Method>([
  ['name', { string: 'name()', bytes: '0x06fdde03' }],
  ['symbol', { string: 'symbol()', bytes: '0x95d89b41' }],
  ['decimals', { string: 'decimals()', bytes: '0x313ce567' }],
  ['underlying', { string: 'underlying()', bytes: '0x6f307dc3' }],
  ['totalSupply', { string: 'totalSupply()', bytes: '0x18160ddd' }],
  ['balanceOf', { string: 'balanceOf(address)', bytes: '0x70a08231' }],
])

type MulticoinMethodKey = 'balance' | 'balances'
export const MULTICOIN_METHODS = new Map<MulticoinMethodKey, Method>([
  ['balance', { string: 'getBalance(address,address)', bytes: '0xd4fac45d' }],
  ['balances', { string: 'getBalances(address,address[])', bytes: '0x6a385ae9' }],
])