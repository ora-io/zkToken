// @ts-ignore
import {
  Event,
  BigInt,
  Bytes,
  Address,
  Block
} from "@hyperoracle/zkgraph-lib";
import { Transfer } from "../events/transfer";
import { whaleAddress } from "../static/whale";
import { tokens } from "../static/tokens";
import { isFollowed } from "../utils/filter";
import { Result } from "../types/result";
import { Signal } from "../types/signal";
import { getBalanceFromTokenAddressBytes } from "../utils/token";

let addr = Bytes.fromHexString('0xdac17f958d2ee523a2206206994597c13d831ec7');

export class Sentiment {
  public signals: Signal[];

  constructor(blocks: Block[]) {
    const events: Event[] = blocks[0].events;

    this.signals = [];
    // for (let i = 0; i < tokens.length; i++) {
    //   this.signals.push(Signal.Neutral);
    // }

    for (let i = 0; i < events.length; i++) {
      const event = events[i]; // prove success
      const transfer = Transfer.fromEvent(event); // prove failed
      // // Filter out non-followed tokens
      let follow = isFollowed(transfer); // 问题出现在这个函数!
      // if(follow == false) continue; // prove failed
      // const balance = getBalanceFromTokenAddressBytes(event.address);

      // // determine market signal
      // const signal = this.calcSignal(transfer, balance);
      // this.setSignalOfToken(event.address, signal);
    }
  }

  calcSignal(transfer: Transfer, balance: BigInt): Signal {
    const halfBalance = balance.div(2);
    if (transfer.value < halfBalance) return Signal.Neutral;
    if (transfer.from == Address.fromHexString(whaleAddress)) return Signal.Bearish;
    if (transfer.to == Address.fromHexString(whaleAddress)) return Signal.Bullish;
    return Signal.Neutral;
  }

  setSignalOfToken(tokenAddress: Bytes, signal: Signal): void {
    const token = Address.fromBytes(tokenAddress).toHexString();
    const tokenIndex = tokens.indexOf(token);
    this.signals[tokenIndex] = signal;  
  }

  toBytes(): Bytes {
    const result = new Result(this.signals);
    return result.toBytes();
  }
}
