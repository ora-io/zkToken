//@ts-ignore
import { Bytes, Event } from "@hyperoracle/zkgraph-lib";
import { Sentiment } from "./modules/sentiment";

/**
 * Executes the event handling logic for the given array of events.
 *
 * @param {Event[]} events - The array of events to be handled.
 * @return {Bytes} - The result of running the event handling logic.
 */
export function handleEvents(events: Event[]): Bytes {
  const sentiment = new Sentiment(events);
  return sentiment.toBytes();
}
