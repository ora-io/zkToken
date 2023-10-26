# zkToken

zkToken is a ERC20 Monitor based on [zkGraph](https://www.hyperoracle.io). It used to monitor whether there is any selling or pumping behavior in the whale account, and then issue an alert signal.

# Getting Start
Through the following steps, locally test zkToken.

### 1. Prepare environment
```sh
npm install
vim config.js # Fill in the private key and endpoint in the configuration file.
```
Please fill in the last configuration item "whale" in the configs as the whale account you want to monitor.

### 2. Obtain the balance of the whale account.

```sh
npm run whale
```

### 3. Compile && Run at the specified block height.

```sh
npm run compile-local && npm run exec-local -- 18370576
```

At this point, zkgraph returns a boolean value indicating whether the user can be liquidated.

You can modify the block height `18370576` in the above command to any value for further testing.

# Project Layout

### zkToken project is broken down into three sections:
- src - The core logic of zkToken.
- builds - Compiled WASM Binary file.
- static - whale account state file and abi json for scripts.
- APIs - Some zkgraph-api like compiling\execution\deploy etc.
- scripts - scripts for obtaining hard-coded whale status.

### core logic of zkToken

1. Fetch Tokens `Transfer` events on the mainnet.

The default tokens to be followed include compound v2 underlyings tokens.

You can modify static/tokens.ts to customize the tokens you want to follow.

2. Determine the market sentiment corresponding to Transfer.

If the amount of token transferred out is greater than half of the balance, it is considered a bearish signal with selling implications.

If the amount of token transferred is greater than half of the balance, it is considered a bullish signal with the meaning of price increase.

Other situations are considered neutral signal.

3. Combined result bytes

Market signals are defined as Enum Signal and will eventually be converted into an array of Bytes with i32.
