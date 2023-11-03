import { BigInt, Bytes } from "@hyperoracle/zkgraph-lib";
import { Signal } from "./signal";

export class Result {
  public signals: Signal[];
  constructor(signals: Signal[]) {
    this.signals = signals;
  }

  public toBytes(): Bytes {
    // function operate(bytes calldata signals) public {}
    let result: Bytes = Bytes.fromHexString("0x53ad370d");
    for(let i = 0; i < this.signals.length; i++){
      const signal = this.signals[i];
      const balanceBytes = Bytes.fromI32(signal);
      result = Bytes.fromByteArray(result.concat(balanceBytes));
    }
    return result;
  }
}
