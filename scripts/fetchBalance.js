import fs from "fs";
import path from "path";
import { erc20abi } from "../static/abis/erc20.js";
import { tokens } from "../static/tokens.js";
import { config } from "../config.js";
import { Web3 } from "web3";
const endpoint = config.JsonRpcProviderUrl.mainnet;
const web3 = new Web3(endpoint);

async function fetchBalanceOf(token, account) {
  const tokenContract = await new web3.eth.Contract(erc20abi, token);
  const balance = await tokenContract.methods.balanceOf(account).call();
  return balance;
}

async function fetchBalancesOf(account) {
  const result = [];
  for(let i = 0; i < tokens.length ; i++){
    console.log(`fetching ${account} balance of`, tokens[i]);
    const balance = await fetchBalanceOf(tokens[i], account);
    result.push(balance.toString());
  }
  return result;
}

async function main() {
  const whale = config.Whale;
  const balances = await fetchBalancesOf(whale);

  const currentPath = process.cwd();
  const filePath = path.join(currentPath, `./static/whale.ts`);
  const jsonString = JSON.stringify(balances);
  const prefix = "export const balances: string[] = ";
  const firstLinePayload = prefix + jsonString;
  const secondLinePayload = `\nexport const whaleAddress: string = \"${whale}\";`
  fs.writeFileSync(filePath, firstLinePayload + secondLinePayload);
  console.log(`${whale} balance written`);
}

main();
