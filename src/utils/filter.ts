import { Address } from "@hyperoracle/zkgraph-lib";
import { Transfer } from "../events/transfer";
import { whaleAddress } from "../static/whale";

export function isFollowed(transfer: Transfer): boolean {
  const whale = Address.fromHexString(whaleAddress);
  return transfer.from == whale;
}
