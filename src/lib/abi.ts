/**
 * Subset of the deployed Gen 1 contract — Gary Ghosts at
 * 0x396b3e128bb62a71813f4ef42bbe66ed2cc657df.
 * The public mint is `GhostMint()` with no arguments: one token per call,
 * priced by `GHOST_PRICE`. Minted supply is `tokenCount()`;
 * `totalSupply()` returns the collection cap, not the minted count.
 */
export const mintAbi = [
  {
    type: "function",
    name: "GhostMint",
    stateMutability: "payable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "GHOST_PRICE",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "MAX_TOKENS",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "tokenCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
] as const;
