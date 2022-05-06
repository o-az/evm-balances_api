import { writeFile } from "fs/promises";
import artifact from "../artifacts/contracts/MultiCoinBalanceLookup.sol/MultiCoinBalanceLookup.json";
import tokenArtifact from "../artifacts/contracts/MultiCoinBalanceLookup.sol/Token.json";

const DESTINATION = `./src/data/abi`;
const DESTINATIONS = [
  `${DESTINATION}/MultiCoinBalanceLookup.abi.json`,
  `${DESTINATION}/Token.abi.json`,
];

const { abi } = artifact;
const { abi: tokenAbi } = tokenArtifact;

async function writeToFile() {
  try {
    await writeFile(DESTINATIONS[0]!, JSON.stringify(abi, null, 2));
    await writeFile(DESTINATIONS[1]!, JSON.stringify(tokenAbi, null, 2));
  } catch (error) {
    console.trace(error);
    throw new Error("Failed to write to file");
  }
}

(async () => await writeToFile())();
