import {
  BigInt,
  Bytes,
  Address,
} from "@hyperoracle/zkgraph-lib";
import { tokens } from "../../static/tokens";
import { balances } from "../../static/whale";

export function getBalanceFromTokenAddressBytes(tokenAddress: Bytes): BigInt {
  const token = Address.fromBytes(tokenAddress).toHexString();
  const tokenIndex = tokens.indexOf(token);
  const balance = BigInt.fromString(balances[tokenIndex]);
  return balance;
}
