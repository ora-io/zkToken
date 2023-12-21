import { Address } from "@hyperoracle/zkgraph-lib";
import { Transfer } from "../events/transfer";
import { whaleAddress } from "../static/whale";

export function isFollowed(transfer: Transfer): bool {
  const whale = Address.fromHexString(whaleAddress);
  if(transfer.from == whale) return true;
  if(transfer.to == whale) return true;
  return false;
}
