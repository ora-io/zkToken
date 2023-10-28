import { Transfer } from "../events/transfer";
import { tokens } from "../../static/tokens";
import { whaleAddress, balances } from "../../static/whale";

export function isFollowed(transfer: Transfer): bool {

  let followedToken = false;
  for( let i = 0; i < tokens.length; i++){
    if(tokens[i] == transfer.token.toHexString()){
      followedToken = true;
      break;
    }
  }
  const followedFrom = transfer.from.toHexString() == whaleAddress;
  const followedTo = transfer.to.toHexString() == whaleAddress;
  return followedToken && (followedFrom || followedTo);
}
