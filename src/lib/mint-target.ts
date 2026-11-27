import { decodeEventLog, isAddress, keccak256, parseEther, zeroAddress, type Address, type Hex } from "viem";
import { mintAbi } from "./abi";

export const OG_MAINNET_ADDRESS = "0x396b3e128bb62a71813f4ef42bbe66ed2cc657df" as const;
export const OG_RUNTIME_HASH = "0x0f609e382907eb372e7864f54b43c6ce01adde341f6ca3b9db19c377654dfe95" as Hex;
export const OG_MINT_PRICE = parseEther("0.05");
export const OG_MINT_TARGET = { chainId: 1, address: OG_MAINNET_ADDRESS } as const;

export function assertExactOgCode(code: Hex | undefined) {
  if (!code || code === "0x" || keccak256(code) !== OG_RUNTIME_HASH) {
    throw new Error("The contract does not match the verified OG contract. Mint blocked.");
  }
}

export function createMintRequest(account: Address, price: bigint) {
  if (!isAddress(account) || account.toLowerCase() === zeroAddress) throw new Error("Connect a wallet first.");
  if (price !== OG_MINT_PRICE) throw new Error("Unexpected OG mint price. Mint blocked.");
  return { address: OG_MINT_TARGET.address, chainId: OG_MINT_TARGET.chainId, abi: mintAbi, functionName: "GhostMint" as const, account, value: OG_MINT_PRICE };
}

const transferEvent = {
  type: "event", name: "Transfer", inputs: [
    { indexed: true, name: "from", type: "address" },
    { indexed: true, name: "to", type: "address" },
    { indexed: true, name: "tokenId", type: "uint256" },
  ],
} as const;

type MintReceipt = {
  status: string;
  chainId: number;
  to: Address | null;
  from: Address;
  logs: readonly { address: Address; topics: readonly Hex[]; data: Hex }[];
};

export function confirmedMintToken(receipt: MintReceipt, recipient: Address): bigint | undefined {
  // Smart wallets may submit through an entry point. The NFT event proves delivery.
  if (receipt.status !== "success" || receipt.chainId !== OG_MINT_TARGET.chainId) return;
  const ids: bigint[] = [];
  for (const log of receipt.logs) {
    if (log.address.toLowerCase() !== OG_MINT_TARGET.address.toLowerCase()) continue;
    try {
      const decoded = decodeEventLog({ abi: [transferEvent], data: log.data, topics: log.topics as [Hex, ...Hex[]] });
      if (decoded.args.from === zeroAddress && decoded.args.to.toLowerCase() === recipient.toLowerCase()) ids.push(decoded.args.tokenId);
    } catch { /* Unrelated or malformed logs cannot confirm a mint. */ }
  }
  return ids.length === 1 ? ids[0] : undefined;
}
