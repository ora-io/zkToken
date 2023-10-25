// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";
import {
    Transfer
  } from "../events/transfer";

export class Monitor {
  public events: Event[];

  constructor(events: Event[]) {
    this.events = events;
  }

  /**
   * Runs the function and returns a Bytes object.
   *
   * @return {Bytes} A Bytes object.
   */
  run(): Bytes {
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      const transfer = Transfer.fromEvent(event);
      // transfer.token in tokens
      // transfer.from or to in whales
      // to in whales(and value > thresholdFactor * balance) -> Bullish
      // from in whales(and value > thresholdFactor * balance) -> Bearish
      // balance 暂时硬编码?

    }
    return Bytes.empty();
  }
}
