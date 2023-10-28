import { BigInt, Bytes } from "@hyperoracle/zkgraph-lib";
import { Signal } from "./signal";

export class Result {
  public signals: Signal[];
  constructor(signals: Signal[]) {
    this.signals = signals;
  }

  public toBytes(): Bytes {
    let result = Bytes.fromI32(this.signals.length);
    for(let i = 0; i < this.signals.length; i++){
      const signal = this.signals[i];
      // const balanceString = signal.toString(16);
      // const balanceBytes = Bytes.fromHexString(balanceString);
      const balanceBytes = Bytes.fromI32(signal);
      result = Bytes.fromByteArray(result.concat(balanceBytes));
    }
    return result;
  }
}
