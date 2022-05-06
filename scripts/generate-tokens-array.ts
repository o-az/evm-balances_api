import { readFileSync, writeFileSync } from "fs";

main().then(console.log).catch(console.error);

async function main() {
  const polygonList = await getPolygonList();
  console.log(JSON.stringify(polygonList));
  // const [, , chain] = process.argv
  // const data = await getCoingeckoList()
  // writeToJSONFile({ path: `src/data/top-tokens-contracts/coingecko.json`, data })

  // if (!chain || !['smartchain', 'ethereum', 'polygon'].includes(chain)) return
  // const topTokensAddresses = getTopTokensAddresses(chain as 'smartchain' | 'ethereum' | 'polygon')
  // writeToJSONFile({ path: `src/data/top-tokens-contracts/${chain}.json`, data: topTokensAddresses })
}

export function getTopTokensAddresses(
  chain: "smartchain" | "ethereum" | "polygon"
): string[] {
  const data = readFileSync(
    `src/data/top-tokens-contracts/${chain}.json`
  ).toString();
  const { tokens } = JSON.parse(data) as { tokens: Array<{ address: string }> };
  return tokens.map(({ address }) => address);
}

export function writeToJSONFile({
  path,
  data,
}: {
  path: string;
  data: string[];
}) {
  const formatted = `export const CONTRACT_ADDRESSES = ${JSON.stringify(
    data,
    null,
    2
  )}`;
  return writeFileSync(path, formatted);
}

export async function getCoingeckoList() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
  );
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}

async function getPolygonList() {
  const response = await fetch(
    "https://tokenmapper.api.matic.today/api/v1/mapping?map_type=%5B%22POS%22%5D&chain_id=137&limit=1000"
  );
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const { data } = await response.json();
  return data.mapping.map(({ child_token }) => child_token);
}
