import { utils } from "ethers";
import type { BigNumber } from "ethers";

import type { Balance } from "./types";
import type { Chain } from "../constants";

type FormatResponse = Balance | null;
type Token = Record<string, { symbol: string; name: string; decimals: number }>;

export async function formatTokensBalances({
  balances,
  contractAddresses,
  chain,
}: {
  balances: BigNumber[];
  contractAddresses: string[];
  chain: Chain;
}): Promise<FormatResponse[]> {
  let _chain = chain.includes("-") ? chain.split("-")[0] : chain;
  const { default: tokenList } = (await import(
    `../data/tokens/${_chain}.json`
  )) as Token;
  if (!tokenList) return [];
  return balances
    .map((balance, i) => {
      if (balance.isZero()) return null;
      const token = tokenList[`${contractAddresses[i]?.toLowerCase()}`];
      if (!token) return null;
      const { decimals, symbol, name } = token;
      return {
        balance: utils.formatUnits(balance, decimals),
        contractAddress: contractAddresses[i],
        symbol,
        name,
        decimals,
      };
    })
    .filter(Boolean) as FormatResponse[];
}
