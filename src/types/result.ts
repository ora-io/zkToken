import { BigInt, Bytes } from "@hyperoracle/zkgraph-lib";
import { Signal } from "./signal";
import { tokens } from "../static/tokens";

export class Result {
  public signals: Signal[];
  constructor(signals: Signal[]) {
    this.signals = signals;
  }

  public toBytes(): Bytes {
    // function operate(bytes calldata signals) public {}
    // let result: Bytes = Bytes.fromHexString("0x53ad370d");
    let nonce: BigInt = BigInt.zero();
    // for(let i = 0; i < this.signals.length; i++){
    //   const signal = this.signals[i];
    //   const base = BigInt.from(16).pow(i);
    //   const signalNonce = BigInt.fromI64(signal).mul(base);
    //   nonce = nonce.add(signalNonce);
    // }
    const nonceBytes = Bytes.fromHexString(nonce.toHexString());
    // const resultBytes = nonceBytes.padStart(tokens.length, 0);
    // const resultBytesArray = result.concat(resultBytes);
    // return Bytes.fromByteArray(resultBytesArray);
    return nonceBytes;
  }
}
