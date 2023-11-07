import { Transfer } from "../events/transfer";
import { whaleAddress } from "../../static/whale";

export function isFollowed(transfer: Transfer): bool {
  const followedFrom = transfer.from.toHexString() == whaleAddress;
  const followedTo = transfer.to.toHexString() == whaleAddress;
  return (followedFrom || followedTo);
}
