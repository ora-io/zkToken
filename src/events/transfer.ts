// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

export class Transfer {
  public token: Address;
  public from: Address;
  public to: Address;
  public value: BigInt;

  constructor(token: Address, from: Address, to: Address, value: BigInt) {
    this.token = token;
    this.from = from;
    this.to = to;
    this.value = value;
  }

  /**
   * Creates a Transfer object from an Event.
   *
   * @param {Event} event - The Event object to convert.
   * @return {Sync} The created Transfer object.
   */
  static fromEvent(
    event: Event,
  ): Transfer {
    const source = changetype<Bytes>(event.data);
    const token = event.address;
    const from = event.topic1;
    const to = event.topic2;
    const value = BigInt.fromBytes(source.slice(0,32));

    return new Transfer(token, from, to, value);
  }
}
