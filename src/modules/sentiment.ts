// @ts-ignore
import {
  Event,
  BigInt,
  Bytes,
  Address,
} from "@hyperoracle/zkgraph-lib";
import { Transfer } from "../events/transfer";
import { whaleAddress } from "../../static/whale";
import { isFollowed } from "../utils/filter";
import { Result } from "../types/result";
import { Signal } from "../types/signal";
import { balances } from "../../static/whale";
import { tokens } from "../../static/tokens";

export class Sentiment {
  public signals: Signal[];
  public events: Event[];

  constructor(events: Event[]) {
    this.events = events;
    this.signals = [];

    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      const transfer = Transfer.fromEvent(event);
      // Filter out non-followed tokens
      if (!isFollowed(transfer)) continue;

      const balance = getBalanceFromTokenAddressBytes(event.address);

      // determine market signal
      const signal = this.calcSignal(transfer, balance);
      this.signals.push(signal);
    }
  }

  calcSignal(transfer: Transfer, balance: BigInt): Signal {
    const halfBalance = balance.div(2);
    if (transfer.value < halfBalance) return Signal.Neutral;
    if (transfer.from.toHexString() == whaleAddress) return Signal.Bearish;
    if (transfer.to.toHexString() == whaleAddress) return Signal.Bullish;
    return Signal.Neutral;
  }

  toBytes(): Bytes {
    if (this.signals.length == 0) return Bytes.empty();
    const result = new Result(this.signals);
    return result.toBytes();
  }
}

function getBalanceFromTokenAddressBytes(tokenAddress: Bytes): BigInt {
  const token = Address.fromBytes(tokenAddress).toHexString();
  const tokenIndex = tokens.indexOf(token);
  const balance = BigInt.fromString(balances[tokenIndex]);
  return balance;
}
