```ts
export const CONTRACTS = {
  ethereum: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  optimism: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  arbitrum: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  opera: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  bsc: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  avalanche: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  avalancheTest: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  bsctestnet: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  ropsten: '0x1207602eBE2d77801081d57162577cbEf1414D78',
  rinkeby: '0x7B1DB2CfCdd3DBd38d3700310CA3c76e94799081',
  polygon: '0xE052Ef907f09c0053B237647aD7387D4BDF11A5A',
  polygonTestnet: '0xE052Ef907f09c0053B237647aD7387D4BDF11A5A',
  hardhat: '0xE3395e0d3AD7A0d86eFEb56fa7F1E69513e951bD',
}
```
___

```ts
// TODO: expose an npm package to be used like this:
export async function getBalances({
  address,
  network,
  tokenContracts,
  infuraKey,
  alchemyKey,
}: {
  address: string
  network: Chain
  tokenContracts: Array<string>
  infuraKey?: string
  alchemyKey?: string
}) {
  // ...
}
```
