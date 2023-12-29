// @ts-ignore
import { Event, BigInt, Address } from "@hyperoracle/zkgraph-lib";

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
    const token = Address.fromBytes(event.address);
    const from = Address.fromBytes(event.topic1.slice(12,32));
    const to = Address.fromBytes(event.topic2.slice(12,32));
    const value = BigInt.fromBytes(event.data);

    return new Transfer(token, from, to, value);
  }
}
