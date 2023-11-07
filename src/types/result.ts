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
    let nonce: BigInt = BigInt.zero();
    for(let i = 0; i < this.signals.length; i++){
      const signal = this.signals[i];
      const base = BigInt.from(16).pow(i);
      const signalNonce = BigInt.fromI32(signal).mul(base);
      nonce = nonce.add(signalNonce);
    }
    result = Bytes.fromByteArray(result.concat(Bytes.fromHexString(nonce.toHexString())));
    return result;
  }
}
