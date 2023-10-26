// @ts-ignore
import { Event, BigInt, Bytes, require } from "@hyperoracle/zkgraph-lib";
import {
    Transfer
  } from "../events/transfer";
import { whaleAddress } from "../../static/whale";
import { isFollowed } from "../utils/filter";
import { Result } from "../types/result";
import { Signal } from "../types/signal";
import { balances } from "../../static/whale";

export class Sentiment {
  public signals: Signal[];
  public events: Event[];

  constructor(events: Event[]) {
    this.events = events;
    this.signals = [];

    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      const transfer = Transfer.fromEvent(event);
      const tokenBalance = BigInt.fromString(balances[i]);

      // Filter out non-followed tokens
      if (!isFollowed(transfer)) continue;

      // determine market signal
      // const signal = this.calcSignal(transfer, tokenBalance);
      // this.signals.push(signal);
    }
  }

  calcSignal(transfer: Transfer, balance: BigInt): Signal {
    const halfBalance = balance.div(2);
    if( transfer.value < halfBalance) return Signal.Neutral;
    if(transfer.from.toString() == whaleAddress) return Signal.Bearish;
    if(transfer.from.toString() == whaleAddress) return Signal.Bullish;
    
    // Panic if we get here
    require(false);
    return Signal.Neutral;
  }

  toBytes(): Bytes {
    if(this.signals.length == 0) return Bytes.empty();
    const result = new Result(this.signals);
    return result.toBytes();
  }
}
