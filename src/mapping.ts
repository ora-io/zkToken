//@ts-ignore
import { BigInt, Bytes, Event } from "@hyperoracle/zkgraph-lib";
import { Monitor } from "./modules/monitor";

/**
 * Executes the event handling logic for the given array of events.
 *
 * @param {Event[]} events - The array of events to be handled.
 * @return {Bytes} - The result of running the event handling logic.
 */
export function handleEvents(events: Event[]): Bytes {
  const monitor = new Monitor(events);
  return monitor.run();
}
